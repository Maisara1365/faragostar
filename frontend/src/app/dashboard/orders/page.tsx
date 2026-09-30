"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/language-context";

import {
    getCustomerOrders,
    getCustomerOrder,
    uploadOrderFile,
    deleteOrderFile,

    getAdminOrders,
    getAdminOrder,

    getContentManagerOrders,
    getContentManagerOrder,
} from "@/services/orders";

import CreateOrderModal from "@/components/dashboard/orders/CreateOrderModal";
import { DeleteOrderDialog } from "@/components/dashboard/orders/DeleteOrderDialog";

import type { Order } from "@/types/order";

/* new layout components */
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/*
|--------------------------------------------------------------------------
| Status Colors
|--------------------------------------------------------------------------
*/

const statusColors: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    reviewing: "bg-blue-50 text-blue-700 border-blue-200",
    accepted: "bg-indigo-50 text-indigo-700 border-indigo-200",
    in_progress: "bg-cyan-50 text-cyan-700 border-cyan-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    delivered: "bg-teal-50 text-teal-700 border-teal-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusIcons: Record<string, string> = {
    pending: "⏳",
    reviewing: "🔍",
    accepted: "✅",
    in_progress: "⚡",
    completed: "🎯",
    delivered: "📦",
    cancelled: "❌",
};

/*
|--------------------------------------------------------------------------
| Payment Colors
|--------------------------------------------------------------------------
*/

const paymentColors: Record<string, string> = {
    pending: "bg-orange-50 text-orange-700 border-orange-200",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    refunded: "bg-rose-50 text-rose-700 border-rose-200",
};

const paymentIcons: Record<string, string> = {
    pending: "💳",
    paid: "✅",
    refunded: "↩️",
};

/*
|--------------------------------------------------------------------------
| Helper: Format Date based on language
|--------------------------------------------------------------------------
*/

function formatDate(dateString: string, language: string): string {
    const date = new Date(dateString);
    
    // Check if the language is Persian (Farsi)
    if (language === 'fa' || language === 'fa-IR') {
        // Persian date formatting
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } else {
        // English date formatting
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    }
}

/*
|--------------------------------------------------------------------------
| Info Row
|--------------------------------------------------------------------------
*/

