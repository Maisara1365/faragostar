"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Mail,
    ArrowLeft,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    CheckCircle2,
    LockKeyhole,
    Send,
    Crown,
    Star,
    Award,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { useLanguage } from "@/context/language-context";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Generate deterministic particle positions
    |--------------------------------------------------------------------------
    */

    const particles = Array.from({ length: 25 }, (_, i) => {
        const seed = (i * 137.508) % 1;
        const seed2 = (i * 97.31 + 42) % 1;
        const seed3 = (i * 53.7 + 17) % 1;
        const seed4 = (i * 73.1 + 33) % 1;
        const seed5 = (i * 61.3 + 11) % 1;
        
        return {
            size: 2 + (seed * 6),
            opacity: 0.08 + (seed2 * 0.35),
            left: seed3 * 100,
            top: seed4 * 100,
            duration: 10 + (seed5 * 20),
            delay: seed2 * 8,
        };
    });

    /*
    |--------------------------------------------------------------------------
    | Format number with Persian digits
    |--------------------------------------------------------------------------
    */

    const formatNumber = (num: string) => {
        if (language === "fa") {
            const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
            return num.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
        }
        return num;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await forgotPassword({
                email,
                language,
            });

            setSuccess(response.message);

            setTimeout(() => {
                router.push(
                    `/auth/reset-password?email=${encodeURIComponent(email)}`
                );
            }, 1200);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ??
                        t.auth.validation.invalidEmail
                );
            } else {
                setError(t.auth.validation.invalidEmail);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #f1f5f9 100%)",
                overflow: "hidden",
                color: "#0f172a",
            }}
        >
            {/* ============================================================
                HEADER
            ============================================================ */}

            <Header />

            <br />
            <br />
            <br />
            <br />
            <br />

            <main
                style={{
                    position: "relative",
                    minHeight: "calc(100vh - 140px)",
                    paddingBottom: "100px",
                    background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 40%, #f0f8ff 100%)",
                }}
            >
                {/* =====================================================
                    Decorative Background with particles
                ===================================================== */}

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.3,
                        pointerEvents: "none",
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
                            background: "rgba(24,59,115,0.15)",
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
                            background: "rgba(70,166,217,0.15)",
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
                        opacity: 0.04,
                        backgroundImage: "linear-gradient(rgba(24,59,115,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(24,59,115,.2) 1px, transparent 1px)",
                        backgroundSize: "55px 55px",
                        pointerEvents: "none",
                        maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                    }}
                />

                {/* Floating Particles */}
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
                                    background: `rgba(24,59,115,${p.opacity * 0.5})`,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    animation: `floatParticle ${p.duration}s linear infinite`,
                                    animationDelay: `${p.delay}s`,
                                    boxShadow: i % 3 === 0 ? "0 0 10px rgba(24,59,115,0.1)" : "none",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Decorative floating shapes */}
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        left: "5%",
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        border: "1px solid rgba(24,59,115,0.06)",
                        background: "rgba(255,255,255,0.3)",
                        backdropFilter: "blur(10px)",
                        transform: "rotate(20deg)",
                        animation: "floatParticle 12s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: "20%",
                        right: "8%",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px solid rgba(24,59,115,0.05)",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                        animation: "floatParticle 15s ease-in-out infinite reverse",
                        pointerEvents: "none",
                    }}
                />

                {/* =====================================================
                    Main Container
                ===================================================== */}

                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        maxWidth: "1250px",
                        margin: "0 auto",
                        padding: "0 20px",
                    }}
                >
                    {/* Stats - Matching other auth pages */}
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
                            delay: 0.3,
                            duration: 0.7,
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: "20px",
                            marginBottom: "40px",
                            padding: "20px 0",
                            borderBottom: "1px solid rgba(24,59,115,0.06)",
                        }}
                    >
                        {[
                            { 
                                icon: <Crown size={18} />, 
                                number: formatNumber("8+"), 
                                label: language === "fa" ? "سال تجربه" : "Years Experience" 
                            },
                            { 
                                icon: <Award size={18} />, 
                                number: formatNumber("9000+"), 
                                label: language === "fa" ? "پروژه موفق" : "Successful Projects" 
                            },
                            { 
                                icon: <Star size={18} />, 
                                number: formatNumber("99%"), 
                                label: language === "fa" ? "رضایت مشتری" : "Satisfaction" 
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -4, scale: 1.02 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "10px 24px",
                                    borderRadius: "14px",
                                    background: "rgba(255,255,255,0.7)",
                                    border: "1px solid rgba(24,59,115,0.06)",
                                    backdropFilter: "blur(10px)",
                                    transition: "all 0.3s ease",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                                }}
                            >
                                <span style={{ color: "#183B73" }}>{item.icon}</span>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <span style={{ fontSize: "20px", fontWeight: 900, color: "#183B73", lineHeight: 1.2 }}>
                                        {item.number}
                                    </span>
                                    <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
                                        {item.label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* =================================================
                        Main Authentication Card
                    ================================================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 45,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.75,
                            ease: "easeOut",
                        }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                            minHeight: "650px",
                            overflow: "hidden",
                            borderRadius: "38px",
                            border: "1px solid rgba(255,255,255,0.8)",
                            background: "rgba(255,255,255,0.6)",
                            boxShadow: "0 40px 120px rgba(15,23,42,0.16), 0 8px 32px rgba(15,23,42,0.04)",
                            backdropFilter: "blur(30px)",
                            WebkitBackdropFilter: "blur(30px)",
                        }}
                        className="forgot-card"
                    >
                        {/* =================================================
                            LEFT VISUAL PANEL - Gradient (Unchanged)
                        ================================================= */}

                        <div
                            style={{
                                position: "relative",
                                minHeight: "650px",
                                overflow: "hidden",
                                padding: "48px 44px",
                                color: "#ffffff",
                                background: "linear-gradient(145deg, #102c5c 0%, #183B73 30%, #24579D 60%, #3a8ac4 85%, #46A6D9 100%)",
                                boxShadow: "inset -2px 0 40px rgba(0,0,0,0.1)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            className="forgot-visual-panel"
                        >
                            {/* Grid overlay */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0.05,
                                    backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                                    backgroundSize: "45px 45px",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Decorative circles */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 40,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    position: "absolute",
                                    top: "-180px",
                                    right: "-180px",
                                    width: "480px",
                                    height: "480px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    boxShadow: "0 0 60px rgba(255,215,0,0.03)",
                                }}
                            />

                            <motion.div
                                animate={{
                                    rotate: -360,
                                }}
                                transition={{
                                    duration: 50,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: "-220px",
                                    left: "-220px",
                                    width: "520px",
                                    height: "520px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            />

                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "350px",
                                    height: "350px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,215,0,0.06)",
                                    background: "radial-gradient(circle, rgba(255,215,0,0.04), transparent 70%)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,215,0,0.05), transparent 50%)",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Brand */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "10px 20px",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.1)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        backdropFilter: "blur(12px)",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <Sparkles size={15} style={{ color: "#FFD700" }} />
                                    {t.auth.brand}
                                    <span
                                        style={{
                                            width: "4px",
                                            height: "4px",
                                            borderRadius: "50%",
                                            background: "#FFD700",
                                            display: "inline-block",
                                            animation: "pulseDot 2s ease-in-out infinite",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Main Visual */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    marginTop: "20px",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        scale: 0.8,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        delay: 0.25,
                                        duration: 0.7,
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "36px",
                                            background: "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
                                            backdropFilter: "blur(15px)",
                                        }}
                                    >
                                        <LockKeyhole size={60} style={{ color: "#FFD700" }} />
                                    </div>
                                </motion.div>

                                <h2
                                    style={{
                                        fontSize: "clamp(34px, 4vw, 48px)",
                                        lineHeight: 1.15,
                                        fontWeight: 800,
                                        letterSpacing: "-0.03em",
                                        marginBottom: "18px",
                                        textShadow: "0 2px 20px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    {t.auth.forgotPasswordTitle || "Forgot Password"}
                                </h2>

                                <p
                                    style={{
                                        maxWidth: "440px",
                                        fontSize: "17px",
                                        lineHeight: 1.9,
                                        color: "rgba(219,234,254,0.92)",
                                        fontWeight: 400,
                                    }}
                                >
                                    {t.auth.forgotPasswordDescription || "Enter your email to receive a password reset link."}
                                </p>
                            </div>

                            {/* Bottom Information */}
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        padding: "15px 18px",
                                        borderRadius: "16px",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <ShieldCheck size={20} style={{ color: "#FFD700" }} />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        {language === "fa" ? "فرآیند بازیابی امن حساب" : "Secure account recovery"}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        padding: "15px 18px",
                                        borderRadius: "16px",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <CheckCircle2 size={20} style={{ color: "#FFD700" }} />
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        {language === "fa" ? "لینک بازیابی به ایمیل شما ارسال می‌شود" : "Recovery link sent to your email"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            RIGHT FORM PANEL - White
                        ================================================= */}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "50px 48px 60px",
                                background: "#ffffff",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: "inset 2px 0 40px rgba(0,0,0,0.02)",
                            }}
                        >
                            {/* Subtle grid overlay on white panel */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0.02,
                                    backgroundImage: "linear-gradient(rgba(24,59,115,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(24,59,115,.2) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Decorative glow on white panel */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "350px",
                                    height: "350px",
                                    borderRadius: "50%",
                                    bottom: "-180px",
                                    right: "-140px",
                                    background: "rgba(24,59,115,0.03)",
                                    filter: "blur(80px)",
                                    pointerEvents: "none",
                                    animation: "pulseGlow 10s ease-in-out infinite",
                                }}
                            />

                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                    width: "100%",
                                    maxWidth: "520px",
                                }}
                            >
                                {/* Badge - White background */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.2,
                                    }}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "9px",
                                        padding: "8px 18px",
                                        borderRadius: "999px",
                                        background: "rgba(24,59,115,0.08)",
                                        border: "1px solid rgba(24,59,115,0.1)",
                                        color: "#183B73",
                                        fontSize: "12px",
                                        fontWeight: 800,
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    <LockKeyhole size={14} />
                                    {t.auth.forgotPassword || "Forgot Password"}
                                </motion.div>

                                {/* Heading - White background */}
                                <motion.h1
                                    initial={{
                                        opacity: 0,
                                        y: 15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.3,
                                    }}
                                    style={{
                                        marginTop: "18px",
                                        fontSize: "clamp(30px, 4vw, 42px)",
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.035em",
                                        color: "#183B73",
                                        textShadow: "none",
                                    }}
                                >
                                    {t.auth.forgotPasswordTitle || "Forgot Password"}
                                </motion.h1>

                                <motion.p
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    transition={{
                                        delay: 0.4,
                                    }}
                                    style={{
                                        marginTop: "12px",
                                        color: "#64748b",
                                        fontSize: "15px",
                                        lineHeight: 1.8,
                                        fontWeight: 400,
                                    }}
                                >
                                    {t.auth.forgotPasswordDescription || "Enter your email to receive a password reset link."}
                                </motion.p>

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        marginTop: "28px",
                                    }}
                                >
                                    {/* Email */}
                                    <div>
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "8px",
                                                fontSize: "13px",
                                                fontWeight: 700,
                                                color: "#334155",
                                                letterSpacing: "0.3px",
                                            }}
                                        >
                                            {t.auth.email || "Email"}
                                        </label>

                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <Mail
                                                size={20}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "right" : "left"]: "18px",
                                                    color: "#94a3b8",
                                                    pointerEvents: "none",
                                                }}
                                            />

                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={language === "fa" ? "ایمیل خود را وارد کنید" : "Enter your email address"}
                                                required
                                                disabled={loading}
                                                dir="ltr"
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: error
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
                                                    background: "#f8fafc",
                                                    padding: isRTL
                                                        ? "0 55px 0 18px"
                                                        : "0 18px 0 55px",
                                                    fontSize: "15px",
                                                    color: "#0f172a",
                                                    outline: "none",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#183B73";
                                                    e.currentTarget.style.background = "#ffffff";
                                                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(24,59,115,0.06)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = error
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "10px",
                                                marginTop: "14px",
                                                padding: "12px 16px",
                                                borderRadius: "14px",
                                                background: "#fef2f2",
                                                border: "1px solid #fecaca",
                                                color: "#dc2626",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            <span style={{ flexShrink: 0, marginTop: "1px" }}>⚠</span>
                                            <span>{error}</span>
                                        </motion.div>
                                    )}

                                    {/* Success */}
                                    {success && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.97,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "10px",
                                                marginTop: "14px",
                                                padding: "12px 16px",
                                                borderRadius: "14px",
                                                background: "#f0fdf4",
                                                border: "1px solid #bbf7d0",
                                                color: "#16a34a",
                                                fontSize: "13px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: "1px" }} />
                                            <span>{success}</span>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{
                                            y: -3,
                                            scale: 1.01,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "60px",
                                            marginTop: "20px",
                                            border: "none",
                                            borderRadius: "18px",
                                            background: "linear-gradient(135deg, #183B73, #24579D, #46A6D9)",
                                            color: "#ffffff",
                                            fontSize: "16px",
                                            fontWeight: 800,
                                            cursor: loading ? "not-allowed" : "pointer",
                                            opacity: loading ? 0.7 : 1,
                                            boxShadow: "0 8px 32px rgba(24,59,115,0.25)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            letterSpacing: "0.3px",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                        className="hover:shadow-xl"
                                    >
                                        {/* Shimmer effect */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                                                transform: "translateX(-100%)",
                                                animation: "shimmer 3s ease-in-out infinite",
                                            }}
                                        />

                                        {loading ? (
                                            <>
                                                <span style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%",
                                                    border: "2px solid rgba(255,255,255,0.3)",
                                                    borderTopColor: "#ffffff",
                                                    animation: "spin 0.8s linear infinite",
                                                }} />
                                                {t.auth.loading || "Sending..."}
                                            </>
                                        ) : (
                                            <>
                                                <Send size={19} />
                                                {t.auth.sendCode || "Send Reset Link"}
                                                {isRTL ? (
                                                    <ArrowLeft size={19} />
                                                ) : (
                                                    <ArrowRight size={19} />
                                                )}
                                            </>
                                        )}
                                    </motion.button>
                                </form>

                                {/* Back to Login */}
                                <div
                                    style={{
                                        marginTop: "22px",
                                        paddingTop: "14px",
                                        borderTop: "1px solid #f1f5f9",
                                        textAlign: "center",
                                    }}
                                >
                                    <Link
                                        href="/auth/login"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "7px",
                                            color: "#94a3b8",
                                            fontSize: "14px",
                                            textDecoration: "none",
                                            transition: "all 0.3s ease",
                                            borderBottom: "2px solid transparent",
                                            paddingBottom: "2px",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color = "#183B73";
                                            e.currentTarget.style.borderBottomColor = "rgba(24,59,115,0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "#94a3b8";
                                            e.currentTarget.style.borderBottomColor = "transparent";
                                        }}
                                    >
                                        {isRTL ? (
                                            <ArrowRight size={16} />
                                        ) : (
                                            <ArrowLeft size={16} />
                                        )}
                                        {t.auth.backToLogin || "Back to Login"}
                                    </Link>
                                </div>

                                {/* Bottom security note */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginTop: "24px",
                                        color: "#94a3b8",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    <ShieldCheck size={15} />
                                    {language === "fa"
                                        ? "اطلاعات شما به صورت امن محافظت می‌شود"
                                        : "Your information is securely protected"}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />

            {/* ============================================================
                GLOBAL STYLES & ANIMATIONS
            ============================================================ */}

            <style jsx global>{`
                @media (max-width: 1024px) {
                    .forgot-card {
                        grid-template-columns: 1fr !important;
                        max-width: 650px !important;
                        margin: 0 auto !important;
                    }

                    .forgot-visual-panel {
                        display: none !important;
                    }
                }

                @media (max-width: 640px) {
                    .forgot-card {
                        border-radius: 24px !important;
                    }
                }

                @keyframes floatGlow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.1); }
                }

                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
                }

                @keyframes floatParticle {
                    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
                    50% { transform: translateY(-50px) translateX(20px) scale(1.4); opacity: 0.6; }
                    100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(0.6); }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Smooth scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(24, 59, 115, 0.05);
                    border-radius: 999px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #183B73, #46A6D9);
                    border-radius: 999px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #24579D, #58C4F4);
                }

                *:focus-visible {
                    outline: 2px solid #FFD700;
                    outline-offset: 2px;
                }
            `}</style>
        </div>
    );
}