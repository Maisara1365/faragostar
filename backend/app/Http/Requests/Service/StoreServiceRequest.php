<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Persian
            |--------------------------------------------------------------------------
            */

            'title_fa' => [
                'required',
                'string',
                'max:255',
            ],

            'short_description_fa' => [
                'nullable',
                'string',
                'max:255',
            ],

            'description_fa' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | English
            |--------------------------------------------------------------------------
            */

            'title_en' => [
                'required',
                'string',
                'max:255',
            ],

            'short_description_en' => [
                'nullable',
                'string',
                'max:255',
            ],

            'description_en' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | General
            |--------------------------------------------------------------------------
            */

            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:services,slug',
            ],

            'icon' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,svg,webp',
                'max:2048',
            ],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],

            'starting_price' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'is_featured' => [
                'boolean',
            ],

            'display_order' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'theme_color' => [
                'nullable',
                'string',
                'max:20',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],

        ];
    }
}
