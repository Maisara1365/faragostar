<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Company
            |--------------------------------------------------------------------------
            */

            'company_name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'company_email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
            ],

            'company_phone' => [
                'nullable',
                'string',
                'max:30',
            ],

            'company_address' => [
                'nullable',
                'string',
            ],

            'about_company' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Branding
            |--------------------------------------------------------------------------
            */

            'logo' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,svg,webp',
                'max:2048',
            ],

            'favicon' => [
                'nullable',
                'image',
                'mimes:png,ico',
                'max:1024',
            ],

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => [
                'nullable',
                'url',
            ],

            'instagram' => [
                'nullable',
                'url',
            ],

            'linkedin' => [
                'nullable',
                'url',
            ],

            'twitter' => [
                'nullable',
                'url',
            ],

            'whatsapp' => [
                'nullable',
                'string',
                'max:50',
            ],

            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            'google_map' => [
                'nullable',
                'url',
            ],

            'working_hours' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | SEO
            |--------------------------------------------------------------------------
            */

            'meta_title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'meta_description' => [
                'nullable',
                'string',
            ],

            'meta_keywords' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | System
            |--------------------------------------------------------------------------
            */

            'default_language' => [
                'nullable',
                'in:fa,en',
            ],

            'copyright' => [
                'nullable',
                'string',
                'max:255',
            ],

        ];
    }
}