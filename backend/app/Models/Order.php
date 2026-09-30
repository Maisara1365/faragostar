<?php

namespace App\Models;
use App\Models\Conversation;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'service_id',
        'package_id',
        'conversation_id',
        'title',
        'description',
        'budget',
        'deadline',
        'status',
        'payment_status',
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'deadline' => 'date',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function files()
    {
        return $this->hasMany(OrderFile::class);
    }

    public function conversation()
    {
        return $this->belongsTo(
            \App\Models\Conversation::class,
            'conversation_id'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeReviewing($query)
    {
        return $query->where('status', 'reviewing');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    /**
     * Search orders.
     */
    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($query) use ($search) {

            $query->where('order_number', 'like', "%{$search}%")
                ->orWhere('title', 'like', "%{$search}%")
                ->orWhereHas('user', function ($query) use ($search) {

                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");

                });

        });
    }

    /**
     * Filter by order status.
     */
    public function scopeStatus($query, $status)
    {
        if (!$status) {
            return $query;
        }

        return $query->where('status', $status);
    }

    /**
     * Filter by payment status.
     */
    public function scopePaymentStatus($query, $paymentStatus)
    {
        if (!$paymentStatus) {
            return $query;
        }

        return $query->where(
            'payment_status',
            $paymentStatus
        );
    }

    /**
     * Filter by service.
     */
    public function scopeService($query, $serviceId)
    {
        if (!$serviceId) {
            return $query;
        }

        return $query->where(
            'service_id',
            $serviceId
        );
    }

    /**
     * Filter by package.
     */
    public function scopePackage($query, $packageId)
    {
        if (!$packageId) {
            return $query;
        }

        return $query->where(
            'package_id',
            $packageId
        );
    }

    /**
     * Filter by customer.
     */
    public function scopeCustomer($query, $customerId)
    {
        if (!$customerId) {
            return $query;
        }

        return $query->where(
            'user_id',
            $customerId
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors
    |--------------------------------------------------------------------------
    */

    public function getStatusLabelAttribute()
    {
        return ucfirst(str_replace('_', ' ', $this->status));
    }

    /*
    |--------------------------------------------------------------------------
    | Helper Methods
    |--------------------------------------------------------------------------
    */

    public function isPending()
    {
        return $this->status === 'pending';
    }

    public function isReviewing()
    {
        return $this->status === 'reviewing';
    }

    public function isAccepted()
    {
        return $this->status === 'accepted';
    }

    public function isInProgress()
    {
        return $this->status === 'in_progress';
    }

    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    public function isDelivered()
    {
        return $this->status === 'delivered';
    }

    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }
}