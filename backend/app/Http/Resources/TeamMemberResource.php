<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
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

            /*
            |--------------------------------------------------------------------------
            | Localized Fields
            |--------------------------------------------------------------------------
            */

            'name' => $language === 'fa'
                ? $this->name_fa
                : $this->name_en,

            'designation' => $language === 'fa'
                ? $this->designation_fa
                : $this->designation_en,

            'bio' => $language === 'fa'
                ? $this->bio_fa
                : $this->bio_en,

            /*
            |--------------------------------------------------------------------------
            | Multilingual Fields
            |--------------------------------------------------------------------------
            */

            'name_fa' => $this->name_fa,

            'name_en' => $this->name_en,

            'designation_fa' => $this->designation_fa,

            'designation_en' => $this->designation_en,

            'bio_fa' => $this->bio_fa,

            'bio_en' => $this->bio_en,

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
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => $this->facebook,

            'instagram' => $this->instagram,

            'linkedin' => $this->linkedin,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'display_order' => $this->display_order,

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
