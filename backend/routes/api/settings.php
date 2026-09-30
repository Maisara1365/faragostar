<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Setting\SettingController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| Website settings used by the frontend.
|
*/

Route::get(
    '/settings',
    [SettingController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:admin',
])->group(function () {

    Route::put(
        '/admin/settings',
        [SettingController::class, 'update']
    );

    Route::delete(
        '/admin/settings/logo',
        [SettingController::class, 'deleteLogo']
    );

    Route::delete(
        '/admin/settings/favicon',
        [SettingController::class, 'deleteFavicon']
    );

});