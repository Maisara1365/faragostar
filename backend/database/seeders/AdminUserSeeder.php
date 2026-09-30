<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'abdul.rahim.qayoomi.2016@gmail.com',
            ],
            [
                'name' => 'Abdul Rahim Qayomi',

                'phone' => '+93711667511',

                'password' => 'Qayomi@#365',

                'role' => 'admin',

                'status' => 'active',

                'language' => 'fa',

                'email_verified_at' => now(),

                'must_change_password' => false,

                'email_verification_otp' => null,

                'email_verification_otp_expires_at' => null,

                'password_reset_otp' => null,

                'password_reset_otp_expires_at' => null,
            ]
        );
    }
}
