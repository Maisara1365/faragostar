<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        /*
        |--------------------------------------------------------------------------
        | Language
        |--------------------------------------------------------------------------
        */

        $language = $request->get('language')
            ?? $request->user()?->language
            ?? 'en';

        /*
        |--------------------------------------------------------------------------
        | Service
        |--------------------------------------------------------------------------
        */

        $serviceTitle = null;

        if ($this->service) {
            $serviceTitle = $language === 'fa'
                ? $this->service->title_fa
                : $this->service->title_en;
        }

        /*
        |--------------------------------------------------------------------------
        | Package
        |--------------------------------------------------------------------------
        */

        $packageName = null;

        if ($this->package) {
            $packageName = $language === 'fa'
                ? $this->package->name_fa
                : $this->package->name_en;
        }

        return [

            'id' => $this->id,

            'order_number' => $this->order_number,

            'title' => $this->title,

            'description' => $this->description,

            'budget' => $this->budget,

            'deadline' => $this->deadline,

            'status' => $this->status,

            'payment_status' => $this->payment_status,

            'conversation_id' => $this->conversation_id,

            /*
            |--------------------------------------------------------------------------
            | Customer
            |--------------------------------------------------------------------------
            */

            'customer' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'email' => $this->user?->email,
            ],

            /*
            |--------------------------------------------------------------------------
            | Service
            |--------------------------------------------------------------------------
            */

            'service' => $this->service ? [
                'id' => $this->service->id,

                'title' => $serviceTitle,

                'title_fa' => $this->service->title_fa,

                'title_en' => $this->service->title_en,

                'slug' => $this->service->slug,
            ] : null,

            /*
            |--------------------------------------------------------------------------
            | Package
            |--------------------------------------------------------------------------
            */

            'package' => $this->package ? [
                'id' => $this->package->id,

                'name' => $packageName,

                'name_fa' => $this->package->name_fa,

                'name_en' => $this->package->name_en,

                'price' => $this->package->price,

                'delivery_days' => $this->package->delivery_days,

                'revisions' => $this->package->revisions,
            ] : null,

            /*
            |--------------------------------------------------------------------------
            | Files
            |--------------------------------------------------------------------------
            */

            'files' => OrderFileResource::collection(
                $this->whenLoaded('files')
            ),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}