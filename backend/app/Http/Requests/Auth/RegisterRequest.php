<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            | Personal Information
            |--------------------------------------------------------------------------
            */

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            /*
            |--------------------------------------------------------------------------
            | Password
            |--------------------------------------------------------------------------
            */

            'password' => [
                'required',
                'confirmed',
                Password::min(8),
            ],

            /*
            |--------------------------------------------------------------------------
            | Language
            |--------------------------------------------------------------------------
            |
            | Sent by the frontend.
            | Persian is default if not provided.
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

            'name.required' => 'Full name is required.',

            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email address is already registered.',

            'phone.max' => 'Phone number may not be greater than 20 characters.',

            'password.required' => 'Password is required.',
            'password.confirmed' => 'Password confirmation does not match.',

            'language.in' => 'Selected language is invalid.',

        ];
    }
}
