"use client";

import {
    MessageCircle,
    ShoppingCart,
} from "lucide-react";

import type { Notification } from "@/services/notifications";

import {
    getNotificationDestination,
    getNotificationIconType,
} from "./notification-utils";

interface NotificationItemProps {
    notification: Notification;
    onRead: (
        notification: Notification
    ) => void;
    onNavigate: (
        notification: Notification
    ) => void;
}

export default function NotificationItem({
    notification,
    onRead,
    onNavigate,
}: NotificationItemProps) {

    const iconType =
        getNotificationIconType(notification);

    const destination =
        getNotificationDestination(notification);

    const data = notification.data;

    /*
    |--------------------------------------------------------------------------
    | Notification Text
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    |
    | We do NOT translate anything here.
    |
    | The notification type/data will be translated
    | by the parent component using the existing
    | language system.
    |
    */

    return (
        <button
            type="button"
            onClick={() => {
                if (!notification.read) {
                    onRead(notification);
                }

                if (destination) {
                    onNavigate(notification);
                }
            }}
            className="group w-full text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "16px 20px",
                border: "none",
                borderBottom: "1px solid #f1f5f9",
                backgroundColor: notification.read
                    ? "transparent"
                    : "linear-gradient(135deg, #f0f7ff 0%, #f8faff 100%)",
                cursor: destination
                    ? "pointer"
                    : "default",
                textAlign: "inherit",
                position: "relative",
                transition: "all 0.2s ease",
            }}
        >
            {/* Hover background effect */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(24, 59, 115, 0.03) 0%, rgba(70, 166, 217, 0.03) 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    borderRadius: "12px",
                    pointerEvents: "none",
                }}
                className="group-hover:opacity-100"
            />

            {/* Icon Container */}
            <div
                style={{
                    width: "44px",
                    height: "44px",
                    minWidth: "44px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: notification.read
                        ? "linear-gradient(135deg, #f1f5f9 0%, #e8edf5 100%)"
                        : "linear-gradient(135deg, #183B73 0%, #1a4a8a 100%)",
                    boxShadow: notification.read
                        ? "none"
                        : "0 4px 12px rgba(24, 59, 115, 0.25)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    zIndex: 1,
                }}
                className="group-hover:shadow-lg group-hover:scale-105"
            >
                {iconType === "message" ? (
                    <MessageCircle
                        size={20}
                        style={{
                            color: notification.read
                                ? "#64748b"
                                : "#ffffff",
                            transition: "all 0.3s ease",
                        }}
                    />
                ) : (
                    <ShoppingCart
                        size={20}
                        style={{
                            color: notification.read
                                ? "#64748b"
                                : "#ffffff",
                            transition: "all 0.3s ease",
                        }}
                    />
                )}
            </div>

            {/* Content Container */}
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* 
                 * These are intentionally data attributes.
                 * NotificationDropdown will provide the
                 * translated text.
                 */}
                <div
                    data-notification-type={
                        notification.type
                    }
                    data-notification-order-number={
                        data?.order_number ?? ""
                    }
                    data-notification-status={
                        data?.status ?? ""
                    }
                    style={{
                        fontSize: "15px",
                        fontWeight: notification.read
                            ? 400
                            : 600,
                        lineHeight: 1.5,
                        color: notification.read
                            ? "#475569"
                            : "#183B73",
                        transition: "all 0.2s ease",
                        letterSpacing: "-0.01em",
                    }}
                    className="group-hover:text-[#1a4a8a]"
                />

                {/* Timestamp */}
                <div
                    style={{
                        marginTop: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#94a3b8",
                        transition: "all 0.2s ease",
                    }}
                    className="group-hover:text-[#64748b]"
                >
                    <span
                        style={{
                            display: "inline-block",
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            backgroundColor: notification.read
                                ? "#cbd5e1"
                                : "#46A6D9",
                        }}
                    />
                    {new Date(
                        notification.created_at
                    ).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>
            </div>

            {/* Unread Indicator */}
            {!notification.read && (
                <span
                    style={{
                        width: "10px",
                        height: "10px",
                        minWidth: "10px",
                        borderRadius: "50%",
                        marginTop: "5px",
                        background: "linear-gradient(135deg, #46A6D9 0%, #3a8ec4 100%)",
                        boxShadow: "0 2px 8px rgba(70, 166, 217, 0.4)",
                        animation: "pulse 2s ease-in-out infinite",
                        position: "relative",
                        zIndex: 1,
                    }}
                />
            )}

            {/* Add pulse animation keyframes */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.6;
                        transform: scale(0.85);
                    }
                }
            `}</style>
        </button>
    );
}