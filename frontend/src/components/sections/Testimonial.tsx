"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Star,
    Quote,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

/*
|--------------------------------------------------------------------------
| Interface
|--------------------------------------------------------------------------
*/

interface Testimonial {
    id: number;
    name: string;
    company: string | null;
    position: string | null;
    image: string | null;
    rating: number;
    review: string;
    is_featured: boolean;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export default function TestimonialSection() {
    const { language, t } = useLanguage();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /*
    |--------------------------------------------------------------------------
    | Load Testimonials
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        async function loadTestimonials() {
            try {
                const response = await fetch(
                    `${API_URL}/testimonials`,
                    {
                        headers: {
                            Accept: "application/json",
                            "Accept-Language": language,
                        },
                    }
                );
                const json = await response.json();
                setTestimonials(json.data ?? []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadTestimonials();
    }, [API_URL, language]);

    /*
    |--------------------------------------------------------------------------
    | Auto Slider
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (testimonials.length <= 1) {
            return;
        }
        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === testimonials.length - 1 ? 0 : prev + 1
            );
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials]);

    /*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    */

    function previousSlide() {
        setCurrent((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    }

    function nextSlide() {
        setCurrent((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    }

    // Sort testimonials to show featured first
    const sortedTestimonials = [...testimonials].sort((a, b) => {
        if (a.is_featured === b.is_featured) {
            return 0;
        }
        return a.is_featured ? -1 : 1;
    });

    return (
        <section
            style={{
                position: "relative",
                overflow: "hidden",
                paddingTop: "96px",
                paddingBottom: "128px",
            }}
        >
            {/* Background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -20,
                    background: "linear-gradient(135deg, #ffffff, #f8fafc, #e0f2fe)",
                }}
            />

            {/* Animated Glow */}
            <motion.div
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                }}
                style={{
                    position: "absolute",
                    left: "-160px",
                    top: "40px",
                    width: "420px",
                    height: "420px",
                    borderRadius: "50%",
                    background: "rgba(70, 166, 217, 0.2)",
                    filter: "blur(150px)",
                    zIndex: -10,
                }}
            />

            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                }}
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "rgba(24, 59, 115, 0.1)",
                    filter: "blur(170px)",
                    zIndex: -10,
                }}
            />

            <Container>
                {/* Heading */}
                <motion.div
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
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    style={{
                        maxWidth: "768px",
                        margin: "0 auto 80px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "9999px",
                            background: "rgba(24, 59, 115, 0.1)",
                            padding: "8px 20px",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#183B73",
                        }}
                    >
                        <Sparkles size={16} />
                        {t.Testimonials.badge}
                    </div>

                    <h2
                        style={{
                            marginTop: "32px",
                            fontSize: "clamp(2.25rem, 5vw, 3rem)",
                            fontWeight: 900,
                            lineHeight: 1.2,
                            color: "#183B73",
                        }}
                    >
                        {t.Testimonials.title}
                    </h2>

                    <p
                        style={{
                            marginTop: "24px",
                            fontSize: "18px",
                            lineHeight: 2,
                            color: "#64748b",
                        }}
                    >
                        {t.Testimonials.description}
                    </p>
                </motion.div>

