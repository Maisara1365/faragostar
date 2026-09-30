<?php

namespace App\Http\Controllers\Api\Notification;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Services\Notification\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {}

    /**
     * Get authenticated user's notifications.
     */
    public function index(Request $request)
    {
        return $this->success(
            NotificationResource::collection(
                $this->notificationService->getForUser(
                    $request->user(),
                    (int) $request->input('per_page', 20)
                )
            ),
            'Notifications retrieved successfully.'
        );
    }

    /**
     * Get unread notification count.
     */
    public function unreadCount(Request $request)
    {
        return $this->success(
            [
                'count' => $this->notificationService->unreadCount(
                    $request->user()
                ),
            ],
            'Unread notification count retrieved successfully.'
        );
    }

    /**
     * Mark one notification as read.
     */
    public function markAsRead(
        Request $request,
        Notification $notification
    ) {
        if ($notification->user_id !== $request->user()->id) {
            return $this->forbidden(
                'You are not authorized to access this notification.'
            );
        }

        return $this->success(
            new NotificationResource(
                $this->notificationService->markAsRead(
                    $notification
                )
            ),
            'Notification marked as read.'
        );
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead(Request $request)
    {
        $this->notificationService->markAllAsRead(
            $request->user()
        );

        return $this->success(
            null,
            'All notifications marked as read.'
        );
    }

    /**
     * Delete notification.
     */
    public function destroy(
        Request $request,
        Notification $notification
    ) {
        if ($notification->user_id !== $request->user()->id) {
            return $this->forbidden(
                'You are not authorized to delete this notification.'
            );
        }

        $this->notificationService->delete(
            $notification
        );

        return $this->success(
            null,
            'Notification deleted successfully.'
        );
    }
}
