<?php

namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreOrderRequest;
use App\Http\Requests\Order\UpdateOrderRequest;
use App\Http\Resources\OrderFileResource;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderFile;
use App\Services\Order\OrderService;
use App\Services\Notification\NotificationService;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService,
        private NotificationService $notificationService
    ) {}

    /**
     * Admin - List all orders.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Content Manager - Only show orders assigned to them via conversation
        if ($user->role === 'content_manager') {
            $orders = Order::whereHas('conversation', function ($query) use ($user) {
                $query->where('content_manager_id', $user->id);
            })
            ->with([
                'service',
                'package',
                'conversation',
            ])
            ->latest()
            ->get();

            return $this->success(
                OrderResource::collection($orders),
                'Orders retrieved successfully.'
            );
        }

        // Admin - Get all orders
        return $this->success(
            OrderResource::collection(
                $this->orderService->getAll(
                    $request->only([
                        'search',
                        'status',
                        'payment_status',
                        'service_id',
                        'package_id',
                        'customer_id',
                        'per_page',
                    ])
                )
            ),
            'Orders retrieved successfully.'
        );
    }

    /**
     * Customer - My Orders.
     */
    public function myOrders(Request $request)
    {
        return $this->success(
            OrderResource::collection(
                $this->orderService->getCustomerOrders(
                    $request->user(),
                    $request->only([
                        'search',
                        'status',
                        'payment_status',
                        'service_id',
                        'package_id',
                        'per_page',
                    ])
                )
            ),
            'Orders retrieved successfully.'
        );
    }

    /**
     * Create Order.
     */
    public function store(
        StoreOrderRequest $request
    ) {
        $order = $this->orderService->create(
            $request->validated(),
            $request->user()
        );

        $this->createOrderNotifications(
            $order,
            $request->user()
        );

        return $this->success(
            new OrderResource($order),
            'Order created successfully.',
            201
        );
    }

    /**
     * Show Order.
     */
    public function show(
        Order $order,
        Request $request
    ) {
        $user = $request->user();

        // Customer - Only their own orders
        if (
            $user->role === 'customer' &&
            $order->user_id !== $user->id
        ) {
            return $this->forbidden(
                'You are not authorized to access this order.'
            );
        }

        // Content Manager - Only assigned orders via conversation
        if ($user->role === 'content_manager') {
            $order->load('conversation');

            if (
                !$order->conversation ||
                $order->conversation->content_manager_id !== $user->id
            ) {
                return $this->forbidden(
                    'You are not authorized to access this order.'
                );
            }
        }

        // Admin - Full access, Content Manager - Passed validation
        return $this->success(
            new OrderResource(
                $order->load([
                    'user',
                    'service',
                    'package',
                    'files',
                    'conversation',
                ])
            ),
            'Order retrieved successfully.'
        );
    }

    /**
     * Update Order.
     */
    public function update(
        UpdateOrderRequest $request,
        Order $order
    ) {
        if (
            $request->user()->role === 'customer' &&
            $order->user_id !== $request->user()->id
        ) {
            return $this->forbidden(
                'You are not allowed to update this order.'
            );
        }

        $order = $this->orderService->update(
            $order,
            $request->validated()
        );

        return $this->success(
            new OrderResource($order),
            'Order updated successfully.'
        );
    }

    /**
     * Delete Order.
     */
    public function destroy(
        Order $order,
        Request $request
    ) {
        if (
            $request->user()->role === 'customer' &&
            $order->user_id !== $request->user()->id
        ) {
            return $this->forbidden(
                'You are not allowed to delete this order.'
            );
        }

        $this->orderService->delete($order);

        return $this->success(
            null,
            'Order deleted successfully.'
        );
    }

    /**
     * Update Order Status.
     */
    public function updateStatus(
        Request $request,
        Order $order
    ) {
        $request->validate([
            'status' => [
                'required',
                'in:pending,reviewing,accepted,in_progress,completed,delivered,cancelled',
            ],
        ]);

        $order = $this->orderService->updateStatus(
            $order,
            $request->status
        );

        $this->notificationService->create(
            $order->user,
            'order_status_changed',
            $order,
            [
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'action' => 'order',
            ]
        );

        return $this->success(
            new OrderResource($order),
            'Order status updated successfully.'
        );
    }

    /**
     * Update Payment Status.
     */
    public function updatePaymentStatus(
        Request $request,
        Order $order
    ) {
        $request->validate([
            'payment_status' => [
                'required',
                'in:pending,paid,refunded',
            ],
        ]);

        $order = $this->orderService->updatePaymentStatus(
            $order,
            $request->payment_status
        );

        return $this->success(
            new OrderResource($order),
            'Payment status updated successfully.'
        );
    }

    /**
     * Upload Order File.
     */
    public function uploadFile(
        Request $request,
        Order $order
    ) {
        if (
            $request->user()->role === 'customer' &&
            $order->user_id !== $request->user()->id
        ) {
            return $this->forbidden(
                'You are not allowed to upload files to this order.'
            );
        }

        $request->validate([
            'file' => [
                'required',
                'file',
                'max:10240',
            ],
        ]);

        $file = $this->orderService->uploadFile(
            $order,
            $request->file('file'),
            $request->user()
        );

        return $this->success(
            new OrderFileResource($file),
            'File uploaded successfully.',
            201
        );
    }

    /**
     * Delete Order File.
     */
    public function deleteFile(
        OrderFile $orderFile,
        Request $request
    ) {
        $order = $orderFile->order;

        if (
            $request->user()->role === 'customer' &&
            $order->user_id !== $request->user()->id
        ) {
            return $this->forbidden(
                'You are not allowed to delete this file.'
            );
        }

        $this->orderService->deleteFile(
            $orderFile
        );

        return $this->success(
            null,
            'File deleted successfully.'
        );
    }

    /**
     * Create notifications when a new order is created.
     */
    private function createOrderNotifications(
        Order $order,
        User $customer
    ): void {
        /*
        |--------------------------------------------------------------------------
        | Notify administrators
        |--------------------------------------------------------------------------
        */

        $admins = User::where(
            'role',
            'admin'
        )->get();

        foreach ($admins as $admin) {

            $this->notificationService->create(
                $admin,
                'new_order',
                $order,
                [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'customer_id' => $customer->id,
                    'action' => 'order',
                ]
            );
        }
    }
}
