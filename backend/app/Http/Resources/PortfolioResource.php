<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
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

            'category' => $language === 'fa'
                ? $this->category_fa
                : $this->category_en,

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

            'category_fa' => $this->category_fa,

            'category_en' => $this->category_en,

            'description_fa' => $this->description_fa,

            'description_en' => $this->description_en,

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' => $this->image
                ? asset('storage/' . $this->image)
                : null,

            /*
            |--------------------------------------------------------------------------
            | Project Information
            |--------------------------------------------------------------------------
            */

            'project_url' => $this->project_url,

            'client_name' => $this->client_name,

            'completion_date' => optional(
                $this->completion_date
            )->format('Y-m-d'),

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'theme_color' => $this->theme_color,

            'display_order' => $this->display_order,

            'is_featured' => $this->is_featured,

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

        ];
    }
}
