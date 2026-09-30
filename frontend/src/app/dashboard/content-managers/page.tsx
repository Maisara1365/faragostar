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

import ContentManagerStatistics
    from "@/components/dashboard/content-managers/ContentManagerStatistics";

import ContentManagerTable
    from "@/components/dashboard/content-managers/ContentManagerTable";

import CreateContentManagerModal
    from "@/components/dashboard/content-managers/CreateContentManagerModal";

import EditContentManagerModal
    from "@/components/dashboard/content-managers/EditContentManagerModal";

import ContentManagerDetailsDrawer
    from "@/components/dashboard/content-managers/ContentManagerDetailsDrawer";

import {
    getContentManagers,
} from "@/services/content-manager";

import type {
    ContentManager,
    ContentManagerFilters as ContentManagerFilterType,
} from "@/types/content-manager";

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

export default function ContentManagersPage() {
    const { t } = useLanguage();

    const [
        contentManagers,
        setContentManagers,
    ] = useState<ContentManager[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        filters,
        setFilters,
    ] = useState<ContentManagerFilterType>({});

    const [
        createOpen,
        setCreateOpen,
    ] = useState(false);

    const [
        editManager,
        setEditManager,
    ] = useState<ContentManager | null>(null);

    const [
        selectedManager,
        setSelectedManager,
    ] = useState<ContentManager | null>(null);

    async function loadManagers() {
        try {
            setLoading(true);
            const response =
                await getContentManagers(filters);
            setContentManagers(
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
        loadManagers();
    }, [filters]);

    const statistics = useMemo(() => ({
        total:
            contentManagers.length,
        active:
            contentManagers.filter(
                manager =>
                    manager.status ===
                    "active"
            ).length,
        blocked:
            contentManagers.filter(
                manager =>
                    manager.status ===
                    "blocked"
            ).length,
        verified:
            contentManagers.filter(
                manager =>
                    manager.email_verified
            ).length,
    }), [contentManagers]);

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
                    t.dashboard.contentManagers.title
                }
                description={
                    t.dashboard.contentManagers.subtitle
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
                        <ContentManagerStatistics
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
                                    placeholder={t.dashboard.contentManagers.search || "Search content managers..."}
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
                                <span>{t.dashboard.contentManagers.create || "Create Content Manager"}</span>
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
                                        📊 {t.common.allStatus || "All Status"}
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
                                        🌐 {t.common.allLanguage || "All Language"}
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
                        Content Manager Table or Empty State
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
                            {contentManagers.length > 0 ? (
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
                                        <ContentManagerTable
                                            contentManagers={contentManagers}
                                            onView={setSelectedManager}
                                            onEdit={setEditManager}
                                            onStatusChanged={loadManagers}
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
                                        {t.dashboard.contentManagers.empty_title || "No content managers found"}
                                    </p>
                                    <p
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "14px",
                                            color: "#64748b",
                                        }}
                                    >
                                        {t.dashboard.contentManagers.empty_description || "Create your first content manager by clicking the button above."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DashboardShell>

            {/* Footer */}
            <Footer />

            <CreateContentManagerModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onCreated={loadManagers}
            />

            {editManager && (
                <EditContentManagerModal
                    manager={editManager}
                    open={true}
                    onClose={() => setEditManager(null)}
                    onUpdated={loadManagers}
                />
            )}

            {selectedManager && (
                <ContentManagerDetailsDrawer
                    manager={selectedManager}
                    open={true}
                    onClose={() => setSelectedManager(null)}
                />
            )}
        </AuthGuard>
    );
}