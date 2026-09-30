<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $table = 'portfolio';

    protected $fillable = [

        /*
        |--------------------------------------------------------------------------
        | Multilingual
        |--------------------------------------------------------------------------
        */

        'title_fa',
        'title_en',

        'slug',

        'category_fa',
        'category_en',

        'description_fa',
        'description_en',

        /*
        |--------------------------------------------------------------------------
        | Media
        |--------------------------------------------------------------------------
        */

        'image',

        /*
        |--------------------------------------------------------------------------
        | Project Information
        |--------------------------------------------------------------------------
        */

        'project_url',

        'client_name',

        'completion_date',

        /*
        |--------------------------------------------------------------------------
        | Display
        |--------------------------------------------------------------------------
        */

        'theme_color',

        'display_order',

        'is_featured',

        /*
        |--------------------------------------------------------------------------
        | Status
        |--------------------------------------------------------------------------
        */

        'status',

    ];

    protected $casts = [

        'completion_date' => 'date',

        'display_order' => 'integer',

        'is_featured' => 'boolean',

    ];

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeActive($query)
    {
        return $query->where(
            'status',
            'active'
        );
    }

    public function scopeFeatured($query)
    {
        return $query->where(
            'is_featured',
            true
        );
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy(
            'display_order'
        );
    }

    public function scopeCategory($query, string $category)
    {
        $column = app()->getLocale() === 'fa'
            ? 'category_fa'
            : 'category_en';

        return $query->where(
            $column,
            $category
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getLocalizedTitleAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->title_fa
            : $this->title_en;
    }

    public function getLocalizedCategoryAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->category_fa
            : $this->category_en;
    }

    public function getLocalizedDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->description_fa
            : $this->description_en;
    }
}
