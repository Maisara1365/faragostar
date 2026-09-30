<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreAdminRequest;
use App\Http\Requests\User\StoreContentManagerRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\User\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {}

    /**
     * List all administrators.
     */
    public function admins(Request $request)
    {
        return $this->success(
            UserResource::collection(
                $this->userService->getAdmins(
                    $request->only([
                        'search',
                        'status',
                        'language',
                        'verified',
                        'per_page',
                    ])
                )
            ),
            'Administrators retrieved successfully.'
        );
    }

    /**
     * Create administrator.
     */
    public function storeAdmin(
        StoreAdminRequest $request
    ) {
        $user = $this->userService->createAdmin(
            $request->validated()
        );

        return $this->success(
            new UserResource($user),
            'Administrator created successfully.',
            201
        );
    }

    /**
     * List all content managers.
     */
    public function contentManagers(Request $request)
    {
        return $this->success(
            UserResource::collection(
                $this->userService->getContentManagers(
                    $request->only([
                        'search',
                        'status',
                        'language',
                        'verified',
                        'per_page',
                    ])
                )
            ),
            'Content managers retrieved successfully.'
        );
    }

    /**
     * Create content manager.
     */
    public function storeContentManager(
        StoreContentManagerRequest $request
    ) {
        $user = $this->userService->createContentManager(
            $request->validated()
        );

        return $this->success(
            new UserResource($user),
            'Content manager created successfully.',
            201
        );
    }

    /**
     * List all customers.
     */
    public function customers(Request $request)
    {
        return $this->success(
            UserResource::collection(
                $this->userService->getCustomers(
                    $request->only([
                        'search',
                        'status',
                        'language',
                        'verified',
                        'per_page',
                    ])
                )
            ),
            'Customers retrieved successfully.'
        );
    }

    /**
     * Show a single user.
     */
    public function show(
        User $user
    ) {
        return $this->success(
            new UserResource($user),
            'User retrieved successfully.'
        );
    }

    /**
     * Update user.
     */
    public function update(
        UpdateUserRequest $request,
        User $user
    ) {
        $user = $this->userService->update(
            $user,
            $request->validated()
        );

        return $this->success(
            new UserResource($user),
            'User updated successfully.'
        );
    }

    /**
     * Activate user.
     */
    public function activate(
        User $user
    ) {
        $user = $this->userService->activate(
            $user
        );

        return $this->success(
            new UserResource($user),
            'User activated successfully.'
        );
    }

    /**
     * Block user.
     */
    public function block(
        User $user
    ) {
        if (auth()->id() === $user->id) {
            return $this->forbidden(
                'You cannot block your own account.'
            );
        }

        $user = $this->userService->block(
            $user
        );

        return $this->success(
            new UserResource($user),
            'User blocked successfully.'
        );
    }

    /**
     * Delete user.
     */
    public function destroy(User $user)
    {
        $this->userService->delete($user);

        return $this->success(
            null,
            'User deleted successfully.'
        );
    }

    /**
     * Customer Profile.
     */
    public function profile(Request $request)
    {
        return $this->success(
            $this->userService->profile(
                $request->user()
            ),
            'Profile retrieved successfully.'
        );
    }

    /**
     * Update authenticated customer profile.
     */
    public function updateProfile(
        UpdateProfileRequest $request
    ) {
        $user = $this->userService->updateProfile(
            auth()->user(),
            $request->validated()
        );

        return $this->success(
            new UserResource($user),
            'Profile updated successfully.'
        );
    }

    /**
     * Upload profile photo.
     */
    public function uploadProfilePhoto(
        Request $request
    ) {
        $request->validate([
            'photo' => [
                'required',
                'image',
                'max:5120',
            ],
        ]);

        $user = $this->userService->uploadProfilePhoto(
            auth()->user(),
            $request->file('photo')
        );

        return $this->success(
            new UserResource($user),
            'Profile photo uploaded successfully.'
        );
    }

    /**
     * Delete profile photo.
     */
    public function deleteProfilePhoto()
    {
        $user = $this->userService->deleteProfilePhoto(
            auth()->user()
        );

        return $this->success(
            new UserResource($user),
            'Profile photo deleted successfully.'
        );
    }

    /**
     * Change password.
     */
    public function changePassword(
        ChangePasswordRequest $request
    ) {
        $this->userService->changePassword(
            auth()->user(),
            $request->validated()
        );

        return $this->success(
            null,
            'Password changed successfully.'
        );
    }
}
