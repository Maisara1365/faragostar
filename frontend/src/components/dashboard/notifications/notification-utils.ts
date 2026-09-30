import type { Notification } from "@/services/notifications";

/*
|--------------------------------------------------------------------------
| Notification Icon Type
|--------------------------------------------------------------------------
*/

export function getNotificationIconType(
    notification: Notification
): "message" | "order" {
    if (
        notification.type === "new_order" ||
        notification.type === "order_status_changed"
    ) {
        return "order";
    }

    return "message";
}

/*
|--------------------------------------------------------------------------
| Notification Destination
|--------------------------------------------------------------------------
*/

export function getNotificationDestination(
    notification: Notification
): string | null {
    const data = notification.data;

    if (!data) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Message
    |--------------------------------------------------------------------------
    */

    if (
        notification.type === "new_message" &&
        data.conversation_id
    ) {
        return `/dashboard/messages?conversation=${data.conversation_id}`;
    }

    /*
    |--------------------------------------------------------------------------
    | New Order
    |--------------------------------------------------------------------------
    */

    if (
        notification.type === "new_order" &&
        data.order_id
    ) {
        return `/dashboard/orders/${data.order_id}`;
    }

    /*
    |--------------------------------------------------------------------------
    | Order Status
    |--------------------------------------------------------------------------
    */

    if (
        notification.type === "order_status_changed" &&
        data.order_id
    ) {
        return `/dashboard/orders/${data.order_id}`;
    }

    return null;
}