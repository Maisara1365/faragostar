"use client";

import { useEffect, useMemo, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLanguage } from "@/context/language-context";

import {
    getPortfolio,
} from "@/services/portfolio";

import type {
    Portfolio,
    PortfolioStatus,
} from "@/types/portfolio";

import PortfolioStatistics from "@/components/dashboard/portfolio/PortfolioStatistics";
import PortfolioTable from "@/components/dashboard/portfolio/PortfolioTable";
import CreatePortfolioModal from "@/components/dashboard/portfolio/CreatePortfolioModal";
import EditPortfolioModal from "@/components/dashboard/portfolio/EditPortfolioModal";
import DeletePortfolioDialog from "@/components/dashboard/portfolio/DeletePortfolioDialog";
import PortfolioDetailsDrawer from "@/components/dashboard/portfolio/PortfolioDetailsDrawer";

import {
    Plus,
    Search,
} from "lucide-react";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


function PortfolioPageContent() {

    const { t } = useLanguage();

    // ============================================================
    // Portfolios
    // ============================================================

    const [portfolios, setPortfolios] =
        useState<Portfolio[]>([]);

    // ============================================================
    // Loading
    // ============================================================

    const [loading, setLoading] =
        useState(true);

    const [deleteLoading, setDeleteLoading] =
        useState(false);

    // ============================================================
    // Filters
    // ============================================================

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState<"all" | PortfolioStatus>("all");

    const [featured, setFeatured] =
        useState<
            "all" |
            "featured" |
            "not_featured"
        >("all");

    // ============================================================
    // Dialog States
    // ============================================================

    const [createOpen, setCreateOpen] =
        useState(false);

    const [selectedPortfolio, setSelectedPortfolio] =
        useState<Portfolio | null>(null);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    // ============================================================
    // Load Portfolios
    // ============================================================

    async function loadPortfolios() {

        try {

            setLoading(true);

            const data =
                await getPortfolio();

            setPortfolios(data);

        } catch (error) {

            console.error(
                "Failed to load portfolios:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadPortfolios();

    }, []);

    // ============================================================
    // Filter Portfolios
    // ============================================================

    const filteredPortfolios =
        useMemo(() => {

            const normalizedSearch =
                search
                    .trim()
                    .toLowerCase();

            return portfolios.filter(
                (portfolio) => {

                    const matchesSearch =
                        !normalizedSearch ||

                        portfolio.title
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.title_en
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.title_fa
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.category
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.category_en
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.category_fa
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.client_name
                            ?.toLowerCase()
                            .includes(
                                normalizedSearch
                            ) ||

                        portfolio.slug
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            );

                    const matchesStatus =
                        status === "all" ||
                        portfolio.status ===
                            status;

                    const matchesFeatured =
                        featured === "all" ||

                        (
                            featured ===
                                "featured" &&
                            portfolio.is_featured
                        ) ||

                        (
                            featured ===
                                "not_featured" &&
                            !portfolio.is_featured
                        );

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesFeatured
                    );

                }
            );

        }, [
            portfolios,
            search,
            status,
            featured,
        ]);

    // ============================================================
    // View Portfolio
    // ============================================================

    function handleView(
        portfolio: Portfolio
    ) {

        setSelectedPortfolio(
            portfolio
        );

        setDetailsOpen(true);

    }

    // ============================================================
    // Edit Portfolio
    // ============================================================

    function handleEdit(
        portfolio: Portfolio
    ) {

        setSelectedPortfolio(
            portfolio
        );

        setEditOpen(true);

    }

    // ============================================================
    // Delete Portfolio
    // ============================================================

    function handleDelete(
        portfolio: Portfolio
    ) {

        setSelectedPortfolio(
            portfolio
        );

        setDeleteOpen(true);

    }

    // ============================================================
    // After Create
    // ============================================================

    async function handleCreated() {

        await loadPortfolios();

    }

    // ============================================================
    // After Update
    // ============================================================

    async function handleUpdated() {

        await loadPortfolios();

    }

    // ============================================================
    // After Delete
    // ============================================================

    async function handleDeleted() {

        await loadPortfolios();

        setSelectedPortfolio(null);

    }

    // ============================================================
    // Render
    // ============================================================

    return (

        <>
            <Header />

            <DashboardShell
                title={
                    t.dashboard.portfolio.title
                }
                description={
                    t.dashboard.portfolio.subtitle
                }
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                        padding: "0px",
                        width: "100%",
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

                        <PortfolioStatistics
                            portfolios={
                                portfolios
                            }
                        />

                    </div>


                    {/* ==================================================
                        Filters
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            rounded-2xl
                            border
                            bg-white
                            lg:flex-row
                            lg:items-center
                        "
                        style={{
                            gap: "16px",
                            padding: "24px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border:
                                "1px solid #e2e8f0",
                            backgroundColor:
                                "#ffffff",
                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.04)",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Search */}

                        <div
                            style={{
                                position: "relative",
                                flex: 1,
                                minWidth: 0,
                            }}
                        >

                            <Search
                                style={{
                                    position:
                                        "absolute",
                                    left: "14px",
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    width: "18px",
                                    height: "18px",
                                    color:
                                        "#94a3b8",
                                    pointerEvents:
                                        "none",
                                    zIndex: 1,
                                }}
                            />

                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder={
                                    t.dashboard
                                        .portfolio
                                        .filters
                                        .search
                                }
                                style={{
                                    width: "100%",
                                    minHeight:
                                        "46px",
                                    padding:
                                        "12px 16px 12px 44px",
                                    borderRadius:
                                        "10px",
                                    border:
                                        "1px solid #e2e8f0",
                                    outline: "none",
                                    boxSizing:
                                        "border-box",
                                }}
                            />

                        </div>


                        {/* Status */}

                        <select
                            value={status}
                            onChange={(event) =>
                                setStatus(
                                    event.target
                                        .value as
                                        | "all"
                                        | PortfolioStatus
                                )
                            }
                            style={{
                                minHeight: "46px",
                                minWidth: "170px",
                                padding:
                                    "12px 16px",
                                borderRadius:
                                    "10px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                color:
                                    "#334155",
                                outline: "none",
                                cursor:
                                    "pointer",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <option value="all">

                                {
                                    t.dashboard
                                        .portfolio
                                        .filters
                                        .allStatus
                                }

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
                            value={featured}
                            onChange={(event) =>
                                setFeatured(
                                    event.target
                                        .value as
                                        | "all"
                                        | "featured"
                                        | "not_featured"
                                )
                            }
                            style={{
                                minHeight: "46px",
                                minWidth: "180px",
                                padding:
                                    "12px 16px",
                                borderRadius:
                                    "10px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                color:
                                    "#334155",
                                outline: "none",
                                cursor:
                                    "pointer",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <option value="all">

                                {
                                    t.dashboard
                                        .portfolio
                                        .filters
                                        .allFeatured
                                }

                            </option>

                            <option value="featured">

                                {
                                    t.dashboard
                                        .portfolio
                                        .filters
                                        .featured
                                }

                            </option>

                            <option value="not_featured">

                                {
                                    t.dashboard
                                        .portfolio
                                        .filters
                                        .notFeatured
                                }

                            </option>

                        </select>


                        {/* ==================================================
                            Create Portfolio Button
                        ================================================== */}

                        <Button
                            onClick={() =>
                                setCreateOpen(
                                    true
                                )
                            }
                            style={{
                                display:
                                    "inline-flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                gap: "9px",

                                minHeight:
                                    "48px",

                                padding:
                                    "32px 12px",

                                borderRadius:
                                    "12px",

                                background:
                                    "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",

                                color:
                                    "#1e40af",

                                border:
                                    "1px solid #93c5fd",

                                fontSize:
                                    "14px",

                                fontWeight: 700,

                                letterSpacing:
                                    "0.1px",

                                boxShadow:
                                    "0 4px 10px rgba(59, 130, 246, 0.15)",

                                cursor:
                                    "pointer",

                                whiteSpace:
                                    "nowrap",

                                transition:
                                    "all 0.2s ease",

                                flexShrink: 0,
                            }}
                        >

                            <span
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    borderRadius:
                                        "8px",
                                    backgroundColor:
                                        "#ffffff",
                                    boxShadow:
                                        "0 2px 5px rgba(37, 99, 235, 0.12)",
                                }}
                            >

                                <Plus
                                    style={{
                                        width:
                                            "17px",
                                        height:
                                            "17px",
                                        color:
                                            "#2563eb",
                                        strokeWidth:
                                            2.5,
                                    }}
                                />

                            </span>

                            <span>

                                {
                                    t.dashboard
                                        .portfolio
                                        .create
                                }

                            </span>

                        </Button>

                    </div>


                    {/* ==================================================
                        Portfolio Table
                    ================================================== */}

                    <div
                        style={{
                            width: "100%",
                            padding: "4px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border:
                                "1px solid #e2e8f0",
                            backgroundColor:
                                "#ffffff",
                            boxShadow:
                                "0 4px 12px rgba(15, 23, 42, 0.05)",
                            boxSizing:
                                "border-box",
                            overflow:
                                "hidden",
                        }}
                    >

                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <PortfolioTable
                                portfolios={
                                    filteredPortfolios
                                }
                                loading={
                                    loading
                                }
                                onView={
                                    handleView
                                }
                                onEdit={
                                    handleEdit
                                }
                                onDelete={
                                    handleDelete
                                }
                            />

                        </div>

                    </div>


                    {/* ==================================================
                        Empty Filter Result
                    ================================================== */}

                    {!loading &&
                        portfolios.length > 0 &&
                        filteredPortfolios.length === 0 && (

                            <div
                                style={{
                                    borderRadius:
                                        "16px",
                                    border:
                                        "1px solid #e2e8f0",
                                    backgroundColor:
                                        "#ffffff",
                                    padding:
                                        "40px",
                                    textAlign:
                                        "center",
                                    boxShadow:
                                        "0 2px 8px rgba(15, 23, 42, 0.04)",
                                }}
                            >

                                <p
                                    style={{
                                        fontWeight:
                                            600,
                                        color:
                                            "#0f172a",
                                    }}
                                >

                                    {
                                        t.dashboard
                                            .portfolio
                                            .filters
                                            .noResults
                                    }

                                </p>

                                <p
                                    style={{
                                        marginTop:
                                            "8px",
                                        fontSize:
                                            "14px",
                                        color:
                                            "#64748b",
                                    }}
                                >

                                    {
                                        t.dashboard
                                            .portfolio
                                            .filters
                                            .adjust
                                    }

                                </p>

                            </div>

                        )}


                    {/* ==================================================
                        Create Portfolio Modal
                    ================================================== */}

                    <CreatePortfolioModal

                        open={
                            createOpen
                        }

                        onClose={() =>
                            setCreateOpen(
                                false
                            )
                        }

                        onCreated={
                            handleCreated
                        }

                    />


                    {/* ==================================================
                        Edit Portfolio Modal
                    ================================================== */}

                    <EditPortfolioModal

                        open={
                            editOpen
                        }

                        portfolio={
                            selectedPortfolio
                        }

                        onClose={() => {

                            if (
                                !deleteLoading
                            ) {

                                setEditOpen(
                                    false
                                );

                                setSelectedPortfolio(
                                    null
                                );

                            }

                        }}

                        onUpdated={
                            handleUpdated
                        }

                    />


                    {/* ==================================================
                        Portfolio Details
                    ================================================== */}

                    <PortfolioDetailsDrawer

                        open={
                            detailsOpen
                        }

                        portfolio={
                            selectedPortfolio
                        }

                        onClose={() => {

                            setDetailsOpen(
                                false
                            );

                            setSelectedPortfolio(
                                null
                            );

                        }}

                    />


                    {/* ==================================================
                        Delete Portfolio
                    ================================================== */}

                    <DeletePortfolioDialog

                        open={
                            deleteOpen
                        }

                        portfolio={
                            selectedPortfolio
                        }

                        loading={
                            deleteLoading
                        }

                        onLoadingChange={
                            setDeleteLoading
                        }

                        onClose={() => {

                            if (
                                !deleteLoading
                            ) {

                                setDeleteOpen(
                                    false
                                );

                                setSelectedPortfolio(
                                    null
                                );

                            }

                        }}

                        onDeleted={
                            handleDeleted
                        }

                    />

                </div>

            </DashboardShell>

            <Footer />
        </>

    );

}


/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function PortfolioPage() {

    return (

        <AuthGuard
            allowedRoles={[
                "admin",
                "content_manager",
            ]}
        >

            <PortfolioPageContent />

        </AuthGuard>

    );

}