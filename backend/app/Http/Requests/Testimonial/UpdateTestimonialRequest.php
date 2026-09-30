<?php

namespace App\Http\Requests\Testimonial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
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
            | Client Information
            |--------------------------------------------------------------------------
            */

            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'company_fa' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'company_en' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'position_fa' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'position_en' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
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
            | Review
            |--------------------------------------------------------------------------
            */

            'rating' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
                'max:5',
            ],

            'review_fa' => [
                'sometimes',
                'required',
                'string',
            ],

            'review_en' => [
                'sometimes',
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'display_order' => [
                'sometimes',
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
