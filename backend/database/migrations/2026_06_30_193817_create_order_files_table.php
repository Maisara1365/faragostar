<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_path');
            $table->integer('file_size')->nullable(); // Size in bytes
            $table->string('file_type')->nullable(); // MIME type
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            // Indexes
            $table->index('order_id');
            $table->index('uploaded_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_files');
    }
};
