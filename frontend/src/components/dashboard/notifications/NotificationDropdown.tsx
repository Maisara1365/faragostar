"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    Bell,
    Check,
    CheckCheck,
    MessageCircle,
    ShoppingCart,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLanguage } from "@/hooks/use-language";
import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    type Notification,
} from "@/services/notifications";

interface NotificationDropdownProps {
    open: boolean;
    onClose: () => void;
    onUnreadCountChange?: (count: number) => void;
}

export default function NotificationDropdown({
    open,
    onClose,
    onUnreadCountChange,
}: NotificationDropdownProps) {
    const router = useRouter();
    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [markingAll, setMarkingAll] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load Notifications
    |--------------------------------------------------------------------------
    */

    const loadNotifications = async () => {
        try {
            setLoading(true);

            const response = await getNotifications();

            const items = Array.isArray(response)
                ? response
                : response?.data ?? [];

            setNotifications(items);

            const unreadCount = items.filter(
                (notification) => !notification.read_at
            ).length;

            onUnreadCountChange?.(unreadCount);
        } catch (error) {
            console.error(
                "Failed to load notifications:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Load when opened
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) return;

        loadNotifications();
    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    const getNotificationType = (
        notification: Notification
    ) => {
        const type =
            notification.type ||
            notification.data?.type ||
            "";

        return String(type).toLowerCase();
    };

    const getNotificationTitle = (
        notification: Notification
    ) => {
        const type = getNotificationType(notification);

        if (
            type.includes("message") ||
            type.includes("chat")
        ) {
            return t.common.messages;
        }

        if (
            type.includes("order") ||
            type.includes("package")
        ) {
            return t.common.orders;
        }

        return t.auth.notifications;
    };

    /*
    |--------------------------------------------------------------------------
    | Get notification message
    |--------------------------------------------------------------------------
    |
    | The Notification interface does not contain `message`.
    | Therefore we only read from notification.data.
    |
    */

    const getNotificationMessage = (
        notification: Notification
    ): string => {
        const type = getNotificationType(notification);

        const data = notification.data || {};

        const message =
            typeof data.message === "string"
                ? data.message
                : "";

        if (
            type.includes("message") ||
            type.includes("chat")
        ) {
            return (
                message ||
                t.notifications?.newMessage ||
                t.common.messages
            );
        }

        if (
            type.includes("order") ||
            type.includes("package")
        ) {
            return (
                message ||
                t.notifications?.orderUpdate ||
                t.common.orders
            );
        }

        return (
            message ||
            t.auth.notifications
        );
    };

    const getNotificationIcon = (
        notification: Notification
    ) => {
        const type = getNotificationType(notification);

        if (
            type.includes("message") ||
            type.includes("chat")
        ) {
            return MessageCircle;
        }

        if (
            type.includes("order") ||
            type.includes("package")
        ) {
            return ShoppingCart;
        }

        return Bell;
    };

    const getNotificationTime = (
        notification: Notification
    ) => {
        /*
        |--------------------------------------------------------------------------
        | Use created_at only
        |--------------------------------------------------------------------------
        */

        const date = notification.created_at;

        if (!date) return "";

        const created = new Date(date);
        const now = new Date();

        const difference =
            now.getTime() - created.getTime();

        const minutes = Math.floor(
            difference / (1000 * 60)
        );

        if (minutes < 1) {
            return (
                t.notifications?.justNow ||
                "Just now"
            );
        }

        if (minutes < 60) {
            return `${minutes} ${t.notifications?.minutesAgo || "minutes ago"}`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours} ${t.notifications?.hoursAgo || "hours ago"}`;
        }

        const days = Math.floor(hours / 24);

        if (days < 7) {
            return `${days} ${t.notifications?.daysAgo || "days ago"}`;
        }

        return created.toLocaleDateString(
            language === "fa"
                ? "fa-IR"
                : "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Open Notification
    |--------------------------------------------------------------------------
    */

    const handleNotificationClick = async (
        notification: Notification
    ) => {
        try {
            if (!notification.read_at) {
                await markNotificationAsRead(
                    notification.id
                );

                setNotifications((previous) =>
                    previous.map((item) =>
                        item.id === notification.id
                            ? {
                                  ...item,
                                  read_at:
                                      new Date().toISOString(),
                              }
                            : item
                    )
                );

                const unreadCount =
                    notifications.filter(
                        (item) =>
                            !item.read_at &&
                            item.id !== notification.id
                    ).length;

                onUnreadCountChange?.(
                    unreadCount
                );
            }
        } catch (error) {
            console.error(
                "Failed to mark notification as read:",
                error
            );
        }

        const type =
            getNotificationType(notification);

        const data =
            notification.data || {};

        /*
        |--------------------------------------------------------------------------
        | Message
        |--------------------------------------------------------------------------
        */

        if (
            type.includes("message") ||
            type.includes("chat")
        ) {
            const conversationId =
                data.conversation_id ||
                data.conversationId;

            if (conversationId) {
                router.push(
                    `/dashboard/messages?conversation=${conversationId}`
                );
            } else {
                router.push(
                    "/dashboard/messages"
                );
            }

            onClose();
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Order
        |--------------------------------------------------------------------------
        */

        if (
            type.includes("order") ||
            type.includes("package")
        ) {
            const orderId =
                data.order_id ||
                data.orderId;

            if (orderId) {
                router.push(
                    `/dashboard/orders/${orderId}`
                );
            } else {
                router.push(
                    "/dashboard/orders"
                );
            }

            onClose();
            return;
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Mark All As Read
    |--------------------------------------------------------------------------
    */

    const handleMarkAllAsRead = async () => {
        if (markingAll) return;

        try {
            setMarkingAll(true);

            await markAllNotificationsAsRead();

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read_at:
                        notification.read_at ||
                        new Date().toISOString(),
                }))
            );

            onUnreadCountChange?.(0);
        } catch (error) {
            console.error(
                "Failed to mark all notifications as read:",
                error
            );
        } finally {
            setMarkingAll(false);
        }
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.read_at
    ).length;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: -10,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: -10,
                    }}
                    transition={{
                        duration: 0.25,
                        ease: "easeOut",
                    }}
                    dir={isRTL ? "rtl" : "ltr"}
                    className={`
                        absolute
                        top-[calc(100%+16px)]
                        w-[420px]
                        max-w-[calc(100vw-2rem)]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/30
                        bg-white/98
                        backdrop-blur-3xl
                        shadow-[0_20px_80px_rgba(15,23,42,0.15),0_8px_32px_rgba(15,23,42,0.08)]
                        z-[80]
                        ${isRTL ? "left-0" : "right-0"}
                    `}
                >
                    {/* Header */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100/80
                            px-6
                            py-5
                            bg-gradient-to-r
                            from-white
                            via-white
                            to-slate-50/50
                        "
                    >
                        <div className="flex items-center gap-3.5">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-[#183B73]
                                    to-[#1a4a8a]
                                    text-white
                                    shadow-lg
                                    shadow-[#183B73]/20
                                "
                            >
                                <Bell className="h-5 w-5" />
                            </div>

                            <div>
                                <h3
                                    className="
                                        text-base
                                        font-bold
                                        text-[#183B73]
                                        tracking-tight
                                    "
                                >
                                    {t.auth.notifications}
                                </h3>

                                {unreadCount > 0 && (
                                    <p
                                        className="
                                            mt-0.5
                                            text-xs
                                            text-slate-500
                                            font-medium
                                        "
                                    >
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#46A6D9] animate-pulse" />
                                            {unreadCount}{" "}
                                            {t.notifications?.unread || "unread"}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-slate-400
                                transition-all
                                duration-200
                                hover:bg-slate-100
                                hover:text-slate-700
                                hover:scale-105
                                active:scale-95
                            "
                            aria-label={
                                t.common.close ||
                                "Close"
                            }
                        >
                            <X className="h-4.5 w-4.5" />
                        </button>
                    </div>

                    {/* Notifications */}
                    <div
                        className="
                            max-h-[450px]
                            overflow-y-auto
                            p-4
                            scrollbar-thin
                            scrollbar-thumb-slate-200
                            scrollbar-track-transparent
                            hover:scrollbar-thumb-slate-300
                        "
                    >
                        {loading ? (
                            <div className="space-y-3 p-2">
                                {Array.from({
                                    length: 4,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            flex
                                            gap-4
                                            rounded-2xl
                                            p-4
                                        "
                                    >
                                        <div
                                            className="
                                                h-12
                                                w-12
                                                shrink-0
                                                animate-pulse
                                                rounded-2xl
                                                bg-gradient-to-br
                                                from-slate-200
                                                to-slate-100
                                            "
                                        />
                                        <div className="flex-1 space-y-2.5">
                                            <div
                                                className="
                                                    h-3.5
                                                    w-32
                                                    animate-pulse
                                                    rounded
                                                    bg-gradient-to-r
                                                    from-slate-200
                                                    to-slate-100
                                                "
                                            />
                                            <div
                                                className="
                                                    h-3
                                                    w-full
                                                    animate-pulse
                                                    rounded
                                                    bg-gradient-to-r
                                                    from-slate-100
                                                    to-slate-50
                                                "
                                            />
                                            <div
                                                className="
                                                    h-2.5
                                                    w-24
                                                    animate-pulse
                                                    rounded
                                                    bg-gradient-to-r
                                                    from-slate-100
                                                    to-slate-50
                                                "
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : notifications.length === 0 ? (
                            <div
                                className="
                                    flex
                                    min-h-[260px]
                                    flex-col
                                    items-center
                                    justify-center
                                    px-8
                                    py-12
                                    text-center
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gradient-to-br
                                        from-slate-50
                                        to-slate-100
                                        mb-2
                                    "
                                >
                                    <Bell
                                        className="
                                            h-9
                                            w-9
                                            text-slate-300
                                        "
                                    />
                                </div>

                                <h4
                                    className="
                                        mt-4
                                        text-base
                                        font-bold
                                        text-slate-700
                                    "
                                >
                                    {t.notifications?.noNotifications ||
                                        t.auth.notifications}
                                </h4>

                                <p
                                    className="
                                        mt-1.5
                                        text-sm
                                        leading-6
                                        text-slate-400
                                        max-w-[220px]
                                    "
                                >
                                    {t.notifications?.noNotificationsDescription ||
                                        "You're all caught up! No new notifications."}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                {notifications.map(
                                    (notification) => {
                                        const Icon =
                                            getNotificationIcon(
                                                notification
                                            );

                                        const unread =
                                            !notification.read_at;

                                        return (
                                            <motion.button
                                                key={
                                                    notification.id
                                                }
                                                type="button"
                                                whileHover={{
                                                    scale: 1.02,
                                                    transition: {
                                                        duration: 0.15,
                                                    },
                                                }}
                                                whileTap={{
                                                    scale: 0.98,
                                                }}
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                                className={`
                                                    group
                                                    flex
                                                    w-full
                                                    items-start
                                                    gap-4
                                                    rounded-2xl
                                                    p-4
                                                    text-start
                                                    transition-all
                                                    duration-300
                                                    relative
                                                    overflow-hidden
                                                    ${unread
                                                        ? "bg-gradient-to-r from-[#EAF4FF] to-[#f0f8ff] hover:from-[#dceaf5] hover:to-[#e8f4ff]"
                                                        : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-white"
                                                    }
                                                `}
                                            >
                                                {/* Animated unread indicator */}
                                                {unread && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/5 to-transparent animate-pulse" />
                                                )}

                                                {/* Icon */}
                                                <div
                                                    className={`
                                                        relative
                                                        flex
                                                        h-12
                                                        w-12
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-2xl
                                                        transition-all
                                                        duration-300
                                                        ${unread
                                                            ? "bg-gradient-to-br from-[#183B73] to-[#1a4a8a] text-white shadow-lg shadow-[#183B73]/25 group-hover:shadow-[#183B73]/35"
                                                            : "bg-gradient-to-br from-slate-100 to-slate-50 text-slate-400 group-hover:from-slate-200 group-hover:to-slate-100"
                                                        }
                                                    `}
                                                >
                                                    <Icon className="h-5 w-5" />

                                                    {unread && (
                                                        <span
                                                            className="
                                                                absolute
                                                                -right-0.5
                                                                -top-0.5
                                                                h-3
                                                                w-3
                                                                rounded-full
                                                                border-2
                                                                border-white
                                                                bg-gradient-to-br
                                                                from-[#46A6D9]
                                                                to-[#3a8ec4]
                                                                shadow-md
                                                                shadow-[#46A6D9]/40
                                                                animate-pulse
                                                            "
                                                        />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="min-w-0 flex-1">
                                                    <div
                                                        className="
                                                            flex
                                                            items-start
                                                            justify-between
                                                            gap-2
                                                        "
                                                    >
                                                        <h4
                                                            className={`
                                                                text-sm
                                                                truncate
                                                                ${unread
                                                                    ? "font-bold text-[#183B73]"
                                                                    : "font-semibold text-slate-600"
                                                                }
                                                            `}
                                                        >
                                                            {getNotificationTitle(
                                                                notification
                                                            )}
                                                        </h4>

                                                        {unread && (
                                                            <span
                                                                className="
                                                                    mt-1
                                                                    h-2.5
                                                                    w-2.5
                                                                    shrink-0
                                                                    rounded-full
                                                                    bg-gradient-to-br
                                                                    from-[#46A6D9]
                                                                    to-[#3a8ec4]
                                                                    shadow-sm
                                                                    shadow-[#46A6D9]/30
                                                                "
                                                            />
                                                        )}
                                                    </div>

                                                    <p
                                                        className="
                                                            mt-1.5
                                                            line-clamp-2
                                                            text-sm
                                                            leading-5.5
                                                            text-slate-500
                                                            group-hover:text-slate-600
                                                            transition-colors
                                                            duration-200
                                                        "
                                                    >
                                                        {getNotificationMessage(
                                                            notification
                                                        )}
                                                    </p>

                                                    <div
                                                        className="
                                                            mt-2.5
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-xs
                                                            text-slate-400
                                                            font-medium
                                                        "
                                                    >
                                                        <span className="inline-flex items-center gap-1.5">
                                                            {unread ? (
                                                                <Bell className="h-3.5 w-3.5 text-[#46A6D9]" />
                                                            ) : (
                                                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                                                            )}
                                                            {getNotificationTime(
                                                                notification
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div
                            className="
                                border-t
                                border-slate-100/80
                                px-6
                                py-4
                                bg-gradient-to-r
                                from-white
                                via-slate-50/30
                                to-white
                            "
                        >
                            <button
                                type="button"
                                onClick={
                                    handleMarkAllAsRead
                                }
                                disabled={
                                    markingAll ||
                                    unreadCount === 0
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2.5
                                    rounded-xl
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[#183B73]
                                    transition-all
                                    duration-200
                                    hover:bg-gradient-to-r
                                    hover:from-[#EAF4FF]
                                    hover:to-[#f0f8ff]
                                    hover:shadow-sm
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                    disabled:hover:bg-transparent
                                    disabled:hover:shadow-none
                                    active:scale-98
                                    group
                                "
                            >
                                <CheckCheck className="h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110" />

                                {markingAll
                                    ? t.auth.loading ||
                                      "Loading..."
                                    : t.notifications
                                          ?.markAllAsRead ||
                                      "Mark all as read"}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}