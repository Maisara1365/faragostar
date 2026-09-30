<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ConversationResource;

class ContentManagerDashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'id' => $this['user']->id,
                'name' => $this['user']->name,
                'email' => $this['user']->email,
                'role' => $this['user']->role,
            ],

            'stats' => [
                'activeOrders' =>
                    $this['stats']['activeOrders'],

                'totalPortfolio' =>
                    $this['stats']['totalPortfolio'],

                'totalServices' =>
                    $this['stats']['totalServices'],

                'totalTestimonials' =>
                    $this['stats']['totalTestimonials'],
            ],

            'orders' => OrderResource::collection(
                $this['orders']
            ),

            'conversations' => ConversationResource::collection(
                $this['conversations']
            ),
        ];
    }
}
