<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Multilingual
            |--------------------------------------------------------------------------
            */

            $table->string('name_fa');

            $table->string('name_en');

            $table->string('designation_fa');

            $table->string('designation_en');

            $table->text('bio_fa')->nullable();

            $table->text('bio_en')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            $table->string('image')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Social Media
            |--------------------------------------------------------------------------
            */

            $table->string('facebook')->nullable();

            $table->string('instagram')->nullable();

            $table->string('linkedin')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

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

            $table->index('status');

            $table->index('display_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
