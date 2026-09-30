<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Team\TeamMemberController;

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
    '/team-members',
    [TeamMemberController::class, 'active']
);

Route::get(
    '/team-members/{teamMember}',
    [TeamMemberController::class, 'show']
);

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
|
| Only authenticated administrators can manage team members.
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
    | Team Member Management
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/team-members',
        [TeamMemberController::class, 'index']
    );

    Route::post(
        '/admin/team-members',
        [TeamMemberController::class, 'store']
    );

    Route::get(
        '/admin/team-members/{teamMember}',
        [TeamMemberController::class, 'show']
    );

    Route::put(
        '/admin/team-members/{teamMember}',
        [TeamMemberController::class, 'update']
    );

    Route::delete(
        '/admin/team-members/{teamMember}',
        [TeamMemberController::class, 'destroy']
    );

    Route::patch(
        '/admin/team-members/{teamMember}/activate',
        [TeamMemberController::class, 'activate']
    );

    Route::patch(
        '/admin/team-members/{teamMember}/deactivate',
        [TeamMemberController::class, 'deactivate']
    );

});
