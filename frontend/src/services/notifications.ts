import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface NotificationData {
    conversation_id?: number;
    message_id?: number;
    sender_id?: number;
    sender_role?: string;

    order_id?: number;
    order_number?: string;
    customer_id?: number;
    status?: string;

    action?: "message" | "order";

    [key: string]: unknown;
}

export interface Notification {
    id: number;
    type: string;
    data: NotificationData | null;
    notifiable_type: string | null;
    notifiable_id: number | null;
    read: boolean;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface NotificationsResponse {
    data: Notification[];
    meta?: NotificationPagination;
}

/*
|--------------------------------------------------------------------------
| Get Notifications
|--------------------------------------------------------------------------
*/

export async function getNotifications(
    perPage = 20
): Promise<NotificationsResponse> {
    const response = await api.get(
        `/notifications?per_page=${perPage}`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Get Unread Count
|--------------------------------------------------------------------------
*/

export async function getUnreadNotificationCount(): Promise<number> {
    const response = await api.get(
        "/notifications/unread-count"
    );

    return response.data?.data?.count ??
        response.data?.count ??
        0;
}

/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export async function markNotificationAsRead(
    notificationId: number
): Promise<Notification> {
    const response = await api.patch(
        `/notifications/${notificationId}/read`
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

export async function markAllNotificationsAsRead(): Promise<void> {
    await api.patch(
        "/notifications/read-all"
    );
}

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

export async function deleteNotification(
    notificationId: number
): Promise<void> {
    await api.delete(
        `/notifications/${notificationId}`
    );
}