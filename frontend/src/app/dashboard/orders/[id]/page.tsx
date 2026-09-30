"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    ArrowLeft,
    CalendarDays,
    CreditCard,
    FileText,
    Package,
    Upload,
    User,
    Briefcase,
    Trash2,
    MessageCircle,
    Eye,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Settings,
} from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/language-context";

import {
    getOrder,
    uploadOrderFile,
    deleteOrderFile,
    updateAdminOrderStatus,
    updateAdminPaymentStatus,
} from "@/services/orders";

import {
    createAdminConversation,
    sendMessage,
} from "@/services/conversation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import type { Order } from "@/types/order";

/*
|--------------------------------------------------------------------------
| Status Colors with distinct colors
|--------------------------------------------------------------------------
*/

const statusColors = {
    pending: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" },
    in_progress: { bg: "#cffafe", text: "#0e7490", border: "#22d3ee" },
    completed: { bg: "#d1fae5", text: "#065f46", border: "#34d399" },
    delivered: { bg: "#dbeafe", text: "#1e40af", border: "#60a5fa" },
    cancelled: { bg: "#fecaca", text: "#991b1b", border: "#f87171" },
};

const statusIcons = {
    pending: Clock,
    in_progress: AlertCircle,
    completed: CheckCircle,
    delivered: CheckCircle,
    cancelled: XCircle,
};

const paymentColors = {
    pending: { bg: "#fed7aa", text: "#9a3412", border: "#fb923c" },
    paid: { bg: "#d1fae5", text: "#065f46", border: "#34d399" },
    refunded: { bg: "#fecaca", text: "#991b1b", border: "#f87171" },
};

const paymentIcons = {
    pending: Clock,
    paid: CheckCircle,
    refunded: XCircle,
};

/*
|--------------------------------------------------------------------------
| Helper: Format Date
|--------------------------------------------------------------------------
*/

function formatDate(dateString: string, language: string): string {
    const date = new Date(dateString);
    
    if (language === 'fa' || language === 'fa-IR') {
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } else {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    }
}

/*
|--------------------------------------------------------------------------
| Helper: Get Status Label
|--------------------------------------------------------------------------
*/

function getStatusLabel(status: string, language: string): string {
    const labels: Record<string, { fa: string; en: string }> = {
        pending: { fa: "در انتظار", en: "Pending" },
        in_progress: { fa: "در حال انجام", en: "In Progress" },
        completed: { fa: "تکمیل شده", en: "Completed" },
        delivered: { fa: "تحویل داده شده", en: "Delivered" },
        cancelled: { fa: "لغو شده", en: "Cancelled" },
    };
    
    const isPersian = language === 'fa' || language === 'fa-IR';
    return labels[status]?.[isPersian ? 'fa' : 'en'] || status;
}

function getPaymentLabel(status: string, language: string): string {
    const labels: Record<string, { fa: string; en: string }> = {
        pending: { fa: "در انتظار", en: "Pending" },
        paid: { fa: "پرداخت شده", en: "Paid" },
        refunded: { fa: "بازپرداخت شده", en: "Refunded" },
    };
    
    const isPersian = language === 'fa' || language === 'fa-IR';
    return labels[status]?.[isPersian ? 'fa' : 'en'] || status;
}

/*
|--------------------------------------------------------------------------
| Helper: Get Service/Product Display Name with fallback
|--------------------------------------------------------------------------
*/

function getDisplayName(item: any, language: string, defaultName: string = "-"): string {
    if (!item) return defaultName;
    
    const isPersian = language === 'fa' || language === 'fa-IR';
    
    // If the item has language-specific properties
    if (isPersian) {
        // Try to get Persian name
        if (item.name_fa) return item.name_fa;
        if (item.title_fa) return item.title_fa;
        if (item.fa_name) return item.fa_name;
        if (item.fa_title) return item.fa_title;
    } else {
        // Try to get English name
        if (item.name_en) return item.name_en;
        if (item.title_en) return item.title_en;
        if (item.en_name) return item.en_name;
        if (item.en_title) return item.en_title;
    }
    
    // Fallback to default name
    return item.name || item.title || defaultName;
}

/*
|--------------------------------------------------------------------------
| Info Card
|--------------------------------------------------------------------------
*/

function InfoCard({
    icon,
    label,
    value,
    isRTL,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    isRTL?: boolean;
}) {
    return (
        <div style={{
            borderRadius: "1rem",
            border: "1px solid rgba(226, 232, 240, 0.6)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexDirection: isRTL ? "row-reverse" : "row",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.8)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.6)";
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "3rem",
                height: "3rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                color: "#0284c7",
                flexShrink: 0,
                transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(2, 132, 199, 0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
            }}>
                {icon}
            </div>

            <div style={{
                minWidth: 0,
                flex: 1,
                textAlign: isRTL ? "right" : "left",
            }}>
                <p style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#94a3b8",
                }}>
                    {label}
                </p>

                <div style={{
                    marginTop: "0.25rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#1e293b",
                }}>
                    {value ?? "-"}
                </div>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({
    status,
    type = "status",
    language,
}: {
    status: string;
    type?: "status" | "payment";
    language: string;
}) {
    const colors = type === "status" ? statusColors : paymentColors;
    const icons = type === "status" ? statusIcons : paymentIcons;
    const Icon = icons[status as keyof typeof icons] || CheckCircle;
    const color = colors[status as keyof typeof colors] || { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };
    
    const label = type === "status" 
        ? getStatusLabel(status, language)
        : getPaymentLabel(status, language);

    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            borderRadius: "9999px",
            border: `1px solid ${color.border}`,
            padding: "0.375rem 0.875rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            backgroundColor: color.bg,
            color: color.text,
        }}>
            <Icon style={{ width: "0.875rem", height: "0.875rem" }} />
            <span>{label}</span>
        </span>
    );
}

