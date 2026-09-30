<?php

namespace App\Services\Notification;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class NotificationService
{
    /**
     * Get notifications for a user.
     */
    public function getForUser(
        User $user,
        int $perPage = 20
    ) {
        return Notification::where(
            'user_id',
            $user->id
        )
        ->latest()
        ->paginate($perPage);
    }

    /**
     * Get unread notification count.
     */
    public function unreadCount(
        User $user
    ): int {
        return Notification::where(
            'user_id',
            $user->id
        )
        ->whereNull('read_at')
        ->count();
    }

    /**
     * Create notification.
     */
    public function create(
        User $user,
        string $type,
        ?Model $notifiable = null,
        array $data = []
    ): Notification {
        return Notification::create([
            'user_id' => $user->id,

            'type' => $type,

            'title' => null,

            'message' => null,

            'notifiable_type' => $notifiable
                ? $notifiable->getMorphClass()
                : null,

            'notifiable_id' => $notifiable?->getKey(),

            'data' => $data,

            'read_at' => null,
        ]);
    }

    /**
     * Mark one notification as read.
     */
    public function markAsRead(
        Notification $notification
    ): Notification {
        $notification->markAsRead();

        return $notification->refresh();
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(
        User $user
    ): void {
        Notification::where(
            'user_id',
            $user->id
        )
        ->whereNull('read_at')
        ->update([
            'read_at' => now(),
        ]);
    }

    /**
     * Delete a notification.
     */
    public function delete(
        Notification $notification
    ): void {
        $notification->delete();
    }
}
