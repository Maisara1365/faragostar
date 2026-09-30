"use client";

import Link from "next/link";

import { Eye, ArrowUpRight, Calendar, User, Package, Hash } from "lucide-react";

import Button from "@/components/ui/button";

import { useLanguage } from "@/context/language-context";

import type { Order } from "@/types/order";

interface Props {
    orders: Order[];
}

// Custom styles for the component
const styles = {
    container: {
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        overflow: "hidden" as const,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
    },
    gradientBar: {
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #10b981, #34d399, #6ee7b7)",
        zIndex: 10,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
        background: "rgba(255, 255, 255, 0.4)",
        flexWrap: "wrap" as const,
        gap: "12px",
    },
    titleSection: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    titleIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #10b981, #059669)",
        color: "white",
        fontSize: "18px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        letterSpacing: "-0.01em",
        margin: 0,
    },
    badge: {
        background: "linear-gradient(135deg, #10b981, #059669)",
        color: "white",
        padding: "2px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
        marginLeft: "8px",
    },
    statusFilter: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        color: "#64748b",
        background: "rgba(255, 255, 255, 0.6)",
        padding: "4px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(226, 232, 240, 0.4)",
    },
    tableWrapper: {
        overflowX: "auto" as const,
        padding: "4px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
        fontSize: "14px",
    },
    thead: {
        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
        borderBottom: "2px solid #bbf7d0",
    },
    th: {
        padding: "14px 20px",
        textAlign: "left" as const,
        fontWeight: "600",
        color: "#065f46",
        fontSize: "12px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.5px",
        whiteSpace: "nowrap" as const,
        position: "relative" as const,
    },
    thRTL: {
        textAlign: "right" as const,
    },
    thIcon: {
        marginRight: "6px",
    },
    tbody: {
        background: "white",
    },
    tr: {
        borderBottom: "1px solid #f0fdf4",
        transition: "all 0.2s ease",
        cursor: "default" as const,
    },
    trHover: {
        background: "#f0fdf4",
        transform: "scale(1.002)",
    },
    td: {
        padding: "14px 20px",
        color: "#1e293b",
        verticalAlign: "middle" as const,
    },
    tdFirst: {
        fontWeight: "500",
        color: "#0f172a",
    },
    orderNumber: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: "600",
        color: "#065f46",
        fontSize: "13px",
    },
    customerInfo: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    customerAvatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #10b981, #059669)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "600",
        flexShrink: 0,
    },
    serviceBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 10px",
        borderRadius: "6px",
        background: "#f0fdf4",
        fontSize: "13px",
        fontWeight: "500",
        color: "#065f46",
        border: "1px solid #bbf7d0",
    },
    statusBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.3px",
        transition: "all 0.2s ease",
    },
    statusDot: {
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        animation: "pulse 2s infinite",
    },
    actionButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "rgba(16, 185, 129, 0.1)",
        color: "#065f46",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        textDecoration: "none",
    },
    noData: {
        padding: "48px 20px",
        textAlign: "center" as const,
        color: "#94a3b8",
        fontSize: "15px",
        fontWeight: "500",
    },
    noDataIcon: {
        fontSize: "48px",
        display: "block",
        marginBottom: "12px",
        opacity: 0.5,
    },
    footer: {
        padding: "12px 24px",
        borderTop: "1px solid rgba(226, 232, 240, 0.6)",
        background: "rgba(255, 255, 255, 0.4)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "13px",
        color: "#64748b",
        flexWrap: "wrap" as const,
        gap: "8px",
    },
    footerStats: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap" as const,
    },
    footerStatItem: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
    footerStatValue: {
        fontWeight: "600",
        color: "#0f172a",
    },
};

// Status configuration with icons and colors
const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; icon: string; gradient: string }> = {
    completed: {
        bg: "#dcfce7",
        text: "#166534",
        dot: "#22c55e",
        icon: "✅",
        gradient: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
    },
    in_progress: {
        bg: "#dbeafe",
        text: "#1e40af",
        dot: "#3b82f6",
        icon: "🔄",
        gradient: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    },
    pending: {
        bg: "#fef9c3",
        text: "#854d0e",
        dot: "#eab308",
        icon: "⏳",
        gradient: "linear-gradient(135deg, #fef9c3, #fde68a)",
    },
    delivered: {
        bg: "#d1fae5",
        text: "#065f46",
        dot: "#10b981",
        icon: "📦",
        gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    },
    cancelled: {
        bg: "#fee2e2",
        text: "#991b1b",
        dot: "#ef4444",
        icon: "❌",
        gradient: "linear-gradient(135deg, #fee2e2, #fecaca)",
    },
};

function getStatusStyle(status: string) {
    const config = STATUS_CONFIG[status.toLowerCase()];
    if (config) {
        return {
            background: config.bg,
            color: config.text,
            dotColor: config.dot,
            icon: config.icon,
            gradient: config.gradient,
        };
    }
    return {
        background: "#f1f5f9",
        color: "#475569",
        dotColor: "#94a3b8",
        icon: "⚪",
        gradient: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    };
}

