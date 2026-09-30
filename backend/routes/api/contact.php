<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Contact\ContactMessageController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| These routes are accessible without authentication.
|
*/

// Send a contact message
Route::post(
    '/contact',
    [ContactMessageController::class, 'store']
);




/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
|
| Only authenticated administrators can manage contact messages.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:admin',
])->group(function () {

    // List all messages
    Route::get(
        '/admin/contact-messages',
        [ContactMessageController::class, 'index']
    );

    // View one message
    Route::get(
        '/admin/contact-messages/{contactMessage}',
        [ContactMessageController::class, 'show']
    );

    // Update message
    Route::put(
        '/admin/contact-messages/{contactMessage}',
        [ContactMessageController::class, 'update']
    );

    // Unread messages
    Route::get(
        '/admin/contact-messages/unread',
        [ContactMessageController::class, 'unread']
    );

    // Read messages
    Route::get(
        '/admin/contact-messages/read',
        [ContactMessageController::class, 'read']
    );

    // Replied messages
    Route::get(
        '/admin/contact-messages/replied',
        [ContactMessageController::class, 'replied']
    );

    // Mark as read
    Route::patch(
        '/admin/contact-messages/{contactMessage}/read',
        [ContactMessageController::class, 'markAsRead']
    );

    // Mark as replied
    Route::patch(
        '/admin/contact-messages/{contactMessage}/replied',
        [ContactMessageController::class, 'markAsReplied']
    );

});