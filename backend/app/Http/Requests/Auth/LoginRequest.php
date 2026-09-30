<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
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
            | Login Credentials
            |--------------------------------------------------------------------------
            */

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'password' => [
                'required',
                'string',
                'max:100',
            ],

            /*
            |--------------------------------------------------------------------------
            | Remember Me
            |--------------------------------------------------------------------------
            */

            'remember' => [
                'nullable',
                'boolean',
            ],

            /*
            |--------------------------------------------------------------------------
            | Language
            |--------------------------------------------------------------------------
            |
            | Used to store the user's preferred language after login.
            |
            */

            'language' => [
                'nullable',
                Rule::in(['fa', 'en']),
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
            'email.max' => 'Email address may not be greater than 255 characters.',

            'password.required' => 'Password is required.',
            'password.max' => 'Password may not be greater than 100 characters.',

            'remember.boolean' => 'Remember me must be true or false.',

            'language.in' => 'Selected language is invalid.',

        ];
    }
}
