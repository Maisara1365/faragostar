<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
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

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],

            'service' => [
                'nullable',
                'string',
                'max:255',
            ],

            'message' => [
                'required',
                'string',
            ],

        ];
    }
}