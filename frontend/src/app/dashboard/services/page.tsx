"use client";

import { useEffect, useMemo, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import ServiceTable from "@/components/dashboard/services/ServiceTable";
import CreateServiceModal from "@/components/dashboard/services/CreateServiceModal";
import EditServiceModal from "@/components/dashboard/services/EditServiceModal";
import ServiceDetailsDrawer from "@/components/dashboard/services/ServiceDetailsDrawer";
import DeleteServiceDialog from "@/components/dashboard/services/DeleteServiceDialog";

import {
    getServices,
    createService,
    updateService,
    deleteService,
} from "@/services/service";

import type {
    Service,
} from "@/types/service";

import { useLanguage } from "@/context/language-context";

import {
    Layers3,
    CheckCircle2,
    Star,
    Clock3,
    Plus,
} from "lucide-react";

import Button from "@/components/ui/button";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ServicesPage() {

    const { t, language } = useLanguage();

    // ============================================================
    // Loading States
    // ============================================================

    const [loading, setLoading] =
        useState(true);

    const [operationLoading, setOperationLoading] =
        useState(false);

    // ============================================================
    // Services
    // ============================================================

    const [services, setServices] =
        useState<Service[]>([]);

    const [selectedService, setSelectedService] =
        useState<Service | null>(null);

    // ============================================================
    // Filters
    // ============================================================

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [featuredFilter, setFeaturedFilter] =
        useState("all");

    // ============================================================
    // Dialog States
    // ============================================================

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    // ============================================================
    // Helper Functions for Number Formatting
    // ============================================================

    // Convert English digits to Persian digits
    const toPersianDigits = (num: number): string => {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return num
            .toString()
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    // Format number based on current language
    const formatNumber = (num: number): string => {
        if (language === "fa") {
            return toPersianDigits(num);
        }
        return num.toString();
    };

    // ============================================================
    // Load Services
    // ============================================================

    async function loadServices() {

        try {

            setLoading(true);

            const data =
                await getServices();

            setServices(data);

        } catch (error) {

            console.error(
                "Failed to load services:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadServices();

    }, []);

    // ============================================================
    // Statistics
    // ============================================================

    const statistics =
        useMemo(() => {

            return {

                total:
                    services.length,

                active:
                    services.filter(
                        service =>
                            service.status ===
                            "active"
                    ).length,

                featured:
                    services.filter(
                        service =>
                            service.is_featured
                    ).length,

                inactive:
                    services.filter(
                        service =>
                            service.status ===
                            "inactive"
                    ).length,

            };

        }, [services]);

    // Format statistics numbers for display
    const formattedStatistics = useMemo(() => {
        return {
            total: formatNumber(statistics.total),
            active: formatNumber(statistics.active),
            featured: formatNumber(statistics.featured),
            inactive: formatNumber(statistics.inactive),
        };
    }, [statistics, language]);

    // ============================================================
    // Filtering
    // ============================================================

    const filteredServices =
        useMemo(() => {

            return services.filter(
                service => {

                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();

                    const matchesSearch =
                        !searchValue ||

                        service.title
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||

                        service.title_en
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||

                        service.title_fa
                            .toLowerCase()
                            .includes(
                                searchValue
                            ) ||

                        service.slug
                            .toLowerCase()
                            .includes(
                                searchValue
                            );

                    const matchesStatus =
                        statusFilter === "all"
                            ? true
                            : service.status ===
                              statusFilter;

                    const matchesFeatured =
                        featuredFilter === "all"
                            ? true
                            : featuredFilter ===
                              "featured"
                                ? service.is_featured
                                : !service.is_featured;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesFeatured
                    );

                }
            );

        }, [
            services,
            search,
            statusFilter,
            featuredFilter,
        ]);

    // ============================================================
    // Create Service
    // ============================================================

    async function handleCreate(
        data: FormData
    ) {
        try {
            setOperationLoading(true);

            await createService(data);

            await loadServices();

            setCreateOpen(false);

        } catch (error: any) {
            console.error(
                "CREATE SERVICE STATUS:",
                error?.response?.status
            );

            console.error(
                "CREATE SERVICE RESPONSE:",
                error?.response?.data
            );

        } finally {
            setOperationLoading(false);
        }
    }

    // ============================================================
    // Update Service
    // ============================================================

    async function handleUpdate(
        id: number,
        data: FormData
    ) {

        try {

            setOperationLoading(true);

            await updateService(
                id,
                data
            );

            await loadServices();

            setEditOpen(false);

            setSelectedService(null);

        } catch (error) {

            console.error(
                "Failed to update service:",
                error
            );

        } finally {

            setOperationLoading(false);

        }

    }

    // ============================================================
    // Delete Service
    // ============================================================

    async function handleDelete(
        id: number
    ) {

        try {

            setOperationLoading(true);

            await deleteService(id);

            await loadServices();

            setDeleteOpen(false);

            setSelectedService(null);

        } catch (error) {

            console.error(
                "Failed to delete service:",
                error
            );

        } finally {

            setOperationLoading(false);

        }

    }

    // ============================================================
    // Render
    // ============================================================

    return (

        <AuthGuard
            allowedRoles={[
                "admin",
                "content_manager",
            ]}
        >
            <Header />

            <DashboardShell
                title={
                    t.dashboard.services.title
                }
                description={
                    t.dashboard.services.subtitle
                }
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                        padding: "8px",
                        width: "100%",
                    }}
                >

                    {/* ==================================================
                        Statistics
                    ================================================== */}

                    <div
                        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
                        style={{
                            gap: "24px",
                            padding: "4px",
                        }}
                    >

                        {/* Total */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor: "#eff6ff",
                                    marginBottom: "16px",
                                    padding: "8px",
                                }}
                            >

                                <Layers3
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#2563eb",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard.services
                                        .statistics.total
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.total}

                            </h3>

                        </div>

                        {/* Active */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor: "#ecfdf5",
                                    marginBottom: "16px",
                                    padding: "8px",
                                }}
                            >

                                <CheckCircle2
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#16a34a",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard.services
                                        .statistics.active
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.active}

                            </h3>

                        </div>

                        {/* Featured */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor: "#fffbeb",
                                    marginBottom: "16px",
                                    padding: "8px",
                                }}
                            >

                                <Star
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#f59e0b",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard.services
                                        .statistics.featured
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.featured}

                            </h3>

                        </div>

                        {/* Inactive */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor: "#fef2f2",
                                    marginBottom: "16px",
                                    padding: "8px",
                                }}
                            >

                                <Clock3
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#ef4444",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard.services
                                        .statistics.inactive
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.inactive}

                            </h3>

                        </div>

                    </div>

                    {/* ==================================================
                        Filters
                    ================================================== */}

                    <div
                        className="flex flex-col rounded-2xl border bg-white lg:flex-row lg:items-center"
                        style={{
                            gap: "16px",
                            padding: "24px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                        }}
                    >

                        {/* Search */}

                        <input
                            type="text"
                            placeholder={
                                t.dashboard.services.search
                            }
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                            style={{
                                padding: "12px 16px",
                                minHeight: "46px",
                                borderRadius: "10px",
                            }}
                        />

                        {/* Status */}

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            className="rounded-xl border px-4 py-3"
                            style={{
                                padding: "12px 16px",
                                minHeight: "46px",
                                borderRadius: "10px",
                            }}
                        >

                            <option value="all">

                                {t.common.all}

                            </option>

                            <option value="active">

                                {t.common.active}

                            </option>

                            <option value="inactive">

                                {t.common.inactive}

                            </option>

                        </select>

                        {/* Featured */}

                        <select
                            value={featuredFilter}
                            onChange={(e) =>
                                setFeaturedFilter(
                                    e.target.value
                                )
                            }
                            className="rounded-xl border px-4 py-3"
                            style={{
                                padding: "12px 16px",
                                minHeight: "46px",
                                borderRadius: "10px",
                            }}
                        >

                            <option value="all">

                                {t.common.all}

                            </option>

                            <option value="featured">

                                {t.common.featured}

                            </option>

                            <option value="normal">

                                {t.common.normal}

                            </option>

                        </select>

                        {/* Create Service Button */}

                        <Button
                            onClick={() =>
                                setCreateOpen(true)
                            }
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "9px",

                                minHeight: "48px",
                                padding: "32px 12px",

                                borderRadius: "12px",

                                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",

                                color: "#1e40af",

                                border: "1px solid #93c5fd",

                                fontSize: "14px",
                                fontWeight: 700,

                                letterSpacing: "0.1px",

                                boxShadow:
                                    "0 4px 10px rgba(59, 130, 246, 0.15)",

                                cursor: "pointer",

                                whiteSpace: "nowrap",

                                transition:
                                    "all 0.2s ease",

                                flexShrink: 0,
                            }}
                        >
                            <span
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "8px",
                                    backgroundColor: "#ffffff",
                                    boxShadow:
                                        "0 2px 5px rgba(37, 99, 235, 0.12)",
                                }}
                            >
                                <Plus
                                    style={{
                                        width: "17px",
                                        height: "17px",
                                        color: "#2563eb",
                                        strokeWidth: 2.5,
                                    }}
                                />
                            </span>

                            <span>
                                {
                                    t.dashboard.services
                                        .create
                                }
                            </span>
                        </Button>

                    </div>

                    {/* ==================================================
                        Service Table
                    ================================================== */}

                    <div
                        style={{
                            width: "100%",
                            padding: "4px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                            boxSizing: "border-box",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <ServiceTable

                                loading={loading}

                                services={
                                    filteredServices
                                }

                                reload={
                                    loadServices
                                }

                                onView={(service) => {

                                    setSelectedService(
                                        service
                                    );

                                    setDetailsOpen(
                                        true
                                    );

                                }}

                                onEdit={(service) => {

                                    setSelectedService(
                                        service
                                    );

                                    setEditOpen(
                                        true
                                    );

                                }}

                                onDelete={(service) => {

                                    setSelectedService(
                                        service
                                    );

                                    setDeleteOpen(
                                        true
                                    );

                                }}

                            />
                        </div>
                    </div>

                </div>

            </DashboardShell>

            {/* ==========================================================
                Create Service
            ========================================================== */}

            <CreateServiceModal

                open={createOpen}

                loading={
                    operationLoading
                }

                onClose={() =>
                    setCreateOpen(false)
                }

                onSubmit={
                    handleCreate
                }

            />

            {/* ==========================================================
                Edit Service
            ========================================================== */}

            <EditServiceModal

                open={editOpen}

                loading={
                    operationLoading
                }

                service={
                    selectedService
                }

                onClose={() => {

                    setEditOpen(false);

                    setSelectedService(
                        null
                    );

                }}

                onSubmit={
                    handleUpdate
                }

            />

            {/* ==========================================================
                Service Details
            ========================================================== */}

            <ServiceDetailsDrawer

                open={detailsOpen}

                service={
                    selectedService
                }

                onClose={() => {

                    setDetailsOpen(false);

                    setSelectedService(
                        null
                    );

                }}

            />

            {/* ==========================================================
                Delete Service
            ========================================================== */}

            <DeleteServiceDialog

                open={deleteOpen}

                loading={
                    operationLoading
                }

                service={
                    selectedService
                }

                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedService(
                        null
                    );

                }}

                onDelete={
                    handleDelete
                }

            />

            <Footer />

        </AuthGuard>

    );

}