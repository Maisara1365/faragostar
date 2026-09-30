<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Basic Information
            |--------------------------------------------------------------------------
            */

            'id' => $this->id,

            'name' => $this->name,

            /*
            |--------------------------------------------------------------------------
            | Company
            |--------------------------------------------------------------------------
            */

            'company' => $this->localized_company,

            'company_fa' => $this->company_fa,

            'company_en' => $this->company_en,

            /*
            |--------------------------------------------------------------------------
            | Position
            |--------------------------------------------------------------------------
            */

            'position' => $this->localized_position,

            'position_fa' => $this->position_fa,

            'position_en' => $this->position_en,

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
            | Review
            |--------------------------------------------------------------------------
            */

            'review' => $this->localized_review,

            'review_fa' => $this->review_fa,

            'review_en' => $this->review_en,

            'rating' => $this->rating,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

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
