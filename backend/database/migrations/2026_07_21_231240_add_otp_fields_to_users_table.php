<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            /*
            |--------------------------------------------------------------------------
            | Email Verification OTP
            |--------------------------------------------------------------------------
            */

            $table->string('email_verification_otp', 6)
                ->nullable()
                ->after('email_verified_at');

            $table->timestamp('email_verification_otp_expires_at')
                ->nullable()
                ->after('email_verification_otp');

            /*
            |--------------------------------------------------------------------------
            | Password Reset OTP
            |--------------------------------------------------------------------------
            */

            $table->string('password_reset_otp', 6)
                ->nullable()
                ->after('email_verification_otp_expires_at');

            $table->timestamp('password_reset_otp_expires_at')
                ->nullable()
                ->after('password_reset_otp');

            /*
            |--------------------------------------------------------------------------
            | Force Password Change
            |--------------------------------------------------------------------------
            */

            $table->boolean('must_change_password')
                ->default(false)
                ->after('password_reset_otp_expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn([
                'email_verification_otp',
                'email_verification_otp_expires_at',
                'password_reset_otp',
                'password_reset_otp_expires_at',
                'must_change_password',
            ]);

        });
    }
};
