<?php

namespace App\Http\Requests\Portfolio;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePortfolioRequest extends FormRequest
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
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'title_en' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('portfolio', 'slug')
                    ->ignore($this->portfolio),
            ],

            'category_fa' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'category_en' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'description_fa' => [
                'sometimes',
                'nullable',
                'string',
            ],

            'description_en' => [
                'sometimes',
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' => [
                'sometimes',
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
                'sometimes',
                'nullable',
                'url',
                'max:255',
            ],

            'client_name' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'completion_date' => [
                'sometimes',
                'nullable',
                'date',
            ],

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'theme_color' => [
                'sometimes',
                'nullable',
                'regex:/^#([A-Fa-f0-9]{6})$/',
            ],

            'display_order' => [
                'sometimes',
                'nullable',
                'integer',
                'min:0',
            ],

            'is_featured' => [
                'sometimes',
                'boolean',
            ],

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' => [
                'sometimes',
                'in:active,inactive',
            ],

        ];
    }
}
