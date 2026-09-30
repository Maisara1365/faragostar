<?php

namespace App\Http\Requests\Portfolio;

use Illuminate\Foundation\Http\FormRequest;

class StorePortfolioRequest extends FormRequest
{
    /**
     * Determine whether the user is authorized.
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
            | Multilingual
            |--------------------------------------------------------------------------
            */

            'title_fa' => [
                'required',
                'string',
                'max:255',
            ],

            'title_en' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:portfolio,slug',
            ],

            'category_fa' => [
                'required',
                'string',
                'max:255',
            ],

            'category_en' => [
                'required',
                'string',
                'max:255',
            ],

            'description_fa' => [
                'nullable',
                'string',
            ],

            'description_en' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],

            /*
            |--------------------------------------------------------------------------
            | Project Information
            |--------------------------------------------------------------------------
            */

            'project_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'client_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'completion_date' => [
                'nullable',
                'date',
            ],

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'theme_color' => [
                'nullable',
                'regex:/^#([A-Fa-f0-9]{6})$/',
            ],

            'display_order' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'is_featured' => [
                'nullable',
                'boolean',
            ],

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' => [
                'nullable',
                'in:active,inactive',
            ],

        ];
    }
}
