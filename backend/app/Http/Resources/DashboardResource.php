<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Users
            |--------------------------------------------------------------------------
            */

            'customers' => $this['customers'],
            'admins' => $this['admins'],
            'content_managers' => $this['content_managers'],

            /*
            |--------------------------------------------------------------------------
            | Orders
            |--------------------------------------------------------------------------
            */

            'orders' => $this['orders'],
            'pending_orders' => $this['pending_orders'],
            'in_progress_orders' => $this['in_progress_orders'],
            'completed_orders' => $this['completed_orders'],
            'delivered_orders' => $this['delivered_orders'],
            'cancelled_orders' => $this['cancelled_orders'],

            /*
            |--------------------------------------------------------------------------
            | Revenue
            |--------------------------------------------------------------------------
            */

            'paid_orders' => $this['paid_orders'],
            'total_revenue' => $this['total_revenue'],

            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            'services' => $this['services'],
            'packages' => $this['packages'],
            'portfolio' => $this['portfolio'],
            'team_members' => $this['team_members'],
            'testimonials' => $this['testimonials'],

            /*
            |--------------------------------------------------------------------------
            | Communication
            |--------------------------------------------------------------------------
            */

            'contact_messages' => $this['contact_messages'],
            'unread_contact_messages' => $this['unread_contact_messages'],
            'open_conversations' => $this['open_conversations'],
            'closed_conversations' => $this['closed_conversations'],

        ];
    }
}