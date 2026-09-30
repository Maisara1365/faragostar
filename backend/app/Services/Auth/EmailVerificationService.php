<?php

namespace App\Services\Auth;

use App\Models\EmailVerificationOtp;
use App\Models\User;
use App\Notifications\Auth\VerifyEmailNotification;
use App\Notifications\Auth\WelcomeNotification;
use App\Services\BaseService;

class EmailVerificationService extends BaseService
{
    /**
     * Generate and send a new verification OTP.
     */
    public function sendOtp(User $user): void
    {
        /*
        |--------------------------------------------------------------------------
        | Remove Old OTPs
        |--------------------------------------------------------------------------
        */

        EmailVerificationOtp::where('user_id', $user->id)->delete();

        /*
        |--------------------------------------------------------------------------
        | Generate OTP
        |--------------------------------------------------------------------------
        */

        $otp = (string) random_int(100000, 999999);

        /*
        |--------------------------------------------------------------------------
        | Save OTP
        |--------------------------------------------------------------------------
        */

        EmailVerificationOtp::create([

            'user_id' => $user->id,

            'otp' => $otp,

            'expires_at' => now()->addMinutes(10),

        ]);

        /*
        |--------------------------------------------------------------------------
        | Send Email
        |--------------------------------------------------------------------------
        */

        $user->notify(
            new VerifyEmailNotification($otp)
        );
    }

    /**
     * Verify OTP.
     */
    public function verify(string $email, string $otp): array
    {
        /*
        |--------------------------------------------------------------------------
        | Find User
        |--------------------------------------------------------------------------
        */

        $user = User::where('email', $email)->first();

        if (! $user) {

            return [

                'success' => false,

                'message' => 'User not found.',

                'status' => 404,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Already Verified
        |--------------------------------------------------------------------------
        */

        if ($user->hasVerifiedEmail()) {

            return [

                'success' => true,

                'message' => 'Email already verified.',

                'status' => 200,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Find Latest OTP
        |--------------------------------------------------------------------------
        */

        $verification = EmailVerificationOtp::where('user_id', $user->id)
            ->latest()
            ->first();

        if (! $verification) {

            return [

                'success' => false,

                'message' => 'Verification code not found.',

                'status' => 404,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Expired
        |--------------------------------------------------------------------------
        */

        if ($verification->isExpired()) {

            return [

                'success' => false,

                'message' => 'Verification code has expired.',

                'status' => 422,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Too Many Attempts
        |--------------------------------------------------------------------------
        */

        if ($verification->attempts >= 5) {

            return [

                'success' => false,

                'message' => 'Too many verification attempts.',

                'status' => 429,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Wrong OTP
        |--------------------------------------------------------------------------
        */

        if ($verification->otp !== $otp) {

            $verification->increment('attempts');

            return [

                'success' => false,

                'message' => 'Invalid verification code.',

                'status' => 422,

            ];

        }

        /*
        |--------------------------------------------------------------------------
        | Mark Used
        |--------------------------------------------------------------------------
        */

        $verification->update([

            'is_used' => true,

        ]);

        /*
        |--------------------------------------------------------------------------
        | Verify Email
        |--------------------------------------------------------------------------
        */

        $user->markEmailAsVerified();

        /*
        |--------------------------------------------------------------------------
        | Send Welcome Email
        |--------------------------------------------------------------------------
        */

        $user->notify(
            new WelcomeNotification()
        );

        /*
        |--------------------------------------------------------------------------
        | Clean OTPs
        |--------------------------------------------------------------------------
        */

        EmailVerificationOtp::where('user_id', $user->id)->delete();

        return [

            'success' => true,

            'message' => 'Email verified successfully.',

            'status' => 200,

        ];
    }

    /**
     * Resend OTP.
     */
    public function resend(User $user): void
    {
        $this->sendOtp($user);
    }
}
