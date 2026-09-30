<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $table = 'team_members';

    protected $fillable = [

        /*
        |--------------------------------------------------------------------------
        | Multilingual
        |--------------------------------------------------------------------------
        */

        'name_fa',
        'name_en',

        'designation_fa',
        'designation_en',

        'bio_fa',
        'bio_en',

        /*
        |--------------------------------------------------------------------------
        | Media
        |--------------------------------------------------------------------------
        */

        'image',

        /*
        |--------------------------------------------------------------------------
        | Social Media
        |--------------------------------------------------------------------------
        */

        'facebook',
        'instagram',
        'linkedin',

        /*
        |--------------------------------------------------------------------------
        | Display
        |--------------------------------------------------------------------------
        */

        'display_order',

        /*
        |--------------------------------------------------------------------------
        | Status
        |--------------------------------------------------------------------------
        */

        'status',

    ];

    protected $casts = [

        'display_order' => 'integer',

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

    public function scopeOrdered($query)
    {
        return $query->orderBy(
            'display_order'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getLocalizedNameAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->name_fa
            : $this->name_en;
    }

    public function getLocalizedDesignationAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->designation_fa
            : $this->designation_en;
    }

    public function getLocalizedBioAttribute(): ?string
    {
        return app()->getLocale() === 'fa'
            ? $this->bio_fa
            : $this->bio_en;
    }
}
