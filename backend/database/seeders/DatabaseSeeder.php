<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            ServiceSeeder::class,
            PortfolioSeeder::class,
            TestimonialSeeder::class,
            TeamMemberSeeder::class,
	    PackageSeeder::class,
            UserSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
