<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PackageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            /*
            |--------------------------------------------------------------------------
            | Parent Service
            |--------------------------------------------------------------------------
            */

            'service' => [

                'id' => $this->service?->id,

                'title' => [

                    'fa' => $this->service?->title_fa,

                    'en' => $this->service?->title_en,

                ],

            ],

            /*
            |--------------------------------------------------------------------------
            | Multilingual
            |--------------------------------------------------------------------------
            */

            'name' => [

                'fa' => $this->name_fa,

                'en' => $this->name_en,

            ],

            'description' => [

                'fa' => $this->description_fa,

                'en' => $this->description_en,

            ],

            'features' => [

                'fa' => $this->features_fa ?? [],

                'en' => $this->features_en ?? [],

            ],

            /*
            |--------------------------------------------------------------------------
            | Business
            |--------------------------------------------------------------------------
            */

            'price' => $this->price,

            'delivery_days' => $this->delivery_days,

            'revisions' => $this->revisions,

            'display_order' => $this->display_order,

            'is_featured' => $this->is_featured,

            'status' => $this->status,

            /*
            |--------------------------------------------------------------------------
            | Dates
            |--------------------------------------------------------------------------
            */

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

        ];
    }
}
