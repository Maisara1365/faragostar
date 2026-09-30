<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        /*
        |--------------------------------------------------------------------------
        | Current Language
        |--------------------------------------------------------------------------
        */

        $language = app()->getLocale();

        return [

            /*
            |--------------------------------------------------------------------------
            | Basic Information
            |--------------------------------------------------------------------------
            */

            'id' => $this->id,

            'slug' => $this->slug,

            /*
            |--------------------------------------------------------------------------
            | Localized Fields
            |--------------------------------------------------------------------------
            */

            'title' => $language === 'fa'
                ? $this->title_fa
                : $this->title_en,

            'short_description' => $language === 'fa'
                ? $this->short_description_fa
                : $this->short_description_en,

            'description' => $language === 'fa'
                ? $this->description_fa
                : $this->description_en,

            /*
            |--------------------------------------------------------------------------
            | Multilingual Fields
            |--------------------------------------------------------------------------
            */

            'title_fa' => $this->title_fa,

            'title_en' => $this->title_en,

            'short_description_fa' => $this->short_description_fa,

            'short_description_en' => $this->short_description_en,

            'description_fa' => $this->description_fa,

            'description_en' => $this->description_en,

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'icon' => $this->icon
                ? asset('storage/' . $this->icon)
                : null,

            'cover_image' => $this->cover_image
                ? asset('storage/' . $this->cover_image)
                : null,

            /*
            |--------------------------------------------------------------------------
            | Pricing
            |--------------------------------------------------------------------------
            */

            'starting_price' => $this->starting_price,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'display_order' => $this->display_order,

            'theme_color' => $this->theme_color,

            'is_featured' => $this->is_featured,

            'packages_count' => $this->whenCounted('packages'),

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' => $this->status,

            /*
            |--------------------------------------------------------------------------
            | Timestamps
            |--------------------------------------------------------------------------
            */

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,

            /*
            |--------------------------------------------------------------------------
            | Relationships
            |--------------------------------------------------------------------------
            */

            'packages' => PackageResource::collection(
                $this->whenLoaded('packages')
            ),

        ];
    }
}
