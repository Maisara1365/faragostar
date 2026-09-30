<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',

        api: __DIR__ . '/../routes/api.php',

        commands: __DIR__ . '/../routes/console.php',

        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->alias([

            'role' => \App\Http\Middleware\RoleMiddleware::class,

            'active' => \App\Http\Middleware\EnsureUserIsActive::class,

            'verified.api' => \App\Http\Middleware\EnsureEmailIsVerified::class,

            'language' => \App\Http\Middleware\SetApplicationLanguage::class,

        ]);

    })
    ->withExceptions(function (Exceptions $exceptions): void {

        //

    })
    ->create();
