<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Testimonial\TestimonialController;

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
    '/testimonials',
    [TestimonialController::class, 'public']
);

Route::get(
    '/testimonials/featured',
    [TestimonialController::class, 'featured']
);

Route::get(
    '/testimonials/high-rated',
    [TestimonialController::class, 'highRated']
);

Route::get(
    '/testimonials/{testimonial}',
    [TestimonialController::class, 'show']
);




/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
|
| Only authenticated administrators can manage testimonials.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:admin',
])->group(function () {

    Route::get(
        '/admin/testimonials',
        [TestimonialController::class, 'index']
    );

    Route::post(
        '/admin/testimonials',
        [TestimonialController::class, 'store']
    );

    Route::put(
        '/admin/testimonials/{testimonial}',
        [TestimonialController::class, 'update']
    );

    Route::delete(
        '/admin/testimonials/{testimonial}',
        [TestimonialController::class, 'destroy']
    );

    Route::patch(
        '/admin/testimonials/{testimonial}/activate',
        [TestimonialController::class, 'activate']
    );

    Route::patch(
        '/admin/testimonials/{testimonial}/deactivate',
        [TestimonialController::class, 'deactivate']
    );

    Route::patch(
        '/admin/testimonials/{testimonial}/feature',
        [TestimonialController::class, 'feature']
    );

    Route::patch(
        '/admin/testimonials/{testimonial}/unfeature',
        [TestimonialController::class, 'unfeature']
    );

});
