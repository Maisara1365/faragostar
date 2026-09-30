<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio', function (Blueprint $table) {

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
            | Category
            |--------------------------------------------------------------------------
            */

            $table->string('category_fa');

            $table->string('category_en');

            /*
            |--------------------------------------------------------------------------
            | Description
            |--------------------------------------------------------------------------
            */

            $table->text('description_fa')->nullable();

            $table->text('description_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            $table->string('image')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Project Information
            |--------------------------------------------------------------------------
            */

            $table->string('project_url')->nullable();

            $table->string('client_name')->nullable();

            $table->date('completion_date')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            $table->string('theme_color')
                ->default('#183B73');

            $table->boolean('is_featured')
                ->default(false);

            $table->integer('display_order')
                ->default(0);

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

            $table->index('category_fa');

            $table->index('category_en');

            $table->index('status');

            $table->index('is_featured');

            $table->index('display_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio');
    }
};
