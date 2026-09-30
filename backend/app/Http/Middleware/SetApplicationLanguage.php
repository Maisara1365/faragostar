<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetApplicationLanguage
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            App::setLocale($request->user()->language);
        } else {
            App::setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