                {/* Loading */}
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: "96px",
                            paddingBottom: "96px",
                        }}
                    >
                        <div
                            style={{
                                height: "64px",
                                width: "64px",
                                borderRadius: "50%",
                                border: "4px solid #46A6D9",
                                borderTopColor: "transparent",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                        <p
                            style={{
                                marginTop: "24px",
                                color: "#64748b",
                            }}
                        >
                            {t.Testimonials.loading}
                        </p>
                    </div>
                ) : sortedTestimonials.length > 0 ? (
                    <div
                        style={{
                            position: "relative",
                            margin: "0 auto",
                            maxWidth: "1152px",
                        }}
                    >
                        {/* Previous */}
                        <button
                            onClick={previousSlide}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: "50%",
                                zIndex: 20,
                                transform: "translateY(-50%)",
                                borderRadius: "50%",
                                background: "#ffffff",
                                padding: "16px",
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                                e.currentTarget.style.background = "#183B73";
                                e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.color = "inherit";
                            }}
                        >
                            <ChevronLeft />
                        </button>

                        {/* Next */}
                        <button
                            onClick={nextSlide}
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "50%",
                                zIndex: 20,
                                transform: "translateY(-50%)",
                                borderRadius: "50%",
                                background: "#ffffff",
                                padding: "16px",
                                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                border: "none",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                                e.currentTarget.style.background = "#183B73";
                                e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                                e.currentTarget.style.background = "#ffffff";
                                e.currentTarget.style.color = "inherit";
                            }}
                        >
                            <ChevronRight />
                        </button>

                        <motion.div
                            key={sortedTestimonials[current].id}
                            initial={{
                                opacity: 0,
                                scale: 0.96,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "40px",
                                border: "1px solid rgba(255, 255, 255, 0.6)",
                                background: "rgba(255, 255, 255, 0.7)",
                                boxShadow: "0 30px 80px rgba(0, 0, 0, 0.12)",
                                backdropFilter: "blur(18px)",
                                WebkitBackdropFilter: "blur(18px)",
                            }}
                        >
                            {/* Glow */}
                            <div
                                style={{
                                    position: "absolute",
                                    right: "-128px",
                                    top: "-128px",
                                    width: "288px",
                                    height: "288px",
                                    borderRadius: "50%",
                                    background: "rgba(70, 166, 217, 0.2)",
                                    filter: "blur(120px)",
                                    pointerEvents: "none",
                                }}
                            />

                            <div
                                style={{
                                    display: "grid",
                                    gap: "48px",
                                    gridTemplateColumns: "320px 1fr",
                                }}
                            >
                                {/* Left Panel */}
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        padding: "64px 40px",
                                        textAlign: "center",
                                        background: "linear-gradient(135deg, #183B73, #24579D, #46A6D9)",
                                    }}
                                >
                                    {/* Decorative Glow */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "-80px",
                                            right: "-80px",
                                            width: "240px",
                                            height: "240px",
                                            borderRadius: "50%",
                                            background: "rgba(255, 255, 255, 0.1)",
                                            filter: "blur(100px)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "-80px",
                                            left: "-80px",
                                            width: "240px",
                                            height: "240px",
                                            borderRadius: "50%",
                                            background: "rgba(125, 211, 252, 0.2)",
                                            filter: "blur(100px)",
                                            pointerEvents: "none",
                                        }}
                                    />

                                    {/* Quote */}
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 0],
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 6,
                                        }}
                                        style={{
                                            position: "absolute",
                                            right: "32px",
                                            top: "32px",
                                            color: "rgba(255, 255, 255, 0.15)",
                                        }}
                                    >
                                        <Quote size={90} />
                                    </motion.div>

                                    {/* Avatar - RECREATED WITH INLINE CSS */}
                                    <div
                                        style={{
                                            position: "relative",
                                            zIndex: 10,
                                            marginBottom: "32px",
                                            width: "144px",
                                            height: "144px",
                                            overflow: "hidden",
                                            borderRadius: "50%",
                                            border: "4px solid rgba(255, 255, 255, 0.3)",
                                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {sortedTestimonials[current].image ? (
                                            <img
                                                src={sortedTestimonials[current].image!}
                                                alt={sortedTestimonials[current].name}
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
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
                                                    background: "rgba(255, 255, 255, 0.2)",
                                                    fontSize: "48px",
                                                    fontWeight: 900,
                                                    color: "#ffffff",
                                                }}
                                            >
                                                {sortedTestimonials[current]
                                                    .name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <h3
                                        style={{
                                            position: "relative",
                                            zIndex: 10,
                                            fontSize: "30px",
                                            fontWeight: 900,
                                            color: "#ffffff",
                                        }}
                                    >
                                        {sortedTestimonials[current].name}
                                    </h3>

                                    {/* Position */}
                                    {(sortedTestimonials[current].position ||
                                        sortedTestimonials[current].company) && (
                                        <p
                                            style={{
                                                position: "relative",
                                                zIndex: 10,
                                                marginTop: "12px",
                                                color: "rgba(255, 255, 255, 0.8)",
                                            }}
                                        >
                                            {sortedTestimonials[current].position}
                                            {sortedTestimonials[current].position &&
                                                sortedTestimonials[current].company &&
                                                " • "}
                                            {sortedTestimonials[current].company}
                                        </p>
                                    )}

                                    {/* Rating */}
                                    <div
                                        style={{
                                            position: "relative",
                                            zIndex: 10,
                                            marginTop: "32px",
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                key={index}
                                                size={22}
                                                style={{
                                                    fill: index < sortedTestimonials[current].rating
                                                        ? "#facc15"
                                                        : "none",
                                                    color: index < sortedTestimonials[current].rating
                                                        ? "#facc15"
                                                        : "rgba(255, 255, 255, 0.3)",
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Featured */}
                                    {sortedTestimonials[current].is_featured && (
                                        <div
                                            style={{
                                                position: "relative",
                                                zIndex: 10,
                                                marginTop: "32px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                borderRadius: "9999px",
                                                background: "#fbbf24",
                                                padding: "8px 20px",
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "#ffffff",
                                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <Sparkles size={16} />
                                            {t.Testimonials.featured}
                                        </div>
                                    )}
                                </div>

                                {/* Right Panel */}
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        padding: "56px 64px",
                                    }}
                                >
                                    {/* Quote Icon */}
                                    <Quote
                                        size={72}
                                        style={{
                                            marginBottom: "32px",
                                            color: "rgba(70, 166, 217, 0.2)",
                                        }}
                                    />

                                    {/* Review */}
                                    <motion.p
                                        key={sortedTestimonials[current].id}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                        }}
                                        style={{
                                            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                                            lineHeight: 2.5,
                                            color: "#334155",
                                        }}
                                    >
                                        "{sortedTestimonials[current].review}"
                                    </motion.p>

                                    {/* Decorative Line */}
                                    <div
                                        style={{
                                            marginTop: "48px",
                                            height: "1px",
                                            background: "linear-gradient(90deg, #46A6D9, #183B73, transparent)",
                                        }}
                                    />

                                    {/* Footer */}
                                    <div
                                        style={{
                                            marginTop: "32px",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: "24px",
                                        }}
                                    >
                                        <div>
                                            <h4
                                                style={{
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    color: "#183B73",
                                                }}
                                            >
                                                {sortedTestimonials[current].name}
                                            </h4>
                                            {sortedTestimonials[current].company && (
                                                <p
                                                    style={{
                                                        marginTop: "4px",
                                                        color: "#64748b",
                                                    }}
                                                >
                                                    {sortedTestimonials[current].company}
                                                </p>
                                            )}
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                            }}
                                        >
                                            {Array.from({ length: sortedTestimonials.length }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrent(index)}
                                                    style={{
                                                        transition: "all 0.3s ease",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        padding: 0,
                                                        background: "none",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            borderRadius: "9999px",
                                                            transition: "all 0.3s ease",
                                                            height: "12px",
                                                            width: current === index ? "40px" : "12px",
                                                            background: current === index
                                                                ? "#183B73"
                                                                : "#cbd5e1",
                                                            cursor: "pointer",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            if (current !== index) {
                                                                e.currentTarget.style.background = "#46A6D9";
                                                            }
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            if (current !== index) {
                                                                e.currentTarget.style.background = "#cbd5e1";
                                                            }
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div
                        style={{
                            paddingTop: "96px",
                            paddingBottom: "96px",
                            textAlign: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "24px",
                                fontWeight: 700,
                                color: "#334155",
                            }}
                        >
                            {t.Testimonials.empty.title}
                        </h3>

                        <p
                            style={{
                                marginTop: "16px",
                                color: "#64748b",
                            }}
                        >
                            {t.Testimonials.empty.description}
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                <motion.div
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
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                    style={{
                        position: "relative",
                        marginTop: "96px",
                        overflow: "hidden",
                        borderRadius: "40px",
                    }}
                >
                    {/* Background */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(90deg, #183B73, #24579D, #46A6D9)",
                        }}
                    />

                    {/* Glow */}
                    <div
                        style={{
                            position: "absolute",
                            left: "-80px",
                            top: "-80px",
                            width: "288px",
                            height: "288px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.1)",
                            filter: "blur(120px)",
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: "-80px",
                            bottom: "-80px",
                            width: "288px",
                            height: "288px",
                            borderRadius: "50%",
                            background: "rgba(125, 211, 252, 0.2)",
                            filter: "blur(120px)",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            position: "relative",
                            zIndex: 10,
                            padding: "64px 32px",
                            textAlign: "center",
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                            }}
                            style={{
                                margin: "0 auto 32px",
                                display: "flex",
                                height: "80px",
                                width: "80px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.15)",
                                backdropFilter: "blur(8px)",
                                WebkitBackdropFilter: "blur(8px)",
                            }}
                        >
                            <Star
                                size={40}
                                style={{
                                    fill: "#facc15",
                                    color: "#facc15",
                                }}
                            />
                        </motion.div>

                        <h2
                            style={{
                                fontSize: "clamp(2.25rem, 5vw, 3rem)",
                                fontWeight: 900,
                                color: "#ffffff",
                            }}
                        >
                            {t.Testimonials.cta.title}
                        </h2>

                        <p
                            style={{
                                margin: "24px auto 0",
                                maxWidth: "768px",
                                fontSize: "18px",
                                lineHeight: 2,
                                color: "rgba(255, 255, 255, 0.8)",
                            }}
                        >
                            {t.Testimonials.cta.description}
                        </p>

                        <div
                            style={{
                                marginTop: "40px",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: "20px",
                            }}
                        >
                            <Button asChild size="lg">
                                <Link href="/contact">
                                    {t.Testimonials.cta.start}
                                    <ArrowRight
                                        style={{
                                            marginLeft: "8px",
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </Link>
                            </Button>

                            <Button asChild size="lg" variant="outline">
                                <Link href="/portfolio">
                                    {t.Testimonials.cta.portfolio}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </Container>

            <style jsx global>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </section>
    );
}