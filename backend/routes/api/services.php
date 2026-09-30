<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Service\ServiceController;
use App\Http\Controllers\Api\Package\PackageController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| These routes are accessible without authentication.
| They are used by the company website.
|
*/

Route::get(
    '/services',
    [ServiceController::class, 'active']
);

Route::get(
    '/services/featured',
    [ServiceController::class, 'featured']
);

/*
|--------------------------------------------------------------------------
| Public Service Detail
|--------------------------------------------------------------------------
|
| Use the service slug instead of the service ID.
|
*/

Route::get(
    '/services/{service:slug}',
    [ServiceController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Public Package Routes
|--------------------------------------------------------------------------
*/

Route::get(
    '/services/{service:slug}/packages',
    [PackageController::class, 'active']
);

Route::get(
    '/services/{service:slug}/packages/featured',
    [PackageController::class, 'featured']
);

Route::get(
    '/packages/{package}',
    [PackageController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
|
| Only authenticated administrators can manage services and packages.
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
    | Services
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/services',
        [ServiceController::class, 'index']
    );

    Route::post(
        '/admin/services',
        [ServiceController::class, 'store']
    );

    Route::get(
        '/admin/services/{service}',
        [ServiceController::class, 'show']
    );

    Route::put(
        '/admin/services/{service}',
        [ServiceController::class, 'update']
    );

    Route::delete(
        '/admin/services/{service}',
        [ServiceController::class, 'destroy']
    );

    Route::patch(
        '/admin/services/{service}/activate',
        [ServiceController::class, 'activate']
    );

    Route::patch(
        '/admin/services/{service}/deactivate',
        [ServiceController::class, 'deactivate']
    );

    Route::patch(
        '/admin/services/{service}/feature',
        [ServiceController::class, 'feature']
    );

    Route::patch(
        '/admin/services/{service}/unfeature',
        [ServiceController::class, 'unfeature']
    );

    /*
    |--------------------------------------------------------------------------
    | Packages
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/packages',
        [PackageController::class, 'index']
    );

    Route::post(
        '/admin/packages',
        [PackageController::class, 'store']
    );

    Route::get(
        '/admin/packages/{package}',
        [PackageController::class, 'show']
    );

    Route::put(
        '/admin/packages/{package}',
        [PackageController::class, 'update']
    );

    Route::delete(
        '/admin/packages/{package}',
        [PackageController::class, 'destroy']
    );

    Route::patch(
        '/admin/packages/{package}/activate',
        [PackageController::class, 'activate']
    );

    Route::patch(
        '/admin/packages/{package}/deactivate',
        [PackageController::class, 'deactivate']
    );

    Route::patch(
        '/admin/packages/{package}/feature',
        [PackageController::class, 'feature']
    );

    Route::patch(
        '/admin/packages/{package}/unfeature',
        [PackageController::class, 'unfeature']
    );

});