/*
|--------------------------------------------------------------------------
| Order Detail Page
|--------------------------------------------------------------------------
*/

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();

    const { user } = useAuth();
    // FIX: Only destructure 't' and 'language' - calculate isRTL manually
    const { t, language } = useLanguage();
    
    // FIX: Determine RTL based on language
    const isRTL = language === "fa";
    const isPersian = isRTL;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [deletingFile, setDeletingFile] =
        useState<number | null>(null);
    const [selectedStatus, setSelectedStatus] =
        useState("");
    const [selectedPaymentStatus, setSelectedPaymentStatus] =
        useState("");
    const [savingChanges, setSavingChanges] =
        useState(false);
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [messageBody, setMessageBody] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);

    const orderId = Number(params.id);

    /*
    |--------------------------------------------------------------------------
    | Direction
    |--------------------------------------------------------------------------
    */

    const direction = isRTL ? "rtl" : "ltr";

    /*
    |--------------------------------------------------------------------------
    | Role
    |--------------------------------------------------------------------------
    */

    const role = user?.role;

    const isCustomer = role === "customer";
    const isAdmin = role === "admin";
    const isContentManager =
        role === "content_manager";

    /*
    |--------------------------------------------------------------------------
    | Load Order
    |--------------------------------------------------------------------------
    */

    async function loadOrder() {
        if (!user || !orderId || !role) {
            return;
        }

        try {
            setLoading(true);
            setError(false);

            const data = await getOrder(
                orderId,
                role
            );

            setOrder(data);
            setSelectedStatus(data.status);
            setSelectedPaymentStatus(
                data.payment_status
            );
        } catch (err) {
            console.error(
                "Failed to load order:",
                err
            );

            setOrder(null);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user || !role) return;

        loadOrder();
    }, [user, role, orderId]);

    /*
    |--------------------------------------------------------------------------
    | Upload File
    |--------------------------------------------------------------------------
    */

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file || !order) {
            return;
        }

        try {
            setUploading(true);

            await uploadOrderFile(
                order.id,
                file
            );

            await loadOrder();
        } catch (err) {
            console.error(
                "Failed to upload file:",
                err
            );
        } finally {
            setUploading(false);

            event.target.value = "";
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete File
    |--------------------------------------------------------------------------
    */

    async function handleDeleteFile(
        fileId: number
    ) {
        if (!order) return;

        const confirmed = window.confirm(
            isPersian
                ? "آیا مطمئن هستید که می‌خواهید این فایل را حذف کنید؟"
                : "Are you sure you want to delete this file?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingFile(fileId);

            await deleteOrderFile(fileId);

            await loadOrder();
        } catch (err) {
            console.error(
                "Failed to delete file:",
                err
            );
        } finally {
            setDeletingFile(null);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Admin — Save Changes
    |--------------------------------------------------------------------------
    */

    async function handleSaveChanges() {
        if (!order || !isAdmin) return;

        try {
            setSavingChanges(true);

            if (selectedStatus !== order.status) {
                await updateAdminOrderStatus(
                    order.id,
                    selectedStatus
                );
            }

            if (
                selectedPaymentStatus !==
                order.payment_status
            ) {
                await updateAdminPaymentStatus(
                    order.id,
                    selectedPaymentStatus
                );
            }

            const refreshedOrder = await getOrder(
                order.id,
                role
            );

            setOrder(refreshedOrder);

            setSelectedStatus(
                refreshedOrder.status
            );

            setSelectedPaymentStatus(
                refreshedOrder.payment_status
            );

        } catch (err) {
            console.error(
                "Failed to save order changes:",
                err
            );
        } finally {
            setSavingChanges(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Admin — Send Message to Customer
    |--------------------------------------------------------------------------
    */

    async function handleSendOrderMessage() {
        if (
            !isAdmin ||
            !order?.customer?.id ||
            !messageBody.trim()
        ) {
            return;
        }

        try {
            setSendingMessage(true);

            let conversationId =
                order.conversation_id;

            if (!conversationId) {
                const conversation =
                    await createAdminConversation({
                        customer_id:
                            order.customer.id,
                        subject: `Order #${order.order_number}`,
                    });

                conversationId =
                    conversation?.id;

                if (!conversationId) {
                    throw new Error(
                        "Failed to create conversation."
                    );
                }
            }

            await sendMessage({
                conversation_id: conversationId,
                body: messageBody.trim(),
            });

            setMessageBody("");
            setMessageModalOpen(false);

            router.push(
                `/dashboard/messages?conversation_id=${conversationId}`
            );
        } catch (error) {
            console.error(
                "Failed to send order message:",
                error
            );
        } finally {
            setSendingMessage(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <>
                <Header />
                <AuthGuard
                    allowedRoles={[
                        "admin",
                        "content_manager",
                        "customer",
                    ]}
                >
                    <DashboardShell
                        title={
                            t.dashboard.orders.title
                        }
                        description={
                            t.dashboard.orders.description
                        }
                    >
                        <div style={{
                            borderRadius: "1.5rem",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "4rem",
                            textAlign: "center",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06)",
                            backdropFilter: "blur(8px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}>
                            <div style={{
                                width: "3.5rem",
                                height: "3.5rem",
                                borderRadius: "9999px",
                                border: "4px solid #bae6fd",
                                borderTopColor: "#0284c7",
                                animation: "spin 1s linear infinite",
                            }} />

                            <p style={{
                                color: "#64748b",
                            }}>
                                {t.common.loading}
                            </p>
                        </div>
                    </DashboardShell>
                </AuthGuard>
                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error || !order) {
        return (
            <>
                <Header />
                <AuthGuard
                    allowedRoles={[
                        "admin",
                        "content_manager",
                        "customer",
                    ]}
                >
                    <DashboardShell
                        title={
                            t.dashboard.orders.title
                        }
                        description={
                            t.dashboard.orders.description
                        }
                    >
                        <div style={{
                            borderRadius: "1.5rem",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "4rem",
                            textAlign: "center",
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06)",
                            backdropFilter: "blur(8px)",
                        }}>
                            <div style={{
                                margin: "0 auto 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "5rem",
                                height: "5rem",
                                borderRadius: "9999px",
                                backgroundColor: "#fef2f2",
                            }}>
                                <XCircle style={{
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    color: "#f43f5e",
                                }} />
                            </div>
                            
                            <h2 style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "#0f172a",
                            }}>
                                {isPersian
                                    ? "سفارش پیدا نشد"
                                    : "Order not found"}
                            </h2>

                            <p style={{
                                marginTop: "0.75rem",
                                color: "#64748b",
                            }}>
                                {isPersian
                                    ? "این سفارش وجود ندارد یا شما اجازه دسترسی به آن را ندارید."
                                    : "This order does not exist or you do not have permission to access it."}
                            </p>

                            <button
                                onClick={() =>
                                    router.push(
                                        "/dashboard/orders"
                                    )
                                }
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginTop: "2rem",
                                    padding: "0.875rem 1.5rem",
                                    borderRadius: "1rem",
                                    background: "linear-gradient(135deg, #0ea5e9, #4f46e5)",
                                    color: "#ffffff",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.25)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(14, 165, 233, 0.35)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(14, 165, 233, 0.25)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                }}
                            >
                                <ArrowLeft style={{
                                    width: "1rem",
                                    height: "1rem",
                                    transform: isRTL ? "rotate(180deg)" : "none",
                                }} />
                                {isPersian
                                    ? "بازگشت به سفارش‌ها"
                                    : "Back to Orders"}
                            </button>
                        </div>
                    </DashboardShell>
                </AuthGuard>
                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Get display names for service and package with language support
    |--------------------------------------------------------------------------
    */

    const serviceDisplayName = getDisplayName(order.service, language, "-");
    const packageDisplayName = getDisplayName(order.package, language, "-");

    /*
    |--------------------------------------------------------------------------
    | Page
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Header />
            <AuthGuard
                allowedRoles={[
                    "admin",
                    "content_manager",
                    "customer",
                ]}
            >
                <div
                    dir={direction}
                    style={{
                        minHeight: "100vh",
                    }}
                >
                    <DashboardShell
                        title={
                            order.title ||
                            t.dashboard.orders.title
                        }
                        description={
                            order.order_number
                        }
                    >
                        <div style={{
                            paddingLeft: "1rem",
                            paddingRight: "1rem",
                        }}>

                            {/* Back Button */}
                            <button
                                onClick={() =>
                                    router.push(
                                        "/dashboard/orders"
                                    )
                                }
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginBottom: "1.5rem",
                                    padding: "0.625rem 1.25rem",
                                    borderRadius: "1rem",
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    color: "#334155",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
                                    backdropFilter: "blur(8px)",
                                    transition: "all 0.2s ease",
                                    flexDirection: isRTL ? "row-reverse" : "row",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                                    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.06)";
                                }}
                            >
                                <ArrowLeft style={{
                                    width: "1rem",
                                    height: "1rem",
                                    transform: isRTL ? "rotate(180deg)" : "none",
                                }} />
                                {isPersian
                                    ? "بازگشت به سفارش‌ها"
                                    : "Back to Orders"}
                            </button>

                            {/* Header Card */}
                            <div style={{
                                borderRadius: "1.5rem",
                                padding: "2rem",
                                marginBottom: "1.5rem",
                                background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(241, 245, 249, 0.9))",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(226, 232, 240, 0.5)",
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.5rem",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: isRTL ? "row-reverse" : "row",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                        <div style={{
                                            flex: 1,
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                alignItems: "center",
                                                gap: "1rem",
                                                justifyContent: isRTL ? "flex-end" : "flex-start",
                                            }}>
                                                <h1 style={{
                                                    fontSize: "1.875rem",
                                                    fontWeight: 700,
                                                    color: "#0f172a",
                                                }}>
                                                    {order.title ||
                                                        (isPersian
                                                            ? "بدون عنوان"
                                                            : "Untitled Order")}
                                                </h1>

                                                <StatusBadge 
                                                    status={order.status} 
                                                    type="status"
                                                    language={language}
                                                />
                                            </div>

                                            <p style={{
                                                marginTop: "0.75rem",
                                                fontFamily: "monospace",
                                                fontSize: "0.875rem",
                                                color: "#94a3b8",
                                                textAlign: isRTL ? "right" : "left",
                                            }}>
                                                #{order.order_number}
                                            </p>
                                        </div>

                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                        }}>
                                            <StatusBadge 
                                                status={order.payment_status} 
                                                type="payment"
                                                language={language}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Information Cards */}
                            <div style={{
                                display: "grid",
                                gap: "1rem",
                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            }}>
                                <InfoCard
                                    icon={<Briefcase style={{ width: "1.25rem", height: "1.25rem" }} />}
                                    label={isPersian ? "خدمات" : "Service"}
                                    value={serviceDisplayName}
                                    isRTL={isRTL}
                                />

                                <InfoCard
                                    icon={<Package style={{ width: "1.25rem", height: "1.25rem" }} />}
                                    label={isPersian ? "پکیج" : "Package"}
                                    value={packageDisplayName}
                                    isRTL={isRTL}
                                />

                                <InfoCard
                                    icon={<CreditCard style={{ width: "1.25rem", height: "1.25rem" }} />}
                                    label={isPersian ? "بودجه" : "Budget"}
                                    value={order.budget !== null ? `$${order.budget}` : "-"}
                                    isRTL={isRTL}
                                />

                                <InfoCard
                                    icon={<CalendarDays style={{ width: "1.25rem", height: "1.25rem" }} />}
                                    label={isPersian ? "مهلت" : "Deadline"}
                                    value={order.deadline || "-"}
                                    isRTL={isRTL}
                                />

                                <InfoCard
                                    icon={<CalendarDays style={{ width: "1.25rem", height: "1.25rem" }} />}
                                    label={isPersian ? "تاریخ ایجاد" : "Created"}
                                    value={formatDate(order.created_at, language)}
                                    isRTL={isRTL}
                                />

                                {isAdmin && order.customer && (
                                    <InfoCard
                                        icon={<User style={{ width: "1.25rem", height: "1.25rem" }} />}
                                        label={isPersian ? "مشتری" : "Customer"}
                                        value={
                                            <div>
                                                <p style={{
                                                    fontWeight: 600,
                                                    color: "#1e293b",
                                                }}>
                                                    {order.customer.name}
                                                </p>
                                                <p style={{
                                                    fontSize: "0.75rem",
                                                    fontWeight: 400,
                                                    color: "#94a3b8",
                                                }}>
                                                    {order.customer.email}
                                                </p>
                                            </div>
                                        }
                                        isRTL={isRTL}
                                    />
                                )}
                            </div>

                            {/* Description */}
                            <div style={{
                                borderRadius: "1.5rem",
                                padding: "2rem",
                                marginTop: "1.5rem",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(226, 232, 240, 0.5)",
                            }}>
                                <h2 style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    textAlign: isRTL ? "right" : "left",
                                }}>
                                    {isPersian ? "توضیحات" : "Description"}
                                </h2>

                                <div style={{
                                    marginTop: "1rem",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: "2rem",
                                    color: "#475569",
                                    textAlign: isRTL ? "right" : "left",
                                }}>
                                    {order.description ||
                                        (isPersian
                                            ? "توضیحی ارائه نشده است."
                                            : "No description provided.")}
                                </div>
                            </div>

                            {/* Files */}
                            <div style={{
                                borderRadius: "1.5rem",
                                padding: "2rem",
                                marginTop: "1.5rem",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.06)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(226, 232, 240, 0.5)",
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: isRTL ? "row-reverse" : "row",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                        <div>
                                            <h2 style={{
                                                fontSize: "1.125rem",
                                                fontWeight: 700,
                                                color: "#0f172a",
                                                textAlign: isRTL ? "right" : "left",
                                            }}>
                                                {isPersian ? "فایل‌ها" : "Files"}
                                            </h2>

                                            <p style={{
                                                marginTop: "0.25rem",
                                                fontSize: "0.875rem",
                                                color: "#94a3b8",
                                                textAlign: isRTL ? "right" : "left",
                                            }}>
                                                {isPersian
                                                    ? "فایل‌های مرتبط با این سفارش"
                                                    : "Files attached to this order"}
                                            </p>
                                        </div>

                                        {isCustomer && (
                                            <label style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "0.625rem",
                                                padding: "0.5rem 1rem",
                                                borderRadius: "0.75rem",
                                                background: "linear-gradient(135deg, #0284c7, #2563eb)",
                                                color: "#ffffff",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                border: "none",
                                                transition: "all 0.2s ease",
                                                boxShadow: "0 4px 12px rgba(2, 132, 199, 0.2)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "scale(1.05)";
                                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(2, 132, 199, 0.3)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "scale(1)";
                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(2, 132, 199, 0.2)";
                                            }}>
                                                <Upload style={{ width: "1rem", height: "1rem" }} />
                                                {uploading
                                                    ? isPersian
                                                        ? "در حال آپلود..."
                                                        : "Uploading..."
                                                    : isPersian
                                                        ? "آپلود فایل"
                                                        : "Upload File"}
                                                <input
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    disabled={uploading}
                                                    onChange={handleUpload}
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <div style={{
                                        marginTop: "1.5rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.75rem",
                                    }}>
                                        {order.files && order.files.length > 0 ? (
                                            order.files.map((file: any) => (
                                                <div
                                                    key={file.id}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "0.75rem",
                                                        padding: "1rem",
                                                        borderRadius: "1rem",
                                                        border: "1px solid rgba(226, 232, 240, 0.6)",
                                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                        transition: "all 0.2s ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.8)";
                                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.6)";
                                                        e.currentTarget.style.boxShadow = "none";
                                                    }}
                                                >
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: isRTL ? "row-reverse" : "row",
                                                        flexWrap: "wrap",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.75rem",
                                                            minWidth: 0,
                                                            flex: 1,
                                                        }}>
                                                            <div style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                width: "2.5rem",
                                                                height: "2.5rem",
                                                                borderRadius: "0.75rem",
                                                                backgroundColor: "#f0f9ff",
                                                                color: "#0284c7",
                                                                flexShrink: 0,
                                                            }}>
                                                                <FileText style={{ width: "1.25rem", height: "1.25rem" }} />
                                                            </div>

                                                            <div style={{
                                                                minWidth: 0,
                                                                flex: 1,
                                                            }}>
                                                                <p style={{
                                                                    fontWeight: 500,
                                                                    color: "#1e293b",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                    textAlign: isRTL ? "right" : "left",
                                                                }}>
                                                                    {file.file_name}
                                                                </p>

                                                                {file.file_size && (
                                                                    <p style={{
                                                                        fontSize: "0.75rem",
                                                                        color: "#94a3b8",
                                                                        textAlign: isRTL ? "right" : "left",
                                                                    }}>
                                                                        {file.file_size}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                            flexShrink: 0,
                                                        }}>
                                                            {file.file_url && (
                                                                <a
                                                                    href={file.file_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: "0.375rem",
                                                                        padding: "0.5rem 1rem",
                                                                        borderRadius: "0.75rem",
                                                                        backgroundColor: "#f0f9ff",
                                                                        color: "#0369a1",
                                                                        fontSize: "0.875rem",
                                                                        fontWeight: 500,
                                                                        textDecoration: "none",
                                                                        transition: "all 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.backgroundColor = "#e0f2fe";
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.backgroundColor = "#f0f9ff";
                                                                    }}
                                                                >
                                                                    <Eye style={{ width: "1rem", height: "1rem" }} />
                                                                    {isPersian ? "مشاهده" : "Open"}
                                                                </a>
                                                            )}

                                                            {isCustomer && (
                                                                <button
                                                                    onClick={() => handleDeleteFile(file.id)}
                                                                    disabled={deletingFile === file.id}
                                                                    style={{
                                                                        padding: "0.5rem",
                                                                        borderRadius: "0.75rem",
                                                                        backgroundColor: "#fef2f2",
                                                                        color: "#e11d48",
                                                                        border: "none",
                                                                        cursor: deletingFile === file.id ? "not-allowed" : "pointer",
                                                                        opacity: deletingFile === file.id ? 0.5 : 1,
                                                                        transition: "all 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        if (deletingFile !== file.id) {
                                                                            e.currentTarget.style.backgroundColor = "#fecdd3";
                                                                        }
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        if (deletingFile !== file.id) {
                                                                            e.currentTarget.style.backgroundColor = "#fef2f2";
                                                                        }
                                                                    }}
                                                                    title={isPersian ? "حذف" : "Delete"}
                                                                >
                                                                    <Trash2 style={{ width: "1rem", height: "1rem" }} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{
                                                borderRadius: "1rem",
                                                border: "2px dashed rgba(226, 232, 240, 0.6)",
                                                padding: "3rem",
                                                textAlign: "center",
                                            }}>
                                                <FileText style={{
                                                    margin: "0 auto",
                                                    width: "3rem",
                                                    height: "3rem",
                                                    color: "#cbd5e1",
                                                }} />

                                                <p style={{
                                                    marginTop: "1rem",
                                                    fontSize: "0.875rem",
                                                    color: "#94a3b8",
                                                }}>
                                                    {isPersian
                                                        ? "هنوز فایلی برای این سفارش وجود ندارد."
                                                        : "No files have been uploaded for this order yet."}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content Manager Support */}
                            {isContentManager && (
                                <div style={{
                                    borderRadius: "1.5rem",
                                    padding: "2rem",
                                    marginTop: "1.5rem",
                                    background: "linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(238, 242, 255, 0.8))",
                                    border: "1px solid rgba(191, 219, 254, 0.5)",
                                    backdropFilter: "blur(8px)",
                                }}>
                                    <h2 style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        fontSize: "1.125rem",
                                        fontWeight: 700,
                                        color: "#1e40af",
                                        flexDirection: isRTL ? "row-reverse" : "row",
                                    }}>
                                        <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                                        {isPersian
                                            ? "پشتیبانی سفارش"
                                            : "Order Support"}
                                    </h2>

                                    <p style={{
                                        marginTop: "0.75rem",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.75rem",
                                        color: "#1e3a8a",
                                        textAlign: isRTL ? "right" : "left",
                                    }}>
                                        {isPersian
                                            ? "دسترسی شما به این سفارش بر اساس سفارش‌های اختصاص داده شده از طریق سیستم گفتگو مدیریت می‌شود."
                                            : "Your access to this order is managed through orders assigned to you via the existing conversation system."}
                                    </p>
                                </div>
                            )}

                            {/* Admin Management */}
                            {isAdmin && (
                                <div style={{
                                    borderRadius: "1.5rem",
                                    padding: "2rem",
                                    marginTop: "1.5rem",
                                    background: "linear-gradient(135deg, rgba(238, 242, 255, 0.8), rgba(243, 232, 255, 0.8))",
                                    border: "1px solid rgba(199, 210, 254, 0.5)",
                                    backdropFilter: "blur(8px)",
                                }}>
                                    <div style={{
                                        marginBottom: "1.5rem",
                                    }}>
                                        <h2 style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            fontSize: "1.125rem",
                                            fontWeight: 700,
                                            color: "#3730a3",
                                            flexDirection: isRTL ? "row-reverse" : "row",
                                        }}>
                                            <Settings style={{ width: "1.25rem", height: "1.25rem" }} />
                                            {isPersian
                                                ? "مدیریت سفارش"
                                                : "Order Management"}
                                        </h2>

                                        <p style={{
                                            marginTop: "0.5rem",
                                            fontSize: "0.875rem",
                                            lineHeight: "1.5rem",
                                            color: "#4338ca",
                                            textAlign: isRTL ? "right" : "left",
                                        }}>
                                            {isPersian
                                                ? "وضعیت سفارش و پرداخت را مدیریت کنید."
                                                : "Manage order status and payment."}
                                        </p>
                                    </div>

                                    {/* Send Message Button */}
                                    <div style={{
                                        marginBottom: "1.5rem",
                                    }}>
                                        <button
                                            type="button"
                                            onClick={() => setMessageModalOpen(true)}
                                            disabled={!order?.customer}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "0.625rem",
                                                padding: "0.875rem 1.5rem",
                                                borderRadius: "1rem",
                                                background: order?.customer
                                                    ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                                                    : "#a5b4fc",
                                                color: "#ffffff",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                border: "none",
                                                cursor: order?.customer ? "pointer" : "not-allowed",
                                                opacity: order?.customer ? 1 : 0.6,
                                                boxShadow: order?.customer
                                                    ? "0 10px 25px -5px rgba(79, 70, 229, 0.25)"
                                                    : "none",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (order?.customer) {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(79, 70, 229, 0.35)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (order?.customer) {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(79, 70, 229, 0.25)";
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                if (order?.customer) {
                                                    e.currentTarget.style.transform = "scale(0.95)";
                                                }
                                            }}
                                            onMouseUp={(e) => {
                                                if (order?.customer) {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }
                                            }}
                                        >
                                            <MessageCircle style={{ width: "1.25rem", height: "1.25rem" }} />
                                            {isPersian
                                                ? "ارسال پیام به مشتری"
                                                : "Send Message to Customer"}
                                        </button>
                                    </div>

                                    {/* Message Modal */}
                                    {messageModalOpen && (
                                        <div
                                            style={{
                                                position: "fixed",
                                                inset: 0,
                                                zIndex: 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                                backdropFilter: "blur(4px)",
                                                padding: "1rem",
                                            }}
                                            onClick={() => {
                                                setMessageBody("");
                                                setMessageModalOpen(false);
                                            }}
                                        >
                                            <div
                                                style={{
                                                    maxWidth: "560px",
                                                    width: "100%",
                                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                    borderRadius: "1.5rem",
                                                    padding: "2rem",
                                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                                                    backdropFilter: "blur(8px)",
                                                    animation: "fadeIn 0.3s ease-out",
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "1.5rem",
                                                    flexDirection: isRTL ? "row-reverse" : "row",
                                                }}>
                                                    <h2 style={{
                                                        fontSize: "1.25rem",
                                                        fontWeight: 700,
                                                        color: "#0f172a",
                                                    }}>
                                                        {isPersian
                                                            ? "ارسال پیام به مشتری"
                                                            : "Send Message to Customer"}
                                                    </h2>

                                                    <button
                                                        onClick={() => {
                                                            setMessageBody("");
                                                            setMessageModalOpen(false);
                                                        }}
                                                        disabled={sendingMessage}
                                                        style={{
                                                            padding: "0.5rem",
                                                            borderRadius: "0.75rem",
                                                            backgroundColor: "transparent",
                                                            color: "#94a3b8",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s ease",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#f1f5f9";
                                                            e.currentTarget.style.color = "#475569";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "transparent";
                                                            e.currentTarget.style.color = "#94a3b8";
                                                        }}
                                                    >
                                                        <XCircle style={{ width: "1.5rem", height: "1.5rem" }} />
                                                    </button>
                                                </div>

                                                <div style={{
                                                    marginBottom: "1.5rem",
                                                    padding: "1rem",
                                                    borderRadius: "1rem",
                                                    backgroundColor: "#f8fafc",
                                                    fontSize: "0.875rem",
                                                    color: "#475569",
                                                }}>
                                                    {isPersian ? "ارسال به:" : "To:"}{" "}
                                                    <strong style={{ color: "#0f172a" }}>
                                                        {order?.customer?.name}
                                                    </strong>{" "}
                                                    ({order?.customer?.email})
                                                </div>

                                                <div>
                                                    <textarea
                                                        value={messageBody}
                                                        onChange={(e) => setMessageBody(e.target.value)}
                                                        placeholder={
                                                            isPersian
                                                                ? "پیام خود را وارد کنید..."
                                                                : "Type your message..."
                                                        }
                                                        rows={5}
                                                        disabled={sendingMessage}
                                                        style={{
                                                            width: "100%",
                                                            boxSizing: "border-box",
                                                            resize: "vertical",
                                                            borderRadius: "1rem",
                                                            border: "1px solid rgba(226, 232, 240, 0.6)",
                                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                            padding: "1rem",
                                                            fontSize: "0.875rem",
                                                            color: "#0f172a",
                                                            outline: "none",
                                                            transition: "all 0.2s ease",
                                                        }}
                                                        onFocus={(e) => {
                                                            e.currentTarget.style.borderColor = "#818cf8";
                                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                                                        }}
                                                        onBlur={(e) => {
                                                            e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.6)";
                                                            e.currentTarget.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                <div style={{
                                                    display: "flex",
                                                    gap: "0.75rem",
                                                    marginTop: "1.5rem",
                                                    flexDirection: isRTL ? "row-reverse" : "row",
                                                }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setMessageBody("");
                                                            setMessageModalOpen(false);
                                                        }}
                                                        disabled={sendingMessage}
                                                        style={{
                                                            flex: 1,
                                                            padding: "0.75rem 1.5rem",
                                                            borderRadius: "1rem",
                                                            backgroundColor: "#ffffff",
                                                            color: "#475569",
                                                            fontSize: "0.875rem",
                                                            fontWeight: 600,
                                                            border: "1px solid #e2e8f0",
                                                            cursor: "pointer",
                                                            transition: "all 0.2s ease",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#f8fafc";
                                                            e.currentTarget.style.borderColor = "#cbd5e1";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = "#ffffff";
                                                            e.currentTarget.style.borderColor = "#e2e8f0";
                                                        }}
                                                    >
                                                        {isPersian ? "لغو" : "Cancel"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={handleSendOrderMessage}
                                                        disabled={sendingMessage || !messageBody.trim()}
                                                        style={{
                                                            flex: 1,
                                                            padding: "0.75rem 1.5rem",
                                                            borderRadius: "1rem",
                                                            background: sendingMessage || !messageBody.trim()
                                                                ? "#94a3b8"
                                                                : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                                            color: "#ffffff",
                                                            fontSize: "0.875rem",
                                                            fontWeight: 600,
                                                            border: "none",
                                                            cursor: sendingMessage || !messageBody.trim()
                                                                ? "not-allowed"
                                                                : "pointer",
                                                            transition: "all 0.2s ease",
                                                            boxShadow: sendingMessage || !messageBody.trim()
                                                                ? "none"
                                                                : "0 4px 12px rgba(79, 70, 229, 0.2)",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (!sendingMessage && messageBody.trim()) {
                                                                e.currentTarget.style.transform = "scale(1.05)";
                                                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.3)";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (!sendingMessage && messageBody.trim()) {
                                                                e.currentTarget.style.transform = "scale(1)";
                                                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.2)";
                                                            }
                                                        }}
                                                    >
                                                        {sendingMessage
                                                            ? isPersian
                                                                ? "در حال ارسال..."
                                                                : "Sending..."
                                                            : isPersian
                                                                ? "ارسال پیام"
                                                                : "Send Message"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Status Management */}
                                    <div style={{
                                        display: "grid",
                                        gap: "1.5rem",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    }}>
                                        <div>
                                            <label style={{
                                                display: "block",
                                                marginBottom: "0.625rem",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#3730a3",
                                                textAlign: isRTL ? "right" : "left",
                                            }}>
                                                {isPersian ? "وضعیت سفارش" : "Order Status"}
                                            </label>

                                            <select
                                                value={selectedStatus}
                                                disabled={savingChanges}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.875rem 1.25rem",
                                                    borderRadius: "1rem",
                                                    border: "1px solid rgba(199, 210, 254, 0.6)",
                                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                    fontSize: "0.875rem",
                                                    color: "#0f172a",
                                                    outline: "none",
                                                    transition: "all 0.2s ease",
                                                    cursor: savingChanges ? "not-allowed" : "pointer",
                                                    opacity: savingChanges ? 0.6 : 1,
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#818cf8";
                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = "rgba(199, 210, 254, 0.6)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <option value="pending">
                                                    {isPersian ? "در انتظار" : "Pending"}
                                                </option>
                                                <option value="in_progress">
                                                    {isPersian ? "در حال انجام" : "In Progress"}
                                                </option>
                                                <option value="completed">
                                                    {isPersian ? "تکمیل شده" : "Completed"}
                                                </option>
                                                <option value="delivered">
                                                    {isPersian ? "تحویل داده شده" : "Delivered"}
                                                </option>
                                                <option value="cancelled">
                                                    {isPersian ? "لغو شده" : "Cancelled"}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{
                                                display: "block",
                                                marginBottom: "0.625rem",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#3730a3",
                                                textAlign: isRTL ? "right" : "left",
                                            }}>
                                                {isPersian ? "وضعیت پرداخت" : "Payment Status"}
                                            </label>

                                            <select
                                                value={selectedPaymentStatus}
                                                disabled={savingChanges}
                                                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                                                style={{
                                                    width: "100%",
                                                    padding: "0.875rem 1.25rem",
                                                    borderRadius: "1rem",
                                                    border: "1px solid rgba(199, 210, 254, 0.6)",
                                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                    fontSize: "0.875rem",
                                                    color: "#0f172a",
                                                    outline: "none",
                                                    transition: "all 0.2s ease",
                                                    cursor: savingChanges ? "not-allowed" : "pointer",
                                                    opacity: savingChanges ? 0.6 : 1,
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#818cf8";
                                                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = "rgba(199, 210, 254, 0.6)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <option value="pending">
                                                    {isPersian ? "در انتظار" : "Pending"}
                                                </option>
                                                <option value="paid">
                                                    {isPersian ? "پرداخت شده" : "Paid"}
                                                </option>
                                                <option value="refunded">
                                                    {isPersian ? "بازپرداخت شده" : "Refunded"}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                        marginTop: "2rem",
                                        paddingTop: "1.5rem",
                                        borderTop: "1px solid rgba(199, 210, 254, 0.5)",
                                        flexDirection: isRTL ? "row-reverse" : "row",
                                    }}>
                                        <button
                                            type="button"
                                            onClick={handleSaveChanges}
                                            disabled={
                                                savingChanges ||
                                                (selectedStatus === order.status &&
                                                    selectedPaymentStatus === order.payment_status)
                                            }
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "0.5rem",
                                                padding: "0.875rem 2rem",
                                                borderRadius: "1rem",
                                                background: savingChanges ||
                                                    (selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)
                                                    ? "#a5b4fc"
                                                    : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                                color: "#ffffff",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                border: "none",
                                                cursor: savingChanges ||
                                                    (selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)
                                                    ? "not-allowed"
                                                    : "pointer",
                                                boxShadow: savingChanges ||
                                                    (selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)
                                                    ? "none"
                                                    : "0 4px 12px rgba(79, 70, 229, 0.2)",
                                                transition: "all 0.3s ease",
                                                opacity: savingChanges ||
                                                    (selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)
                                                    ? 0.6
                                                    : 1,
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!savingChanges &&
                                                    !(selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)) {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.3)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!savingChanges &&
                                                    !(selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)) {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.2)";
                                                }
                                            }}
                                            onMouseDown={(e) => {
                                                if (!savingChanges &&
                                                    !(selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)) {
                                                    e.currentTarget.style.transform = "scale(0.95)";
                                                }
                                            }}
                                            onMouseUp={(e) => {
                                                if (!savingChanges &&
                                                    !(selectedStatus === order.status &&
                                                        selectedPaymentStatus === order.payment_status)) {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }
                                            }}
                                        >
                                            {savingChanges
                                                ? isPersian
                                                    ? "در حال ذخیره..."
                                                    : "Saving..."
                                                : isPersian
                                                    ? "ذخیره تغییرات"
                                                    : "Save Changes"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => router.push("/dashboard/orders")}
                                            disabled={savingChanges}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "0.875rem 2rem",
                                                borderRadius: "1rem",
                                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                color: "#475569",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                border: "1px solid #e2e8f0",
                                                cursor: savingChanges ? "not-allowed" : "pointer",
                                                transition: "all 0.2s ease",
                                                opacity: savingChanges ? 0.6 : 1,
                                                backdropFilter: "blur(8px)",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!savingChanges) {
                                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                                    e.currentTarget.style.borderColor = "#94a3b8";
                                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!savingChanges) {
                                                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }
                                            }}
                                        >
                                            {isPersian ? "لغو" : "Cancel"}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* CSS Animations */}
                        <style>{`
                            @keyframes spin {
                                from {
                                    transform: rotate(0deg);
                                }
                                to {
                                    transform: rotate(360deg);
                                }
                            }
                            
                            @keyframes fadeIn {
                                from {
                                    opacity: 0;
                                    transform: translateY(20px) scale(0.95);
                                }
                                to {
                                    opacity: 1;
                                    transform: translateY(0) scale(1);
                                }
                            }
                            
                            @keyframes slideIn {
                                from {
                                    transform: translateX(100%);
                                    opacity: 0;
                                }
                                to {
                                    transform: translateX(0);
                                    opacity: 1;
                                }
                            }
                        `}</style>
                    </DashboardShell>
                </div>
            </AuthGuard>
            <Footer />
        </>
    );
}