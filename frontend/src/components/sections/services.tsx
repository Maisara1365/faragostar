"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    ShoppingCart,
    Layers3,
    CheckCircle2,
    Sparkles,
    Clock3,
    PackageCheck,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getImageUrl = (path: string | null): string | null => {
    if (!path) return null;

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    const baseUrl = API_URL?.replace(/\/api\/?$/, "");

    if (!baseUrl) {
        return null;
    }

    return `${baseUrl}/storage/${path.replace(/^\/+/, "")}`;
};

interface Package {
    id: number;
    name: {
        fa: string;
        en: string;
    };
    price: string | number;
    delivery_days: number;
    revisions: number;
    features: {
        fa: string[];
        en: string[];
    };
    description?: {
        fa: string;
        en: string;
    };
    is_featured: boolean;
}

interface Service {
    id: number;
    slug: string;
    title_en: string;
    title_fa: string;
    short_description_en: string;
    short_description_fa: string;
    description: string;
    cover_image: string | null;
    icon: string | null;
    starting_price: string | number;
    theme_color: string;
    packages: Package[];
}

const formatPrice = (price: number | string | null): string => {
    if (price === null) return "0";

    return new Intl.NumberFormat("en-US").format(Number(price));
};

const formatPriceFa = (price: number | string | null): string => {
    if (price === null) return "۰";

    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return String(Number(price))
        .split("")
        .map((digit) => persianDigits[parseInt(digit)] || digit)
        .join("");
};

