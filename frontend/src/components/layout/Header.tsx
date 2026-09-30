"use client";

import Image from "next/image";
import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Menu,
    X,
    Phone,
    Globe,
    Home,
    Wrench,
    Image as ImageIcon,
    Info,
    PhoneCall,
    MessageCircle,
    Bell,
    User,
    UserPlus,
    ChevronDown,
    LayoutDashboard,
    Settings,
    LogOut,
    ShoppingCart,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import { useRouter } from "next/navigation";

import Container from "./Container";
import TopBar from "./TopBar";
import { company } from "@/config/company";
import Button from "@/components/ui/button";
import useScroll from "@/hooks/use-scroll";
import { useLanguage } from "@/hooks/use-language";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getNotifications, getUnreadNotificationCount } from "@/services/notifications";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const pathname = usePathname();
    const router = useRouter();

    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    // ======================================================
    // Authentication
    // ======================================================

    const {
        user,
        loading,
        logoutUser,
    } = useAuth();

    // ======================================================
    // Language
    // ======================================================

    const {
        language,
        setLanguage,
        t,
    } = useLanguage();

    const isRTL = language === "fa";

    // ======================================================
    // Scroll
    // ======================================================

    const {
        scrolled,
        progress,
    } = useScroll();

    // ======================================================
    // Profile Photo
    // ======================================================

    const profilePhotoUrl =
        user?.profile_photo_url ||
        (
            user?.profile_photo_path
                ? `http://localhost:8000/storage/${user.profile_photo_path}`
                : null
        );

    // ======================================================
    // Notification Types
    // ======================================================

    type NotificationItem = {
        id: number | string;
        type: "message" | "order" | "order_status" | "new_order" | string;
        title?: string;
        message?: string;
        data?: {
            conversation_id?: number;
            order_id?: number;
            order_number?: string;
            status?: string;
            [key: string]: any;
        };
        read_at?: string | null;
        created_at?: string;
    };

    // ======================================================
    // Load Notifications
    // ======================================================

    const loadNotifications = async () => {
        if (!user) return;

        try {
            setNotificationLoading(true);

            const response = await getNotifications(20);
            
            const items = Array.isArray(response) 
                ? response 
                : response?.data ?? [];

            setNotifications(items);
        } catch (error) {
            console.error(
                "Failed to load notifications:",
                error
            );
            setNotifications([]);
        } finally {
            setNotificationLoading(false);
        }
    };

    // ======================================================
    // Load Unread Count
    // ======================================================

    const loadUnreadCount = async () => {
        if (!user) return;
        
        try {
            const count = await getUnreadNotificationCount();
            setUnreadCount(count);
        } catch (error) {
            console.error("Failed to load unread count:", error);
        }
    };

    // ======================================================
    // Load Notifications When User Logs In
    // ======================================================

    useEffect(() => {
        if (user) {
            loadNotifications();
            loadUnreadCount();
        } else {
            setNotifications([]);
            setUnreadCount(0);
        }
    }, [user]);

    // ======================================================
    // Notification Count
    // ======================================================

    const unreadNotificationCount =
        notifications.filter(
            (notification) =>
                !notification.read_at
        ).length;

    // ======================================================
    // Outside Click Handler
    // ======================================================

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target as Node
                )
            ) {
                setNotificationOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    // ======================================================
    // Escape Key Handler
    // ======================================================

    useEffect(() => {
        function handleEscape(
            event: KeyboardEvent
        ) {
            if (event.key === "Escape") {
                setProfileOpen(false);
                setNotificationOpen(false);
            }
        }

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleEscape
            );
    }, []);

    // ======================================================
    // Notification Polling
    // ======================================================

    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            loadNotifications();
            loadUnreadCount();
        }, 15000);

        return () =>
            clearInterval(interval);
    }, [user]);

    // ======================================================
    // Notification Click
    // ======================================================

    const handleNotificationClick = (
        notification: NotificationItem
    ) => {
        setNotificationOpen(false);

        const type = notification.type;

        if (
            type === "message" &&
            notification.data?.conversation_id
        ) {
            router.push(
                `/dashboard/messages?conversation=${notification.data.conversation_id}`
            );

            return;
        }

        if (
            (
                type === "order" ||
                type === "order_status" ||
                type === "new_order"
            ) &&
            notification.data?.order_id
        ) {
            router.push(
                `/dashboard/orders/${notification.data.order_id}`
            );

            return;
        }

        router.push("/dashboard/notifications");
    };

    // ======================================================
    // Mark Notification As Read
    // ======================================================

    const markNotificationAsRead = async (
        id: number | string
    ) => {
        try {
            setNotifications((previous) =>
                previous.map(
                    (notification) =>
                        notification.id === id
                            ? {
                                ...notification,
                                read_at:
                                    new Date().toISOString(),
                            }
                            : notification
                )
            );
        } catch (error) {
            console.error(
                "Failed to mark notification as read:",
                error
            );
        }
    };

    // ======================================================
    // Mark All As Read
    // ======================================================

    const markAllNotificationsAsRead = async () => {
        try {
            setNotifications((previous) =>
                previous.map(
                    (notification) => ({
                        ...notification,
                        read_at:
                            notification.read_at ||
                            new Date().toISOString(),
                    })
                )
            );
        } catch (error) {
            console.error(
                "Failed to mark all notifications as read:",
                error
            );
        }
    };

    // ======================================================
    // Notification Icon
    // ======================================================

    const getNotificationIcon = (
        notification: NotificationItem
    ) => {
        if (
            notification.type === "message"
        ) {
            return (
                <div
                    className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#EAF4FF]
                    to-[#d6e8ff]"
                >
                    <MessageCircle
                        className="
                        h-5
                        w-5
                        text-[#183B73]"
                    />
                </div>
            );
        }

        if (
            notification.type === "order" ||
            notification.type === "new_order"
        ) {
            return (
                <div
                    className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#EAF4FF]
                    to-[#d6e8ff]"
                >
                    <ShoppingCart
                        className="
                        h-5
                        w-5
                        text-[#183B73]"
                    />
                </div>
            );
        }

        if (
            notification.type === "order_status"
        ) {
            const status =
                notification.data?.status;

            if (
                status === "completed" ||
                status === "approved"
            ) {
                return (
                    <div
                        className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-green-50
                        to-green-100"
                    >
                        <CheckCircle2
                            className="
                            h-5
                            w-5
                            text-green-600"
                        />
                    </div>
                );
            }

            if (
                status === "cancelled" ||
                status === "rejected"
            ) {
                return (
                    <div
                        className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-red-50
                        to-red-100"
                    >
                        <XCircle
                            className="
                            h-5
                            w-5
                            text-red-600"
                        />
                    </div>
                );
            }

            return (
                <div
                    className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-50
                    to-amber-100"
                >
                    <Clock
                        className="
                        h-5
                        w-5
                        text-amber-600"
                    />
                </div>
            );
        }

        return (
            <div
                className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#EAF4FF]
                to-[#d6e8ff]"
            >
                <Bell
                    className="
                    h-5
                    w-5
                    text-[#183B73]"
                />
            </div>
        );
    };

    // ======================================================
    // Notification Text
    // ======================================================

    const getNotificationTitle = (notification: NotificationItem) => {
        if (notification.title) {
            return notification.title;
        }

        const data = notification.data;
        
        if (notification.type === "new_order") {
            return language === "fa" 
                ? "سفارش جدید" 
                : "New Order";
        }

        if (notification.type === "message") {
            return language === "fa" 
                ? "پیام جدید" 
                : "New Message";
        }

        return t.auth.notifications;
    };

    const getNotificationMessage = (notification: NotificationItem) => {
        if (notification.message) {
            return notification.message;
        }

        const data = notification.data;
        
        if (notification.type === "new_order" && data?.order_number) {
            return language === "fa"
                ? `سفارش ${data.order_number} ثبت شد`
                : `Order ${data.order_number} has been placed`;
        }

        return "";
    };

    // ======================================================
    // Notification Time
    // ======================================================

    const formatNotificationTime = (
        date?: string
    ) => {
        if (!date) return "";

        const notificationDate =
            new Date(date);

        if (
            Number.isNaN(
                notificationDate.getTime()
            )
        ) {
            return "";
        }

        const diff =
            Date.now() -
            notificationDate.getTime();

        const minutes = Math.floor(
            diff / 60000
        );

        if (minutes < 1) {
            return language === "fa"
                ? "همین حالا"
                : "Just now";
        }

        if (minutes < 60) {
            return language === "fa"
                ? `${minutes} دقیقه پیش`
                : `${minutes} min ago`;
        }

        const hours = Math.floor(
            minutes / 60
        );

        if (hours < 24) {
            return language === "fa"
                ? `${hours} ساعت پیش`
                : `${hours} hr ago`;
        }

        const days = Math.floor(
            hours / 24
        );

        return language === "fa"
            ? `${days} روز پیش`
            : `${days} day${days > 1 ? "s" : ""} ago`;
    };

    // ======================================================
    // Logout
    // ======================================================

    const handleLogout = async () => {
        if (loggingOut) return;

        setLoggingOut(true);

        try {
            await logoutUser();

            setProfileOpen(false);
            setNotificationOpen(false);
            setMobileOpen(false);

            router.replace("/");
        } finally {
            setLoggingOut(false);
        }
    };

    // ======================================================
    // Navigation
    // ======================================================

    const navigation = [
        {
            title: t.common.home,
            href: "/",
            icon: Home,
        },
        {
            title: t.common.services,
            href: "/services",
            icon: Wrench,
        },
        {
            title: t.common.portfolio,
            href: "/portfolio",
            icon: ImageIcon,
        },
        {
            title: t.common.about,
            href: "/about",
            icon: Info,
        },
        {
            title: t.common.contact,
            href: "/contact",
            icon: PhoneCall,
        },
    ];

    return (
        <>
            {/* ============================================================
                SCROLL PROGRESS
            ============================================================ */}

            <div
                className="
                fixed
                top-0
                left-0
                z-[100]
                h-[3px]
                bg-gradient-to-r
                from-[#183B73]
                via-[#46A6D9]
                to-[#183B73]
                transition-all
                duration-150
                shadow-[0_0_20px_#38bdf8]"
                style={{
                    width: `${progress}%`,
                }}
            />

            <header
                className="
                fixed
                inset-x-0
                top-0
                z-50"
            >
                {/* ========================================================
                    TOP BAR
                ======================================================== */}

                <TopBar />

                {/* ========================================================
                    FLOATING NAVIGATION
                ======================================================== */}

                <Container>
                    <motion.div
                        animate={{
                            y: scrolled ? 8 : 16,
                            scale: scrolled
                                ? 0.97
                                : 1,
                        }}
                        transition={{
                            duration: 0.30,
                        }}
                        className="
                        relative
                        rounded-full
                        border
                        border-white/30
                        bg-white/75
                        backdrop-blur-xl
                        shadow-2xl"
                    >
                        {/* Glowing Background */}

                        <div
                            className="
                            absolute
                            inset-0
                            -z-10
                            rounded-full
                            bg-gradient-to-r
                            from-[#183B73]/10
                            via-[#46A6D9]/15
                            to-[#183B73]/10
                            blur-3xl"
                        />

                        <div
                            className="
                            flex
                            h-20
                            items-center
                            justify-between
                            gap-4
                            px-8
                        "
                        >
                            {/* =================================================
                                LOGO
                            ================================================= */}

                            <Link
                                href="/"
                                className="
                                flex
                                flex-shrink-0
                                items-center
                                gap-3"
                            >
                                <motion.div
                                    animate={{
                                        scale: scrolled
                                            ? 0.85
                                            : 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    className="relative"
                                >
                                    <div
                                        className="
                                        relative
                                        rounded-full
                                        bg-gradient-to-br
                                        from-[#183B73]
                                        to-[#46A6D9]
                                        p-[2px]
                                        shadow-lg
                                        shadow-[#46A6D9]/30"
                                    >
                                        <div
                                            className="
                                            rounded-full
                                            bg-white
                                            p-1"
                                        >
                                            <Image
                                                src={
                                                    company.logo
                                                }
                                                alt={
                                                    company.englishName
                                                }
                                                width={58}
                                                height={58}
                                                className="
                                                rounded-full
                                                transition-all
                                                duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className="
                                        absolute
                                        -inset-1
                                        rounded-full
                                        border-2
                                        border-[#46A6D9]/20
                                        animate-pulse"
                                    />
                                </motion.div>

                                <div
                                    className="
                                    hidden
                                    xl:block"
                                >
                                    <h2
                                        className="
                                        text-lg
                                        font-bold
                                        text-[#183B73]"
                                    >
                                        {language === "fa"
                                            ? company.name
                                            : company.englishName}
                                    </h2>

                                    <p
                                        className="
                                        text-xs
                                        text-slate-500"
                                    >
                                        {language === "fa"
                                            ? company.slogan
                                            : "Creativity • Quality • Innovation"}
                                    </p>
                                </div>
                            </Link>

                            {/* =================================================
                                DESKTOP MENU
                            ================================================= */}

                            <nav
                                className="
                                hidden
                                items-center
                                gap-8
                                lg:flex"
                            >
                                {navigation.map(
                                    (item) => {
                                        const isActive =
                                            pathname ===
                                            item.href;

                                        return (
                                            <Link
                                                key={
                                                    item.href
                                                }
                                                href={
                                                    item.href
                                                }
                                                className={`
                                                group
                                                relative
                                                px-1
                                                py-2
                                                font-medium
                                                transition-colors
                                                ${
                                                    isActive
                                                        ? "text-[#183B73]"
                                                        : "text-slate-700 hover:text-[#183B73]"
                                                }`}
                                            >
                                                {
                                                    item.title
                                                }

                                                <span
                                                    className={`
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-[3px]
                                                    rounded-full
                                                    bg-[#46A6D9]
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isActive
                                                            ? "w-full"
                                                            : "w-0 group-hover:w-full"
                                                    }`}
                                                />
                                            </Link>
                                        );
                                    }
                                )}
                            </nav>

                            {/* =================================================
                                RIGHT BUTTONS
                            ================================================= */}

                            <div
                                className="
                                hidden
                                flex-shrink-0
                                items-center
                                gap-3
                                pr-1
                                lg:flex"
                            >
                                {/* Messages */}

                                {!loading && (
                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                    >
                                        <Button
                                            href={
                                                user
                                                    ? "/dashboard/messages"
                                                    : "/auth/register?redirect=/messages"
                                            }
                                            variant="primary"
                                            className="
                                            flex
                                            h-[46px]
                                            w-[80px]
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:-translate-y-[1px]
                                            hover:scale-[1.02]
                                            hover:bg-[#D9ECFF]
                                            hover:shadow-lg
                                            hover:ring-1
                                            hover:ring-[#46A6D9]/50"
                                        >
                                            <MessageCircle
                                                className="
                                                h-3.5
                                                w-3.5
                                                text-[#183B73]"
                                            />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .messages
                                                }
                                            </span>
                                        </Button>
                                    </motion.div>
                                )}

                                {loading ? (
                                    <div
                                        className="
                                        h-11
                                        w-40
                                        animate-pulse
                                        rounded-full
                                        bg-slate-200"
                                    />
                                ) : !user ? (
                                    <>
                                        <Button
                                            href="/auth/login"
                                            className="
                                            flex
                                            h-[46px]
                                            w-[72px]
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:-translate-y-[1px]
                                            hover:scale-[1.02]
                                            hover:bg-[#D9ECFF]
                                            hover:shadow-lg"
                                        >
                                            <User
                                                className="
                                                h-3.5
                                                w-3.5
                                                text-[#183B73]"
                                            />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .login
                                                }
                                            </span>
                                        </Button>

                                        <Button
                                            href="/auth/register"
                                            className="
                                            flex
                                            h-[46px]
                                            w-[72px]
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:-translate-y-[1px]
                                            hover:scale-[1.02]
                                            hover:bg-[#D9ECFF]
                                            hover:shadow-lg"
                                        >
                                            <UserPlus
                                                className="
                                                h-3.5
                                                w-3.5
                                                text-[#183B73]"
                                            />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .signup
                                                }
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* =================================================
                                            NOTIFICATION BELL - ENHANCED DROPDOWN
                                        ================================================= */}

                                        <div
                                            ref={
                                                notificationRef
                                            }
                                            className="
                                            relative"
                                        >
                                            <button
                                                onClick={() => {
                                                    setProfileOpen(
                                                        false
                                                    );

                                                    setNotificationOpen(
                                                        (previous) =>
                                                            !previous
                                                    );
                                                }}
                                                aria-label={
                                                    t.auth
                                                        .notifications
                                                }
                                                className="
                                                relative
                                                flex
                                                h-11
                                                w-11
                                                items-center
                                                justify-center
                                                rounded-full
                                                transition-all
                                                duration-300
                                                hover:bg-slate-100
                                                hover:scale-105
                                                active:scale-95"
                                            >
                                                <Bell
                                                    className="
                                                    h-5
                                                    w-5
                                                    text-[#183B73]
                                                    transition-transform
                                                    duration-300
                                                    group-hover:rotate-12"
                                                />

                                                {/* Unread Counter */}

                                                {unreadNotificationCount >
                                                    0 && (
                                                    <span
                                                        className="
                                                        absolute
                                                        -right-1
                                                        -top-1
                                                        flex
                                                        min-h-[20px]
                                                        min-w-[20px]
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-gradient-to-br
                                                        from-red-500
                                                        to-red-600
                                                        px-1.5
                                                        text-[10px]
                                                        font-bold
                                                        leading-none
                                                        text-white
                                                        shadow-lg
                                                        shadow-red-500/30
                                                        animate-pulse"
                                                    >
                                                        {unreadNotificationCount >
                                                        99
                                                            ? "99+"
                                                            : unreadNotificationCount}
                                                    </span>
                                                )}
                                            </button>

                                            {/* =================================================
                                                NOTIFICATION POPUP - ENHANCED
                                            ================================================= */}

                                            <AnimatePresence>
                                                {notificationOpen && (
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                            y: -15,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            scale: 0.95,
                                                            y: -15,
                                                        }}
                                                        transition={{
                                                            duration: 0.25,
                                                            ease: "easeOut",
                                                        }}
                                                        className={`
                                                        absolute
                                                        top-[calc(100%+16px)]
                                                        z-[80]
                                                        w-[420px]
                                                        max-w-[calc(100vw-2rem)]
                                                        overflow-hidden
                                                        rounded-2xl
                                                        border
                                                        border-white/30
                                                        bg-white/98
                                                        shadow-[0_20px_80px_rgba(15,23,42,0.15),0_8px_32px_rgba(15,23,42,0.08)]
                                                        backdrop-blur-2xl
                                                        ${isRTL ? "left-0" : "right-0"}
                                                    `}
                                                    >
                                                        {/* Header - Enhanced */}
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
                                                            to-slate-50/50"
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
                                                                    shadow-[#183B73]/20"
                                                                >
                                                                    <Bell className="h-5 w-5" />
                                                                </div>

                                                                <div>
                                                                    <h3
                                                                        className="
                                                                        text-base
                                                                        font-bold
                                                                        text-[#183B73]
                                                                        tracking-tight"
                                                                    >
                                                                        {
                                                                            t
                                                                                .auth
                                                                                .notifications
                                                                        }
                                                                    </h3>

                                                                    {unreadNotificationCount >
                                                                        0 && (
                                                                        <p
                                                                            className="
                                                                            mt-0.5
                                                                            text-xs
                                                                            text-slate-500
                                                                            font-medium"
                                                                        >
                                                                            <span className="inline-flex items-center gap-1.5">
                                                                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#46A6D9] animate-pulse" />
                                                                                {
                                                                                    unreadNotificationCount
                                                                                }{" "}
                                                                                {language ===
                                                                                "fa"
                                                                                    ? "اعلان خوانده‌نشده"
                                                                                    : "unread"}
                                                                            </span>
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                {unreadNotificationCount >
                                                                    0 && (
                                                                    <button
                                                                        onClick={
                                                                            markAllNotificationsAsRead
                                                                        }
                                                                        className="
                                                                        text-xs
                                                                        font-semibold
                                                                        text-[#183B73]
                                                                        transition-all
                                                                        duration-200
                                                                        hover:text-[#46A6D9]
                                                                        hover:scale-105
                                                                        active:scale-95"
                                                                    >
                                                                        {language ===
                                                                        "fa"
                                                                            ? "علامت‌گذاری همه"
                                                                            : "Mark all read"}
                                                                    </button>
                                                                )}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setNotificationOpen(
                                                                            false
                                                                        )
                                                                    }
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
                                                                    active:scale-95"
                                                                    aria-label="Close"
                                                                >
                                                                    <X className="h-4.5 w-4.5" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Notification List - Enhanced with more padding */}
                                                        <div
                                                            className="
                                                            max-h-[450px]
                                                            overflow-y-auto
                                                            p-4
                                                            scrollbar-thin
                                                            scrollbar-thumb-slate-200
                                                            scrollbar-track-transparent
                                                            hover:scrollbar-thumb-slate-300"
                                                        >
                                                            {notificationLoading ? (
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
                                                                            p-4"
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
                                                                                to-slate-100"
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
                                                                                    to-slate-100"
                                                                                />
                                                                                <div
                                                                                    className="
                                                                                    h-3
                                                                                    w-full
                                                                                    animate-pulse
                                                                                    rounded
                                                                                    bg-gradient-to-r
                                                                                    from-slate-100
                                                                                    to-slate-50"
                                                                                />
                                                                                <div
                                                                                    className="
                                                                                    h-2.5
                                                                                    w-24
                                                                                    animate-pulse
                                                                                    rounded
                                                                                    bg-gradient-to-r
                                                                                    from-slate-100
                                                                                    to-slate-50"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : notifications.length ===
                                                              0 ? (
                                                                <div
                                                                    className="
                                                                    flex
                                                                    min-h-[280px]
                                                                    flex-col
                                                                    items-center
                                                                    justify-center
                                                                    px-8
                                                                    py-12
                                                                    text-center"
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
                                                                        mb-2"
                                                                    >
                                                                        <Bell
                                                                            className="
                                                                            h-9
                                                                            w-9
                                                                            text-slate-300"
                                                                        />
                                                                    </div>

                                                                    <h4
                                                                        className="
                                                                        mt-4
                                                                        text-base
                                                                        font-bold
                                                                        text-slate-700"
                                                                    >
                                                                        {language ===
                                                                        "fa"
                                                                            ? "اعلانی وجود ندارد"
                                                                            : "No notifications"}
                                                                    </h4>

                                                                    <p
                                                                        className="
                                                                        mt-1.5
                                                                        text-sm
                                                                        leading-6
                                                                        text-slate-400
                                                                        max-w-[220px]"
                                                                    >
                                                                        {language ===
                                                                        "fa"
                                                                            ? "اعلان‌های جدید پیام‌ها و سفارش‌های شما در اینجا نمایش داده می‌شوند."
                                                                            : "New message and order notifications will appear here."}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-1.5">
                                                                    {notifications.map(
                                                                        (
                                                                            notification
                                                                        ) => {
                                                                            const unread =
                                                                                !notification.read_at;

                                                                            return (
                                                                                <motion.button
                                                                                    key={
                                                                                        notification.id
                                                                                    }
                                                                                    whileHover={{
                                                                                        scale: 1.02,
                                                                                        transition: {
                                                                                            duration: 0.15,
                                                                                        },
                                                                                    }}
                                                                                    whileTap={{
                                                                                        scale: 0.98,
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            !notification.read_at
                                                                                        ) {
                                                                                            markNotificationAsRead(
                                                                                                notification.id
                                                                                            );
                                                                                        }

                                                                                        handleNotificationClick(
                                                                                            notification
                                                                                        );
                                                                                    }}
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

                                                                                    {getNotificationIcon(
                                                                                        notification
                                                                                    )}

                                                                                    <div
                                                                                        className={`min-w-0 flex-1 ${
                                                                                            isRTL
                                                                                                ? "text-right"
                                                                                                : "text-left"
                                                                                        }`}
                                                                                    >
                                                                                        <div
                                                                                            className="
                                                                                            flex
                                                                                            items-start
                                                                                            justify-between
                                                                                            gap-2"
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
                                                                                                    animate-pulse"
                                                                                                />
                                                                                            )}
                                                                                        </div>

                                                                                        {getNotificationMessage(
                                                                                            notification
                                                                                        ) && (
                                                                                            <p
                                                                                                className="
                                                                                                mt-1.5
                                                                                                line-clamp-2
                                                                                                text-sm
                                                                                                leading-5.5
                                                                                                text-slate-500
                                                                                                group-hover:text-slate-600
                                                                                                transition-colors
                                                                                                duration-200"
                                                                                            >
                                                                                                {getNotificationMessage(
                                                                                                    notification
                                                                                                )}
                                                                                            </p>
                                                                                        )}

                                                                                        <div
                                                                                            className="
                                                                                            mt-2.5
                                                                                            flex
                                                                                            items-center
                                                                                            gap-2
                                                                                            text-xs
                                                                                            text-slate-400
                                                                                            font-medium"
                                                                                        >
                                                                                            <span className="inline-flex items-center gap-1.5">
                                                                                                {unread ? (
                                                                                                    <Bell className="h-3.5 w-3.5 text-[#46A6D9]" />
                                                                                                ) : (
                                                                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                                                                )}
                                                                                                {formatNotificationTime(
                                                                                                    notification.created_at
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>

                                                                                    {isRTL ? (
                                                                                        <ArrowLeft
                                                                                            className="
                                                                                            mt-2
                                                                                            h-4
                                                                                            w-4
                                                                                            shrink-0
                                                                                            text-slate-300
                                                                                            group-hover:text-slate-500
                                                                                            transition-colors
                                                                                            duration-200"
                                                                                        />
                                                                                    ) : (
                                                                                        <ArrowRight
                                                                                            className="
                                                                                            mt-2
                                                                                            h-4
                                                                                            w-4
                                                                                            shrink-0
                                                                                            text-slate-300
                                                                                            group-hover:text-slate-500
                                                                                            transition-colors
                                                                                            duration-200"
                                                                                        />
                                                                                    )}
                                                                                </motion.button>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Footer - Enhanced */}
                                                        {notifications.length >
                                                            0 && (
                                                            <div
                                                                className="
                                                                border-t
                                                                border-slate-100/80
                                                                px-6
                                                                py-4
                                                                bg-gradient-to-r
                                                                from-white
                                                                via-slate-50/30
                                                                to-white"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setNotificationOpen(
                                                                            false
                                                                        );

                                                                        router.push(
                                                                            "/dashboard/notifications"
                                                                        );
                                                                    }}
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
                                                                    active:scale-98
                                                                    group"
                                                                >
                                                                    {language ===
                                                                    "fa"
                                                                        ? "مشاهده همه اعلان‌ها"
                                                                        : "View all notifications"}

                                                                    {isRTL ? (
                                                                        <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-200 group-hover:-translate-x-1" />
                                                                    ) : (
                                                                        <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* =================================================
                                            USER PROFILE DROPDOWN
                                        ================================================= */}

                                        <div
                                            ref={profileRef}
                                            className="
                                            relative"
                                        >
                                            <button
                                                onClick={() => {
                                                    setNotificationOpen(
                                                        false
                                                    );

                                                    setProfileOpen(
                                                        (previous) =>
                                                            !previous
                                                    );
                                                }}
                                                className="
                                                flex
                                                items-center
                                                gap-2
                                                rounded-full
                                                p-1
                                                transition-all
                                                duration-300
                                                hover:bg-slate-100"
                                                aria-label="Open profile menu"
                                            >
                                                <div
                                                    style={{
                                                        position:
                                                            "relative",
                                                        width:
                                                            "44px",
                                                        height:
                                                            "44px",
                                                        minWidth:
                                                            "44px",
                                                        borderRadius:
                                                            "50%",
                                                        overflow:
                                                            "hidden",
                                                        backgroundColor:
                                                            "#183B73",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        color:
                                                            "#ffffff",
                                                        fontWeight:
                                                            700,
                                                        fontSize:
                                                            "16px",
                                                        boxShadow:
                                                            "0 2px 8px rgba(24, 59, 115, 0.25)",
                                                    }}
                                                >
                                                    {profilePhotoUrl ? (
                                                        <img
                                                            src={
                                                                profilePhotoUrl
                                                            }
                                                            alt={
                                                                user?.name ||
                                                                "Profile"
                                                            }
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                inset: 0,
                                                                width:
                                                                    "100%",
                                                                height:
                                                                    "100%",
                                                                objectFit:
                                                                    "cover",
                                                                borderRadius:
                                                                    "50%",
                                                                display:
                                                                    "block",
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>
                                                            {user?.name
                                                                ?.charAt(
                                                                    0
                                                                )
                                                                .toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>

                                                <ChevronDown
                                                    className={`
                                                    h-4
                                                    w-4
                                                    text-slate-600
                                                    transition-transform
                                                    duration-300
                                                    ${
                                                        profileOpen
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {profileOpen && (
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
                                                            duration: 0.2,
                                                        }}
                                                        className={`
                                                        absolute
                                                        top-[calc(100%+12px)]
                                                        z-[70]
                                                        w-80
                                                        max-w-[calc(100vw-2rem)]
                                                        overflow-hidden
                                                        rounded-3xl
                                                        border
                                                        border-white/40
                                                        bg-white/90
                                                        shadow-[0_25px_80px_rgba(15,23,42,.18)]
                                                        backdrop-blur-2xl
                                                        ${
                                                            isRTL
                                                                ? "left-0"
                                                                : "right-0"
                                                        }`}
                                                    >
                                                        <div
                                                            className="
                                                            p-6"
                                                        >
                                                            <div
                                                                className="
                                                                flex
                                                                flex-col
                                                                items-center"
                                                            >
                                                                <div
                                                                    className="
                                                                    relative"
                                                                >
                                                                    <div
                                                                        style={{
                                                                            position:
                                                                                "relative",
                                                                            width:
                                                                                "80px",
                                                                            height:
                                                                                "80px",
                                                                            borderRadius:
                                                                                "50%",
                                                                            overflow:
                                                                                "hidden",
                                                                            background:
                                                                                "linear-gradient(135deg, #183B73, #46A6D9)",
                                                                            display:
                                                                                "flex",
                                                                            alignItems:
                                                                                "center",
                                                                            justifyContent:
                                                                                "center",
                                                                            color:
                                                                                "#ffffff",
                                                                            fontSize:
                                                                                "30px",
                                                                            fontWeight:
                                                                                700,
                                                                            boxShadow:
                                                                                "0 0 0 4px rgba(70, 166, 217, 0.20)",
                                                                        }}
                                                                    >
                                                                        {profilePhotoUrl ? (
                                                                            <img
                                                                                src={
                                                                                    profilePhotoUrl
                                                                                }
                                                                                alt={
                                                                                    user?.name ||
                                                                                    "Profile"
                                                                                }
                                                                                style={{
                                                                                    position:
                                                                                        "absolute",
                                                                                    inset: 0,
                                                                                    width:
                                                                                        "100%",
                                                                                    height:
                                                                                        "100%",
                                                                                    objectFit:
                                                                                        "cover",
                                                                                    borderRadius:
                                                                                        "50%",
                                                                                    display:
                                                                                        "block",
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <span>
                                                                                {user?.name
                                                                                    ?.charAt(
                                                                                        0
                                                                                    )
                                                                                    .toUpperCase()}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <h3
                                                                    className="
                                                                    text-lg
                                                                    font-bold
                                                                    text-[#183B73]"
                                                                >
                                                                    {
                                                                        user?.name
                                                                    }
                                                                </h3>

                                                                <p
                                                                    className="
                                                                    mt-1
                                                                    text-sm
                                                                    text-slate-500"
                                                                >
                                                                    {
                                                                        user?.email
                                                                    }
                                                                </p>

                                                                <span
                                                                    className="
                                                                    mt-3
                                                                    rounded-full
                                                                    bg-[#183B73]/10
                                                                    px-4
                                                                    py-1
                                                                    text-xs
                                                                    font-semibold
                                                                    text-[#183B73]"
                                                                >
                                                                    {
                                                                        user?.role
                                                                    }
                                                                </span>

                                                                <p
                                                                    className="
                                                                    mt-4
                                                                    text-center
                                                                    text-sm
                                                                    leading-6
                                                                    text-slate-500"
                                                                >
                                                                    {
                                                                        t
                                                                            .auth
                                                                            .welcomeBack
                                                                    }
                                                                </p>
                                                            </div>

                                                            <hr
                                                                className="
                                                                my-5"
                                                            />

                                                            <div
                                                                className="
                                                                space-y-2"
                                                            >
                                                                {/* Account */}

                                                                {[
                                                                    {
                                                                        icon: LayoutDashboard,
                                                                        label: t.auth.dashboard,
                                                                        href: "/dashboard",
                                                                    },
                                                                    {
                                                                        icon: User,
                                                                        label: t.auth.profile,
                                                                        href: "/dashboard/profile",
                                                                    },
                                                                    {
                                                                        icon: MessageCircle,
                                                                        label: t.common.messages,
                                                                        href: "/dashboard/messages",
                                                                    },
                                                                ].map(
                                                                    (
                                                                        item
                                                                    ) => {
                                                                        const Icon =
                                                                            item.icon;

                                                                        const isActive =
                                                                            pathname ===
                                                                            item.href;

                                                                        return (
                                                                            <Link
                                                                                key={
                                                                                    item.href
                                                                                }
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                onClick={() =>
                                                                                    setProfileOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                                className={`
                                                                                flex
                                                                                items-center
                                                                                gap-4
                                                                                rounded-2xl
                                                                                px-4
                                                                                py-3
                                                                                transition-all
                                                                                duration-300
                                                                                ${
                                                                                    isActive
                                                                                        ? "bg-[#183B73] text-white shadow-lg"
                                                                                        : "hover:bg-slate-100"
                                                                                }`}
                                                                            >
                                                                                <Icon
                                                                                    className={`
                                                                                    h-5
                                                                                    w-5
                                                                                    ${
                                                                                        isActive
                                                                                            ? "text-white"
                                                                                            : "text-[#183B73]"
                                                                                    }`}
                                                                                />

                                                                                <span className="font-medium">
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </span>
                                                                            </Link>
                                                                        );
                                                                    }
                                                                )}

                                                                <div
                                                                    className="
                                                                    my-3
                                                                    border-t
                                                                    border-slate-200"
                                                                />

                                                                {/* Preferences */}

                                                                {[
                                                                    {
                                                                        icon: Bell,
                                                                        label: t.auth.notifications,
                                                                        href: "/dashboard/notifications",
                                                                    },

                                                                    ...(user?.role ===
                                                                    "admin"
                                                                        ? [
                                                                            {
                                                                                icon: Settings,
                                                                                label: t.auth.settings,
                                                                                href: "/dashboard/settings",
                                                                            },
                                                                        ]
                                                                        : []),
                                                                ].map(
                                                                    (
                                                                        item
                                                                    ) => {
                                                                        const Icon =
                                                                            item.icon;

                                                                        const isActive =
                                                                            pathname ===
                                                                            item.href;

                                                                        return (
                                                                            <Link
                                                                                key={
                                                                                    item.href
                                                                                }
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                onClick={() =>
                                                                                    setProfileOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                                className={`
                                                                                flex
                                                                                items-center
                                                                                gap-4
                                                                                rounded-2xl
                                                                                px-4
                                                                                py-3
                                                                                transition-all
                                                                                duration-300
                                                                                ${
                                                                                    isActive
                                                                                        ? "bg-[#183B73] text-white shadow-lg"
                                                                                        : "hover:bg-slate-100"
                                                                                }`}
                                                                            >
                                                                                <Icon
                                                                                    className={`
                                                                                    h-5
                                                                                    w-5
                                                                                    ${
                                                                                        isActive
                                                                                            ? "text-white"
                                                                                            : "text-[#183B73]"
                                                                                    }`}
                                                                                />

                                                                                <span className="font-medium">
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </span>
                                                                            </Link>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>

                                                            <hr
                                                                className="
                                                                my-5"
                                                            />

                                                            <button
                                                                onClick={
                                                                    handleLogout
                                                                }
                                                                disabled={
                                                                    loggingOut
                                                                }
                                                                className="
                                                                flex
                                                                w-full
                                                                items-center
                                                                gap-4
                                                                rounded-2xl
                                                                px-4
                                                                py-3
                                                                text-red-600
                                                                transition-all
                                                                duration-300
                                                                hover:bg-red-50
                                                                disabled:cursor-not-allowed
                                                                disabled:opacity-60"
                                                            >
                                                                <LogOut className="h-5 w-5" />

                                                                {loggingOut
                                                                    ? t
                                                                          .auth
                                                                          .loggingOut
                                                                    : t
                                                                          .auth
                                                                          .logout}
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* =================================================
                                MOBILE MENU BUTTON
                            ================================================= */}

                            <motion.button
                                onClick={() =>
                                    setMobileOpen(
                                        !mobileOpen
                                    )
                                }
                                className="
                                flex-shrink-0
                                lg:hidden"
                                animate={{
                                    rotate: mobileOpen
                                        ? 180
                                        : 0,
                                }}
                            >
                                {mobileOpen ? (
                                    <X />
                                ) : (
                                    <Menu />
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </Container>

                {/* ========================================================
                    MOBILE MENU
                ======================================================== */}

                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -30,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="
                            mx-4
                            mt-4
                            rounded-3xl
                            bg-white
                            p-6
                            shadow-2xl
                            lg:hidden"
                        >
                            <nav
                                className="
                                flex
                                flex-col
                                gap-5"
                            >
                                {navigation.map(
                                    (item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <Link
                                                key={
                                                    item.href
                                                }
                                                href={
                                                    item.href
                                                }
                                                onClick={() =>
                                                    setMobileOpen(
                                                        false
                                                    )
                                                }
                                                className="
                                                flex
                                                items-center
                                                gap-3
                                                font-medium
                                                text-slate-700
                                                transition-colors
                                                hover:text-[#183B73]"
                                            >
                                                <Icon className="h-5 w-5" />

                                                {
                                                    item.title
                                                }
                                            </Link>
                                        );
                                    }
                                )}

                                <hr className="my-2" />

                                {loading ? (
                                    <div
                                        className="
                                        space-y-2"
                                    >
                                        <div
                                            className="
                                            h-[46px]
                                            w-full
                                            animate-pulse
                                            rounded-full
                                            bg-slate-200"
                                        />

                                        <div
                                            className="
                                            h-[46px]
                                            w-full
                                            animate-pulse
                                            rounded-full
                                            bg-slate-200"
                                        />
                                    </div>
                                ) : !user ? (
                                    <>
                                        <Button
                                            href="/auth/login"
                                            className="
                                            flex
                                            h-[46px]
                                            w-full
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:bg-[#D9ECFF]"
                                        >
                                            <User className="h-3.5 w-3.5 text-[#183B73]" />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .login
                                                }
                                            </span>
                                        </Button>

                                        <Button
                                            href="/auth/register"
                                            className="
                                            flex
                                            h-[46px]
                                            w-full
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:bg-[#D9ECFF]"
                                        >
                                            <UserPlus className="h-3.5 w-3.5 text-[#183B73]" />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .signup
                                                }
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {/* Mobile Messages */}

                                        <Button
                                            href="/dashboard/messages"
                                            className="
                                            flex
                                            h-[46px]
                                            w-full
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-0.5
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-1.5
                                            text-[#183B73]
                                            shadow-md
                                            transition-all
                                            duration-300
                                            hover:bg-[#D9ECFF]"
                                        >
                                            <MessageCircle className="h-3.5 w-3.5 text-[#183B73]" />

                                            <span
                                                className="
                                                text-[9px]
                                                font-medium
                                                leading-none
                                                text-[#183B73]"
                                            >
                                                {
                                                    t
                                                        .common
                                                        .messages
                                                }
                                            </span>
                                        </Button>

                                        {/* Mobile Notifications */}

                                        <button
                                            onClick={() => {
                                                setMobileOpen(
                                                    false
                                                );

                                                router.push(
                                                    "/dashboard/notifications"
                                                );
                                            }}
                                            className="
                                            relative
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-full
                                            bg-[#EAF4FF]
                                            px-4
                                            py-3
                                            font-medium
                                            text-[#183B73]"
                                        >
                                            <Bell className="h-4 w-4" />

                                            {
                                                t.auth
                                                    .notifications
                                            }

                                            {unreadNotificationCount >
                                                0 && (
                                                <span
                                                    className="
                                                    flex
                                                    min-h-[20px]
                                                    min-w-[20px]
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-red-500
                                                    px-1
                                                    text-[10px]
                                                    font-bold
                                                    text-white"
                                                >
                                                    {unreadNotificationCount >
                                                    99
                                                        ? "99+"
                                                        : unreadNotificationCount}
                                                </span>
                                            )}
                                        </button>

                                        {/* Dashboard */}

                                        <Button
                                            href="/dashboard"
                                            variant="outline"
                                            fullWidth
                                            className="
                                            h-[46px]
                                            rounded-full"
                                        >
                                            <LayoutDashboard className="mr-2 h-4 w-4" />

                                            {
                                                t.auth
                                                    .dashboard
                                            }
                                        </Button>

                                        {/* Logout */}

                                        <button
                                            onClick={
                                                handleLogout
                                            }
                                            disabled={
                                                loggingOut
                                            }
                                            className="
                                            flex
                                            w-full
                                            items-center
                                            justify-center
                                            gap-3
                                            rounded-full
                                            px-4
                                            py-3
                                            text-red-600
                                            transition-all
                                            duration-300
                                            hover:bg-red-50
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60"
                                        >
                                            <LogOut className="h-4 w-4" />

                                            {loggingOut
                                                ? t.auth
                                                      .loggingOut
                                                : t.auth
                                                      .logout}
                                        </button>
                                    </>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}