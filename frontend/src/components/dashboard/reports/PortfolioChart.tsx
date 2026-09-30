"use client";

import { useMemo } from "react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { useLanguage } from "@/context/language-context";

import type { ReportStatistics } from "@/types/report";

interface Props {
    statistics: ReportStatistics;
}

// Custom styles for the component
const styles = {
    container: {
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        overflow: "hidden" as const,
        height: "100%",
        minHeight: "420px",
    },
    gradientBar: {
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #f59e0b, #f97316, #ef4444)",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "20px",
        padding: "0 4px",
    },
    titleSection: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "4px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        letterSpacing: "-0.01em",
        margin: 0,
    },
    subtitle: {
        fontSize: "14px",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    statsContainer: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.6)",
        padding: "8px 16px",
        borderRadius: "12px",
        border: "1px solid rgba(226, 232, 240, 0.4)",
    },
    statItem: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "2px",
    },
    statLabel: {
        fontSize: "11px",
        fontWeight: "500",
        color: "#94a3b8",
        textTransform: "uppercase" as const,
        letterSpacing: "0.5px",
    },
    statValue: {
        fontSize: "16px",
        fontWeight: "700",
        color: "#0f172a",
    },
    chartContainer: {
        height: "320px",
        padding: "8px 0",
        marginTop: "4px",
    },
    noDataContainer: {
        height: "320px",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        color: "#94a3b8",
    },
    noDataIcon: {
        fontSize: "48px",
        opacity: 0.5,
    },
    noDataText: {
        fontSize: "15px",
        fontWeight: "500",
        color: "#94a3b8",
    },
    legendWrapper: {
        marginTop: "12px",
        padding: "0 8px",
    },
    tooltipContainer: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(226, 232, 240, 0.5)",
        minWidth: "160px",
    },
    tooltipLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "6px",
    },
    tooltipValue: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#1e293b",
    },
    tooltipPercent: {
        fontSize: "13px",
        color: "#94a3b8",
        marginTop: "4px",
    },
    decorationDot: {
        position: "absolute" as const,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.06), transparent)",
        top: "-20px",
        right: "-20px",
        pointerEvents: "none" as const,
    },
    decorationDot2: {
        position: "absolute" as const,
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.05), transparent)",
        bottom: "-40px",
        left: "-40px",
        pointerEvents: "none" as const,
    },
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatNumber, t }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const total = data.total || 0;
        const percent = total > 0 ? ((data.value / total) * 100).toFixed(1) : "0";
        
        return (
            <div style={styles.tooltipContainer}>
                <div style={styles.tooltipLabel}>
                    {data.name}
                </div>
                <div style={styles.tooltipValue}>
                    {formatNumber(data.value)}
                </div>
                <div style={styles.tooltipPercent}>
                    {formatNumber(parseFloat(percent))}% • {t.dashboard.reports.portfolio}
                </div>
            </div>
        );
    }
    return null;
};

