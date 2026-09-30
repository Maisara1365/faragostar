<?php

namespace App\Services\Dashboard;

use App\Models\Conversation;
use App\Models\Order;
use App\Models\User;

class CustomerDashboardService
{
    /**
     * Get customer dashboard data.
     */
    public function dashboard(User $user): array
    {
        $orders = Order::where(
            'user_id',
            $user->id
        )
            ->with([
                'user',
                'service',
                'package',
                'files',
            ])
            ->latest()
            ->limit(10)
            ->get();

        $conversations = Conversation::where(
            'customer_id',
            $user->id
        )
            ->with([
                'customer',
                'admin',
                'messages',
            ])
            ->latest()
            ->limit(10)
            ->get();

        return [
            'user' => $user,

            'stats' => [
                'totalOrders' => Order::where(
                    'user_id',
                    $user->id
                )->count(),

                'activeOrders' => Order::where(
                    'user_id',
                    $user->id
                )
                    ->whereIn('status', [
                        'pending',
                        'in_progress',
                    ])
                    ->count(),

                'totalMessages' => $conversations
                    ->sum(function ($conversation) {
                        return $conversation->messages->count();
                    }),
            ],

            'orders' => $orders,

            'conversations' => $conversations,
        ];
    }
}
