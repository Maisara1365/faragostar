<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Message\MessageController;
use App\Http\Controllers\Api\Conversation\ConversationController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Dashboard\CustomerDashboardController;

/*
|--------------------------------------------------------------------------
| Customer Routes
|--------------------------------------------------------------------------
|
| Customers can manage only their own conversations and messages.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:customer',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Conversations
    |--------------------------------------------------------------------------
    |
    | Customer:
    |
    | ✓ Can view their own conversations
    | ✓ Can create a new conversation
    | ✓ Can view an individual conversation they own
    |
    | ✗ Cannot view other customers' conversations
    | ✗ Cannot assign administrators
    | ✗ Cannot open/close conversations manually
    |
    */

    Route::get(
        '/customer/conversations',
        [ConversationController::class, 'myConversations']
    );

    Route::post(
        '/customer/conversations',
        [ConversationController::class, 'store']
    );

    Route::get(
        '/customer/conversations/{conversation}',
        [ConversationController::class, 'show']
    );


    /*
    |--------------------------------------------------------------------------
    | Messages
    |--------------------------------------------------------------------------
    |
    | Customer:
    |
    | ✓ Can read messages in their own conversations
    | ✓ Can send messages in their own conversations
    | ✓ Can update their own messages
    | ✓ Can mark messages as seen
    | ✓ Can delete attachments from their own messages
    |
    | ✗ Cannot access messages belonging to another customer
    |
    */

    Route::get(
        '/customer/conversations/{conversation}/messages',
        [MessageController::class, 'index']
    );

    Route::post(
        '/customer/messages',
        [MessageController::class, 'store']
    );

    Route::put(
        '/customer/messages/{message}',
        [MessageController::class, 'update']
    );

    Route::patch(
        '/customer/messages/{message}/seen',
        [MessageController::class, 'markAsSeen']
    );

    Route::delete(
        '/customer/messages/{message}/attachment',
        [MessageController::class, 'deleteAttachment']
    );


    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/customer/dashboard',
        [CustomerDashboardController::class, 'index']
    );


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/customer/profile',
        [UserController::class, 'profile']
    );

    Route::put(
        '/customer/profile',
        [UserController::class, 'updateProfile']
    );

    Route::post(
        '/customer/profile/photo',
        [UserController::class, 'updateProfilePhoto']
    );

    Route::put(
        '/customer/profile/password',
        [UserController::class, 'changePassword']
    );

    Route::get(
        '/customer/profile/statistics',
        [UserController::class, 'statistics']
    );

});