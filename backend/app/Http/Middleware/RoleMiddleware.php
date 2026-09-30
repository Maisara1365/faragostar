<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
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

        if (! in_array($user->role, $roles, true)) {

            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
                'data' => null,
                'errors' => null,
            ], 403);
        }

        return $next($request);
    }
}
