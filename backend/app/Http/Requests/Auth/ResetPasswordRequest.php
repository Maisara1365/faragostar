<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
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

            /*
            |--------------------------------------------------------------------------
            | Account
            |--------------------------------------------------------------------------
            */

            'email' => [
                'required',
                'email',
            ],

            /*
            |--------------------------------------------------------------------------
            | OTP Verification
            |--------------------------------------------------------------------------
            */

            'otp' => [
                'required',
                'digits:6',
            ],

            /*
            |--------------------------------------------------------------------------
            | New Password
            |--------------------------------------------------------------------------
            */

            'password' => [
                'required',
                'confirmed',
                'min:8',
                'max:100',
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

            'otp.required'   => __('auth.otp_required'),
            'otp.digits'     => __('auth.otp_invalid'),

            'password.required'   => __('auth.password_required'),
            'password.confirmed'  => __('auth.password_confirmation'),
            'password.min'        => __('auth.password_min'),
            'password.max'        => __('auth.password_max'),

        ];
    }
}
