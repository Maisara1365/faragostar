<?php

namespace App\Http\Controllers\Api\Testimonial;

use App\Http\Controllers\Controller;
use App\Http\Requests\Testimonial\StoreTestimonialRequest;
use App\Http\Requests\Testimonial\UpdateTestimonialRequest;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use App\Services\Testimonial\TestimonialService;

class TestimonialController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private TestimonialService $testimonialService
    ) {}

    /**
     * Display all testimonials (Admin).
     */
    public function index()
    {
        $testimonials = $this->testimonialService->getAll();

        return $this->success(
            TestimonialResource::collection($testimonials),
            'Testimonials retrieved successfully.'
        );
    }

    /**
     * Display public testimonials.
     */
    public function public()
    {
        $testimonials = $this->testimonialService->getActive();

        return $this->success(
            TestimonialResource::collection($testimonials),
            'Testimonials retrieved successfully.'
        );
    }

    /**
     * Display featured testimonials.
     */
    public function featured()
    {
        $testimonials = $this->testimonialService->getFeatured();

        return $this->success(
            TestimonialResource::collection($testimonials),
            'Featured testimonials retrieved successfully.'
        );
    }

    /**
     * Display highly-rated testimonials.
     */
    public function highRated()
    {
        $testimonials = $this->testimonialService->getHighRated();

        return $this->success(
            TestimonialResource::collection($testimonials),
            'High-rated testimonials retrieved successfully.'
        );
    }

    /**
     * Store a testimonial.
     */
    public function store(
        StoreTestimonialRequest $request
    ) {
        $testimonial = $this->testimonialService->create(
            $request->validated()
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial created successfully.',
            201
        );
    }

    /**
     * Display a specific testimonial.
     */
    public function show(
        Testimonial $testimonial
    ) {
        if ($testimonial->status !== 'active') {
            abort(404);
        }

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial retrieved successfully.'
        );
    }

    /**
     * Update a testimonial.
     */
    public function update(
        UpdateTestimonialRequest $request,
        Testimonial $testimonial
    ) {
        $testimonial = $this->testimonialService->update(
            $testimonial,
            $request->validated()
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial updated successfully.'
        );
    }

    /**
     * Delete a testimonial.
     */
    public function destroy(
        Testimonial $testimonial
    ) {
        $this->testimonialService->delete(
            $testimonial
        );

        return $this->success(
            null,
            'Testimonial deleted successfully.'
        );
    }

    /**
     * Activate testimonial.
     */
    public function activate(
        Testimonial $testimonial
    ) {
        $testimonial = $this->testimonialService->setStatus(
            $testimonial,
            'active'
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial activated successfully.'
        );
    }

    /**
     * Deactivate testimonial.
     */
    public function deactivate(
        Testimonial $testimonial
    ) {
        $testimonial = $this->testimonialService->setStatus(
            $testimonial,
            'inactive'
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial deactivated successfully.'
        );
    }

    /**
     * Mark as featured.
     */
    public function feature(
        Testimonial $testimonial
    ) {
        $testimonial = $this->testimonialService->setFeatured(
            $testimonial,
            true
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial marked as featured successfully.'
        );
    }

    /**
     * Remove featured status.
     */
    public function unfeature(
        Testimonial $testimonial
    ) {
        $testimonial = $this->testimonialService->setFeatured(
            $testimonial,
            false
        );

        return $this->success(
            new TestimonialResource($testimonial),
            'Testimonial removed from featured successfully.'
        );
    }
}
