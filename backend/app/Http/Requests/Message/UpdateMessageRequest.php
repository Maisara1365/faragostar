<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageRequest extends FormRequest
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

            'message' => [
                'sometimes',
                'required',
                'string',
            ],

            'attachment' => [
                'sometimes',
                'nullable',
                'file',
                'max:5120',
            ],

        ];
    }
}