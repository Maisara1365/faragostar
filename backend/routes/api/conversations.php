<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Conversation\ConversationController;

Route::middleware('auth:sanctum')->group(function () {

    // Customer conversations
    Route::get('/conversations/my', [
        ConversationController::class,
        'myConversations'
    ]);

    // Create conversation
    Route::post('/conversations', [
        ConversationController::class,
        'store'
    ]);

    // Admin - all conversations
    Route::get('/conversations', [
        ConversationController::class,
        'index'
    ]);

    // Single conversation
    Route::get('/conversations/{conversation}', [
        ConversationController::class,
        'show'
    ]);

    // Update conversation
    Route::put('/conversations/{conversation}', [
        ConversationController::class,
        'update'
    ]);

    // Assign admin
    Route::post('/conversations/{conversation}/assign', [
        ConversationController::class,
        'assignAdmin'
    ]);

    // Open
    Route::post('/conversations/{conversation}/open', [
        ConversationController::class,
        'open'
    ]);

    // Close
    Route::post('/conversations/{conversation}/close', [
        ConversationController::class,
        'close'
    ]);

});