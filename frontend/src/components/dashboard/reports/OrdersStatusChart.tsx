"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import type { ReportStatistics } from "@/types/report";

import { useLanguage } from "@/context/language-context";

interface Props {
    statistics: ReportStatistics;
}

// Custom styles for the component
const styles = {
    container: {
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        overflow: "hidden" as const,
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
    },
    subtitle: {
        fontSize: "14px",
        color: "#64748b",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    totalBadge: {
        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
        color: "white",
        padding: "4px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.25)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    },
    gradientBar: {
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)",
    },
    chartContainer: {
        height: "340px",
        padding: "8px 0",
    },
    noDataContainer: {
        height: "340px",
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
    },
    tooltipLabel: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#0f172a",
        marginBottom: "4px",
    },
    tooltipValue: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#1e293b",
    },
    tooltipSublabel: {
        fontSize: "12px",
        color: "#94a3b8",
        marginTop: "2px",
    },
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, t, formatNumber }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const percent = data.percent ? (data.percent * 100).toFixed(1) : 0;
        
        return (
            <div style={styles.tooltipContainer}>
                <div style={styles.tooltipLabel}>
                    {data.name}
                </div>
                <div style={styles.tooltipValue}>
                    {formatNumber(data.value)}
                </div>
                <div style={styles.tooltipSublabel}>
                    {percent}% • {t.dashboard.reports.orders}
                </div>
            </div>
        );
    }
    return null;
};

export default function OrdersStatusChart({ statistics }: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    // Format numbers based on language
    const formatNumber = (num: number) => {
        if (num === undefined || num === null) return "0";
        
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const formatted = num.toString();
        
        if (isRTL) {
            return formatted.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
        }
        return formatted;
    };

    const data = [
        {
            name: t.dashboard.reports.pendingOrders,
            value: statistics.pendingOrders,
            color: "#F59E0B",
            gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
            icon: "⏳",
        },
        {
            name: t.dashboard.reports.inProgressOrders,
            value: statistics.inProgressOrders,
            color: "#3B82F6",
            gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
            icon: "🔄",
        },
        {
            name: t.dashboard.reports.completedOrders,
            value: statistics.completedOrders,
            color: "#10B981",
            gradient: "linear-gradient(135deg, #10B981, #059669)",
            icon: "✅",
        },
        {
            name: t.dashboard.reports.deliveredOrders,
            value: statistics.deliveredOrders,
            color: "#6366F1",
            gradient: "linear-gradient(135deg, #6366F1, #4F46E5)",
            icon: "📦",
        },
        {
            name: t.dashboard.reports.cancelledOrders,
            value: statistics.cancelledOrders,
            color: "#EF4444",
            gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
            icon: "❌",
        },
    ].filter(item => item.value > 0);

    // Custom legend renderer
    const renderLegend = (props: any) => {
        const { payload } = props;
        
        return (
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px 20px",
                padding: "8px 4px",
                direction: isRTL ? "rtl" : "ltr",
            }}>
                {payload.map((entry: any, index: number) => (
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
                            width: "12px",
                            height: "12px",
                            borderRadius: "4px",
                            background: entry.color,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                        }} />
                        <span>{entry.value}</span>
                        <span style={{
                            fontSize: "12px",
                            color: "#94a3b8",
                            fontWeight: "400",
                        }}>
                            ({formatNumber(data[index]?.value || 0)})
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Gradient bar at top */}
            <div style={styles.gradientBar} />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <h3 style={styles.title}>
                        {t.dashboard.reports.orderStatusChart}
                    </h3>
                    <div style={styles.subtitle}>
                        <span>{t.dashboard.reports.totalOrders}:</span>
                        <span style={styles.totalBadge}>
                            <span style={{ fontSize: "16px" }}>📊</span>
                            {formatNumber(statistics.totalOrders)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {data.length === 0 ? (
                <div style={styles.noDataContainer}>
                    <div style={styles.noDataIcon}>📭</div>
                    <div style={styles.noDataText}>
                        {t.dashboard.reports.noData}
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
                                    // Show label for segments with more than 5%
                                    if (percent && percent > 0.05) {
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
                                            element.style.filter = "brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.15))";
                                            element.style.transform = "scale(1.02)";
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
                background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
            }} />
        </div>
    );
}