export default function PortfolioChart({ statistics }: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    // Format numbers based on language
    const formatNumber = (num: number) => {
        if (num === undefined || num === null || isNaN(num)) return "0";
        
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const formatted = Math.round(num).toString();
        
        if (isRTL) {
            return formatted.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
        }
        return formatted;
    };

    const totalPortfolios = statistics.totalPortfolios || 0;
    const featuredPortfolios = statistics.featuredPortfolios || 0;
    const normalPortfolios = Math.max(0, totalPortfolios - featuredPortfolios);

    const data = useMemo(() => {
        const chartData = [
            {
                name: t.dashboard.reports.featuredPortfolio,
                value: featuredPortfolios,
                color: "#F59E0B",
                gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
                icon: "⭐",
                total: totalPortfolios,
            },
            {
                name: t.dashboard.reports.normalPortfolio,
                value: normalPortfolios,
                color: "#3B82F6",
                gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
                icon: "📁",
                total: totalPortfolios,
            },
        ].filter(item => item.value > 0);

        // If no data, return empty array
        return chartData;
    }, [featuredPortfolios, normalPortfolios, totalPortfolios, t]);

    // Custom legend renderer
    const renderLegend = (props: any) => {
        const { payload } = props;
        
        return (
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px 32px",
                padding: "8px 4px",
                direction: isRTL ? "rtl" : "ltr",
            }}>
                {payload.map((entry: any, index: number) => {
                    const item = data[index];
                    return (
                        <div
                            key={`legend-${index}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "13px",
                                color: "#334155",
                                fontWeight: "500",
                            }}
                        >
                            <span style={{
                                display: "inline-block",
                                width: "14px",
                                height: "14px",
                                borderRadius: "4px",
                                background: entry.color,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            }} />
                            <span>{entry.value}</span>
                            <span style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                                fontWeight: "400",
                            }}>
                                ({formatNumber(item?.value || 0)})
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const hasData = data.some(item => item.value > 0);

    return (
        <div style={styles.container}>
            {/* Gradient bar at top */}
            <div style={styles.gradientBar} />

            {/* Decorative dots */}
            <div style={styles.decorationDot} />
            <div style={styles.decorationDot2} />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h3 style={styles.title}>
                        {t.dashboard.reports.portfolioChart}
                    </h3>
                    <div style={styles.subtitle}>
                        <span>{t.dashboard.reports.totalPortfolio}:</span>
                        <span style={{
                            fontWeight: "600",
                            color: "#0f172a",
                            fontSize: "15px",
                        }}>
                            {formatNumber(totalPortfolios)}
                        </span>
                    </div>
                </div>
                <div style={styles.statsContainer}>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>⭐ {t.dashboard.reports.featured}</span>
                        <span style={{
                            ...styles.statValue,
                            color: "#D97706",
                        }}>
                            {formatNumber(featuredPortfolios)}
                        </span>
                    </div>
                    <div style={{
                        width: "1px",
                        height: "30px",
                        background: "#e2e8f0",
                    }} />
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>📁 {t.dashboard.reports.normal}</span>
                        <span style={{
                            ...styles.statValue,
                            color: "#2563EB",
                        }}>
                            {formatNumber(normalPortfolios)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {!hasData ? (
                <div style={styles.noDataContainer}>
                    <div style={styles.noDataIcon}>📭</div>
                    <div style={styles.noDataText}>
                        {t.dashboard.reports.noPortfolioData}
                    </div>
                </div>
            ) : (
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="45%"
                                outerRadius={110}
                                innerRadius={60}
                                paddingAngle={4}
                                label={({ percent, name, value }) => {
                                    const percentage = percent ? (percent * 100).toFixed(0) : "0";
                                    // Show label for segments with more than 8%
                                    if (percent && percent > 0.08) {
                                        return `${formatNumber(parseInt(percentage))}%`;
                                    }
                                    return "";
                                }}
                                labelLine={false}
                                animationDuration={800}
                                animationBegin={0}
                                animationEasing="ease-out"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={entry.color}
                                        stroke="white"
                                        strokeWidth={2}
                                        style={{
                                            cursor: "pointer",
                                            transition: "transform 0.2s ease, filter 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            const element = e.currentTarget;
                                            element.style.filter = "brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.15))";
                                            element.style.transform = "scale(1.03)";
                                        }}
                                        onMouseLeave={(e) => {
                                            const element = e.currentTarget;
                                            element.style.filter = "none";
                                            element.style.transform = "scale(1)";
                                        }}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                content={<CustomTooltip t={t} formatNumber={formatNumber} />}
                            />

                            <Legend
                                content={renderLegend}
                                verticalAlign="bottom"
                                height={60}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Decorative bottom gradient */}
            <div style={{
                position: "absolute" as const,
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.2), transparent)",
            }} />
        </div>
    );
}