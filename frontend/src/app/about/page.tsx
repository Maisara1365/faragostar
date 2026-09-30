"use client";

import { useMemo, useState, useEffect } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import {
    ArrowRight,
    Award,
    BriefcaseBusiness,
    Eye,
    Facebook,
    Globe2,
    Instagram,
    Linkedin,
    Sparkles,
    Target,
    Users,
    Crown,
    Star,
    TrendingUp,
} from "lucide-react";

import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useLanguage } from "@/context/language-context";
import { useTeamMembers } from "@/hooks/use-team-members";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/*
|--------------------------------------------------------------------------
| About Page
|--------------------------------------------------------------------------
*/

export default function AboutPage() {
    const { t, language } = useLanguage();

    // FIX 1: Pass the language parameter to useTeamMembers
    const {
        teamMembers,
        loading,
    } = useTeamMembers(language);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Localized Team Members
    |--------------------------------------------------------------------------
    */

    const localizedMembers = useMemo(() => {
        return [...teamMembers]
            .sort(
                (a, b) =>
                    a.display_order -
                    b.display_order
            )
            .map((member) => ({
                ...member,

                name:
                    language === "fa"
                        ? member.name_fa
                        : member.name_en,

                designation:
                    language === "fa"
                        ? member.designation_fa
                        : member.designation_en,

                bio:
                    language === "fa"
                        ? member.bio_fa
                        : member.bio_en,
            }));
    }, [teamMembers, language]);

    /*
    |--------------------------------------------------------------------------
    | Founder
    |--------------------------------------------------------------------------
    */

    const founder = useMemo(() => {
        return (
            localizedMembers.find(
                (member) =>
                    member.display_order === 1
            ) ??
            localizedMembers[0] ??
            null
        );
    }, [localizedMembers]);

    /*
    |--------------------------------------------------------------------------
    | Other Team Members
    |--------------------------------------------------------------------------
    */

    const team = useMemo(() => {
        return localizedMembers.filter(
            (member) =>
                member.id !== founder?.id
        );
    }, [
        localizedMembers,
        founder,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Generate deterministic particle positions
    |--------------------------------------------------------------------------
    */

    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => {
            const seed = (i * 137.508) % 1;
            const seed2 = (i * 97.31 + 42) % 1;
            const seed3 = (i * 53.7 + 17) % 1;
            const seed4 = (i * 73.1 + 33) % 1;
            const seed5 = (i * 61.3 + 11) % 1;
            
            return {
                size: 2 + (seed * 4),
                opacity: 0.1 + (seed2 * 0.3),
                left: seed3 * 100,
                top: seed4 * 100,
                duration: 10 + (seed5 * 15),
                delay: seed2 * 5,
            };
        });
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Services Data with Emoji Icons
    |--------------------------------------------------------------------------
    */

    const services = [
        {
            icon: "💻",
            label: language === "fa" ? "توسعه وب" : "Web Development",
            color: "from-[#183B73] to-[#24579D]",
        },
        {
            icon: "🎨",
            label: language === "fa" ? "طراحی لوگو" : "Logo Design",
            color: "from-[#46A6D9] to-[#58C4F4]",
        },
        {
            icon: "✏️",
            label: language === "fa" ? "طراحی گرافیک" : "Graphic Design",
            color: "from-[#24579D] to-[#46A6D9]",
        },
        {
            icon: "🎬",
            label: language === "fa" ? "موشن گرافیک" : "Motion Graphic",
            color: "from-[#183B73] to-[#46A6D9]",
        },
        {
            icon: "📹",
            label: language === "fa" ? "تبلیغات ویدیویی" : "Video Advertisement",
            color: "from-[#24579D] to-[#58C4F4]",
        },
        {
            icon: "🖨️",
            label: language === "fa" ? "خدمات چاپ" : "Printing Services",
            color: "from-[#183B73] to-[#58C4F4]",
        },
        {
            icon: "📊",
            label: language === "fa" ? "بازاریابی دیجیتال" : "Digital Marketing",
            color: "from-[#46A6D9] to-[#24579D]",
        },
    ];

    return (
        <>
            <Header />

            <main className="overflow-hidden">

                {/* ======================================================
                    HERO - With Company Logo Integration
                ====================================================== */}

                {/* Top Spacer */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <section
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                        padding: "40px 0",
                        textAlign: "center",
                        color: "#ffffff",
                        minHeight: "75vh",
                        display: "flex",
                        alignItems: "center",
                    }}
                >

                    {/* Background Effects */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.3,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: "-128px",
                                top: "-128px",
                                width: "500px",
                                height: "500px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.15)",
                                filter: "blur(120px)",
                                animation: "floatGlow 8s ease-in-out infinite",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                bottom: "-160px",
                                right: "-80px",
                                width: "600px",
                                height: "600px",
                                borderRadius: "50%",
                                background: "rgba(135, 206, 250, 0.2)",
                                filter: "blur(140px)",
                                animation: "floatGlow 10s ease-in-out infinite reverse",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "800px",
                                height: "800px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.05)",
                                filter: "blur(100px)",
                                animation: "pulseGlow 6s ease-in-out infinite",
                            }}
                        />
                    </div>

                    {/* Decorative Grid */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            opacity: 0.06,
                            backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                            backgroundSize: "55px 55px",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Floating Particles - Only render on client */}
                    {isClient && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                pointerEvents: "none",
                                overflow: "hidden",
                            }}
                        >
                            {particles.map((p, i) => (
                                <div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        width: `${p.size}px`,
                                        height: `${p.size}px`,
                                        borderRadius: "50%",
                                        background: `rgba(255,255,255,${p.opacity})`,
                                        left: `${p.left}%`,
                                        top: `${p.top}%`,
                                        animation: `floatParticle ${p.duration}s linear infinite`,
                                        animationDelay: `${p.delay}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <div
                        style={{
                            position: "relative",
                            zIndex: 10,
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 20px",
                            width: "100%",
                        }}
                    >

                        <div
                            style={{
                                maxWidth: "900px",
                                margin: "0 auto",
                                textAlign: "center",
                            }}
                        >

                            {/* Company Logo - Container size 280px, Image zoomed in */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                }}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        padding: "30px",
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(20px)",
                                        border: "2px solid rgba(255,255,255,0.2)",
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                                        transition: "all 0.5s ease",
                                        animation: "logoPulse 3s ease-in-out infinite",
                                        width: "280px",
                                        height: "280px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="hover:scale-110 hover:shadow-2xl"
                                >
                                    {/* Glow Ring */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "-16px",
                                            borderRadius: "50%",
                                            background: "conic-gradient(from 0deg, transparent, rgba(70,166,217,0.3), transparent, rgba(255,255,255,0.2), transparent)",
                                            animation: "spinGlow 8s linear infinite",
                                            filter: "blur(14px)",
                                        }}
                                    />

                                    {/* Outer Ring */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "-10px",
                                            borderRadius: "50%",
                                            border: "2px solid rgba(255,255,255,0.1)",
                                            background: "transparent",
                                        }}
                                    />

                                    {/* Logo Container - Using img tag */}
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "210px",
                                            height: "210px",
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                            background: "rgba(255,255,255,0.05)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "3px solid rgba(255,255,255,0.15)",
                                            boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <img
                                            src="/images/company/logo.png"
                                            alt={language === "fa" ? "لوگوی شرکت فراقُستار" : "Faragostar Company Logo"}
                                            style={{
                                                objectFit: "contain",
                                                filter: "brightness(1.1) drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                                                transition: "transform 0.5s ease",
                                                width: "260px",
                                                height: "260px",
                                            }}
                                            className="hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />

                                        {/* Logo Overlay Shine */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                                                pointerEvents: "none",
                                            }}
                                        />
                                    </div>

                                    {/* Decorative Dots - Only render on client */}
                                    {isClient && (
                                        <>
                                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        position: "absolute",
                                                        width: "12px",
                                                        height: "12px",
                                                        borderRadius: "50%",
                                                        background: `rgba(255,255,255,${0.3 + (i * 0.05)})`,
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: `rotate(${angle}deg) translateX(-120px)`,
                                                        animation: `orbitDot ${4 + i * 0.5}s ease-in-out infinite`,
                                                        animationDelay: `${i * 0.3}s`,
                                                        boxShadow: "0 0 15px rgba(70,166,217,0.3)",
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </motion.div>

                            {/* Badge */}
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
                                    duration: 0.6,
                                    delay: 0.4,
                                }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "9999px",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    background: "rgba(255,255,255,0.1)",
                                    padding: "6px 18px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    backdropFilter: "blur(8px)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                }}
                            >
                                <Sparkles size={13} style={{ color: "#FFD700" }} />
                                {t.about.badge || (language === "fa" ? "درباره ما" : "About Us")}
                                <span
                                    style={{
                                        width: "5px",
                                        height: "5px",
                                        borderRadius: "50%",
                                        background: "#FFD700",
                                        display: "inline-block",
                                        animation: "pulseDot 1.5s ease-in-out infinite",
                                    }}
                                />
                            </motion.div>

                            {/* Main Heading */}
                            <motion.h1
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.5,
                                    duration: 0.7,
                                }}
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(2rem, 5vw, 4rem)",
                                    fontWeight: 900,
                                    lineHeight: "1.2",
                                    textAlign: "center",
                                    textShadow: "0 4px 30px rgba(0,0,0,0.15)",
                                }}
                            >
                                {t.about.heading?.line1 || (language === "fa" ? "درباره ما" : "About Us")}

                                <span
                                    style={{
                                        display: "block",
                                        background: "linear-gradient(90deg, #ffffff, #FFD700, #b0e0ff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        backgroundSize: "200% 100%",
                                        animation: "gradientShift 4s ease-in-out infinite",
                                    }}
                                >
                                    {t.about.heading?.line2 || (language === "fa" ? "ما داستان شما را" : "We Tell Your Story")}
                                </span>

                                <span
                                    style={{
                                        display: "block",
                                        background: "linear-gradient(90deg, #FFD700, #ffffff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        backgroundSize: "200% 100%",
                                        animation: "gradientShift 4s ease-in-out infinite reverse",
                                    }}
                                >
                                    {t.about.heading?.line3 || (language === "fa" ? "با طراحی و نوآوری روایت می‌کنیم" : "Through Design & Innovation")}
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.6,
                                    duration: 0.7,
                                }}
                                style={{
                                    maxWidth: "750px",
                                    margin: "10px auto 0",
                                    fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)",
                                    lineHeight: "1.8",
                                    color: "rgba(255,255,255,0.85)",
                                    textAlign: "center",
                                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                {t.about.description || (language === "fa" 
                                    ? "شرکت فراقُستار با سال‌ها تجربه در زمینه طراحی و تولید محتوا، آماده ارائه خدمات حرفه‌ای به شماست" 
                                    : "Faragostar Company, with years of experience in design and content production, is ready to provide professional services to you.")}
                            </motion.p>

                            {/* Buttons */}
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
                                    delay: 0.7,
                                    duration: 0.7,
                                }}
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "12px",
                                }}
                            >
                                <Button
                                    size="lg"
                                    asChild
                                    style={{
                                        background: "linear-gradient(135deg, #FFD700, #FFA500)",
                                        color: "#183B73",
                                        fontWeight: 700,
                                        boxShadow: "0 8px 30px rgba(255,215,0,0.3)",
                                        transition: "all 0.3s ease",
                                        border: "none",
                                    }}
                                    className="hover:scale-105 hover:shadow-2xl"
                                >
                                    <Link href="/contact">
                                        {t.about.startProject || (language === "fa" ? "شروع پروژه" : "Start a Project")}

                                        <ArrowRight
                                            style={{
                                                marginLeft: "8px",
                                                height: "18px",
                                                width: "18px",
                                            }}
                                        />
                                    </Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    style={{
                                        borderColor: "rgba(255,255,255,0.4)",
                                        background: "rgba(255,255,255,0.1)",
                                        color: "#ffffff",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s ease",
                                        fontWeight: 600,
                                    }}
                                    className="hover:bg-white hover:text-[#183B73] hover:scale-105 hover:border-white"
                                >
                                    <Link href="/services">
                                        {t.about.exploreServices || (language === "fa" ? "مشاهده خدمات" : "Explore Services")}
                                    </Link>
                                </Button>
                            </motion.div>

                            {/* Trust Indicators - Updated with Persian support */}
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
                                    delay: 0.8,
                                    duration: 0.7,
                                }}
                                style={{
                                    marginTop: "28px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "28px",
                                    borderTop: "1px solid rgba(255,255,255,0.1)",
                                    paddingTop: "20px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            background: "rgba(255,215,0,0.2)",
                                            border: "1px solid rgba(255,215,0,0.3)",
                                        }}
                                    >
                                        <Award size={18} style={{ color: "#FFD700" }} />
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>8+ {language === "fa" ? "سال" : "Years"}</div>
                                        <div style={{ fontSize: "11px", opacity: 0.7 }}>{language === "fa" ? "تجربه" : "Experience"}</div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            background: "rgba(70,166,217,0.2)",
                                            border: "1px solid rgba(70,166,217,0.3)",
                                        }}
                                    >
                                        <Users size={18} style={{ color: "#46A6D9" }} />
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>{language === "fa" ? "۹۰۰۰+" : "9000+"}</div>
                                        <div style={{ fontSize: "11px", opacity: 0.7 }}>{language === "fa" ? "پروژه انجام شده" : "Projects Done"}</div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.1)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                        }}
                                    >
                                        <Star size={18} style={{ color: "#FFD700" }} />
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>{language === "fa" ? "۹۹٪" : "99%"}</div>
                                        <div style={{ fontSize: "11px", opacity: 0.7 }}>{language === "fa" ? "رضایت مشتری" : "Satisfaction"}</div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>

                    {/* Bottom Wave */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-1px",
                            left: 0,
                            right: 0,
                            height: "40px",
                            background: "#f8f9fa",
                            clipPath: "ellipse(70% 55% at 50% 100%)",
                        }}
                    />

                </section>




                {/* ======================================================
                    SERVICES - With Emoji Icons
                ====================================================== */}

                <section
                    style={{
                        padding: "50px 0",
                        position: "relative",
                        background: "#ffffff",
                    }}
                >

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
                            opacity: 0.5,
                        }}
                    />

                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 20px",
                            position: "relative",
                            zIndex: 10,
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
                            transition={{
                                duration: 0.7,
                            }}
                            style={{
                                maxWidth: "750px",
                                margin: "0 auto 32px",
                                textAlign: "center",
                            }}
                        >

                            <Badge
                                style={{
                                    border: "none",
                                    background: "rgba(24, 59, 115, 0.08)",
                                    padding: "5px 14px",
                                    color: "#183B73",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                }}
                            >
                                {t.about.expertise || (language === "fa" ? "تخصص‌های ما" : "Our Expertise")}
                            </Badge>

                            <h2
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                    fontWeight: 900,
                                    color: "#183B73",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.expertise || (language === "fa" ? "خدمات حرفه‌ای ما" : "Our Professional Services")}
                            </h2>

                            <p
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                                    lineHeight: "1.8",
                                    color: "#64748b",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.description || (language === "fa" 
                                    ? "شرکت فراقُستار با سال‌ها تجربه در زمینه طراحی و تولید محتوا، آماده ارائه خدمات حرفه‌ای به شماست" 
                                    : "Faragostar Company, with years of experience in design and content production, is ready to provide professional services to you.")}
                            </p>

                        </motion.div>


                        <div
                            style={{
                                display: "flex",
                                gap: "18px",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                maxWidth: "1100px",
                                margin: "0 auto",
                            }}
                        >

                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="group"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    whileHover={{ y: -8 }}
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "22px",
                                        border: "1px solid #e2e8f0",
                                        background: "#ffffff",
                                        padding: "24px",
                                        flex: "0 1 240px",
                                        width: "240px",
                                        minHeight: "170px",
                                        textAlign: "center",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                                        transition: "all 0.5s ease",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = "0 20px 60px rgba(24,59,115,0.15)";
                                        e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.3)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                                        e.currentTarget.style.borderColor = "#e2e8f0";
                                    }}
                                >

                                    <div
                                        style={{
                                            position: "absolute",
                                            right: "-64px",
                                            top: "-64px",
                                            width: "160px",
                                            height: "160px",
                                            borderRadius: "50%",
                                            background: "rgba(70, 166, 217, 0.1)",
                                            filter: "blur(60px)",
                                            transition: "transform 0.7s ease",
                                        }}
                                        className="group-hover:scale-150"
                                    />

                                    <div
                                        style={{
                                            position: "relative",
                                            zIndex: 10,
                                        }}
                                    >

                                        <div
                                            style={{
                                                marginBottom: "16px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "50px",
                                                width: "50px",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                borderRadius: "12px",
                                                background: `linear-gradient(135deg, ${service.color})`,
                                                color: "#ffffff",
                                                boxShadow: "0 8px 25px rgba(24,59,115,0.2)",
                                                transition: "all 0.3s ease",
                                                fontSize: "26px",
                                            }}
                                            className="group-hover:scale-110 group-hover:rotate-6"
                                        >
                                            {service.icon}
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 700,
                                                lineHeight: "1.4",
                                                color: "#183B73",
                                                textAlign: "center",
                                                transition: "color 0.3s ease",
                                            }}
                                            className="group-hover:text-[#46A6D9]"
                                        >
                                            {service.label}
                                        </h3>

                                        <div
                                            style={{
                                                marginTop: "10px",
                                                height: "3px",
                                                width: "36px",
                                                borderRadius: "9999px",
                                                background: `linear-gradient(90deg, ${service.color})`,
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                transition: "width 0.3s ease",
                                            }}
                                            className="group-hover:w-14"
                                        />

                                    </div>

                                </motion.div>
                            ))}

                        </div>

                    </div>

                </section>


                {/* ======================================================
                    VISION & MISSION - With Emoji Icons
                ====================================================== */}

                <section
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        background: "#f8f9fa",
                        padding: "50px 0",
                    }}
                >

                    <div
                        style={{
                            position: "absolute",
                            left: "-160px",
                            top: "80px",
                            width: "384px",
                            height: "384px",
                            borderRadius: "50%",
                            background: "rgba(70, 166, 217, 0.1)",
                            filter: "blur(120px)",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            right: "-160px",
                            bottom: "80px",
                            width: "384px",
                            height: "384px",
                            borderRadius: "50%",
                            background: "rgba(24, 59, 115, 0.1)",
                            filter: "blur(120px)",
                        }}
                    />

                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 20px",
                            position: "relative",
                            zIndex: 10,
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
                            transition={{
                                duration: 0.7,
                            }}
                            style={{
                                maxWidth: "750px",
                                margin: "0 auto 32px",
                                textAlign: "center",
                            }}




           >

                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.25em",
                                    color: "#46A6D9",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.mission || (language === "fa" ? "ماموریت ما" : "Our Mission")}
                            </span>

                            <h2
                                style={{
                                    marginTop: "10px",
                                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                    fontWeight: 900,
                                    color: "#183B73",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.mission || (language === "fa" ? "ماموریت ما" : "Our Mission")}
                            </h2>

                            <p
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                                    lineHeight: "1.8",
                                    color: "#64748b",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.missionText || (language === "fa" 
                                    ? "ارائه خدمات با کیفیت بالا و خلاقانه به مشتریان خود و کمک به رشد کسب‌وکارشان از طریق راه‌حل‌های نوآورانه و متناسب با نیازهای هر مشتری." 
                                    : "To deliver high-quality and creative services to our clients and help their businesses grow through innovative solutions tailored to each client's needs.")}
                            </p>

                        </motion.div>


                        <div
                            style={{
                                display: "grid",
                                gap: "24px",
                                gridTemplateColumns: "1fr 1fr",
                                maxWidth: "900px",
                                margin: "0 auto",
                            }}
                        >

                            {/* Vision - with emoji icon */}
                            <InfoCard
                                icon="👁️"
                                title={language === "fa" ? "چشم‌انداز" : "Vision"}
                                description={t.about.company || (language === "fa" 
                                    ? "شرکت فراقُستار یک آژانس خلاق و نوآور است که در زمینه طراحی گرافیک، تولید ویدیو، توسعه وب و بازاریابی دیجیتال فعالیت می‌کند." 
                                    : "Faragostar is a creative and innovative agency specializing in graphic design, video production, web development, and digital marketing.")}
                                delay={0}
                                gradient="from-[#183B73] to-[#24579D]"
                            />

                            {/* Mission - with emoji icon */}
                            <InfoCard
                                icon="🎯"
                                title={t.about.mission || (language === "fa" ? "ماموریت ما" : "Our Mission")}
                                description={t.about.missionText || (language === "fa" 
                                    ? "ارائه خدمات با کیفیت بالا و خلاقانه به مشتریان خود و کمک به رشد کسب‌وکارشان از طریق راه‌حل‌های نوآورانه و متناسب با نیازهای هر مشتری." 
                                    : "To deliver high-quality and creative services to our clients and help their businesses grow through innovative solutions tailored to each client's needs.")}
                                delay={0.12}
                                gradient="from-[#46A6D9] to-[#58C4F4]"
                            />

                        </div>

                    </div>

                </section>


                {/* ======================================================
                    FOUNDER SPOTLIGHT
                ====================================================== */}

                {founder && (
                    <section
                        style={{
                            position: "relative",
                            overflow: "hidden",
                            background: "#f8f9fa",
                            padding: "50px 0",
                        }}
                    >

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(135deg, rgba(24,59,115,0.05) 0%, rgba(70,166,217,0.1) 100%)",
                            }}
                        />

                        <div
                            style={{
                                maxWidth: "1200px",
                                margin: "0 auto",
                                padding: "0 20px",
                                position: "relative",
                                zIndex: 10,
                            }}
                        >

                            <div
                                style={{
                                    maxWidth: "1000px",
                                    margin: "0 auto",
                                }}
                            >

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                    style={{
                                        textAlign: "center",
                                        marginBottom: "32px",
                                    }}
                                >

                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "700",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.25em",
                                            color: "#46A6D9",
                                            display: "block",
                                            textAlign: "center",
                                        }}
                                    >
                                        {t.team.founderSpotlight || (language === "fa" ? "بنیان‌گذار مجموعه" : "Founder Spotlight")}
                                    </span>

                                    <h2
                                        style={{
                                            marginTop: "10px",
                                            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                            fontWeight: 900,
                                            color: "#183B73",
                                            textAlign: "center",
                                        }}
                                    >
                                        {t.team.founderSpotlight || (language === "fa" ? "بنیان‌گذار مجموعه" : "Founder Spotlight")}
                                    </h2>

                                </motion.div>


                                <div
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        borderRadius: "36px",
                                        border: "1px solid #ffffff",
                                        background: "rgba(255,255,255,0.75)",
                                        padding: "40px",
                                        boxShadow: "0 30px 100px rgba(24,59,115,0.13)",
                                        backdropFilter: "blur(20px)",
                                        textAlign: "center",
                                    }}
                                >

                                    <div
                                        style={{
                                            position: "absolute",
                                            right: "-128px",
                                            top: "-128px",
                                            width: "384px",
                                            height: "384px",
                                            borderRadius: "50%",
                                            background: "rgba(70, 166, 217, 0.15)",
                                            filter: "blur(120px)",
                                        }}
                                    />

                                    <div
                                        style={{
                                            position: "relative",
                                            display: "grid",
                                            alignItems: "center",
                                            gap: "32px",
                                            gridTemplateColumns: "1fr",
                                            maxWidth: "700px",
                                            margin: "0 auto",
                                        }}
                                    >

                                        {/* Founder Portrait */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >

                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                style={{
                                                    position: "relative",
                                                    height: "260px",
                                                    width: "260px",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        inset: "-20px",
                                                        borderRadius: "50%",
                                                        background: "rgba(70, 166, 217, 0.15)",
                                                        filter: "blur(30px)",
                                                    }}
                                                />

                                                <div
                                                    style={{
                                                        position: "relative",
                                                        height: "100%",
                                                        width: "100%",
                                                        borderRadius: "50%",
                                                        background: "linear-gradient(135deg, #183B73, #24579D, #46A6D9)",
                                                        padding: "6px",
                                                        boxShadow: "0 20px 60px rgba(24,59,115,0.25)",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            position: "relative",
                                                            height: "100%",
                                                            width: "100%",
                                                            overflow: "hidden",
                                                            borderRadius: "50%",
                                                            background: "#f1f5f9",
                                                        }}
                                                    >

                                                        {founder.image ? (
                                                            <img
                                                                src={founder.image}
                                                                alt={founder.name}
                                                                style={{
                                                                    objectFit: "cover",
                                                                    transition: "transform 0.7s ease",
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }}
                                                                className="hover:scale-110"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display = 'none';
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
                                                                    background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                                                }}
                                                            >
                                                                <Users size={70} style={{ color: "rgba(255,255,255,0.6)" }} />
                                                            </div>
                                                        )}

                                                    </div>

                                                </div>

                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        bottom: "4px",
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                        whiteSpace: "nowrap",
                                                        borderRadius: "9999px",
                                                        background: "#183B73",
                                                        padding: "8px 20px",
                                                        fontSize: "10px",
                                                        fontWeight: 700,
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.05em",
                                                        color: "#ffffff",
                                                        boxShadow: "0 10px 30px rgba(24,59,115,0.3)",
                                                    }}
                                                >
                                                    {t.team.founder || (language === "fa" ? "بنیان‌گذار" : "Founder")}
                                                </div>

                                            </motion.div>

                                        </motion.div>


                                        {/* Founder Content */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, delay: 0.2 }}
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    borderRadius: "9999px",
                                                    background: "rgba(70, 166, 217, 0.1)",
                                                    padding: "4px 12px",
                                                    fontSize: "10px",
                                                    fontWeight: "600",
                                                    color: "#46A6D9",
                                                }}
                                            >
                                                <Crown size={12} />
                                                {language === "fa" ? "مدیریت" : "Leadership"}
                                            </div>

                                            <h3
                                                style={{
                                                    marginTop: "10px",
                                                    fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
                                                    fontWeight: 900,
                                                    lineHeight: "1.2",
                                                    color: "#183B73",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {founder.name}
                                            </h3>

                                            <p
                                                style={{
                                                    marginTop: "6px",
                                                    fontSize: "clamp(0.95rem, 1vw, 1.05rem)",
                                                    fontWeight: 700,
                                                    color: "#46A6D9",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {founder.designation}
                                            </p>

                                            {founder.bio && (
                                                <p
                                                    style={{
                                                        marginTop: "16px",
                                                        fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
                                                        lineHeight: "1.8",
                                                        color: "#475569",
                                                        textAlign: "center",
                                                        maxWidth: "600px",
                                                        marginLeft: "auto",
                                                        marginRight: "auto",
                                                    }}
                                                >
                                                    {founder.bio}
                                                </p>
                                            )}

                                            <div
                                                style={{
                                                    marginTop: "24px",
                                                    display: "grid",
                                                    gap: "12px",
                                                    gridTemplateColumns: "repeat(3, 1fr)",
                                                    maxWidth: "600px",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                }}
                                            >

                                                <StatCard
                                                    icon={<Award />}
                                                    title={language === "fa" ? "سال تجربه" : "Years Experience"}
                                                    text="8+"
                                                    color="#183B73"
                                                />

                                                <StatCard
                                                    icon={<BriefcaseBusiness />}
                                                    title={language === "fa" ? "پروژه انجام شده" : "Projects Done"}
                                                    text="200+"
                                                    color="#46A6D9"
                                                />

                                                <StatCard
                                                    icon={<Star />}
                                                    title={language === "fa" ? "کیفیت" : "Quality"}
                                                    text={language === "fa" ? "۱۰۰٪ رضایت" : "100% Satisfaction"}
                                                    color="#24579D"
                                                />

                                            </div>

                                            <div style={{ marginTop: "20px" }}>

                                                <Button asChild size="lg">
                                                    <Link href="/contact">
                                                        {t.team.contactFounder || (language === "fa" ? "تماس با بنیان‌گذار" : "Contact Founder")}
                                                        <ArrowRight style={{ marginLeft: "8px", height: "18px", width: "18px" }} />
                                                    </Link>
                                                </Button>

                                            </div>

                                        </motion.div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                )}


                {/* ======================================================
                    TEAM
                ====================================================== */}

                <section
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        padding: "50px 0",
                        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f0f8ff 100%)",
                    }}
                >

                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "absolute",
                            left: "-160px",
                            top: 0,
                            width: "450px",
                            height: "450px",
                            borderRadius: "50%",
                            background: "rgba(70, 166, 217, 0.15)",
                            filter: "blur(150px)",
                        }}
                    />

                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 20px",
                            position: "relative",
                            zIndex: 10,
                        }}
                    >

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            style={{
                                maxWidth: "750px",
                                margin: "0 auto 32px",
                                textAlign: "center",
                            }}
                        >

                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    borderRadius: "9999px",
                                    background: "rgba(24, 59, 115, 0.08)",
                                    padding: "5px 14px",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: "#183B73",
                                }}
                            >
                                <Users size={13} />
                                {t.team.badge || (language === "fa" ? "تیم ما" : "Our Team")}
                            </div>

                            <h2
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                    fontWeight: 900,
                                    color: "#183B73",
                                    textAlign: "center",
                                }}
                            >
                                {t.team.title || (language === "fa" ? "با تیم خلاق ما آشنا شوید" : "Meet Our Creative Team")}
                            </h2>

                            <p
                                style={{
                                    marginTop: "12px",
                                    fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                                    lineHeight: "1.8",
                                    color: "#64748b",
                                    textAlign: "center",
                                }}
                            >
                                {t.team.description || (language === "fa" 
                                    ? "افراد با استعدادی که پشت موفقیت ما هستند. ما تیمی از طراحان، توسعه‌دهندگان و متفکران خلاق هستیم." 
                                    : "The talented people behind our success. We are a team of passionate designers, developers, and creative thinkers.")}
                            </p>

                        </motion.div>


                        {/* Loading */}
                        {loading && (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "20px",
                                }}
                            >
                                {[1, 2, 3, 4].map((item) => (
                                    <TeamSkeleton key={item} />
                                ))}
                            </div>
                        )}


                        {/* Team */}
                        {!loading && team.length > 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "stretch",
                                    justifyContent: "center",
                                    gap: "20px",
                                }}
                            >

                                {team.map((member, index) => (
                                    <motion.article
                                        key={member.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.65, delay: index * 0.08 }}
                                        whileHover={{ y: -10 }}
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                            maxWidth: "300px",
                                            overflow: "hidden",
                                            borderRadius: "28px",
                                            border: "1px solid rgba(255,255,255,0.7)",
                                            background: "rgba(255,255,255,0.8)",
                                            padding: "24px",
                                            textAlign: "center",
                                            boxShadow: "0 20px 70px rgba(24,59,115,0.10)",
                                            backdropFilter: "blur(20px)",
                                            transition: "all 0.5s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = "0 30px 90px rgba(24,59,115,0.18)";
                                            e.currentTarget.style.borderColor = "rgba(70, 166, 217, 0.3)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = "0 20px 70px rgba(24,59,115,0.10)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                                        }}
                                    >

                                        {/* FIX 2: Change insetX to inset (valid CSS property) */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: "0 0 auto 0",
                                                height: "5px",
                                                background: "linear-gradient(90deg, #183B73, #24579D, #46A6D9)",
                                            }}
                                        />

                                        <div
                                            style={{
                                                position: "absolute",
                                                right: "-96px",
                                                top: "-96px",
                                                width: "224px",
                                                height: "224px",
                                                borderRadius: "50%",
                                                background: "rgba(70, 166, 217, 0.15)",
                                                filter: "blur(90px)",
                                                transition: "transform 0.7s ease",
                                            }}
                                            className="group-hover:scale-150"
                                        />

                                        {/* Portrait */}
                                        <div
                                            style={{
                                                position: "relative",
                                                margin: "0 auto",
                                                height: "160px",
                                                width: "160px",
                                            }}
                                        >

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: "50%",
                                                    background: "linear-gradient(135deg, #183B73, #24579D, #46A6D9)",
                                                    padding: "5px",
                                                    boxShadow: "0 10px 30px rgba(24,59,115,0.2)",
                                                    transition: "all 0.5s ease",
                                                }}
                                                className="group-hover:shadow-2xl"
                                            >

                                                <div
                                                    style={{
                                                        position: "relative",
                                                        height: "100%",
                                                        width: "100%",
                                                        overflow: "hidden",
                                                        borderRadius: "50%",
                                                        background: "#f1f5f9",
                                                    }}
                                                >

                                                    {member.image ? (
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            style={{
                                                                objectFit: "cover",
                                                                transition: "transform 0.7s ease",
                                                                width: "100%",
                                                                height: "100%",
                                                            }}
                                                            className="group-hover:scale-110"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
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
                                                                background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                                            }}
                                                        >
                                                            <Users size={45} style={{ color: "rgba(255,255,255,0.6)" }} />
                                                        </div>
                                                    )}

                                                </div>

                                            </div>

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "4px",
                                                    right: "10px",
                                                    height: "16px",
                                                    width: "16px",
                                                    borderRadius: "50%",
                                                    border: "4px solid #ffffff",
                                                    background: "#46A6D9",
                                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                                }}
                                            />

                                        </div>


                                        {/* Info */}
                                        <div
                                            style={{
                                                position: "relative",
                                                marginTop: "16px",
                                            }}
                                        >

                                            <h3
                                                style={{
                                                    fontSize: "1.15rem",
                                                    fontWeight: 900,
                                                    color: "#183B73",
                                                    textAlign: "center",
                                                    transition: "color 0.3s ease",
                                                }}
                                                className="group-hover:text-[#46A6D9]"
                                            >
                                                {member.name}
                                            </h3>

                                            <p
                                                style={{
                                                    marginTop: "4px",
                                                    fontSize: "12px",
                                                    fontWeight: 700,
                                                    lineHeight: "1.5",
                                                    color: "#46A6D9",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {member.designation}
                                            </p>

                                            {member.bio && (
                                                <p
                                                    style={{
                                                        marginTop: "12px",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 4,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        minHeight: "85px",
                                                        fontSize: "12px",
                                                        lineHeight: "1.7",
                                                        color: "#64748b",
                                                        textAlign: "center",
                                                        transition: "color 0.3s ease",
                                                    }}
                                                    className="group-hover:text-[#475569]"
                                                >
                                                    {member.bio}
                                                </p>
                                            )}

                                        </div>


                                        {/* Social */}
                                        <div
                                            style={{
                                                position: "relative",
                                                marginTop: "16px",
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "8px",
                                            }}
                                        >

                                            {member.facebook && (
                                                <SocialLink
                                                    href={member.facebook}
                                                    label="Facebook"
                                                    style={{
                                                        background: "#183B73",
                                                        color: "#ffffff",
                                                    }}
                                                    className="hover:bg-[#24579D]"
                                                >
                                                    <Facebook size={14} />
                                                </SocialLink>
                                            )}

                                            {member.instagram && (
                                                <SocialLink
                                                    href={member.instagram}
                                                    label="Instagram"
                                                    style={{
                                                        background: "#46A6D9",
                                                        color: "#ffffff",
                                                    }}
                                                    className="hover:bg-[#24579D]"
                                                >
                                                    <Instagram size={14} />
                                                </SocialLink>
                                            )}

                                            {member.linkedin && (
                                                <SocialLink
                                                    href={member.linkedin}
                                                    label="LinkedIn"
                                                    style={{
                                                        background: "#24579D",
                                                        color: "#ffffff",
                                                    }}
                                                    className="hover:bg-[#183B73]"
                                                >
                                                    <Linkedin size={14} />
                                                </SocialLink>
                                            )}

                                        </div>

                                    </motion.article>
                                ))}

                            </div>
                        )}


                        {/* Empty */}
                        {!loading && team.length === 0 && (
                            <div
                                style={{
                                    borderRadius: "30px",
                                    border: "2px dashed #cbd5e1",
                                    background: "rgba(255,255,255,0.6)",
                                    padding: "40px 32px",
                                    textAlign: "center",
                                }}
                            >
                                <Users style={{ margin: "0 auto", height: "40px", width: "40px", color: "#46A6D9" }} />
                                <p style={{ marginTop: "12px", color: "#64748b" }}>
                                    {t.team.empty || (language === "fa" ? "اعضای تیم به زودی اضافه خواهند شد." : "No team members found.")}
                                </p>
                            </div>
                        )}

                    </div>

                </section>


                {/* ======================================================
                    CTA
                ====================================================== */}

                <section
                    style={{
                        position: "relative",
                        overflow: "hidden",
                        padding: "50px 0",
                        background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                    }}
                >

                    <div
                        style={{
                            position: "absolute",
                            left: "-128px",
                            top: "-128px",
                            width: "384px",
                            height: "384px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            filter: "blur(120px)",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "-128px",
                            right: "-128px",
                            width: "384px",
                            height: "384px",
                            borderRadius: "50%",
                            background: "rgba(135, 206, 250, 0.2)",
                            filter: "blur(120px)",
                        }}
                    />

                    <div
                        style={{
                            maxWidth: "1200px",
                            margin: "0 auto",
                            padding: "0 20px",
                            position: "relative",
                            zIndex: 10,
                        }}
                    >

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{
                                maxWidth: "900px",
                                margin: "0 auto",
                                textAlign: "center",
                                color: "#ffffff",
                            }}
                        >


                            <div
                                style={{
                                    margin: "0 auto 20px",
                                    display: "flex",
                                    height: "64px",
                                    width: "64px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    background: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(8px)",
                                    transition: "all 0.3s ease",
                                }}
                                className="hover:bg-white/20"
                            >
                                <TrendingUp style={{ height: "28px", width: "28px" }} />
                            </div>

                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.25em",
                                    color: "rgba(255,255,255,0.7)",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.badge || (language === "fa" ? "درباره ما" : "About Us")}
                            </span>

                            <h2
                                style={{
                                    marginTop: "10px",
                                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                                    fontWeight: 900,
                                    color: "#ffffff",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.ctaTitle || (language === "fa" 
                                    ? "آماده شروع یک پروژه حرفه‌ای هستید؟" 
                                    : "Ready to Build Something Amazing?")}
                            </h2>

                            <p
                                style={{
                                    maxWidth: "750px",
                                    margin: "12px auto 0",
                                    fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                                    lineHeight: "1.8",
                                    color: "rgba(255,255,255,0.8)",
                                    textAlign: "center",
                                }}
                            >
                                {t.about.ctaDescription || (language === "fa" 
                                    ? "اگر به طراحی وب‌سایت، برندینگ، موشن گرافیک، تولید ویدئو یا بازاریابی دیجیتال نیاز دارید، تیم خلاق ما آماده است تا ایده‌های شما را با بالاترین کیفیت به واقعیت تبدیل کند." 
                                    : "Whether you need a professional website, branding, motion graphics, video production, or digital marketing, our creative team is ready to turn your ideas into reality with premium quality.")}
                            </p>

                            <div
                                style={{
                                    marginTop: "24px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "12px",
                                }}
                            >

                                <Button
                                    size="lg"
                                    asChild
                                    style={{
                                        background: "#ffffff",
                                        color: "#183B73",
                                        transition: "all 0.3s ease",
                                    }}
                                    className="hover:bg-white/90 hover:scale-105"
                                >
                                    <Link href="/contact">
                                        {t.about.startProject || (language === "fa" ? "شروع پروژه" : "Start a Project")}
                                        <ArrowRight style={{ marginLeft: "8px", height: "18px", width: "18px" }} />
                                    </Link>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    asChild
                                    style={{
                                        borderColor: "rgba(255,255,255,0.3)",
                                        background: "rgba(255,255,255,0.1)",
                                        color: "#ffffff",
                                        transition: "all 0.3s ease",
                                    }}
                                    className="hover:bg-white hover:text-[#183B73] hover:scale-105"
                                >
                                    <Link href="/services">
                                        {t.about.exploreServices || (language === "fa" ? "مشاهده خدمات" : "Explore Services")}
                                    </Link>
                                </Button>

                            </div>

                        </motion.div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}


/*
|--------------------------------------------------------------------------
| Vision / Mission Card - With Emoji Icon Support
|--------------------------------------------------------------------------
*/

function InfoCard({
    icon,
    title,
    description,
    delay,
    gradient,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
    gradient: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay }}
            whileHover={{ y: -8 }}
            style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "28px",
                border: "1px solid #ffffff",
                background: "rgba(255,255,255,0.8)",
                padding: "28px",
                boxShadow: "0 20px 70px rgba(24,59,115,0.08)",
                backdropFilter: "blur(20px)",
                transition: "all 0.5s ease",
                textAlign: "center",
            }}
            className="hover:shadow-[0_30px_90px_rgba(24,59,115,0.15)]"
        >

            <div
                style={{
                    position: "absolute",
                    right: "-80px",
                    top: "-80px",
                    width: "224px",
                    height: "224px",
                    borderRadius: "50%",
                    background: "rgba(70, 166, 217, 0.1)",
                    filter: "blur(80px)",
                    transition: "transform 0.7s ease",
                }}
                className="group-hover:scale-150"
            />

            {/* FIX 2: Change insetX to inset (valid CSS property) */}
            <div
                style={{
                    position: "absolute",
                    inset: "0 0 auto 0",
                    height: "5px",
                    background: `linear-gradient(90deg, ${gradient})`,
                    transform: "scaleX(0)",
                    transition: "transform 0.5s ease",
                }}
                className="group-hover:scale-x-100"
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                }}
            >

                <div
                    style={{
                        marginBottom: "20px",
                        display: "flex",
                        height: "50px",
                        width: "50px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "12px",
                        background: `linear-gradient(135deg, ${gradient})`,
                        color: "#ffffff",
                        boxShadow: "0 8px 25px rgba(24,59,115,0.2)",
                        transition: "all 0.3s ease",
                        fontSize: "26px",
                    }}
                    className="group-hover:scale-110 group-hover:rotate-6"
                >
                    {typeof icon === 'string' ? icon : icon}
                </div>

                <h3
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: 900,
                        color: "#183B73",
                        textAlign: "center",
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        marginTop: "12px",
                        fontSize: "0.9rem",
                        lineHeight: "1.8",
                        color: "#64748b",
                        textAlign: "center",
                    }}
                >
                    {description}
                </p>

            </div>

        </motion.div>
    );
}


/*
|--------------------------------------------------------------------------
| Founder Stat
|--------------------------------------------------------------------------
*/

function StatCard({
    icon,
    title,
    text,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
    color: string;
}) {
    return (
        <div
            style={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "rgba(255,255,255,0.8)",
                padding: "14px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                transition: "all 0.3s ease",
                textAlign: "center",
            }}
            className="hover:shadow-md hover:border-[${color}]/30 hover:scale-105"
        >

            <div
                style={{
                    marginBottom: "8px",
                    display: "flex",
                    height: "36px",
                    width: "36px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    background: `${color}15`,
                    color: color,
                    transition: "all 0.3s ease",
                }}
            >
                {icon}
            </div>

            <h4
                style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#183B73",
                    textAlign: "center",
                }}
            >
                {title}
            </h4>

            <p
                style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    lineHeight: "1.5",
                    color: "#64748b",
                    textAlign: "center",
                }}
            >
                {text}
            </p>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Social Link
|--------------------------------------------------------------------------
*/

function SocialLink({
    href,
    label,
    children,
    style,
    className,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}) {
    return (
        <motion.div
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                    display: "flex",
                    height: "32px",
                    width: "32px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    color: "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    ...style,
                }}
                className={className}
            >
                {children}
            </Link>
        </motion.div>
    );
}


/*
|--------------------------------------------------------------------------
| Team Loading Skeleton
|--------------------------------------------------------------------------
*/

function TeamSkeleton() {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "28px",
                border: "1px solid #ffffff",
                background: "rgba(255,255,255,0.8)",
                padding: "24px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
        >

            <div
                style={{
                    margin: "0 auto",
                    height: "160px",
                    width: "160px",
                    borderRadius: "50%",
                    background: "#e2e8f0",
                    animation: "pulse 1.5s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    margin: "16px auto 0",
                    height: "18px",
                    width: "120px",
                    borderRadius: "4px",
                    background: "#e2e8f0",
                    animation: "pulse 1.5s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    margin: "6px auto 0",
                    height: "12px",
                    width: "90px",
                    borderRadius: "4px",
                    background: "#e2e8f0",
                    animation: "pulse 1.5s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    margin: "12px auto 0",
                    height: "12px",
                    width: "100%",
                    borderRadius: "4px",
                    background: "#e2e8f0",
                    animation: "pulse 1.5s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    margin: "6px auto 0",
                    height: "12px",
                    width: "80%",
                    borderRadius: "4px",
                    background: "#e2e8f0",
                    animation: "pulse 1.5s ease-in-out infinite",
                }}
            />

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 0.3; }
                }
            `}</style>

        </div>
    );
}