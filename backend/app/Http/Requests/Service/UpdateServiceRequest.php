<?php

namespace App\Http\Requests\Service;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest
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
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'short_description_fa' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'description_fa' => [
                'sometimes',
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | English
            |--------------------------------------------------------------------------
            */

            'title_en' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'short_description_en' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'description_en' => [
                'sometimes',
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | General
            |--------------------------------------------------------------------------
            */

            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('services', 'slug')
                    ->ignore($this->service),
            ],

            'icon' => [
                'sometimes',
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,svg,webp',
                'max:2048',
            ],

            'cover_image' => [
                'sometimes',
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:4096',
            ],

            'starting_price' => [
                'sometimes',
                'nullable',
                'numeric',
                'min:0',
            ],

            'display_order' => [
                'sometimes',
                'integer',
                'min:0',
            ],

            'is_featured' => [
                'sometimes',
                'boolean',
            ],

            'theme_color' => [
                'sometimes',
                'nullable',
                'string',
                'max:20',
            ],

            'status' => [
                'sometimes',
                'in:active,inactive',
            ],

        ];
    }
}
