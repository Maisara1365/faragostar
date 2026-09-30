<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'service',
        'message',
        'status',
    ];

    // Scopes
    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    public function scopeRead($query)
    {
        return $query->where('status', 'read');
    }

    public function scopeReplied($query)
    {
        return $query->where('status', 'replied');
    }

    // Helper methods
    public function markAsRead()
    {
        $this->update(['status' => 'read']);
    }

    public function markAsReplied()
    {
        $this->update(['status' => 'replied']);
    }
}
