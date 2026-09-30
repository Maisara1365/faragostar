<?php

namespace App\Services\Service;

use App\Models\Service;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ServiceService
{
    /*
    |--------------------------------------------------------------------------
    | Get All Services (Admin)
    |--------------------------------------------------------------------------
    */

    public function getAll()
    {
        return Service::with('packages')

            ->ordered()

            ->get();
    }

    /*
    |--------------------------------------------------------------------------
    | Get Active Services (Website)
    |--------------------------------------------------------------------------
    */

    public function getActive()
    {
        return Service::active()

            ->with([
                'packages' => function ($query) {

                    $query
                        ->active()
                        ->ordered();

                },
            ])

            ->ordered()

            ->get();
    }

    /*
    |--------------------------------------------------------------------------
    | Get Featured Services
    |--------------------------------------------------------------------------
    */

    public function getFeatured()
    {
        return Service::active()

            ->featured()

            ->with([
                'packages' => function ($query) {

                    $query
                        ->active()
                        ->ordered();

                },
            ])

            ->ordered()

            ->get();
    }

    /*
    |--------------------------------------------------------------------------
    | Create Service
    |--------------------------------------------------------------------------
    */

    public function create(array $data): Service
    {
        /*
        |--------------------------------------------------------------------------
        | Upload Icon
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['icon']) &&
            $data['icon'] instanceof UploadedFile
        ) {

            $data['icon'] = $data['icon']->store(
                'services/icons',
                'public'
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Upload Cover Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['cover_image']) &&
            $data['cover_image'] instanceof UploadedFile
        ) {

            $data['cover_image'] = $data['cover_image']->store(
                'services/covers',
                'public'
            );

        }

        return Service::create([

            'title_fa' => $data['title_fa'],

            'title_en' => $data['title_en'],

            'slug' => $data['slug'],

            'short_description_fa' =>
                $data['short_description_fa'] ?? null,

            'short_description_en' =>
                $data['short_description_en'] ?? null,

            'description_fa' =>
                $data['description_fa'] ?? null,

            'description_en' =>
                $data['description_en'] ?? null,

            'icon' => $data['icon'] ?? null,

            'cover_image' => $data['cover_image'] ?? null,

            'starting_price' =>
                $data['starting_price'] ?? null,

            'display_order' =>
                $data['display_order'] ?? 0,

            'is_featured' =>
                $data['is_featured'] ?? false,

            'theme_color' =>
                $data['theme_color'] ?? '#183B73',

            'status' =>
                $data['status'] ?? 'active',

        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Update Service
    |--------------------------------------------------------------------------
    */

    public function update(Service $service, array $data): Service
    {
        /*
        |--------------------------------------------------------------------------
        | Replace Icon
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['icon']) &&
            $data['icon'] instanceof UploadedFile
        ) {

            if (
                $service->icon &&
                Storage::disk('public')->exists($service->icon)
            ) {

                Storage::disk('public')->delete(
                    $service->icon
                );

            }

            $data['icon'] = $data['icon']->store(
                'services/icons',
                'public'
            );

        }

        /*
        |--------------------------------------------------------------------------
        | Replace Cover Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['cover_image']) &&
            $data['cover_image'] instanceof UploadedFile
        ) {

            if (
                $service->cover_image &&
                Storage::disk('public')->exists($service->cover_image)
            ) {

                Storage::disk('public')->delete(
                    $service->cover_image
                );

            }

            $data['cover_image'] = $data['cover_image']->store(
                'services/covers',
                'public'
            );

        }

        $service->update($data);

        return $service->refresh();
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Service
    |--------------------------------------------------------------------------
    */

    public function delete(Service $service): void
    {
        if (
            $service->icon &&
            Storage::disk('public')->exists($service->icon)
        ) {

            Storage::disk('public')->delete(
                $service->icon
            );

        }

        if (
            $service->cover_image &&
            Storage::disk('public')->exists($service->cover_image)
        ) {

            Storage::disk('public')->delete(
                $service->cover_image
            );

        }

        $service->delete();
    }

    /*
    |--------------------------------------------------------------------------
    | Featured Status
    |--------------------------------------------------------------------------
    */

    public function setFeatured(
        Service $service,
        bool $featured
    ): Service {

        $service->update([
            'is_featured' => $featured,
        ]);

        return $service->refresh();
    }

    /*
    |--------------------------------------------------------------------------
    | Service Status
    |--------------------------------------------------------------------------
    */

    public function setStatus(
        Service $service,
        string $status
    ): Service {

        $service->update([
            'status' => $status,
        ]);

        return $service->refresh();
    }
}
