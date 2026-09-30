<?php

namespace App\Http\Requests\Testimonial;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
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
                'required',
                'string',
                'max:255',
            ],

            'company_fa' => [
                'nullable',
                'string',
                'max:255',
            ],

            'company_en' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position_fa' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position_en' => [
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
                'required',
                'integer',
                'min:1',
                'max:5',
            ],

            'review_fa' => [
                'required',
                'string',
            ],

            'review_en' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

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
