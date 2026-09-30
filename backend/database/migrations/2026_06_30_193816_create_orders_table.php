<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->foreignId('package_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('budget', 10, 2)->nullable();
            $table->date('deadline')->nullable();
            $table->enum('status', [
                'pending',
                'in_progress',
                'completed',
                'delivered',
                'cancelled'
            ])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->foreignId('conversation_id')
                ->nullable()
                ->constrained('conversations')
                ->nullOnDelete();
            $table->timestamps();

            // Indexes for performance
            $table->index('order_number');
            $table->index('user_id');
            $table->index('service_id');
            $table->index('status');
            $table->index('payment_status');
            $table->index('created_at');
            $table->index('conversation_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};