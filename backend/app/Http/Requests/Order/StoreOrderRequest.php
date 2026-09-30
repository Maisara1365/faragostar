<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules.
     */
    public function rules(): array
    {
        return [

            'service_id' => [
                'required',
                'exists:services,id',
            ],

            'package_id' => [
                'nullable',
                'exists:packages,id',
            ],

            'title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'budget' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'deadline' => [
                'nullable',
                'date',
                'after_or_equal:today',
            ],

        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [

            'service_id.required' => 'Please select a service.',

            'service_id.exists' => 'The selected service does not exist.',

            'package_id.exists' => 'The selected package does not exist.',

            'deadline.after_or_equal' => 'The deadline cannot be in the past.',

        ];
    }
}