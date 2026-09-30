<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Order\OrderController;

/*
|--------------------------------------------------------------------------
| Customer Routes
|--------------------------------------------------------------------------
|
| Authenticated customers can manage only their own orders.
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
    | Orders
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/customer/orders',
        [OrderController::class, 'myOrders']
    );

    Route::post(
        '/customer/orders',
        [OrderController::class, 'store']
    );

    Route::get(
        '/customer/orders/{order}',
        [OrderController::class, 'show']
    );

    Route::put(
        '/customer/orders/{order}',
        [OrderController::class, 'update']
    );

    Route::delete(
        '/customer/orders/{order}',
        [OrderController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Order Files
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/customer/orders/{order}/files',
        [OrderController::class, 'uploadFile']
    );

    Route::delete(
        '/customer/order-files/{orderFile}',
        [OrderController::class, 'deleteFile']
    );

});


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Administrators have full access to all orders.
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
    | Orders
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/admin/orders',
        [OrderController::class, 'index']
    );

    Route::get(
        '/admin/orders/{order}',
        [OrderController::class, 'show']
    );

    Route::put(
        '/admin/orders/{order}',
        [OrderController::class, 'update']
    );

    Route::delete(
        '/admin/orders/{order}',
        [OrderController::class, 'destroy']
    );

    /*
    |--------------------------------------------------------------------------
    | Status Management
    |--------------------------------------------------------------------------
    */

    Route::patch(
        '/admin/orders/{order}/status',
        [OrderController::class, 'updateStatus']
    );

    Route::patch(
        '/admin/orders/{order}/payment-status',
        [OrderController::class, 'updatePaymentStatus']
    );

    /*
    |--------------------------------------------------------------------------
    | Order Files
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/admin/orders/{order}/files',
        [OrderController::class, 'uploadFile']
    );

    Route::delete(
        '/admin/order-files/{orderFile}',
        [OrderController::class, 'deleteFile']
    );

});

/*
|--------------------------------------------------------------------------
| Content Manager Routes
|--------------------------------------------------------------------------
|
| Content managers can only view orders when supporting customers.
| They cannot create, update, delete, or change order status.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:content_manager',
])->group(function () {

    Route::get(
        '/content-manager/orders',
        [OrderController::class, 'index']
    );

    Route::get(
        '/content-manager/orders/{order}',
        [OrderController::class, 'show']
    );

});