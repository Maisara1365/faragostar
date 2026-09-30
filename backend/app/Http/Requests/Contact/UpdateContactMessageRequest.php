<?php

namespace App\Http\Requests\Contact;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactMessageRequest extends FormRequest
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
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
            ],

            'phone' => [
                'sometimes',
                'nullable',
                'string',
                'max:20',
            ],

            'subject' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'service' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'message' => [
                'sometimes',
                'required',
                'string',
            ],

            'status' => [
                'sometimes',
                'required',
                'in:unread,read,replied',
            ],

        ];
    }
}