<?php

namespace App\Http\Requests\Message;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'conversation_id' => [
                'required',
                'exists:conversations,id',
            ],

            'message' => [
                'nullable',
                'string',
		'required_without:attachment',	
            ],

            'attachment' => [
                'nullable',
                'file',
                'max:5120',
            ],

        ];
    }
}