<?php

namespace App\Services\Portfolio;

use App\Models\Portfolio;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PortfolioService
{
    /**
     * Get all portfolio items for admin.
     */
    public function getAll()
    {
        return Portfolio::ordered()
            ->latest()
            ->get();
    }

    /**
     * Get active portfolio items.
     */
    public function getActive()
    {
        return Portfolio::active()
            ->ordered()
            ->get();
    }

    /**
     * Get featured portfolio items.
     */
    public function getFeatured()
    {
        return Portfolio::active()
            ->featured()
            ->ordered()
            ->get();
    }

    /**
     * Get portfolio items by category.
     */
    public function getByCategory(string $category)
    {
        return Portfolio::active()
            ->category($category)
            ->ordered()
            ->get();
    }

    /**
     * Create portfolio item.
     */
    public function create(array $data): Portfolio
    {
        /*
        |--------------------------------------------------------------------------
        | Upload Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {
            $data['image'] = $data['image']->store(
                'portfolio',
                'public'
            );
        }

        return Portfolio::create([

            /*
            |--------------------------------------------------------------------------
            | Multilingual
            |--------------------------------------------------------------------------
            */

            'title_fa' => $data['title_fa'],

            'title_en' => $data['title_en'],

            'slug' => $data['slug'],

            'category_fa' => $data['category_fa'],

            'category_en' => $data['category_en'],

            'description_fa' =>
                $data['description_fa'] ?? null,

            'description_en' =>
                $data['description_en'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' =>
                $data['image'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Project Information
            |--------------------------------------------------------------------------
            */

            'project_url' =>
                $data['project_url'] ?? null,

            'client_name' =>
                $data['client_name'] ?? null,

            'completion_date' =>
                $data['completion_date'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

            'theme_color' =>
                $data['theme_color'] ?? '#183B73',

            'display_order' =>
                $data['display_order'] ?? 0,

            'is_featured' =>
                $data['is_featured'] ?? false,

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'status' =>
                $data['status'] ?? 'active',

        ]);
    }

    /**
     * Update portfolio item.
     */
    public function update(
        Portfolio $portfolio,
        array $data
    ): Portfolio {

        /*
        |--------------------------------------------------------------------------
        | Replace Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {

            if (
                $portfolio->image &&
                Storage::disk('public')->exists(
                    $portfolio->image
                )
            ) {
                Storage::disk('public')
                    ->delete($portfolio->image);
            }

            $data['image'] = $data['image']->store(
                'portfolio',
                'public'
            );
        }

        $portfolio->update($data);

        return $portfolio->refresh();
    }

    /**
     * Delete portfolio item.
     */
    public function delete(
        Portfolio $portfolio
    ): void {

        if (
            $portfolio->image &&
            Storage::disk('public')->exists(
                $portfolio->image
            )
        ) {
            Storage::disk('public')
                ->delete($portfolio->image);
        }

        $portfolio->delete();
    }

    /**
     * Feature / Unfeature.
     */
    public function setFeatured(
        Portfolio $portfolio,
        bool $featured
    ): Portfolio {

        $portfolio->update([
            'is_featured' => $featured,
        ]);

        return $portfolio->refresh();
    }

    /**
     * Activate / Deactivate.
     */
    public function setStatus(
        Portfolio $portfolio,
        string $status
    ): Portfolio {

        $portfolio->update([
            'status' => $status,
        ]);

        return $portfolio->refresh();
    }
}
