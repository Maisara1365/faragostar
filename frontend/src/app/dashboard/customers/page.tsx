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

import CustomerStatistics
    from "@/components/dashboard/customers/CustomerStatistics";

import CustomerTable
    from "@/components/dashboard/customers/CustomerTable";

import EditCustomerModal
    from "@/components/dashboard/customers/EditCustomerModal";

import CustomerDetailsDrawer
    from "@/components/dashboard/customers/CustomerDetailsDrawer";

import {
    getCustomers,
    activateCustomer,
    blockCustomer,
} from "@/services/customer";

import type {
    Customer,
    CustomerFilters as CustomerFilterType,
} from "@/types/customer";

import {
    useLanguage,
} from "@/context/language-context";

// Import icons
import {
    Search,
} from "lucide-react";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CustomersPage() {
    const { t } = useLanguage();

    const [
        customers,
        setCustomers,
    ] = useState<Customer[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        filters,
        setFilters,
    ] = useState<CustomerFilterType>({});

    const [
        editCustomer,
        setEditCustomer,
    ] = useState<Customer | null>(null);

    const [
        selectedCustomer,
        setSelectedCustomer,
    ] = useState<Customer | null>(null);

    async function loadCustomers() {
        try {
            setLoading(true);
            const response =
                await getCustomers(filters);
            setCustomers(
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
        loadCustomers();
    }, [filters]);

    const statistics = useMemo(() => ({
        total:
            customers.length,
        active:
            customers.filter(
                customer =>
                    customer.status ===
                    "active"
            ).length,
        blocked:
            customers.filter(
                customer =>
                    customer.status ===
                    "blocked"
            ).length,
        verified:
            customers.filter(
                customer =>
                    customer.email_verified
            ).length,
    }), [customers]);

    async function handleActivate(
        customer: Customer
    ) {
        try {
            await activateCustomer(
                customer.id
            );
            await loadCustomers();
        }
        catch (error) {
            console.error(
                "Failed to activate customer:",
                error
            );
        }
    }

    async function handleBlock(
        customer: Customer
    ) {
        try {
            await blockCustomer(
                customer.id
            );
            await loadCustomers();
        }
        catch (error) {
            console.error(
                "Failed to block customer:",
                error
            );
        }
    }

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
                    t.dashboard.customers.title
                }
                description={
                    t.dashboard.customers.subtitle
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
                        <CustomerStatistics
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
                                    placeholder={t.dashboard.customers.search || "Search customers..."}
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
                        Customer Table or Empty State
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
                            {customers.length > 0 ? (
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
                                        <CustomerTable
                                            customers={customers}
                                            onView={setSelectedCustomer}
                                            onEdit={setEditCustomer}
                                            onActivate={handleActivate}
                                            onBlock={handleBlock}
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
                                        {t.dashboard.customers.empty_title || "No customers found"}
                                    </p>
                                    <p
                                        style={{
                                            marginTop: "8px",
                                            fontSize: "14px",
                                            color: "#64748b",
                                        }}
                                    >
                                        {t.dashboard.customers.empty_description || "Customers will appear here once they register."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DashboardShell>

            {/* Footer */}
            <Footer />

            <EditCustomerModal
                customer={editCustomer}
                open={!!editCustomer}
                onClose={() => setEditCustomer(null)}
                onUpdated={loadCustomers}
            />

            <CustomerDetailsDrawer
                customer={selectedCustomer}
                open={!!selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
            />
        </AuthGuard>
    );
}