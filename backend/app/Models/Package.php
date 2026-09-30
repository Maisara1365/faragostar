<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [

        /*
        |--------------------------------------------------------------------------
        | Relationship
        |--------------------------------------------------------------------------
        */

        'service_id',

        /*
        |--------------------------------------------------------------------------
        | Multilingual
        |--------------------------------------------------------------------------
        */

        'name_fa',
        'name_en',

        'description_fa',
        'description_en',

        /*
        |--------------------------------------------------------------------------
        | Business
        |--------------------------------------------------------------------------
        */

        'price',

        'delivery_days',

        'revisions',

        'features_fa',

        'features_en',

        'display_order',

        'is_featured',

        'status',

    ];

    protected $casts = [

        'price' => 'decimal:2',

        'features_fa' => 'array',

        'features_en' => 'array',

        'delivery_days' => 'integer',

        'revisions' => 'integer',

        'display_order' => 'integer',

        'is_featured' => 'boolean',

    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

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

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function getLocalizedNameAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->name_fa
            : $this->name_en;
    }

    public function getLocalizedDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->description_fa
            : $this->description_en;
    }

    public function getLocalizedFeaturesAttribute(): array
    {
        return app()->getLocale() === 'fa'
            ? ($this->features_fa ?? [])
            : ($this->features_en ?? []);
    }
}