<?php

namespace App\Http\Requests\Conversation;

use Illuminate\Foundation\Http\FormRequest;

class StoreConversationRequest extends FormRequest
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

            'subject' => [
                'nullable',
                'string',
                'max:255',
            ],

            'admin_id' => [
                'nullable',
                'exists:users,id',
            ],

        ];
    }
}