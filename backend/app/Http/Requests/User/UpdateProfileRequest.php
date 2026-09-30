<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Authorize request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
                'unique:users,phone,' . auth()->id(),
            ],

            'language' => [
                'nullable',
                'in:fa,en',
            ],

        ];
    }
}
