<?php

namespace App\Http\Requests\Conversation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConversationRequest extends FormRequest
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
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'admin_id' => [
                'sometimes',
                'nullable',
                'exists:users,id',
            ],

            'status' => [
                'sometimes',
                'required',
                'in:open,closed',
            ],

        ];
    }
}