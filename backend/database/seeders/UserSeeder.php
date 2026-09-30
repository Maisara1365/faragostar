<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Customer
        |--------------------------------------------------------------------------
        */

        User::updateOrCreate(
            [
                'email' => 'akbarishamim2001@gmail.com',
            ],
            [
                'name' => 'Shamim Akbari',
                'phone' => '+93792590775',
                'password' => Hash::make('Shamim@2001'),
                'role' => 'customer',
                'language' => 'en',
                'status' => 'active',
                'email_verified_at' => Carbon::now(),
                'must_change_password' => false,
                'email_verification_otp' => null,
                'email_verification_otp_expires_at' => null,
                'password_reset_otp' => null,
                'password_reset_otp_expires_at' => null,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        */

        User::updateOrCreate(
            [
                'email' => 'fatimaakbari@gmail.com',
            ],
            [
                'name' => 'Fatima',
                'phone' => '+93790000001',
                'password' => Hash::make('Shamim@2001'),
                'role' => 'content_manager',
                'language' => 'en',
                'status' => 'active',
                'email_verified_at' => Carbon::now(),
                'must_change_password' => false,
                'email_verification_otp' => null,
                'email_verification_otp_expires_at' => null,
                'password_reset_otp' => null,
                'password_reset_otp_expires_at' => null,
            ]
        );
    }
}