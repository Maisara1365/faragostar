<?php

namespace App\Traits;

trait ApiResponseTrait
{
    /**
     * Success response.
     */
    protected function success(
        mixed $data = null,
        string $message = 'Success',
        int $status = 200
    ) {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    /**
     * Error response.
     */
    protected function error(
        string $message = 'Something went wrong.',
        mixed $errors = null,
        int $status = 400
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    /**
     * Validation error response.
     */
    protected function validationError(
        mixed $errors,
        string $message = 'Validation failed.'
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], 422);
    }

    /**
     * Unauthorized response.
     */
    protected function unauthorized(
        string $message = 'Unauthorized.'
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], 401);
    }

    /**
     * Forbidden response.
     */
    protected function forbidden(
        string $message = 'Forbidden.'
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], 403);
    }

    /**
     * Not found response.
     */
    protected function notFound(
        string $message = 'Resource not found.'
    ) {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], 404);
    }
}
