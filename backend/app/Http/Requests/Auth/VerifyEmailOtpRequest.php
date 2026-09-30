<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class VerifyEmailOtpRequest extends FormRequest
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
            ],

            'otp' => [
                'required',
                'digits:6',
            ],

        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [

            'email.required' => 'Email address is required.',

            'email.email' => 'Please enter a valid email address.',

            'otp.required' => 'Verification code is required.',

            'otp.digits' => 'Verification code must be exactly 6 digits.',

        ];
    }
}
