<?php

namespace App\Services\Dashboard;

use App\Models\Conversation;
use App\Models\Order;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\User;

class ContentManagerDashboardService
{
    /**
     * Get content manager dashboard data.
     */
    public function dashboard(User $user): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | User
            |--------------------------------------------------------------------------
            */

            'user' => $user,

            /*
            |--------------------------------------------------------------------------
            | Statistics
            |--------------------------------------------------------------------------
            */

            'stats' => [

                'activeOrders' => Order::whereIn('status', [
                    'pending',
                    'in_progress',
                ])->count(),

                'totalPortfolio' => Portfolio::count(),

                'totalServices' => Service::count(),

                'totalTestimonials' => Testimonial::count(),

            ],

            /*
            |--------------------------------------------------------------------------
            | Recent Orders
            |--------------------------------------------------------------------------
            */

            'orders' => Order::with([
                'user',
                'service',
                'package',
                'files',
            ])
                ->latest()
                ->limit(10)
                ->get(),

            /*
            |--------------------------------------------------------------------------
            | Recent Conversations
            |--------------------------------------------------------------------------
            */

            'conversations' => Conversation::with([
                'customer',
                'admin',
                'messages',
            ])
                ->latest()
                ->limit(10)
                ->get(),

        ];
    }
}