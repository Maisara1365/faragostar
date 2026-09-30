<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Message\MessageController;
use App\Http\Controllers\Api\Conversation\ConversationController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| These routes are accessible only by authenticated administrators.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:admin',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/profile',
        [UserController::class, 'profile']
    );

    Route::put(
        '/admin/profile',
        [UserController::class, 'updateProfile']
    );

    Route::post(
        '/admin/profile/photo',
        [UserController::class, 'uploadProfilePhoto']
    );

    Route::delete(
        '/admin/profile/photo',
        [UserController::class, 'deleteProfilePhoto']
    );

    Route::put(
        '/admin/profile/password',
        [UserController::class, 'changePassword']
    );

    /*
    |--------------------------------------------------------------------------
    | Administrator Management
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/admins',
        [UserController::class, 'admins']
    );

    Route::post(
        '/admin/admins',
        [UserController::class, 'storeAdmin']
    );

    Route::get(
        '/admin/admins/{user}',
        [UserController::class, 'show']
    );

    Route::put(
        '/admin/admins/{user}',
        [UserController::class, 'update']
    );

    Route::patch(
        '/admin/admins/{user}/activate',
        [UserController::class, 'activate']
    );

    Route::patch(
        '/admin/admins/{user}/block',
        [UserController::class, 'block']
    );

    /*
    |--------------------------------------------------------------------------
    | Content Manager Management
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/content-managers',
        [UserController::class, 'contentManagers']
    );

    Route::post(
        '/admin/content-managers',
        [UserController::class, 'storeContentManager']
    );

    Route::get(
        '/admin/content-managers/{user}',
        [UserController::class, 'show']
    );

    Route::put(
        '/admin/content-managers/{user}',
        [UserController::class, 'update']
    );

    Route::patch(
        '/admin/content-managers/{user}/activate',
        [UserController::class, 'activate']
    );

    Route::patch(
        '/admin/content-managers/{user}/block',
        [UserController::class, 'block']
    );

    Route::delete(
        '/admin/content-managers/{user}',
        [UserController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Customer Management
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/customers',
        [UserController::class, 'customers']
    );

    Route::get(
        '/admin/users/{user}',
        [UserController::class, 'show']
    );

    Route::put(
        '/admin/users/{user}',
        [UserController::class, 'update']
    );

    Route::patch(
        '/admin/users/{user}/activate',
        [UserController::class, 'activate']
    );

    Route::patch(
        '/admin/users/{user}/block',
        [UserController::class, 'block']
    );

    Route::delete(
        '/admin/users/{user}',
        [UserController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Conversations
    |--------------------------------------------------------------------------
    |
    | Admin has full conversation management access.
    |
    */

    Route::get(
        '/admin/conversations',
        [ConversationController::class, 'index']
    );

    Route::post(
        '/admin/conversations',
        [ConversationController::class, 'storeForCustomer']
    );

    Route::get(
        '/admin/conversations/{conversation}',
        [ConversationController::class, 'show']
    );

    Route::delete(
    	'/admin/conversations/{conversation}',
    	[ConversationController::class, 'destroy']
    );

    Route::put(
        '/admin/conversations/{conversation}',
        [ConversationController::class, 'update']
    );

    Route::patch(
        '/admin/conversations/{conversation}/assign-admin',
        [ConversationController::class, 'assignAdmin']
    );

    Route::patch(
    	'/admin/conversations/{conversation}/assign-content-manager',
    	[ConversationController::class, 'assignContentManager']
    );

    Route::patch(
        '/admin/conversations/{conversation}/open',
        [ConversationController::class, 'open']
    );

    Route::patch(
        '/admin/conversations/{conversation}/close',
        [ConversationController::class, 'close']
    );

    /*
    |--------------------------------------------------------------------------
    | Messages
    |--------------------------------------------------------------------------
    |
    | Admin has full message access.
    |
    */

    Route::get(
        '/admin/conversations/{conversation}/messages',
        [MessageController::class, 'index']
    );

    Route::post(
        '/admin/messages',
        [MessageController::class, 'store']
    );

    Route::put(
        '/admin/messages/{message}',
        [MessageController::class, 'update']
    );

    Route::patch(
        '/admin/messages/{message}/seen',
        [MessageController::class, 'markAsSeen']
    );

    Route::delete(
        '/admin/messages/{message}/attachment',
        [MessageController::class, 'deleteAttachment']
    );

});