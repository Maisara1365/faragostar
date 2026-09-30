"use client";

import {
    Eye,
    Pencil,
    Trash2,
    Star,
    StarOff,
    CheckCircle2,
    XCircle,
    Globe,
    Image as ImageIcon,
    Loader2,
} from "lucide-react";

import Button from "@/components/ui/button";

import type {
    Portfolio,
} from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

interface PortfolioTableProps {

    portfolios: Portfolio[];

    loading: boolean;

    onView: (
        portfolio: Portfolio
    ) => void;

    onEdit: (
        portfolio: Portfolio
    ) => void;

    onDelete: (
        portfolio: Portfolio
    ) => void;

}

export default function PortfolioTable({

    portfolios,

    loading,

    onView,

    onEdit,

    onDelete,

}: PortfolioTableProps) {

    const { t } = useLanguage();

    // ==========================================================
    // Portfolio Image URL
    // ==========================================================

    function getPortfolioImageUrl(
        portfolio: Portfolio
    ): string | null {

        const portfolioData =
            portfolio as Portfolio & {
                image?: string | null;
                cover_image?: string | null;
                image_url?: string | null;
                cover_image_url?: string | null;
            };

        /*
         * Support the possible image fields returned
         * by the backend.
         */

        const imagePath =
            portfolioData.image ||
            portfolioData.cover_image ||
            portfolioData.image_url ||
            portfolioData.cover_image_url ||
            null;

        if (!imagePath) {

            return null;

        }

        /*
         * If Laravel already returned a complete URL,
         * use it directly.
         */

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://")
        ) {

            return imagePath;

        }

        /*
         * Laravel backend URL.
         *
         * If NEXT_PUBLIC_API_URL is:
         *
         * http://localhost:8000/api
         *
         * the /api part is removed because storage
         * is served from the Laravel root.
         */

        const backendUrl =
            (
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:8000"
            )
                .replace(/\/api\/?$/, "")
                .replace(/\/$/, "");

        /*
         * Remove leading slash.
         */

        const cleanPath =
            imagePath.replace(/^\/+/, "");

        /*
         * If backend returned:
         *
         * storage/portfolios/example.jpg
         *
         * result becomes:
         *
         * http://localhost:8000/storage/portfolios/example.jpg
         */

        return `${backendUrl}/${cleanPath}`;

    }

    // ==========================================================
    // Loading
    // ==========================================================

    if (loading) {

        return (

            <div
                style={{
                    width: "100%",
                    padding: "48px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                }}
            >

                <Loader2
                    style={{
                        width: "32px",
                        height: "32px",
                        color: "#2563eb",
                        animation:
                            "spin 1s linear infinite",
                    }}
                />

            </div>

        );

    }

    // ==========================================================
    // Empty
    // ==========================================================

    if (!portfolios.length) {

        return (

            <div
                style={{
                    width: "100%",
                    padding: "56px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                }}
            >

                <div
                    style={{
                        width: "56px",
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "14px",
                        backgroundColor: "#eff6ff",
                        marginBottom: "16px",
                    }}
                >

                    <ImageIcon
                        style={{
                            width: "28px",
                            height: "28px",
                            color: "#2563eb",
                        }}
                    />

                </div>

                <p
                    style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "14px",
                    }}
                >
                    {t.dashboard.portfolio.empty.title}
                </p>

            </div>

        );

    }

    // ==========================================================
    // Table
    // ==========================================================

    return (

        <div
            style={{
                width: "100%",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow:
                    "0 4px 12px rgba(15, 23, 42, 0.05)",
                boxSizing: "border-box",
            }}
        >

            {/* ==================================================
                Inner Table Frame
            ================================================== */}

            <div
                style={{
                    width: "100%",
                    padding: "4px",
                    borderRadius: "13px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
            >

                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        boxSizing: "border-box",
                    }}
                >

                    <table
                        className="min-w-full"
                        style={{
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: 0,
                        }}
                    >

                        {/* ==================================================
                            Header
                        ================================================== */}

                        <thead
                            style={{
                                backgroundColor: "#f8fafc",
                            }}
                        >

                            <tr>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.image
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.title
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.category
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.client
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.completed
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "center",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.featured
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "center",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.status
                                    }
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: "center",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {
                                        t.dashboard.portfolio
                                            .table.actions
                                    }
                                </th>

                            </tr>

                        </thead>

                        {/* ==================================================
                            Body
                        ================================================== */}

                        <tbody>

                            {
                                portfolios.map(
                                    (portfolio) => {

                                        const imageUrl =
                                            getPortfolioImageUrl(
                                                portfolio
                                            );

                                        return (

                                            <tr
                                                key={
                                                    portfolio.id
                                                }
                                                style={{
                                                    borderTop:
                                                        "1px solid #e2e8f0",
                                                    transition:
                                                        "background-color 0.2s ease",
                                                }}
                                            >

                                                {/* ==================================================
                                                    Image
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: "104px",
                                                            height: "72px",
                                                            padding: "4px",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            borderRadius:
                                                                "12px",
                                                            border:
                                                                "1px solid #dbeafe",
                                                            backgroundColor:
                                                                "#eff6ff",
                                                            overflow:
                                                                "hidden",
                                                            boxSizing:
                                                                "border-box",
                                                            boxShadow:
                                                                "0 2px 6px rgba(37, 99, 235, 0.08)",
                                                        }}
                                                    >

                                                        {
                                                            imageUrl ? (

                                                                <img
                                                                    src={
                                                                        imageUrl
                                                                    }
                                                                    alt={
                                                                        portfolio.title ||
                                                                        "Portfolio"
                                                                    }
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                        height:
                                                                            "100%",
                                                                        display:
                                                                            "block",
                                                                        objectFit:
                                                                            "cover",
                                                                        borderRadius:
                                                                            "8px",
                                                                    }}
                                                                    onError={(
                                                                        event
                                                                    ) => {

                                                                        /*
                                                                         * Hide broken image.
                                                                         */

                                                                        event
                                                                            .currentTarget
                                                                            .style
                                                                            .display =
                                                                            "none";

                                                                        /*
                                                                         * Show fallback icon.
                                                                         */

                                                                        const fallback =
                                                                            event
                                                                                .currentTarget
                                                                                .parentElement
                                                                                ?.querySelector(
                                                                                    "[data-portfolio-image-fallback]"
                                                                                ) as HTMLElement | null;

                                                                        if (
                                                                            fallback
                                                                        ) {

                                                                            fallback.style.display =
                                                                                "flex";

                                                                        }

                                                                    }}
                                                                />

                                                            ) : null
                                                        }

                                                        {/* ==================================================
                                                            Image Fallback
                                                        ================================================== */}

                                                        <div
                                                            data-portfolio-image-fallback
                                                            style={{
                                                                width:
                                                                    "100%",
                                                                height:
                                                                    "100%",
                                                                display:
                                                                    imageUrl
                                                                        ? "none"
                                                                        : "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                                borderRadius:
                                                                    "8px",
                                                                backgroundColor:
                                                                    "#dbeafe",
                                                            }}
                                                        >

                                                            <ImageIcon
                                                                style={{
                                                                    width:
                                                                        "30px",
                                                                    height:
                                                                        "30px",
                                                                    color:
                                                                        "#2563eb",
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* ==================================================
                                                    Title
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            flexDirection:
                                                                "column",
                                                            gap: "6px",
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    700,
                                                                color:
                                                                    "#0f172a",
                                                            }}
                                                        >
                                                            {
                                                                portfolio.title
                                                            }
                                                        </div>

                                                        <div
                                                            style={{
                                                                display:
                                                                    "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap:
                                                                    "6px",
                                                                fontSize:
                                                                    "12px",
                                                                color:
                                                                    "#64748b",
                                                            }}
                                                        >

                                                            <Globe
                                                                style={{
                                                                    width:
                                                                        "14px",
                                                                    height:
                                                                        "14px",
                                                                }}
                                                            />

                                                            {
                                                                portfolio.slug
                                                            }

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* ==================================================
                                                    Category
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            "#334155",
                                                    }}
                                                >

                                                    {
                                                        portfolio.category
                                                    }

                                                </td>

                                                {/* ==================================================
                                                    Client
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            "#334155",
                                                    }}
                                                >

                                                    {
                                                        portfolio.client_name ||
                                                        "-"
                                                    }

                                                </td>

                                                {/* ==================================================
                                                    Completed
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                        fontSize:
                                                            "14px",
                                                        color:
                                                            "#334155",
                                                        whiteSpace:
                                                            "nowrap",
                                                    }}
                                                >

                                                    {
                                                        portfolio.completion_date ||
                                                        "-"
                                                    }

                                                </td>

                                                {/* ==================================================
                                                    Featured
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        textAlign:
                                                            "center",
                                                        verticalAlign:
                                                            "middle",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width:
                                                                "36px",
                                                            height:
                                                                "36px",
                                                            margin:
                                                                "0 auto",
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            borderRadius:
                                                                "9px",
                                                            backgroundColor:
                                                                portfolio.is_featured
                                                                    ? "#fef9c3"
                                                                    : "#f8fafc",
                                                        }}
                                                    >

                                                        {
                                                            portfolio.is_featured ? (

                                                                <Star
                                                                    style={{
                                                                        width:
                                                                            "20px",
                                                                        height:
                                                                            "20px",
                                                                        fill:
                                                                            "#facc15",
                                                                        color:
                                                                            "#eab308",
                                                                    }}
                                                                />

                                                            ) : (

                                                                <StarOff
                                                                    style={{
                                                                        width:
                                                                            "20px",
                                                                        height:
                                                                            "20px",
                                                                        color:
                                                                            "#94a3b8",
                                                                    }}
                                                                />

                                                            )
                                                        }

                                                    </div>

                                                </td>

                                                {/* ==================================================
                                                    Status
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        textAlign:
                                                            "center",
                                                        verticalAlign:
                                                            "middle",
                                                    }}
                                                >

                                                    {
                                                        portfolio.status ===
                                                        "active"

                                                            ? (

                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "inline-flex",
                                                                        alignItems:
                                                                            "center",
                                                                        justifyContent:
                                                                            "center",
                                                                        gap:
                                                                            "7px",
                                                                        padding:
                                                                            "7px 12px",
                                                                        borderRadius:
                                                                            "999px",
                                                                        backgroundColor:
                                                                            "#dcfce7",
                                                                        color:
                                                                            "#15803d",
                                                                        fontSize:
                                                                            "12px",
                                                                        fontWeight:
                                                                            700,
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                    }}
                                                                >

                                                                    <CheckCircle2
                                                                        style={{
                                                                            width:
                                                                                "16px",
                                                                            height:
                                                                                "16px",
                                                                        }}
                                                                    />

                                                                    {
                                                                        t.common.active
                                                                    }

                                                                </span>

                                                            )

                                                            : (

                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "inline-flex",
                                                                        alignItems:
                                                                            "center",
                                                                        justifyContent:
                                                                            "center",
                                                                        gap:
                                                                            "7px",
                                                                        padding:
                                                                            "7px 12px",
                                                                        borderRadius:
                                                                            "999px",
                                                                        backgroundColor:
                                                                            "#fee2e2",
                                                                        color:
                                                                            "#b91c1c",
                                                                        fontSize:
                                                                            "12px",
                                                                        fontWeight:
                                                                            700,
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                    }}
                                                                >

                                                                    <XCircle
                                                                        style={{
                                                                            width:
                                                                                "16px",
                                                                            height:
                                                                                "16px",
                                                                        }}
                                                                    />

                                                                    {
                                                                        t.common.inactive
                                                                    }

                                                                </span>

                                                            )
                                                    }

                                                </td>

                                                {/* ==================================================
                                                    Actions
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        verticalAlign:
                                                            "middle",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            gap: "8px",
                                                        }}
                                                    >
                                                        {/* View */}
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() =>
                                                                onView(portfolio)
                                                            }
                                                            style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                minWidth: "38px",
                                                                padding: "0",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: "9px",
                                                                backgroundColor: "#ffffff",
                                                                border: "1px solid #cbd5e1",
                                                                color: "#475569",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Eye
                                                                style={{
                                                                    display: "block",
                                                                    width: "18px",
                                                                    height: "18px",
                                                                    color: "#475569",
                                                                    stroke: "#475569",
                                                                    strokeWidth: 2,
                                                                }}
                                                            />
                                                        </Button>

                                                        {/* Edit */}
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() =>
                                                                onEdit(portfolio)
                                                            }
                                                            style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                minWidth: "38px",
                                                                padding: "0",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: "9px",
                                                                backgroundColor: "#eff6ff",
                                                                border: "1px solid #bfdbfe",
                                                                color: "#2563eb",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <Pencil
                                                                style={{
                                                                    display: "block",
                                                                    width: "18px",
                                                                    height: "18px",
                                                                    color: "#2563eb",
                                                                    stroke: "#2563eb",
                                                                    strokeWidth: 2,
                                                                }}
                                                            />
                                                        </Button>

                                                        {/* Delete */}
                                                        <Button
                                                            size="icon"
                                                            variant="danger"
                                                            onClick={() =>
                                                                onDelete(portfolio)
                                                            }
                                                            style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                minWidth: "38px",
                                                                padding: "0",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: "9px",
                                                                backgroundColor: "#fee2e2",
                                                                border: "1px solid #fecaca",
                                                                color: "#dc2626",
                                                                cursor: "pointer",
                                                                boxSizing: "border-box",
                                                            }}
                                                        >
                                                            <Trash2
                                                                style={{
                                                                    display: "block",
                                                                    width: "18px",
                                                                    height: "18px",
                                                                    minWidth: "18px",
                                                                    minHeight: "18px",
                                                                    color: "#dc2626",
                                                                    stroke: "#dc2626",
                                                                    strokeWidth: 2.2,
                                                                    opacity: 1,
                                                                    visibility: "visible",
                                                                }}
                                                            />
                                                        </Button>
                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}