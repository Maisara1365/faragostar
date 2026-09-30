<?php

namespace App\Services\Order;

use App\Models\Order;
use App\Models\OrderFile;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class OrderService
{
    /**
     * Get all orders.
     */
    public function getAll(array $filters = [])
    {
        return Order::with([
                'user',
                'service',
                'package',
                'files',
                'conversation',
            ])
            ->search($filters['search'] ?? null)
            ->status($filters['status'] ?? null)
            ->paymentStatus($filters['payment_status'] ?? null)
            ->service($filters['service_id'] ?? null)
            ->package($filters['package_id'] ?? null)
            ->customer($filters['customer_id'] ?? null)
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 15
            );
    }

    /**
     * Get customer orders.
     */
    public function getCustomerOrders(
        User $user,
        array $filters = []
    ) {
        return Order::with([
                'service',
                'package',
                'files',
                'conversation',
            ])
            ->where('user_id', $user->id)
            ->search($filters['search'] ?? null)
            ->status($filters['status'] ?? null)
            ->paymentStatus($filters['payment_status'] ?? null)
            ->service($filters['service_id'] ?? null)
            ->package($filters['package_id'] ?? null)
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 15
            );
    }

    /**
     * Create order.
     */
    public function create(array $data, User $user): Order
    {
        return DB::transaction(function () use ($data, $user) {

            $conversation = Conversation::where(
                'customer_id',
                $user->id
            )
            ->latest()
            ->first();

            $order = Order::create([

                'order_number' => $this->generateOrderNumber(),

                'user_id' => $user->id,

                'conversation_id' => $conversation?->id,

                'service_id' => $data['service_id'],

                'package_id' => $data['package_id'] ?? null,

                'title' => $data['title'] ?? null,

                'description' => $data['description'] ?? null,

                'budget' => $data['budget'] ?? null,

                'deadline' => $data['deadline'] ?? null,

                'status' => 'pending',

                'payment_status' => 'pending',

            ]);

            return $order->load([
                'user',
                'service',
                'package',
                'files',
                'conversation',
            ]);
        });
    }

    /**
     * Update order.
     */
    public function update(
        Order $order,
        array $data
    ): Order {

        $order->update($data);

        return $order->refresh()->load([
            'user',
            'service',
            'package',
            'files',
            'conversation',
        ]);
    }

    /**
     * Delete order.
     */
    public function delete(
        Order $order
    ): void {

        foreach ($order->files as $file) {

            if (
                Storage::disk('public')->exists(
                    $file->file_path
                )
            ) {
                Storage::disk('public')->delete(
                    $file->file_path
                );
            }
        }

        $order->delete();
    }

    /**
     * Update order status.
     */
    public function updateStatus(
        Order $order,
        string $status
    ): Order {

        $order->update([
            'status' => $status,
        ]);

        return $order->refresh()->load([
            'user',
            'service',
            'package',
            'files',
            'conversation',
        ]);
    }

    /**
     * Update payment status.
     */
    public function updatePaymentStatus(
        Order $order,
        string $status
    ): Order {

        $order->update([
            'payment_status' => $status,
        ]);

        return $order->refresh();
    }

    /**
     * Upload order file.
     */
    public function uploadFile(
        Order $order,
        UploadedFile $file,
        User $user
    ): OrderFile {

        $path = $file->store(
            'orders',
            'public'
        );

        return OrderFile::create([

            'order_id' => $order->id,

            'file_name' => $file->getClientOriginalName(),

            'file_path' => $path,

            'file_size' => $file->getSize(),

            'file_type' => $file->getMimeType(),

            'uploaded_by' => $user->id,

        ]);
    }

    /**
     * Delete order file.
     */
    public function deleteFile(
        OrderFile $file
    ): void {

        if (
            Storage::disk('public')->exists(
                $file->file_path
            )
        ) {
            Storage::disk('public')->delete(
                $file->file_path
            );
        }

        $file->delete();
    }

    /**
     * Generate order number.
     */
    private function generateOrderNumber(): string
    {
        do {

            $number = 'FG-' .
                now()->format('Ymd') .
                '-' .
                strtoupper(Str::random(6));

        } while (
            Order::where(
                'order_number',
                $number
            )->exists()
        );

        return $number;
    }
}