export default function Services() {
    const { language, t } = useLanguage();

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadServices() {
        try {
            const response = await fetch(`${API_URL}/services`, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to load services");
            }

            const json = await response.json();

            setServices(json.data ?? []);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Unable to load services.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    const formatNumberFa = (num: number): string => {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return String(num)
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    return (
        <section
            style={{
                position: "relative",
                overflow: "hidden",
                paddingTop: "40px",
                paddingBottom: "144px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -30,
                    background: "linear-gradient(to bottom, #ffffff, #f0f9ff, #ffffff)",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -20,
                    background: "radial-gradient(circle at top left, rgba(70,166,217,0.12), transparent 35%), radial-gradient(circle at bottom right, rgba(24,59,115,0.10), transparent 35%)",
                }}
            />

            <Container>
                {/* Stylish Our Services Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "12px",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 24px",
                            borderRadius: "9999px",
                            background: "linear-gradient(135deg, rgba(24,59,115,0.08), rgba(70,166,217,0.12))",
                            border: "1px solid rgba(24,59,115,0.1)",
                            boxShadow: "0 2px 12px rgba(24,59,115,0.06)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                        }}
                    >
                        <Sparkles
                            style={{
                                height: "16px",
                                width: "16px",
                                color: "#46A6D9",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "13px",
                                fontWeight: "700",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                color: "#183B73",
                            }}
                        >
                            {t.common.ourService}
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        margin: "0 auto 60px auto",
                        maxWidth: "896px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(24,59,115,0.1)",
                            backgroundColor: "rgba(255,255,255,0.8)",
                            padding: "10px 20px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#183B73",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            backdropFilter: "blur(12px)",
                        }}
                    />

                    <div
                        style={{
                            margin: "24px auto 0 auto",
                            height: "6px",
                            width: "80px",
                            borderRadius: "9999px",
                            background: "linear-gradient(to right, #183B73, #46A6D9)",
                        }}
                    />
                </motion.div>

                {loading && (
                    <div
                        style={{
                            display: "flex",
                            minHeight: "400px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "20px",
                            }}
                        >
                            <div style={{ position: "relative", height: "64px", width: "64px" }}>
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "9999px",
                                        border: "4px solid rgba(70,166,217,0.2)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "9999px",
                                        border: "4px solid #183B73",
                                        borderTopColor: "transparent",
                                        animation: "spin 1s linear infinite",
                                    }}
                                />
                            </div>

                            <p style={{ fontSize: "14px", fontWeight: "500", color: "#64748b" }}>
                                Loading services...
                            </p>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div
                        style={{
                            margin: "0 auto",
                            maxWidth: "576px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "30px",
                            border: "1px solid #fee2e2",
                            backgroundColor: "rgba(255,255,255,0.8)",
                            padding: "40px",
                            textAlign: "center",
                            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                height: "64px",
                                width: "64px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "16px",
                                backgroundColor: "#fef2f2",
                                color: "#ef4444",
                            }}
                        >
                            <Layers3 style={{ height: "32px", width: "32px" }} />
                        </div>

                        <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "600", color: "#dc2626" }}>
                            {error}
                        </p>

                        <button
                            onClick={() => {
                                setLoading(true);
                                setError("");
                                loadServices();
                            }}
                            style={{
                                marginTop: "24px",
                                borderRadius: "16px",
                                backgroundColor: "#183B73",
                                padding: "12px 28px",
                                fontWeight: "600",
                                color: "#ffffff",
                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                transition: "all 0.3s",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.backgroundColor = "#102d5c";
                                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.backgroundColor = "#183B73";
                                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
                            }}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div
                        style={{
                            display: "grid",
                            gap: "32px",
                            gridTemplateColumns: "1fr",
                        }}
                    >
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                                @media (min-width: 768px) {
                                    .services-grid {
                                        grid-template-columns: repeat(2, 1fr) !important;
                                    }
                                }
                                @media (min-width: 1280px) {
                                    .services-grid {
                                        grid-template-columns: repeat(3, 1fr) !important;
                                    }
                                }
                                @keyframes spin {
                                    from { transform: rotate(0deg); }
                                    to { transform: rotate(360deg); }
                                }
                            `,
                            }}
                        />
                        <div className="services-grid" style={{ display: "grid", gap: "32px" }}>
                            {services.map((service, index) => {
                                const firstPackage = service.packages?.[0];
                                const themeColor =
                                    service.theme_color ?? "#183B73";

                                const serviceTitle =
                                    language === "fa"
                                        ? service.title_fa
                                        : service.title_en;

                                const serviceDescription =
                                    language === "fa"
                                        ? service.short_description_fa
                                        : service.short_description_en;

                                return (
                                    <motion.article
                                        key={service.id}
                                        initial={{
                                            opacity: 0,
                                            y: 50,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            margin: "-80px",
                                        }}
                                        transition={{
                                            duration: 0.65,
                                            delay: index * 0.08,
                                        }}
                                        whileHover={{
                                            y: -10,
                                        }}
                                        style={{ position: "relative" }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: "-4px",
                                                zIndex: -10,
                                                borderRadius: "38px",
                                                opacity: 0,
                                                filter: "blur(64px)",
                                                transition: "all 0.7s",
                                                background: themeColor,
                                            }}
                                            className="group-hover-glow"
                                        />
                                        <style
                                            dangerouslySetInnerHTML={{
                                                __html: `
                                                .group-hover-glow {
                                                    transition: all 0.7s;
                                                }
                                                .group-hover-glow:hover {
                                                    opacity: 0.3;
                                                }
                                            `,
                                            }}
                                        />

                                        <div
                                            style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                borderRadius: "34px",
                                                border: "1px solid rgba(226,232,240,0.8)",
                                                backgroundColor: "#ffffff",
                                                boxShadow: "0 15px 50px rgba(24,59,115,0.08)",
                                                transition: "all 0.5s",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: "0 0 auto 0",
                                                    zIndex: 20,
                                                    height: "6px",
                                                    background: `linear-gradient(90deg, ${themeColor}, #46A6D9)`,
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position: "relative",
                                                    height: "270px",
                                                    overflow: "hidden",
                                                    backgroundColor: "#e2e8f0",
                                                }}
                                            >
                                                {service.cover_image ? (
                                                    <img
                                                        src={getImageUrl(service.cover_image) || ""}
                                                        alt={serviceTitle}
                                                        loading="lazy"
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "block",
                                                            objectFit: "cover",
                                                            objectPosition: "center",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            height: "100%",
                                                            width: "100%",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            background: `linear-gradient(135deg, ${themeColor}, #46A6D9)`,
                                                        }}
                                                    >
                                                        <Layers3
                                                            style={{
                                                                height: "96px",
                                                                width: "96px",
                                                                color: "rgba(255,255,255,0.6)",
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background:
                                                            "linear-gradient(to top, rgba(7,20,38,0.9), rgba(7,20,38,0.2), transparent)",
                                                        pointerEvents: "none",
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        right: "-64px",
                                                        top: "-64px",
                                                        height: "160px",
                                                        width: "160px",
                                                        borderRadius: "9999px",
                                                        opacity: 0.3,
                                                        filter: "blur(64px)",
                                                        background: themeColor,
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: "24px",
                                                        top: "24px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            display: "flex",
                                                            height: "56px",
                                                            width: "56px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "16px",
                                                            border: "1px solid rgba(255,255,255,0.35)",
                                                            background: "rgba(255,255,255,0.16)",
                                                            boxShadow:
                                                                "0 12px 30px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.25)",
                                                            backdropFilter: "blur(12px)",
                                                            WebkitBackdropFilter: "blur(12px)",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                inset: "4px",
                                                                borderRadius: "12px",
                                                                background: `linear-gradient(135deg, ${themeColor}dd, ${themeColor}88)`,
                                                                opacity: 0.85,
                                                            }}
                                                        />

                                                        {service.icon ? (
                                                            <img
                                                                src={getImageUrl(service.icon) || ""}
                                                                alt={serviceTitle}
                                                                loading="lazy"
                                                                style={{
                                                                    position: "relative",
                                                                    zIndex: 2,
                                                                    display: "block",
                                                                    width: "48px",
                                                                    height: "48px",
                                                                    objectFit: "cover",
                                                                    objectPosition: "center",
                                                                    borderRadius: "50%",
                                                                    filter:
                                                                        "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                                                                }}
                                                            />
                                                        ) : (
                                                            <Sparkles
                                                                style={{
                                                                    position: "relative",
                                                                    zIndex: 2,
                                                                    height: "28px",
                                                                    width: "28px",
                                                                    color: "#ffffff",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: "auto 0 0 0",
                                                        padding: "28px",
                                                    }}
                                                >
                                                    <h3
                                                        style={{
                                                            fontSize: "24px",
                                                            fontWeight: "900",
                                                            lineHeight: "1.25",
                                                            color: "#ffffff",
                                                        }}
                                                    >
                                                        {serviceTitle}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div style={{ padding: "28px 32px" }}>
                                                <div style={{ padding: "0 8px" }}>
                                                    <p
                                                        style={{
                                                            minHeight: "80px",
                                                            fontSize: "15px",
                                                            lineHeight: "1.75",
                                                            color: "#475569",
                                                        }}
                                                    >
                                                        {serviceDescription}
                                                    </p>
                                                </div>

                                                <div style={{ height: "16px" }} />

                                                <div style={{ padding: "0 8px" }}>
                                                    <div
                                                        style={{
                                                            marginTop: "28px",
                                                            borderRadius: "24px",
                                                            border: "1px solid #e2e8f0",
                                                            background: "linear-gradient(to bottom right, #f8fafc, #ffffff)",
                                                            padding: "20px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "grid",
                                                                gridTemplateColumns: "1fr auto auto",
                                                                alignItems: "center",
                                                                gap: "16px",
                                                            }}
                                                        >
                                                            <div>
                                                                <p
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        fontWeight: "600",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.05em",
                                                                        color: "#94a3b8",
                                                                    }}
                                                                >
                                                                    {language === "fa"
                                                                        ? "قیمت از"
                                                                        : "Starting From"}
                                                                </p>

                                                                <div style={{ height: "8px" }} />

                                                                <p
                                                                    style={{
                                                                        marginTop: "4px",
                                                                        fontSize: "24px",
                                                                        fontWeight: "900",
                                                                        color: themeColor,
                                                                    }}
                                                                >
                                                                    {language === "fa"
                                                                        ? `${formatPriceFa(service.starting_price)} $`
                                                                        : `$${formatPrice(service.starting_price)}`}
                                                                </p>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    borderLeft: "1px solid #e2e8f0",
                                                                    paddingLeft: "16px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <Clock3
                                                                    style={{
                                                                        margin: "0 auto",
                                                                        height: "16px",
                                                                        width: "16px",
                                                                        color: "#94a3b8",
                                                                    }}
                                                                />

                                                                <div style={{ height: "8px" }} />

                                                                <p
                                                                    style={{
                                                                        marginTop: "4px",
                                                                        fontSize: "10px",
                                                                        fontWeight: "500",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.025em",
                                                                        color: "#94a3b8",
                                                                    }}
                                                                >
                                                                    {language === "fa"
                                                                        ? "تحویل"
                                                                        : "Delivery"}
                                                                </p>

                                                                <div style={{ height: "4px" }} />

                                                                <p
                                                                    style={{
                                                                        marginTop: "2px",
                                                                        fontSize: "12px",
                                                                        fontWeight: "700",
                                                                        color: "#183B73",
                                                                    }}
                                                                >
                                                                    {firstPackage
                                                                        ? language ===
                                                                          "fa"
                                                                            ? `${formatNumberFa(firstPackage.delivery_days)} روز`
                                                                            : `${firstPackage.delivery_days} Days`
                                                                        : "--"}
                                                                </p>
                                                            </div>

                                                            <div
                                                                style={{
                                                                    borderLeft: "1px solid #e2e8f0",
                                                                    paddingLeft: "16px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                <Layers3
                                                                    style={{
                                                                        margin: "0 auto",
                                                                        height: "16px",
                                                                        width: "16px",
                                                                        color: "#94a3b8",
                                                                    }}
                                                                />

                                                                <div style={{ height: "8px" }} />

                                                                <p
                                                                    style={{
                                                                        marginTop: "4px",
                                                                        fontSize: "10px",
                                                                        fontWeight: "500",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.025em",
                                                                        color: "#94a3b8",
                                                                    }}
                                                                >
                                                                    {language === "fa"
                                                                        ? "پکیج‌ها"
                                                                        : "Packages"}
                                                                </p>

                                                                <div style={{ height: "4px" }} />

                                                                <p
                                                                    style={{
                                                                        marginTop: "2px",
                                                                        fontSize: "12px",
                                                                        fontWeight: "700",
                                                                        color: "#183B73",
                                                                    }}
                                                                >
                                                                    {language === "fa"
                                                                        ? formatNumberFa(
                                                                              service
                                                                                  .packages
                                                                                  ?.length ??
                                                                                  0
                                                                          )
                                                                        : service
                                                                              .packages
                                                                              ?.length ??
                                                                          0}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ height: "16px" }} />

                                                <div style={{ padding: "0 8px" }}>
                                                    <div
                                                        style={{
                                                            margin: "28px 0",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "12px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                height: "36px",
                                                                width: "36px",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                borderRadius: "12px",
                                                                background: `${themeColor}15`,
                                                                color: themeColor,
                                                            }}
                                                        >
                                                            <PackageCheck style={{ height: "20px", width: "20px" }} />
                                                        </div>

                                                        <div>
                                                            <p
                                                                style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "700",
                                                                    color: "#183B73",
                                                                }}
                                                            >
                                                                {language === "fa"
                                                                    ? "پکیج‌های موجود"
                                                                    : "Available Packages"}
                                                            </p>

                                                            <p
                                                                style={{
                                                                    fontSize: "12px",
                                                                    color: "#94a3b8",
                                                                }}
                                                            >
                                                                {language === "fa"
                                                                    ? "گزینه مناسب نیاز خود را انتخاب کنید"
                                                                    : "Choose the option that fits your needs"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ height: "16px" }} />

                                                <div style={{ padding: "0 8px" }}>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                                        {service.packages
                                                            ?.slice(0, 3)
                                                            .map((pkg) => {
                                                                const packageName =
                                                                    language === "fa"
                                                                        ? pkg.name.fa
                                                                        : pkg.name.en;

                                                                const packageFeatures =
                                                                    language === "fa"
                                                                        ? pkg.features
                                                                              ?.fa ??
                                                                          []
                                                                        : pkg.features
                                                                              ?.en ??
                                                                          [];

                                                                const packageDescription =
                                                                    language === "fa"
                                                                        ? pkg
                                                                              .description
                                                                              ?.fa
                                                                        : pkg
                                                                              .description
                                                                              ?.en;

                                                                return (
                                                                    <motion.div
                                                                        key={pkg.id}
                                                                        whileHover={{
                                                                            y: -3,
                                                                        }}
                                                                        style={{
                                                                            position: "relative",
                                                                            overflow: "hidden",
                                                                            borderRadius: "22px",
                                                                            border: pkg.is_featured
                                                                                ? "1px solid rgba(24,59,115,0.2)"
                                                                                : "1px solid #e2e8f0",
                                                                            padding: "24px",
                                                                            transition: "all 0.3s",
                                                                            background: pkg.is_featured
                                                                                ? "linear-gradient(to bottom right, rgba(24,59,115,0.04), rgba(70,166,217,0.08))"
                                                                                : "rgba(241,245,249,0.6)",
                                                                            boxShadow: pkg.is_featured
                                                                                ? "0 4px 6px -1px rgba(0,0,0,0.1)"
                                                                                : "none",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                justifyContent: "space-between",
                                                                                gap: "16px",
                                                                            }}
                                                                        >
                                                                            <div style={{ minWidth: 0 }}>
                                                                                <h4
                                                                                    style={{
                                                                                        paddingRight: "64px",
                                                                                        fontSize: "16px",
                                                                                        fontWeight: "700",
                                                                                        color: "#183B73",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        packageName
                                                                                    }
                                                                                </h4>

                                                                                <div
                                                                                    style={{
                                                                                        marginTop: "12px",
                                                                                        display: "flex",
                                                                                        flexWrap: "wrap",
                                                                                        alignItems: "center",
                                                                                        gap: "24px 16px",
                                                                                        fontSize: "12px",
                                                                                        color: "#64748b",
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            alignItems: "center",
                                                                                            gap: "6px",
                                                                                        }}
                                                                                    >
                                                                                        <Clock3 style={{ height: "14px", width: "14px" }} />
                                                                                        {language ===
                                                                                        "fa"
                                                                                            ? `${formatNumberFa(pkg.delivery_days)} روز`
                                                                                            : `${pkg.delivery_days} Days`}
                                                                                    </span>

                                                                                    <span
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            alignItems: "center",
                                                                                            gap: "6px",
                                                                                        }}
                                                                                    >
                                                                                        <CheckCircle2 style={{ height: "14px", width: "14px" }} />
                                                                                        {language ===
                                                                                        "fa"
                                                                                            ? `${formatNumberFa(pkg.revisions)} بازبینی`
                                                                                            : `${pkg.revisions} Revisions`}
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <div
                                                                                style={{
                                                                                    flexShrink: 0,
                                                                                    textAlign: "end",
                                                                                }}
                                                                            >
                                                                                <p
                                                                                    style={{
                                                                                        fontSize: "20px",
                                                                                        fontWeight: "900",
                                                                                        color: themeColor,
                                                                                    }}
                                                                                >
                                                                                    {language ===
                                                                                    "fa"
                                                                                        ? `${formatPriceFa(pkg.price)} $`
                                                                                        : `$${formatPrice(pkg.price)}`}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        {pkg.is_featured && (
                                                                            <div
                                                                                style={{
                                                                                    marginTop: "12px",
                                                                                    display: "inline-block",
                                                                                    borderRadius: "9999px",
                                                                                    padding: "4px 14px",
                                                                                    fontSize: "10px",
                                                                                    fontWeight: "900",
                                                                                    textTransform: "uppercase",
                                                                                    letterSpacing: "0.025em",
                                                                                    color: "#ffffff",
                                                                                    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                                                                                    background: themeColor,
                                                                                }}
                                                                            >
                                                                                {language === "fa"
                                                                                    ? "محبوب"
                                                                                    : "Popular"}
                                                                            </div>
                                                                        )}

                                                                        {packageFeatures.length >
                                                                            0 && (
                                                                            <ul
                                                                                style={{
                                                                                    marginTop: "16px",
                                                                                    display: "flex",
                                                                                    flexDirection: "column",
                                                                                    gap: "10px",
                                                                                    borderTop: "1px solid rgba(226,232,240,0.8)",
                                                                                    paddingTop: "16px",
                                                                                }}
                                                                            >
                                                                                {packageFeatures
                                                                                    .slice(
                                                                                        0,
                                                                                        4
                                                                                    )
                                                                                    .map(
                                                                                        (
                                                                                            feature,
                                                                                            featureIndex
                                                                                        ) => (
                                                                                            <li
                                                                                                key={`${pkg.id}-${featureIndex}`}
                                                                                                style={{
                                                                                                    display: "flex",
                                                                                                    alignItems: "flex-start",
                                                                                                    gap: "10px",
                                                                                                    fontSize: "12px",
                                                                                                    lineHeight: "1.25",
                                                                                                    color: "#475569",
                                                                                                }}
                                                                                            >
                                                                                                <CheckCircle2
                                                                                                    style={{
                                                                                                        marginTop: "2px",
                                                                                                        height: "14px",
                                                                                                        width: "14px",
                                                                                                        flexShrink: 0,
                                                                                                        color: themeColor,
                                                                                                    }}
                                                                                                />
                                                                                                <span>
                                                                                                    {
                                                                                                        feature
                                                                                                    }
                                                                                                </span>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                            </ul>
                                                                        )}

                                                                        {packageDescription && (
                                                                            <p
                                                                                style={{
                                                                                    marginTop: "16px",
                                                                                    borderTop: "1px solid rgba(226,232,240,0.7)",
                                                                                    paddingTop: "16px",
                                                                                    fontSize: "12px",
                                                                                    lineHeight: "1.25",
                                                                                    color: "#64748b",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    packageDescription
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </motion.div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>

                                                <div style={{ height: "16px" }} />

                                                <div style={{ padding: "0 8px" }}>
                                                    <div
                                                        style={{
                                                            marginTop: "24px",
                                                            display: "grid",
                                                            gridTemplateColumns: "1fr 1fr",
                                                            gap: "12px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                borderRadius: "16px",
                                                                border: "1px solid #e2e8f0",
                                                                backgroundColor: "rgba(241,245,249,0.7)",
                                                                padding: "16px",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <Clock3
                                                                style={{
                                                                    margin: "0 auto",
                                                                    height: "20px",
                                                                    width: "20px",
                                                                    color: themeColor,
                                                                }}
                                                            />

                                                            <div style={{ height: "8px" }} />

                                                            <p
                                                                style={{
                                                                    marginTop: "8px",
                                                                    fontSize: "10px",
                                                                    fontWeight: "600",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.025em",
                                                                    color: "#94a3b8",
                                                                }}
                                                            >
                                                                {language === "fa"
                                                                    ? "زمان تحویل"
                                                                    : "Delivery Time"}
                                                            </p>

                                                            <div style={{ height: "8px" }} />

                                                            <p
                                                                style={{
                                                                    marginTop: "4px",
                                                                    fontSize: "14px",
                                                                    fontWeight: "900",
                                                                    color: "#183B73",
                                                                }}
                                                            >
                                                                {firstPackage
                                                                    ? language ===
                                                                      "fa"
                                                                        ? `${formatNumberFa(firstPackage.delivery_days)} روز`
                                                                        : `${firstPackage.delivery_days} Days`
                                                                    : "--"}
                                                            </p>
                                                        </div>

                                                        <div
                                                            style={{
                                                                borderRadius: "16px",
                                                                border: "1px solid #e2e8f0",
                                                                backgroundColor: "rgba(241,245,249,0.7)",
                                                                padding: "16px",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <CheckCircle2
                                                                style={{
                                                                    margin: "0 auto",
                                                                    height: "20px",
                                                                    width: "20px",
                                                                    color: themeColor,
                                                                }}
                                                            />

                                                            <div style={{ height: "8px" }} />

                                                            <p
                                                                style={{
                                                                    marginTop: "8px",
                                                                    fontSize: "10px",
                                                                    fontWeight: "600",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.025em",
                                                                    color: "#94a3b8",
                                                                }}
                                                            >
                                                                {language === "fa"
                                                                    ? "بازبینی‌ها"
                                                                    : "Revisions"}
                                                            </p>

                                                            <div style={{ height: "8px" }} />

                                                            <p
                                                                style={{
                                                                    marginTop: "4px",
                                                                    fontSize: "14px",
                                                                    fontWeight: "900",
                                                                    color: "#183B73",
                                                                }}
                                                            >
                                                                {firstPackage
                                                                    ? language ===
                                                                      "fa"
                                                                        ? formatNumberFa(
                                                                              firstPackage.revisions
                                                                          )
                                                                        : firstPackage
                                                                              .revisions
                                                                    : "--"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ height: "16px" }} />

                                                <div style={{ padding: "0 8px" }}>
                                                    <div
                                                        style={{
                                                            marginTop: "28px",
                                                            display: "grid",
                                                            gridTemplateColumns: "1fr 1fr",
                                                            gap: "12px",
                                                        }}
                                                    >
                                                        <Link
                                                            href={`/services/${service.slug}`}
                                                            style={{ display: "block" }}
                                                        >
                                                            <button
                                                                style={{
                                                                    height: "48px",
                                                                    width: "100%",
                                                                    borderRadius: "16px",
                                                                    border: "2px solid #e2e8f0",
                                                                    backgroundColor: "#ffffff",
                                                                    fontWeight: "600",
                                                                    color: "#183B73",
                                                                    transition: "all 0.3s",
                                                                    cursor: "pointer",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    gap: "8px",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.borderColor = "#183B73";
                                                                    e.currentTarget.style.backgroundColor = "#f8fafc";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                                    e.currentTarget.style.backgroundColor = "#ffffff";
                                                                }}
                                                            >
                                                                <span>
                                                                    {language === "fa"
                                                                        ? "جزئیات"
                                                                        : "Details"}
                                                                </span>

                                                                <ArrowRight style={{ height: "16px", width: "16px" }} />
                                                            </button>
                                                        </Link>

                                                        <Link
                                                            href={`/order?service=${service.slug}`}
                                                            style={{ display: "block" }}
                                                        >
                                                            <button
                                                                style={{
                                                                    height: "48px",
                                                                    width: "100%",
                                                                    borderRadius: "16px",
                                                                    fontWeight: "700",
                                                                    color: "#ffffff",
                                                                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                                                    transition: "all 0.3s",
                                                                    cursor: "pointer",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    gap: "8px",
                                                                    background: themeColor,
                                                                    border: "none",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.transform = "scale(1.02)";
                                                                    e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.15)";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.transform = "scale(1)";
                                                                    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
                                                                }}
                                                            >
                                                                <ShoppingCart style={{ height: "16px", width: "16px" }} />

                                                                <span>
                                                                    {language === "fa"
                                                                        ? "سفارش دهید"
                                                                        : "Order Now"}
                                                                </span>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div                                                    style={{
                                                        margin: "28px auto 0 auto",
                                                        height: "4px",
                                                        width: 0,
                                                        borderRadius: "9999px",
                                                        opacity: 0,
                                                        transition: "all 0.5s",
                                                        background: `linear-gradient(90deg, ${themeColor}, #46A6D9)`,
                                                    }}
                                                    className="bottom-accent"
                                                />
                                                <style
                                                    dangerouslySetInnerHTML={{
                                                        __html: `
                                                        .bottom-accent:hover {
                                                            width: 96px;
                                                            opacity: 1;
                                                        }
                                                    `,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                )}

                {!loading && !error && services.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            margin: "0 auto",
                            maxWidth: "576px",
                            borderRadius: "32px",
                            border: "2px dashed #cbd5e1",
                            backgroundColor: "rgba(255,255,255,0.7)",
                            padding: "56px",
                            textAlign: "center",
                            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <div
                            style={{
                                margin: "0 auto",
                                display: "flex",
                                height: "64px",
                                width: "64px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "16px",
                                backgroundColor: "#f1f5f9",
                            }}
                        >
                            <Layers3 style={{ height: "32px", width: "32px", color: "#94a3b8" }} />
                        </div>

                        <h3
                            style={{
                                marginTop: "20px",
                                fontSize: "20px",
                                fontWeight: "700",
                                color: "#183B73",
                            }}
                        >
                            {language === "fa"
                                ? "هیچ خدماتی موجود نیست"
                                : "No Services Available"}
                        </h3>

                        <p
                            style={{
                                marginTop: "12px",
                                fontSize: "14px",
                                lineHeight: "1.5",
                                color: "#64748b",
                            }}
                        >
                            {language === "fa"
                                ? "ما در حال به‌روزرسانی خدمات خود هستیم. لطفاً به زودی بازگردید."
                                : "We are currently updating our services. Please check back soon."}
                        </p>
                    </motion.div>
                )}
            </Container>
        </section>
    );
}