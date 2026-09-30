<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamMemberRequest extends FormRequest
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

            'designation_fa' => [
                'required',
                'string',
                'max:255',
            ],

            'designation_en' => [
                'required',
                'string',
                'max:255',
            ],

            'bio_fa' => [
                'nullable',
                'string',
            ],

            'bio_en' => [
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
                'max:2048',
            ],

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => [
                'nullable',
                'url',
                'max:255',
            ],

            'instagram' => [
                'nullable',
                'url',
                'max:255',
            ],

            'linkedin' => [
                'nullable',
                'url',
                'max:255',
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
