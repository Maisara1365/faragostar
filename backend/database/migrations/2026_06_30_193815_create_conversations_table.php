<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
		->nullable()
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('admin_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');

            $table->foreignId('content_manager_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');

            $table->string('subject')->nullable();

            $table->enum('status', [
                'open',
                'closed',
            ])->default('open');

            $table->timestamps();

            // Indexes
            $table->index('customer_id');
            $table->index('admin_id');
            $table->index('content_manager_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};