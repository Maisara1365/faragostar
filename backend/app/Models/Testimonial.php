<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    /*
    |--------------------------------------------------------------------------
    | Mass Assignable
    |--------------------------------------------------------------------------
    */

    protected $fillable = [

        'name',

        'company_fa',

        'company_en',

        'position_fa',

        'position_en',

        'image',

        'rating',

        'review_fa',

        'review_en',

        'display_order',

        'is_featured',

        'status',

    ];

    /*
    |--------------------------------------------------------------------------
    | Attribute Casting
    |--------------------------------------------------------------------------
    */

    protected $casts = [

        'rating' => 'integer',

        'display_order' => 'integer',

        'is_featured' => 'boolean',

    ];

    /*
    |--------------------------------------------------------------------------
    | Localized Attributes
    |--------------------------------------------------------------------------
    */

    /**
     * Get localized company.
     */
    public function getLocalizedCompanyAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? ($this->company_fa ?: $this->company_en)
            : ($this->company_en ?: $this->company_fa);
    }

    /**
     * Get localized position.
     */
    public function getLocalizedPositionAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? ($this->position_fa ?: $this->position_en)
            : ($this->position_en ?: $this->position_fa);
    }

    /**
     * Get localized review.
     */
    public function getLocalizedReviewAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? ($this->review_fa ?: $this->review_en)
            : ($this->review_en ?: $this->review_fa);
    }

    /*
    |--------------------------------------------------------------------------
    | Query Scopes
    |--------------------------------------------------------------------------
    */

    /**
     * Active testimonials.
     */
    public function scopeActive($query)
    {
        return $query->where(
            'status',
            'active'
        );
    }

    /**
     * Featured testimonials.
     */
    public function scopeFeatured($query)
    {
        return $query->where(
            'is_featured',
            true
        );
    }

    /**
     * High-rated testimonials.
     */
    public function scopeHighRated(
        $query,
        int $minimum = 4
    ) {
        return $query->where(
            'rating',
            '>=',
            $minimum
        );
    }

    /**
     * Ordered testimonials.
     */
    public function scopeOrdered($query)
    {
        return $query
            ->orderBy(
                'display_order'
            )
            ->orderByDesc(
                'created_at'
            );
    }
}
