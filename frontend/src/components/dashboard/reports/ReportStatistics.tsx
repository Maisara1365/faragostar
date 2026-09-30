"use client";

import {
    ShoppingCart,
    Package,
    Briefcase,
    MessageSquareQuote,
    Users,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    Star,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";

import type { ReportStatistics } from "@/types/report";

import { useLanguage } from "@/context/language-context";

interface Props {
    statistics: ReportStatistics;
}

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: string;
    gradient?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

// Custom styles for the component
const styles = {
    container: {
        padding: "8px 0",
    },
    section: {
        marginBottom: "32px",
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
        padding: "0 4px",
    },
    sectionIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        fontSize: "18px",
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#0f172a",
        letterSpacing: "-0.01em",
        margin: 0,
    },
    sectionBadge: {
        fontSize: "12px",
        fontWeight: "500",
        color: "#94a3b8",
        background: "#f1f5f9",
        padding: "2px 10px",
        borderRadius: "12px",
        marginLeft: "8px",
    },
    grid: {
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    },
};

// Color configurations for different card types
const CARD_COLORS = {
    total: {
        bg: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
        iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
        border: "rgba(59, 130, 246, 0.2)",
        shadow: "rgba(59, 130, 246, 0.1)",
        text: "#1e40af",
    },
    pending: {
        bg: "linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)",
        iconBg: "linear-gradient(135deg, #f59e0b, #d97706)",
        border: "rgba(245, 158, 11, 0.2)",
        shadow: "rgba(245, 158, 11, 0.1)",
        text: "#92400e",
    },
    progress: {
        bg: "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
        iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
        border: "rgba(59, 130, 246, 0.2)",
        shadow: "rgba(59, 130, 246, 0.1)",
        text: "#1e40af",
    },
    completed: {
        bg: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
        iconBg: "linear-gradient(135deg, #10b981, #059669)",
        border: "rgba(16, 185, 129, 0.2)",
        shadow: "rgba(16, 185, 129, 0.1)",
        text: "#065f46",
    },
    delivered: {
        bg: "linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)",
        iconBg: "linear-gradient(135deg, #14b8a6, #0d9488)",
        border: "rgba(20, 184, 166, 0.2)",
        shadow: "rgba(20, 184, 166, 0.1)",
        text: "#115e59",
    },
    cancelled: {
        bg: "linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)",
        iconBg: "linear-gradient(135deg, #ef4444, #dc2626)",
        border: "rgba(239, 68, 68, 0.2)",
        shadow: "rgba(239, 68, 68, 0.1)",
        text: "#991b1b",
    },
    services: {
        bg: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
        iconBg: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
        border: "rgba(139, 92, 246, 0.2)",
        shadow: "rgba(139, 92, 246, 0.1)",
        text: "#5b21b6",
    },
    portfolio: {
        bg: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
        iconBg: "linear-gradient(135deg, #ec4899, #db2777)",
        border: "rgba(236, 72, 153, 0.2)",
        shadow: "rgba(236, 72, 153, 0.1)",
        text: "#9d174d",
    },
    testimonials: {
        bg: "linear-gradient(135deg, #ffffff 0%, #fefce8 100%)",
        iconBg: "linear-gradient(135deg, #eab308, #ca8a04)",
        border: "rgba(234, 179, 8, 0.2)",
        shadow: "rgba(234, 179, 8, 0.1)",
        text: "#854d0e",
    },
    customers: {
        bg: "linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)",
        iconBg: "linear-gradient(135deg, #14b8a6, #0d9488)",
        border: "rgba(20, 184, 166, 0.2)",
        shadow: "rgba(20, 184, 166, 0.1)",
        text: "#115e59",
    },
    featured: {
        bg: "linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)",
        iconBg: "linear-gradient(135deg, #f97316, #ea580c)",
        border: "rgba(249, 115, 22, 0.2)",
        shadow: "rgba(249, 115, 22, 0.1)",
        text: "#9a3412",
    },
};

