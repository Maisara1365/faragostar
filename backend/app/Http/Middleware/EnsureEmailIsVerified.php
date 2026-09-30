<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
                'data' => null,
                'errors' => null,
            ], 401);
        }

        if (! $user->hasVerifiedEmail()) {

            return response()->json([
                'success' => false,
                'message' => 'Please verify your email before accessing this resource.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        return $next($request);
    }
}
