"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { motion } from "framer-motion";

import {
    ArrowUpRight,
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Send,
    Sparkles,
    Loader2,
    User,
    FileText,
    CheckCircle2,
    Globe2,
    Clock3,
} from "lucide-react";

import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { company } from "@/config/company";
import { useLanguage } from "@/context/language-context";
import LocationMap from "@/components/contact/LocationMap";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Service {
    id: number;
    title: string;
}

export default function Contact() {
    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const [services, setServices] = useState<Service[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        service: "",
        message: "",
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Generate deterministic particle positions - Matching About Page
    |--------------------------------------------------------------------------
    */

    const particles = Array.from({ length: 20 }, (_, i) => {
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

    /*
    |--------------------------------------------------------------------------
    | Load Services
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadServices() {
            try {
                const response = await fetch(`${API_URL}/services`, {
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Unable to load services");
                }

                const json = await response.json();

                setServices(json.data ?? []);
            } catch (error) {
                console.error("Services loading error:", error);
            } finally {
                setLoadingServices(false);
            }
        }

        loadServices();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Form Handlers
    |--------------------------------------------------------------------------
    */

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (isSuccess) {
            setIsSuccess(false);
        }
    };

    // FIX: Update handler to accept string | null
    const handleServiceChange = (value: string | null) => {
        setForm((prev) => ({
            ...prev,
            service: value ?? "", // Convert null to empty string
        }));

        if (isSuccess) {
            setIsSuccess(false);
        }
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

        setLoading(true);
        setIsSuccess(false);

        try {
            const { data } = await api.post("/contact", form);

            toast.success(
                data.message || t.contact.successMessage
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                service: "",
                message: "",
            });

            setIsSuccess(true);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                const errors = Object.values(
                    error.response.data.errors
                ).flat();

                toast.error(errors[0] as string);
            } else {
                toast.error(
                    error.response?.data?.message ||
                    t.contact.errorMessage
                );
            }
        } finally {
            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Phone & WhatsApp & Address
    |--------------------------------------------------------------------------
    */

    const phones = language === "fa"
        ? company.phone
        : company.phone_en;

    const addresses = language === "fa"
        ? company.address
        : company.address_en;

    const whatsappNumber = phones?.[1]
        ? phones[1].replace(/[^\d]/g, "")
        : "";

    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

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
                background:
                    "linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #f1f5f9 100%)",
                overflow: "hidden",
                color: "#0f172a",
            }}
        >
            {/* ============================================================
                HEADER
            ============================================================ */}

            <Header />

            {/* ============================================================
                HERO BANNER - Matching About Page Style
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
                    background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                    padding: "40px 0",
                    textAlign: "center",
                    color: "#ffffff",
                    minHeight: "50vh",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* Background Effects - Same as About Page */}
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

                {/* Decorative Grid - Same as About Page */}
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

                {/* Floating Particles - Same as About Page */}
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
                            {t.contact.badge || (language === "fa" ? "تماس با ما" : "Contact Us")}
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

                        {/* Main Heading - Centered */}
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
                                marginTop: "12px",
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                fontWeight: 900,
                                lineHeight: "1.2",
                                textAlign: "center",
                                textShadow: "0 4px 30px rgba(0,0,0,0.15)",
                            }}
                        >
                            {t.contact.title || (language === "fa" ? "ارتباط با ما" : "Get In Touch")}

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
                                {language === "fa" ? "ما اینجا هستیم تا به شما کمک کنیم" : "We're Here to Help You"}
                            </span>
                        </motion.h1>

                        {/* Description - Centered */}
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
                                delay: 0.5,
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
                            {t.contact.description || (language === "fa" 
                                ? "برای مشاوره، همکاری یا هر سوالی که دارید، با ما در تماس باشید. تیم ما آماده پاسخگویی به شماست."
                                : "For consultation, collaboration, or any questions you have, feel free to reach out. Our team is ready to assist you.")}
                        </motion.p>

                        {/* Hero mini stats - With updated colors */}
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
                                delay: 0.6,
                                duration: 0.7,
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginTop: "32px",
                                borderTop: "1px solid rgba(255,255,255,0.1)",
                                paddingTop: "24px",
                            }}
                        >
                            {[
                                {
                                    icon: <MessageCircle size={16} />,
                                    text: language === "fa" ? "پاسخ سریع" : "Quick Response",
                                },
                                {
                                    icon: <Globe2 size={16} />,
                                    text: language === "fa" ? "خدمات حرفه‌ای" : "Professional Service",
                                },
                                {
                                    icon: <Clock3 size={16} />,
                                    text: language === "fa" ? "همیشه آماده" : "Always Available",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "10px 18px",
                                        borderRadius: "12px",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "rgba(255,255,255,0.85)",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#FFD700" }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Wave - Same as About Page */}
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

            {/* ============================================================
                CONTACT INFORMATION CARDS
            ============================================================ */}

            <section
                style={{
                    position: "relative",
                    marginTop: "-25px",
                    zIndex: 5,
                    paddingBottom: "80px",
                }}
            >
                <Container>
                    <div
                        style={{
                            maxWidth: "1180px",
                            margin: "0 auto",
                            padding: "0 24px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "20px",
                            }}
                        >
                            {/* Phone */}
                            <ContactCard
                                icon={<Phone size={25} />}
                                iconColor="#183B73"
                                title={t.contact.phone || "Phone"}
                                value={phones?.[0]}
                                href={`tel:${phones?.[1] || phones?.[0] || ""}`}
                                description={
                                    language === "fa"
                                        ? "برای مشاوره با ما تماس بگیرید"
                                        : "Call us for a consultation"
                                }
                                rtl={isRTL}
                            />

                            {/* Email */}
                            <ContactCard
                                icon={<Mail size={25} />}
                                iconColor="#24579D"
                                title={t.contact.email || "Email"}
                                value={company.supportEmail}
                                href={`mailto:${company.supportEmail}`}
                                description={language === "fa" ? "پیام خود را برای ما ارسال کنید" : "Send us your message"}
                                rtl={isRTL}
                            />

                            {/* WhatsApp */}
                            <ContactCard
                                icon={<MessageCircle size={25} />}
                                iconColor="#46A6D9"
                                title={t.contact.whatsapp || "WhatsApp"}
                                value={phones?.[1]}
                                href={whatsappUrl}
                                description={
                                    language === "fa"
                                        ? "در واتساپ با ما گفتگو کنید"
                                        : "Chat with us on WhatsApp"
                                }
                                rtl={isRTL}
                                external
                            />
                        </div>
                    </div>
                </Container>
            </section>

            {/* ============================================================
                MAIN CONTACT AREA - Quick Contact with Gradient
            ============================================================ */}

            <section
                style={{
                    padding: "30px 0 80px", // Reduced bottom padding from 120px to 80px
                    position: "relative",
                }}
            >
                <Container>
                    <div
                        style={{
                            maxWidth: "1180px",
                            margin: "0 auto",
                            padding: "0 24px",
                            display: "grid",
                            gridTemplateColumns: "minmax(280px, .75fr) minmax(400px, 1.35fr)",
                            gap: "30px",
                            alignItems: "stretch",
                        }}
                        className="contact-main-grid"
                    >
                        {/* ==================================================
                            LEFT PANEL - Matching About Page gradient
                        ================================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: isRTL ? 50 : -50,
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
                                minHeight: "650px",
                                borderRadius: "30px",
                                padding: "45px 38px",
                                background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                                boxShadow: "0 30px 80px rgba(24,59,115,0.25)",
                                color: "#ffffff",
                            }}
                        >
                            {/* Grid overlay on left panel */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0.06,
                                    backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Glow effects */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "350px",
                                    height: "350px",
                                    borderRadius: "50%",
                                    top: "-180px",
                                    right: "-140px",
                                    background: "rgba(255,255,255,0.15)",
                                    filter: "blur(70px)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "50%",
                                    bottom: "-160px",
                                    left: "-130px",
                                    background: "rgba(255,215,0,0.1)",
                                    filter: "blur(70px)",
                                }}
                            />

                            {/* Decorative rings */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "40px",
                                    right: "35px",
                                    width: "110px",
                                    height: "110px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    top: "55px",
                                    right: "50px",
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            />

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
                                        gap: "8px",
                                        padding: "9px 14px",
                                        borderRadius: "999px",
                                        background: "rgba(255,255,255,0.1)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "#FFD700",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                    }}
                                >
                                    <Sparkles size={14} />
                                    {t.contact.formBadge || (language === "fa" ? "ارسال پیام" : "Send Message")}
                                </div>

                                <h2
                                    style={{
                                        marginTop: "28px",
                                        fontSize: "clamp(32px, 4vw, 48px)",
                                        lineHeight: 1.12,
                                        fontWeight: 900,
                                        letterSpacing: "-0.03em",
                                    }}
                                >
                                    {t.contact.formTitle || (language === "fa" ? "با ما در ارتباط باشید" : "Get In Touch With Us")}
                                </h2>

                                <p
                                    style={{
                                        marginTop: "20px",
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: "15px",
                                        lineHeight: 1.9,
                                    }}
                                >
                                    {t.contact.formSubtitle || (language === "fa" 
                                        ? "برای دریافت مشاوره رایگان و اطلاعات بیشتر فرم زیر را پر کنید." 
                                        : "Fill out the form below for a free consultation and more information.")}
                                </p>

                                {/* Information list */}
                                <div
                                    style={{
                                        marginTop: "55px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "24px",
                                    }}
                                >
                                    <InfoRow
                                        icon={<Mail size={20} />}
                                        label={t.contact.email || "Email"}
                                        value={company.supportEmail}
                                    />

                                    <InfoRow
                                        icon={<Phone size={20} />}
                                        label={t.contact.phone || "Phone"}
                                        value={phones?.[0]}
                                    />

                                    <InfoRow
                                        icon={<MapPin size={20} />}
                                        label={language === "fa" ? "آدرس" : "Location"}
                                        value={addresses?.[0]}
                                    />
                                </div>

                                {/* Decorative bottom message */}
                                <div
                                    style={{
                                        marginTop: "55px",
                                        padding: "20px",
                                        borderRadius: "20px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            color: "#FFD700",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        <CheckCircle2 size={17} />
                                        {language === "fa" 
                                            ? "ما آماده شنیدن ایده شما هستیم" 
                                            : "We are ready to hear your idea"}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ==================================================
                            FORM - With gradient background
                        ================================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: isRTL ? -50 : 50,
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
                                borderRadius: "30px",
                                padding: "42px",
                                background: "linear-gradient(135deg, #183B73 0%, #24579D 50%, #46A6D9 100%)",
                                boxShadow: "0 30px 80px rgba(24,59,115,0.25)",
                                color: "#ffffff",
                                overflow: "hidden",
                            }}
                        >
                            {/* Grid overlay on form */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0.04,
                                    backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                                    backgroundSize: "40px 40px",
                                    pointerEvents: "none",
                                }}
                            />

                            {/* Glow effects */}
                            <div
                                style={{
                                    position: "absolute",
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "50%",
                                    bottom: "-150px",
                                    right: "-120px",
                                    background: "rgba(255,215,0,0.08)",
                                    filter: "blur(60px)",
                                }}
                            />

                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                {/* Form top decoration */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "20px",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                width: "55px",
                                                height: "4px",
                                                borderRadius: "99px",
                                                marginBottom: "18px",
                                                background: "linear-gradient(90deg, #FFD700, #ffffff)",
                                            }}
                                        />

                                        <h3
                                            style={{
                                                fontSize: "28px",
                                                fontWeight: 900,
                                                color: "#ffffff",
                                            }}
                                        >
                                            {t.contact.formTitle || (language === "fa" ? "ارسال پیام" : "Send Message")}
                                        </h3>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "16px",
                                            background: "rgba(255,255,255,0.1)",
                                            color: "#FFD700",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    >
                                        <Send size={21} />
                                    </div>
                                </div>

                                {/* Success */}
                                {isSuccess && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -15,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        style={{
                                            display: "flex",
                                            gap: "14px",
                                            padding: "18px",
                                            marginBottom: "25px",
                                            borderRadius: "18px",
                                            background: "rgba(255,255,255,0.12)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        <CheckCircle2
                                            size={24}
                                            style={{
                                                flexShrink: 0,
                                                color: "#FFD700",
                                            }}
                                        />

                                        <div>
                                            <h4
                                                style={{
                                                    color: "#ffffff",
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {t.contact.successTitle || (language === "fa" ? "ارسال موفق!" : "Sent Successfully!")}
                                            </h4>

                                            <p
                                                style={{
                                                    marginTop: "4px",
                                                    color: "rgba(255,255,255,0.7)",
                                                    fontSize: "13px",
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {t.contact.successDescription || (language === "fa" 
                                                    ? "از اعتماد شما سپاسگزاریم. به زودی با شما تماس خواهیم گرفت." 
                                                    : "Thank you for your trust. We will get back to you soon.")}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "18px",
                                    }}
                                >
                                    {/* Name + Email */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                                            gap: "18px",
                                        }}
                                        className="contact-form-grid"
                                    >
                                        <StyledField
                                            icon={<User size={19} />}
                                            name="name"
                                            placeholder={t.contact.name || "Full Name"}
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={loading}
                                            rtl={isRTL}
                                        />

                                        <StyledField
                                            icon={<Mail size={19} />}
                                            type="email"
                                            name="email"
                                            placeholder={t.contact.email || "Email"}
                                            value={form.email}
                                            onChange={handleChange}
                                            disabled={loading}
                                            rtl={isRTL}
                                            ltrValue
                                        />
                                    </div>

                                    {/* Phone + Subject */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                                            gap: "18px",
                                        }}
                                        className="contact-form-grid"
                                    >
                                        <StyledField
                                            icon={<Phone size={19} />}
                                            name="phone"
                                            placeholder={t.contact.phone || "Phone"}
                                            value={form.phone}
                                            onChange={handleChange}
                                            disabled={loading}
                                            rtl={isRTL}
                                            ltrValue
                                        />

                                        <StyledField
                                            icon={<FileText size={19} />}
                                            name="subject"
                                            placeholder={t.contact.subject || "Subject"}
                                            value={form.subject}
                                            onChange={handleChange}
                                            disabled={loading}
                                            rtl={isRTL}
                                        />
                                    </div>

                                    {/* Service */}
                                    <Select
                                        value={form.service}
                                        onValueChange={handleServiceChange}
                                        disabled={loading}
                                    >
                                        <SelectTrigger
                                            className="h-14 rounded-2xl border-white/20 bg-white/10 shadow-none focus:border-white/40 focus:ring-white/20"
                                            style={{
                                                direction: isRTL ? "rtl" : "ltr",
                                                color: "#ffffff",
                                            }}
                                        >
                                            <SelectValue
                                                placeholder={t.contact.selectService || "Select a service"}
                                            />
                                        </SelectTrigger>

                                        <SelectContent
                                            dir={isRTL ? "rtl" : "ltr"}
                                        >
                                            {loadingServices ? (
                                                <SelectItem value="loading" disabled>
                                                    {t.common?.loading || "Loading..."}
                                                </SelectItem>
                                            ) : services.length > 0 ? (
                                                services.map((service) => (
                                                    <SelectItem key={service.id} value={service.title}>
                                                        {service.title}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>
                                                    {isRTL ? "خدمتی موجود نیست" : "No services available"}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>

                                    {/* Message */}
                                    <Textarea
                                        name="message"
                                        rows={6}
                                        placeholder={t.contact.message || "Your message"}
                                        value={form.message}
                                        onChange={handleChange}
                                        disabled={loading}
                                        style={{
                                            minHeight: "160px",
                                            resize: "vertical",
                                            direction: isRTL ? "rtl" : "ltr",
                                            textAlign: isRTL ? "right" : "left",
                                            borderRadius: "18px",
                                            background: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            padding: "18px",
                                            boxShadow: "none",
                                            color: "#ffffff",
                                            fontSize: "0.9rem",
                                        }}
                                        className="placeholder:text-white/50"
                                    />

                                    {/* Submit */}
                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            style={{
                                                width: "100%",
                                                height: "58px",
                                                borderRadius: "17px",
                                                border: "none",
                                                background: "#ffffff",
                                                color: "#183B73",
                                                fontSize: "15px",
                                                fontWeight: 800,
                                                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                                                transition: "all 0.3s ease",
                                            }}
                                            className="hover:bg-white/90"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2
                                                        size={19}
                                                        className="animate-spin"
                                                        style={{
                                                            margin: isRTL ? "0 0 0 9px" : "0 9px 0 0",
                                                        }}
                                                    />
                                                    {t.contact.sending || "Sending..."}
                                                </>
                                            ) : (
                                                <>
                                                    <Send
                                                        size={19}
                                                        style={{
                                                            margin: isRTL ? "0 0 0 9px" : "0 9px 0 0",
                                                        }}
                                                    />
                                                    {t.contact.send || "Send Message"}
                                                    <ArrowUpRight
                                                        size={18}
                                                        style={{
                                                            margin: isRTL ? "0 9px 0 0" : "0 0 0 9px",
                                                            transform: isRTL ? "rotate(-90deg)" : "none",
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>

                                    <p
                                        style={{
                                            textAlign: "center",
                                            fontSize: "12px",
                                            color: "rgba(255,255,255,0.5)",
                                            marginTop: "2px",
                                        }}
                                    >
                                        {language === "fa" 
                                            ? "پیام شما با امنیت کامل برای تیم ما ارسال می‌شود."
                                            : "Your message is securely delivered to our team."}
                                    </p>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* ============================================================
                LOCATION - Reduced spacing
            ============================================================ */}

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    position: "relative",
                    marginTop: "40px", // Reduced from 100px to 40px                    paddingBottom: "60px",
                }}
            >
                {/* Section Header */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "32px", // Reduced from 42px to 32px
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 18px",
                            borderRadius: "999px",
                            background: "rgba(24,59,115,0.08)",
                            border: "1px solid rgba(24,59,115,0.15)",
                            color: "#183B73",
                            fontSize: "13px",
                            fontWeight: 800,
                            letterSpacing: "0.05em",
                        }}
                    >
                        <MapPin size={15} />
                        {t.contact.locationBadge || "OUR LOCATION"}
                    </div>

                    <h2
                        style={{
                            marginTop: "14px", // Reduced from 18px to 14px
                            marginBottom: "8px", // Reduced from 12px to 8px
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 900,
                            lineHeight: 1.1,
                            letterSpacing: "-0.035em",
                            background: "linear-gradient(135deg, #183B73, #24579D, #46A6D9)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {t.contact.findUs || "Find Us"}
                    </h2>

                    <p
                        style={{
                            maxWidth: "750px",
                            margin: "0 auto",
                            color: "#64748b",
                            fontSize: "17px",
                            lineHeight: 1.7,
                        }}
                    >
                        {addresses?.[0]}
                    </p>
                </div>

                {/* Map */}
                <div
                    style={{
                        position: "relative",
                        padding: "8px",
                        borderRadius: "32px",
                        background: "linear-gradient(135deg, rgba(24,59,115,0.35), rgba(70,166,217,0.25))",
                        boxShadow: "0 30px 80px rgba(15,23,42,0.16)",
                    }}
                >
                    <LocationMap
                        language={language}
                    />
                </div>
            </motion.section>

            {/* ============================================================
                FLOATING WHATSAPP
            ============================================================ */}

            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                initial={{
                    opacity: 0,
                    scale: 0.7,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    delay: 1,
                }}
                style={{
                    position: "fixed",
                    bottom: "28px",
                    zIndex: 100,
                    ...(isRTL ? { left: "28px" } : { right: "28px" }),
                }}
            >
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.92,
                    }}
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#22c55e,#16a34a)",
                        color: "#ffffff",
                        boxShadow: "0 15px 40px rgba(34,197,94,.35)",
                    }}
                >
                    <span
                        style={{
                            position: "absolute",
                            inset: "-6px",
                            borderRadius: "50%",
                            border: "1px solid rgba(34,197,94,.35)",
                            animation: "pulse 2s infinite",
                        }}
                    />

                    <MessageCircle size={29} />
                </motion.div>
            </motion.a>

            {/* ============================================================
                FOOTER
            ============================================================ */}

            <Footer />

            {/* ============================================================
                RESPONSIVE STYLES
            ============================================================ */}

            <style jsx global>{`
                @media (max-width: 900px) {
                    .contact-main-grid {
                        grid-template-columns: 1fr !important;
                    }
                }

                @media (max-width: 640px) {
                    .contact-form-grid {
                        grid-template-columns: 1fr !important;
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
                    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-40px) translateX(15px) scale(1.3); opacity: 0.8; }
                    100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes pulseDot {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(0.6); }
                }

                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.7; }
                    70% { transform: scale(1.15); opacity: 0; }
                    100% { transform: scale(0.95); opacity: 0; }
                }

                .placeholder-white\\/50::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Contact Card
|--------------------------------------------------------------------------
*/

interface ContactCardProps {
    icon: React.ReactNode;
    iconColor: string;
    title: string;
    value?: string;
    href: string;
    description: string;
    rtl: boolean;
    external?: boolean;
}

function ContactCard({
    icon,
    iconColor,
    title,
    value,
    href,
    description,
    rtl,
    external,
}: ContactCardProps) {
    return (
        <motion.a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            whileHover={{
                y: -8,
            }}
            transition={{
                duration: 0.25,
            }}
            style={{
                position: "relative",
                overflow: "hidden",
                padding: "27px",
                borderRadius: "24px",
                background: "rgba(255,255,255,.95)",
                border: "1px solid rgba(226,232,240,.9)",
                boxShadow: "0 15px 45px rgba(15,23,42,.07)",
                textDecoration: "none",
                color: "#0f172a",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-50px",
                    right: "-50px",
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    background: `${iconColor}12`,
                    filter: "blur(5px)",
                }}
            />

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "56px",
                            height: "56px",
                            borderRadius: "17px",
                            background: `${iconColor}12`,
                            color: iconColor,
                        }}
                    >
                        {icon}
                    </div>

                    <ArrowUpRight
                        size={19}
                        style={{
                            color: "#cbd5e1",
                            transform: rtl ? "rotate(-90deg)" : "none",
                        }}
                    />
                </div>

                <p
                    style={{
                        marginTop: "22px",
                        fontSize: "12px",
                        fontWeight: 800,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: iconColor,
                    }}
                >
                    {title}
                </p>

                <h3
                    style={{
                        marginTop: "7px",
                        fontSize: "17px",
                        lineHeight: 1.5,
                        fontWeight: 800,
                        wordBreak: "break-word",
                    }}
                >
                    {value}
                </h3>

                <p
                    style={{
                        marginTop: "8px",
                        fontSize: "13px",
                        color: "#64748b",
                        lineHeight: 1.6,
                    }}
                >
                    {description}
                </p>
            </div>
        </motion.a>
    );
}

/*
|--------------------------------------------------------------------------
| Information Row
|--------------------------------------------------------------------------
*/

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value?: string;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
            }}
        >
            <div
                style={{
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "13px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#FFD700",
                }}
            >
                {icon}
            </div>

            <div
                style={{
                    minWidth: 0,
                }}
            >
                <p
                    style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                    }}
                >
                    {label}
                </p>

                <p
                    style={{
                        marginTop: "4px",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 600,
                        wordBreak: "break-word",
                    }}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Styled Input - Updated for gradient background
|--------------------------------------------------------------------------
*/

interface StyledFieldProps {
    icon: React.ReactNode;
    type?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    disabled: boolean;
    rtl: boolean;
    ltrValue?: boolean;
}

function StyledField({
    icon,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    disabled,
    rtl,
    ltrValue,
}: StyledFieldProps) {
    return (
        <div
            style={{
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "rgba(255,255,255,0.5)",
                    pointerEvents: "none",
                    ...(rtl ? { right: "17px" } : { left: "17px" }),
                }}
            >
                {icon}
            </div>

            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                dir={ltrValue ? "ltr" : rtl ? "rtl" : "ltr"}
                className="placeholder:text-white/50"
                style={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "17px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.08)",
                    paddingLeft: rtl ? "16px" : "48px",
                    paddingRight: rtl ? "48px" : "16px",
                    textAlign: ltrValue ? "left" : rtl ? "right" : "left",
                    color: "#ffffff",
                    boxShadow: "none",
                    outline: "none",
                    fontSize: "0.9rem",
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
            />
        </div>
    );
}