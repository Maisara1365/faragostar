<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Service\ServiceController;
use App\Http\Controllers\Api\Package\PackageController;
use App\Http\Controllers\Api\Portfolio\PortfolioController;
use App\Http\Controllers\Api\Team\TeamMemberController;
use App\Http\Controllers\Api\Testimonial\TestimonialController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Dashboard\ContentManagerDashboardController;
use App\Http\Controllers\Api\Conversation\ConversationController;
use App\Http\Controllers\Api\Message\MessageController;

/*
|--------------------------------------------------------------------------
| Content Manager Routes
|--------------------------------------------------------------------------
|
| Content managers are responsible for website content and
| assigned customer communication.
|
*/

Route::middleware([
    'auth:sanctum',
    'active',
    'verified.api',
    'language',
    'role:content_manager',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/dashboard',
        [ContentManagerDashboardController::class, 'index']
    );

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/profile',
        [UserController::class, 'profile']
    );

    Route::put(
        '/content-manager/profile',
        [UserController::class, 'updateProfile']
    );

    Route::post(
        '/content-manager/profile/photo',
        [UserController::class, 'uploadProfilePhoto']
    );

    Route::delete(
        '/content-manager/profile/photo',
        [UserController::class, 'deleteProfilePhoto']
    );

    Route::put(
        '/content-manager/profile/password',
        [UserController::class, 'changePassword']
    );

    /*
    |--------------------------------------------------------------------------
    | Services
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/services',
        [ServiceController::class, 'index']
    );

    Route::post(
        '/content-manager/services',
        [ServiceController::class, 'store']
    );

    Route::get(
        '/content-manager/services/{service}',
        [ServiceController::class, 'show']
    );

    Route::put(
        '/content-manager/services/{service}',
        [ServiceController::class, 'update']
    );

    Route::delete(
        '/content-manager/services/{service}',
        [ServiceController::class, 'destroy']
    );

    Route::patch(
        '/content-manager/services/{service}/activate',
        [ServiceController::class, 'activate']
    );

    Route::patch(
        '/content-manager/services/{service}/deactivate',
        [ServiceController::class, 'deactivate']
    );

    Route::patch(
        '/content-manager/services/{service}/feature',
        [ServiceController::class, 'feature']
    );

    Route::patch(
        '/content-manager/services/{service}/unfeature',
        [ServiceController::class, 'unfeature']
    );

    /*
    |--------------------------------------------------------------------------
    | Packages
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/packages',
        [PackageController::class, 'index']
    );

    Route::post(
        '/content-manager/packages',
        [PackageController::class, 'store']
    );

    Route::get(
        '/content-manager/packages/{package}',
        [PackageController::class, 'show']
    );

    Route::put(
        '/content-manager/packages/{package}',
        [PackageController::class, 'update']
    );

    Route::delete(
        '/content-manager/packages/{package}',
        [PackageController::class, 'destroy']
    );

    Route::patch(
        '/content-manager/packages/{package}/activate',
        [PackageController::class, 'activate']
    );

    Route::patch(
        '/content-manager/packages/{package}/deactivate',
        [PackageController::class, 'deactivate']
    );

    Route::patch(
        '/content-manager/packages/{package}/feature',
        [PackageController::class, 'feature']
    );

    Route::patch(
        '/content-manager/packages/{package}/unfeature',
        [PackageController::class, 'unfeature']
    );

    /*
    |--------------------------------------------------------------------------
    | Portfolio
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/portfolio',
        [PortfolioController::class, 'index']
    );

    Route::post(
        '/content-manager/portfolio',
        [PortfolioController::class, 'store']
    );

    Route::get(
        '/content-manager/portfolio/{portfolio}',
        [PortfolioController::class, 'show']
    );

    Route::put(
        '/content-manager/portfolio/{portfolio}',
        [PortfolioController::class, 'update']
    );

    Route::delete(
        '/content-manager/portfolio/{portfolio}',
        [PortfolioController::class, 'destroy']
    );

    Route::patch(
        '/content-manager/portfolio/{portfolio}/activate',
        [PortfolioController::class, 'activate']
    );

    Route::patch(
        '/content-manager/portfolio/{portfolio}/deactivate',
        [PortfolioController::class, 'deactivate']
    );

    Route::patch(
        '/content-manager/portfolio/{portfolio}/feature',
        [PortfolioController::class, 'feature']
    );

    Route::patch(
        '/content-manager/portfolio/{portfolio}/unfeature',
        [PortfolioController::class, 'unfeature']
    );

    /*
    |--------------------------------------------------------------------------
    | Team Members
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/team-members',
        [TeamMemberController::class, 'index']
    );

    Route::post(
        '/content-manager/team-members',
        [TeamMemberController::class, 'store']
    );

    Route::get(
        '/content-manager/team-members/{teamMember}',
        [TeamMemberController::class, 'show']
    );

    Route::put(
        '/content-manager/team-members/{teamMember}',
        [TeamMemberController::class, 'update']
    );

    Route::delete(
        '/content-manager/team-members/{teamMember}',
        [TeamMemberController::class, 'destroy']
    );

    Route::patch(
        '/content-manager/team-members/{teamMember}/activate',
        [TeamMemberController::class, 'activate']
    );

    Route::patch(
        '/content-manager/team-members/{teamMember}/deactivate',
        [TeamMemberController::class, 'deactivate']
    );

    /*
    |--------------------------------------------------------------------------
    | Testimonials
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/content-manager/testimonials',
        [TestimonialController::class, 'index']
    );

    Route::post(
        '/content-manager/testimonials',
        [TestimonialController::class, 'store']
    );

    Route::get(
        '/content-manager/testimonials/{testimonial}',
        [TestimonialController::class, 'show']
    );

    Route::put(
        '/content-manager/testimonials/{testimonial}',
        [TestimonialController::class, 'update']
    );

    Route::delete(
        '/content-manager/testimonials/{testimonial}',
        [TestimonialController::class, 'destroy']
    );

    Route::patch(
        '/content-manager/testimonials/{testimonial}/activate',
        [TestimonialController::class, 'activate']
    );

    Route::patch(
        '/content-manager/testimonials/{testimonial}/deactivate',
        [TestimonialController::class, 'deactivate']
    );

    Route::patch(
        '/content-manager/testimonials/{testimonial}/feature',
        [TestimonialController::class, 'feature']
    );

    Route::patch(
        '/content-manager/testimonials/{testimonial}/unfeature',
        [TestimonialController::class, 'unfeature']
    );

    /*
    |--------------------------------------------------------------------------
    | Conversations
    |--------------------------------------------------------------------------
    |
    | Content Manager:
    |
    | ✓ Can view customer conversations assigned to them
    | ✓ Can view individual conversations assigned to them
    | ✓ Can start a conversation with an administrator
    |
    | ✗ Cannot create conversations with customers
    | ✗ Cannot assign administrators
    | ✗ Cannot open conversations
    | ✗ Cannot close conversations
    |
    */

    Route::get(
        '/content-manager/conversations',
        [ConversationController::class, 'index']
    );

    Route::post(
        '/content-manager/conversations',
        [ConversationController::class, 'storeForAdmin']
    );

    Route::get(
        '/content-manager/conversations/{conversation}',
        [ConversationController::class, 'show']
    );

    /*
    |--------------------------------------------------------------------------
    | Messages
    |--------------------------------------------------------------------------
    |
    | Content Manager:
    |
    | ✓ Can read messages in conversations assigned to them
    | ✓ Can send messages in conversations assigned to them
    | ✓ Can mark messages as seen
    |
    | ✗ Cannot edit messages
    | ✗ Cannot delete attachments
    |
    */

    Route::get(
        '/content-manager/conversations/{conversation}/messages',
        [MessageController::class, 'index']
    );

    Route::post(
        '/content-manager/messages',
        [MessageController::class, 'store']
    );

    Route::patch(
        '/content-manager/messages/{message}/seen',
        [MessageController::class, 'markAsSeen']
    );

});