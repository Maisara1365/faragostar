<?php

namespace App\Services\Dashboard;

use App\Models\ContactMessage;
use App\Models\Conversation;
use App\Models\Order;
use App\Models\Package;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use App\Models\User;

class DashboardService
{
    /**
     * Dashboard statistics.
     */
    public function statistics(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Users
            |--------------------------------------------------------------------------
            */

            'customers' => User::where(
                'role',
                'customer'
            )->count(),

            'admins' => User::where(
                'role',
                'admin'
            )->count(),

            'content_managers' => User::where(
                'role',
                'content_manager'
            )->count(),

            /*
            |--------------------------------------------------------------------------
            | Orders
            |--------------------------------------------------------------------------
            */

            'orders' => Order::count(),

            'pending_orders' => Order::where(
                'status',
                'pending'
            )->count(),

            'in_progress_orders' => Order::where(
                'status',
                'in_progress'
            )->count(),

            'completed_orders' => Order::where(
                'status',
                'completed'
            )->count(),

            'delivered_orders' => Order::where(
                'status',
                'delivered'
            )->count(),

            'cancelled_orders' => Order::where(
                'status',
                'cancelled'
            )->count(),

            /*
            |--------------------------------------------------------------------------
            | Revenue
            |--------------------------------------------------------------------------
            */

            'paid_orders' => Order::where(
                'payment_status',
                'paid'
            )->count(),

            'total_revenue' => Order::where(
                'payment_status',
                'paid'
            )->sum('budget'),

            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            'services' => Service::count(),

            'packages' => Package::count(),

            'portfolio' => Portfolio::count(),

            'team_members' => TeamMember::count(),

            'testimonials' => Testimonial::count(),

            /*
            |--------------------------------------------------------------------------
            | Communication
            |--------------------------------------------------------------------------
            */

            'contact_messages' => ContactMessage::count(),

            'unread_contact_messages' => ContactMessage::where(
                'status',
                'unread'
            )->count(),

            'open_conversations' => Conversation::where(
                'status',
                'open'
            )->count(),

            'closed_conversations' => Conversation::where(
                'status',
                'closed'
            )->count(),

        ];
    }
}