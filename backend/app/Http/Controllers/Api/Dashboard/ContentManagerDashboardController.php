<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentManagerDashboardResource;
use App\Services\Dashboard\ContentManagerDashboardService;
use Illuminate\Http\Request;

class ContentManagerDashboardController extends Controller
{
    public function __construct(
        private ContentManagerDashboardService $dashboardService
    ) {}

    /**
     * Content manager dashboard.
     */
    public function index(Request $request)
    {
        return $this->success(
            new ContentManagerDashboardResource(
                $this->dashboardService->dashboard(
                    $request->user()
                )
            ),
            'Content manager dashboard retrieved successfully.'
        );
    }
}