function InfoRow({
    label,
    value,
    isRTL,
}: {
    label: string;
    value: React.ReactNode;
    isRTL?: boolean;
}) {
    return (
        <div className={`flex justify-between border-b border-slate-100 py-4 last:border-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-medium text-slate-500">
                {label}
            </span>
            <span className={`max-w-[65%] text-sm text-slate-800 ${isRTL ? 'text-right' : 'text-right'}`}>
                {value ?? "-"}
            </span>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Orders Page
|--------------------------------------------------------------------------
*/

export default function OrdersPage() {
    const { user } = useAuth();
    // FIX: Only destructure 't' and 'language' - calculate isRTL manually
    const { t, language } = useLanguage();
    const router = useRouter();

    // FIX: Determine RTL based on language
    const isRTL = language === "fa";
    const dir = isRTL ? "rtl" : "ltr";

    /*
    |--------------------------------------------------------------------------
    | Role
    |--------------------------------------------------------------------------
    */

    const role = user?.role;

    const isCustomer = role === "customer";
    const isAdmin = role === "admin";
    const isContentManager = role === "content_manager";

    console.log("ORDER PAGE ROLE:", role);
    console.log("IS CUSTOMER:", isCustomer);
    console.log("CURRENT LANGUAGE:", language);
    /*
    |--------------------------------------------------------------------------
    | Orders
    |--------------------------------------------------------------------------
    */

    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Search / Filter
    |--------------------------------------------------------------------------
    */

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const ORDERS_PER_PAGE = 8;

    const [currentPage, setCurrentPage] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | Order Details
    |--------------------------------------------------------------------------
    */

    const [selectedOrder, setSelectedOrder] =
        useState<Order | null>(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [loadingDetails, setLoadingDetails] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Files
    |--------------------------------------------------------------------------
    */

    const [uploading, setUploading] =
        useState(false);

    const [deletingFile, setDeletingFile] =
        useState<number | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Customer Create / Edit
    |--------------------------------------------------------------------------
    */

    const [createOpen, setCreateOpen] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Customer Delete
    |--------------------------------------------------------------------------
    */

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [deletingOrder, setDeletingOrder] =
        useState<Order | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Fetch Orders
    |--------------------------------------------------------------------------
    */

    async function fetchOrders() {
        if (!user) {
            return;
        }

        try {
            setLoadingOrders(true);

            /*
            |--------------------------------------------------------------------------
            | CUSTOMER
            |--------------------------------------------------------------------------
            */

            if (isCustomer) {
                const data = await getCustomerOrders({
                    search,
                    status:
                        statusFilter === "all"
                            ? undefined
                            : statusFilter,
                    per_page: 10,
                });

                setOrders(
                    Array.isArray(data)
                        ? data
                        : []
                );

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | ADMIN
            |--------------------------------------------------------------------------
            */

            if (isAdmin) {
                const data = await getAdminOrders({
                    search,
                    status:
                        statusFilter === "all"
                            ? undefined
                            : statusFilter,
                    per_page: 10,
                });

                setOrders(
                    Array.isArray(data)
                        ? data
                        : []
                );

                return;
            }

            /*
            |--------------------------------------------------------------------------
            | CONTENT MANAGER
            |--------------------------------------------------------------------------
            */

            if (isContentManager) {
                const data = await getContentManagerOrders({
                    search,
                    status:
                        statusFilter === "all"
                            ? undefined
                            : statusFilter,
                    per_page: 10,
                });

                setOrders(
                    Array.isArray(data)
                        ? data
                        : []
                );

                return;
            }

            setOrders([]);

        } catch (error) {
            console.error(
                "Failed to load orders:",
                error
            );

            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Open Order Details
    |--------------------------------------------------------------------------
    */

    async function openOrderDetails(id: number) {
        try {
            setLoadingDetails(true);

            let order: Order;

            if (isCustomer) {
                order = await getCustomerOrder(id);
            } else if (isAdmin) {
                order = await getAdminOrder(id);
            } else if (isContentManager) {
                order = await getContentManagerOrder(id);
            } else {
                return;
            }

            setSelectedOrder(order);
            setDetailsOpen(true);

        } catch (error) {
            console.error(
                "Failed to load order:",
                error
            );
        } finally {
            setLoadingDetails(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Upload File
    |--------------------------------------------------------------------------
    |
    | Customer can upload files.
    |
    */

    async function handleUpload(file: File) {
        if (
            !selectedOrder ||
            !isCustomer
        ) {
            return;
        }

        try {
            setUploading(true);

            await uploadOrderFile(
                selectedOrder.id,
                file
            );

            const updated =
                await getCustomerOrder(
                    selectedOrder.id
                );

            setSelectedOrder(updated);

        } catch (error) {
            console.error(
                "Failed to upload file:",
                error
            );
        } finally {
            setUploading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete File
    |--------------------------------------------------------------------------
    |
    | Customer can delete their uploaded files.
    |
    */

    async function handleDeleteFile(
        fileId: number
    ) {
        if (
            !selectedOrder ||
            !isCustomer
        ) {
            return;
        }

        try {
            setDeletingFile(fileId);

            await deleteOrderFile(fileId);

            const updated =
                await getCustomerOrder(
                    selectedOrder.id
                );

            setSelectedOrder(updated);

        } catch (error) {
            console.error(
                "Failed to delete file:",
                error
            );
        } finally {
            setDeletingFile(null);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create Order
    |--------------------------------------------------------------------------
    */

    function openCreateModal() {
        setSelectedOrder(null);
        setCreateOpen(true);
    }

    /*
    |--------------------------------------------------------------------------
    | Edit Order
    |--------------------------------------------------------------------------
    */

    function openEditModal(order: Order) {
        setSelectedOrder(order);
        setCreateOpen(true);
    }

    /*
    |--------------------------------------------------------------------------
    | Fetch when filters / role change
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!user) {
            return;
        }

        fetchOrders();
    }, [
        user,
        role,
        search,
        statusFilter,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Filter
    |--------------------------------------------------------------------------
    */

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const keyword =
                search.toLowerCase();

            const matchesSearch =
                order.order_number
                    .toLowerCase()
                    .includes(keyword) ||

                (order.title || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (order.service?.title || "")
                    .toLowerCase()
                    .includes(keyword) ||

                (isAdmin &&
                    (
                        order.user?.name ||
                        order.customer?.name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(keyword));

            const matchesStatus =
                statusFilter === "all" ||
                order.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        orders,
        search,
        statusFilter,
        isAdmin,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const totalPages = Math.ceil(
        filteredOrders.length /
        ORDERS_PER_PAGE
    );

    const paginatedOrders =
        filteredOrders.slice(
            (currentPage - 1) *
                ORDERS_PER_PAGE,
            currentPage *
                ORDERS_PER_PAGE
        );

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loadingOrders) {
        return (
            <AuthGuard
                allowedRoles={[
                    "admin",
                    "content_manager",
                    "customer",
                ]}
            >
                <Header />
                <DashboardShell
                    title={t.dashboard.orders.title}
                    description={
                        t.dashboard.orders.description
                    }
                >
                    <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
                            <p className="text-slate-500">{t.common.loading || "Loading orders..."}</p>
                        </div>
                    </div>
                </DashboardShell>
                <Footer />
            </AuthGuard>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <AuthGuard
            allowedRoles={[
                "admin",
                "content_manager",
                "customer",
            ]}
        >
            <Header />
            <DashboardShell
                title={t.dashboard.orders.title}
                description={
                    t.dashboard.orders.description
                }
            >
                <div className="space-y-6" dir={dir}>

                    {/* ======================================================
                        TOP BAR - Search & Create
                    ====================================================== */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative flex-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder={t.dashboard.orders.search}
                                className="h-12 w-full rounded-2xl border-0 bg-white/80 pl-12 pr-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-400/50 transition-all duration-200 backdrop-blur-sm"
                                style={isRTL ? { paddingLeft: '1rem', paddingRight: '3rem' } : {}}
                            />
                        </div>

                        {isCustomer && (
                            <button
                                type="button"
                                onClick={openCreateModal}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                    height: "3rem",
                                    padding: "0 1.5rem",
                                    borderRadius: "1rem",
                                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                    color: "#ffffff",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                                    transition: "all 0.3s ease",
                                    whiteSpace: "nowrap",
                                    fontFamily: "inherit",
                                    lineHeight: "1",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(59, 130, 246, 0.3)";
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = "scale(0.95)";
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                }}
                            >
                                <svg style={{
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    transition: "transform 0.3s ease",
                                }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "rotate(90deg)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "rotate(0deg)";
                                }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>{t.dashboard.orders.create || "Create Order"}</span>
                            </button>
                        )}
                    </div>

                    {/* ======================================================
                        STATUS FILTERS
                    ====================================================== */}

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                setStatusFilter("all");
                                setCurrentPage(1);
                            }}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                statusFilter === "all"
                                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25"
                                    : "bg-white/80 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-white hover:ring-slate-300 backdrop-blur-sm"
                            }`}
                        >
                            {t.dashboard.orders.all}
                        </button>

                        {Object.entries(
                            t.dashboard.orders.statuses
                        ).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setStatusFilter(key);
                                    setCurrentPage(1);
                                }}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                    statusFilter === key
                                        ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25"
                                        : "bg-white/80 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-white hover:ring-slate-300 backdrop-blur-sm"
                                }`}
                            >
                                {statusFilter === key && statusIcons[key]} {label as string}
                            </button>
                        ))}
                    </div>

                    {/* ======================================================
                        RESULT COUNTER
                    ====================================================== */}

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                            {t.dashboard.orders.pagination.showing}
                            {" "}
                            <span className="font-semibold text-slate-700">{paginatedOrders.length}</span>
                            {" "}
                            {t.dashboard.orders.pagination.of}
                            {" "}
                            <span className="font-semibold text-slate-700">{filteredOrders.length}</span>
                            {" "}
                            {t.dashboard.orders.pagination.results}
                        </span>
                    </div>

                    {/* ======================================================
                        ORDERS TABLE - with improved spacing and dark blue view button
                    ====================================================== */}
                    <div className="overflow-hidden rounded-2xl bg-white/80 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 backdrop-blur-sm">
                        <div className="overflow-x-auto px-3 py-3">
                            <table className="w-full min-w-[1100px] border-separate border-spacing-x-3 border-spacing-y-2">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.orderNo}</th>
                                        {isAdmin && <th className="px-4 py-4 text-left rounded-xl">Customer</th>}
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.title}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.service}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.package}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.budget}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.deadline}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.status}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.payment}</th>
                                        <th className="px-4 py-4 text-left rounded-xl">{t.dashboard.orders.created}</th>
                                        <th className="px-4 py-4 text-left rounded-xl min-w-[300px]">{t.dashboard.orders.action}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={isAdmin ? 11 : 10} className="py-16 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="text-5xl">📋</div>
                                                    <p className="text-slate-400">{t.dashboard.orders.emptyDescription}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {paginatedOrders.map((order) => {
                                        const customer = order.user || order.customer;

                                        return (
                                            <tr
                                                key={order.id}
                                                className="transition-all duration-200 hover:bg-slate-50/80 group rounded-xl"
                                            >
                                                <td className="px-4 py-4">
                                                    <span className="font-mono text-sm font-semibold text-slate-700">
                                                        {order.order_number}
                                                    </span>
                                                </td>

                                                {isAdmin && (
                                                    <td className="px-4 py-4">
                                                        <div>
                                                            <p className="font-medium text-slate-700">
                                                                {customer?.name || "-"}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {customer?.email || "-"}
                                                            </p>
                                                        </div>
                                                    </td>
                                                )}

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-slate-700">
                                                        {order.title || "-"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-slate-600">
                                                        {order.service?.title || "-"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-slate-600">
                                                        {order.package?.name ?? "-"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-semibold text-emerald-600">
                                                        {order.budget ? `${order.budget}$` : "-"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-slate-600">
                                                        {order.deadline ?? "-"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[order.status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
                                                        {statusIcons[order.status] || "📌"} {order.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${paymentColors[order.payment_status] || "bg-slate-50 text-slate-700 border-slate-200"}`}>
                                                        {paymentIcons[order.payment_status] || "💳"} {order.payment_status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-slate-500" dir="ltr">
                                                        {formatDate(order.created_at, language)}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex flex-wrap items-center justify-start gap-2">
                                                        {/* ===== VIEW BUTTON - Dark Blue with inline styles ===== */}
                                                        <button
                                                            type="button"
                                                            onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "0.5rem",
                                                                height: "2.5rem",
                                                                padding: "0 1.25rem",
                                                                borderRadius: "0.75rem",
                                                                backgroundColor: "#0B2A5B",
                                                                color: "#ffffff",
                                                                fontSize: "0.875rem",
                                                                fontWeight: "600",
                                                                border: "none",
                                                                cursor: "pointer",
                                                                boxShadow: "0 4px 6px -1px rgba(11, 42, 91, 0.3)",
                                                                transition: "all 0.2s ease",
                                                                whiteSpace: "nowrap",
                                                                fontFamily: "inherit",
                                                                lineHeight: "1",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = "#082247";
                                                                e.currentTarget.style.transform = "scale(1.05)";
                                                                e.currentTarget.style.boxShadow = "0 8px 15px -3px rgba(11, 42, 91, 0.4)";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = "#0B2A5B";
                                                                e.currentTarget.style.transform = "scale(1)";
                                                                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(11, 42, 91, 0.3)";
                                                            }}
                                                            onMouseDown={(e) => {
                                                                e.currentTarget.style.transform = "scale(0.95)";
                                                            }}
                                                            onMouseUp={(e) => {
                                                                e.currentTarget.style.transform = "scale(1.05)";
                                                            }}
                                                        >
                                                            <span style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                width: "1.25rem",
                                                                height: "1.25rem",
                                                                flexShrink: 0,
                                                            }}>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    style={{
                                                                        width: "1.25rem",
                                                                        height: "1.25rem",
                                                                    }}
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M2.25 12s3.75-7 9.75-7 9.75 7 9.75 7-3.75 7-9.75 7-9.75-7-9.75-7Z"
                                                                    />
                                                                    <circle
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="3"
                                                                        strokeWidth={2}
                                                                    />
                                                                </svg>
                                                            </span>

                                                            <span style={{
                                                                whiteSpace: "nowrap",
                                                            }}>
                                                                {t.dashboard.orders.view || "View"}
                                                            </span>
                                                        </button>

                                                        {isCustomer && order.status === "pending" && (
                                                            <>
                                                                {/* ===== EDIT BUTTON - Light Green with inline styles ===== */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openEditModal(order)}
                                                                    style={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        gap: "0.5rem",
                                                                        height: "2.25rem",
                                                                        padding: "0 1rem",
                                                                        borderRadius: "0.75rem",
                                                                        background: "linear-gradient(135deg, #4ade80, #22c55e)",
                                                                        color: "#ffffff",
                                                                        fontSize: "0.875rem",
                                                                        fontWeight: "600",
                                                                        border: "none",
                                                                        cursor: "pointer",
                                                                        boxShadow: "0 4px 12px rgba(74, 222, 128, 0.3)",
                                                                        transition: "all 0.2s ease",
                                                                        whiteSpace: "nowrap",
                                                                        fontFamily: "inherit",
                                                                        lineHeight: "1",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
                                                                        e.currentTarget.style.transform = "scale(1.05)";
                                                                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(74, 222, 128, 0.4)";
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = "linear-gradient(135deg, #4ade80, #22c55e)";
                                                                        e.currentTarget.style.transform = "scale(1)";
                                                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(74, 222, 128, 0.3)";
                                                                    }}
                                                                    onMouseDown={(e) => {
                                                                        e.currentTarget.style.transform = "scale(0.95)";
                                                                    }}
                                                                    onMouseUp={(e) => {
                                                                        e.currentTarget.style.transform = "scale(1.05)";
                                                                    }}
                                                                >
                                                                    <span style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: "1rem",
                                                                    }}>
                                                                        ✏️
                                                                    </span>
                                                                    <span>
                                                                        {t.dashboard.orders.edit?.title || "Edit"}
                                                                    </span>
                                                                </button>

                                                                {/* ===== DELETE BUTTON - Red with reduced width ===== */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setDeletingOrder(order);
                                                                        setDeleteOpen(true);
                                                                    }}
                                                                    style={{
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        gap: "0.25rem",
                                                                        height: "2.25rem",
                                                                        padding: "0 0.75rem",
                                                                        borderRadius: "0.75rem",
                                                                        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                                                                        color: "#ffffff",
                                                                        fontSize: "0.875rem",
                                                                        fontWeight: "600",
                                                                        border: "none",
                                                                        cursor: "pointer",
                                                                        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
                                                                        transition: "all 0.2s ease",
                                                                        whiteSpace: "nowrap",
                                                                        fontFamily: "inherit",
                                                                        lineHeight: "1",
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c, #991b1b)";
                                                                        e.currentTarget.style.transform = "scale(1.05)";
                                                                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(220, 38, 38, 0.35)";
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";
                                                                        e.currentTarget.style.transform = "scale(1)";
                                                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.25)";
                                                                    }}
                                                                    onMouseDown={(e) => {
                                                                        e.currentTarget.style.transform = "scale(0.95)";
                                                                    }}
                                                                    onMouseUp={(e) => {
                                                                        e.currentTarget.style.transform = "scale(1.05)";
                                                                    }}
                                                                >
                                                                    <span style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        fontSize: "0.875rem",
                                                                    }}>
                                                                        🗑️
                                                                    </span>
                                                                    <span style={{
                                                                        fontSize: "0.75rem",
                                                                    }}>
                                                                        {t.dashboard.orders.delete?.confirm || "Delete"}
                                                                    </span>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ======================================================
                        PAGINATION
                    ====================================================== */}

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="flex h-10 items-center gap-2 rounded-xl bg-white/80 px-4 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:bg-white hover:ring-slate-300 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isRTL ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                                </svg>
                                {t.dashboard.orders.pagination.previous}
                            </button>

                            <div className="flex gap-1.5">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                            currentPage === index + 1
                                                ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 scale-110"
                                                : "bg-white/80 text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-white hover:ring-slate-300 backdrop-blur-sm"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="flex h-10 items-center gap-2 rounded-xl bg-white/80 px-4 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:bg-white hover:ring-slate-300 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur-sm"
                            >
                                {t.dashboard.orders.pagination.next}
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isRTL ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* ======================================================
                    CUSTOMER ORDER DETAILS SIDEBAR
                ====================================================== */}

                {detailsOpen && (
                    <div
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setDetailsOpen(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute top-0 h-full w-full max-w-xl overflow-y-auto bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 ${isRTL ? 'left-0' : 'right-0'}`}
                            style={{ animation: 'slideIn 0.3s ease-out' }}
                        >
                            {loadingDetails ? (
                                <div className="flex h-full items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600"></div>
                                        <p className="text-slate-500">Loading order details...</p>
                                    </div>
                                </div>
                            ) : selectedOrder ? (
                                <>
                                    {/* Header */}
                                    <div className="mb-8 border-b border-slate-200 pb-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-slate-800">
                                                    {selectedOrder.title || selectedOrder.order_number}
                                                </h2>
                                                <p className="mt-1 font-mono text-sm text-slate-400">
                                                    {selectedOrder.order_number}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setDetailsOpen(false)}
                                                className="rounded-xl bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Customer information for admin */}
                                    {isAdmin && (
                                        <div className="mb-8 rounded-2xl bg-gradient-to-br from-slate-50/80 to-slate-100/80 p-6">
                                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                                👤 Customer
                                            </h3>
                                            <InfoRow
                                                label="Name"
                                                value={(selectedOrder.user || selectedOrder.customer)?.name}
                                                isRTL={isRTL}
                                            />
                                            <InfoRow
                                                label="Email"
                                                value={(selectedOrder.user || selectedOrder.customer)?.email}
                                                isRTL={isRTL}
                                            />
                                        </div>
                                    )}

                                    {/* Information Grid */}
                                    <div className="space-y-1 rounded-2xl bg-white p-6">
                                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                            📋 Order Details
                                        </h3>
                                        <InfoRow label="Service" value={selectedOrder.service?.title} isRTL={isRTL} />
                                        <InfoRow label="Package" value={selectedOrder.package?.name} isRTL={isRTL} />
                                        <InfoRow label="Budget" value={selectedOrder.budget ? `${selectedOrder.budget}$` : '-'} isRTL={isRTL} />
                                        <InfoRow label="Deadline" value={selectedOrder.deadline} isRTL={isRTL} />
                                        <InfoRow label="Status" value={selectedOrder.status} isRTL={isRTL} />
                                        <InfoRow label="Payment" value={selectedOrder.payment_status} isRTL={isRTL} />
                                    </div>

                                    {/* Description */}
                                    <div className="mt-8">
                                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                            📝 Description
                                        </h3>
                                        <div className="rounded-2xl bg-slate-50/80 p-5">
                                            <p className="leading-relaxed text-slate-600">
                                                {selectedOrder.description || "-"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Files */}
                                    <div className="mt-8">
                                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                            📎 Files
                                        </h3>

                                        {isCustomer && (
                                            <div className="mb-4">
                                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/30">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    {t.dashboard.orders.upload}
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleUpload(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        )}

                                        {uploading && (
                                            <div className="mb-4 flex items-center gap-2 rounded-xl bg-sky-50 p-3 text-sky-600">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600"></div>
                                                <span className="text-sm font-medium">Uploading...</span>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            {selectedOrder.files?.length ? (
                                                selectedOrder.files.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
                                                    >
                                                        <a
                                                            href={file.file_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 font-medium text-sky-600 hover:text-sky-700 hover:underline"
                                                        >
                                                            <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <span className="truncate">{file.file_name}</span>
                                                        </a>

                                                        {isCustomer && (
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm(t.dashboard.orders.confirmDeleteFile)) {
                                                                        handleDeleteFile(file.id);
                                                                    }
                                                                }}
                                                                disabled={deletingFile === file.id}
                                                                className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:text-rose-700 disabled:opacity-60"
                                                            >
                                                                {deletingFile === file.id ? (
                                                                    <>
                                                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600"></div>
                                                                        {t.dashboard.orders.deleting}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                        {t.dashboard.orders.deleteFile}
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                                                    <p className="text-sm text-slate-400">No files uploaded yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Admin Placeholder */}
                                    {isAdmin && (
                                        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-slate-50/80 p-6">
                                            <p className="text-sm text-slate-500">
                                                ⚙️ Admin controls will be added to the dedicated order detail page.
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                )}

                {/* ======================================================
                    CREATE / EDIT ORDER
                ====================================================== */}

                {isCustomer && (
                    <CreateOrderModal
                        open={createOpen}
                        onClose={() => {
                            setCreateOpen(false);
                            setSelectedOrder(null);
                        }}
                        onSuccess={fetchOrders}
                        order={selectedOrder}
                    />
                )}

                {/* ======================================================
                    DELETE ORDER
                ====================================================== */}

                {isCustomer && (
                    <DeleteOrderDialog
                        open={deleteOpen}
                        onClose={() => {
                            setDeleteOpen(false);
                            setDeletingOrder(null);
                        }}
                        order={deletingOrder}
                        onDeleted={() => {
                            fetchOrders();
                        }}
                    />
                )}

                {/* CSS Animations */}
                <style jsx>{`
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
                    
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .animate-fade-in {
                        animation: fadeIn 0.3s ease-out;
                    }
                `}</style>
            </DashboardShell>
            <Footer />
        </AuthGuard>
    );
}