function formatStatus(status: string) {
    const statusMap: Record<string, string> = {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
        delivered: "Delivered",
        cancelled: "Cancelled",
    };
    return statusMap[status.toLowerCase()] || 
        status.replaceAll("_", " ")
              .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function RecentOrdersTable({ orders }: Props) {
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

    // Count orders by status
    const completedCount = orders.filter(o => o.status.toLowerCase() === "completed").length;
    const pendingCount = orders.filter(o => o.status.toLowerCase() === "pending").length;

    return (
        <div style={styles.container}>
            {/* Gradient bar at top */}
            <div style={styles.gradientBar} />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <div style={styles.titleIcon}>
                        📋
                    </div>
                    <h3 style={styles.title}>
                        {t.dashboard.reports.recentOrders}
                        <span style={styles.badge}>
                            {formatNumber(orders.length)}
                        </span>
                    </h3>
                </div>
                <div style={styles.statusFilter}>
                    <span>✅ {t.dashboard.reports.completed}:</span>
                    <span style={{ fontWeight: "600", color: "#16a34a" }}>
                        {formatNumber(completedCount)}
                    </span>
                    <span style={{ color: "#94a3b8" }}>|</span>
                    <span>⏳ {t.dashboard.reports.pending}:</span>
                    <span style={{ fontWeight: "600", color: "#eab308" }}>
                        {formatNumber(pendingCount)}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead style={styles.thead}>
                        <tr>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                                width: "60px",
                            }}>
                                #
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>🔢</span>
                                {t.dashboard.orders.orderNumber}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>👤</span>
                                {t.dashboard.orders.customer}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>📦</span>
                                {t.dashboard.orders.service}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>📊</span>
                                {t.dashboard.orders.status}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                                textAlign: "center" as const,
                            }}>
                                {t.common.actions}
                            </th>
                        </tr>
                    </thead>
                    <tbody style={styles.tbody}>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={styles.noData}>
                                    <span style={styles.noDataIcon}>📭</span>
                                    {t.dashboard.reports.noData}
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => {
                                const statusStyle = getStatusStyle(order.status);
                                const formattedStatus = formatStatus(order.status);
                                const customerName = order.customer?.name || "Unknown";
                                
                                return (
                                    <tr
                                        key={order.id}
                                        style={styles.tr}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f0fdf4";
                                            e.currentTarget.style.transform = "scale(1.002)";
                                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "white";
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <td style={{
                                            ...styles.td,
                                            color: "#94a3b8",
                                            fontWeight: "500",
                                            fontSize: "13px",
                                        }}>
                                            {formatNumber(index + 1)}
                                        </td>
                                        <td style={{
                                            ...styles.td,
                                            ...styles.tdFirst,
                                        }}>
                                            <span style={styles.orderNumber}>
                                                <Hash size={14} style={{ opacity: 0.5 }} />
                                                {order.order_number}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.customerInfo}>
                                                <div style={styles.customerAvatar}>
                                                    {customerName.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{customerName}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={styles.serviceBadge}>
                                                <Package size={14} />
                                                {order.service?.title || "N/A"}
                                            </span>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                ...styles.statusBadge,
                                                background: statusStyle.background,
                                                color: statusStyle.color,
                                            }}>
                                                <span style={{
                                                    ...styles.statusDot,
                                                    background: statusStyle.dotColor,
                                                }} />
                                                {statusStyle.icon} {formattedStatus}
                                            </span>
                                        </td>
                                        <td style={{
                                            ...styles.td,
                                            textAlign: "center" as const,
                                        }}>
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                style={styles.actionButton}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.2)";
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.1)";
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            {orders.length > 0 && (
                <div style={styles.footer}>
                    <div style={styles.footerStats}>
                        <div style={styles.footerStatItem}>
                            <span>📋</span>
                            <span>{t.dashboard.reports.totalOrders}:</span>
                            <span style={styles.footerStatValue}>
                                {formatNumber(orders.length)}
                            </span>
                        </div>
                        <div style={{
                            width: "1px",
                            height: "20px",
                            background: "#e2e8f0",
                        }} />
                        <div style={styles.footerStatItem}>
                            <span>✅</span>
                            <span>{t.dashboard.reports.completed}:</span>
                            <span style={{
                                ...styles.footerStatValue,
                                color: "#16a34a",
                            }}>
                                {formatNumber(completedCount)}
                            </span>
                        </div>
                        <div style={{
                            width: "1px",
                            height: "20px",
                            background: "#e2e8f0",
                        }} />
                        <div style={styles.footerStatItem}>
                            <span>⏳</span>
                            <span>{t.dashboard.reports.pending}:</span>
                            <span style={{
                                ...styles.footerStatValue,
                                color: "#eab308",
                            }}>
                                {formatNumber(pendingCount)}
                            </span>
                        </div>
                    </div>
                    <div style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                    }}>
                        {t.dashboard.reports.showing} {formatNumber(Math.min(orders.length, 5))} {t.dashboard.reports.of} {formatNumber(orders.length)} {t.dashboard.reports.orders}
                    </div>
                </div>
            )}

            {/* Decorative bottom gradient */}
            <div style={{
                position: "absolute" as const,
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)",
            }} />

            {/* Keyframe animation for status dots */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }
            `}</style>
        </div>
    );
}