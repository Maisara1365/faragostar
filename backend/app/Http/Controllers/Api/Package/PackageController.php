<?php

namespace App\Http\Controllers\Api\Package;

use App\Http\Controllers\Controller;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use App\Models\Service;
use App\Services\Package\PackageService;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function __construct(
        private readonly PackageService $packageService
    ) {}

    /*
    |--------------------------------------------------------------------------
    | Public Website
    |--------------------------------------------------------------------------
    */

    /**
     * Get active packages by service.
     */
    public function active(Service $service)
    {
        return $this->success(
            PackageResource::collection(
                $this->packageService->getActiveByService(
                    $service->id
                )
            ),
            'Active packages retrieved successfully.'
        );
    }


    /**
     * Get featured packages by service.
     */
    public function featured(Service $service)
    {
        return $this->success(
            PackageResource::collection(
                $this->packageService->getFeaturedByService(
                    $service->id
                )
            ),
            'Featured packages retrieved successfully.'
        );
    }


    /**
     * Show single package.
     */
    public function show(Package $package)
    {
        $package->load('service');

        return $this->success(
            new PackageResource($package),
            'Package retrieved successfully.'
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Admin
    |--------------------------------------------------------------------------
    */

    /**
     * Get all packages.
     */
    public function index()
    {
        return $this->success(
            PackageResource::collection(
                $this->packageService->getAll()
            ),
            'Packages retrieved successfully.'
        );
    }


    /**
     * Create package.
     */
    public function store(Request $request)
    {
        $package = $this->packageService->create(
            $request->all()
        );

        return $this->success(
            new PackageResource($package),
            'Package created successfully.',
            201
        );
    }


    /**
     * Update package.
     */
    public function update(
        Request $request,
        Package $package
    ) {
        $package = $this->packageService->update(
            $package,
            $request->all()
        );

        return $this->success(
            new PackageResource($package),
            'Package updated successfully.'
        );
    }


    /**
     * Delete package.
     */
    public function destroy(Package $package)
    {
        $this->packageService->delete(
            $package
        );

        return $this->success(
            null,
            'Package deleted successfully.'
        );
    }


    /**
     * Activate package.
     */
    public function activate(Package $package)
    {
        return $this->success(
            new PackageResource(
                $this->packageService->activate($package)
            ),
            'Package activated successfully.'
        );
    }


    /**
     * Deactivate package.
     */
    public function deactivate(Package $package)
    {
        return $this->success(
            new PackageResource(
                $this->packageService->deactivate($package)
            ),
            'Package deactivated successfully.'
        );
    }


    /**
     * Feature package.
     */
    public function feature(Package $package)
    {
        return $this->success(
            new PackageResource(
                $this->packageService->feature($package)
            ),
            'Package featured successfully.'
        );
    }


    /**
     * Remove featured status.
     */
    public function unfeature(Package $package)
    {
        return $this->success(
            new PackageResource(
                $this->packageService->unfeature($package)
            ),
            'Package unfeatured successfully.'
        );
    }
}
