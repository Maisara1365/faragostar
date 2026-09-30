"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    LogIn,
    CheckCircle2,
    UserPlus,
    Crown,
    Star,
    Award,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/services/auth";
import axios from "axios";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
    const router = useRouter();

    const { t, language } =
        useLanguage();

    const { refreshUser } =
        useAuth();

    const isRTL =
        language === "fa";

    const [isClient, setIsClient] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
        language,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            /*
            |--------------------------------------------------------------------------
            | Login
            |--------------------------------------------------------------------------
            */

            const response =
                await login(form);

            /*
            |--------------------------------------------------------------------------
            | Store authentication token
            |--------------------------------------------------------------------------
            */

            localStorage.setItem(
                "token",
                response.data.token
            );

            /*
            |--------------------------------------------------------------------------
            | IMPORTANT:
            | Immediately reload the authenticated user
            | in AuthContext.
            |--------------------------------------------------------------------------
            */

            await refreshUser();

            /*
            |--------------------------------------------------------------------------
            | Only navigate after AuthContext knows
            | that the user is authenticated.
            |--------------------------------------------------------------------------
            */

            router.push("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ??
                        t.auth.errors.invalidCredentials
                );
            } else {
                setError(
                    t.auth.errors.invalidCredentials
                );
            }
        } finally {
            setLoading(false);
        }
    };

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

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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

            {/* ============================================================
                HERO BANNER - Unchanged
            ============================================================ */}

            <br />
            <br />
            <br />
            <br />
            <br />

            <section
                style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #183B73 0%, #1a4a8a 25%, #24579D 50%, #3a7abd 75%, #46A6D9 100%)",
                    padding: "50px 0 60px",
                    textAlign: "center",
                    color: "#ffffff",
                    minHeight: "40vh",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "inset 0 -2px 60px rgba(0,0,0,0.15)",
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

                    {/* Extra glow rings */}
                    <div
                        style={{
                            position: "absolute",
                            top: "20%",
                            left: "10%",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: "rgba(255,215,0,0.06)",
                            filter: "blur(80px)",
                            animation: "pulseGlow 8s ease-in-out infinite",
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "20%",
                            right: "10%",
                            width: "350px",
                            height: "350px",
                            borderRadius: "50%",
                            background: "rgba(70,166,217,0.1)",
                            filter: "blur(90px)",
                            animation: "floatGlow 12s ease-in-out infinite",
                        }}
                    />
                </div>

                {/* Decorative Grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.08,
                        backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
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
                                    background: `rgba(255,255,255,${p.opacity})`,
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    animation: `floatParticle ${p.duration}s linear infinite`,
                                    animationDelay: `${p.delay}s`,
                                    boxShadow: i % 3 === 0 ? "0 0 10px rgba(255,215,0,0.2)" : "none",
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
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(10px)",
                        transform: "rotate(20deg)",
                        animation: "floatParticle 12s ease-in-out infinite",
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
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(10px)",
                        animation: "floatParticle 15s ease-in-out infinite reverse",
                    }}
                />

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
                                delay: 0.2,
                            }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                borderRadius: "9999px",
                                border: "1px solid rgba(255,255,255,0.25)",
                                background: "rgba(255,255,255,0.12)",
                                padding: "8px 22px",
                                fontSize: "12px",
                                fontWeight: "600",
                                backdropFilter: "blur(12px)",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                                letterSpacing: "0.5px",
                            }}
                        >
                            <Sparkles size={14} style={{ color: "#FFD700" }} />
                            {t.auth.brand || (language === "fa" ? "ورود" : "Sign In")}
                            <span
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#FFD700",
                                    display: "inline-block",
                                    animation: "pulseDot 1.5s ease-in-out infinite",
                                    boxShadow: "0 0 12px rgba(255,215,0,0.4)",
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
                                delay: 0.4,
                                duration: 0.7,
                            }}
                            style={{
                                marginTop: "16px",
                                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: "1.15",
                                textAlign: "center",
                                textShadow: "0 4px 40px rgba(0,0,0,0.15)",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {t.auth.login || (language === "fa" ? "ورود" : "Welcome Back")}

                            <span
                                style={{
                                    display: "block",
                                    background: "linear-gradient(90deg, #ffffff, #FFD700, #b0e0ff, #ffffff)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    backgroundSize: "300% 100%",
                                    animation: "gradientShift 5s ease-in-out infinite",
                                    marginTop: "4px",
                                }}
                            >
                                {language === "fa" ? "به فراگستر خوش آمدید" : "Welcome to Faragostar"}
                            </span>
                        </motion.h1>

                        {/* Decorative line */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                width: "80px",
                                height: "4px",
                                margin: "16px auto",
                                borderRadius: "999px",
                                background: "linear-gradient(90deg, #FFD700, #ffffff, #FFD700)",
                                boxShadow: "0 0 30px rgba(255,215,0,0.3)",
                            }}
                        />

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
                                margin: "12px auto 0",
                                fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)",
                                lineHeight: "1.9",
                                color: "rgba(255,255,255,0.9)",
                                textAlign: "center",
                                textShadow: "0 2px 20px rgba(0,0,0,0.08)",
                                fontWeight: 400,
                            }}
                        >
                            {t.auth.loginDescription || (language === "fa" 
                                ? "به حساب کاربری خود وارد شوید و از خدمات حرفه‌ای فراگستر بهره‌مند شوید."
                                : "Sign in to your account and enjoy Faragostar's professional services.")}
                        </motion.p>

                        {/* Stats */}
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
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "20px",
                                marginTop: "36px",
                                borderTop: "1px solid rgba(255,255,255,0.12)",
                                paddingTop: "28px",
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
                                        background: "rgba(255,255,255,0.07)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        backdropFilter: "blur(10px)",
                                        transition: "all 0.3s ease",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    <span style={{ color: "#FFD700" }}>{item.icon}</span>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <span style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
                                            {item.number}
                                        </span>
                                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                                            {item.label}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
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
                        height: "50px",
                        background: "#f8f9fa",
                        clipPath: "ellipse(75% 50% at 50% 100%)",
                        boxShadow: "0 -4px 30px rgba(0,0,0,0.05)",
                    }}
                />
            </section>

            {/* ============================================================
                LOGIN FORM - Right panel changed to white
            ============================================================ */}

            <section
                style={{
                    position: "relative",
                    padding: "40px 20px 80px",
                    background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 40%, #f0f8ff 100%)",
                }}
            >
                {/* Decorative background glows */}
                <div
                    style={{
                        position: "absolute",
                        left: "-180px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "rgba(70, 166, 217, 0.08)",
                        filter: "blur(140px)",
                        pointerEvents: "none",
                        animation: "floatGlow 15s ease-in-out infinite",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        right: "-180px",
                        top: "30%",
                        width: "450px",
                        height: "450px",
                        borderRadius: "50%",
                        background: "rgba(24, 59, 115, 0.06)",
                        filter: "blur(140px)",
                        pointerEvents: "none",
                        animation: "floatGlow 18s ease-in-out infinite reverse",
                    }}
                />

                <div
                    style={{
                        maxWidth: "1180px",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        style={{
                            width: "100%",
                            maxWidth: "1050px",
                            margin: "0 auto",
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                            overflow: "hidden",
                            borderRadius: "38px",
                            border: "1px solid rgba(255,255,255,0.8)",
                            background: "rgba(255,255,255,0.6)",
                            backdropFilter: "blur(30px)",
                            WebkitBackdropFilter: "blur(30px)",
                            boxShadow: "0 40px 120px rgba(15,23,42,0.16), 0 8px 32px rgba(15,23,42,0.04)",
                            transition: "all 0.5s ease",
                        }}
                        className="login-card"
                    >
                        {/* =================================================
                            LEFT VISUAL PANEL - Unchanged
                        ================================================== */}

                        <div
                            style={{
                                position: "relative",
                                minHeight: "700px",
                                overflow: "hidden",
                                padding: "48px 44px",
                                color: "white",
                                background: "linear-gradient(145deg, #102c5c 0%, #183B73 30%, #24579D 60%, #3a8ac4 85%, #46A6D9 100%)",
                                boxShadow: "inset -2px 0 40px rgba(0,0,0,0.1)",
                            }}
                            className="login-visual-panel"
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
                                    {t.auth.brand || "Faragostar"}
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
                                    marginTop: "120px",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: isRTL ? 30 : -30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        delay: 0.25,
                                        duration: 0.7,
                                    }}
                                    whileHover={{ rotate: 8, scale: 1.05 }}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "24px",
                                        background: "rgba(255,255,255,0.1)",
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        backdropFilter: "blur(12px)",
                                        marginBottom: "30px",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <ShieldCheck size={34} style={{ color: "#FFD700" }} />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    style={{
                                        fontSize: "clamp(42px, 4.5vw, 62px)",
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.035em",
                                        marginBottom: "20px",
                                        textShadow: "0 2px 20px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    {t.auth.login || (language === "fa" ? "ورود" : "Welcome Back")}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    style={{
                                        maxWidth: "480px",
                                        color: "rgba(219,234,254,0.92)",
                                        fontSize: "17px",
                                        lineHeight: 1.9,
                                        fontWeight: 400,
                                    }}
                                >
                                    {t.auth.loginDescription || (language === "fa" 
                                        ? "به حساب کاربری خود وارد شوید و از خدمات حرفه‌ای فراگستر بهره‌مند شوید."
                                        : "Sign in to your account and enjoy Faragostar's professional services.")}
                                </motion.p>

                                {/* Features */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px",
                                        marginTop: "30px",
                                    }}
                                >
                                    {[
                                        { icon: "✓", text: language === "fa" ? "دسترسی امن به حساب" : "Secure account access" },
                                        { icon: "✓", text: language === "fa" ? "تجربه ساده و مطمئن" : "Simple and trusted experience" },
                                        { icon: "✓", text: language === "fa" ? "اطلاعات شما محافظت می‌شود" : "Your information stays protected" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                padding: "6px 14px",
                                                borderRadius: "999px",
                                                background: "rgba(255,255,255,0.06)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                fontSize: "14px",
                                                color: "rgba(255,255,255,0.85)",
                                            }}
                                        >
                                            <span style={{ color: "#FFD700", fontWeight: 900 }}>{item.icon}</span>
                                            {item.text}
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Bottom Decoration */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: "44px",
                                    right: "44px",
                                    bottom: "44px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    zIndex: 2,
                                }}
                            >
                                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.1)" }} />
                                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFD700" }} />
                                <div style={{ height: "1px", width: "60px", background: "rgba(255,255,255,0.1)" }} />
                            </div>
                        </div>

                        {/* =================================================
                            RIGHT FORM PANEL - Changed to White
                        ================================================== */}

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
                                {/* Badge - Updated for white background */}
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
                                    <LogIn size={14} />
                                    {t.auth.login || (language === "fa" ? "ورود" : "Sign In")}
                                </motion.div>

                                {/* Heading - Updated for white background */}
                                <motion.h2
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
                                        fontSize: "clamp(36px, 4.5vw, 48px)",
                                        fontWeight: 900,
                                        lineHeight: 1.08,
                                        letterSpacing: "-0.035em",
                                        color: "#183B73",
                                        textShadow: "none",
                                    }}
                                >
                                    {t.auth.login || (language === "fa" ? "ورود" : "Sign In")}
                                </motion.h2>

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
                                    {t.auth.loginDescription || (language === "fa" 
                                        ? "برای دسترسی به خدمات حرفه‌ای خود وارد شوید."
                                        : "Sign in to access your professional services.")}
                                </motion.p>

                                {/* Security indicator - Updated for white background */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginTop: "18px",
                                        color: "#183B73",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        padding: "10px 16px",
                                        borderRadius: "12px",
                                        background: "rgba(24,59,115,0.06)",
                                        border: "1px solid rgba(24,59,115,0.08)",
                                    }}
                                >
                                    <ShieldCheck size={18} />
                                    {language === "fa"
                                        ? "ورود شما امن و محافظت شده است"
                                        : "Your login is secure and protected"}
                                    <span
                                        style={{
                                            marginLeft: "auto",
                                            fontSize: "10px",
                                            color: "rgba(24,59,115,0.3)",
                                            fontWeight: 400,
                                        }}
                                    >
                                        🔒 SSL
                                    </span>
                                </motion.div>

                                {/* Error - Updated for white background */}
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
                                            marginTop: "18px",
                                            padding: "14px 18px",
                                            borderRadius: "14px",
                                            border: "1px solid #fecaca",
                                            background: "#fef2f2",
                                            color: "#dc2626",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                {/* Form - Updated for white background */}
                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        marginTop: "24px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "18px",
                                    }}
                                >
                                    {/* Email */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "6px",
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
                                                size={18}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "right" : "left"]: "16px",
                                                    color: "#94a3b8",
                                                    pointerEvents: "none",
                                                    transition: "color 0.3s ease",
                                                }}
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="example@email.com"
                                                required
                                                dir="ltr"
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: "1px solid #e2e8f0",
                                                    background: "#f8fafc",
                                                    color: "#0f172a",
                                                    padding: isRTL
                                                        ? "0 50px 0 20px"
                                                        : "0 20px 0 50px",
                                                    fontSize: "15px",
                                                    outline: "none",
                                                    transition: "all 0.3s ease",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#183B73";
                                                    e.currentTarget.style.background = "#ffffff";
                                                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(24,59,115,0.06)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Password */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginBottom: "6px",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    fontSize: "13px",
                                                    fontWeight: 700,
                                                    color: "#334155",
                                                    letterSpacing: "0.3px",
                                                }}
                                            >
                                                {t.auth.password || "Password"}
                                            </label>

                                            <Link
                                                href="/auth/forgot-password"
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                    color: "#183B73",
                                                    textDecoration: "none",
                                                    transition: "all 0.3s ease",
                                                    borderBottom: "2px solid rgba(24,59,115,0.15)",
                                                    paddingBottom: "2px",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = "#24579D";
                                                    e.currentTarget.style.borderBottomColor = "#183B73";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = "#183B73";
                                                    e.currentTarget.style.borderBottomColor = "rgba(24,59,115,0.15)";
                                                }}
                                            >
                                                {t.auth.forgotPassword || "Forgot Password?"}
                                            </Link>
                                        </div>

                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <Lock
                                                size={18}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "right" : "left"]: "16px",
                                                    color: "#94a3b8",
                                                    pointerEvents: "none",
                                                    transition: "color 0.3s ease",
                                                }}
                                            />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                required
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: "1px solid #e2e8f0",
                                                    background: "#f8fafc",
                                                    color: "#0f172a",
                                                    padding: isRTL
                                                        ? "0 50px 0 48px"
                                                        : "0 48px 0 50px",
                                                    fontSize: "15px",
                                                    outline: "none",
                                                    transition: "all 0.3s ease",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#183B73";
                                                    e.currentTarget.style.background = "#ffffff";
                                                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(24,59,115,0.06)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "left" : "right"]: "14px",
                                                    border: "none",
                                                    background: "transparent",
                                                    color: "#94a3b8",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "4px",
                                                    borderRadius: "8px",
                                                    transition: "all 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = "#183B73";
                                                    e.currentTarget.style.background = "rgba(24,59,115,0.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = "#94a3b8";
                                                    e.currentTarget.style.background = "transparent";
                                                }}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </motion.div>

                                    {/* Remember Me - Updated for white background */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                color: "#64748b",
                                                transition: "color 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "#334155";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "#64748b";
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                checked={form.remember}
                                                onChange={handleChange}
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                    borderRadius: "6px",
                                                    border: "2px solid #cbd5e1",
                                                    accentColor: "#183B73",
                                                    cursor: "pointer",
                                                }}
                                            />
                                            <span>{t.auth.rememberMe || "Remember me"}</span>
                                        </label>
                                    </motion.div>

                                    {/* Login Button - Updated for white background */}
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
                                            marginTop: "4px",
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
                                                {t.auth.loading || "Loading..."}
                                            </>
                                        ) : (
                                            <>
                                                <LogIn size={19} />
                                                {t.auth.login || "Sign In"}
                                                <ArrowRight
                                                    size={19}
                                                    style={{
                                                        transform: isRTL ? "rotate(180deg)" : "none",
                                                    }}
                                                />
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Register - Updated for white background */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        style={{
                                            marginTop: "4px",
                                            paddingTop: "16px",
                                            borderTop: "1px solid #f1f5f9",
                                            textAlign: "center",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {t.auth.dontHaveAccount || "Don't have an account?"}
                                            <Link
                                                href="/auth/register"
                                                style={{
                                                    marginInlineStart: "8px",
                                                    color: "#183B73",
                                                    fontWeight: 800,
                                                    textDecoration: "none",
                                                    borderBottom: "2px solid rgba(24,59,115,0.15)",
                                                    paddingBottom: "2px",
                                                    transition: "all 0.3s ease",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.borderBottomColor = "#183B73";
                                                    e.currentTarget.style.color = "#24579D";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.borderBottomColor = "rgba(24,59,115,0.15)";
                                                    e.currentTarget.style.color = "#183B73";
                                                }}
                                            >
                                                <UserPlus size={16} />
                                                {t.common.signup || "Sign Up"}
                                            </Link>
                                        </p>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ============================================================
                FOOTER
            ============================================================ */}

            <Footer />

            {/* ============================================================
                GLOBAL STYLES & ANIMATIONS
            ============================================================ */}

            <style jsx global>{`
                @media (max-width: 1024px) {
                    .login-card {
                        grid-template-columns: 1fr !important;
                        max-width: 650px !important;
                    }

                    .login-visual-panel {
                        display: none !important;
                    }
                }

                @media (max-width: 640px) {
                    .login-card {
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