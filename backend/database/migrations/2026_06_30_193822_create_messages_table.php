<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->text('message');
            $table->string('attachment')->nullable();
            $table->boolean('seen')->default(false);
            $table->timestamp('seen_at')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('conversation_id');
            $table->index('sender_id');
            $table->index('seen');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
