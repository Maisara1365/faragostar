<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsActive
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

        if ($user->status !== 'active') {

            return response()->json([
                'success' => false,
                'message' => 'Your account has been blocked. Please contact the administrator.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        return $next($request);
    }
}
