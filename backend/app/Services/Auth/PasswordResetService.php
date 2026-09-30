<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Services\BaseService;
use App\Notifications\Auth\ResetPasswordNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PasswordResetService extends BaseService
{
    /*
    |--------------------------------------------------------------------------
    | Send Password Reset OTP
    |--------------------------------------------------------------------------
    */

    public function sendResetOtp(array $data): array
    {
        $user = User::where(
            'email',
            $data['email']
        )->first();

        if (! $user) {

            return [
                'success' => false,
                'message' => __('auth.email_not_found'),
                'status' => 404,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Generate OTP
        |--------------------------------------------------------------------------
        */

        $otp = random_int(100000, 999999);

        $user->update([

            'password_reset_otp' => $otp,

            'password_reset_otp_expires_at' => Carbon::now()
                ->addMinutes(10),

        ]);

        /*
        |--------------------------------------------------------------------------
        | Send OTP Email
        |--------------------------------------------------------------------------
        */

        $user->notify(
            new ResetPasswordNotification($otp)
        );

        return [

            'success' => true,

            'message' => __('auth.password_reset_otp_sent'),

        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Password Using OTP
    |--------------------------------------------------------------------------
    */

    public function resetPassword(array $data): array
    {
        $user = User::where(
            'email',
            $data['email']
        )->first();

        if (! $user) {

            return [

                'success' => false,

                'message' => __('auth.email_not_found'),

                'status' => 404,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Invalid OTP
        |--------------------------------------------------------------------------
        */

        if (
            $user->password_reset_otp !== $data['otp']
        ) {

            return [

                'success' => false,

                'message' => __('auth.invalid_otp'),

                'status' => 422,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Expired OTP
        |--------------------------------------------------------------------------
        */

        if (
            ! $user->password_reset_otp_expires_at ||
            now()->greaterThan(
                $user->password_reset_otp_expires_at
            )
        ) {

            return [

                'success' => false,

                'message' => __('auth.otp_expired'),

                'status' => 422,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Update Password
        |--------------------------------------------------------------------------
        */

        $user->forceFill([

            'password' => Hash::make(
                $data['password']
            ),

            'remember_token' => Str::random(60),

            'password_reset_otp' => null,

            'password_reset_otp_expires_at' => null,

            'must_change_password' => false,

        ])->save();

        /*
        |--------------------------------------------------------------------------
        | Logout From All Devices
        |--------------------------------------------------------------------------
        */

        $user->tokens()->delete();

        return [

            'success' => true,

            'message' => __('auth.password_reset_success'),

        ];
    }
}
