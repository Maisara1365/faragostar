<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Dashboard\DashboardController;

/*
|--------------------------------------------------------------------------
| Dashboard Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:admin',
])->group(function () {

    Route::get(
        '/admin/dashboard',
        [DashboardController::class, 'index']
    );

});
