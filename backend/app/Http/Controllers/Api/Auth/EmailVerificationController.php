<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyEmailOtpRequest;
use App\Http\Requests\Auth\ResendVerificationOtpRequest;
use App\Models\User;
use App\Services\Auth\EmailVerificationService;

class EmailVerificationController extends Controller
{
    public function __construct(
        protected EmailVerificationService $emailVerificationService
    ) {}

    /*
    |--------------------------------------------------------------------------
    | Verify Email OTP
    |--------------------------------------------------------------------------
    */

    public function verify(
        VerifyEmailOtpRequest $request
    ) {
        $result = $this->emailVerificationService->verify(
            $request->validated()['email'],
            $request->validated()['otp']
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
    | Resend Verification OTP
    |--------------------------------------------------------------------------
    */

    public function resend(
        ResendVerificationOtpRequest $request
    ) {
        $user = User::where(
            'email',
            $request->validated()['email']
        )->first();

        if (! $user) {

            return $this->error(
                'User not found.',
                null,
                404
            );
        }

        $this->emailVerificationService->resend(
            $user
        );

        return $this->success(
            null,
            'Verification code has been sent successfully.'
        );
    }
}
