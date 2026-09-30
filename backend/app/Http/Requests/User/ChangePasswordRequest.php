<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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

            'current_password' => [
                'required',
                'string',
            ],

            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',
            ],

        ];
    }

    /**
     * Validation messages.
     */
    public function messages(): array
    {
        return [

            'password.confirmed' =>
                'Password confirmation does not match.',

        ];
    }
}
