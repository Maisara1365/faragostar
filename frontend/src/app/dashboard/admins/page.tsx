"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import AuthGuard
    from "@/components/auth/AuthGuard";

import DashboardShell
    from "@/components/dashboard/shell/DashboardShell";

import AdminStatistics
    from "@/components/dashboard/admins/AdminStatistics";

import AdminTable
    from "@/components/dashboard/admins/AdminTable";

import CreateAdminModal
    from "@/components/dashboard/admins/CreateAdminModal";

import EditAdminModal
    from "@/components/dashboard/admins/EditAdminModal";

import AdminDetailsDrawer
    from "@/components/dashboard/admins/AdminDetailsDrawer";

import {
    getAdmins,
} from "@/services/admin";

import type {
    Admin,
    AdminFilters as AdminFilterType,
} from "@/types/admin";

import {
    useLanguage,
} from "@/context/language-context";

// Import icons
import {
    Search,
    Plus,
} from "lucide-react";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AdminsPage() {
    const { t } = useLanguage();

    const [
        admins,
        setAdmins,
    ] = useState<Admin[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        filters,
        setFilters,
    ] = useState<AdminFilterType>({});

    const [
        createOpen,
        setCreateOpen,
    ] = useState(false);

    const [
        editAdmin,
        setEditAdmin,
    ] = useState<Admin | null>(null);

    const [
        selectedAdmin,
        setSelectedAdmin,
    ] = useState<Admin | null>(null);

    async function loadAdmins() {
        try {
            setLoading(true);
            const response =
                await getAdmins(filters);
            setAdmins(
                response.data
            );
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAdmins();
    }, [filters]);

    const statistics = useMemo(() => ({
        total:
            admins.length,
        active:
            admins.filter(
                admin =>
                    admin.status ===
                    "active"
            ).length,
        blocked:
            admins.filter(
                admin =>
                    admin.status ===
                    "blocked"
            ).length,
        verified:
            admins.filter(
                admin =>
                    admin.email_verified
            ).length,
    }), [admins]);

    // Check if any filters are active
    const hasActiveFilters = 
        filters.search ||
        filters.status ||
        filters.language ||
        filters.verified !== undefined;

    return (
        <AuthGuard
            allowedRoles={[
                "admin",
            ]}
        >
            {/* Header */}
            <Header />

            <DashboardShell
                title={
                    t.dashboard.admins.title
                }
                description={
                    t.dashboard.admins.subtitle
                }
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    {/* ==================================================
                        Statistics
                    ================================================== */}

                    <div
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >
                        <AdminStatistics
                            statistics={statistics}
                        />
                    </div>

                    {/* ==================================================
                        Filters Section - Redesigned
                    ================================================== */}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            padding: "24px",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: "#ffffff",
                            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
                            boxSizing: "border-box",
                        }}
                    >
                        {/* Search Row */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                width: "100%",
                            }}
                        >
                            {/* Search Input with Icon */}
                            <div
                                style={{
                                    position: "relative",
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <Search
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "18px",
                                        height: "18px",
                                        color: "#94a3b8",
                                        pointerEvents: "none",
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder={t.dashboard.admins.search || "Search admins..."}
                                    value={filters.search ?? ""}
                                    onChange={(e) =>
                                        setFilters((previous) => ({
                                            ...previous,
                                            search: e.target.value,
                                        }))
                                    }
                                    style={{
                                        width: "100%",
                                        minHeight: "48px",
                                        padding: "12px 16px 12px 44px",
                                        borderRadius: "12px",
                                        border: "2px solid #f1f5f9",
                                        outline: "none",
                                        backgroundColor: "#f8fafc",
                                        fontSize: "14px",
                                        color: "#0f172a",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#2563eb";
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37, 99, 235, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#f1f5f9";
                                        e.currentTarget.style.backgroundColor = "#f8fafc";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            {/* Create Button - Right Aligned */}
                            <button
                                onClick={() => setCreateOpen(true)}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    minHeight: "48px",
                                    padding: "0 24px",
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                                    color: "#ffffff",
                                    border: "none",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    letterSpacing: "0.3px",
                                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    transition: "all 0.2s ease",
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.35)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.background = "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 99, 235, 0.25)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.background = "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)";
                                }}
                            >
                                <Plus
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        strokeWidth: 2.5,
                                    }}
                                />
                                <span>{t.dashboard.admins.create || "Create Admin"}</span>
                            </button>
                        </div>

                        {/* Filters Row */}
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "12px",
                                alignItems: "center",
                                paddingTop: "4px",
                                borderTop: "1px solid #f1f5f9",
                            }}
                        >
                            {/* Status Filter */}
                            <div
                                style={{
                                    position: "relative",
                                    flex: "1 1 180px",
                                    minWidth: "160px",
                                }}
                            >
                                <select
                                    value={filters.status ?? ""}
                                    onChange={(e) =>
                                        setFilters((previous) => ({
                                            ...previous,
                                            status:
                                                e.target.value === ""
                                                    ? undefined
                                                    : (e.target.value as "active" | "blocked"),
                                        }))
                                    }
                                    style={{
                                        width: "100%",
                                        minHeight: "42px",
                                        padding: "8px 36px 8px 14px",
                                        borderRadius: "10px",
                                        border: "2px solid #f1f5f9",
                                        backgroundColor: "#f8fafc",
                                        color: "#334155",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        outline: "none",
                                        cursor: "pointer",
                                        appearance: "none",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#2563eb";
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37, 99, 235, 0.08)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#f1f5f9";
                                        e.currentTarget.style.backgroundColor = "#f8fafc";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="">
                                        📊 {t.common.allStatus}
                                    </option>
                                    <option value="active">
                                        ✅ {t.common.active || "Active"}
                                    </option>
                                    <option value="blocked">
                                        🚫 {t.common.blocked || "Blocked"}
                                    </option>
                                </select>
                                <svg
                                    style={{
                                        position: "absolute",
                                        right: "12px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "16px",
                                        height: "16px",
                                        color: "#94a3b8",
                                        pointerEvents: "none",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {/* Language Filter */}
                            <div
                                style={{
                                    position: "relative",
                                    flex: "1 1 180px",
                                    minWidth: "160px",
                                }}
                            >
                                <select
                                    value={filters.language ?? ""}
                                    onChange={(e) =>
                                        setFilters((previous) => ({
                                            ...previous,
                                            language:
                                                e.target.value === ""
                                                    ? undefined
                                                    : (e.target.value as "fa" | "en"),
                                        }))
                                    }
                                    style={{
                                        width: "100%",
                                        minHeight: "42px",
                                        padding: "8px 36px 8px 14px",
                                        borderRadius: "10px",
                                        border: "2px solid #f1f5f9",
                                        backgroundColor: "#f8fafc",
                                        color: "#334155",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        outline: "none",
                                        cursor: "pointer",
                                        appearance: "none",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#2563eb";
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37, 99, 235, 0.08)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#f1f5f9";
                                        e.currentTarget.style.backgroundColor = "#f8fafc";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="">
                                        🌐 {t.common.allLanguage|| "All Language"}
                                    </option>
                                    <option value="en">
                                        🇬🇧 {t.common.english || "English"}
                                    </option>
                                    <option value="fa">
                                        🇮🇷 {t.common.persian || "فارسی"}
                                    </option>
                                </select>
                                <svg
                                    style={{
                                        position: "absolute",
                                        right: "12px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "16px",
                                        height: "16px",
                                        color: "#94a3b8",
                                        pointerEvents: "none",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {/* Verified Filter */}
                            <div
                                style={{
                                    position: "relative",
                                    flex: "1 1 180px",
                                    minWidth: "160px",
                                }}
                            >
                                <select
                                    value={
                                        filters.verified === undefined
                                            ? ""
                                            : String(filters.verified)
                                    }
                                    onChange={(e) =>
                                        setFilters((previous) => ({
                                            ...previous,
                                            verified:
                                                e.target.value === ""
                                                    ? undefined
                                                    : e.target.value === "true",
                                        }))
                                    }
                                    style={{
                                        width: "100%",
                                        minHeight: "42px",
                                        padding: "8px 36px 8px 14px",
                                        borderRadius: "10px",
                                        border: "2px solid #f1f5f9",
                                        backgroundColor: "#f8fafc",
                                        color: "#334155",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        outline: "none",
                                        cursor: "pointer",
                                        appearance: "none",
                                        transition: "all 0.2s ease",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#2563eb";
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37, 99, 235, 0.08)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "#f1f5f9";
                                        e.currentTarget.style.backgroundColor = "#f8fafc";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="">
                                        ✅ {t.common.allVerified || "All Verified"}
                                    </option>
                                    <option value="true">
                                        ✓ {t.common.verified || "Verified"}
                                    </option>
                                    <option value="false">
                                        ✗ {t.common.notVerified || "Not Verified"}
                                    </option>
                                </select>
                                <svg
                                    style={{
                                        position: "absolute",
                                        right: "12px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "16px",
                                        height: "16px",
                                        color: "#94a3b8",
                                        pointerEvents: "none",
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>

                            {/* Clear Filters Button */}
                            {hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        setFilters({});
                                    }}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "6px",
                                        minHeight: "42px",
                                        padding: "0 16px",
                                        borderRadius: "10px",
                                        backgroundColor: "#f1f5f9",
                                        color: "#475569",
                                        border: "2px solid #f1f5f9",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#e2e8f0";
                                        e.currentTarget.style.borderColor = "#e2e8f0";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f1f5f9";
                                        e.currentTarget.style.borderColor = "#f1f5f9";
                                    }}
                                >
                                    <svg
                                        style={{
                                            width: "14px",
                                            height: "14px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    {t.common.clearFilters || "Clear Filters"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ==================================================
                        Admin Table or Empty State
                    ================================================== */}

                    {loading ? (
                        <div
                            style={{
                                borderRadius: "16px",
                                border: "1px solid #e2e8f0",
                                backgroundColor: "#ffffff",
                                padding: "40px",
                                textAlign: "center",
                                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                                boxSizing: "border-box",
                            }}
                        >
                            <p style={{ color: "#64748b" }}>
                                {t.common.loading}
                            </p>
                        </div>
                    ) : (
                        <>
                            {admins.length > 0 ? (
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
                                        <AdminTable
                                            admins={admins}
                                            onView={setSelectedAdmin}
                                            onEdit={setEditAdmin}
                                            onStatusChanged={loadAdmins}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        borderRadius: "16px",
                                        border: "1px solid #e2e8f0",
                                        backgroundColor: "#ffffff",
                                        padding: "40px",
                                        textAlign: "center",
                                        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontWeight: 600,
                                            color: "#0f172a",
                                        }}
                                    >
                                        {t.dashboard.admins.empty_title || "No admins found"}
                                    </p>
                                    <p
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "14px",
                                            color: "#64748b",
                                        }}
                                    >
                                        {t.dashboard.admins.empty_description || "Create your first admin by clicking the button above."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DashboardShell>

            {/* Footer */}
            <Footer />

            <CreateAdminModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onCreated={loadAdmins}
            />

            {editAdmin && (
                <EditAdminModal
                    admin={editAdmin}
                    open={true}
                    onClose={() => setEditAdmin(null)}
                    onUpdated={loadAdmins}
                />
            )}

            {selectedAdmin && (
                <AdminDetailsDrawer
                    admin={selectedAdmin}
                    open={true}
                    onClose={() => setSelectedAdmin(null)}
                />
            )}
        </AuthGuard>
    );
}