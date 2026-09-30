<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrderRequest extends FormRequest
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
                'sometimes',
                'required',
                'exists:services,id',
            ],

            'package_id' => [
                'nullable',
                'exists:packages,id',
            ],

            'title' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],

            'description' => [
                'sometimes',
                'nullable',
                'string',
            ],

            'budget' => [
                'sometimes',
                'nullable',
                'numeric',
                'min:0',
            ],

            'deadline' => [
                'sometimes',
                'nullable',
                'date',
                'after_or_equal:today',
            ],

            'status' => [
                'sometimes',
                'required',
                'in:pending,in_progress,completed,delivered,cancelled',
            ],

            'payment_status' => [
                'sometimes',
                'required',
                'in:pending,paid,refunded',
            ],

        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [

            'service_id.exists' => 'The selected service does not exist.',

            'package_id.exists' => 'The selected package does not exist.',

            'deadline.after_or_equal' => 'The deadline cannot be in the past.',

            'status.in' => 'Invalid order status.',

            'payment_status.in' => 'Invalid payment status.',

        ];
    }
}