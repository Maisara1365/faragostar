<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
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
            | Company
            |--------------------------------------------------------------------------
            */

            'company_name' => $this->company_name,
            'company_email' => $this->company_email,
            'company_phone' => $this->company_phone,
            'company_address' => $this->company_address,
            'about_company' => $this->about_company,

            /*
            |--------------------------------------------------------------------------
            | Branding
            |--------------------------------------------------------------------------
            */

            'logo' => $this->logo,
            'favicon' => $this->favicon,

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => $this->facebook,
            'instagram' => $this->instagram,
            'linkedin' => $this->linkedin,
            'twitter' => $this->twitter,
            'whatsapp' => $this->whatsapp,

            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            'google_map' => $this->google_map,
            'working_hours' => $this->working_hours,

            /*
            |--------------------------------------------------------------------------
            | SEO
            |--------------------------------------------------------------------------
            */

            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'meta_keywords' => $this->meta_keywords,

            /*
            |--------------------------------------------------------------------------
            | System
            |--------------------------------------------------------------------------
            */

            'default_language' => $this->default_language,
            'copyright' => $this->copyright,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}