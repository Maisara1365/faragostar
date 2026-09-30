<?php

namespace App\Http\Controllers\Api\Portfolio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Portfolio\StorePortfolioRequest;
use App\Http\Requests\Portfolio\UpdatePortfolioRequest;
use App\Http\Resources\PortfolioResource;
use App\Models\Portfolio;
use App\Services\Portfolio\PortfolioService;

class PortfolioController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct(
        private PortfolioService $portfolioService
    ) {}

    /**
     * Admin - List all portfolio items.
     */
    public function index()
    {
        $portfolio = $this->portfolioService->getAll();

        return $this->success(
            PortfolioResource::collection($portfolio),
            'Portfolio retrieved successfully.'
        );
    }

    /**
     * Public - Active portfolio.
     */
    public function active()
    {
        $portfolio = $this->portfolioService->getActive();

        return $this->success(
            PortfolioResource::collection($portfolio),
            'Active portfolio retrieved successfully.'
        );
    }

    /**
     * Public - Featured portfolio.
     */
    public function featured()
    {
        $portfolio = $this->portfolioService->getFeatured();

        return $this->success(
            PortfolioResource::collection($portfolio),
            'Featured portfolio retrieved successfully.'
        );
    }

    /**
     * Public - Portfolio by category.
     */
    public function category(
        string $category
    ) {
        $portfolio = $this->portfolioService
            ->getByCategory($category);

        return $this->success(
            PortfolioResource::collection($portfolio),
            'Portfolio category retrieved successfully.'
        );
    }

    /**
     * Show single portfolio item.
     */
    public function show(
        Portfolio $portfolio
    ) {
        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio retrieved successfully.'
        );
    }

    /**
     * Create portfolio.
     */
    public function store(
        StorePortfolioRequest $request
    ) {
        $portfolio = $this->portfolioService->create(
            $request->validated()
        );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio created successfully.',
            201
        );
    }

    /**
     * Update portfolio.
     */
    public function update(
        UpdatePortfolioRequest $request,
        Portfolio $portfolio
    ) {
        $portfolio = $this->portfolioService->update(
            $portfolio,
            $request->validated()
        );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio updated successfully.'
        );
    }

    /**
     * Delete portfolio.
     */
    public function destroy(
        Portfolio $portfolio
    ) {
        $this->portfolioService->delete(
            $portfolio
        );

        return $this->success(
            null,
            'Portfolio deleted successfully.'
        );
    }

    /**
     * Activate portfolio.
     */
    public function activate(
        Portfolio $portfolio
    ) {
        $portfolio = $this->portfolioService
            ->setStatus(
                $portfolio,
                'active'
            );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio activated successfully.'
        );
    }

    /**
     * Deactivate portfolio.
     */
    public function deactivate(
        Portfolio $portfolio
    ) {
        $portfolio = $this->portfolioService
            ->setStatus(
                $portfolio,
                'inactive'
            );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio deactivated successfully.'
        );
    }

    /**
     * Mark portfolio as featured.
     */
    public function feature(
        Portfolio $portfolio
    ) {
        $portfolio = $this->portfolioService
            ->setFeatured(
                $portfolio,
                true
            );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio marked as featured successfully.'
        );
    }

    /**
     * Remove featured status.
     */
    public function unfeature(
        Portfolio $portfolio
    ) {
        $portfolio = $this->portfolioService
            ->setFeatured(
                $portfolio,
                false
            );

        return $this->success(
            new PortfolioResource($portfolio),
            'Portfolio removed from featured successfully.'
        );
    }
}
