<?php

namespace App\Services\User;

use App\Mail\StaffAccountCreatedMail;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\Auth\EmailVerificationService;

class UserService
{
    protected EmailVerificationService $emailVerificationService;

    public function __construct(
        EmailVerificationService $emailVerificationService
    ) {
        $this->emailVerificationService = $emailVerificationService;
    }

    /**
     * Get all administrators.
     */
    public function getAdmins(array $filters = [])
    {
        return User::query()
            ->role('admin')
            ->search($filters['search'] ?? null)
            ->status($filters['status'] ?? null)
            ->language($filters['language'] ?? null)
            ->verified(
                isset($filters['verified'])
                    ? filter_var($filters['verified'], FILTER_VALIDATE_BOOLEAN)
                    : null
            )
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 15
            );
    }

    /**
     * Get all content managers.
     */
    public function getContentManagers(array $filters = [])
    {
        return User::query()
            ->role('content_manager')
            ->search($filters['search'] ?? null)
            ->status($filters['status'] ?? null)
            ->language($filters['language'] ?? null)
            ->verified(
                isset($filters['verified'])
                    ? filter_var($filters['verified'], FILTER_VALIDATE_BOOLEAN)
                    : null
            )
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 15
            );
    }

    /**
     * Get all customers.
     */
    public function getCustomers(array $filters = [])
    {
        return User::query()
            ->role('customer')
            ->search($filters['search'] ?? null)
            ->status($filters['status'] ?? null)
            
            ->verified(
                isset($filters['verified'])
                    ? filter_var($filters['verified'], FILTER_VALIDATE_BOOLEAN)
                    : null
            )
            ->latest()
            ->paginate(
                $filters['per_page'] ?? 15
            );
    }

    /**
     * Create administrator.
     */
    public function createAdmin(array $data): User
    {
        return DB::transaction(function () use ($data) {

            $temporaryPassword = Str::password(12);

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => $temporaryPassword,
                'role' => 'admin',
                'status' => 'active',
                'language' => 'fa',
                'must_change_password' => true,
            ]);

            $this->emailVerificationService->sendOtp($user);

            Mail::to($user->email)->send(
                new StaffAccountCreatedMail(
                    $user,
                    $temporaryPassword
                )
            );

            return $user;
        });
    }

    /**
     * Create content manager.
     */
    public function createContentManager(array $data): User
    {
        return DB::transaction(function () use ($data) {

            $temporaryPassword = Str::password(12);

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'password' => $temporaryPassword,
                'role' => 'content_manager',
                'status' => 'active',
                'language' => 'fa',
                'must_change_password' => true,
            ]);

            $this->emailVerificationService->sendOtp($user);

            Mail::to($user->email)->send(
                new StaffAccountCreatedMail(
                    $user,
                    $temporaryPassword
                )
            );

            return $user;
        });
    }

    /**
     * Update user.
     */
    public function update(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {

            unset(
                $data['role'],
                $data['must_change_password'],
                $data['email_verified_at'],
                $data['password']
            );

            $user->update($data);

            return $user->refresh();
        });
    }

    /**
     * Activate user.
     */
    public function activate(User $user): User
    {
        return DB::transaction(function () use ($user) {

            $user->update([
                'status' => 'active',
            ]);

            return $user->refresh();

        });
    }

    /**
     * Block user.
     */
    public function block(User $user): User
    {
        return DB::transaction(function () use ($user) {

            if (Auth::id() === $user->id) {
                abort(
                    403,
                    'You cannot block your own account.'
                );
            }

            if ($user->role === 'admin') {

                $activeAdmins = User::where('role', 'admin')
                    ->where('status', 'active')
                    ->count();

                if ($activeAdmins <= 1) {
                    abort(
                        403,
                        'The last active administrator cannot be blocked.'
                    );
                }
            }

            $user->update([
                'status' => 'blocked',
            ]);

            return $user->refresh();

        });
    }

    /**
     * Customer profile with dashboard statistics.
     */
    public function profile(User $user): array
    {
        return [

            'user' => new \App\Http\Resources\UserResource(
                $user->fresh()
            ),

            'statistics' => [

                'total_orders' => $user
                    ->orders()
                    ->count(),

                'completed_orders' => $user
                    ->orders()
                    ->where('status', 'completed')
                    ->count(),

                'pending_orders' => $user
                    ->orders()
                    ->where('status', 'pending')
                    ->count(),

                'open_conversations' => Conversation::query()
                    ->where('customer_id', $user->id)
                    ->where('status', 'open')
                    ->count(),

            ],

        ];
    }

    /**
     * Update authenticated customer's profile.
     */
    public function updateProfile(
        User $user,
        array $data
    ): User {

        return DB::transaction(function () use (
            $user,
            $data
        ) {

            unset(

                $data['role'],
                $data['status'],
                $data['password'],
                $data['email_verified_at'],
                $data['must_change_password']

            );

            $user->update($data);

            return $user->refresh();

        });

    }

    /**
     * Upload profile photo.
     */
    public function uploadProfilePhoto(
        User $user,
        UploadedFile $photo
    ): User {

        return DB::transaction(function () use (
            $user,
            $photo
        ) {

            if (

                $user->profile_photo_path &&
                Storage::disk('public')->exists(
                    $user->profile_photo_path
                )

            ) {

                Storage::disk('public')->delete(
                    $user->profile_photo_path
                );

            }

            $path = $photo->store(
                'profile-photos',
                'public'
            );

            $user->update([
                'profile_photo_path' => $path,
            ]);

            return $user->refresh();

        });

    }

    /**
     * Delete profile photo.
     */
    public function deleteProfilePhoto(
        User $user
    ): User {

        return DB::transaction(function () use (
            $user
        ) {

            if (

                $user->profile_photo_path &&
                Storage::disk('public')->exists(
                    $user->profile_photo_path
                )

            ) {

                Storage::disk('public')->delete(
                    $user->profile_photo_path
                );

            }

            $user->update([
                'profile_photo_path' => null,
            ]);

            return $user->refresh();

        });

    }

    /**
     * Delete user.
     */
    public function delete(User $user): void
    {
        DB::transaction(function () use ($user) {

            // Prevent deleting yourself
            if (Auth::id() === $user->id) {
                abort(
                    403,
                    'You cannot delete your own account.'
                );
            }

            // Prevent deleting the last admin
            if ($user->role === 'admin') {

                $admins = User::where('role', 'admin')->count();

                if ($admins <= 1) {
                    abort(
                        403,
                        'The last administrator cannot be deleted.'
                    );
                }
            }

            // Delete profile photo
            if (
                $user->profile_photo_path &&
                Storage::disk('public')->exists(
                    $user->profile_photo_path
                )
            ) {

                Storage::disk('public')->delete(
                    $user->profile_photo_path
                );

            }

            $user->delete();

        });
    }

    /**
     * Change password.
     */
    public function changePassword(
        User $user,
        array $data
    ): void {

        if (

            ! Hash::check(
                $data['current_password'],
                $user->password
            )

        ) {

            throw \Illuminate\Validation\ValidationException::withMessages([
                'current_password' => [
                    __('Current password is incorrect.')
                ],
            ]);

        }

        $user->update([

            'password' => $data['password'],

            'must_change_password' => false,

        ]);

    }
}
