<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Titles
            |--------------------------------------------------------------------------
            */

            $table->string('title_fa');

            $table->string('title_en');

            /*
            |--------------------------------------------------------------------------
            | Slug
            |--------------------------------------------------------------------------
            */

            $table->string('slug')->unique();

            /*
            |--------------------------------------------------------------------------
            | Short Description
            |--------------------------------------------------------------------------
            */

            $table->string('short_description_fa', 255)->nullable();

            $table->string('short_description_en', 255)->nullable();

            /*
            |--------------------------------------------------------------------------
            | Full Description
            |--------------------------------------------------------------------------
            */

            $table->text('description_fa')->nullable();

            $table->text('description_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            $table->string('icon')->nullable();

            $table->string('cover_image')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Pricing
            |--------------------------------------------------------------------------
            */

            $table->decimal('starting_price', 10, 2)->nullable();

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            $table->boolean('is_featured')->default(false);

            $table->integer('display_order')->default(0);

            /*
            |--------------------------------------------------------------------------
            | Theme
            |--------------------------------------------------------------------------
            */

            $table->string('theme_color', 20)
                ->default('#183B73');

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            $table->enum('status', [
                'active',
                'inactive',
            ])->default('active');

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Indexes
            |--------------------------------------------------------------------------
            */

            $table->index('slug');

            $table->index('status');

            $table->index('is_featured');

            $table->index('display_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
