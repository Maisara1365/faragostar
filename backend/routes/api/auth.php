<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\EmailVerificationController;
use App\Http\Controllers\Api\Auth\PasswordResetController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Authentication is based on Email OTP verification.
| Verification links have been completely removed.
|
*/

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    Route::post('/register', [
        AuthController::class,
        'register',
    ]);

    Route::post('/login', [
        AuthController::class,
        'login',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Email Verification (OTP)
    |--------------------------------------------------------------------------
    */

    Route::post('/email/verify', [
        EmailVerificationController::class,
        'verify',
    ]);

    Route::post('/email/resend-otp', [
        EmailVerificationController::class,
        'resend',
    ])->middleware('throttle:6,1');

    /*
    |--------------------------------------------------------------------------
    | Password Reset (OTP)
    |--------------------------------------------------------------------------
    */

    Route::post('/forgot-password', [
        PasswordResetController::class,
        'forgotPassword',
    ]);

    Route::post('/reset-password', [
        PasswordResetController::class,
        'resetPassword',
    ]);

});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [
        AuthController::class,
        'me',
    ]);

    Route::post('/logout', [
        AuthController::class,
        'logout',
    ]);

});
