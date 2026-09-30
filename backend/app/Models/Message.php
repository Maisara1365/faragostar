<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'sender_id',
        'message',
        'attachment',
        'seen',
        'seen_at',
    ];

    protected $casts = [
        'seen' => 'boolean',
        'seen_at' => 'datetime',
    ];

    // Relationships
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Helper methods
    public function markAsSeen()
    {
        if (!$this->seen) {
            $this->update([
                'seen' => true,
                'seen_at' => now(),
            ]);
        }
    }

    public function isSeen()
    {
        return $this->seen;
    }
}
