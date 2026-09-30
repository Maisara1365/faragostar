"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Clock, CheckCircle2, AlertCircle } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/hooks/use-language";
import {
    getNotifications,
    markNotificationAsRead,
    type Notification,
} from "@/services/notifications";

export default function NotificationPage() {
    const { language, t } = useLanguage();
    const router = useRouter();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [clickingId, setClickingId] = useState<number | null>(null);

    const isRTL = language === "fa";

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);

                const response = await getNotifications(50);

                const items = Array.isArray(response)
                    ? response
                    : response?.data ?? [];

                setNotifications(items);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Determine Notification Destination
    |--------------------------------------------------------------------------
    */

    const getNotificationDestination = (
        notification: Notification
    ): string | null => {
        // Prefer the explicit action from the backend
        if (notification.data?.action === "message") {
            return "/dashboard/messages";
        }

        if (notification.data?.action === "order") {
            return "/dashboard/orders";
        }

        // Fallback for notifications that don't have an action
        if (
            notification.type === "new_message" ||
            notification.type === "message" ||
            notification.type.includes("message")
        ) {
            return "/dashboard/messages";
        }

        if (
            notification.type === "new_order" ||
            notification.type === "order" ||
            notification.type.includes("order")
        ) {
            return "/dashboard/orders";
        }

        return null;
    };

    /*
    |--------------------------------------------------------------------------
    | Handle Notification Click
    |--------------------------------------------------------------------------
    */

    const handleNotificationClick = async (
        notification: Notification
    ) => {
        const destination = getNotificationDestination(notification);

        // If this notification doesn't have a known destination,
        // don't do anything.
        if (!destination) {
            return;
        }

        // Prevent double-clicks while processing
        if (clickingId === notification.id) {
            return;
        }

        try {
            setClickingId(notification.id);

            /*
            |--------------------------------------------------------------
            | Mark as read only if it is currently unread
            |--------------------------------------------------------------
            */

            if (!notification.read_at) {
                try {
                    await markNotificationAsRead(notification.id);

                    /*
                    |------------------------------------------------------
                    | Update local state immediately.
                    | This removes the "New" badge and changes the
                    | notification appearance without requiring a reload.
                    |------------------------------------------------------
                    */

                    setNotifications((currentNotifications) =>
                        currentNotifications.map((item) =>
                            item.id === notification.id
                                ? {
                                      ...item,
                                      read: true,
                                      read_at: new Date().toISOString(),
                                  }
                                : item
                        )
                    );
                } catch (error) {
                    console.error(
                        "Failed to mark notification as read:",
                        error
                    );

                    // We still allow navigation even if marking as read
                    // fails, so the user can access the related page.
                }
            }

            /*
            |--------------------------------------------------------------
            | Redirect to the related page
            |--------------------------------------------------------------
            */

            router.push(destination);
        } finally {
            setClickingId(null);
        }
    };

    const getNotificationIcon = (type: string) => {
        if (
            type === "new_order" ||
            type === "order" ||
            type.includes("order")
        ) {
            return (
                <CheckCircle2
                    size={18}
                    style={{ color: "#059669" }}
                />
            );
        }

        return (
            <AlertCircle
                size={18}
                style={{ color: "#2563eb" }}
            />
        );
    };

    const getNotificationLabel = (type: string) => {
        if (
            type === "new_order" ||
            type === "order" ||
            type.includes("order")
        ) {
            return language === "fa"
                ? "سفارش جدید"
                : "New Order";
        }

        if (
            type === "new_message" ||
            type === "message" ||
            type.includes("message")
        ) {
            return language === "fa"
                ? "پیام جدید"
                : "New Message";
        }

        return type
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #f0f4f8 0%, #ffffff 50%, #f8fafc 100%)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />

            <main
                style={{
                    flex: 1,
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "140px 24px 60px",
                    width: "100%",
                }}
            >
                {/* Header Section */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "40px",
                        animation: "fadeInDown 0.5s ease-out",
                    }}
                >
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background:
                                "linear-gradient(135deg, #183B73 0%, #1e4a8f 100%)",
                            boxShadow:
                                "0 8px 24px rgba(24, 59, 115, 0.15)",
                            transition: "transform 0.2s ease",
                            cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "scale(1)";
                        }}
                    >
                        <Bell
                            size={26}
                            style={{ color: "#ffffff" }}
                        />
                    </div>

                    <div>
                        <h1
                            style={{
                                margin: 0,
                                color: "#183B73",
                                fontSize: "32px",
                                fontWeight: 800,
                                letterSpacing: "-0.5px",
                                lineHeight: 1.2,
                            }}
                        >
                            {t.auth.notifications}
                        </h1>

                        <p
                            style={{
                                marginTop: "6px",
                                color: "#475569",
                                fontSize: "15px",
                                fontWeight: 400,
                            }}
                        >
                            {language === "fa"
                                ? "پیام‌ها و به‌روزرسانی‌های سفارش شما"
                                : "Your messages and order updates"}
                        </p>
                    </div>
                </div>

                {/* Stats Badge */}
                {!loading && notifications.length > 0 && (
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 16px 6px 12px",
                            borderRadius: "999px",
                            backgroundColor:
                                "rgba(24, 59, 115, 0.08)",
                            marginBottom: "24px",
                            border:
                                "1px solid rgba(24, 59, 115, 0.12)",
                        }}
                    >
                        <Clock
                            size={14}
                            style={{ color: "#183B73" }}
                        />

                        <span
                            style={{
                                fontSize: "13px",
                                color: "#183B73",
                                fontWeight: 600,
                            }}
                        >
                            {notifications.length}{" "}
                            {language === "fa"
                                ? "اعلان"
                                : "notifications"}
                        </span>
                    </div>
                )}

                {/* Notifications List */}
                <div
                    style={{
                        borderRadius: "28px",
                        border:
                            "1px solid rgba(203, 213, 225, 0.5)",
                        background: "#ffffff",
                        boxShadow:
                            "0 4px 32px rgba(0, 0, 0, 0.06)",
                        minHeight: "320px",
                        padding: "20px",
                        transition: "all 0.3s ease",
                    }}
                >
                    {loading ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "60px 20px",
                                gap: "16px",
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: "3px solid #e2e8f0",
                                    borderTopColor: "#183B73",
                                    animation:
                                        "spin 0.8s linear infinite",
                                }}
                            />

                            <span
                                style={{
                                    color: "#64748b",
                                    fontSize: "14px",
                                }}
                            >
                                {language === "fa"
                                    ? "در حال بارگذاری..."
                                    : "Loading..."}
                            </span>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "60px 20px",
                                gap: "12px",
                            }}
                        >
                            <Bell
                                size={48}
                                style={{ color: "#94a3b8" }}
                            />

                            <span
                                style={{
                                    color: "#475569",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                }}
                            >
                                {language === "fa"
                                    ? "هیچ اعلانی وجود ندارد"
                                    : "No notifications found"}
                            </span>

                            <span
                                style={{
                                    color: "#94a3b8",
                                    fontSize: "13px",
                                }}
                            >
                                {language === "fa"
                                    ? "به‌زودی اعلان‌های جدید دریافت خواهید کرد"
                                    : "You'll receive new notifications soon"}
                            </span>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {notifications.map(
                                (notification, index) => {
                                    const destination =
                                        getNotificationDestination(
                                            notification
                                        );

                                    const isClickable =
                                        destination !== null;

                                    const isClicking =
                                        clickingId ===
                                        notification.id;

                                    return (
                                        <div
                                            key={notification.id}
                                            role={
                                                isClickable
                                                    ? "button"
                                                    : undefined
                                            }
                                            tabIndex={
                                                isClickable ? 0 : undefined
                                            }
                                            style={{
                                                padding: "18px 20px",
                                                borderRadius: "16px",
                                                backgroundColor:
                                                    notification.read_at
                                                        ? "#f8fafc"
                                                        : "#eff6ff",
                                                border:
                                                    notification.read_at
                                                        ? "1px solid #e2e8f0"
                                                        : "1px solid #bfdbfe",
                                                transition:
                                                    "all 0.25s ease",
                                                cursor: isClickable
                                                    ? isClicking
                                                        ? "wait"
                                                        : "pointer"
                                                    : "default",
                                                position: "relative",
                                                animation: `fadeInUp 0.4s ease-out ${
                                                    index * 0.05
                                                }s both`,
                                                opacity: isClicking
                                                    ? 0.7
                                                    : 1,
                                            }}
                                            onClick={() => {
                                                if (
                                                    isClickable &&
                                                    !isClicking
                                                ) {
                                                    handleNotificationClick(
                                                        notification
                                                    );
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    isClickable &&
                                                    (e.key ===
                                                        "Enter" ||
                                                        e.key ===
                                                            " ")
                                                ) {
                                                    e.preventDefault();

                                                    if (
                                                        !isClicking
                                                    ) {
                                                        handleNotificationClick(
                                                            notification
                                                        );
                                                    }
                                                }
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isClickable) {
                                                    return;
                                                }

                                                e.currentTarget.style.transform =
                                                    "translateX(4px)";

                                                e.currentTarget.style.boxShadow =
                                                    "0 4px 16px rgba(0, 0, 0, 0.08)";

                                                e.currentTarget.style.backgroundColor =
                                                    notification.read_at
                                                        ? "#f1f5f9"
                                                        : "#dbeafe";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isClickable) {
                                                    return;
                                                }

                                                e.currentTarget.style.transform =
                                                    "translateX(0)";

                                                e.currentTarget.style.boxShadow =
                                                    "none";

                                                e.currentTarget.style.backgroundColor =
                                                    notification.read_at
                                                        ? "#f8fafc"
                                                        : "#eff6ff";
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "flex-start",
                                                    gap: "12px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems:
                                                            "flex-start",
                                                        gap: "12px",
                                                        flex: 1,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            marginTop:
                                                                "2px",
                                                            width: "32px",
                                                            height: "32px",
                                                            borderRadius:
                                                                "10px",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            backgroundColor:
                                                                notification.read_at
                                                                    ? "#e2e8f0"
                                                                    : "#dbeafe",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {getNotificationIcon(
                                                            notification.type
                                                        )}
                                                    </div>

                                                    <div
                                                        style={{
                                                            flex: 1,
                                                        }}
                                                    >
                                                        <strong
                                                            style={{
                                                                color: "#1e293b",
                                                                fontSize:
                                                                    "15px",
                                                                fontWeight:
                                                                    600,
                                                                display:
                                                                    "block",
                                                                marginBottom:
                                                                    "2px",
                                                            }}
                                                        >
                                                            {getNotificationLabel(
                                                                notification.type
                                                            )}
                                                        </strong>

                                                        {notification
                                                            .data
                                                            ?.order_number && (
                                                            <p
                                                                style={{
                                                                    margin: 0,
                                                                    fontSize:
                                                                        "14px",
                                                                    color: "#334155",
                                                                    lineHeight:
                                                                        1.4,
                                                                }}
                                                            >
                                                                {language ===
                                                                "fa"
                                                                    ? `سفارش شماره ${notification.data.order_number} ثبت شد`
                                                                    : `Order #${notification.data.order_number} created`}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display:
                                                            "flex",
                                                        flexDirection:
                                                            "column",
                                                        alignItems:
                                                            "flex-end",
                                                        gap: "6px",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "12px",
                                                            color: "#64748b",
                                                            fontWeight:
                                                                500,
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {new Date(
                                                            notification.created_at
                                                        ).toLocaleString(
                                                            language ===
                                                                "fa"
                                                                ? "fa-IR"
                                                                : "en-US",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </span>

                                                    {!notification.read_at && (
                                                        <span
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                                padding:
                                                                    "2px 12px",
                                                                borderRadius:
                                                                    "999px",
                                                                fontSize:
                                                                    "10px",
                                                                fontWeight:
                                                                    700,
                                                                letterSpacing:
                                                                    "0.5px",
                                                                backgroundColor:
                                                                    "#2563eb",
                                                                color: "white",
                                                                boxShadow:
                                                                    "0 2px 8px rgba(37, 99, 235, 0.3)",
                                                                textTransform:
                                                                    "uppercase",
                                                            }}
                                                        >
                                                            {language ===
                                                            "fa"
                                                                ? "جدید"
                                                                : "New"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-16px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

