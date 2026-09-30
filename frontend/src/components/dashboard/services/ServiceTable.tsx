"use client";

import {
    Eye,
    Pencil,
    Trash2,
    CheckCircle2,
    XCircle,
    Star,
    StarOff,
    Loader2,
    Image as ImageIcon,
} from "lucide-react";

import Button from "@/components/ui/button";

import {
    Service,
} from "@/types/service";

import {
    activateService,
    deactivateService,
    featureService,
    unfeatureService,
} from "@/services/service";

import { useLanguage } from "@/context/language-context";

interface ServiceTableProps {

    loading: boolean;

    services: Service[];

    reload: () => Promise<void>;

    onView: (service: Service) => void;

    onEdit: (service: Service) => void;

    onDelete: (service: Service) => void;

}

export default function ServiceTable({

    loading,

    services,

    reload,

    onView,

    onEdit,

    onDelete,

}: ServiceTableProps) {

    const { t, language } = useLanguage();

    //----------------------------------------------------------
    // Helper Functions for Number Formatting
    //----------------------------------------------------------

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

    // Format price based on current language
    const formatPrice = (price: number): string => {
        const formattedPrice = formatNumber(price);
        if (language === "fa") {
            return `${formattedPrice} $`;
        }
        return `$${formattedPrice}`;
    };

    //----------------------------------------------------------
    // Service Image URL
    //----------------------------------------------------------

    function getServiceImageUrl(
        service: Service
    ): string | null {

        /*
         * Some APIs return:
         *
         * storage/service-icons/image.jpg
         *
         * /storage/service-icons/image.jpg
         *
         * http://localhost:8000/storage/service-icons/image.jpg
         *
         * This function converts the first two formats
         * into a complete Laravel URL.
         */

        const serviceData =
            service as Service & {
                cover_image?: string | null;
            };

        const imagePath =
            serviceData.icon ||
            serviceData.cover_image ||
            null;

        if (!imagePath) {

            return null;

        }

        /*
         * Already a complete URL.
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
         * Change this only if your Laravel backend
         * runs on a different address.
         */

        const backendUrl =
            (
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:8000"
            )
                .replace(/\/api\/?$/, "")
                .replace(/\/$/, "");

        /*
         * Remove leading slash so we don't
         * accidentally create //storage/...
         */

        const cleanPath =
            imagePath.replace(/^\/+/, "");

        /*
         * If the backend already returned
         * "storage/..." keep it.
         */

        return `${backendUrl}/${cleanPath}`;

    }

    //----------------------------------------------------------
    // Status
    //----------------------------------------------------------

    async function toggleStatus(
        service: Service
    ) {

        if (service.status === "active") {

            await deactivateService(
                service.id
            );

        } else {

            await activateService(
                service.id
            );

        }

        await reload();

    }

    //----------------------------------------------------------
    // Featured
    //----------------------------------------------------------

    async function toggleFeatured(
        service: Service
    ) {

        if (service.is_featured) {

            await unfeatureService(
                service.id
            );

        } else {

            await featureService(
                service.id
            );

        }

        await reload();

    }

    //----------------------------------------------------------
    // Loading
    //----------------------------------------------------------

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

    //----------------------------------------------------------
    // Empty
    //----------------------------------------------------------

    if (services.length === 0) {

        return (

            <div
                style={{
                    width: "100%",
                    padding: "56px 24px",
                    textAlign: "center",
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                }}
            >

                <div
                    style={{
                        width: "56px",
                        height: "56px",
                        margin: "0 auto 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "14px",
                        backgroundColor: "#f1f5f9",
                    }}
                >

                    <ImageIcon
                        style={{
                            width: "26px",
                            height: "26px",
                            color: "#64748b",
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
                    {t.common.noServices || "No services found."}
                </p>

            </div>

        );

    }

    //----------------------------------------------------------
    // Table
    //----------------------------------------------------------

    return (

        <div
            style={{
                width: "100%",
                padding: "16px",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
            }}
        >

            {/* --------------------------------------------------
                Internal Table Frame
            -------------------------------------------------- */}

            <div
                style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                }}
            >

                <div
                    style={{
                        width: "100%",
                        overflowX: "auto",
                        padding: "4px",
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
                                        textAlign: language === "fa" ? "right" : "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {t.dashboard.services.table.service || "Service"}
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: language === "fa" ? "right" : "left",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {t.dashboard.services.table.price || "Price"}
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
                                    {t.dashboard.services.table.order || "Order"}
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
                                    {t.dashboard.services.table.featured || "Featured"}
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
                                    {t.dashboard.services.table.status || "Status"}
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
                                    {t.dashboard.services.table.packages || "Packages"}
                                </th>

                                <th
                                    style={{
                                        padding: "16px 20px",
                                        textAlign: language === "fa" ? "left" : "right",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        color: "#334155",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {t.dashboard.services.table.actions || "Actions"}
                                </th>

                            </tr>

                        </thead>

                        {/* ==================================================
                            Body
                        ================================================== */}

                        <tbody>

                            {
                                services.map(
                                    (service) => {

                                        const imageUrl =
                                            getServiceImageUrl(
                                                service
                                            );

                                        return (

                                            <tr
                                                key={service.id}
                                                style={{
                                                    borderTop:
                                                        "1px solid #e2e8f0",
                                                }}
                                            >

                                                {/* ==================================================
                                                    Service (UPDATED with multilingual support)
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding: "18px 20px",
                                                        verticalAlign: "middle",
                                                        textAlign: language === "fa" ? "right" : "left",
                                                        direction: language === "fa" ? "rtl" : "ltr",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            minWidth: "240px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "14px",
                                                            boxSizing: "border-box",
                                                            direction: "ltr",
                                                        }}
                                                    >

                                                        {/* ==================================================
                                                            Service Information
                                                        ================================================== */}

                                                        <div
                                                            style={{
                                                                flex: "1 1 auto",
                                                                minWidth: "0",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "5px",
                                                                alignItems:
                                                                    language === "fa"
                                                                        ? "flex-end"
                                                                        : "flex-start",
                                                                textAlign:
                                                                    language === "fa"
                                                                        ? "right"
                                                                        : "left",
                                                                direction:
                                                                    language === "fa"
                                                                        ? "rtl"
                                                                        : "ltr",
                                                                order:
                                                                    language === "fa"
                                                                        ? 1
                                                                        : 2,
                                                            }}
                                                        >

                                                            <div
                                                                style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: 700,
                                                                    color: "#0f172a",
                                                                    lineHeight: "1.4",
                                                                    textAlign:
                                                                        language === "fa"
                                                                            ? "right"
                                                                            : "left",
                                                                    direction:
                                                                        language === "fa"
                                                                            ? "rtl"
                                                                            : "ltr",
                                                                }}
                                                            >
                                                                {
                                                                    language === "fa" &&
                                                                    service.title_fa
                                                                        ? service.title_fa
                                                                        : service.title
                                                                }
                                                            </div>

                                                            <div
                                                                style={{
                                                                    fontSize: "12px",
                                                                    color: "#64748b",
                                                                    lineHeight: "1.4",
                                                                    textAlign:
                                                                        language === "fa"
                                                                            ? "right"
                                                                            : "left",
                                                                    direction:
                                                                        language === "fa"
                                                                            ? "rtl"
                                                                            : "ltr",
                                                                }}
                                                            >
                                                                {service.slug}
                                                            </div>

                                                        </div>

                                                        {/* ==================================================
                                                            Image / Icon Frame
                                                        ================================================== */}

                                                        <div
                                                            style={{
                                                                width: "64px",
                                                                height: "64px",
                                                                minWidth: "64px",
                                                                flexShrink: 0,
                                                                padding: "4px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: "12px",
                                                                border: "1px solid #dbeafe",
                                                                backgroundColor: "#eff6ff",
                                                                boxSizing: "border-box",
                                                                overflow: "hidden",
                                                                boxShadow:
                                                                    "0 2px 6px rgba(37, 99, 235, 0.08)",
                                                                order:
                                                                    language === "fa"
                                                                        ? 2
                                                                        : 1,
                                                            }}
                                                        >

                                                            {
                                                                imageUrl ? (

                                                                    <img
                                                                        src={imageUrl}
                                                                        alt={
                                                                            service.title ||
                                                                            "Service"
                                                                        }
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            display: "block",
                                                                            objectFit: "cover",
                                                                            borderRadius: "8px",
                                                                        }}
                                                                        onError={(event) => {

                                                                            event.currentTarget.style.display =
                                                                                "none";

                                                                            const fallback =
                                                                                event.currentTarget
                                                                                    .parentElement
                                                                                    ?.querySelector(
                                                                                        "[data-image-fallback]"
                                                                                    ) as HTMLElement | null;

                                                                            if (fallback) {

                                                                                fallback.style.display =
                                                                                    "flex";

                                                                            }

                                                                        }}
                                                                    />

                                                                ) : null
                                                            }

                                                            {/* Fallback Icon */}

                                                            <div
                                                                data-image-fallback
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    display:
                                                                        imageUrl
                                                                            ? "none"
                                                                            : "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    borderRadius: "8px",
                                                                    backgroundColor: "#dbeafe",
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

                                                        </div>

                                                    </div>
                                                </td>

                                                {/* ==================================================
                                                    Price
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        color:
                                                            "#334155",
                                                        fontSize:
                                                            "14px",
                                                        verticalAlign:
                                                            "middle",
                                                        textAlign: language === "fa" ? "right" : "left",
                                                        direction: "ltr",
                                                    }}
                                                >

                                                    {
                                                        service.starting_price
                                                            ? formatPrice(Number(service.starting_price))
                                                            : "-"
                                                    }

                                                </td>

                                                {/* ==================================================
                                                    Order
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        textAlign:
                                                            "center",
                                                        color:
                                                            "#334155",
                                                        fontSize:
                                                            "14px",
                                                        verticalAlign:
                                                            "middle",
                                                        direction: "ltr",
                                                    }}
                                                >

                                                    {
                                                        formatNumber(
                                                            Number(service.display_order ?? 0)
                                                        )
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
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >

                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                toggleFeatured(
                                                                    service
                                                                )
                                                            }
                                                        >

                                                            {
                                                                service.is_featured
                                                                    ? (

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

                                                                    )
                                                                    : (

                                                                        <StarOff
                                                                            style={{
                                                                                width:
                                                                                    "20px",
                                                                                height:
                                                                                    "20px",
                                                                                color:
                                                                                    "#64748b",
                                                                            }}
                                                                        />

                                                                    )
                                                            }

                                                        </Button>

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

                                                    <div
                                                        style={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >

                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                toggleStatus(
                                                                    service
                                                                )
                                                            }
                                                        >

                                                            {
                                                                service.status ===
                                                                "active"

                                                                    ? (

                                                                        <CheckCircle2
                                                                            style={{
                                                                                width:
                                                                                    "20px",
                                                                                height:
                                                                                    "20px",
                                                                                color:
                                                                                    "#16a34a",
                                                                            }}
                                                                        />

                                                                    )

                                                                    : (

                                                                        <XCircle
                                                                            style={{
                                                                                width:
                                                                                    "20px",
                                                                                height:
                                                                                    "20px",
                                                                                color:
                                                                                    "#dc2626",
                                                                            }}
                                                                        />

                                                                    )
                                                            }

                                                        </Button>

                                                    </div>

                                                </td>

                                                {/* ==================================================
                                                    Packages
                                                ================================================== */}

                                                <td
                                                    style={{
                                                        padding:
                                                            "18px 20px",
                                                        textAlign:
                                                            "center",
                                                        color:
                                                            "#334155",
                                                        fontSize:
                                                            "14px",
                                                        verticalAlign:
                                                            "middle",
                                                        direction: "ltr",
                                                    }}
                                                >

                                                    {
                                                        formatNumber(Number(service.packages_count ?? 0))
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
                                                            justifyContent: language === "fa" ? "flex-start" : "flex-end",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            direction: "ltr",
                                                        }}
                                                    >
                                                        {/* View */}
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={() =>
                                                                onView(service)
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
                                                                onEdit(service)
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
                                                                onDelete(service)
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