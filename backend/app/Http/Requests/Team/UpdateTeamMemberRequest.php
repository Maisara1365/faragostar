<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
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

            'designation_fa' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'designation_en' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'bio_fa' => [
                'sometimes',
                'nullable',
                'string',
            ],

            'bio_en' => [
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
                'max:2048',
            ],

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            'facebook' => [
                'sometimes',
                'nullable',
                'url',
                'max:255',
            ],

            'instagram' => [
                'sometimes',
                'nullable',
                'url',
                'max:255',
            ],

            'linkedin' => [
                'sometimes',
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
                'sometimes',
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
                'sometimes',
                'in:active,inactive',
            ],

        ];
    }
}
