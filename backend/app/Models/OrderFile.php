<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OrderFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'file_name',
        'file_path',
        'file_size',
        'file_type',
        'uploaded_by',
    ];

    protected $casts = [
        'file_size' => 'integer',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getFileSizeFormattedAttribute()
    {
        $bytes = $this->file_size;

        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        }

        if ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        }

        return $bytes . ' bytes';
    }

    public function getFileUrlAttribute()
    {
        return Storage::url($this->file_path);
    }
}