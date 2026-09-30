<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Company Identity
            |--------------------------------------------------------------------------
            */

            $table->string('company_name_fa');
            $table->string('company_name_en');

            // Short English brand name
            // Example: Faragostar
            $table->string('en_brand_name');
            $table->string('fa_brand_name');

            /*
            |--------------------------------------------------------------------------
            | Contact Information
            |--------------------------------------------------------------------------
            */

            $table->string('company_email')->nullable();

            // Phone 1 - always used as the WhatsApp number
            $table->string('phone_1_fa')->nullable();
            $table->string('phone_1_en')->nullable();

            // Phone 2
            $table->string('phone_2_fa')->nullable();
            $table->string('phone_2_en')->nullable();

            // Company address
            $table->text('company_address_fa')->nullable();
            $table->text('company_address_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Company Description
            |--------------------------------------------------------------------------
            */

            $table->longText('about_company_fa')->nullable();
            $table->longText('about_company_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Branding
            |--------------------------------------------------------------------------
            */

            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Theme Colors
            |--------------------------------------------------------------------------
            */

            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('dark_color')->nullable();
            $table->string('light_color')->nullable();
            $table->string('white_color')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->string('telegram')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Website
            |--------------------------------------------------------------------------
            */

            $table->string('website')->nullable();

            $table->text('google_map')->nullable();

            $table->text('working_hours_fa')->nullable();
            $table->text('working_hours_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | SEO - Persian
            |--------------------------------------------------------------------------
            */

            $table->string('meta_title_fa')->nullable();
            $table->text('meta_description_fa')->nullable();
            $table->text('meta_keywords_fa')->nullable();

            /*
            |--------------------------------------------------------------------------
            | SEO - English
            |--------------------------------------------------------------------------
            */

            $table->string('meta_title_en')->nullable();
            $table->text('meta_description_en')->nullable();
            $table->text('meta_keywords_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | System
            |--------------------------------------------------------------------------
            */

            $table->string('default_language')->default('fa');

            $table->text('copyright_fa')->nullable();
            $table->text('copyright_en')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
