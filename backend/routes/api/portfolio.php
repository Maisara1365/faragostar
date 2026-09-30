<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Portfolio\PortfolioController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| These routes are accessible without authentication.
| They are used by the company website.
|
*/

/*
|--------------------------------------------------------------------------
| Portfolio
|--------------------------------------------------------------------------
*/

Route::get(
    '/portfolio',
    [PortfolioController::class, 'active']
);

Route::get(
    '/portfolio/featured',
    [PortfolioController::class, 'featured']
);

Route::get(
    '/portfolio/category/{category}',
    [PortfolioController::class, 'category']
);

/*
|--------------------------------------------------------------------------
| Single Portfolio by Slug
|--------------------------------------------------------------------------
|
| IMPORTANT:
| The ":slug" tells Laravel to find the Portfolio model using
| its "slug" column instead of its "id".
|
| Example:
| /api/portfolio/restaurant-branding
|
*/

Route::get(
    '/portfolio/{portfolio:slug}',
    [PortfolioController::class, 'show']
);


/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
|
| Only authenticated administrators can manage portfolio items.
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
    | Portfolio Management
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/portfolio',
        [PortfolioController::class, 'index']
    );

    Route::post(
        '/admin/portfolio',
        [PortfolioController::class, 'store']
    );

    Route::get(
        '/admin/portfolio/{portfolio}',
        [PortfolioController::class, 'show']
    );

    Route::put(
        '/admin/portfolio/{portfolio}',
        [PortfolioController::class, 'update']
    );

    Route::delete(
        '/admin/portfolio/{portfolio}',
        [PortfolioController::class, 'destroy']
    );

    Route::patch(
        '/admin/portfolio/{portfolio}/activate',
        [PortfolioController::class, 'activate']
    );

    Route::patch(
        '/admin/portfolio/{portfolio}/deactivate',
        [PortfolioController::class, 'deactivate']
    );

    Route::patch(
        '/admin/portfolio/{portfolio}/feature',
        [PortfolioController::class, 'feature']
    );

    Route::patch(
        '/admin/portfolio/{portfolio}/unfeature',
        [PortfolioController::class, 'unfeature']
    );

});