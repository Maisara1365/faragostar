<?php

namespace App\Helpers;

class ApiResponse
{
    /**
     * Success response.
     */
    public static function success(
        string $message = 'Success',
        mixed $data = null,
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
    public static function error(
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
}
