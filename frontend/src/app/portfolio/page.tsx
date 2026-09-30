"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
    ArrowRight,
    ExternalLink,
    Sparkles,
    Calendar,
    FolderOpen,
    CheckCircle2,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { getActivePortfolio } from "@/services/portfolio";
import type { Portfolio as PortfolioType } from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

export default function Portfolio() {
    const { language } = useLanguage();

    const isPersian = language === "fa";

    const [portfolio, setPortfolio] = useState<PortfolioType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");

    /*
     * Load portfolio
     */
    useEffect(() => {
        async function loadPortfolio() {
            try {
                setLoading(true);

                const data = await getActivePortfolio();

                setPortfolio(data ?? []);
            } catch (error) {
                console.error("Failed to load portfolio:", error);
                setPortfolio([]);
            } finally {
                setLoading(false);
            }
        }

        loadPortfolio();
    }, []);

    /*
     * Reset filter when language changes.
     */
    useEffect(() => {
        setSelectedCategory("all");
    }, [language]);

    /*
     * Localized helpers
     */
    function getTitle(project: PortfolioType) {
        return isPersian
            ? project.title_fa || project.title_en
            : project.title_en || project.title_fa;
    }

    function getCategory(project: PortfolioType) {
        return isPersian
            ? project.category_fa || project.category_en
            : project.category_en || project.category_fa;
    }

    function getDescription(project: PortfolioType) {
        return isPersian
            ? project.description_fa || project.description_en
            : project.description_en || project.description_fa;
    }

    /*
     * Supported portfolio categories.
     *
     * These labels are used for filtering.
     */
    const categoryDefinitions = [
        {
            key: "all",
            en: "All",
            fa: "همه",
            aliases: [],
        },
        {
            key: "graphic-design",
            en: "Graphic Design",
            fa: "طراحی گرافیک",
            aliases: [
                "graphic design",
                "graphic-design",
                "design",
                "طراحی گرافیک",
            ],
        },
        {
            key: "website-development",
            en: "Website Development",
            fa: "طراحی و توسعه وب‌سایت",
            aliases: [
                "website development",
                "web development",
                "website",
                "web",
                "website-development",
                "طراحی و توسعه وب‌سایت",
                "توسعه وب",
            ],
        },
        {
            key: "motion-graphics",
            en: "Motion Graphics",
            fa: "موشن گرافیک",
            aliases: [
                "motion graphics",
                "motion-graphics",
                "motion",
                "موشن گرافیک",
            ],
        },
        {
            key: "digital-marketing",
            en: "Digital Marketing",
            fa: "دیجیتال مارکتینگ",
            aliases: [
                "digital marketing",
                "digital-marketing",
                "marketing",
                "دیجیتال مارکتینگ",
            ],
        },
        {
            key: "logo-design",
            en: "Logo Design",
            fa: "طراحی لوگو",
            aliases: [
                "logo design",
                "logo-design",
                "logo",
                "طراحی لوگو",
            ],
        },
        {
            key: "video-advertisement",
            en: "Video Advertisement",
            fa: "تبلیغات ویدیویی",
            aliases: [
                "video advertisement",
                "video-advertisement",
                "video advertising",
                "advertisement",
                "video",
                "تبلیغات ویدیویی",
            ],
        },
        {
            key: "printing-services",
            en: "Printing Services",
            fa: "خدمات چاپ",
            aliases: [
                "printing services",
                "printing-services",
                "printing",
                "print",
                "خدمات چاپ",
            ],
        },
    ];

    /*
     * Portfolio filters.
     *
     * We use the fixed service list instead of generating filters
     * from the projects returned by the API.
     */
    const categories = categoryDefinitions;

    /*
     * Match a project category against a filter.
     *
     * This makes the filter work even when the backend stores
     * slightly different English/Persian category names.
     */
    function projectMatchesCategory(
        project: PortfolioType,
        categoryKey: string
    ) {
        if (categoryKey === "all") {
            return true;
        }

        const definition = categoryDefinitions.find(
            (item) => item.key === categoryKey
        );

        if (!definition) {
            return false;
        }

        const category = getCategory(project);

        if (!category) {
            return false;
        }

        const normalizedCategory = category
            .trim()
            .toLowerCase();

        return definition.aliases.some(
            (alias) =>
                normalizedCategory ===
                    alias.toLowerCase() ||
                normalizedCategory.includes(
                    alias.toLowerCase()
                )
        );
    }

    /*
     * Filter portfolio.
     */
    const filteredPortfolio = useMemo(() => {
        return portfolio.filter((project) =>
            projectMatchesCategory(
                project,
                selectedCategory
            )
        );
    }, [
        portfolio,
        selectedCategory,
        language,
    ]);

    /*
     * Get localized filter label.
     */
    function getCategoryLabel(category: {
        en: string;
        fa: string;
    }) {
        return isPersian
            ? category.fa
            : category.en;
    }

    return (
        <div
            dir={isPersian ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: "linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%)",
                position: "relative",
            }}
        >
            {/* ✨ Beautiful Page Background Decorative Elements */}
            <style jsx global>{`
                body {
                    background: linear-gradient(160deg, #f0f9ff 0%, #e6f0fa 30%, #f5f9ff 60%, #e8f2fc 100%);
                    margin: 0;
                    padding: 0;
                }

                /* Subtle animated gradient overlay for the page */
                .page-background-glow {
                    position: fixed;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(ellipse at 30% 20%, rgba(70, 166, 217, 0.08) 0%, transparent 50%),
                                radial-gradient(ellipse at 70% 80%, rgba(24, 59, 115, 0.06) 0%, transparent 50%);
                    pointer-events: none;
                    z-index: 0;
                    animation: pageGlow 20s ease-in-out infinite alternate;
                }

                @keyframes pageGlow {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: translate(2%, 1%) scale(1.05);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translate(-1%, -2%) scale(0.95);
                        opacity: 0.6;
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

                /* ✨ Banner/Header Glow Animation */
                .banner-glow {
                    position: absolute;
                    top: -200px;
                    right: -150px;
                    width: 600px;
                    height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(70, 166, 217, 0.25) 0%, rgba(70, 166, 217, 0.05) 40%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                    animation: bannerGlow 8s ease-in-out infinite alternate;
                }

                .banner-glow-2 {
                    position: absolute;
                    bottom: -180px;
                    left: -120px;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(24, 59, 115, 0.18) 0%, rgba(24, 59, 115, 0.04) 40%, transparent 70%);
                    filter: blur(80px);
                    pointer-events: none;
                    animation: bannerGlow2 10s ease-in-out infinite alternate;
                }

                @keyframes bannerGlow {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(-30px, 20px) scale(1.15);
                        opacity: 1;
                    }
                }

                @keyframes bannerGlow2 {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translate(40px, -30px) scale(1.2);
                        opacity: 0.9;
                    }
                }

                /* Floating particles for the banner */
                .particle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(70, 166, 217, 0.15);
                    pointer-events: none;
                    animation: floatParticle 12s ease-in-out infinite;
                }

                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translate(20px, -30px) scale(1.2);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translate(-15px, -10px) scale(0.9);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translate(30px, 20px) scale(1.1);
                        opacity: 0.7;
                    }
                }
            `}</style>

            {/* Page Background Glow */}
            <div className="page-background-glow" />

            <Header />

            <main
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
                        paddingTop: "96px",
                        paddingBottom: "128px",
                        // 🌟 BEAUTIFUL BANNER BACKGROUND - Enhanced Gradient
                        background: "linear-gradient(145deg, #dcecfa 0%, #f0f8ff 25%, #e3f0fa 50%, #f5faff 75%, #dcecf8 100%)",
                        borderBottom: "3px solid rgba(70, 166, 217, 0.15)",
                    }}
                >
                    {/* 🌟 BANNER GLOW EFFECTS */}
                    <div className="banner-glow" />
                    <div className="banner-glow-2" />

                    {/* Floating Particles */}
                    <div 
                        className="particle" 
                        style={{ 
                            width: "8px", 
                            height: "8px", 
                            top: "15%", 
                            left: "10%",
                            animationDelay: "0s",
                            animationDuration: "14s"
                        }} 
                    />
                    <div 
                        className="particle" 
                        style={{ 
                            width: "12px", 
                            height: "12px", 
                            top: "25%", 
                            right: "15%",
                            animationDelay: "2s",
                            animationDuration: "16s",
                            background: "rgba(24, 59, 115, 0.12)"
                        }} 
                    />
                    <div 
                        className="particle" 
                        style={{ 
                            width: "6px", 
                            height: "6px", 
                            bottom: "30%", 
                            left: "20%",
                            animationDelay: "4s",
                            animationDuration: "12s"
                        }} 
                    />
                    <div 
                        className="particle" 
                        style={{ 
                            width: "10px", 
                            height: "10px", 
                            bottom: "20%", 
                            right: "10%",
                            animationDelay: "1s",
                            animationDuration: "18s",
                            background: "rgba(70, 166, 217, 0.10)"
                        }} 
                    />
                    <div 
                        className="particle" 
                        style={{ 
                            width: "7px", 
                            height: "7px", 
                            top: "50%", 
                            left: "5%",
                            animationDelay: "3s",
                            animationDuration: "15s",
                            background: "rgba(24, 59, 115, 0.08)"
                        }} 
                    />
                    <div 
                        className="particle" 
                        style={{ 
                            width: "9px", 
                            height: "9px", 
                            top: "10%", 
                            right: "30%",
                            animationDelay: "5s",
                            animationDuration: "13s"
                        }} 
                    />

                    {/* Decorative background */}
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
                                x: [0, 50, 0],
                                y: [0, -35, 0],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                position: "absolute",
                                left: "-160px",
                                top: "40px",
                                width: "420px",
                                height: "420px",
                                borderRadius: "50%",
                                background: "rgba(70, 166, 217, 0.20)",
                                filter: "blur(130px)",
                            }}
                        />

                        <motion.div
                            animate={{
                                x: [0, -45, 0],
                                y: [0, 45, 0],
                            }}
                            transition={{
                                duration: 17,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            style={{
                                position: "absolute",
                                bottom: "-80px",
                                right: "-80px",
                                width: "500px",
                                height: "500px",
                                borderRadius: "50%",
                                background: "rgba(24, 59, 115, 0.12)",
                                filter: "blur(150px)",
                            }}
                        />
                    </div>

                    <Container>
                        {/* Hero */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 35,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                            }}
                            style={{
                                maxWidth: "900px",
                                margin: "0 auto 56px",
                                textAlign: "center",
                                position: "relative",
                                zIndex: 2,
                            }}
                        >
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    margin: "0 auto 28px",
                                    padding: "10px 20px",
                                    borderRadius: "9999px",
                                    border: "1px solid rgba(70, 166, 217, 0.25)",
                                    background: "rgba(255, 255, 255, 0.85)",
                                    boxShadow: "0 8px 30px rgba(24, 59, 115, 0.08)",
                                    backdropFilter: "blur(20px)",
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    color: "#183B73",
                                }}
                            >
                                <Sparkles
                                    size={16}
                                    style={{
                                        color: "#46A6D9",
                                    }}
                                />

                                {isPersian
                                    ? "نمونه کارهای ما"
                                    : "Our Portfolio"}
                            </div>

                            <h1
                                style={{
                                    maxWidth: "900px",
                                    margin: "0 auto",
                                    textAlign: "center",
                                    fontSize: "clamp(2.6rem, 6vw, 5.2rem)",
                                    lineHeight: 1.05,
                                    fontWeight: 950,
                                    letterSpacing: "-0.04em",
                                    color: "#183B73",
                                    textShadow: "0 2px 40px rgba(70, 166, 217, 0.08)",
                                }}
                            >
                                {isPersian ? (
                                    <>
                                        <br />
                                        داستان‌های موفقیت
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
                                            ما
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <br />
                                        Our Creative
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
                                            Success Stories
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
                                {isPersian
                                    ? "مجموعه‌ای از پروژه‌هایی را مشاهده کنید که با خلاقیت، نوآوری و تخصص برای مشتریان ما خلق شده‌اند."
                                    : "Explore a collection of projects created through creativity, innovation and expertise to deliver meaningful results for our clients."}
                            </p>
                        </motion.div>

                        {/* Rest of your component remains the same... */}
                        {/* Filters */}
                        {!loading && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.7,
                                }}
                                style={{
                                    marginBottom: "64px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "12px",
                                        margin: "0 auto",
                                        maxWidth: "1100px",
                                    }}
                                >
                                    {categories.map(
                                        (category) => {
                                            const isActive =
                                                selectedCategory ===
                                                category.key;

                                            return (
                                                <button
                                                    key={
                                                        category.key
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedCategory(
                                                            category.key
                                                        )
                                                    }
                                                    style={{
                                                        position: "relative",
                                                        overflow: "hidden",
                                                        border: isActive
                                                            ? "1px solid transparent"
                                                            : "1px solid rgba(24, 59, 115, 0.1)",
                                                        borderRadius: "999px",
                                                        padding: "13px 22px",
                                                        background: isActive
                                                            ? "linear-gradient(135deg, #183b73, #46a6d9)"
                                                            : "rgba(255, 255, 255, 0.85)",
                                                        color: isActive
                                                            ? "#ffffff"
                                                            : "#526174",
                                                        fontSize: "0.88rem",
                                                        fontWeight: 800,
                                                        cursor: "pointer",
                                                        transition:
                                                            "transform 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                                                        backdropFilter: "blur(16px)",
                                                        boxShadow: isActive
                                                            ? "0 14px 32px rgba(24, 59, 115, 0.2)"
                                                            : "none",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.transform = "translateY(-3px)";
                                                            e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.35)";
                                                            e.currentTarget.style.color = "#183b73";
                                                            e.currentTarget.style.boxShadow = "0 12px 30px rgba(24, 59, 115, 0.08)";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.transform = "translateY(0)";
                                                            e.currentTarget.style.borderColor = "rgba(24, 59, 115, 0.1)";
                                                            e.currentTarget.style.color = "#526174";
                                                            e.currentTarget.style.boxShadow = "none";
                                                        }
                                                    }}
                                                >
                                                    {getCategoryLabel(
                                                        category
                                                    )}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Loading */}
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
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "64px",
                                            width: "64px",
                                            borderRadius: "50%",
                                            border: "4px solid rgba(70, 166, 217, 0.2)",
                                            borderTopColor: "#46A6D9",
                                            animation: "spin 1s linear infinite",
                                        }}
                                    />

                                    <Sparkles
                                        size={20}
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            color: "#183B73",
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Empty */}
                        {!loading &&
                            filteredPortfolio.length ===
                                0 && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    style={{
                                        borderRadius: "32px",
                                        border: "1px solid #ffffff",
                                        background: "rgba(255, 255, 255, 0.8)",
                                        padding: "96px 32px",
                                        textAlign: "center",
                                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                        backdropFilter: "blur(18px)",
                                    }}
                                >
                                    <FolderOpen
                                        size={58}
                                        style={{
                                            margin: "0 auto",
                                            color: "#cbd5e1",
                                        }}
                                    />

                                    <h3
                                        style={{
                                            marginTop: "24px",
                                            fontSize: "24px",
                                            fontWeight: 900,
                                            color: "#183B73",
                                        }}
                                    >
                                        {isPersian
                                            ? "پروژه‌ای در این دسته پیدا نشد"
                                            : "No projects found in this category"}
                                    </h3>

                                    <p
                                        style={{
                                            margin: "12px auto 0",
                                            maxWidth: "560px",
                                            fontSize: "14px",
                                            lineHeight: 1.75,
                                            color: "#64748b",
                                        }}
                                    >
                                        {isPersian
                                            ? "لطفاً دسته دیگری را انتخاب کنید."
                                            : "Please choose another category to explore more projects."}
                                    </p>
                                </motion.div>
                            )}

                        {/* Project Grid */}
                        {!loading &&
                            filteredPortfolio.length > 0 && (
                                <div
                                    style={{
                                        display: "grid",
                                        gap: "32px",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                    }}
                                >
                                    {filteredPortfolio.map(
                                        (project, index) => (
                                            <motion.article
                                                key={project.id}
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
                                                    margin: "-40px",
                                                }}
                                                transition={{
                                                    delay: index * 0.07,
                                                    duration: 0.6,
                                                }}
                                                whileHover={{
                                                    y: -9,
                                                }}
                                                style={{
                                                    height: "100%",
                                                    overflow: "hidden",
                                                    border: "1px solid rgba(255, 255, 255, 0.9)",
                                                    borderRadius: "30px",
                                                    background: "rgba(255, 255, 255, 0.88)",
                                                    boxShadow: "0 25px 70px rgba(24, 59, 115, 0.08)",
                                                    backdropFilter: "blur(18px)",
                                                    transition: "transform 0.35s ease, box-shadow 0.35s ease",
                                                    position: "relative",
                                                }}
                                            >
                                                {/* Accent */}
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: "0 0 auto 0",
                                                        height: "6px",
                                                        zIndex: 20,
                                                        background:
                                                            project.theme_color ||
                                                            "#46A6D9",
                                                    }}
                                                />

                                                {/* Image */}
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        height: "288px",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {project.image ? (
                                                        <img
                                                            src={project.image}
                                                            alt={getTitle(project)}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                                objectFit: "cover",
                                                                display: "block",
                                                                transition: "transform 0.7s ease",
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.transform = "scale(1.1)";
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.transform = "scale(1)";
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                height: "100%",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                                            }}
                                                        >
                                                            <FolderOpen
                                                                size={80}
                                                                style={{
                                                                    color: "rgba(255, 255, 255, 0.4)",
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            inset: 0,
                                                            background: "linear-gradient(to top, rgba(7, 26, 53, 0.9), rgba(7, 26, 53, 0.2), transparent)",
                                                        }}
                                                    />

                                                    {/* Category */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: "20px",
                                                            left: "20px",
                                                            right: "20px",
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            justifyContent: "space-between",
                                                            gap: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                borderRadius: "9999px",
                                                                padding: "8px 16px",
                                                                fontSize: "10px",
                                                                fontWeight: 900,
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.08em",
                                                                color: "#ffffff",
                                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                                                background:
                                                                    project.theme_color ||
                                                                    "#46A6D9",
                                                            }}
                                                        >
                                                            {getCategory(
                                                                project
                                                            )}
                                                        </span>

                                                        {project.is_featured && (
                                                            <span
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "6px",
                                                                    borderRadius: "9999px",
                                                                    padding: "8px 12px",
                                                                    background: "rgba(255, 255, 255, 0.9)",
                                                                    fontSize: "10px",
                                                                    fontWeight: 700,
                                                                    color: "#183B73",
                                                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                                    backdropFilter: "blur(8px)",
                                                                }}
                                                            >
                                                                <Sparkles
                                                                    size={12}
                                                                    style={{
                                                                        color: "#f59e0b",
                                                                    }}
                                                                />

                                                                {isPersian
                                                                    ? "ویژه"
                                                                    : "Featured"}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: "20px",
                                                            left: "20px",
                                                            right: "20px",
                                                            textAlign: isPersian ? "right" : "left",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                marginBottom: "8px",
                                                                fontSize: "10px",
                                                                fontWeight: 700,
                                                                textTransform: "uppercase",
                                                                letterSpacing: "0.18em",
                                                                color: "rgba(255, 255, 255, 0.6)",
                                                            }}
                                                        >
                                                            {isPersian
                                                                ? `پروژه ${String(index + 1).padStart(2, "0")}`
                                                                : `Project ${String(index + 1).padStart(2, "0")}`}
                                                        </p>

                                                        <h2
                                                            style={{
                                                                fontSize: "24px",
                                                                fontWeight: 900,
                                                                lineHeight: 1.2,
                                                                color: "#ffffff",
                                                                margin: 0,
                                                            }}
                                                        >
                                                            {getTitle(project)}
                                                        </h2>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div
                                                    style={{
                                                        padding: "28px",
                                                        textAlign: isPersian ? "right" : "left",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 3,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            minHeight: "76px",
                                                            fontSize: "14px",
                                                            lineHeight: 1.75,
                                                            color: "#64748b",
                                                            margin: 0,
                                                        }}
                                                    >
                                                        {getDescription(project) ||
                                                            (isPersian
                                                                ? "جزئیات این پروژه را مشاهده کنید."
                                                                : "Explore the details of this project.")}
                                                    </p>

                                                    {/* Details */}
                                                    <div
                                                        style={{
                                                            marginTop: "24px",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "16px",
                                                        }}
                                                    >
                                                        {project.client_name && (
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "12px",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        flexShrink: 0,
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        borderRadius: "12px",
                                                                        background: `${project.theme_color || "#46A6D9"}18`,
                                                                    }}
                                                                >
                                                                    <FolderOpen
                                                                        size={18}
                                                                        style={{
                                                                            color:
                                                                                project.theme_color ||
                                                                                "#46A6D9",
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <p
                                                                        style={{
                                                                            fontSize: "10px",
                                                                            fontWeight: 700,
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.08em",
                                                                            color: "#94a3b8",
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {isPersian
                                                                            ? "مشتری"
                                                                            : "Client"}
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            marginTop: "2px",
                                                                            fontSize: "14px",
                                                                            fontWeight: 700,
                                                                            color: "#1e293b",
                                                                        }}
                                                                    >
                                                                        {project.client_name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {project.completion_date && (
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "12px",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        height: "40px",
                                                                        width: "40px",
                                                                        flexShrink: 0,
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        borderRadius: "12px",
                                                                        background: `${project.theme_color || "#46A6D9"}18`,
                                                                    }}
                                                                >
                                                                    <Calendar
                                                                        size={18}
                                                                        style={{
                                                                            color:
                                                                                project.theme_color ||
                                                                                "#46A6D9",
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <p
                                                                        style={{
                                                                            fontSize: "10px",
                                                                            fontWeight: 700,
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.08em",
                                                                            color: "#94a3b8",
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {isPersian
                                                                            ? "تکمیل شده"
                                                                            : "Completed"}
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            marginTop: "2px",
                                                                            fontSize: "14px",
                                                                            fontWeight: 700,
                                                                            color: "#1e293b",
                                                                        }}
                                                                    >
                                                                        {new Date(
                                                                            project.completion_date
                                                                        ).toLocaleDateString(
                                                                            isPersian
                                                                                ? "fa-IR"
                                                                                : "en-US"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Footer */}
                                                    <div
                                                        style={{
                                                            marginTop: "28px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            gap: "16px",
                                                            borderTop: "1px solid #f1f5f9",
                                                            paddingTop: "24px",
                                                        }}
                                                    >
                                                        {project.project_url ? (
                                                            <Link
                                                                href={project.project_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "8px",
                                                                    fontSize: "12px",
                                                                    fontWeight: 700,
                                                                    color: "#64748b",
                                                                    textDecoration: "none",
                                                                    transition: "color 0.25s ease",
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.color = "#46A6D9";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.color = "#64748b";
                                                                }}
                                                            >
                                                                {isPersian
                                                                    ? "مشاهده سایت"
                                                                    : "Live Project"}

                                                                <ExternalLink
                                                                    size={14}
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <span
                                                                style={{
                                                                    fontSize: "12px",
                                                                    fontWeight: 500,
                                                                    color: "#94a3b8",
                                                                }}
                                                            >
                                                                {isPersian
                                                                    ? "پروژه خصوصی"
                                                                    : "Private Project"}
                                                            </span>
                                                        )}

                                                        <Button
                                                            asChild
                                                            rightIcon={
                                                                <ArrowRight className="h-4 w-4" />
                                                            }
                                                        >
                                                            <Link
                                                                href={`/portfolio/${project.slug}`}
                                                            >
                                                                {isPersian
                                                                    ? "مشاهده پروژه"
                                                                    : "View Project"}
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.article>
                                        )
                                    )}
                                </div>
                            )}

                        {/* CTA */}
                        <motion.section
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
                                amount: 0.15,
                            }}
                            transition={{
                                duration: 0.8,
                            }}
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                marginTop: "96px",
                                borderRadius: "36px",
                                background: "linear-gradient(135deg, #eef8ff 0%, #f8fbff 48%, #edf7ff 100%)",
                                border: "1px solid rgba(70, 166, 217, 0.18)",
                                boxShadow: "0 30px 80px rgba(24, 59, 115, 0.10)",
                            }}
                        >
                            {/* Decorative soft blue glow */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-140px",
                                    right: "-100px",
                                    width: "360px",
                                    height: "360px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(70,166,217,0.20) 0%, rgba(70,166,217,0) 70%)",
                                    filter: "blur(10px)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Decorative soft purple/blue glow */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "-160px",
                                    left: "-100px",
                                    width: "380px",
                                    height: "380px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(circle, rgba(125,145,210,0.16) 0%, rgba(125,145,210,0) 70%)",
                                    filter: "blur(15px)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Small decorative circle */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "35px",
                                    left: "45%",
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: "#8ac9e8",
                                    opacity: 0.6,
                                    pointerEvents: "none",
                                }}
                            />

                            {/* CTA Content */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 10,
                                    padding: "72px 28px",
                                    textAlign: "center",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        margin: "0 auto",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "20px",
                                        background: "linear-gradient(135deg, #dff3ff 0%, #ffffff 100%)",
                                        border: "1px solid rgba(70, 166, 217, 0.20)",
                                        boxShadow: "0 12px 30px rgba(70, 166, 217, 0.12)",
                                    }}
                                >
                                    <CheckCircle2
                                        size={32}
                                        style={{
                                            color: "#46A6D9",
                                        }}
                                    />
                                </div>

                                {/* Heading */}
                                <h2
                                    style={{
                                        maxWidth: "850px",
                                        margin: "28px auto 0",
                                        textAlign: "center",
                                        fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                                        lineHeight: 1.15,
                                        fontWeight: 900,
                                        letterSpacing: "-0.035em",
                                        color: "#183B73",
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
                                        fontSize: "1.05rem",
                                        lineHeight: 1.9,
                                        fontWeight: 500,
                                        color: "#64748B",
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
                                        gap: "14px",
                                        marginTop: "34px",
                                    }}
                                >
                                    {/* Start Your Project */}
                                    <Link
                                        href="/contact"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "9px",
                                            minHeight: "54px",
                                            padding: "0 26px",
                                            borderRadius: "15px",
                                            background: "linear-gradient(135deg, #46A6D9 0%, #6BBBE3 100%)",
                                            color: "#ffffff",
                                            fontSize: "0.92rem",
                                            fontWeight: 800,
                                            textDecoration: "none",
                                            boxShadow: "0 12px 28px rgba(70, 166, 217, 0.25)",
                                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-3px)";
                                            e.currentTarget.style.boxShadow = "0 18px 36px rgba(70, 166, 217, 0.32)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 12px 28px rgba(70, 166, 217, 0.25)";
                                        }}
                                    >
                                        {isPersian
                                            ? "شروع پروژه"
                                            : "Start Your Project"}

                                        <ArrowRight
                                            size={18}
                                            style={{
                                                transform: isPersian
                                                    ? "rotate(180deg)"
                                                    : "none",
                                            }}
                                        />
                                    </Link>

                                    {/* Explore Services */}
                                    <Link
                                        href="/services"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "9px",
                                            minHeight: "54px",
                                            padding: "0 26px",
                                            borderRadius: "15px",
                                            background: "#ffffff",
                                            color: "#28558A",
                                            border: "1px solid rgba(70, 166, 217, 0.25)",
                                            fontSize: "0.92rem",
                                            fontWeight: 800,
                                            textDecoration: "none",
                                            boxShadow: "0 10px 25px rgba(24, 59, 115, 0.07)",
                                            transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-3px)";
                                            e.currentTarget.style.background = "#f4fbff";
                                            e.currentTarget.style.boxShadow = "0 16px 32px rgba(24, 59, 115, 0.11)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.background = "#ffffff";
                                            e.currentTarget.style.boxShadow = "0 10px 25px rgba(24, 59, 115, 0.07)";
                                        }}
                                    >
                                        {isPersian
                                            ? "مشاهده خدمات"
                                            : "Explore Services"}

                                        <ArrowRight
                                            size={18}
                                            style={{
                                                transform: isPersian
                                                    ? "rotate(180deg)"
                                                    : "none",
                                            }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </motion.section>
                    </Container>
                </div>
            </main>

            <Footer />
        </div>
    );
}