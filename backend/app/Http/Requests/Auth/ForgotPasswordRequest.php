<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
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
            'email' => [
                'required',
                'email',
                'exists:users,email',
            ],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'email.required' => __('auth.email_required'),
            'email.email'    => __('auth.email_invalid'),
            'email.exists'   => __('auth.email_not_found'),
        ];
    }
}
