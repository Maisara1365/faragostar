<?php

namespace App\Services\Package;

use App\Models\Package;
use Illuminate\Support\Facades\DB;

class PackageService
{
    /**
     * Get all packages for admin.
     */
    public function getAll()
    {
        return Package::with('service')
            ->latest()
            ->paginate(15);
    }

    /**
     * Get active packages for website.
     */
    public function getActiveByService(int $serviceId)
    {
        return Package::with('service')
            ->where('service_id', $serviceId)
            ->active()
            ->ordered()
            ->get();
    }

    /**
     * Get featured packages.
     */
    public function getFeatured()
    {
        return Package::with('service')
            ->active()
            ->featured()
            ->ordered()
            ->get();
    }

    /**
     * Get featured packages by service.
     */
    public function getFeaturedByService(int $serviceId)
    {
        return Package::with('service')
            ->where('service_id', $serviceId)
            ->active()
            ->featured()
            ->ordered()
            ->get();
    }

    /**
     * Create package.
     */
    public function create(array $data): Package
    {
        return DB::transaction(function () use ($data) {

            return Package::create([

                /*
                |--------------------------------------------------------------------------
                | Relationship
                |--------------------------------------------------------------------------
                */

                'service_id' => $data['service_id'],

                /*
                |--------------------------------------------------------------------------
                | Multilingual
                |--------------------------------------------------------------------------
                */

                'name_fa' => $data['name_fa'],

                'name_en' => $data['name_en'],

                'description_fa' =>
                    $data['description_fa'] ?? null,

                'description_en' =>
                    $data['description_en'] ?? null,

                /*
                |--------------------------------------------------------------------------
                | Business
                |--------------------------------------------------------------------------
                */

                'price' => $data['price'],

                'delivery_days' =>
                    $data['delivery_days'] ?? null,

                'revisions' =>
                    $data['revisions'] ?? 0,

                'features_fa' =>
                    $data['features_fa'] ?? [],

                'features_en' =>
                    $data['features_en'] ?? [],

                'display_order' =>
                    $data['display_order'] ?? 0,

                'is_featured' =>
                    $data['is_featured'] ?? false,

                'status' =>
                    $data['status'] ?? 'active',

            ]);

        });
    }

    /**
     * Update package.
     */
    public function update(
        Package $package,
        array $data
    ): Package {

        return DB::transaction(function () use (
            $package,
            $data
        ) {

            $package->update($data);

            return $package->refresh();

        });

    }

    /**
     * Activate package.
     */
    public function activate(
        Package $package
    ): Package {

        return DB::transaction(function () use (
            $package
        ) {

            $package->update([
                'status' => 'active',
            ]);

            return $package->refresh();

        });

    }

    /**
     * Deactivate package.
     */
    public function deactivate(
        Package $package
    ): Package {

        return DB::transaction(function () use (
            $package
        ) {

            $package->update([
                'status' => 'inactive',
            ]);

            return $package->refresh();

        });

    }

    /**
     * Feature package.
     */
    public function feature(
        Package $package
    ): Package {

        return DB::transaction(function () use (
            $package
        ) {

            $package->update([
                'is_featured' => true,
            ]);

            return $package->refresh();

        });

    }

    /**
     * Unfeature package.
     */
    public function unfeature(
        Package $package
    ): Package {

        return DB::transaction(function () use (
            $package
        ) {

            $package->update([
                'is_featured' => false,
            ]);

            return $package->refresh();

        });

    }

    /**
     * Delete package.
     */
    public function delete(
        Package $package
    ): void {

        DB::transaction(function () use (
            $package
        ) {

            $package->delete();

        });

    }
}