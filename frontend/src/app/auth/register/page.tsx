"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    Loader2,
    Crown,
    Star,
    Award,
} from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { register } from "@/services/auth";
import { useRouter } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

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

    /*
    |--------------------------------------------------------------------------
    | Input Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            newErrors.name =
                `${t.auth.fullName} - ${t.auth.validation.required}`;
        }

        if (!form.email.trim()) {
            newErrors.email =
                `${t.auth.email} - ${t.auth.validation.required}`;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email
            )
        ) {
            newErrors.email =
                t.auth.validation.invalidEmail;
        }

        if (
            form.phone &&
            form.phone.length > 20
        ) {
            newErrors.phone =
                t.auth.validation.phoneMax;
        }

        if (!form.password) {
            newErrors.password =
                `${t.auth.password} - ${t.auth.validation.required}`;
        } else if (form.password.length < 8) {
            newErrors.password =
                t.auth.validation.passwordMin;
        }

        if (
            form.password !==
            form.password_confirmation
        ) {
            newErrors.password_confirmation =
                t.auth.validation.passwordMismatch;
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setErrors({});

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                password_confirmation:
                    form.password_confirmation,
                language,
            });

            if (response.success) {
                router.push(
                    `/auth/verify-email?email=${encodeURIComponent(
                        form.email
                    )}`
                );
            }
        } catch (error: any) {
            if (
                error.response?.status === 422
            ) {
                setErrors(
                    error.response.data.errors
                );
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Error Helper
    |--------------------------------------------------------------------------
    */

    const getError = (
        field: string
    ) => {
        const error = errors[field];

        if (!error) return null;

        return Array.isArray(error)
            ? error[0]
            : error;
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
                    minHeight: "45vh",
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
                            {t.auth.brand || (language === "fa" ? "ثبت نام" : "Sign Up")}
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
                            {t.auth.registerHeroTitle || (language === "fa" ? "ثبت نام" : "Create Account")}

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
                                {language === "fa" ? "به خانواده فراقُستار بپیوندید" : "Join the Faragostar Family"}
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
                            {t.auth.registerHeroDescription || (language === "fa" 
                                ? "با ثبت نام در فراقُستار، به جمع مشتریان حرفه‌ای ما بپیوندید و از خدمات ویژه بهره‌مند شوید."
                                : "Sign up at Faragostar and join our professional clients to benefit from exclusive services.")}
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
                MAIN REGISTER FORM - Right panel changed to white
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
                        className="register-card"
                    >
                        {/* =================================================
                            LEFT VISUAL PANEL - Unchanged (Gradient)
                        ================================================== */}

                        <div
                            style={{
                                position: "relative",
                                minHeight: "750px",
                                overflow: "hidden",
                                padding: "48px 44px",
                                color: "white",
                                background: "linear-gradient(145deg, #102c5c 0%, #183B73 30%, #24579D 60%, #3a8ac4 85%, #46A6D9 100%)",
                                boxShadow: "inset -2px 0 40px rgba(0,0,0,0.1)",
                            }}
                            className="register-visual-panel"
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
                                    marginTop: "110px",
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
                                    <User size={34} style={{ color: "#FFD700" }} />
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
                                    {t.auth.registerHeroTitle || (language === "fa" ? "ثبت نام" : "Create Account")}
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
                                    {t.auth.registerHeroDescription || (language === "fa" 
                                        ? "با ثبت نام در فراقُستار، به جمع مشتریان حرفه‌ای ما بپیوندید و از خدمات ویژه بهره‌مند شوید."
                                        : "Sign up at Faragostar and join our professional clients to benefit from exclusive services.")}
                                </motion.p>

                                {/* Decorative features */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    style={{
                                        display: "flex",
                                        gap: "16px",
                                        marginTop: "30px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {[
                                        { icon: "✓", text: language === "fa" ? "دسترسی به خدمات ویژه" : "Access to premium services" },
                                        { icon: "✓", text: language === "fa" ? "پشتیبانی ۲۴/۷" : "24/7 support" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "6px 14px",
                                                borderRadius: "999px",
                                                background: "rgba(255,255,255,0.06)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                fontSize: "13px",
                                                color: "rgba(255,255,255,0.8)",
                                            }}
                                        >
                                            <span style={{ color: "#FFD700", fontWeight: 900 }}>{item.icon}</span>
                                            {item.text}
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Stats */}
                            <div
                                style={{
                                    position: "absolute",
                                    left: "44px",
                                    right: "44px",
                                    bottom: "44px",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "16px",
                                    zIndex: 2,
                                }}
                            >
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    style={{
                                        padding: "22px",
                                        borderRadius: "22px",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(12px)",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "32px",
                                            fontWeight: 900,
                                            color: "#FFD700",
                                            textShadow: "0 0 30px rgba(255,215,0,0.1)",
                                        }}
                                    >
                                        {formatNumber("8+")}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "13px",
                                            color: "rgba(219,234,254,0.85)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {t.auth.yearsExperience || (language === "fa" ? "سال تجربه" : "Years Experience")}
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    style={{
                                        padding: "22px",
                                        borderRadius: "22px",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        backdropFilter: "blur(12px)",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "32px",
                                            fontWeight: 900,
                                            color: "#FFD700",
                                            textShadow: "0 0 30px rgba(255,215,0,0.1)",
                                        }}
                                    >
                                        {formatNumber("9000+")}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: "4px",
                                            fontSize: "13px",
                                            color: "rgba(219,234,254,0.85)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {t.auth.successfulProjects || (language === "fa" ? "پروژه موفق" : "Successful Projects")}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* =================================================
                            RIGHT FORM PANEL - WHITE Background
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
                                    <Sparkles size={14} />
                                    {t.auth.createAccount || (language === "fa" ? "ایجاد حساب کاربری" : "Create Account")}
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
                                    {t.common.signup || (language === "fa" ? "ثبت نام" : "Sign Up")}
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
                                    {t.auth.registerSubtitle || (language === "fa" 
                                        ? "برای دسترسی به خدمات حرفه‌ای ما، حساب کاربری خود را ایجاد کنید."
                                        : "Create your account to access our professional services.")}
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
                                        ? "اطلاعات شما محافظت و ایمن است"
                                        : "Your information is secure and protected"}
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

                                {/* Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        marginTop: "28px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "16px",
                                    }}
                                >
                                    {/* NAME */}
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
                                            {t.auth.fullName || "Full Name"}
                                        </label>

                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <User
                                                size={18}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "right" : "left"]: "16px",
                                                    color: "#94a3b8",
                                                    pointerEvents: "none",
                                                }}
                                            />

                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder={t.auth.fullNamePlaceholder || "Enter your full name"}
                                                disabled={loading}
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: getError("name")
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
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
                                                    e.currentTarget.style.borderColor = getError("name")
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />
                                        </div>

                                        {getError("name") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ef4444",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {getError("name")}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* EMAIL */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
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
                                                }}
                                            />

                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder={t.auth.emailPlaceholder || "Enter your email"}
                                                disabled={loading}
                                                dir="ltr"
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: getError("email")
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
                                                    background: "#f8fafc",
                                                    color: "#0f172a",
                                                    padding: isRTL
                                                        ? "0 50px 0 20px"
                                                        : "0 20px 0 50px",
                                                    fontSize: "15px",
                                                    outline: "none",
                                                    transition: "all 0.3s ease",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                                                    textAlign: "left",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#183B73";
                                                    e.currentTarget.style.background = "#ffffff";
                                                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(24,59,115,0.06)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = getError("email")
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />
                                        </div>

                                        {getError("email") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ef4444",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {getError("email")}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* PHONE */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
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
                                            {t.auth.phone || "Phone"}
                                        </label>

                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <Phone
                                                size={18}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    [isRTL ? "right" : "left"]: "16px",
                                                    color: "#94a3b8",
                                                    pointerEvents: "none",
                                                }}
                                            />

                                            <input
                                                type="text"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder={t.auth.phonePlaceholder || "Enter your phone number"}
                                                disabled={loading}
                                                dir="ltr"
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: getError("phone")
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
                                                    background: "#f8fafc",
                                                    color: "#0f172a",
                                                    padding: isRTL
                                                        ? "0 50px 0 20px"
                                                        : "0 20px 0 50px",
                                                    fontSize: "15px",
                                                    outline: "none",
                                                    transition: "all 0.3s ease",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                                                    textAlign: "left",
                                                }}
                                                onFocus={(e) => {
                                                    e.currentTarget.style.borderColor = "#183B73";
                                                    e.currentTarget.style.background = "#ffffff";
                                                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(24,59,115,0.06)";
                                                }}
                                                onBlur={(e) => {
                                                    e.currentTarget.style.borderColor = getError("phone")
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />
                                        </div>

                                        {getError("phone") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ef4444",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {getError("phone")}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* PASSWORD */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
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
                                            {t.auth.password || "Password"}
                                        </label>

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
                                                }}
                                            />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={form.password}
                                                onChange={handleChange}
                                                placeholder={t.auth.passwordPlaceholder || "Enter your password"}
                                                disabled={loading}
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: getError("password")
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
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
                                                    e.currentTarget.style.borderColor = getError("password")
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((prev) => !prev)}
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

                                        {getError("password") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ef4444",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {getError("password")}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* CONFIRM PASSWORD */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
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
                                            {t.auth.confirmPassword || "Confirm Password"}
                                        </label>

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
                                                }}
                                            />

                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="password_confirmation"
                                                value={form.password_confirmation}
                                                onChange={handleChange}
                                                placeholder={t.auth.passwordPlaceholder || "Confirm your password"}
                                                disabled={loading}
                                                style={{
                                                    width: "100%",
                                                    height: "56px",
                                                    borderRadius: "16px",
                                                    border: getError("password_confirmation")
                                                        ? "1px solid #ef4444"
                                                        : "1px solid #e2e8f0",
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
                                                    e.currentTarget.style.borderColor = getError("password_confirmation")
                                                        ? "#ef4444"
                                                        : "#e2e8f0";
                                                    e.currentTarget.style.background = "#f8fafc";
                                                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)";
                                                }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
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
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>

                                        {getError("password_confirmation") && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                style={{
                                                    marginTop: "6px",
                                                    color: "#ef4444",
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {getError("password_confirmation")}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    {/* Password strength indicator */}
                                    {form.password && form.password.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                padding: "4px 0",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    flex: 1,
                                                    height: "3px",
                                                    borderRadius: "999px",
                                                    background: "#e2e8f0",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: form.password.length < 4 ? "25%" : form.password.length < 8 ? "50%" : "75%",
                                                        height: "100%",
                                                        borderRadius: "999px",
                                                        background: form.password.length < 4 
                                                            ? "linear-gradient(90deg, #ef4444, #f59e0b)" 
                                                            : form.password.length < 8 
                                                            ? "linear-gradient(90deg, #f59e0b, #eab308)" 
                                                            : "linear-gradient(90deg, #eab308, #22c55e)",
                                                        transition: "all 0.5s ease",
                                                    }}
                                                />
                                            </div>
                                            <span
                                                style={{
                                                    fontSize: "10px",
                                                    color: "#94a3b8",
                                                    fontWeight: 500,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {form.password.length < 4 
                                                    ? language === "fa" ? "ضعیف" : "Weak" 
                                                    : form.password.length < 8 
                                                    ? language === "fa" ? "متوسط" : "Medium" 
                                                    : language === "fa" ? "قوی" : "Strong"}
                                            </span>
                                        </motion.div>
                                    )}

                                    {/* REGISTER BUTTON */}
                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: "100%",
                                            height: "60px",
                                            marginTop: "8px",
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
                                                <Loader2 size={19} style={{
                                                    animation: "spin 0.8s linear infinite",
                                                    color: "#ffffff",
                                                }} />
                                                {t.auth.loading || "Loading..."}
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={19} />
                                                {t.common.signup || "Sign Up"}
                                                {isRTL ? (
                                                    <ArrowLeft size={19} />
                                                ) : (
                                                    <ArrowRight size={19} />
                                                )}
                                            </>
                                        )}
                                    </motion.button>

                                    {/* LOGIN */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        style={{
                                            textAlign: "center",
                                            color: "#64748b",
                                            fontSize: "14px",
                                            marginTop: "8px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {t.auth.alreadyHaveAccount || "Already have an account?"}
                                        <Link
                                            href="/auth/login"
                                            style={{
                                                marginInlineStart: "8px",
                                                color: "#183B73",
                                                fontWeight: 800,
                                                textDecoration: "none",
                                                borderBottom: "2px solid rgba(24,59,115,0.15)",
                                                paddingBottom: "2px",
                                                transition: "all 0.3s ease",
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
                                            {t.common.login || "Login"}
                                        </Link>
                                    </motion.p>
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
                    .register-card {
                        grid-template-columns: 1fr !important;
                        max-width: 650px !important;
                    }

                    .register-visual-panel {
                        display: none !important;
                    }
                }

                @media (max-width: 640px) {
                    .register-card {
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