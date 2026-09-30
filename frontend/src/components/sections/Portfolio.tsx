"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
    ArrowRight,
    ExternalLink,
    Sparkles,
    Calendar,
    FolderOpen,
    MoveUpRight,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";

import {
    getFeaturedPortfolio,
    getActivePortfolio,
} from "@/services/portfolio";

import type { Portfolio } from "@/types/portfolio";

import { useLanguage } from "@/context/language-context";

/*
|--------------------------------------------------------------------------
| Homepage Portfolio Section
|--------------------------------------------------------------------------
*/

export default function PortfolioSection() {

    const { language } = useLanguage();

    const [projects, setProjects] =
        useState<Portfolio[]>([]);

    const [loading, setLoading] =
        useState(true);

    /*
    |--------------------------------------------------------------------------
    | Localized Portfolio Helpers
    |--------------------------------------------------------------------------
    */

    const getTitle = (project: Portfolio) => {
        return language === "fa"
            ? project.title_fa
            : project.title_en;
    };

    const getCategory = (project: Portfolio) => {
        return language === "fa"
            ? project.category_fa
            : project.category_en;
    };

    const getDescription = (project: Portfolio) => {
        return language === "fa"
            ? project.description_fa
            : project.description_en;
    };

    /*
    |--------------------------------------------------------------------------
    | Load Four Homepage Projects
    |--------------------------------------------------------------------------
    |
    | Featured projects are preferred.
    | If there are fewer than 4 featured projects,
    | active projects are used to fill the remaining slots.
    |
    */

    useEffect(() => {

        async function loadPortfolioProjects() {

            try {

                const [
                    featuredProjects,
                    activeProjects,
                ] = await Promise.all([
                    getFeaturedPortfolio(),
                    getActivePortfolio(),
                ]);

                /*
                |--------------------------------------------------------------------------
                | Remove duplicates
                |--------------------------------------------------------------------------
                */

                const mergedProjects = [
                    ...featuredProjects,
                    ...activeProjects,
                ];

                const uniqueProjects =
                    mergedProjects.filter(
                        (project, index, array) =>
                            array.findIndex(
                                item =>
                                    item.id === project.id
                            ) === index
                    );

                /*
                |--------------------------------------------------------------------------
                | Take exactly 4 projects
                |--------------------------------------------------------------------------
                */

                setProjects(
                    uniqueProjects.slice(0, 4)
                );

            } catch (error) {

                console.error(
                    "Failed to load portfolio projects:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        loadPortfolioProjects();

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <section
                style={{
                    position: "relative",
                    overflow: "hidden",
                    paddingTop: "96px",
                    paddingBottom: "128px",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: -1,
                        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 48%, #f0f9ff 100%)",
                    }}
                />

                <Container>
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
                                height: "56px",
                                width: "56px",
                                borderRadius: "50%",
                                border: "4px solid #46A6D9",
                                borderTopColor: "transparent",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                    </div>
                </Container>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!projects.length) {
        return null;
    }

    const mainProject = projects[0];

    const smallProjects = projects.slice(1, 4);

    /*
    |--------------------------------------------------------------------------
    | Localized Main Project Values
    |--------------------------------------------------------------------------
    */

    const mainTitle = getTitle(mainProject);
    const mainCategory = getCategory(mainProject);
    const mainDescription = getDescription(mainProject);

    return (

        <section
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#f7fbff",
                paddingTop: "96px",
                paddingBottom: "128px",
            }}
        >

            {/* ==============================================================
                BACKGROUND
            ============================================================== */}

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                    zIndex: -1,
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
                        top: "80px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "rgba(70, 166, 217, 0.1)",
                        filter: "blur(130px)",
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
                        top: "35%",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "rgba(24, 59, 115, 0.1)",
                        filter: "blur(150px)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "35%",
                        width: "350px",
                        height: "350px",
                        borderRadius: "50%",
                        background: "rgba(186, 230, 253, 0.2)",
                        filter: "blur(120px)",
                    }}
                />
            </div>

            <Container>

                {/* ==========================================================
                    SECTION HEADING - ENHANCED
                ========================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto 64px",
                        textAlign: "center",
                    }}
                    dir={language === "fa" ? "rtl" : "ltr"}
                >

                    {/* Eyebrow - Enhanced */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "20px",
                            padding: "10px 20px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(70, 166, 217, 0.20)",
                            background: "rgba(255, 255, 255, 0.80)",
                            boxShadow: "0 8px 30px rgba(24, 59, 115, 0.06)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
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

                        {language === "fa"
                            ? "نمونه‌کارهای ما"
                            : "Our Portfolio"}
                    </div>

                    {/* Heading - Enhanced with <br /> tags */}
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
                        }}
                    >
                        {language === "fa" ? (
                            <>
                                ایده‌هایی که
                                <span
                                    style={{
                                        display: "block",
                                        marginTop: "10px",
                                        background:
                                            "linear-gradient(90deg, #183b73, #24579d, #46a6d9)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                    }}
                                >
                                    به واقعیت تبدیل کردیم
                                </span>
                            </>
                        ) : (
                            <>
                                Ideas We've Turned
                                <span
                                    style={{
                                        display: "block",
                                        marginTop: "10px",
                                        background:
                                            "linear-gradient(90deg, #183b73, #24579d, #46a6d9)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text",
                                        color: "transparent",
                                    }}
                                >
                                    Into Reality
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
                            color: "#64748b",
                        }}
                    >
                        {language === "fa"
                            ? "مجموعه‌ای از پروژه‌های منتخب ما را مشاهده کنید؛ جایی که خلاقیت، استراتژی و فناوری برای خلق نتایج ارزشمند در کنار یکدیگر قرار گرفته‌اند."
                            : "Explore a selection of projects where creativity, strategy and technology come together to create meaningful results."}
                    </p>

                </motion.div>


                {/* ==========================================================
                    MAIN FEATURED PROJECT
                ============================================================== */}

                <motion.article
                    initial={{
                        opacity: 0,
                        y: 60,
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
                    whileHover={{
                        y: -6,
                    }}
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "36px",
                        border: "1px solid #ffffff",
                        background: "#ffffff",
                        boxShadow: "0 30px 80px rgba(24, 59, 115, 0.14)",
                    }}
                    dir={language === "fa" ? "rtl" : "ltr"}
                >

                    {/* Theme Glow */}
                    <div
                        style={{
                            position: "absolute",
                            right: "-96px",
                            top: "-96px",
                            width: "320px",
                            height: "320px",
                            borderRadius: "50%",
                            background: `${mainProject.theme_color}22`,
                            filter: "blur(100px)",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.35fr 0.65fr",
                        }}
                    >

                        {/* --------------------------------------------------
                            IMAGE - RECREATED WITH INLINE CSS
                        -------------------------------------------------- */}

                        <div
                            style={{
                                position: "relative",
                                minHeight: "380px",
                                overflow: "hidden",
                            }}
                        >
                            {mainProject.image ? (
                                <img
                                    src={mainProject.image}
                                    alt={mainTitle}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        transition: "transform 1000ms ease-out",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.05)";
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
                                        minHeight: "380px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                    }}
                                >
                                    <FolderOpen
                                        size={100}
                                        style={{
                                            color: "rgba(255, 255, 255, 0.4)",
                                        }}
                                    />
                                </div>
                            )}

                            {/* Image Overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(7, 26, 53, 0.9), rgba(7, 26, 53, 0.2), transparent)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Top Accent */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "6px",
                                    background: mainProject.theme_color,
                                }}
                            />

                            {/* Category */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "28px",
                                    left: "28px",
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-flex",
                                        borderRadius: "9999px",
                                        padding: "8px 16px",
                                        fontSize: "12px",
                                        fontWeight: 900,
                                        letterSpacing: "0.16em",
                                        color: "#ffffff",
                                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                        background: mainProject.theme_color,
                                    }}
                                >
                                    {mainCategory}
                                </span>
                            </div>

                            {/* Featured */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "28px",
                                    right: "28px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        borderRadius: "9999px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                        background: "rgba(255, 255, 255, 0.15)",
                                        padding: "8px 16px",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        color: "#ffffff",
                                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                    }}
                                >
                                    <Sparkles size={14} />
                                    {language === "fa"
                                        ? "منتخب"
                                        : "Featured"}
                                </div>
                            </div>

                            {/* Image Bottom Label */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: "32px",
                                    left: "32px",
                                    right: "32px",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "space-between",
                                    gap: "20px",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            marginBottom: "8px",
                                            fontSize: "12px",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.18em",
                                            color: "rgba(255, 255, 255, 0.6)",
                                        }}
                                    >
                                        {language === "fa"
                                            ? "پروژه منتخب"
                                            : "Selected Work"}
                                    </p>

                                    <h3
                                        style={{
                                            maxWidth: "560px",
                                            fontSize: "clamp(1.5rem, 3vw, 3rem)",
                                            fontWeight: 900,
                                            lineHeight: 1.2,
                                            color: "#ffffff",
                                        }}
                                    >
                                        {mainTitle}
                                    </h3>
                                </div>

                                <Link
                                    href={`/portfolio/${mainProject.slug}`}
                                    aria-label={
                                        language === "fa"
                                            ? `مشاهده ${mainTitle}`
                                            : `View ${mainTitle}`
                                    }
                                    style={{
                                        display: "flex",
                                        height: "56px",
                                        width: "56px",
                                        flexShrink: 0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        background: "#ffffff",
                                        color: "#183B73",
                                        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
                                        transition: "all 0.3s ease",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    <MoveUpRight size={22} />
                                </Link>
                            </div>
                        </div>


                        {/* --------------------------------------------------
                            MAIN PROJECT CONTENT
                        -------------------------------------------------- */}

                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "32px",
                            }}
                        >
                            <div
                                style={{
                                    width: "64px",
                                    height: "4px",
                                    borderRadius: "9999px",
                                    marginBottom: "32px",
                                    background: mainProject.theme_color,
                                }}
                            />

                            <p
                                style={{
                                    fontSize: "12px",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.2em",
                                    color: "#46A6D9",
                                }}
                            >
                                {language === "fa"
                                    ? "پروژه منتخب"
                                    : "Featured Project"}
                            </p>

                            <h3
                                style={{
                                    marginTop: "16px",
                                    fontSize: "30px",
                                    fontWeight: 900,
                                    lineHeight: 1.2,
                                    color: "#183B73",
                                }}
                            >
                                {mainTitle}
                            </h3>

                            {mainDescription && (
                                <p
                                    style={{
                                        marginTop: "20px",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        fontSize: "16px",
                                        lineHeight: 2,
                                        color: "#64748b",
                                    }}
                                >
                                    {mainDescription}
                                </p>
                            )}

                            {/* Project Details */}
                            <div
                                style={{
                                    marginTop: "32px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                }}
                            >
                                {mainProject.client_name && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                height: "44px",
                                                width: "44px",
                                                flexShrink: 0,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "12px",
                                                background: `${mainProject.theme_color}15`,
                                                color: mainProject.theme_color,
                                            }}
                                        >
                                            <FolderOpen size={19} />
                                        </div>

                                        <div>
                                            <p
                                                style={{
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.15em",
                                                    color: "#94a3b8",
                                                }}
                                            >
                                                {language === "fa"
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
                                                {mainProject.client_name}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {mainProject.completion_date && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                height: "44px",
                                                width: "44px",
                                                flexShrink: 0,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "12px",
                                                background: `${mainProject.theme_color}15`,
                                                color: mainProject.theme_color,
                                            }}
                                        >
                                            <Calendar size={19} />
                                        </div>

                                        <div>
                                            <p
                                                style={{
                                                    fontSize: "10px",
                                                    fontWeight: 700,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.15em",
                                                    color: "#94a3b8",
                                                }}
                                            >
                                                {language === "fa"
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
                                                    mainProject.completion_date
                                                ).toLocaleDateString(
                                                    language === "fa"
                                                        ? "fa-IR"
                                                        : "en-US"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div
                                style={{
                                    marginTop: "32px",
                                    marginBottom: "32px",
                                    height: "1px",
                                    background: "#e2e8f0",
                                }}
                            />

                            {/* CTA */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: "16px",
                                }}
                            >
                                <Button
                                    asChild
                                    rightIcon={
                                        <ArrowRight
                                            className="h-4 w-4"
                                        />
                                    }
                                >
                                    <Link
                                        href={`/portfolio/${mainProject.slug}`}
                                    >
                                        {language === "fa"
                                            ? "مشاهده پروژه"
                                            : "View Project"}
                                    </Link>
                                </Button>

                                {mainProject.project_url && (
                                    <Link
                                        href={mainProject.project_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            borderRadius: "12px",
                                            padding: "12px 16px",
                                            fontSize: "14px",
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
                                        {language === "fa"
                                            ? "مشاهده آنلاین"
                                            : "Live Project"}
                                        <ExternalLink size={15} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.article>


                {/* ==========================================================
                    THREE SMALL PROJECTS
                ============================================================== */}

                {smallProjects.length > 0 && (
                    <div
                        style={{
                            marginTop: "32px",
                            display: "grid",
                            gap: "32px",
                            gridTemplateColumns: "1fr 1fr 1fr",
                        }}
                    >
                        {smallProjects.map((project, index) => {
                            const title = getTitle(project);
                            const category = getCategory(project);
                            const description = getDescription(project);

                            return (
                                <motion.article
                                    key={project.id}
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
                                        amount: 0.1,
                                    }}
                                    transition={{
                                        delay: index * 0.12,
                                        duration: 0.7,
                                    }}
                                    whileHover={{
                                        y: -10,
                                    }}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "28px",
                                        border: "1px solid #ffffff",
                                        background: "#ffffff",
                                        boxShadow: "0 20px 55px rgba(24, 59, 115, 0.10)",
                                    }}
                                    dir={language === "fa" ? "rtl" : "ltr"}
                                >
                                    {/* Accent */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "4px",
                                            zIndex: 10,
                                            background: project.theme_color,
                                        }}
                                    />

                                    {/* Image - RECREATED WITH INLINE CSS */}
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "256px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={title}
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
                                                    size={70}
                                                    style={{
                                                        color: "rgba(255, 255, 255, 0.4)",
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "linear-gradient(to top, rgba(7, 26, 53, 0.8), transparent, transparent)",
                                                pointerEvents: "none",
                                            }}
                                        />

                                        {/* Category */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "20px",
                                                left: "20px",
                                                borderRadius: "9999px",
                                                padding: "6px 12px",
                                                fontSize: "10px",
                                                fontWeight: 900,
                                                letterSpacing: "0.08em",
                                                color: "#ffffff",
                                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                                background: project.theme_color,
                                            }}
                                        >
                                            {category}
                                        </span>

                                        {/* Number */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: "20px",
                                                right: "20px",
                                                fontSize: "48px",
                                                fontWeight: 900,
                                                color: "rgba(255, 255, 255, 0.2)",
                                            }}
                                        >
                                            0{index + 2}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div
                                        style={{
                                            padding: "24px",
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
                                            <div>
                                                <p
                                                    style={{
                                                        marginBottom: "8px",
                                                        fontSize: "10px",
                                                        fontWeight: 700,
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.15em",
                                                        color: "#94a3b8",
                                                    }}
                                                >
                                                    {language === "fa"
                                                        ? `پروژه ${String(index + 2).padStart(2, "0")}`
                                                        : `Project ${String(index + 2).padStart(2, "0")}`}
                                                </p>

                                                <h3
                                                    style={{
                                                        fontSize: "20px",
                                                        fontWeight: 900,
                                                        lineHeight: 1.2,
                                                        color: "#183B73",
                                                    }}
                                                >
                                                    {title}
                                                </h3>
                                            </div>

                                            <Link
                                                href={`/portfolio/${project.slug}`}
                                                aria-label={
                                                    language === "fa"
                                                        ? `مشاهده ${title}`
                                                        : `View ${title}`
                                                }
                                                style={{
                                                    display: "flex",
                                                    height: "40px",
                                                    width: "40px",
                                                    flexShrink: 0,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "50%",
                                                    background: "#f1f5f9",
                                                    color: "#183B73",
                                                    transition: "all 0.3s ease",
                                                    textDecoration: "none",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "#183B73";
                                                    e.currentTarget.style.color = "#ffffff";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "#f1f5f9";
                                                    e.currentTarget.style.color = "#183B73";
                                                }}
                                            >
                                                <ArrowRight size={17} />
                                            </Link>
                                        </div>

                                        {description && (
                                            <p
                                                style={{
                                                    marginTop: "16px",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    fontSize: "14px",
                                                    lineHeight: 1.75,
                                                    color: "#64748b",
                                                }}
                                            >
                                                {description}
                                            </p>
                                        )}

                                        {/* Bottom */}
                                        <div
                                            style={{
                                                marginTop: "20px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                borderTop: "1px solid #f1f5f9",
                                                paddingTop: "16px",
                                            }}
                                        >
                                            {project.client_name ? (
                                                <span
                                                    style={{
                                                        fontSize: "12px",
                                                        fontWeight: 600,
                                                        color: "#64748b",
                                                    }}
                                                >
                                                    {project.client_name}
                                                </span>
                                            ) : (
                                                <span />
                                            )}

                                            {project.completion_date && (
                                                <span
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                        color: "#94a3b8",
                                                    }}
                                                >
                                                    <Calendar size={13} />
                                                    {new Date(
                                                        project.completion_date
                                                    ).toLocaleDateString(
                                                        language === "fa"
                                                            ? "fa-IR"
                                                            : "en-US",
                                                        {
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}


                {/* ==========================================================
                    BOTTOM CTA - ENHANCED WITH CENTER ALIGNMENT
                ============================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 35,
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
                        marginTop: "56px",
                        padding: "48px 32px",
                        borderRadius: "28px",
                        background: "linear-gradient(135deg, #eef8ff 0%, #f8fbff 48%, #edf7ff 100%)",
                        border: "1px solid rgba(70, 166, 217, 0.18)",
                        boxShadow: "0 20px 60px rgba(24, 59, 115, 0.10)",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                    dir={language === "fa" ? "rtl" : "ltr"}
                >
                    {/* Decorative glow effects */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-80px",
                            right: "-60px",
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(70, 166, 217, 0.15) 0%, rgba(70, 166, 217, 0) 70%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "-80px",
                            left: "-60px",
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(24, 59, 115, 0.10) 0%, rgba(24, 59, 115, 0) 70%)",
                            filter: "blur(40px)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Small decorative circles */}
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "40px",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "rgba(70, 166, 217, 0.2)",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "30px",
                            right: "50px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "rgba(70, 166, 217, 0.15)",
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
                                width: "60px",
                                height: "60px",
                                margin: "0 auto 16px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, rgba(70, 166, 217, 0.12) 0%, rgba(70, 166, 217, 0.05) 100%)",
                                border: "1px solid rgba(70, 166, 217, 0.15)",
                            }}
                        >
                            <Sparkles
                                size={28}
                                style={{
                                    color: "#46A6D9",
                                }}
                            />
                        </div>

                        <p
                            style={{
                                fontSize: "0.7rem",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                letterSpacing: "0.18em",
                                color: "#46A6D9",
                                marginBottom: "8px",
                            }}
                        >
                            {language === "fa"
                                ? "نمونه‌کارهای بیشتر"
                                : "More of our work"}
                        </p>

                        <h3
                            style={{
                                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                                fontWeight: 900,
                                color: "#183B73",
                                marginBottom: "4px",
                                lineHeight: 1.2,
                            }}
                        >
                            {language === "fa"
                                ? "تمام پروژه‌های ما را مشاهده کنید"
                                : "Discover all our projects"}
                        </h3>

                        <p
                            style={{
                                fontSize: "0.95rem",
                                color: "#64748b",
                                maxWidth: "500px",
                                margin: "8px auto 24px",
                                lineHeight: 1.6,
                            }}
                        >
                            {language === "fa"
                                ? "مجموعه کامل پروژه‌های ما را در بخش نمونه‌کارها مشاهده کنید"
                                : "Browse our complete collection of projects in the portfolio section"}
                        </p>

                        {/* Button - Enhanced */}
                        <Link
                            href="/portfolio"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                minHeight: "54px",
                                padding: "0 32px",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #46A6D9 0%, #6BBBE3 50%, #8AC9E8 100%)",
                                color: "#ffffff",
                                fontSize: "0.95rem",
                                fontWeight: 800,
                                textDecoration: "none",
                                boxShadow: "0 12px 35px rgba(70, 166, 217, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                transition: "all 0.3s ease",
                                letterSpacing: "0.3px",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                                e.currentTarget.style.boxShadow = "0 20px 45px rgba(70, 166, 217, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
                                e.currentTarget.style.background = "linear-gradient(135deg, #5BBBE3 0%, #7AC9E8 50%, #9AD5EE 100%)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 12px 35px rgba(70, 166, 217, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                                e.currentTarget.style.background = "linear-gradient(135deg, #46A6D9 0%, #6BBBE3 50%, #8AC9E8 100%)";
                            }}
                        >
                            <Sparkles size={18} />

                            {language === "fa"
                                ? "مشاهده نمونه‌کارها"
                                : "Explore Portfolio"}

                            <ArrowRight
                                size={18}
                                style={{
                                    transform: language === "fa" ? "rotate(180deg)" : "none",
                                }}
                            />
                        </Link>
                    </div>
                </motion.div>

            </Container>
        </section>
    );
}