<?php

namespace App\Http\Controllers\Api\Service;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\StoreServiceRequest;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Services\Service\ServiceService;

class ServiceController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private readonly ServiceService $serviceService
    ) {}

    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    /**
     * Display all services.
     */
    public function index()
    {
        return $this->success(
            ServiceResource::collection(
                $this->serviceService->getAll()
            ),
            'Services retrieved successfully.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Public Website
    |--------------------------------------------------------------------------
    */

    /**
     * Display active services.
     */
    public function active()
    {
        return $this->success(
            ServiceResource::collection(
                $this->serviceService->getActive()
            ),
            'Active services retrieved successfully.'
        );
    }

    /**
     * Display featured services.
     */
    public function featured()
    {
        return $this->success(
            ServiceResource::collection(
                $this->serviceService->getFeatured()
            ),
            'Featured services retrieved successfully.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */

    /**
     * Store a new service.
     */
    public function store(StoreServiceRequest $request)
    {
        return $this->success(
            new ServiceResource(
                $this->serviceService->create(
                    $request->validated()
                )
            ),
            'Service created successfully.',
            201
        );
    }

    /**
     * Display a service.
     */
    public function show(Service $service)
    {
        $service->loadCount('packages');

        return $this->success(
            new ServiceResource(

                $service->load([

                    'packages' => function ($query) {

                        $query
                            ->active()
                            ->ordered();

                    },

                ])

            ),
            'Service retrieved successfully.'
        );
    }

    /**
     * Update a service.
     */
    public function update(
        UpdateServiceRequest $request,
        Service $service
    ) {
        return $this->success(
            new ServiceResource(
                $this->serviceService->update(
                    $service,
                    $request->validated()
                )
            ),
            'Service updated successfully.'
        );
    }

    /**
     * Delete a service.
     */
    public function destroy(Service $service)
    {
        $this->serviceService->delete($service);

        return $this->success(
            null,
            'Service deleted successfully.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Featured
    |--------------------------------------------------------------------------
    */

    /**
     * Mark as featured.
     */
    public function feature(Service $service)
    {
        return $this->success(
            new ServiceResource(
                $this->serviceService->setFeatured(
                    $service,
                    true
                )
            ),
            'Service marked as featured successfully.'
        );
    }

    /**
     * Remove featured status.
     */
    public function unfeature(Service $service)
    {
        return $this->success(
            new ServiceResource(
                $this->serviceService->setFeatured(
                    $service,
                    false
                )
            ),
            'Service removed from featured successfully.'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    /**
     * Activate service.
     */
    public function activate(Service $service)
    {
        return $this->success(
            new ServiceResource(
                $this->serviceService->setStatus(
                    $service,
                    'active'
                )
            ),
            'Service activated successfully.'
        );
    }

    /**
     * Deactivate service.
     */
    public function deactivate(Service $service)
    {
        return $this->success(
            new ServiceResource(
                $this->serviceService->setStatus(
                    $service,
                    'inactive'
                )
            ),
            'Service deactivated successfully.'
        );
    }
}
