<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    /**
     * Register a new customer.
     */
    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register(
            $request->validated()
        );

        return $this->success(
            [
                'user' => new UserResource($user),
            ],
            __('registration_success'),
            201
        );
    }

    /**
     * Login user.
     */
    public function login(LoginRequest $request)
    {
        $result = $this->authService->login(
            $request->validated()
        );

        if (! $result['success']) {

            if ($result['status'] === 401) {
                return $this->unauthorized($result['message']);
            }

            if ($result['status'] === 403) {
                return $this->forbidden($result['message']);
            }

            return $this->error(
                $result['message'],
                null,
                $result['status']
            );
        }

        return $this->success(
            [
                'token' => $result['token'],
                'user' => new UserResource($result['user']),
            ],
            __('login_success')
        );
    }

    /**
     * Logout user.
     */
    public function logout(Request $request)
    {
        $this->authService->logout(
            $request->user()
        );

        return $this->success(
            null,
            __('logout_success')
        );
    }

    /**
     * Authenticated user.
     */
    public function me(Request $request)
    {
        return $this->success(
            new UserResource($request->user()),
            __('authenticated_user')
        );
    }
}
