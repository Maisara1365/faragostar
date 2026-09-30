<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Services\Dashboard\DashboardService;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService
    ) {}

    /**
     * Dashboard statistics.
     */
    public function index()
    {
        return $this->success(
            new DashboardResource(
                $this->dashboardService->statistics()
            ),
            'Dashboard statistics retrieved successfully.'
        );
    }
}