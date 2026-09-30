"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/services/api";

import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/button";

import {
    Sparkles,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Globe,
    Calendar,
    FolderOpen,
    Loader2,
    ChevronLeft,
    ExternalLink,
    Layers3,
    Image as ImageIcon,
} from "lucide-react";

import { useLanguage } from "@/context/language-context";

interface Portfolio {
    id: number;
    title: string;
    description: string;
    image: string | null;
    gallery?: string[] | null;
    category: string;
    slug: string;

    client?: string | null;
    completed_at?: string | null;
    website?: string | null;
    features?: string[] | null;
}

export default function PortfolioDetailsPage() {
    const { language, t } = useLanguage();
    const params = useParams();

    const isPersian = language === "fa";

    const slug = Array.isArray(params?.slug)
        ? params.slug[0]
        : params?.slug;

    const [project, setProject] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     * ---------------------------------------------------------
     * Load portfolio project
     * ---------------------------------------------------------
     */
    useEffect(() => {
        async function loadProject() {
            if (!slug) return;

            try {
                setLoading(true);

                const response = await api.get(`/portfolio/${slug}`);

                const data = response?.data?.data;

                if (!data) {
                    setProject(null);
                    return;
                }

                /**
                 * Normalize optional array values.
                 *
                 * This prevents:
                 * Cannot read properties of undefined (reading 'map')
                 */
                const normalizedProject: Portfolio = {
                    ...data,

                    gallery: Array.isArray(data.gallery)
                        ? data.gallery
                        : [],

                    features: Array.isArray(data.features)
                        ? data.features
                        : [],
                };

                setProject(normalizedProject);
            } catch (error) {
                console.error(
                    "Failed to load portfolio project:",
                    error
                );

                setProject(null);
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [slug]);

    /**
     * ---------------------------------------------------------
     * Safe arrays
     * ---------------------------------------------------------
     */
    const features = useMemo(
        () =>
            Array.isArray(project?.features)
                ? project.features.filter(Boolean)
                : [],
        [project?.features]
    );

    const gallery = useMemo(
        () =>
            Array.isArray(project?.gallery)
                ? project.gallery.filter(Boolean)
                : [],
        [project?.gallery]
    );

    /**
     * ---------------------------------------------------------
     * Localized helpers
     * ---------------------------------------------------------
     */
    function getTitle(project: Portfolio) {
        return isPersian
            ? (project as any).title_fa || project.title
            : project.title;
    }

    function getDescription(project: Portfolio) {
        return isPersian
            ? (project as any).description_fa || project.description
            : project.description;
    }

    function getCategory(project: Portfolio) {
        return isPersian
            ? (project as any).category_fa || project.category
            : project.category;
    }

    /**
     * ---------------------------------------------------------
     * Loading
     * ---------------------------------------------------------
     */
    if (loading) {
        return (
            <>
                <Header />

                <main
                    style={{
                        minHeight: "70vh",
                        background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                    }}
                >
                    <Container>
                        <div
                            style={{
                                display: "flex",
                                minHeight: "70vh",
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
                                <div
                                    style={{
                                        display: "flex",
                                        height: "80px",
                                        width: "80px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        background: "rgba(70, 166, 217, 0.1)",
                                    }}
                                >
                                    <Loader2
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                            animation: "spin 1s linear infinite",
                                            color: "#46A6D9",
                                        }}
                                    />
                                </div>

                                <p
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#64748b",
                                    }}
                                >
                                    {isPersian
                                        ? "در حال بارگذاری پروژه..."
                                        : "Loading project..."}
                                </p>
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

    /**
     * ---------------------------------------------------------
     * Not found
     * ---------------------------------------------------------
     */
    if (!project) {
        return (
            <>
                <Header />

                <main
                    style={{
                        position: "relative",
                        minHeight: "75vh",
                        overflow: "hidden",
                        background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: "-128px",
                                top: "80px",
                                width: "384px",
                                height: "384px",
                                borderRadius: "50%",
                                background: "rgba(70, 166, 217, 0.15)",
                                filter: "blur(64px)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                right: "-128px",
                                bottom: "80px",
                                width: "384px",
                                height: "384px",
                                borderRadius: "50%",
                                background: "rgba(24, 59, 115, 0.12)",
                                filter: "blur(64px)",
                            }}
                        />
                    </div>

                    <Container>
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                minHeight: "75vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "560px",
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        margin: "0 auto",
                                        display: "flex",
                                        height: "96px",
                                        width: "96px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "24px",
                                        background: "rgba(255, 255, 255, 0.9)",
                                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                                        border: "1px solid rgba(203, 213, 225, 0.3)",
                                        backdropFilter: "blur(20px)",
                                    }}
                                >
                                    <FolderOpen
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                            color: "#46A6D9",
                                        }}
                                    />
                                </div>

                                <h1
                                    style={{
                                        marginTop: "32px",
                                        fontSize: "36px",
                                        fontWeight: 900,
                                        color: "#0f172a",
                                    }}
                                >
                                    {isPersian
                                        ? "پروژه یافت نشد"
                                        : "Project Not Found"}
                                </h1>

                                <p
                                    style={{
                                        marginTop: "20px",
                                        fontSize: "18px",
                                        lineHeight: 2,
                                        color: "#64748b",
                                    }}
                                >
                                    {isPersian
                                        ? "پروژه‌ای که به دنبال آن هستید پیدا نشد."
                                        : "The project you are looking for could not be found."}
                                </p>

                                <div
                                    style={{
                                        marginTop: "32px",
                                    }}
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        style={{
                                            borderRadius: "16px",
                                        }}
                                    >
                                        <Link href="/portfolio">
                                            <ChevronLeft
                                                style={{
                                                    marginRight: "8px",
                                                    height: "20px",
                                                    width: "20px",
                                                }}
                                            />
                                            {isPersian ? "نمونه کارها" : "Portfolio"}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </main>

                <Footer />
            </>
        );
    }

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
                .page-glow {
                    position: fixed;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(ellipse at 30% 20%, rgba(70, 166, 217, 0.08) 0%, transparent 50%),
                                radial-gradient(ellipse at 70% 80%, rgba(24, 59, 115, 0.06) 0%, transparent 50%),
                                radial-gradient(ellipse at 50% 50%, rgba(70, 166, 217, 0.04) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                    animation: pageGlow 25s ease-in-out infinite alternate;
                }

                @keyframes pageGlow {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.6;
                    }
                    33% {
                        transform: translate(1%, -1%) scale(1.03);
                        opacity: 0.8;
                    }
                    66% {
                        transform: translate(-1%, 2%) scale(0.97);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translate(0.5%, -0.5%) scale(1.02);
                        opacity: 0.9;
                    }
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* 🌟 BANNER GLOW EFFECTS */
                .banner-glow-main {
                    position: absolute;
                    top: -180px;
                    right: -120px;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(70, 166, 217, 0.30) 0%, rgba(70, 166, 217, 0.08) 35%, transparent 70%);
                    filter: blur(100px);
                    pointer-events: none;
                    animation: bannerGlow1 10s ease-in-out infinite alternate;
                }

                .banner-glow-secondary {
                    position: absolute;
                    bottom: -150px;
                    left: -100px;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(24, 59, 115, 0.20) 0%, rgba(24, 59, 115, 0.05) 40%, transparent 70%);
                    filter: blur(100px);
                    pointer-events: none;
                    animation: bannerGlow2 12s ease-in-out infinite alternate;
                }

                .banner-glow-accent {
                    position: absolute;
                    top: 30%;
                    left: 20%;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(70, 166, 217, 0.12) 0%, rgba(70, 166, 217, 0.02) 50%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                    animation: bannerGlow3 8s ease-in-out infinite alternate;
                }

                @keyframes bannerGlow1 {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(-40px, 25px) scale(1.15);
                        opacity: 1;
                    }
                }

                @keyframes bannerGlow2 {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translate(50px, -35px) scale(1.2);
                        opacity: 0.9;
                    }
                }

                @keyframes bannerGlow3 {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translate(-25px, 15px) scale(1.3);
                        opacity: 0.7;
                    }
                }

                /* Floating particles for banner */
                .banner-particle {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    animation: floatParticle 15s ease-in-out infinite;
                }

                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.2;
                    }
                    25% {
                        transform: translate(30px, -40px) scale(1.3);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(-20px, -15px) scale(0.8);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translate(40px, 30px) scale(1.1);
                        opacity: 0.7;
                    }
                }
            `}</style>

            {/* Page Background Glow */}
            <div className="page-glow" />

            <Header />

            <main
                dir={isPersian ? "rtl" : "ltr"}
                style={{
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        // 🌟 BEAUTIFUL BANNER BACKGROUND
                        background: "linear-gradient(145deg, #dcecfa 0%, #eef6fe 20%, #f5faff 45%, #e8f2fc 70%, #dcecf8 100%)",
                        borderBottom: "2px solid rgba(70, 166, 217, 0.12)",
                    }}
                >
                    {/* 🌟 BANNER GLOW EFFECTS */}
                    <div className="banner-glow-main" />
                    <div className="banner-glow-secondary" />
                    <div className="banner-glow-accent" />

                    {/* Floating Particles */}
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "8px", 
                            height: "8px", 
                            top: "12%", 
                            left: "8%",
                            animationDelay: "0s",
                            animationDuration: "14s",
                            background: "rgba(70, 166, 217, 0.25)"
                        }} 
                    />
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "12px", 
                            height: "12px", 
                            top: "20%", 
                            right: "12%",
                            animationDelay: "2s",
                            animationDuration: "16s",
                            background: "rgba(24, 59, 115, 0.15)"
                        }} 
                    />
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "6px", 
                            height: "6px", 
                            bottom: "25%", 
                            left: "15%",
                            animationDelay: "4s",
                            animationDuration: "12s",
                            background: "rgba(70, 166, 217, 0.20)"
                        }} 
                    />
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "10px", 
                            height: "10px", 
                            bottom: "15%", 
                            right: "8%",
                            animationDelay: "1s",
                            animationDuration: "18s",
                            background: "rgba(24, 59, 115, 0.12)"
                        }} 
                    />
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "7px", 
                            height: "7px", 
                            top: "45%", 
                            left: "4%",
                            animationDelay: "3s",
                            animationDuration: "15s",
                            background: "rgba(70, 166, 217, 0.18)"
                        }} 
                    />
                    <div 
                        className="banner-particle" 
                        style={{ 
                            width: "9px", 
                            height: "9px", 
                            top: "8%", 
                            right: "25%",
                            animationDelay: "5s",
                            animationDuration: "13s",
                            background: "rgba(24, 59, 115, 0.14)"
                        }} 
                    />

                    {/* =====================================================
                        BACKGROUND DECORATION
                    ====================================================== */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            overflow: "hidden",
                            zIndex: 0,
                        }}
                    >
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
                                top: "160px",
                                width: "480px",
                                height: "480px",
                                borderRadius: "50%",
                                background: "rgba(70, 166, 217, 0.12)",
                                filter: "blur(80px)",
                            }}
                        />

                        <motion.div
                            animate={{
                                x: [0, -70, 0],
                                y: [0, 60, 0],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                position: "absolute",
                                right: "-160px",
                                top: "560px",
                                width: "544px",
                                height: "544px",
                                borderRadius: "50%",
                                background: "rgba(24, 59, 115, 0.08)",
                                filter: "blur(80px)",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "384px",
                                width: "500px",
                                height: "500px",
                                transform: "translateX(-50%)",
                                borderRadius: "50%",
                                border: "1px solid rgba(70, 166, 217, 0.06)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "430px",
                                width: "380px",
                                height: "380px",
                                transform: "translateX(-50%)",
                                borderRadius: "50%",
                                border: "1px solid rgba(24, 59, 115, 0.04)",
                            }}
                        />
                    </div>

                    {/* =====================================================
                        HERO
                    ====================================================== */}
                    <section
                        style={{
                            position: "relative",
                            paddingTop: "80px",
                            paddingBottom: "56px",
                            zIndex: 2,
                        }}
                    >
                        <Container>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.7,
                                }}
                                style={{
                                    maxWidth: "900px",
                                    margin: "0 auto",
                                    textAlign: "center",
                                }}
                            >
                                {/* Back link */}
                                <Link
                                    href="/portfolio"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "32px",
                                        padding: "10px 20px",
                                        borderRadius: "9999px",
                                        border: "1px solid rgba(203, 213, 225, 0.6)",
                                        background: "rgba(255, 255, 255, 0.75)",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                                        backdropFilter: "blur(20px)",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        color: "#64748b",
                                        textDecoration: "none",
                                        transition: "all 0.25s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.30)";
                                        e.currentTarget.style.color = "#46A6D9";
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.6)";
                                        e.currentTarget.style.color = "#64748b";
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.75)";
                                    }}
                                >
                                    <ChevronLeft
                                        size={16}
                                        style={{
                                            transform: isPersian ? "rotate(180deg)" : "none"
                                        }}
                                    />

                                    {isPersian ? "نمونه کارها" : "Portfolio"}
                                </Link>

                                {/* Badge */}
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "10px 20px",
                                        borderRadius: "9999px",
                                        border: "1px solid rgba(70, 166, 217, 0.25)",
                                        background: "rgba(70, 166, 217, 0.10)",
                                        fontSize: "0.875rem",
                                        fontWeight: 700,
                                        color: "#46A6D9",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    <Sparkles size={16} />

                                    {isPersian
                                        ? "جزئیات پروژه"
                                        : "Project Details"}
                                </div>

                                {/* Title with <br /> tags */}
                                <h1
                                    style={{
                                        maxWidth: "900px",
                                        margin: "28px auto 0",
                                        textAlign: "center",
                                        fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                                        lineHeight: 1.05,
                                        fontWeight: 950,
                                        letterSpacing: "-0.04em",
                                        color: "#183B73",
                                        textShadow: "0 2px 40px rgba(70, 166, 217, 0.06)",
                                    }}
                                >
                                    <br />
                                    {isPersian ? (
                                        <>
                                            {getTitle(project).split(' ').slice(0, -1).join(' ')}

                                            <span
                                                style={{
                                                    display: "block",
                                                    marginTop: "10px",
                                                    background:
                                                        "linear-gradient(135deg, #183b73 0%, #24579d 40%, #46a6d9 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    color: "transparent",
                                                    textShadow: "none",
                                                }}
                                            >
                                                {getTitle(project).split(' ').pop()}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {getTitle(project).split(' ').slice(0, -1).join(' ')}
                                            <br />
                                            <span
                                                style={{
                                                    display: "block",
                                                    marginTop: "10px",
                                                    background:
                                                        "linear-gradient(135deg, #183b73 0%, #24579d 40%, #46a6d9 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    backgroundClip: "text",
                                                    color: "transparent",
                                                    textShadow: "none",
                                                }}
                                            >
                                                {getTitle(project).split(' ').pop()}
                                            </span>
                                        </>
                                    )}
                                </h1>

                                {/* Visual Design Elements Below Title */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginTop: "24px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "60px",
                                            height: "3px",
                                            background: "linear-gradient(90deg, transparent, #46A6D9)",
                                            borderRadius: "2px",
                                            opacity: 0.6,
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
                                        }}
                                    />

                                    <div
                                        style={{
                                            width: "60px",
                                            height: "3px",
                                            background: "linear-gradient(90deg, #46A6D9, transparent)",
                                            borderRadius: "2px",
                                            opacity: 0.6,
                                        }}
                                    />
                                </div>

                                {/* Small decorative dots */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "8px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#46A6D9",
                                            opacity: 0.3,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#46A6D9",
                                            opacity: 0.5,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#46A6D9",
                                            opacity: 0.7,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#46A6D9",
                                            opacity: 0.5,
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background: "#46A6D9",
                                            opacity: 0.3,
                                        }}
                                    />
                                </div>

                                {/* Description */}
                                <p
                                    style={{
                                        maxWidth: "720px",
                                        margin: "20px auto 0",
                                        textAlign: "center",
                                        fontSize: "1.08rem",
                                        lineHeight: 2,
                                        color: "#4a5a6e",
                                        fontWeight: 450,
                                    }}
                                >
                                    {getDescription(project)}
                                </p>

                                {/* Category */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "12px",
                                        marginTop: "28px",
                                    }}
                                >
                                    <span
                                        style={{
                                            borderRadius: "9999px",
                                            background: "linear-gradient(135deg, #183B73, #24579d)",
                                            padding: "10px 20px",
                                            fontSize: "0.875rem",
                                            fontWeight: 700,
                                            color: "white",
                                            boxShadow: "0 8px 24px rgba(24, 59, 115, 0.25)",
                                        }}
                                    >
                                        {getCategory(project)}
                                    </span>

                                    {project.client && (
                                        <span
                                            style={{
                                                borderRadius: "9999px",
                                                border: "1px solid rgba(203, 213, 225, 0.6)",
                                                background: "rgba(255, 255, 255, 0.8)",
                                                padding: "10px 20px",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "#64748b",
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                                                backdropFilter: "blur(10px)",
                                            }}
                                        >
                                            {project.client}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        </Container>
                    </section>

                    {/* =====================================================
                        MAIN IMAGE - RECREATED WITH INLINE CSS
                    ====================================================== */}
                    <section
                        style={{
                            position: "relative",
                            paddingBottom: "80px",
                            paddingTop: "20px",
                            zIndex: 2,
                        }}
                    >
                        <Container>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.1,
                                }}
                                style={{
                                    position: "relative",
                                    margin: "0 auto",
                                    maxWidth: "1280px",
                                    overflow: "hidden",
                                    borderRadius: "32px",
                                    border: "1px solid rgba(255, 255, 255, 0.7)",
                                    background: "#ffffff",
                                    padding: "8px",
                                    boxShadow: "0 30px 100px rgba(15, 23, 42, 0.12)",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        paddingBottom: "56.25%",
                                        overflow: "hidden",
                                        borderRadius: "24px",
                                        backgroundColor: "#f1f5f9",
                                    }}
                                >
                                    <img
                                        src={
                                            project.image ||
                                            "/images/placeholders/portfolio.jpg"
                                        }
                                        alt={getTitle(project)}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                            transition: "transform 1000ms ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.03)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(7, 26, 53, 0.6), transparent, transparent)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "20px",
                                            [isPersian ? "right" : "left"]: "20px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                borderRadius: "9999px",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                background: "rgba(255, 255, 255, 0.15)",
                                                padding: "10px 20px",
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "white",
                                                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                                                backdropFilter: "blur(18px)",
                                                WebkitBackdropFilter: "blur(18px)",
                                            }}
                                        >
                                            <Layers3
                                                style={{
                                                    height: "16px",
                                                    width: "16px",
                                                }}
                                            />
                                            {getCategory(project)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Container>
                    </section>

                    {/* =====================================================
                        PROJECT INFORMATION
                    ====================================================== */}
                    <section
                        style={{
                            position: "relative",
                            paddingBottom: "96px",
                            zIndex: 2,
                        }}
                    >
                        <Container>
                            <div
                                style={{
                                    display: "grid",
                                    gap: "40px",
                                    gridTemplateColumns: "1.2fr 0.8fr",
                                }}
                            >
                                {/* Description */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? 30 : -30,
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
                                >
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />

                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "8px 20px",
                                            borderRadius: "9999px",
                                            background: "linear-gradient(135deg, rgba(70, 166, 217, 0.12) 0%, rgba(70, 166, 217, 0.05) 100%)",
                                            border: "1px solid rgba(70, 166, 217, 0.15)",
                                            fontSize: "0.85rem",
                                            fontWeight: 700,
                                            color: "#46A6D9",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        <Sparkles size={14} />
                                        {isPersian
                                            ? "جزئیات پروژه"
                                            : "Project Details"}
                                    </span>

                                    <br />
                                    <br />

                                    <h2
                                        style={{
                                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.035em",
                                            lineHeight: 1.1,
                                            color: "#183B73",
                                            marginTop: "8px",
                                        }}
                                    >
                                        {getTitle(project)}
                                    </h2>

                                    <div
                                        style={{
                                            width: "60px",
                                            height: "4px",
                                            marginTop: "20px",
                                            marginBottom: "24px",
                                            borderRadius: "2px",
                                            background: "linear-gradient(90deg, #46A6D9, #183B73)",
                                            boxShadow: "0 2px 10px rgba(70, 166, 217, 0.3)",
                                        }}
                                    />

                                    <p
                                        style={{
                                            fontSize: "1.05rem",
                                            lineHeight: 1.9,
                                            color: "#64748b",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {getDescription(project)}
                                    </p>

                                    {project.website && (
                                        <div style={{ marginTop: "32px" }}>
                                            <a
                                                href={project.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    padding: "12px 28px",
                                                    borderRadius: "14px",
                                                    background: "linear-gradient(135deg, #183B73, #24579d)",
                                                    color: "white",
                                                    fontSize: "0.9rem",
                                                    fontWeight: 700,
                                                    textDecoration: "none",
                                                    boxShadow: "0 8px 24px rgba(24, 59, 115, 0.25)",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "translateY(-3px)";
                                                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(24, 59, 115, 0.35)";
                                                    e.currentTarget.style.background = "linear-gradient(135deg, #46A6D9, #6BBBE3)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(24, 59, 115, 0.25)";
                                                    e.currentTarget.style.background = "linear-gradient(135deg, #183B73, #24579d)";
                                                }}
                                            >
                                                <Globe size={18} />
                                                {isPersian ? "مشاهده وب‌سایت" : "Visit Website"}
                                                <ArrowUpRight size={16} />
                                            </a>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Information Card */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isPersian ? -30 : 30,
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
                                        borderRadius: "32px",
                                        border: "1px solid rgba(255, 255, 255, 0.9)",
                                        background: "rgba(255, 255, 255, 0.85)",
                                        padding: "32px 28px",
                                        boxShadow: "0 20px 70px rgba(24, 59, 115, 0.08)",
                                        backdropFilter: "blur(20px)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            marginBottom: "28px",
                                            paddingBottom: "20px",
                                            borderBottom: "2px solid rgba(70, 166, 217, 0.08)",
                                        }}
                                    >
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
                                                boxShadow: "0 8px 24px rgba(70, 166, 217, 0.25)",
                                            }}
                                        >
                                            <FolderOpen size={24} />
                                        </div>

                                        <div>
                                            <h3
                                                style={{
                                                    fontSize: "1.3rem",
                                                    fontWeight: 900,
                                                    color: "#183B73",
                                                    letterSpacing: "-0.02em",
                                                }}
                                            >
                                                {isPersian
                                                    ? "اطلاعات پروژه"
                                                    : "Project Information"}
                                            </h3>

                                            <p
                                                style={{
                                                    fontSize: "0.85rem",
                                                    color: "#94a3b8",
                                                    fontWeight: 500,
                                                    marginTop: "2px",
                                                }}
                                            >
                                                {isPersian
                                                    ? "جزئیات کامل این پروژه"
                                                    : "Complete project details"}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "12px",
                                        }}
                                    >
                                        {/* Category */}
                                        <div
                                            style={{
                                                borderRadius: "16px",
                                                border: "1px solid rgba(203, 213, 225, 0.3)",
                                                background: "rgba(248, 250, 252, 0.8)",
                                                padding: "18px 20px",
                                                transition: "all 0.3s ease",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "rgba(70, 166, 217, 0.04)";
                                                e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                e.currentTarget.style.transform = "translateX(4px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "rgba(248, 250, 252, 0.8)";
                                                e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.3)";
                                                e.currentTarget.style.transform = "translateX(0)";
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "14px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        width: "40px",
                                                        height: "40px",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: "12px",
                                                        background: "rgba(70, 166, 217, 0.10)",
                                                        color: "#46A6D9",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <FolderOpen size={18} />
                                                </div>

                                                <div style={{ minWidth: 0 }}>
                                                    <p
                                                        style={{
                                                            fontSize: "0.7rem",
                                                            fontWeight: 700,
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.08em",
                                                            color: "#94a3b8",
                                                        }}
                                                    >
                                                        {isPersian ? "دسته‌بندی" : "Category"}
                                                    </p>

                                                    <p
                                                        style={{
                                                            fontSize: "0.95rem",
                                                            fontWeight: 700,
                                                            color: "#0f172a",
                                                            marginTop: "2px",
                                                        }}
                                                    >
                                                        {getCategory(project)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Client */}
                                        {project.client && (
                                            <div
                                                style={{
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(203, 213, 225, 0.3)",
                                                    background: "rgba(248, 250, 252, 0.8)",
                                                    padding: "18px 20px",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(70, 166, 217, 0.04)";
                                                    e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                    e.currentTarget.style.transform = "translateX(4px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(248, 250, 252, 0.8)";
                                                    e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.3)";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "14px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "40px",
                                                            height: "40px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "12px",
                                                            background: "rgba(70, 166, 217, 0.10)",
                                                            color: "#46A6D9",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <Sparkles size={18} />
                                                    </div>

                                                    <div style={{ minWidth: 0 }}>
                                                        <p
                                                            style={{
                                                                fontSize: "0.7rem",
                                                                fontWeight: 700,
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.08em",
                                                                color: "#94a3b8",
                                                            }}
                                                        >
                                                            {isPersian ? "مشتری" : "Client"}
                                                        </p>

                                                        <p
                                                            style={{
                                                                fontSize: "0.95rem",
                                                                fontWeight: 700,
                                                                color: "#0f172a",
                                                                marginTop: "2px",
                                                            }}
                                                        >
                                                            {project.client}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Date */}
                                        {project.completed_at && (
                                            <div
                                                style={{
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(203, 213, 225, 0.3)",
                                                    background: "rgba(248, 250, 252, 0.8)",
                                                    padding: "18px 20px",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(70, 166, 217, 0.04)";
                                                    e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                    e.currentTarget.style.transform = "translateX(4px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(248, 250, 252, 0.8)";
                                                    e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.3)";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "14px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "40px",
                                                            height: "40px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "12px",
                                                            background: "rgba(70, 166, 217, 0.10)",
                                                            color: "#46A6D9",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <Calendar size={18} />
                                                    </div>

                                                    <div>
                                                        <p
                                                            style={{
                                                                fontSize: "0.7rem",
                                                                fontWeight: 700,
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.08em",
                                                                color: "#94a3b8",
                                                            }}
                                                        >
                                                            {isPersian ? "تاریخ تکمیل" : "Completed"}
                                                        </p>

                                                        <p
                                                            style={{
                                                                fontSize: "0.95rem",
                                                                fontWeight: 700,
                                                                color: "#0f172a",
                                                                marginTop: "2px",
                                                            }}
                                                        >
                                                            {new Date(project.completed_at).toLocaleDateString(
                                                                isPersian ? "fa-IR" : "en-US"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Website */}
                                        {project.website && (
                                            <div
                                                style={{
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(203, 213, 225, 0.3)",
                                                    background: "rgba(248, 250, 252, 0.8)",
                                                    padding: "18px 20px",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "rgba(70, 166, 217, 0.04)";
                                                    e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                    e.currentTarget.style.transform = "translateX(4px)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "rgba(248, 250, 252, 0.8)";
                                                    e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.3)";
                                                    e.currentTarget.style.transform = "translateX(0)";
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "14px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            width: "40px",
                                                            height: "40px",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "12px",
                                                            background: "rgba(70, 166, 217, 0.10)",
                                                            color: "#46A6D9",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        <Globe size={18} />
                                                    </div>

                                                    <div style={{ minWidth: 0 }}>
                                                        <p
                                                            style={{
                                                                fontSize: "0.7rem",
                                                                fontWeight: 700,
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.08em",
                                                                color: "#94a3b8",
                                                            }}
                                                        >
                                                            {isPersian ? "وب‌سایت" : "Website"}
                                                        </p>

                                                        <a
                                                            href={project.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                fontSize: "0.9rem",
                                                                fontWeight: 700,
                                                                color: "#46A6D9",
                                                                textDecoration: "none",
                                                                marginTop: "2px",
                                                                transition: "all 0.2s ease",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.color = "#183B73";
                                                                e.currentTarget.style.transform = "translateX(4px)";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.color = "#46A6D9";
                                                                e.currentTarget.style.transform = "translateX(0)";
                                                            }}
                                                        >
                                                            {isPersian ? "مشاهده وب‌سایت" : "Visit Website"}
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </Container>
                    </section>

                    {/* =====================================================
                        FEATURES
                    ====================================================== */}
                    {features.length > 0 && (
                        <section
                            style={{
                                position: "relative",
                                background: "#ffffff",
                                paddingTop: "96px",
                                paddingBottom: "128px",
                            }}
                        >
                            <Container>
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
                                    transition={{
                                        duration: 0.7,
                                    }}
                                    style={{
                                        margin: "0 auto 56px",
                                        maxWidth: "768px",
                                        textAlign: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            borderRadius: "9999px",
                                            background: "rgba(70, 166, 217, 0.1)",
                                            padding: "10px 20px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "#46A6D9",
                                        }}
                                    >
                                        <CheckCircle2
                                            style={{
                                                height: "16px",
                                                width: "16px",
                                            }}
                                        />

                                        {isPersian
                                            ? "ویژگی‌های پروژه"
                                            : "Project Features"}
                                    </span>

                                    <h2
                                        style={{
                                            marginTop: "24px",
                                            fontSize: "clamp(1.875rem, 4vw, 3rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.025em",
                                            color: "#183B73",
                                        }}
                                    >
                                        {isPersian
                                            ? "امکانات برجسته"
                                            : "Key Features"}
                                    </h2>

                                    <p
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "16px",
                                            lineHeight: 2,
                                            color: "#64748b",
                                        }}
                                    >
                                        {isPersian
                                            ? "ویژگی‌های کلیدی و قابلیت‌های این پروژه"
                                            : "Key features and capabilities of this project"}
                                    </p>
                                </motion.div>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "20px",
                                        gridTemplateColumns: "1fr 1fr",
                                    }}
                                >
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={`${feature}-${index}`}
                                            initial={{
                                                opacity: 0,
                                                y: 25,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            viewport={{
                                                once: true,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.06,
                                            }}
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "20px",
                                                borderRadius: "24px",
                                                border: "1px solid #f1f5f9",
                                                background: "#f8fafc",
                                                padding: "24px",
                                                transition: "all 0.3s ease",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-4px)";
                                                e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.2)";
                                                e.currentTarget.style.background = "#ffffff";
                                                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.borderColor = "#f1f5f9";
                                                e.currentTarget.style.background = "#f8fafc";
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    height: "48px",
                                                    width: "48px",
                                                    flexShrink: 0,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "16px",
                                                    background: "linear-gradient(135deg, #46A6D9, #6BBBE3)",
                                                    color: "white",
                                                    boxShadow: "0 10px 15px -3px rgba(70, 166, 217, 0.2)",
                                                    transition: "transform 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                }}
                                            >
                                                <CheckCircle2
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    paddingTop: "4px",
                                                    textAlign: isPersian ? "right" : "left",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                        fontWeight: 700,
                                                        lineHeight: 2,
                                                        color: "#1e293b",
                                                    }}
                                                >
                                                    {feature}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* =====================================================
                        GALLERY
                    ====================================================== */}
                    {gallery.length > 0 && (
                        <section
                            style={{
                                position: "relative",
                                background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                                paddingTop: "96px",
                                paddingBottom: "128px",
                            }}
                        >
                            <Container>
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
                                    transition={{
                                        duration: 0.7,
                                    }}
                                    style={{
                                        margin: "0 auto 56px",
                                        maxWidth: "768px",
                                        textAlign: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            borderRadius: "9999px",
                                            background: "rgba(70, 166, 217, 0.1)",
                                            padding: "10px 20px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "#46A6D9",
                                        }}
                                    >
                                        <ImageIcon
                                            style={{
                                                height: "16px",
                                                width: "16px",
                                            }}
                                        />

                                        {isPersian
                                            ? "گالری تصاویر"
                                            : "Image Gallery"}
                                    </span>

                                    <h2
                                        style={{
                                            marginTop: "24px",
                                            fontSize: "clamp(1.875rem, 4vw, 3rem)",
                                            fontWeight: 900,
                                            letterSpacing: "-0.025em",
                                            color: "#183B73",
                                        }}
                                    >
                                        {isPersian
                                            ? "تصاویر پروژه"
                                            : "Project Images"}
                                    </h2>

                                    <p
                                        style={{
                                            marginTop: "20px",
                                            fontSize: "16px",
                                            lineHeight: 2,
                                            color: "#64748b",
                                        }}
                                    >
                                        {isPersian
                                            ? "گالری تصاویر این پروژه"
                                            : "Gallery of project images"}
                                    </p>
                                </motion.div>

                                <div
                                    style={{
                                        display: "grid",
                                        gap: "24px",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                    }}
                                >
                                    {gallery.map((image, index) => (
                                        <motion.div
                                            key={`${image}-${index}`}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.96,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            viewport={{
                                                once: true,
                                            }}
                                            transition={{
                                                duration: 0.55,
                                                delay: index * 0.06,
                                            }}
                                            style={{
                                                overflow: "hidden",
                                                borderRadius: "32px",
                                                border: "1px solid rgba(255, 255, 255, 0.8)",
                                                background: "#ffffff",
                                                padding: "8px",
                                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                                transition: "all 0.5s ease",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-8px)";
                                                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.25)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)";
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    paddingBottom: "75%",
                                                    overflow: "hidden",
                                                    borderRadius: "24px",
                                                    backgroundColor: "#f1f5f9",
                                                }}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${getTitle(project)} - ${index + 1}`}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        display: "block",
                                                        transition: "transform 700ms ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = "scale(1.1)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = "scale(1)";
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: 0,
                                                        background: "linear-gradient(to top, rgba(7, 26, 53, 0.3), transparent, transparent)",
                                                        opacity: 0,
                                                        transition: "opacity 500ms ease",
                                                        pointerEvents: "none",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = "1";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.opacity = "0";
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        bottom: "16px",
                                                        [isPersian ? "right" : "left"]: "16px",
                                                        transform: "translateY(12px)",
                                                        borderRadius: "9999px",
                                                        background: "rgba(255, 255, 255, 0.9)",
                                                        padding: "6px 12px",
                                                        fontSize: "12px",
                                                        fontWeight: 700,
                                                        color: "#1e293b",
                                                        opacity: 0,
                                                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                                        backdropFilter: "blur(8px)",
                                                        WebkitBackdropFilter: "blur(8px)",
                                                        transition: "all 500ms ease",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = "1";
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.opacity = "0";
                                                        e.currentTarget.style.transform = "translateY(12px)";
                                                    }}
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Container>
                        </section>
                    )}

                    {/* =====================================================
                        CTA
                    ====================================================== */}
                    <section
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            paddingTop: "96px",
                            paddingBottom: "128px",
                            zIndex: 2,
                        }}
                    >
                        <Container>
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
                                    background: "linear-gradient(135deg, #0a2a4a 0%, #183B73 40%, #46A6D9 100%)",
                                    padding: "64px 28px",
                                    textAlign: "center",
                                    boxShadow: "0 30px 100px rgba(24, 59, 115, 0.3)",
                                }}
                            >
                                {/* CTA glow effects */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "-80px",
                                        left: "-80px",
                                        width: "300px",
                                        height: "300px",
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle, rgba(70, 166, 217, 0.3) 0%, rgba(70, 166, 217, 0) 70%)",
                                        filter: "blur(40px)",
                                        pointerEvents: "none",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "-100px",
                                        right: "-100px",
                                        width: "350px",
                                        height: "350px",
                                        borderRadius: "50%",
                                        background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)",
                                        filter: "blur(50px)",
                                        pointerEvents: "none",
                                    }}
                                />

                                {/* Small decorative circles */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "30px",
                                        right: "60px",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        background: "rgba(255, 255, 255, 0.2)",
                                        pointerEvents: "none",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "40px",
                                        left: "80px",
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "rgba(255, 255, 255, 0.15)",
                                        pointerEvents: "none",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 10,
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            margin: "0 auto",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "24px",
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)",
                                            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
                                        }}
                                    >
                                        <Sparkles
                                            size={36}
                                            style={{
                                                color: "#ffffff",
                                                filter: "drop-shadow(0 0 20px rgba(70, 166, 217, 0.5))",
                                            }}
                                        />
                                    </div>

                                    {/* Heading */}
                                    <h2
                                        style={{
                                            maxWidth: "850px",
                                            margin: "32px auto 0",
                                            textAlign: "center",
                                            fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
                                            lineHeight: 1.15,
                                            fontWeight: 900,
                                            letterSpacing: "-0.035em",
                                            color: "#ffffff",
                                            textShadow: "0 2px 40px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        {isPersian
                                            ? "بیایید داستان موفقیت بعدی شما را بسازیم"
                                            : "Let's Create Your Next Success Story"}
                                    </h2>

                                    {/* Description */}
                                    <p
                                        style={{
                                            maxWidth: "700px",
                                            margin: "22px auto 0",
                                            textAlign: "center",
                                            fontSize: "1.1rem",
                                            lineHeight: 1.9,
                                            fontWeight: 400,
                                            color: "rgba(255, 255, 255, 0.85)",
                                        }}
                                    >
                                        {isPersian
                                            ? "ایده خود را با ما در میان بگذارید و اجازه دهید تیم خلاق ما آن را به یک تجربه واقعی و تأثیرگذار تبدیل کند."
                                            : "Share your idea with us and let our creative team turn it into a real and impactful experience."}
                                    </p>

                                    {/* Buttons */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "16px",
                                            marginTop: "36px",
                                        }}
                                    >
                                        {/* Start Your Project - Primary Button */}
                                        <Link
                                            href="/contact"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px",
                                                minHeight: "58px",
                                                padding: "0 32px",
                                                borderRadius: "16px",
                                                background: "linear-gradient(135deg, #46A6D9 0%, #6BBBE3 50%, #8AC9E8 100%)",
                                                color: "#ffffff",
                                                fontSize: "1rem",
                                                fontWeight: 800,
                                                textDecoration: "none",
                                                boxShadow: "0 15px 40px rgba(70, 166, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                                transition: "all 0.3s ease",
                                                letterSpacing: "0.5px",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                                                e.currentTarget.style.boxShadow = "0 25px 50px rgba(70, 166, 217, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
                                                e.currentTarget.style.background = "linear-gradient(135deg, #5BBBE3 0%, #7AC9E8 50%, #9AD5EE 100%)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                                e.currentTarget.style.boxShadow = "0 15px 40px rgba(70, 166, 217, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                                                e.currentTarget.style.background = "linear-gradient(135deg, #46A6D9 0%, #6BBBE3 50%, #8AC9E8 100%)";
                                            }}
                                        >
                                            <Sparkles size={20} />

                                            {isPersian
                                                ? "شروع پروژه"
                                                : "Start Your Project"}

                                            <ArrowRight
                                                size={20}
                                                style={{
                                                    transform: isPersian ? "rotate(180deg)" : "none",
                                                }}
                                            />
                                        </Link>

                                        {/* Portfolio - Secondary Button */}
                                        <Link
                                            href="/portfolio"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px",
                                                minHeight: "58px",
                                                padding: "0 32px",
                                                borderRadius: "16px",
                                                background: "rgba(255, 255, 255, 0.12)",
                                                color: "#ffffff",
                                                border: "1px solid rgba(255, 255, 255, 0.25)",
                                                fontSize: "1rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                                backdropFilter: "blur(12px)",
                                                WebkitBackdropFilter: "blur(12px)",
                                                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                                                transition: "all 0.3s ease",
                                                letterSpacing: "0.5px",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-4px)";
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                                                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                                                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)";
                                            }}
                                        >
                                            <FolderOpen size={20} />

                                            {isPersian ? "نمونه کارها" : "Portfolio"}

                                            <ArrowRight
                                                size={20}
                                                style={{
                                                    transform: isPersian ? "rotate(180deg)" : "none",
                                                }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </Container>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}