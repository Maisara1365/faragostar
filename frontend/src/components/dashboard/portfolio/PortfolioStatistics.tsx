"use client";

import {
    FolderKanban,
    CheckCircle2,
    XCircle,
    Star,
} from "lucide-react";

import type { Portfolio } from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

interface PortfolioStatisticsProps {
    portfolios: Portfolio[];
}

export default function PortfolioStatistics({
    portfolios,
}: PortfolioStatisticsProps) {
    const { t, language } = useLanguage();

    const total = portfolios.length;

    const active = portfolios.filter(
        (item) => item.status === "active"
    ).length;

    const inactive = portfolios.filter(
        (item) => item.status === "inactive"
    ).length;

    const featured = portfolios.filter(
        (item) => item.is_featured
    ).length;

    // Helper function to convert numbers to Persian digits
    const toPersianDigits = (num: number): string => {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return num
            .toString()
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    // Function to format number based on current language
    const formatNumber = (num: number): string => {
        if (language === "fa") {
            return toPersianDigits(num);
        }
        return num.toString();
    };

    const statistics = [
        {
            title: t.dashboard.portfolio.statistics.total,
            value: total,
            formattedValue: formatNumber(total),
            icon: FolderKanban,
            color: "#2563eb",
            bg: "#eff6ff",
            border: "#dbeafe",
        },
        {
            title: t.dashboard.portfolio.statistics.active,
            value: active,
            formattedValue: formatNumber(active),
            icon: CheckCircle2,
            color: "#16a34a",
            bg: "#f0fdf4",
            border: "#dcfce7",
        },
        {
            title: t.dashboard.portfolio.statistics.inactive,
            value: inactive,
            formattedValue: formatNumber(inactive),
            icon: XCircle,
            color: "#dc2626",
            bg: "#fef2f2",
            border: "#fee2e2",
        },
        {
            title: t.dashboard.portfolio.statistics.featured,
            value: featured,
            formattedValue: formatNumber(featured),
            icon: Star,
            color: "#ca8a04",
            bg: "#fefce8",
            border: "#fef3c7",
        },
    ];

    return (
        <div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            style={{
                width: "100%",
                padding: "4px",
                boxSizing: "border-box",
            }}
        >
            {statistics.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        style={{
                            width: "100%",
                            minHeight: "150px",
                            padding: "24px",
                            borderRadius: "20px",
                            border: "1px solid #e2e8f0",
                            background: "#ffffff",
                            boxSizing: "border-box",
                            boxShadow:
                                "0 4px 12px rgba(15, 23, 42, 0.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                height: "100%",
                                gap: "16px",
                            }}
                        >
                            {/* Text */}

                            <div
                                style={{
                                    minWidth: 0,
                                    padding: "4px",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        padding: "2px 0",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#64748b",
                                        lineHeight: "1.5",
                                    }}
                                >
                                    {stat.title}
                                </p>

                                <h3
                                    style={{
                                        margin: "8px 0 0 0",
                                        padding: "2px 0",
                                        fontSize: "32px",
                                        lineHeight: "1.2",
                                        fontWeight: 700,
                                        color: "#0f172a",
                                        direction: language === "fa" ? "ltr" : "ltr",
                                    }}
                                >
                                    {stat.formattedValue}
                                </h3>
                            </div>

                            {/* Icon */}

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "56px",
                                    height: "56px",
                                    minWidth: "56px",
                                    borderRadius: "16px",
                                    background: stat.bg,
                                    border: `1px solid ${stat.border}`,
                                    boxSizing: "border-box",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "26px",
                                        height: "26px",
                                        color: stat.color,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}