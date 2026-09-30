<?php

namespace App\Http\Requests\Package;

use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
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
            | Relationship
            |--------------------------------------------------------------------------
            */

            'service_id' => [
                'required',
                'exists:services,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Names
            |--------------------------------------------------------------------------
            */

            'name_fa' => [
                'required',
                'string',
                'max:255',
            ],

            'name_en' => [
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
                'nullable',
                'string',
            ],

            'description_en' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | Pricing
            |--------------------------------------------------------------------------
            */

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'delivery_days' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'revisions' => [
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
                'nullable',
                'array',
            ],

            'features_fa.*' => [
                'string',
            ],

            'features_en' => [
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
                'required',
                'in:active,inactive',
            ],

        ];
    }
}