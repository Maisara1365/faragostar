<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmailVerificationOtp extends Model
{
    /*
    |--------------------------------------------------------------------------
    | Mass Assignment
    |--------------------------------------------------------------------------
    */

    protected $fillable = [

        'user_id',

        'otp',

        'expires_at',

        'attempts',

        'is_used',

    ];

    /*
    |--------------------------------------------------------------------------
    | Attribute Casting
    |--------------------------------------------------------------------------
    */

    protected $casts = [

        'expires_at' => 'datetime',

        'is_used' => 'boolean',

    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /**
     * OTP belongs to one user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    /**
     * Check whether the OTP has expired.
     */
    public function isExpired(): bool
    {
        return now()->greaterThan($this->expires_at);
    }

    /**
     * Check whether the OTP can still be used.
     */
    public function isValid(): bool
    {
        return ! $this->is_used
            && ! $this->isExpired();
    }
}
