<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'admin_id',
        'content_manager_id',
        'subject',
        'status',
    ];

    // Relationships

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function contentManager()
    {
        return $this->belongsTo(
            User::class,
            'content_manager_id'
        );
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function order()
    {
        return $this->hasOne(
            Order::class,
            'conversation_id'
        );
    }

    // Helper methods

    public function getLastMessage()
    {
        return $this->messages()->latest()->first();
    }

    public function getUnreadCount()
    {
        return $this->messages()->where('seen', false)->count();
    }

    public function isOpen()
    {
        return $this->status === 'open';
    }
}