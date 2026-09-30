<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {

            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Relationship
            |--------------------------------------------------------------------------
            */

            $table->foreignId('service_id')
                ->constrained()
                ->cascadeOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Multilingual Name
            |--------------------------------------------------------------------------
            */

            $table->string('name_fa');

            $table->string('name_en');

            /*
            |--------------------------------------------------------------------------
            | Multilingual Description
            |--------------------------------------------------------------------------
            */

            $table->text('description_fa')
                ->nullable();

            $table->text('description_en')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | Business
            |--------------------------------------------------------------------------
            */

            $table->decimal('price',10,2);

            $table->integer('delivery_days')
                ->nullable();

            $table->integer('revisions')
                ->default(0);

            /*
            |--------------------------------------------------------------------------
            | Package Features
            |--------------------------------------------------------------------------
            */

            $table->json('features_fa')
                ->nullable();

            $table->json('features_en')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            $table->integer('display_order')
                ->default(0);

            $table->boolean('is_featured')
                ->default(false);

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            $table->enum('status',[
                'active',
                'inactive'
            ])->default('active');

            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Indexes
            |--------------------------------------------------------------------------
            */

            $table->index('service_id');

            $table->index('status');

            $table->index('display_order');

            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};