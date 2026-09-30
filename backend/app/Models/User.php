<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\Auth\VerifyEmailNotification;
use App\Notifications\Auth\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'profile_photo_path',
        'language',
        'status',
        'email_verified_at',
        'must_change_password',

        /*
        |--------------------------------------------------------------------------
        | Email Verification OTP
        |--------------------------------------------------------------------------
        */

        'email_verification_otp',
        'email_verification_otp_expires_at',

        /*
        |--------------------------------------------------------------------------
        | Password Reset OTP
        |--------------------------------------------------------------------------
        */

        'password_reset_otp',
        'password_reset_otp_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',

        // Never expose OTPs
        'email_verification_otp',
        'password_reset_otp',
    ];

    /**
     * Attribute casting.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',

            'password' => 'hashed',

            'must_change_password' => 'boolean',

            'email_verification_otp_expires_at' => 'datetime',

            'password_reset_otp_expires_at' => 'datetime',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /**
     * A user can have many orders.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * A user can send many messages.
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Customer conversations.
     */
    public function conversations()
    {
        return $this->hasMany(
            Conversation::class,
            'customer_id'
        );
    }

    /**
     * Admin activity logs.
     */
    public function adminLogs()
    {
        return $this->hasMany(
            AdminLog::class,
            'admin_id'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Query Scopes
    |--------------------------------------------------------------------------
    */

    /**
     * Search users.
     */
    public function scopeSearch(
        $query,
        ?string $search
    ) {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {

            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");

        });
    }

    /**
     * Filter by role.
     */
    public function scopeRole(
        $query,
        ?string $role
    ) {
        if (!$role) {
            return $query;
        }

        return $query->where(
            'role',
            $role
        );
    }

    /**
     * Filter by status.
     */
    public function scopeStatus(
        $query,
        ?string $status
    ) {
        if (!$status) {
            return $query;
        }

        return $query->where(
            'status',
            $status
        );
    }

    /**
     * Filter by language.
     */
    public function scopeLanguage(
        $query,
        ?string $language
    ) {
        if (!$language) {
            return $query;
        }

        return $query->where(
            'language',
            $language
        );
    }

    /**
     * Filter verified users.
     */
    public function scopeVerified(
        $query,
        ?bool $verified
    ) {
        if (is_null($verified)) {
            return $query;
        }

        if ($verified) {
            return $query->whereNotNull(
                'email_verified_at'
            );
        }

        return $query->whereNull(
            'email_verified_at'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    /**
     * Notifications received by the user.
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Send Email Verification OTP.
     */
    public function sendEmailVerificationNotification(): void
    {
        $this->notify(
            new VerifyEmailNotification(
                $this->email_verification_otp
            )
        );
    }



    /**
     * Send Password Reset OTP.
     */
    public function sendPasswordResetNotification(
        $otp
    ): void {
        $this->notify(
            new ResetPasswordNotification(
                $otp
            )
        );
    }
}
