<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Services\BaseService;
use App\Services\Auth\EmailVerificationService;
use Illuminate\Support\Facades\Auth;

class AuthService extends BaseService
{
    public function __construct(
        private readonly EmailVerificationService $emailVerificationService
    ) {}

    /**
     * Register a new customer.
     */
    public function register(array $data): User
    {
        $user = User::create([

            'name' => $data['name'],

            'email' => $data['email'],

            'phone' => $data['phone'] ?? null,

            'password' => $data['password'],

            'role' => 'customer',

            /*
            |--------------------------------------------------------------------------
            | Language
            |--------------------------------------------------------------------------
            */

            'language' => $data['language'] ?? 'fa',

            'status' => 'active',

            'must_change_password' => false,

        ]);

        /*
        |--------------------------------------------------------------------------
        | Send Verification OTP
        |--------------------------------------------------------------------------
        */

        $this->emailVerificationService->sendOtp($user);

        return $user;
    }

    /**
     * Login user.
     */
    public function login(array $credentials): array
    {
        if (! Auth::attempt([

            'email' => $credentials['email'],

            'password' => $credentials['password'],

        ])) {

            return [

                'success' => false,

                'message' => __('invalid_credentials'),

                'status' => 401,

            ];
        }

        /** @var User $user */
        $user = Auth::user();

        /*
        |--------------------------------------------------------------------------
        | Blocked Account
        |--------------------------------------------------------------------------
        */

        if ($user->status === 'blocked') {

            Auth::logout();

            return [

                'success' => false,

                'message' => __('account_blocked'),

                'status' => 403,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Email Verification
        |--------------------------------------------------------------------------
        */

        if (! $user->hasVerifiedEmail()) {

            Auth::logout();

            return [

                'success' => false,

                'message' => __('email_not_verified'),

                'status' => 403,

                /*
                |--------------------------------------------------------------------------
                | Frontend Helper
                |--------------------------------------------------------------------------
                */

                'verification_required' => true,

                'email' => $user->email,

                'language' => $user->language,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Remove Previous Tokens
        |--------------------------------------------------------------------------
        */

        $user->tokens()->delete();

        /*
        |--------------------------------------------------------------------------
        | Create Sanctum Token
        |--------------------------------------------------------------------------
        */

        $token = $user
            ->createToken('auth_token')
            ->plainTextToken;

        return [

            'success' => true,

            'user' => $user,

            'token' => $token,

        ];
    }

    /**
     * Logout user.
     */
    public function logout(User $user): void
    {
        $user->currentAccessToken()?->delete();
    }
}
