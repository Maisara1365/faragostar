"use client";

import { useLanguage } from "@/context/language-context";

import type { Customer } from "@/types/customer";

interface Props {
    customers: Customer[];
}

// Custom styles for the component
const styles = {
    container: {
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
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
        background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
        zIndex: 10,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
        background: "rgba(255, 255, 255, 0.4)",
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
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
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
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "white",
        padding: "2px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
        marginLeft: "8px",
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
        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
        borderBottom: "2px solid #e2e8f0",
    },
    th: {
        padding: "14px 20px",
        textAlign: "left" as const,
        fontWeight: "600",
        color: "#475569",
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
    thDivider: {
        position: "absolute" as const,
        right: 0,
        top: "25%",
        height: "50%",
        width: "1px",
        background: "rgba(148, 163, 184, 0.2)",
    },
    tbody: {
        background: "white",
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
        transition: "all 0.2s ease",
        cursor: "default" as const,
    },
    trHover: {
        background: "#f8fafc",
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
    languageBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 10px",
        borderRadius: "6px",
        background: "#f1f5f9",
        fontSize: "12px",
        fontWeight: "600",
        color: "#475569",
        border: "1px solid #e2e8f0",
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
    },
    footerStats: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
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
const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string; icon: string }> = {
    active: {
        bg: "#dcfce7",
        text: "#166534",
        dot: "#22c55e",
        icon: "🟢",
    },
    blocked: {
        bg: "#fee2e2",
        text: "#991b1b",
        dot: "#ef4444",
        icon: "🔴",
    },
    inactive: {
        bg: "#fef9c3",
        text: "#854d0e",
        dot: "#eab308",
        icon: "🟡",
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
        };
    }
    return {
        background: "#f1f5f9",
        color: "#475569",
        dotColor: "#94a3b8",
        icon: "⚪",
    };
}

function formatStatus(status: string) {
    const statusMap: Record<string, string> = {
        active: "Active",
        blocked: "Blocked",
        inactive: "Inactive",
    };
    return statusMap[status.toLowerCase()] || 
        status.replaceAll("_", " ")
              .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function RecentCustomersTable({ customers }: Props) {
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

    // Count active customers
    const activeCount = customers.filter(c => c.status.toLowerCase() === "active").length;

    return (
        <div style={styles.container}>
            {/* Gradient bar at top */}
            <div style={styles.gradientBar} />

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.titleSection}>
                    <div style={styles.titleIcon}>
                        👥
                    </div>
                    <h3 style={styles.title}>
                        {t.dashboard.reports.recentCustomers}
                        <span style={styles.badge}>
                            {formatNumber(customers.length)}
                        </span>
                    </h3>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#64748b",
                }}>
                    <span>🟢 {t.dashboard.reports.active}</span>
                    <span style={{ fontWeight: "600", color: "#0f172a" }}>
                        {formatNumber(activeCount)}
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
                                <span style={styles.thIcon}>👤</span>
                                {t.dashboard.customers.name}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>✉️</span>
                                {t.dashboard.customers.email}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                            }}>
                                <span style={styles.thIcon}>📊</span>
                                {t.dashboard.customers.status}
                            </th>
                            <th style={{
                                ...styles.th,
                                ...(isRTL ? styles.thRTL : {}),
                                textAlign: isRTL ? "right" : "left",
                            }}>
                                <span style={styles.thIcon}>🌐</span>
                                {t.dashboard.customers.language}
                            </th>
                        </tr>
                    </thead>
                    <tbody style={styles.tbody}>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={styles.noData}>
                                    <span style={styles.noDataIcon}>📭</span>
                                    {t.dashboard.reports.noData}
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer, index) => {
                                const statusStyle = getStatusStyle(customer.status);
                                const formattedStatus = formatStatus(customer.status);
                                
                                return (
                                    <tr
                                        key={customer.id}
                                        style={styles.tr}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#f8fafc";
                                            e.currentTarget.style.transform = "scale(1.002)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "white";
                                            e.currentTarget.style.transform = "scale(1)";
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
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}>
                                                <div style={{
                                                    width: "32px",
                                                    height: "32px",
                                                    borderRadius: "50%",
                                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                                    color: "white",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    flexShrink: 0,
                                                }}>
                                                    {customer.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{customer.name}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <a
                                                href={`mailto:${customer.email}`}
                                                style={{
                                                    color: "#3b82f6",
                                                    textDecoration: "none",
                                                    transition: "color 0.2s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = "#2563eb";
                                                    e.currentTarget.style.textDecoration = "underline";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = "#3b82f6";
                                                    e.currentTarget.style.textDecoration = "none";
                                                }}
                                            >
                                                {customer.email}
                                            </a>
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
                                            textAlign: isRTL ? "right" : "left",
                                        }}>
                                            <span style={styles.languageBadge}>
                                                <span style={{ fontSize: "14px" }}>
                                                    {customer.language?.toLowerCase() === "fa" ? "🇮🇷" : "🇬🇧"}
                                                </span>
                                                {customer.language?.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            {customers.length > 0 && (
                <div style={styles.footer}>
                    <div style={styles.footerStats}>
                        <div style={styles.footerStatItem}>
                            <span>👥</span>
                            <span>{t.dashboard.reports.totalCustomers}:</span>
                            <span style={styles.footerStatValue}>
                                {formatNumber(customers.length)}
                            </span>
                        </div>
                        <div style={{
                            width: "1px",
                            height: "20px",
                            background: "#e2e8f0",
                        }} />
                        <div style={styles.footerStatItem}>
                            <span>🟢</span>
                            <span>{t.dashboard.reports.active}:</span>
                            <span style={{
                                ...styles.footerStatValue,
                                color: "#16a34a",
                            }}>
                                {formatNumber(activeCount)}
                            </span>
                        </div>
                    </div>
                    <div style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                    }}>
                        {t.dashboard.reports.showing} {formatNumber(Math.min(customers.length, 5))} {t.dashboard.reports.of} {formatNumber(customers.length)} {t.dashboard.reports.customers}
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
                background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)",
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