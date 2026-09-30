"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Clock3,
    Loader2,
    ShieldCheck,
    Zap,
    MessageCircle,
    ArrowUpRight,
    Layers3,
    Star,
    Gem,
    Rocket,
    Heart,
    Award,
    ThumbsUp,
    Users,
} from "lucide-react";

import { api } from "@/services/api";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
        console.error("NEXT_PUBLIC_API_URL is not configured.");
        return null;
    }

    return `${baseUrl}/storage/${path.replace(/^\/+/, "")}`;
};

interface Service {
    id: number;
    title: string;
    description: string;
    cover_image: string | null;
    features: string[];
    delivery_time: string | null;
    slug: string;
    title_fa?: string;
    description_fa?: string;
    features_fa?: string[];
}

export default function ServiceDetailsPage() {
    const { language, t } = useLanguage();
    const { slug } = useParams();

    const isPersian = language === "fa";

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadService() {
            try {
                const response = await api.get(`/services/${slug}`);
                setService(response.data.data);
            } catch (error) {
                console.error("Failed to load service:", error);
                setService(null);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            loadService();
        }
    }, [slug]);

    /* ============================================================
       Number Formatting Helpers - Language Aware
    ============================================================ */
    const formatNumber = (num: number): string => {
        if (isPersian) {
            const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
            return String(num)
                .split("")
                .map((digit) => persianDigits[parseInt(digit)] || digit)
                .join("");
        }
        return String(num);
    };

    const formatPrice = (price: number | string): string => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        if (isNaN(num)) return isPersian ? "۰" : "0";
        
        if (isPersian) {
            const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
            return String(Math.round(num))
                .split("")
                .map((digit) => persianDigits[parseInt(digit)] || digit)
                .join("");
        }
        return String(Math.round(num));
    };

    /* ============================================================
       Localized Helpers
    ============================================================ */
    const getTitle = () => {
        return isPersian && service?.title_fa
            ? service.title_fa
            : service?.title || "";
    };

    const getDescription = () => {
        return isPersian && service?.description_fa
            ? service.description_fa
            : service?.description || "";
    };

    const getFeatures = () => {
        if (isPersian && service?.features_fa && service.features_fa.length > 0) {
            return service.features_fa;
        }
        return service?.features || [];
    };

    const features = getFeatures();

    /* ============================================================
       Loading State - Enhanced
    ============================================================ */
    if (loading) {
        return (
            <>
                <Header />

                <main 
                    dir={isPersian ? "rtl" : "ltr"}
                    className="relative min-h-[75vh] overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#46A6D9]/15 blur-3xl" />
                        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#183B73]/10 blur-3xl" />
                        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#46A6D9]/5 blur-3xl" />
                    </div>

                    <Container>
                        <div className="relative flex min-h-[75vh] items-center justify-center">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <div 
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        height: "80px",
                                        width: "80px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div 
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: "50%",
                                            background: "rgba(70, 166, 217, 0.1)",
                                            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                                        }}
                                    />

                                    <div 
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            height: "64px",
                                            width: "64px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "20px",
                                            background: "linear-gradient(135deg, #46A6D9, #183B73)",
                                            boxShadow: "0 15px 40px rgba(70, 166, 217, 0.3)",
                                        }}
                                    >
                                        <Loader2 
                                            size={28} 
                                            style={{
                                                color: "white",
                                                animation: "spin 1s linear infinite",
                                            }}
                                        />
                                    </div>
                                </div>

                                <p 
                                    style={{
                                        marginTop: "24px",
                                        fontSize: "1.125rem",
                                        fontWeight: 600,
                                        color: "#475569",
                                    }}
                                >
                                    {isPersian
                                        ? "در حال بارگذاری سرویس..."
                                        : "Loading service..."}
                                </p>
                            </motion.div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    /* ============================================================
       Not Found State - Enhanced
    ============================================================ */
    if (!service) {
        return (
            <>
                <Header />

                <main 
                    dir={isPersian ? "rtl" : "ltr"}
                    className="relative min-h-[75vh] overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                    }}
                >
                    <Container>
                        <div 
                            style={{
                                display: "flex",
                                minHeight: "75vh",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0 16px",
                            }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                style={{
                                    width: "100%",
                                    maxWidth: "560px",
                                    borderRadius: "32px",
                                    border: "1px solid rgba(255, 255, 255, 0.8)",
                                    background: "rgba(255, 255, 255, 0.85)",
                                    padding: "40px 32px",
                                    textAlign: "center",
                                    boxShadow: "0 25px 80px rgba(24, 59, 115, 0.12)",
                                    backdropFilter: "blur(20px)",
                                }}
                            >
                                <div 
                                    style={{
                                        margin: "0 auto",
                                        display: "flex",
                                        height: "80px",
                                        width: "80px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "24px",
                                        background: "rgba(70, 166, 217, 0.1)",
                                        color: "#46A6D9",
                                    }}
                                >
                                    <Layers3 size={36} />
                                </div>

                                <h2 
                                    style={{
                                        marginTop: "28px",
                                        fontSize: "2rem",
                                        fontWeight: 900,
                                        color: "#0f172a",
                                    }}
                                >
                                    {isPersian
                                        ? "سرویس یافت نشد"
                                        : "Service Not Found"}
                                </h2>

                                <p 
                                    style={{
                                        marginTop: "16px",
                                        lineHeight: 1.8,
                                        color: "#64748b",
                                    }}
                                >
                                    {isPersian
                                        ? "سرویس مورد نظر شما پیدا نشد. لطفاً به صفحه خدمات بازگردید."
                                        : "The service you're looking for could not be found. Please return to the services page."}
                                </p>

                                <Button
                                    asChild
                                    style={{
                                        marginTop: "32px",
                                        height: "48px",
                                        borderRadius: "14px",
                                        padding: "0 28px",
                                    }}
                                >
                                    <Link href="/services">
                                        {isPersian
                                            ? "بازگشت به خدمات"
                                            : "Back to Services"}
                                        <ArrowRight 
                                            size={16} 
                                            style={{
                                                marginLeft: "8px",
                                                transform: isPersian ? "rotate(180deg)" : "none",
                                            }}
                                        />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    const title = getTitle();
    const description = getDescription();

    return (
        <>
            <Header />

            <main 
                dir={isPersian ? "rtl" : "ltr"}
                className="relative overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 25%, #f5f9ff 50%, #e8f2fc 75%, #f0f9ff 100%)",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* 🌟 GLOBAL STYLES FOR PAGE BACKGROUND */}
                <style jsx global>{`
                    /* Animated page glow overlay */
                    .page-glow-service {
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
                        animation: pageGlowService 22s ease-in-out infinite alternate;
                    }

                    @keyframes pageGlowService {
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
                    .banner-glow-primary-service {
                        position: absolute;
                        top: -180px;
                        right: -120px;
                        width: 550px;
                        height: 550px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(70, 166, 217, 0.25) 0%, rgba(70, 166, 217, 0.06) 35%, transparent 70%);
                        filter: blur(120px);
                        pointer-events: none;
                        animation: bannerGlowPrimaryService 11s ease-in-out infinite alternate;
                    }

                    .banner-glow-secondary-service {
                        position: absolute;
                        bottom: -160px;
                        left: -100px;
                        width: 500px;
                        height: 500px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(24, 59, 115, 0.18) 0%, rgba(24, 59, 115, 0.04) 40%, transparent 70%);
                        filter: blur(120px);
                        pointer-events: none;
                        animation: bannerGlowSecondaryService 13s ease-in-out infinite alternate;
                    }

                    .banner-glow-accent-service {
                        position: absolute;
                        top: 35%;
                        left: 25%;
                        width: 300px;
                        height: 300px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(70, 166, 217, 0.10) 0%, rgba(70, 166, 217, 0.02) 50%, transparent 70%);
                        filter: blur(90px);
                        pointer-events: none;
                        animation: bannerGlowAccentService 9s ease-in-out infinite alternate;
                    }

                    @keyframes bannerGlowPrimaryService {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 0.5;
                        }
                        100% {
                            transform: translate(-45px, 25px) scale(1.18);
                            opacity: 1;
                        }
                    }

                    @keyframes bannerGlowSecondaryService {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 0.4;
                        }
                        100% {
                            transform: translate(55px, -35px) scale(1.22);
                            opacity: 0.9;
                        }
                    }

                    @keyframes bannerGlowAccentService {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 0.3;
                        }
                        100% {
                            transform: translate(-25px, 18px) scale(1.35);
                            opacity: 0.7;
                        }
                    }

                    /* Floating particles for banner */
                    .banner-particle-service-detail {
                        position: absolute;
                        border-radius: 50%;
                        pointer-events: none;
                        animation: floatParticleServiceDetail 16s ease-in-out infinite;
                    }

                    @keyframes floatParticleServiceDetail {
                        0%, 100% {
                            transform: translate(0, 0) scale(1);
                            opacity: 0.2;
                        }
                        25% {
                            transform: translate(30px, -40px) scale(1.3);
                            opacity: 0.6;
                        }
                        50% {
                            transform: translate(-20px, -18px) scale(0.8);
                            opacity: 0.4;
                        }
                        75% {
                            transform: translate(40px, 30px) scale(1.15);
                            opacity: 0.7;
                        }
                    }

                    /* Existing animations */
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.6; transform: scale(1); }
                        50% { opacity: 1; transform: scale(1.05); }
                    }
                    @keyframes shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-15px) rotate(2deg); }
                        66% { transform: translateY(5px) rotate(-1deg); }
                    }
                    @keyframes float-reverse {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(15px) rotate(-2deg); }
                        66% { transform: translateY(-5px) rotate(1deg); }
                    }
                    @keyframes ping {
                        0% { transform: scale(1); opacity: 1; }
                        100% { transform: scale(2); opacity: 0; }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .float-animation {
                        animation: float 6s ease-in-out infinite;
                    }
                    .float-slow {
                        animation: float-slow 8s ease-in-out infinite;
                    }
                    .float-reverse {
                        animation: float-reverse 7s ease-in-out infinite;
                    }
                    .pulse-glow {
                        animation: pulse-glow 3s ease-in-out infinite;
                    }
                    .shimmer-text {
                        background: linear-gradient(90deg, #183B73, #46A6D9, #6BBBE3, #46A6D9, #183B73);
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                        animation: shimmer 4s linear infinite;
                    }
                    .group-hover\\:w-full:hover {
                        width: 100% !important;
                    }
                    .group-hover\\:scale-110:hover {
                        transform: scale(1.1) !important;
                    }
                    .group-hover\\:rotate-3:hover {
                        transform: rotate(3deg) !important;
                    }
                    .group-hover\\:scale-125:hover {
                        transform: scale(1.25) !important;
                    }
                    .group-hover\\:scale-150:hover {
                        transform: scale(1.5) !important;
                    }
                    .group-hover\\:scale-105:hover {
                        transform: scale(1.05) !important;
                    }
                `}</style>

                {/* Page Background Glow */}
                <div className="page-glow-service" />

                {/* ============================================================
                    GLOBAL BACKGROUND
                ============================================================ */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            x: [0, 80, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            left: "-160px",
                            top: "80px",
                            width: "450px",
                            height: "450px",
                            borderRadius: "50%",
                            background: "rgba(70, 166, 217, 0.08)",
                            filter: "blur(100px)",
                        }}
                    />

                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            right: "-160px",
                            top: "35%",
                            width: "500px",
                            height: "500px",
                            borderRadius: "50%",
                            background: "rgba(24, 59, 115, 0.06)",
                            filter: "blur(120px)",
                        }}
                    />

                    <div 
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle at top, rgba(255,255,255,0.9), transparent 50%)",
                        }}
                    />
                </div>

                <Container>
                    <div style={{ position: "relative", zIndex: 10 }}>
                        {/* ========================================================
                            BREADCRUMB
                        ======================================================== */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            style={{
                                paddingTop: "32px",
                            }}
                        >
                            <Link
                                href="/services"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    color: "#64748b",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                    padding: "8px 16px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.6)",
                                    backdropFilter: "blur(10px)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#46A6D9";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#64748b";
                                }}
                            >
                                <ArrowRight 
                                    size={16} 
                                    style={{
                                        transform: isPersian ? "rotate(180deg)" : "none",
                                        transition: "transform 0.3s ease",
                                    }}
                                />

                                {isPersian
                                    ? "بازگشت به خدمات"
                                    : "Back to Services"}

                                <span style={{ color: "#cbd5e1" }}>/</span>

                                <span 
                                    style={{
                                        maxWidth: "180px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        color: "#183B73",
                                        fontWeight: 600,
                                    }}
                                >
                                    {title}
                                </span>
                            </Link>
                        </motion.div>

                        {/* ========================================================
                            HERO - With Banner Glow Effects
                        ======================================================== */}
                        <section 
                            style={{
                                position: "relative",
                                paddingTop: "60px",
                                paddingBottom: "60px",
                            }}
                        >
                            {/* 🌟 BANNER GLOW EFFECTS */}
                            <div className="banner-glow-primary-service" />
                            <div className="banner-glow-secondary-service" />
                            <div className="banner-glow-accent-service" />

                            {/* Floating Particles */}
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "8px", 
                                    height: "8px", 
                                    top: "8%", 
                                    left: "5%",
                                    animationDelay: "0s",
                                    animationDuration: "14s",
                                    background: "rgba(70, 166, 217, 0.25)"
                                }} 
                            />
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "12px", 
                                    height: "12px", 
                                    top: "15%", 
                                    right: "8%",
                                    animationDelay: "2s",
                                    animationDuration: "16s",
                                    background: "rgba(24, 59, 115, 0.15)"
                                }} 
                            />
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "6px", 
                                    height: "6px", 
                                    bottom: "35%", 
                                    left: "10%",
                                    animationDelay: "4s",
                                    animationDuration: "12s",
                                    background: "rgba(70, 166, 217, 0.20)"
                                }} 
                            />
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "10px", 
                                    height: "10px", 
                                    bottom: "25%", 
                                    right: "5%",
                                    animationDelay: "1s",
                                    animationDuration: "18s",
                                    background: "rgba(24, 59, 115, 0.12)"
                                }} 
                            />
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "7px", 
                                    height: "7px", 
                                    top: "45%", 
                                    left: "3%",
                                    animationDelay: "3s",
                                    animationDuration: "15s",
                                    background: "rgba(70, 166, 217, 0.18)"
                                }} 
                            />
                            <div 
                                className="banner-particle-service-detail" 
                                style={{ 
                                    width: "9px", 
                                    height: "9px", 
                                    top: "5%", 
                                    right: "18%",
                                    animationDelay: "5s",
                                    animationDuration: "13s",
                                    background: "rgba(24, 59, 115, 0.14)"
                                }} 
                            />

                            <div 
                                style={{
                                    display: "grid",
                                    alignItems: "center",
                                    gap: "48px",
                                    gridTemplateColumns: "1fr 1fr",
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                {/* Hero Content */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? 40 : -40,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                    }}
                                    style={{
                                        textAlign: isPersian ? "right" : "left",
                                        direction: isPersian ? "rtl" : "ltr",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "10px 20px",
                                            borderRadius: "9999px",
                                            border: "1px solid rgba(70, 166, 217, 0.25)",
                                            background: "rgba(255, 255, 255, 0.85)",
                                            boxShadow: "0 8px 30px rgba(70, 166, 217, 0.1)",
                                            backdropFilter: "blur(20px)",
                                            fontSize: "0.875rem",
                                            fontWeight: 700,
                                            color: "#46A6D9",
                                        }}
                                    >
                                        <Sparkles 
                                            size={16} 
                                            style={{
                                                animation: "pulse-glow 2s ease-in-out infinite",
                                            }}
                                        />
                                        {isPersian
                                            ? "جزئیات سرویس"
                                            : "Service Details"}
                                    </div>

                                    <h1
                                        style={{
                                            marginTop: "28px",
                                            maxWidth: "700px",
                                            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                                            fontWeight: 950,
                                            lineHeight: 1.08,
                                            letterSpacing: "-0.03em",
                                            color: "#183B73",
                                            textAlign: isPersian ? "right" : "left",
                                            textShadow: "0 2px 40px rgba(70, 166, 217, 0.06)",
                                        }}
                                    >
                                        <span className="shimmer-text">
                                            {title}
                                        </span>
                                    </h1>

                                    {/* Visual Elements Below Title */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "12px",
                                            marginTop: "20px",
                                            marginBottom: "16px",
                                            direction: isPersian ? "rtl" : "ltr",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "3px",
                                                background: isPersian 
                                                    ? "linear-gradient(270deg, #46A6D9, #183B73)" 
                                                    : "linear-gradient(90deg, #46A6D9, #183B73)",
                                                borderRadius: "2px",
                                                opacity: 0.7,
                                            }}
                                        />

                                        <div
                                            style={{
                                                width: "12px",
                                                height: "12px",
                                                background: "linear-gradient(135deg, #46A6D9, #183B73)",
                                                transform: "rotate(45deg)",
                                                borderRadius: "2px",
                                                boxShadow: "0 0 20px rgba(70, 166, 217, 0.3)",
                                                flexShrink: 0,
                                            }}
                                        />

                                        <div
                                            style={{
                                                width: "40px",
                                                height: "3px",
                                                background: isPersian 
                                                    ? "linear-gradient(270deg, #183B73, #46A6D9)" 
                                                    : "linear-gradient(90deg, #183B73, #46A6D9)",
                                                borderRadius: "2px",
                                                opacity: 0.7,
                                            }}
                                        />
                                    </div>

                                    {/* Decorative dots */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            gap: "8px",
                                            marginBottom: "12px",
                                            direction: isPersian ? "rtl" : "ltr",
                                            width: "100%",
                                        }}
                                    >
                                        {[0.2, 0.4, 0.6, 0.8, 0.6, 0.4, 0.2].map((opacity, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: "6px",
                                                    height: "6px",
                                                    borderRadius: "50%",
                                                    background: "#46A6D9",
                                                    opacity: opacity,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Rating / Trust Badge */}
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "6px 16px",
                                            borderRadius: "9999px",
                                            background: "rgba(255,255,255,0.7)",
                                            border: "1px solid rgba(203,213,225,0.3)",
                                            backdropFilter: "blur(10px)",
                                            marginBottom: "12px",
                                            direction: isPersian ? "rtl" : "ltr",
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "2px" }}>
                                            {[1,2,3,4,5].map((i) => (
                                                <Star 
                                                    key={i} 
                                                    size={12} 
                                                    style={{ 
                                                        color: "#f59e0b",
                                                        fill: "#f59e0b",
                                                    }} 
                                                />
                                            ))}
                                        </div>
                                        <span
                                            style={{
                                                fontSize: "0.65rem",
                                                fontWeight: 700,
                                                color: "#475569",
                                            }}
                                        >
                                            {isPersian
                                                ? "۴.۹ از ۵ - بر اساس ۱۲۸ نظر"
                                                : "4.9 out of 5 - Based on 128 reviews"}
                                        </span>
                                    </div>

                                    <p
                                        style={{
                                            marginTop: "12px",
                                            maxWidth: "600px",
                                            fontSize: "1rem",
                                            lineHeight: 1.8,
                                            color: "#4a5a6e",
                                            fontWeight: 450,
                                            textAlign: isPersian ? "right" : "left",
                                        }}
                                    >
                                        {description}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "12px",
                                            marginTop: "32px",
                                            justifyContent: isPersian ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <Link
                                            href="/contact"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                minHeight: "48px",
                                                padding: "0 28px",
                                                borderRadius: "14px",
                                                background: "linear-gradient(135deg, #46A6D9, #6BBBE3, #8AC9E8)",
                                                color: "white",
                                                fontSize: "0.95rem",
                                                fontWeight: 800,
                                                textDecoration: "none",
                                                boxShadow: "0 12px 30px rgba(70, 166, 217, 0.35)",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                                                e.currentTarget.style.boxShadow = "0 20px 40px rgba(70, 166, 217, 0.45)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                e.currentTarget.style.boxShadow = "0 12px 30px rgba(70, 166, 217, 0.35)";
                                            }}
                                        >
                                            {isPersian
                                                ? "سفارش سرویس"
                                                : "Order Service"}
                                            <ArrowRight 
                                                size={18} 
                                                style={{
                                                    transform: isPersian ? "rotate(180deg)" : "none",
                                                }}
                                            />
                                        </Link>

                                        <Link
                                            href="#features"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                minHeight: "48px",
                                                padding: "0 24px",
                                                borderRadius: "14px",
                                                border: "2px solid rgba(70, 166, 217, 0.2)",
                                                background: "rgba(255,255,255,0.7)",
                                                color: "#183B73",
                                                fontSize: "0.95rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                                backdropFilter: "blur(12px)",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-3px)";
                                                e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.5)";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                                                e.currentTarget.style.boxShadow = "0 12px 30px rgba(70, 166, 217, 0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            {isPersian
                                                ? "مشاهده ویژگی‌ها"
                                                : "View Features"}
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </div>

                                    {/* Quick Benefits */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gap: "12px",
                                            marginTop: "32px",
                                            direction: isPersian ? "rtl" : "ltr",
                                        }}
                                    >
                                        {[
                                            {
                                                icon: ShieldCheck,
                                                label: isPersian
                                                    ? "امنیت بالا"
                                                    : "High Security",
                                            },
                                            {
                                                icon: Zap,
                                                label: isPersian
                                                    ? "عملکرد عالی"
                                                    : "Excellent Performance",
                                            },
                                            {
                                                icon: MessageCircle,
                                                label: isPersian
                                                    ? "پشتیبانی ۲۴/۷"
                                                    : "24/7 Support",
                                            },
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{
                                                    y: -4,
                                                    transition: { duration: 0.3 },
                                                }}
                                                style={{
                                                    padding: "16px",
                                                    borderRadius: "14px",
                                                    border: "1px solid rgba(255,255,255,0.8)",
                                                    background: "rgba(255,255,255,0.7)",
                                                    boxShadow: "0 6px 20px rgba(24,59,115,0.06)",
                                                    backdropFilter: "blur(20px)",
                                                    textAlign: "center",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(70,166,217,0.12)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                                                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(24,59,115,0.06)";
                                                }}
                                            >
                                                <item.icon 
                                                    size={20} 
                                                    style={{
                                                        color: "#46A6D9",
                                                        margin: "0 auto",
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        marginTop: "6px",
                                                        fontSize: "0.7rem",
                                                        fontWeight: 700,
                                                        color: "#475569",
                                                    }}
                                                >
                                                    {item.label}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Hero Image */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? -50 : 50,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.1,
                                    }}
                                    style={{ position: "relative" }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "-30px",
                                            borderRadius: "48px",
                                            background: "radial-gradient(circle at 30% 30%, rgba(70,166,217,0.2), rgba(24,59,115,0.1), rgba(70,166,217,0.05))",
                                            filter: "blur(50px)",
                                        }}
                                    />

                                    <motion.div
                                        className="float-slow"
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            maxWidth: "600px",
                                            overflow: "hidden",
                                            borderRadius: "40px",
                                            border: "2px solid rgba(255,255,255,0.9)",
                                            background: "rgba(255,255,255,0.8)",
                                            padding: "12px",
                                            boxShadow: "0 30px 100px rgba(24,59,115,0.15)",
                                            backdropFilter: "blur(20px)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "440px",
                                                overflow: "hidden",
                                                borderRadius: "32px",
                                                backgroundColor: "#e2e8f0",
                                            }}
                                        >
                                            <img
                                                src={
                                                    service.cover_image
                                                        ? getImageUrl(service.cover_image) || "/images/placeholders/service.jpg"
                                                        : "/images/placeholders/service.jpg"
                                                }
                                                alt={title}
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
                                                className="group-hover:scale-105"
                                            />

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(to top, rgba(7,26,53,0.8) 0%, rgba(7,26,53,0.2) 40%, transparent 70%)",
                                                }}
                                            />

                                            {/* Bottom info card */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "24px",
                                                    left: "24px",
                                                    right: "24px",
                                                    direction: isPersian ? "rtl" : "ltr",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: "18px 22px",
                                                        borderRadius: "20px",
                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                        background: "rgba(7,26,53,0.4)",
                                                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                                                        backdropFilter: "blur(30px)",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            flexDirection: isPersian ? "row-reverse" : "row",
                                                        }}
                                                    >
                                                        <div style={{ textAlign: isPersian ? "right" : "left" }}>
                                                            <p
                                                                style={{
                                                                    fontSize: "0.6rem",
                                                                    fontWeight: 700,
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.12em",
                                                                    color: "rgba(255,255,255,0.5)",
                                                                }}
                                                            >
                                                                {isPersian
                                                                    ? "سرویس ویژه"
                                                                    : "Premium Service"}
                                                            </p>

                                                            <p
                                                                style={{
                                                                    marginTop: "2px",
                                                                    fontSize: "1.2rem",
                                                                    fontWeight: 900,
                                                                    color: "white",
                                                                }}
                                                            >
                                                                {title}
                                                            </p>
                                                        </div>

                                                        <span
                                                            style={{
                                                                padding: "4px 12px",
                                                                borderRadius: "9999px",
                                                                background: "rgba(255,255,255,0.12)",
                                                                border: "1px solid rgba(255,255,255,0.15)",
                                                                fontSize: "0.55rem",
                                                                fontWeight: 700,
                                                                color: "white",
                                                                textTransform: "uppercase",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "4px",
                                                            }}
                                                        >
                                                            <Star size={10} />
                                                            {isPersian ? "برتر" : "Top"}
                                                        </span>
                                                    </div>

                                                    <div
                                                        style={{
                                                            marginTop: "10px",
                                                            height: "2px",
                                                            borderRadius: "2px",
                                                            background: "rgba(255,255,255,0.1)",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "85%",
                                                                height: "100%",
                                                                borderRadius: "2px",
                                                                background: "linear-gradient(90deg, #46A6D9, #6BBBE3)",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Floating badges */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "24px",
                                                    right: "24px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "6px",
                                                    alignItems: isPersian ? "flex-start" : "flex-end",
                                                }}
                                            >
                                                <motion.div
                                                    animate={{
                                                        y: [0, -4, 0],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    style={{
                                                        padding: "6px 14px",
                                                        borderRadius: "9999px",
                                                        background: "rgba(255,255,255,0.12)",
                                                        backdropFilter: "blur(10px)",
                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                        fontSize: "0.55rem",
                                                        fontWeight: 700,
                                                        color: "white",
                                                        textTransform: "uppercase",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                    }}
                                                >
                                                    <Award size={12} />
                                                    {isPersian ? "تایید شده" : "Verified"}
                                                </motion.div>

                                                <motion.div
                                                    animate={{
                                                        y: [0, 4, 0],
                                                    }}
                                                    transition={{
                                                        duration: 3.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 0.5,
                                                    }}
                                                    style={{
                                                        padding: "6px 14px",
                                                        borderRadius: "9999px",
                                                        background: "rgba(255,255,255,0.12)",
                                                        backdropFilter: "blur(10px)",
                                                        border: "1px solid rgba(255,255,255,0.15)",
                                                        fontSize: "0.55rem",
                                                        fontWeight: 700,
                                                        color: "white",
                                                        textTransform: "uppercase",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                    }}
                                                >
                                                    <Users size={12} />
                                                    {isPersian ? "محبوب" : "Popular"}
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Decorative floating elements */}
                                    <motion.div
                                        className="float-reverse"
                                        style={{
                                            position: "absolute",
                                            top: "-16px",
                                            right: isPersian ? "auto" : "-16px",
                                            left: isPersian ? "-16px" : "auto",
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "50%",
                                            background: "rgba(70,166,217,0.15)",
                                            backdropFilter: "blur(20px)",
                                            border: "1px solid rgba(70,166,217,0.2)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 5,
                                        }}
                                    >
                                        <Sparkles size={20} style={{ color: "#46A6D9" }} />
                                    </motion.div>

                                    <motion.div
                                        className="float-slow"
                                        style={{
                                            position: "absolute",
                                            bottom: "-8px",
                                            left: isPersian ? "auto" : "-24px",
                                            right: isPersian ? "-24px" : "auto",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: "rgba(24,59,115,0.1)",
                                            backdropFilter: "blur(20px)",
                                            border: "1px solid rgba(24,59,115,0.15)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 5,
                                        }}
                                    >
                                        <Gem size={16} style={{ color: "#183B73" }} />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </section>

                        {/* ========================================================
                            INTRODUCTION - With Updated Numbers
                        ======================================================== */}
                        <section
                            style={{
                                borderTop: "1px solid rgba(203,213,225,0.3)",
                                paddingTop: "64px",
                                paddingBottom: "64px",
                            }}
                        >
                            <div
                                style={{
                                    display: "grid",
                                    alignItems: "start",
                                    gap: "40px",
                                    gridTemplateColumns: "0.85fr 1.15fr",
                                    direction: isPersian ? "rtl" : "ltr",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? 40 : -40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                    }}
                                    style={{
                                        textAlign: isPersian ? "right" : "left",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            padding: "6px 16px",
                                            borderRadius: "9999px",
                                            border: "1px solid rgba(70,166,217,0.2)",
                                            background: "rgba(70,166,217,0.08)",
                                            fontSize: "0.8rem",
                                            fontWeight: 700,
                                            color: "#46A6D9",
                                        }}
                                    >
                                        {isPersian
                                            ? "درباره سرویس"
                                            : "About Service"}
                                    </div>

                                    <h2
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                                            fontWeight: 900,
                                            lineHeight: 1.15,
                                            letterSpacing: "-0.02em",
                                            color: "#183B73",
                                            textAlign: isPersian ? "right" : "left",
                                        }}
                                    >
                                        {title}
                                    </h2>

                                    <div
                                        style={{
                                            marginTop: "24px",
                                            height: "3px",
                                            width: "60px",
                                            borderRadius: "2px",
                                            background: "linear-gradient(90deg, #46A6D9, #183B73)",
                                            boxShadow: "0 2px 12px rgba(70,166,217,0.3)",
                                            marginRight: isPersian ? "0" : "auto",
                                            marginLeft: isPersian ? "auto" : "0",
                                        }}
                                    />

                                    <p
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "1rem",
                                            lineHeight: 1.8,
                                            color: "#64748b",
                                            textAlign: isPersian ? "right" : "left",
                                        }}
                                    >
                                        {description}
                                    </p>

                                    {/* Stats - Updated with language-aware numbers */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gap: "12px",
                                            marginTop: "24px",
                                        }}
                                    >
                                        {[
                                            { 
                                                value: isPersian ? "۱۰۰+" : "100+", 
                                                label: isPersian ? "پروژه موفق" : "Successful Projects" 
                                            },
                                            { 
                                                value: isPersian ? "۹۹٪" : "99%", 
                                                label: isPersian ? "رضایت مشتری" : "Client Satisfaction" 
                                            },
                                            { 
                                                value: "24/7", 
                                                label: isPersian ? "پشتیبانی" : "Support" 
                                            },
                                        ].map((stat, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -3 }}
                                                style={{
                                                    padding: "12px",
                                                    borderRadius: "12px",
                                                    border: "1px solid rgba(203,213,225,0.2)",
                                                    background: "rgba(255,255,255,0.6)",
                                                    textAlign: "center",
                                                    backdropFilter: "blur(10px)",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontSize: "1.3rem",
                                                        fontWeight: 900,
                                                        color: "#46A6D9",
                                                    }}
                                                >
                                                    {stat.value}
                                                </p>
                                                <p
                                                    style={{
                                                        fontSize: "0.65rem",
                                                        fontWeight: 600,
                                                        color: "#94a3b8",
                                                        marginTop: "2px",
                                                    }}
                                                >
                                                    {stat.label}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? -40 : 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                    }}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "28px",
                                        border: "1px solid rgba(255,255,255,0.8)",
                                        background: "rgba(255,255,255,0.75)",
                                        padding: "32px",
                                        boxShadow: "0 15px 50px rgba(24,59,115,0.08)",
                                        backdropFilter: "blur(20px)",
                                        transition: "all 0.5s ease",
                                        textAlign: isPersian ? "right" : "left",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = "0 20px 60px rgba(24,59,115,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = "0 15px 50px rgba(24,59,115,0.08)";
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: "-60px",
                                            top: "-60px",
                                            width: "160px",
                                            height: "160px",
                                            borderRadius: "50%",
                                            background: "rgba(70,166,217,0.08)",
                                            filter: "blur(40px)",
                                            transition: "transform 0.5s ease",
                                        }}
                                        className="group-hover:scale-125"
                                    />

                                    <div
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "14px",
                                            marginBottom: "20px",
                                            flexDirection: isPersian ? "row-reverse" : "row",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                width: "48px",
                                                height: "48px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "16px",
                                                background: "linear-gradient(135deg, rgba(70,166,217,0.12), rgba(24,59,115,0.08))",
                                                color: "#46A6D9",
                                            }}
                                        >
                                            <CheckCircle2 size={24} />
                                        </div>

                                        <div style={{ textAlign: isPersian ? "right" : "left" }}>
                                            <h3
                                                style={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: 900,
                                                    color: "#183B73",
                                                }}
                                            >
                                                {isPersian
                                                    ? "ویژگی‌های کلیدی"
                                                    : "Key Features"}
                                            </h3>

                                            <p
                                                style={{
                                                    fontSize: "0.8rem",
                                                    color: "#94a3b8",
                                                    marginTop: "1px",
                                                }}
                                            >
                                                {features.length}{" "}
                                                {isPersian
                                                    ? "ویژگی برجسته"
                                                    : `outstanding feature${features.length > 1 ? "s" : ""}`}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "grid",
                                            gap: "10px",
                                            gridTemplateColumns: "1fr 1fr",
                                        }}
                                    >
                                        {features.slice(0, 4).map(
                                            (feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 15,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.08,
                                                    }}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                        padding: "10px 14px",
                                                        borderRadius: "10px",
                                                        background: "rgba(241,245,249,0.6)",
                                                        backdropFilter: "blur(10px)",
                                                        transition: "all 0.3s ease",
                                                        cursor: "pointer",
                                                        flexDirection: isPersian ? "row-reverse" : "row",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = "rgba(70,166,217,0.06)";
                                                        e.currentTarget.style.transform = isPersian ? "translateX(-4px)" : "translateX(4px)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "rgba(241,245,249,0.6)";
                                                        e.currentTarget.style.transform = "translateX(0)";
                                                    }}
                                                >
                                                    <CheckCircle2
                                                        size={14}
                                                        style={{
                                                            color: "#46A6D9",
                                                            flexShrink: 0,
                                                        }}
                                                    />

                                                    <span
                                                        style={{
                                                            fontSize: "0.8rem",
                                                            fontWeight: 600,
                                                            color: "#334155",
                                                            lineHeight: 1.4,
                                                            textAlign: isPersian ? "right" : "left",
                                                        }}
                                                    >
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>

                                    {features.length > 4 && (
                                        <div
                                            style={{
                                                marginTop: "12px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Link
                                                href="#features"
                                                style={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: 700,
                                                    color: "#46A6D9",
                                                    textDecoration: "none",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = "#183B73";
                                                    e.currentTarget.style.transform = isPersian ? "translateX(-4px)" : "translateX(4px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = "#46A6D9";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                {isPersian
                                                    ? "مشاهده همه ویژگی‌ها"
                                                    : "View all features"}
                                                <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </section>

                        {/* ========================================================
                            FEATURES
                        ======================================================== */}
                        <section
                            id="features"
                            style={{
                                scrollMarginTop: "64px",
                                borderTop: "1px solid rgba(203,213,225,0.3)",
                                paddingTop: "64px",
                                paddingBottom: "64px",
                            }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                style={{
                                    maxWidth: "700px",
                                    margin: "0 auto",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-flex",
                                        padding: "6px 16px",
                                        borderRadius: "9999px",
                                        border: "1px solid rgba(70,166,217,0.2)",
                                        background: "rgba(70,166,217,0.08)",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        color: "#46A6D9",
                                    }}
                                >
                                    <Gem size={12} style={{ marginRight: "6px" }} />
                                    {isPersian
                                        ? "ویژگی‌های سرویس"
                                        : "Service Features"}
                                </div>

                                <h2
                                    style={{
                                        marginTop: "16px",
                                        fontSize: "clamp(2.2rem, 3.5vw, 2.8rem)",
                                        fontWeight: 900,
                                        letterSpacing: "-0.02em",
                                        color: "#183B73",
                                    }}
                                >
                                    {isPersian
                                        ? "قابلیت‌های برجسته"
                                        : "Outstanding Capabilities"}
                                </h2>

                                <p
                                    style={{
                                        marginTop: "12px",
                                        fontSize: "1rem",
                                        lineHeight: 1.7,
                                        color: "#64748b",
                                    }}
                                >
                                    {isPersian
                                        ? "ویژگی‌های کلیدی که این سرویس را متمایز می‌کند"
                                        : "Key features that make this service stand out"}
                                </p>
                            </motion.div>

                            <div
                                style={{
                                    display: "grid",
                                    gap: "20px",
                                    marginTop: "48px",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                }}
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 40,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.55,
                                            delay: index * 0.06,
                                        }}
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: "24px",
                                            border: "1px solid rgba(255,255,255,0.8)",
                                            background: "rgba(255,255,255,0.75)",
                                            padding: "28px 24px",
                                            boxShadow: "0 12px 40px rgba(24,59,115,0.06)",
                                            backdropFilter: "blur(20px)",
                                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                            cursor: "pointer",
                                            textAlign: isPersian ? "right" : "left",
                                        }}
                                        whileHover={{
                                            y: -6,
                                            boxShadow: "0 20px 60px rgba(24,59,115,0.12)",
                                            background: "rgba(255,255,255,0.95)",
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: "-30px",
                                                top: "-30px",
                                                width: "100px",
                                                height: "100px",
                                                borderRadius: "50%",
                                                background: "rgba(70,166,217,0.06)",
                                                filter: "blur(30px)",
                                                transition: "transform 0.5s ease",
                                            }}
                                            className="group-hover:scale-150"
                                        />

                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "48px",
                                                height: "48px",
                                                borderRadius: "14px",
                                                background: "linear-gradient(135deg, #46A6D9, #6BBBE3)",
                                                color: "white",
                                                boxShadow: "0 10px 25px rgba(70,166,217,0.25)",
                                                transition: "all 0.5s ease",
                                                marginRight: isPersian ? "0" : "auto",
                                                marginLeft: isPersian ? "auto" : "0",
                                            }}
                                            className="group-hover:scale-110 group-hover:rotate-3"
                                        >
                                            <CheckCircle2 size={20} />
                                        </div>

                                        <h3
                                            style={{
                                                position: "relative",
                                                marginTop: "16px",
                                                fontSize: "1rem",
                                                fontWeight: 800,
                                                color: "#0f172a",
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {feature}
                                        </h3>

                                        <div
                                            style={{
                                                position: "relative",
                                                marginTop: "12px",
                                                height: "2px",
                                                width: "28px",
                                                overflow: "hidden",
                                                borderRadius: "2px",
                                                background: "rgba(70,166,217,0.1)",
                                                marginRight: isPersian ? "0" : "auto",
                                                marginLeft: isPersian ? "auto" : "0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: "100%",
                                                    width: "0%",
                                                    borderRadius: "2px",
                                                    background: "linear-gradient(90deg, #46A6D9, #6BBBE3)",
                                                    transition: "width 0.5s ease",
                                                }}
                                                className="group-hover:w-full"
                                            />
                                        </div>

                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "12px",
                                                right: "16px",
                                                fontSize: "0.6rem",
                                                fontWeight: 700,
                                                color: "rgba(70,166,217,0.2)",
                                                letterSpacing: "0.05em",
                                            }}
                                        >
                                            {formatNumber(index + 1)}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* ========================================================
                            DELIVERY
                        ======================================================== */}
                        <section
                            style={{
                                borderTop: "1px solid rgba(203,213,225,0.3)",
                                paddingTop: "64px",
                                paddingBottom: "64px",
                            }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.7,
                                }}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "36px",
                                    border: "1px solid rgba(255,255,255,0.8)",
                                    background: "rgba(255,255,255,0.75)",
                                    boxShadow: "0 25px 80px rgba(24,59,115,0.08)",
                                    backdropFilter: "blur(20px)",
                                    direction: isPersian ? "rtl" : "ltr",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "-60px",
                                        top: "-60px",
                                        width: "250px",
                                        height: "250px",
                                        borderRadius: "50%",
                                        background: "rgba(70,166,217,0.06)",
                                        filter: "blur(50px)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        display: "grid",
                                        alignItems: "center",
                                        gap: "32px",
                                        padding: "40px",
                                        gridTemplateColumns: "1fr 0.8fr",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                width: "56px",
                                                height: "56px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "16px",
                                                background: "linear-gradient(135deg, #46A6D9, #6BBBE3)",
                                                color: "white",
                                                boxShadow: "0 10px 25px rgba(70,166,217,0.25)",
                                                marginRight: isPersian ? "0" : "auto",
                                                marginLeft: isPersian ? "auto" : "0",
                                            }}
                                        >
                                            <Clock3 size={28} />
                                        </div>

                                        <h2
                                            style={{
                                                marginTop: "20px",
                                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                                fontWeight: 900,
                                                letterSpacing: "-0.02em",
                                                color: "#183B73",
                                                textAlign: isPersian ? "right" : "left",
                                            }}
                                        >
                                            {isPersian
                                                ? "زمان تحویل"
                                                : "Delivery Time"}
                                        </h2>

                                        <p
                                            style={{
                                                marginTop: "12px",
                                                maxWidth: "500px",
                                                fontSize: "1rem",
                                                lineHeight: 1.8,
                                                color: "#64748b",
                                                textAlign: isPersian ? "right" : "left",
                                            }}
                                        >
                                            {isPersian
                                                ? "ما متعهد به ارائه با کیفیت و به موقع هستیم"
                                                : "We are committed to quality and on-time delivery"}
                                        </p>
                                    </div>

                                    <div
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: "28px",
                                            padding: "32px 24px",
                                            textAlign: "center",
                                            background: "linear-gradient(135deg, #183B73, #24579d, #46A6D9)",
                                            boxShadow: "0 20px 50px rgba(24,59,115,0.25)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: "-40px",
                                                top: "-40px",
                                                width: "120px",
                                                height: "120px",
                                                borderRadius: "50%",
                                                background: "rgba(255,255,255,0.05)",
                                                filter: "blur(30px)",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: "-40px",
                                                bottom: "-40px",
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "50%",
                                                background: "rgba(255,255,255,0.05)",
                                                filter: "blur(30px)",
                                            }}
                                        />

                                        <Clock3
                                            size={40}
                                            style={{
                                                position: "relative",
                                                margin: "0 auto",
                                                color: "white",
                                                opacity: 0.9,
                                            }}
                                        />

                                        <p
                                            style={{
                                                position: "relative",
                                                marginTop: "12px",
                                                fontSize: "0.65rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.12em",
                                                color: "rgba(255,255,255,0.6)",
                                            }}
                                        >
                                            {isPersian
                                                ? "زمان تخمینی"
                                                : "Estimated Time"}
                                        </p>

                                        <h3
                                            style={{
                                                position: "relative",
                                                marginTop: "6px",
                                                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                                                fontWeight: 900,
                                                color: "white",
                                            }}
                                        >
                                            {service.delivery_time ||
                                                (isPersian
                                                    ? "تماس بگیرید"
                                                    : "Contact Us")}
                                        </h3>

                                        <div
                                            style={{
                                                position: "relative",
                                                margin: "16px auto 0",
                                                height: "1px",
                                                maxWidth: "100px",
                                                background: "rgba(255,255,255,0.15)",
                                            }}
                                        />

                                        <p
                                            style={{
                                                position: "relative",
                                                marginTop: "12px",
                                                fontSize: "0.8rem",
                                                color: "rgba(255,255,255,0.7)",
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {isPersian
                                                ? "تحویل سریع و با کیفیت تضمینی"
                                                : "Fast and quality delivery guaranteed"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* ========================================================
                            CTA
                        ======================================================== */}
                        <section
                            style={{
                                paddingTop: "64px",
                                paddingBottom: "64px",
                            }}
                        >
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.8,
                                }}
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: "40px",
                                    padding: "60px 32px",
                                    textAlign: "center",
                                    background: "linear-gradient(135deg, #0a2a4a, #183B73, #24579d, #46A6D9)",
                                    boxShadow: "0 30px 80px rgba(24,59,115,0.3)",
                                    direction: isPersian ? "rtl" : "ltr",
                                }}
                            >
                                {/* Glow effects */}
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "-80px",
                                        top: "-80px",
                                        width: "280px",
                                        height: "280px",
                                        borderRadius: "50%",
                                        background: "rgba(70,166,217,0.15)",
                                        filter: "blur(60px)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "-80px",
                                        bottom: "-80px",
                                        width: "280px",
                                        height: "280px",
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.05)",
                                        filter: "blur(60px)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        maxWidth: "700px",
                                        margin: "0 auto",
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -6, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            margin: "0 auto",
                                            display: "flex",
                                            width: "64px",
                                            height: "64px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "20px",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            background: "rgba(255,255,255,0.08)",
                                            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                                            backdropFilter: "blur(20px)",
                                        }}
                                    >
                                        <Rocket
                                            size={30}
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </motion.div>

                                    <h2
                                        style={{
                                            marginTop: "24px",
                                            fontSize: "clamp(2rem, 4vw, 3.2rem)",
                                            fontWeight: 900,
                                            lineHeight: 1.15,
                                            letterSpacing: "-0.02em",
                                            color: "white",
                                            textShadow: "0 2px 30px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        {isPersian
                                            ? "آماده شروع همکاری هستید؟"
                                            : "Ready to Get Started?"}
                                    </h2>

                                    <p
                                        style={{
                                            margin: "16px auto 0",
                                            maxWidth: "500px",
                                            fontSize: "1rem",
                                            lineHeight: 1.8,
                                            color: "rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        {isPersian
                                            ? "با ما تماس بگیرید و پروژه خود را آغاز کنید"
                                            : "Contact us today and start your project"}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "center",
                                            gap: "12px",
                                            marginTop: "32px",
                                        }}
                                    >
                                        <Link
                                            href="/contact"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                minHeight: "48px",
                                                padding: "0 32px",
                                                borderRadius: "14px",
                                                background: "white",
                                                color: "#183B73",
                                                fontSize: "0.95rem",
                                                fontWeight: 800,
                                                textDecoration: "none",
                                                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                                                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.15)";
                                            }}
                                        >
                                            {isPersian
                                                ? "شروع همکاری"
                                                : "Start Now"}
                                            <ArrowRight 
                                                size={18} 
                                                style={{
                                                    transform: isPersian ? "rotate(180deg)" : "none",
                                                }}
                                            />
                                        </Link>

                                        <Link
                                            href="/contact"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "8px",
                                                minHeight: "48px",
                                                padding: "0 28px",
                                                borderRadius: "14px",
                                                border: "2px solid rgba(255,255,255,0.25)",
                                                background: "rgba(255,255,255,0.08)",
                                                color: "white",
                                                fontSize: "0.95rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                                backdropFilter: "blur(10px)",
                                                transition: "all 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-3px)";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                                            }}
                                        >
                                            <Heart size={16} />
                                            {isPersian
                                                ? "مشاوره رایگان"
                                                : "Free Consultation"}
                                        </Link>
                                    </div>

                                    {/* Trust indicators */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "24px",
                                            marginTop: "32px",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        {[
                                            { icon: ShieldCheck, label: isPersian ? "ضمانت کیفیت" : "Quality Guarantee" },
                                            { icon: Clock3, label: isPersian ? "تحویل به موقع" : "On-time Delivery" },
                                            { icon: MessageCircle, label: isPersian ? "پشتیبانی دائمی" : "24/7 Support" },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    color: "rgba(255,255,255,0.6)",
                                                }}
                                            >
                                                <item.icon size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                                                <span
                                                    style={{
                                                        fontSize: "0.7rem",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </section>
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}