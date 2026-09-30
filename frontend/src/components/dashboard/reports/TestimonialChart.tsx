"use client";

import { useMemo } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

import { useLanguage } from "@/context/language-context";

import type { Testimonial } from "@/types/testimonial";

interface Props {
    testimonials: Testimonial[];
}

// Custom styles for the component
const styles = {
    container: {
        borderRadius: "16px",
        background: "linear-gradient(135deg, #ffffff 0%, #fefce8 100%)",
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
    tooltipContainer: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(226, 232, 240, 0.5)",
        minWidth: "140px",
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
        background: "radial-gradient(circle, rgba(239, 68, 68, 0.04), transparent)",
        bottom: "-40px",
        left: "-40px",
        pointerEvents: "none" as const,
    },
};

// Color gradient for bars based on rating
const getBarColor = (rating: number) => {
    const colors = [
        "#EF4444", // 1 star - Red
        "#F97316", // 2 stars - Orange
        "#F59E0B", // 3 stars - Amber
        "#22D3EE", // 4 stars - Cyan
        "#10B981", // 5 stars - Green
    ];
    return colors[rating - 1] || "#94a3b8";
};

const getBarGradient = (rating: number) => {
    const gradients = [
        "linear-gradient(135deg, #EF4444, #DC2626)",
        "linear-gradient(135deg, #F97316, #EA580C)",
        "linear-gradient(135deg, #F59E0B, #D97706)",
        "linear-gradient(135deg, #22D3EE, #06B6D4)",
        "linear-gradient(135deg, #10B981, #059669)",
    ];
    return gradients[rating - 1] || "linear-gradient(135deg, #94a3b8, #64748b)";
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatNumber, t }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={styles.tooltipContainer}>
                <div style={styles.tooltipLabel}>
                    ⭐ {label}
                </div>
                <div style={styles.tooltipValue}>
                    {formatNumber(data.total)} {t.dashboard.reviews}
                </div>
                <div style={styles.tooltipSublabel}>
                    {t.dashboard.reports.ratingDistribution}
                </div>
            </div>
        );
    }
    return null;
};

// Custom XAxis tick renderer
const renderXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const rating = parseInt(payload.value);
    const starColors = ["#EF4444", "#F97316", "#F59E0B", "#22D3EE", "#10B981"];
    const color = starColors[rating - 1] || "#94a3b8";
    
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={10}
                textAnchor="middle"
                fill={color}
                fontSize="14"
                fontWeight="600"
            >
                {payload.value}
            </text>
        </g>
    );
};

export default function TestimonialChart({ testimonials }: Props) {
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

    const data = useMemo(() => {
        const ratings = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        };

        testimonials.forEach((testimonial) => {
            if (testimonial.rating >= 1 && testimonial.rating <= 5) {
                ratings[testimonial.rating as 1 | 2 | 3 | 4 | 5]++;
            }
        });

        const chartData = [
            {
                rating: "1★",
                total: ratings[1],
                value: 1,
            },
            {
                rating: "2★",
                total: ratings[2],
                value: 2,
            },
            {
                rating: "3★",
                total: ratings[3],
                value: 3,
            },
            {
                rating: "4★",
                total: ratings[4],
                value: 4,
            },
            {
                rating: "5★",
                total: ratings[5],
                value: 5,
            },
        ];

        return chartData;
    }, [testimonials]);

    // Calculate statistics
    const totalReviews = testimonials.length;
    const averageRating = totalReviews > 0 
        ? testimonials.reduce((sum, t) => sum + t.rating, 0) / totalReviews 
        : 0;
    const fiveStarCount = data.find(d => d.value === 5)?.total || 0;
    const fiveStarPercentage = totalReviews > 0 
        ? Math.round((fiveStarCount / totalReviews) * 100) 
        : 0;

    const hasData = data.some(d => d.total > 0);

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
                        {t.dashboard.reports.testimonialChart}
                    </h3>
                    <div style={styles.subtitle}>
                        <span>{t.dashboard.reports.totalReviews}:</span>
                        <span style={{
                            fontWeight: "600",
                            color: "#0f172a",
                            fontSize: "15px",
                        }}>
                            {formatNumber(totalReviews)}
                        </span>
                        <span style={{
                            fontSize: "13px",
                            color: "#94a3b8",
                        }}>
                            • ⭐ {averageRating.toFixed(1)}
                        </span>
                    </div>
                </div>
                <div style={styles.statsContainer}>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>⭐ 5 {t.dashboard.reports.star}</span>
                        <span style={{
                            ...styles.statValue,
                            color: "#059669",
                        }}>
                            {formatNumber(fiveStarCount)}
                        </span>
                    </div>
                    <div style={{
                        width: "1px",
                        height: "30px",
                        background: "#e2e8f0",
                    }} />
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>{t.dashboard.reports.percentage}</span>
                        <span style={{
                            ...styles.statValue,
                            color: "#f59e0b",
                        }}>
                            {formatNumber(fiveStarPercentage)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {!hasData ? (
                <div style={styles.noDataContainer}>
                    <div style={styles.noDataIcon}>📭</div>
                    <div style={styles.noDataText}>
                        {t.dashboard.reports.noTestimonialData}
                    </div>
                </div>
            ) : (
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20,
                            }}
                            barCategoryGap="20%"
                        >
                            <defs>
                                {data.map((item) => {
                                    const color = getBarColor(item.value);
                                    return (
                                        <linearGradient
                                            key={`gradient-${item.value}`}
                                            id={`gradient-${item.value}`}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                        </linearGradient>
                                    );
                                })}
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="rating"
                                tick={renderXAxisTick}
                                axisLine={{ stroke: '#e2e8f0' }}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                axisLine={{ stroke: '#e2e8f0' }}
                                tickLine={false}
                                tickFormatter={(value) => formatNumber(value)}
                                style={{
                                    fontSize: "12px",
                                    fill: "#94a3b8",
                                }}
                            />

                            <Tooltip
                                content={<CustomTooltip t={t} formatNumber={formatNumber} />}
                                cursor={{
                                    fill: "rgba(245, 158, 11, 0.05)",
                                }}
                            />

                            <Bar
                                dataKey="total"
                                radius={[8, 8, 0, 0]}
                                animationDuration={800}
                                animationBegin={0}
                                animationEasing="ease-out"
                            >
                                {data.map((entry, index) => {
                                    const color = getBarColor(entry.value);
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`url(#gradient-${entry.value})`}
                                            stroke={color}
                                            strokeWidth={1}
                                            style={{
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                const element = e.currentTarget;
                                                element.style.filter = "brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.15))";
                                                element.style.transform = "scaleY(1.02)";
                                                element.style.transformOrigin = "bottom";
                                            }}
                                            onMouseLeave={(e) => {
                                                const element = e.currentTarget;
                                                element.style.filter = "none";
                                                element.style.transform = "scaleY(1)";
                                            }}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
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