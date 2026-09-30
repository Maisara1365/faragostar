<?php

namespace App\Services\Testimonial;

use App\Models\Testimonial;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TestimonialService
{
    /**
     * Get all testimonials (Admin).
     */
    public function getAll()
    {
        return Testimonial::ordered()->get();
    }

    /**
     * Get active testimonials (Public).
     */
    public function getActive()
    {
        return Testimonial::active()
            ->ordered()
            ->get();
    }

    /**
     * Get featured testimonials.
     */
    public function getFeatured()
    {
        return Testimonial::active()
            ->featured()
            ->ordered()
            ->get();
    }

    /**
     * Get highly-rated active testimonials.
     */
    public function getHighRated(
        int $minimum = 4
    ) {
        return Testimonial::active()
            ->highRated($minimum)
            ->ordered()
            ->get();
    }

    /**
     * Create a testimonial.
     */
    public function create(
        array $data
    ): Testimonial {

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {

            $data['image'] = $data['image']->store(
                'testimonials',
                'public'
            );

        }

        return Testimonial::create([

            /*
            |--------------------------------------------------------------------------
            | Client Information
            |--------------------------------------------------------------------------
            */

            'name' => $data['name'],

            'company_fa' =>
                $data['company_fa'] ?? null,

            'company_en' =>
                $data['company_en'] ?? null,

            'position_fa' =>
                $data['position_fa'] ?? null,

            'position_en' =>
                $data['position_en'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Media
            |--------------------------------------------------------------------------
            */

            'image' =>
                $data['image'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Review
            |--------------------------------------------------------------------------
            */

            'rating' =>
                $data['rating'],

            'review_fa' =>
                $data['review_fa'],

            'review_en' =>
                $data['review_en'] ?? null,

            /*
            |--------------------------------------------------------------------------
            | Display
            |--------------------------------------------------------------------------
            */

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
     * Update a testimonial.
     */
    public function update(
        Testimonial $testimonial,
        array $data
    ): Testimonial {

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {

            if (
                $testimonial->image &&
                Storage::disk('public')->exists(
                    $testimonial->image
                )
            ) {

                Storage::disk('public')->delete(
                    $testimonial->image
                );

            }

            $data['image'] = $data['image']->store(
                'testimonials',
                'public'
            );

        }

        $testimonial->update($data);

        return $testimonial->refresh();
    }

    /**
     * Delete a testimonial.
     */
    public function delete(
        Testimonial $testimonial
    ): void {

        if (
            $testimonial->image &&
            Storage::disk('public')->exists(
                $testimonial->image
            )
        ) {

            Storage::disk('public')->delete(
                $testimonial->image
            );

        }

        $testimonial->delete();
    }

    /**
     * Activate / Deactivate testimonial.
     */
    public function setStatus(
        Testimonial $testimonial,
        string $status
    ): Testimonial {

        $testimonial->update([

            'status' => $status,

        ]);

        return $testimonial->refresh();
    }

    /**
     * Feature / Unfeature testimonial.
     */
    public function setFeatured(
        Testimonial $testimonial,
        bool $featured
    ): Testimonial {

        $testimonial->update([

            'is_featured' => $featured,

        ]);

        return $testimonial->refresh();
    }
}
