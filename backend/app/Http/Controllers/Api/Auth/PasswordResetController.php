<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\Auth\PasswordResetService;

class PasswordResetController extends Controller
{
    public function __construct(
        protected PasswordResetService $passwordResetService
    ) {}

    /*
    |--------------------------------------------------------------------------
    | Send Password Reset OTP
    |--------------------------------------------------------------------------
    */

    public function forgotPassword(
        ForgotPasswordRequest $request
    ) {
        $result = $this->passwordResetService
            ->sendResetOtp(
                $request->validated()
            );

        if (! $result['success']) {

            return $this->error(
                $result['message'],
                null,
                $result['status']
            );
        }

        return $this->success(
            null,
            $result['message']
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Password
    |--------------------------------------------------------------------------
    */

    public function resetPassword(
        ResetPasswordRequest $request
    ) {
        $result = $this->passwordResetService
            ->resetPassword(
                $request->validated()
            );

        if (! $result['success']) {

            return $this->error(
                $result['message'],
                null,
                $result['status']
            );
        }

        return $this->success(
            null,
            $result['message']
        );
    }
}
