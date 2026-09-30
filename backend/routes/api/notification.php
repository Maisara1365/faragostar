<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Notification\NotificationController;

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/notifications',
        [NotificationController::class, 'index']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationController::class, 'unreadCount']
    );

    Route::patch(
        '/notifications/{notification}/read',
        [NotificationController::class, 'markAsRead']
    );

    Route::patch(
        '/notifications/read-all',
        [NotificationController::class, 'markAllAsRead']
    );

    Route::delete(
        '/notifications/{notification}',
        [NotificationController::class, 'destroy']
    );

});
