<?php

namespace App\Http\Requests\Package;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'service_id' => [
                'sometimes',
                'required',
                'exists:services,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Names
            |--------------------------------------------------------------------------
            */

            'name_fa' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'name_en' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            /*
            |--------------------------------------------------------------------------
            | Descriptions
            |--------------------------------------------------------------------------
            */

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
            | Pricing
            |--------------------------------------------------------------------------
            */

            'price' => [
                'sometimes',
                'required',
                'numeric',
                'min:0',
            ],

            'delivery_days' => [
                'sometimes',
                'nullable',
                'integer',
                'min:1',
            ],

            'revisions' => [
                'sometimes',
                'nullable',
                'integer',
                'min:0',
            ],

            /*
            |--------------------------------------------------------------------------
            | Features
            |--------------------------------------------------------------------------
            */

            'features_fa' => [
                'sometimes',
                'nullable',
                'array',
            ],

            'features_fa.*' => [
                'string',
            ],

            'features_en' => [
                'sometimes',
                'nullable',
                'array',
            ],

            'features_en.*' => [
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
                'required',
                'in:active,inactive',
            ],

        ];
    }
}