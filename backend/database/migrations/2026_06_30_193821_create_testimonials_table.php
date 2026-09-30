<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Client Information
            |--------------------------------------------------------------------------
            */

            $table->string('name');

            $table->string('company_fa')->nullable();

            $table->string('company_en')->nullable();

            $table->string('position_fa')->nullable();

            $table->string('position_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            $table->string('image')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Review
            |--------------------------------------------------------------------------
            */

            $table->tinyInteger('rating')->default(5);

            $table->text('review_fa');

            $table->text('review_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            $table->boolean('is_featured')->default(false);

            $table->integer('display_order')->default(0);

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

            $table->index('status');

            $table->index('is_featured');

            $table->index('display_order');

            $table->index('rating');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
