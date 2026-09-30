"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles,
    CheckCircle,
    Clock3,
    ArrowRight,
    Layers3,
    ArrowUpRight,
    Star,
    Gem,
    Zap,
    Shield,
    Heart,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";
import { api } from "@/services/api";
import { useLanguage } from "@/context/language-context";
import { Service } from "@/types/service";

export default function ServicesPage() {
    const { t, language } = useLanguage();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const getImageUrl = (path: string | null): string | null => {
        if (!path) return null;

        if (path.startsWith("http://") || path.startsWith("https://")) {
            return path;
        }

        const baseUrl = API_URL?.replace(/\/api\/?$/, "");

        if (!baseUrl) {
            console.error("NEXT_PUBLIC_API_URL is not configured.");
            return null;
        }

        return `${baseUrl}/storage/${path.replace(/^\/+/, "")}`;
    };

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadServices() {
            try {
                const response = await api.get("/services");
                setServices(response.data.data ?? []);
            } catch (error) {
                console.error("Failed to load services:", error);
            } finally {
                setLoading(false);
            }
        }

        loadServices();
    }, []);

    // Helper function to format numbers with Persian digits
    const formatNumberFa = (num: number): string => {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return String(num)
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    // Helper function to format price with Persian digits
    const formatPriceFa = (price: number | string): string => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        if (isNaN(num)) return "۰";
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return String(Math.round(num))
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <>
                <Header />

                <main className="relative min-h-[70vh] overflow-hidden" style={{
                    background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)"
                }}>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
                    </div>

                    <Container>
                        <div className="relative flex min-h-[70vh] items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="relative flex h-20 w-20 items-center justify-center">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />

                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-xl">
                                        <Sparkles className="h-7 w-7 animate-pulse text-white" />
                                    </div>
                                </div>

                                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                                    {t.servicesPage?.loading ||
                                        "Loading services..."}
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    Please wait a moment
                                </p>
                            </motion.div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Services Page
    |--------------------------------------------------------------------------
    */

    const isFa = language === "fa";

    return (
        <>
            {/* 🌟 GLOBAL STYLES FOR PAGE BACKGROUND */}
            <style jsx global>{`
                /* Page Background */
                body {
                    background: linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 25%, #f5f9ff 50%, #e8f2fc 75%, #f0f9ff 100%);
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                }

                /* Animated page glow overlay */
                .page-glow-services {
                    position: fixed;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(ellipse at 25% 20%, rgba(70, 166, 217, 0.08) 0%, transparent 50%),
                                radial-gradient(ellipse at 75% 80%, rgba(24, 59, 115, 0.06) 0%, transparent 50%),
                                radial-gradient(ellipse at 50% 50%, rgba(70, 166, 217, 0.04) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                    animation: pageGlowServices 22s ease-in-out infinite alternate;
                }

                @keyframes pageGlowServices {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    33% {
                        transform: translate(1.5%, -1%) scale(1.04);
                        opacity: 0.8;
                    }
                    66% {
                        transform: translate(-1.5%, 2%) scale(0.96);
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(0.5%, -0.5%) scale(1.02);
                        opacity: 0.9;
                    }
                }

                /* 🌟 BANNER GLOW EFFECTS */
                .banner-glow-primary {
                    position: absolute;
                    top: -200px;
                    right: -150px;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(70, 166, 217, 0.28) 0%, rgba(70, 166, 217, 0.06) 35%, transparent 70%);
                    filter: blur(120px);
                    pointer-events: none;
                    animation: bannerGlowPrimary 11s ease-in-out infinite alternate;
                }

                .banner-glow-secondary {
                    position: absolute;
                    bottom: -180px;
                    left: -120px;
                    width: 550px;
                    height: 550px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(24, 59, 115, 0.18) 0%, rgba(24, 59, 115, 0.04) 40%, transparent 70%);
                    filter: blur(120px);
                    pointer-events: none;
                    animation: bannerGlowSecondary 13s ease-in-out infinite alternate;
                }

                .banner-glow-accent {
                    position: absolute;
                    top: 40%;
                    left: 30%;
                    width: 350px;
                    height: 350px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(70, 166, 217, 0.10) 0%, rgba(70, 166, 217, 0.02) 50%, transparent 70%);
                    filter: blur(90px);
                    pointer-events: none;
                    animation: bannerGlowAccent 9s ease-in-out infinite alternate;
                }

                @keyframes bannerGlowPrimary {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translate(-50px, 30px) scale(1.18);
                        opacity: 1;
                    }
                }

                @keyframes bannerGlowSecondary {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.4;
                    }
                    100% {
                        transform: translate(60px, -40px) scale(1.22);
                        opacity: 0.9;
                    }
                }

                @keyframes bannerGlowAccent {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-30px, 20px) scale(1.35);
                        opacity: 0.7;
                    }
                }

                /* Floating particles for banner */
                .banner-particle-service {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: floatParticleService 16s ease-in-out infinite;
                }

                @keyframes floatParticleService {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.2;
                    }
                    25% {
                        transform: translate(35px, -45px) scale(1.3);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(-25px, -20px) scale(0.8);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translate(45px, 35px) scale(1.15);
                        opacity: 0.7;
                    }
                }

                /* 🌟 CARD GLOW EFFECT */
                .card-glow {
                    position: absolute;
                    inset: -2px;
                    border-radius: 2rem;
                    background: linear-gradient(135deg, rgba(70, 166, 217, 0.3), rgba(24, 59, 115, 0.1), rgba(70, 166, 217, 0.3));
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    pointer-events: none;
                    z-index: 0;
                }

                .group:hover .card-glow {
                    opacity: 1;
                }

                /* Spin animation */
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Pulse animation for badges */
                @keyframes pulse-badge {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .pulse-badge {
                    animation: pulse-badge 2s ease-in-out infinite;
                }

                /* Shimmer animation for gradient bar */
                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
            `}</style>

            {/* Page Background Glow */}
            <div className="page-glow-services" />

            <Header />

            <main className="relative overflow-hidden" style={{
                background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 25%, #f5f9ff 50%, #e8f2fc 75%, #f0f9ff 100%)",
                position: "relative",
                zIndex: 1,
            }}>
                <br/><br/>
                <br/><br/>
                <br/><br/>
                <br/><br/>

                {/* Background Decoration */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
                    />

                    <motion.div
                        animate={{
                            x: [0, -60, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-40 top-[30rem] h-[32rem] w-[32rem] rounded-full bg-secondary/10 blur-3xl"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_45%)]" />
                </div>

                <Container>
                    {/* ======================================================
                        SERVICES PAGE INTRO - BANNER SECTION
                    ======================================================= */}

                    <section className="relative pb-14 pt-20 md:pb-20 md:pt-28">
                        {/* 🌟 BANNER GLOW EFFECTS */}
                        <div className="banner-glow-primary" />
                        <div className="banner-glow-secondary" />
                        <div className="banner-glow-accent" />

                        {/* Floating Particles */}
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "8px", 
                                height: "8px", 
                                top: "10%", 
                                left: "5%",
                                animationDelay: "0s",
                                animationDuration: "14s",
                                background: "rgba(70, 166, 217, 0.25)"
                            }} 
                        />
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "12px", 
                                height: "12px", 
                                top: "18%", 
                                right: "8%",
                                animationDelay: "2s",
                                animationDuration: "16s",
                                background: "rgba(24, 59, 115, 0.15)"
                            }} 
                        />
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "6px", 
                                height: "6px", 
                                bottom: "30%", 
                                left: "12%",
                                animationDelay: "4s",
                                animationDuration: "12s",
                                background: "rgba(70, 166, 217, 0.20)"
                            }} 
                        />
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "10px", 
                                height: "10px", 
                                bottom: "20%", 
                                right: "5%",
                                animationDelay: "1s",
                                animationDuration: "18s",
                                background: "rgba(24, 59, 115, 0.12)"
                            }} 
                        />
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "7px", 
                                height: "7px", 
                                top: "50%", 
                                left: "3%",
                                animationDelay: "3s",
                                animationDuration: "15s",
                                background: "rgba(70, 166, 217, 0.18)"
                            }} 
                        />
                        <div 
                            className="banner-particle-service" 
                            style={{ 
                                width: "9px", 
                                height: "9px", 
                                top: "5%", 
                                right: "20%",
                                animationDelay: "5s",
                                animationDuration: "13s",
                                background: "rgba(24, 59, 115, 0.14)"
                            }} 
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            style={{
                                margin: "0 auto",
                                maxWidth: "896px",
                                textAlign: "center",
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "9999px",
                                    border: "1px solid rgba(70,166,217,0.25)",
                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                    padding: "10px 20px",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    color: "#46A6D9",
                                    backdropFilter: "blur(12px)",
                                    boxShadow: "0 8px 30px rgba(70, 166, 217, 0.08)",
                                }}
                            >
                                <Sparkles style={{ height: "16px", width: "16px" }} />

                                {isFa ? "خدمات ما" : (t.servicesPage?.badge || "Our Services")}
                            </motion.div>

                            <h1
                                style={{
                                    marginTop: "28px",
                                    fontSize: "48px",
                                    fontWeight: "900",
                                    letterSpacing: "-0.025em",
                                    color: "#183B73",
                                    textAlign: "center",
                                    textShadow: "0 2px 40px rgba(70, 166, 217, 0.06)",
                                }}
                            >
                                {isFa ? "خدمات ما" : (t.servicesPage?.title || "Our Services")}
                            </h1>

                            {/* ======================================================
                                BEAUTIFUL CENTER-ALIGNED TEXT WITH DIRECT INLINE STYLES
                            ====================================================== */}

                            <div
                                style={{
                                    margin: "32px auto 0 auto",
                                    maxWidth: "768px",
                                }}
                            >
                                {/* Decorative line above */}
                                <div
                                    style={{
                                        margin: "0 auto 24px auto",
                                        height: "4px",
                                        width: "64px",
                                        borderRadius: "9999px",
                                        background: "linear-gradient(to right, #46A6D9, #183B73)",
                                        boxShadow: "0 2px 10px rgba(70, 166, 217, 0.2)",
                                    }}
                                />

                                {/* Main tagline with attractive gradient */}
                                <h2
                                    style={{
                                        fontSize: "32px",
                                        fontWeight: "900",
                                        letterSpacing: "-0.025em",
                                        textAlign: "center",
                                        background: "linear-gradient(135deg, #183B73 0%, #46A6D9 50%, #7EC8E3 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {isFa 
                                        ? "راه‌حل‌های خلاقانه برای هر کسب‌وکار"
                                        : "Creative Solutions For Every Business"}
                                </h2>

                                {/* Decorative stars */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        marginBottom: "16px",
                                    }}
                                >
                                    <Star style={{ height: "14px", width: "14px", fill: "#46A6D9", color: "#46A6D9" }} />
                                    <Star style={{ height: "14px", width: "14px", fill: "#46A6D9", color: "#46A6D9" }} />
                                    <Star style={{ height: "14px", width: "14px", fill: "#46A6D9", color: "#46A6D9" }} />
                                </div>

                                {/* Description paragraph with center alignment */}
                                <p
                                    style={{
                                        fontSize: "18px",
                                        lineHeight: "2",
                                        color: "#475569",
                                        textAlign: "center",
                                        maxWidth: "720px",
                                        margin: "0 auto",
                                        direction: isFa ? "rtl" : "ltr",
                                        fontWeight: 450,
                                    }}
                                >
                                    {isFa 
                                        ? "از برندسازی و توسعه وب‌سایت گرفته تا تولید ویدیو و بازاریابی دیجیتال، ما خدمات خلاقانه کاملی را ارائه می‌دهیم که به کسب‌وکارها کمک می‌کند رشد کنند و متمایز شوند."
                                        : "From branding and website development to video production and digital marketing, we provide complete creative services that help businesses grow and stand out."}
                                </p>

                                {/* Decorative line below */}
                                <div
                                    style={{
                                        margin: "24px auto 0 auto",
                                        height: "4px",
                                        width: "64px",
                                        borderRadius: "9999px",
                                        background: "linear-gradient(to right, #183B73, #46A6D9)",
                                        boxShadow: "0 2px 10px rgba(70, 166, 217, 0.2)",
                                    }}
                                />
                            </div>
                        </motion.div>
                    </section>

                    {/* ======================================================
                        DATABASE SERVICES - ENHANCED CARDS
                    ======================================================= */}

                    <section
                        id="services"
                        className="relative scroll-mt-24 pb-24 md:pb-32"
                    >
                        {services.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mx-auto max-w-2xl rounded-[2rem] border border-dashed border-slate-300 bg-white/80 px-6 py-20 text-center shadow-sm backdrop-blur-sm"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                                    <Layers3 className="h-7 w-7 text-slate-400" />
                                </div>

                                <p className="mt-5 text-lg font-medium text-slate-500">
                                    {isFa 
                                        ? "در حال حاضر هیچ خدماتی در دسترس نیست."
                                        : (t.servicesPage?.noServices || "No services available at the moment.")}
                                </p>
                            </motion.div>
                        ) : (
                            <div className="grid gap-8 lg:grid-cols-2">
                                {services.map((service, index) => {
                                    // Get the correct title and description based on language
                                    const serviceTitle = isFa 
                                        ? service.title_fa || service.title
                                        : service.title_en || service.title;
                                    
                                    const serviceDescription = isFa
                                        ? service.short_description_fa || service.description
                                        : service.short_description_en || service.description;

                                    const themeColor = service.theme_color || "#183B73";

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
                                                duration: 0.7,
                                                delay: index * 0.08,
                                            }}
                                            whileHover={{
                                                y: -10,
                                            }}
                                            className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all duration-500"
                                            style={{
                                                boxShadow: "0 20px 60px rgba(24, 59, 115, 0.08)",
                                            }}
                                        >
                                            {/* Card Glow Effect */}
                                            <div className="card-glow" />

                                            {/* Theme Color Gradient Bar - Now using inline style with shimmer class */}
                                            <div
                                                className="absolute inset-x-0 top-0 z-10 h-2"
                                                style={{
                                                    background: `linear-gradient(90deg, ${themeColor}, #46A6D9, ${themeColor})`,
                                                    backgroundSize: "200% auto",
                                                    animation: "shimmer 3s linear infinite",
                                                }}
                                            />

                                            {/* ==================================================
                                                SERVICE IMAGE - ENHANCED
                                            ================================================== */}

                                            <div
                                                style={{
                                                    position: "relative",
                                                    height: "288px",
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
                                                            transition: "transform 0.7s ease",
                                                        }}
                                                        className="group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "100%",
                                                            height: "100%",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            background: `linear-gradient(135deg, ${themeColor}, #46A6D9)`,
                                                        }}
                                                    >
                                                        <Layers3
                                                            style={{
                                                                width: "72px",
                                                                height: "72px",
                                                                color: "rgba(255,255,255,0.6)",
                                                            }}
                                                        />
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                                                {/* Service Icon / Arrow - Enhanced */}
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
                                                            width: "60px",
                                                            height: "60px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            overflow: "hidden",
                                                            borderRadius: "18px",
                                                            border: "1px solid rgba(255,255,255,0.35)",
                                                            background: "rgba(255,255,255,0.16)",
                                                            boxShadow:
                                                                "0 12px 30px rgba(0,0,0,0.22), inset 0 1px 1px rgba(255,255,255,0.25)",
                                                            backdropFilter: "blur(12px)",
                                                            WebkitBackdropFilter: "blur(12px)",
                                                            transition: "all 0.5s ease",
                                                        }}
                                                        className="group-hover:scale-110 group-hover:rotate-6"
                                                    >
                                                        {/* Inner icon background */}
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                inset: "4px",
                                                                borderRadius: "14px",
                                                                background: `linear-gradient(135deg, ${themeColor}ee, ${themeColor}99)`,
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
                                                                    width: "52px",
                                                                    height: "52px",
                                                                    objectFit: "cover",
                                                                    objectPosition: "center",
                                                                    borderRadius: "50%",
                                                                    filter:
                                                                        "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                                                                }}
                                                            />
                                                        ) : (
                                                            <Layers3
                                                                style={{
                                                                    position: "relative",
                                                                    zIndex: 2,
                                                                    width: "28px",
                                                                    height: "28px",
                                                                    color: "#ffffff",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Featured Badge - Enhanced */}
                                                {service.is_featured && (
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "20px",
                                                            right: "20px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "6px",
                                                            padding: "6px 16px",
                                                            borderRadius: "9999px",
                                                            background: "rgba(255,215,0,0.9)",
                                                            border: "1px solid rgba(255,215,0,0.3)",
                                                            boxShadow: "0 8px 25px rgba(255,215,0,0.3)",
                                                            backdropFilter: "blur(10px)",
                                                            fontSize: "0.65rem",
                                                            fontWeight: 800,
                                                            color: "#183B73",
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.08em",
                                                            zIndex: 10,
                                                        }}
                                                        className="pulse-badge"
                                                    >
                                                        <Star size={12} style={{ fill: "#183B73", color: "#183B73" }} />
                                                        {isFa ? "ویژه" : "Featured"}
                                                    </div>
                                                )}

                                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                                                    <h2 className="text-3xl font-black text-white drop-shadow-lg sm:text-4xl">
                                                        {serviceTitle}
                                                    </h2>

                                                    <div
                                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300"
                                                        style={{
                                                            transition: "all 0.3s ease",
                                                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = themeColor;
                                                            e.currentTarget.style.transform = "scale(1.15) rotate(8deg)";
                                                            e.currentTarget.style.boxShadow = `0 8px 30px ${themeColor}60`;
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                                                            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                                                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                                                        }}
                                                    >
                                                        <ArrowUpRight className="h-5 w-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ==================================================
                                                SERVICE CONTENT - ENHANCED WITH MORE PADDING
                                            ================================================== */}

                                            <div className="p-8 sm:p-10">
                                                {/* Description - Added more padding bottom */}
                                                <p className="leading-8 text-slate-600 text-base">
                                                    {serviceDescription}
                                                </p>

                                                {/* Divider with gradient */}
                                                <div
                                                    style={{
                                                        margin: "24px 0",
                                                        height: "1px",
                                                        background: `linear-gradient(90deg, ${themeColor}40, ${themeColor}10, transparent)`,
                                                    }}
                                                />

                                                {/* ==================================================
                                                    SERVICE PACKAGES - ENHANCED
                                                ================================================== */}

                                                {service.packages &&
                                                    service.packages.length > 0 && (
                                                        <div className="mt-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center gap-2">
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            padding: "6px",
                                                                            borderRadius: "10px",
                                                                            background: `${themeColor}15`,
                                                                        }}
                                                                    >
                                                                        <Layers3
                                                                            className="h-5 w-5"
                                                                            style={{
                                                                                color: themeColor,
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <h3 className="text-lg font-bold text-slate-900">
                                                                        {isFa 
                                                                            ? "پلن‌ها"
                                                                            : (t.servicesPage?.packages || "Packages")}
                                                                    </h3>
                                                                </div>

                                                                <div className="h-px flex-1 bg-slate-200" />
                                                            </div>

                                                            <div className="mt-5 space-y-4">
                                                                {service.packages.map(
                                                                    (pkg) => {
                                                                        const packageName =
                                                                            isFa
                                                                                ? pkg.name.fa || pkg.name.en
                                                                                : pkg.name.en || pkg.name.fa;
                                                                        
                                                                        const packageDescription =
                                                                            isFa
                                                                                ? pkg.description?.fa || pkg.description?.en
                                                                                : pkg.description?.en || pkg.description?.fa;

                                                                        const packageFeatures =
                                                                            isFa
                                                                                ? pkg.features?.fa || []
                                                                                : pkg.features?.en || [];

                                                                        return (
                                                                            <motion.div
                                                                                key={
                                                                                    pkg.id
                                                                                }
                                                                                whileHover={{
                                                                                    scale: 1.02,
                                                                                }}
                                                                                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6 transition-all duration-300"
                                                                                style={{
                                                                                    transition: "all 0.3s ease",
                                                                                    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                                                                                }}
                                                                                onMouseEnter={(e) => {
                                                                                    e.currentTarget.style.borderColor = `${themeColor}40`;
                                                                                    e.currentTarget.style.background = `rgba(255,255,255,0.95)`;
                                                                                    e.currentTarget.style.boxShadow = `0 8px 30px ${themeColor}15`;
                                                                                }}
                                                                                onMouseLeave={(e) => {
                                                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                                                    e.currentTarget.style.background = "rgba(241,245,249,0.8)";
                                                                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)";
                                                                                }}
                                                                            >
                                                                                {/* Package Header */}
                                                                                <div className="flex items-start justify-between gap-4">
                                                                                    <div>
                                                                                        <div className="flex flex-wrap items-center gap-2">
                                                                                            <h4 className="font-bold text-slate-900 text-lg">
                                                                                                {
                                                                                                    packageName
                                                                                                }
                                                                                            </h4>

                                                                                            {pkg.is_featured && (
                                                                                                <span
                                                                                                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg"
                                                                                                    style={{
                                                                                                        background: `linear-gradient(135deg, ${themeColor}, #46A6D9)`,
                                                                                                        boxShadow: `0 4px 15px ${themeColor}50`,
                                                                                                    }}
                                                                                                >
                                                                                                    {isFa
                                                                                                        ? "محبوب"
                                                                                                        : "Popular"}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>

                                                                                        {packageDescription && (
                                                                                            <>
                                                                                                <br />
                                                                                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                                                                                    {
                                                                                                        packageDescription
                                                                                                    }
                                                                                                </p>
                                                                                            </>
                                                                                        )}
                                                                                    </div>

                                                                                    {/* Price - Enhanced */}
                                                                                    <span
                                                                                        className="shrink-0 rounded-xl px-4 py-2 text-sm font-bold shadow-sm"
                                                                                        style={{
                                                                                            background: `${themeColor}12`,
                                                                                            color: themeColor,
                                                                                            boxShadow: `0 2px 10px ${themeColor}20`,
                                                                                        }}
                                                                                    >
                                                                                        {isFa
                                                                                            ? `${formatPriceFa(pkg.price)} $`
                                                                                            : typeof pkg.price === "number"
                                                                                            ? `$${pkg.price}`
                                                                                            : pkg.price}
                                                                                    </span>
                                                                                </div>

                                                                                <br />

                                                                                {/* Package Information */}
                                                                                <div className="mt-4 flex flex-wrap gap-2">
                                                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm border border-slate-100">
                                                                                        <Clock3
                                                                                            className="h-3.5 w-3.5"
                                                                                            style={{
                                                                                                color: themeColor,
                                                                                            }}
                                                                                        />

                                                                                        {isFa
                                                                                            ? `${formatNumberFa(pkg.delivery_days)} روز`
                                                                                            : `${pkg.delivery_days} ${t.services?.days || "days"}`}
                                                                                    </span>

                                                                                    {pkg.revisions >
                                                                                        0 && (
                                                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm border border-slate-100">
                                                                                            <CheckCircle
                                                                                                className="h-3.5 w-3.5"
                                                                                                style={{
                                                                                                    color: themeColor,
                                                                                                }}
                                                                                            />

                                                                                            {isFa
                                                                                                ? `${formatNumberFa(pkg.revisions)} بازبینی`
                                                                                                : `${pkg.revisions} ${t.services?.revisions || "revisions"}`}
                                                                                        </span>
                                                                                    )}
                                                                                </div>

                                                                                <br />

                                                                                {/* Package Features - Enhanced */}
                                                                                {packageFeatures &&
                                                                                    packageFeatures.length > 0 && (
                                                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                                                            {packageFeatures.map(
                                                                                                (
                                                                                                    feature,
                                                                                                    idx
                                                                                                ) => (
                                                                                                    <span
                                                                                                        key={
                                                                                                            idx
                                                                                                        }
                                                                                                        className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all duration-200"
                                                                                                        style={{
                                                                                                            borderColor: `${themeColor}20`,
                                                                                                            background: `${themeColor}08`,
                                                                                                            color: themeColor,
                                                                                                        }}
                                                                                                        onMouseEnter={(e) => {
                                                                                                            e.currentTarget.style.background = `${themeColor}15`;
                                                                                                            e.currentTarget.style.transform = "scale(1.05)";
                                                                                                        }}
                                                                                                        onMouseLeave={(e) => {
                                                                                                            e.currentTarget.style.background = `${themeColor}08`;
                                                                                                            e.currentTarget.style.transform = "scale(1)";
                                                                                                        }}
                                                                                                    >
                                                                                                        <span className="mr-1">✦</span>
                                                                                                        {
                                                                                                            feature
                                                                                                        }
                                                                                                    </span>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                            </motion.div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {/* ==================================================
                                                    SERVICE ACTIONS - ENHANCED WITH MORE PADDING
                                                ================================================== */}

                                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        className="h-12 flex-1 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all duration-300"
                                                        style={{
                                                            borderColor: `${themeColor}30`,
                                                            transition: "all 0.3s ease",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.borderColor = themeColor;
                                                            e.currentTarget.style.boxShadow = `0 4px 20px ${themeColor}20`;
                                                            e.currentTarget.style.transform = "translateY(-2px)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.borderColor = `${themeColor}30`;
                                                            e.currentTarget.style.boxShadow = "none";
                                                            e.currentTarget.style.transform = "translateY(0)";
                                                        }}
                                                    >
                                                        <Link
                                                            href={`/services/${service.slug}`}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "8px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {isFa
                                                                ? "جزئیات"
                                                                : (t.services?.details || "View Details")}

                                                            <ArrowUpRight className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        asChild
                                                        className="h-12 flex-1 rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${themeColor}, #46A6D9)`,
                                                            boxShadow: `0 8px 30px ${themeColor}40`,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.boxShadow = `0 12px 40px ${themeColor}60`;
                                                            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.boxShadow = `0 8px 30px ${themeColor}40`;
                                                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                        }}
                                                    >
                                                        <Link
                                                            href={`/order?service=${service.slug}`}
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                gap: "8px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {isFa
                                                                ? "سفارش دهید"
                                                                : (t.services?.orderNow || "Order Now")}

                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </div>

                                                {/* Bottom Accent - Enhanced */}
                                                <div
                                                    className="mt-8 h-1 w-0 rounded-full transition-all duration-700 group-hover:w-full"
                                                    style={{
                                                        background: `linear-gradient(90deg, ${themeColor}, #46A6D9, ${themeColor})`,
                                                        backgroundSize: "200% auto",
                                                    }}
                                                />
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </Container>
            </main>

            <Footer />
        </>
    );
}