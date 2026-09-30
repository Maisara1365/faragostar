<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerDashboardResource;
use App\Services\Dashboard\CustomerDashboardService;
use Illuminate\Http\Request;

class CustomerDashboardController extends Controller
{
    public function __construct(
        private CustomerDashboardService $dashboardService
    ) {}

    /**
     * Customer dashboard.
     */
    public function index(Request $request)
    {
        return $this->success(
            new CustomerDashboardResource(
                $this->dashboardService->dashboard(
                    $request->user()
                )
            ),
            'Customer dashboard retrieved successfully.'
        );
    }
}