function StatCard({ title, value, icon, color = "total", trend, trendValue }: StatCardProps) {
    const { language } = useLanguage();
    const isRTL = language === "fa";

    // Format numbers based on language
    const formatNumber = (num: number | string) => {
        if (num === undefined || num === null) return "0";
        if (typeof num === "string") {
            if (isRTL) {
                return num.replace(/\d/g, (d) => {
                    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
                    return persianDigits[parseInt(d)] || d;
                });
            }
            return num;
        }
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const formatted = num.toString();
        if (isRTL) {
            return formatted.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
        }
        return formatted;
    };

    const cardStyle = CARD_COLORS[color as keyof typeof CARD_COLORS] || CARD_COLORS.total;
    const numericValue = typeof value === "number" ? value : parseFloat(value as string) || 0;

    // Determine trend icon
    const getTrendIcon = () => {
        if (!trend) return null;
        if (trend === 'up') return <TrendingUp size={14} color="#10b981" />;
        if (trend === 'down') return <TrendingDown size={14} color="#ef4444" />;
        return <Minus size={14} color="#94a3b8" />;
    };

    const getTrendColor = () => {
        if (!trend) return "#94a3b8";
        if (trend === 'up') return "#10b981";
        if (trend === 'down') return "#ef4444";
        return "#94a3b8";
    };

    return (
        <div style={{
            borderRadius: "16px",
            background: cardStyle.bg,
            padding: "20px",
            border: `1px solid ${cardStyle.border}`,
            boxShadow: `0 4px 12px ${cardStyle.shadow}`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative" as const,
            overflow: "hidden" as const,
            cursor: "default",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 8px 24px ${cardStyle.shadow}`;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 4px 12px ${cardStyle.shadow}`;
        }}
        >
            {/* Decorative gradient bar */}
            <div style={{
                position: "absolute" as const,
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: cardStyle.iconBg,
                opacity: 0.6,
            }} />

            {/* Decorative circle */}
            <div style={{
                position: "absolute" as const,
                bottom: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: cardStyle.iconBg,
                opacity: 0.05,
                pointerEvents: "none" as const,
            }} />

            <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                position: "relative" as const,
                zIndex: 1,
            }}>
                <div style={{
                    flex: 1,
                    minWidth: 0,
                }}>
                    <p style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#64748b",
                        letterSpacing: "0.3px",
                        marginBottom: "8px",
                    }}>
                        {title}
                    </p>
                    <div style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                    }}>
                        <h3 style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#0f172a",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.2,
                            direction: isRTL ? "rtl" : "ltr",
                        }}>
                            {formatNumber(value)}
                        </h3>
                        {trend && (
                            <span style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "12px",
                                fontWeight: "600",
                                color: getTrendColor(),
                                background: `${getTrendColor()}15`,
                                padding: "2px 8px",
                                borderRadius: "12px",
                            }}>
                                {getTrendIcon()}
                                {trendValue && <span>{trendValue}</span>}
                            </span>
                        )}
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: cardStyle.iconBg,
                    color: "white",
                    flexShrink: 0,
                    boxShadow: `0 4px 12px ${cardStyle.shadow}`,
                }}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default function ReportStatistics({ statistics }: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    // Format numbers based on language for section badges
    const formatNumber = (num: number) => {
        if (num === undefined || num === null) return "0";
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        const formatted = num.toString();
        if (isRTL) {
            return formatted.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
        }
        return formatted;
    };

    // Calculate some trends based on data
    const orderCompletionRate = statistics.totalOrders > 0 
        ? Math.round((statistics.completedOrders / statistics.totalOrders) * 100) 
        : 0;

    const serviceActiveRate = statistics.totalServices > 0 
        ? Math.round((statistics.activeServices / statistics.totalServices) * 100) 
        : 0;

    return (
        <div style={styles.container}>
            {/* Orders Section */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={{
                        ...styles.sectionIcon,
                        background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                        color: "white",
                    }}>
                        📦
                    </div>
                    <h2 style={styles.sectionTitle}>
                        {t.dashboard.reports.orders}
                        <span style={styles.sectionBadge}>
                            {formatNumber(statistics.totalOrders)} {t.dashboard.reports.total}
                        </span>
                    </h2>
                </div>

                <div style={styles.grid}>
                    <StatCard
                        title={t.dashboard.reports.totalOrders}
                        value={statistics.totalOrders}
                        icon={<ShoppingCart size={22} />}
                        color="total"
                        trend="up"
                        trendValue={`${orderCompletionRate}%`}
                    />
                    <StatCard
                        title={t.dashboard.reports.pendingOrders}
                        value={statistics.pendingOrders}
                        icon={<Clock size={22} />}
                        color="pending"
                    />
                    <StatCard
                        title={t.dashboard.reports.inProgressOrders}
                        value={statistics.inProgressOrders}
                        icon={<Package size={22} />}
                        color="progress"
                    />
                    <StatCard
                        title={t.dashboard.reports.completedOrders}
                        value={statistics.completedOrders}
                        icon={<CheckCircle2 size={22} />}
                        color="completed"
                    />
                    <StatCard
                        title={t.dashboard.reports.deliveredOrders}
                        value={statistics.deliveredOrders}
                        icon={<Truck size={22} />}
                        color="delivered"
                    />
                    <StatCard
                        title={t.dashboard.reports.cancelledOrders}
                        value={statistics.cancelledOrders}
                        icon={<XCircle size={22} />}
                        color="cancelled"
                    />
                </div>
            </section>

            {/* Services Section */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={{
                        ...styles.sectionIcon,
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        color: "white",
                    }}>
                        💼
                    </div>
                    <h2 style={styles.sectionTitle}>
                        {t.dashboard.reports.services}
                        <span style={styles.sectionBadge}>
                            {formatNumber(statistics.totalServices)} {t.dashboard.reports.total}
                        </span>
                    </h2>
                </div>

                <div style={styles.grid}>
                    <StatCard
                        title={t.dashboard.reports.totalServices}
                        value={statistics.totalServices}
                        icon={<Briefcase size={22} />}
                        color="services"
                        trend="up"
                        trendValue={`${serviceActiveRate}%`}
                    />
                    <StatCard
                        title={t.dashboard.reports.activeServices}
                        value={statistics.activeServices}
                        icon={<CheckCircle2 size={22} />}
                        color="completed"
                    />
                    <StatCard
                        title={t.dashboard.reports.featuredServices}
                        value={statistics.featuredServices}
                        icon={<Star size={22} />}
                        color="featured"
                    />
                </div>
            </section>

            {/* Portfolio Section */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={{
                        ...styles.sectionIcon,
                        background: "linear-gradient(135deg, #ec4899, #db2777)",
                        color: "white",
                    }}>
                        🎨
                    </div>
                    <h2 style={styles.sectionTitle}>
                        {t.dashboard.reports.portfolio}
                        <span style={styles.sectionBadge}>
                            {formatNumber(statistics.totalPortfolios)} {t.dashboard.reports.total}
                        </span>
                    </h2>
                </div>

                <div style={styles.grid}>
                    <StatCard
                        title={t.dashboard.reports.totalPortfolio}
                        value={statistics.totalPortfolios}
                        icon={<Briefcase size={22} />}
                        color="portfolio"
                    />
                    <StatCard
                        title={t.dashboard.reports.activePortfolio}
                        value={statistics.activePortfolios}
                        icon={<CheckCircle2 size={22} />}
                        color="completed"
                    />
                    <StatCard
                        title={t.dashboard.reports.featuredPortfolio}
                        value={statistics.featuredPortfolios}
                        icon={<Star size={22} />}
                        color="featured"
                    />
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={{
                        ...styles.sectionIcon,
                        background: "linear-gradient(135deg, #eab308, #ca8a04)",
                        color: "white",
                    }}>
                        💬
                    </div>
                    <h2 style={styles.sectionTitle}>
                        {t.dashboard.reports.testimonials}
                        <span style={styles.sectionBadge}>
                            {formatNumber(statistics.totalTestimonials)} {t.dashboard.reports.total}
                        </span>
                    </h2>
                </div>

                <div style={styles.grid}>
                    <StatCard
                        title={t.dashboard.reports.totalTestimonials}
                        value={statistics.totalTestimonials}
                        icon={<MessageSquareQuote size={22} />}
                        color="testimonials"
                    />
                    <StatCard
                        title={t.dashboard.reports.featuredTestimonials}
                        value={statistics.featuredTestimonials}
                        icon={<Star size={22} />}
                        color="featured"
                    />
                    <StatCard
                        title={t.dashboard.reports.averageRating}
                        value={statistics.averageRating?.toFixed(1) || "0.0"}
                        icon={<Star size={22} />}
                        color="testimonials"
                        trend={statistics.averageRating > 4 ? "up" : statistics.averageRating > 3 ? "neutral" : "down"}
                        trendValue={statistics.averageRating > 4 ? "Excellent" : statistics.averageRating > 3 ? "Good" : "Needs Work"}
                    />
                </div>
            </section>

            {/* Customers Section */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <div style={{
                        ...styles.sectionIcon,
                        background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                        color: "white",
                    }}>
                        👥
                    </div>
                    <h2 style={styles.sectionTitle}>
                        {t.dashboard.reports.customers}
                        <span style={styles.sectionBadge}>
                            {formatNumber(statistics.totalCustomers)} {t.dashboard.reports.total}
                        </span>
                    </h2>
                </div>

                <div style={styles.grid}>
                    <StatCard
                        title={t.dashboard.reports.totalCustomers}
                        value={statistics.totalCustomers}
                        icon={<Users size={22} />}
                        color="customers"
                    />
                    <StatCard
                        title={t.dashboard.reports.activeCustomers}
                        value={statistics.activeCustomers}
                        icon={<CheckCircle2 size={22} />}
                        color="completed"
                    />
                    <StatCard
                        title={t.dashboard.reports.verifiedCustomers}
                        value={statistics.verifiedCustomers}
                        icon={<Star size={22} />}
                        color="featured"
                    />
                </div>
            </section>

            {/* Decorative bottom gradient */}
            <div style={{
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                marginTop: "8px",
            }} />
        </div>
    );
}