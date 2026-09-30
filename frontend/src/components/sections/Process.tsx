"use client";

import { motion } from "framer-motion";
import {
    Search,
    ClipboardCheck,
    Palette,
    RefreshCcw,
    Rocket,
    Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { useLanguage } from "@/hooks/use-language";

export default function Process() {
    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const toPersianNumber = (value: string) =>
        value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

    const processSteps = [
        {
            number: "01",
            titleKey: "consultation",
            icon: Search,
            color: "#46A6D9",
        },
        {
            number: "02",
            titleKey: "planning",
            icon: ClipboardCheck,
            color: "#00B894",
        },
        {
            number: "03",
            titleKey: "designProduction",
            icon: Palette,
            color: "#F39C12",
        },
        {
            number: "04",
            titleKey: "reviewRevision",
            icon: RefreshCcw,
            color: "#9B59B6",
        },
        {
            number: "05",
            titleKey: "launchDelivery",
            icon: Rocket,
            color: "#E74C3C",
        },
    ];

    return (
        <>
            {/* ========================================================= */}
            {/* INTERNAL CSS - ENHANCED VISUAL STYLING */}
            {/* ========================================================= */}
            <style>{`
                @keyframes floatGlow {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-20px) scale(1.05);
                        opacity: 0.8;
                    }
                }
                
                @keyframes shimmerCard {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
                
                @keyframes pulseRing {
                    0% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }
                
                @keyframes rotateIcon {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes bounceArrow {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(8px);
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Main Section - Full Width with Center Alignment */
                .process-section {
                    position: relative;
                    overflow: hidden;
                    padding: 100px 0 120px;
                    background: linear-gradient(160deg, #ffffff 0%, #f8fafc 40%, #e8f4f8 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                
                .process-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(ellipse at 30% 20%, rgba(70, 166, 217, 0.03) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }
                
                /* Container Override - Ensure Centering */
                .process-section .container-wrapper {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 28px;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                .glow-orb {
                    animation: floatGlow 8s ease-in-out infinite;
                }
                
                .glow-orb-delayed {
                    animation: floatGlow 10s ease-in-out infinite reverse;
                }
                
                .badge-pill {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: slideUp 0.8s ease forwards;
                }
                
                .badge-pill::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 200%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.6s ease;
                }
                
                .badge-pill:hover::before {
                    left: 100%;
                }
                
                .badge-pill:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 20px rgba(24, 59, 115, 0.2);
                }
                
                .section-title {
                    background: linear-gradient(135deg, #183B73 0%, #46A6D9 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: slideUp 0.8s ease 0.2s both;
                }
                
                .section-subtitle {
                    position: relative;
                    display: inline-block;
                }
                
                .section-subtitle::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 50%;
                    width: 60%;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #46A6D9, transparent);
                    transform: translateX(-50%);
                    border-radius: 10px;
                }
                
                .section-description {
                    animation: slideUp 0.8s ease 0.4s both;
                }
                
                /* Heading Section - Center Aligned */
                .heading-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 768px;
                    margin: 0 auto 96px;
                    text-align: center;
                }
                
                .timeline-node {
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .timeline-node::before {
                    content: '';
                    position: absolute;
                    inset: -8px;
                    border-radius: 50%;
                    border: 2px solid rgba(70, 166, 217, 0.2);
                    animation: pulseRing 2s ease-out infinite;
                }
                
                .timeline-node:hover {
                    transform: scale(1.1) rotate(5deg);
                }
                
                /* Timeline Container - Center Aligned */
                .timeline-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1024px;
                    margin: 0 auto;
                }
                
                .step-card {
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.75);
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    padding: 40px 35px 35px;
                }
                
                .step-card::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    border-radius: 34px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.5), transparent, rgba(255,255,255,0.2));
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                
                .step-card:hover::before {
                    opacity: 1;
                }
                
                .step-card:hover {
                    transform: translateY(-12px) scale(1.01);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
                    border-color: rgba(70, 166, 217, 0.2);
                }
                
                .step-card .card-glow {
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .step-card:hover .card-glow {
                    transform: scale(1.5);
                    opacity: 0.5;
                }
                
                .step-number {
                    position: relative;
                    display: inline-block;
                    font-weight: 900;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    font-size: 13px;
                    margin-bottom: 8px;
                }
                
                .step-number::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 50%;
                    width: 30px;
                    height: 2px;
                    background: currentColor;
                    border-radius: 10px;
                    transform: translateX(-50%);
                    transition: width 0.4s ease;
                }
                
                .step-card:hover .step-number::after {
                    width: 50px;
                }
                
                .step-icon-wrapper {
                    position: relative;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    margin: 16px 0 8px;
                }
                
                .step-card:hover .step-icon-wrapper {
                    transform: scale(1.1) rotate(-5deg);
                }
                
                .step-icon-wrapper .icon-bg {
                    transition: all 0.5s ease;
                }
                
                .step-card:hover .step-icon-wrapper .icon-bg {
                    transform: scale(1.1);
                    opacity: 0.3;
                }
                
                .step-card .arrow-icon {
                    animation: bounceArrow 2s ease-in-out infinite;
                    transition: all 0.3s ease;
                }
                
                .step-card:hover .arrow-icon {
                    transform: translateX(4px);
                }
                
                .step-title {
                    margin: 12px 0 8px;
                    font-size: 28px;
                    font-weight: 900;
                    color: #183B73;
                }
                
                .step-description {
                    margin: 8px 0 16px;
                    font-size: 17px;
                    line-height: 1.8;
                    color: #64748b;
                    max-width: 500px;
                }
                
                .step-footer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    width: 100%;
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                }
                
                .step-footer .dot {
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                
                .step-footer .workflow-label {
                    font-size: 13px;
                    font-weight: 500;
                    color: #94a3b8;
                }
                
                /* CTA Section - Center Aligned */
                .cta-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1024px;
                    margin: 112px auto 0;
                }
                
                .cta-section {
                    position: relative;
                    overflow: hidden;
                    border-radius: 40px;
                    background: linear-gradient(135deg, #0f1f3a 0%, #183B73 40%, #1a5290 70%, #46A6D9 100%);
                    box-shadow: 0 20px 60px rgba(24, 59, 115, 0.3);
                    padding: 60px 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .cta-section::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
                    background-size: 200% 100%;
                    animation: shimmerCard 6s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .cta-glow-1 {
                    animation: floatGlow 7s ease-in-out infinite;
                }
                
                .cta-glow-2 {
                    animation: floatGlow 9s ease-in-out infinite reverse;
                }
                
                .cta-icon-wrapper {
                    animation: floatGlow 6s ease-in-out infinite;
                    transition: all 0.4s ease;
                    margin-bottom: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
                }
                
                .cta-icon-wrapper:hover {
                    transform: rotate(15deg) scale(1.1);
                }
                
                .cta-title {
                    font-size: 40px;
                    font-weight: 900;
                    color: #ffffff;
                    margin-bottom: 16px;
                    line-height: 1.2;
                }
                
                .cta-description {
                    font-size: 18px;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.85);
                    max-width: 600px;
                    margin: 0 auto;
                }
                
                .cta-dots {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 24px;
                }
                
                .cta-dots .dot {
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    animation: floatGlow 2s ease-in-out infinite;
                }
                
                /* Card step container - center aligned */
                .step-item {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                
                .step-item-left {
                    justify-content: flex-start;
                }
                
                .step-item-right {
                    justify-content: flex-end;
                }
                
                /* Responsive */
                @media (max-width: 1024px) {
                    .process-section {
                        padding: 60px 0 80px;
                    }
                    .step-card {
                        padding: 30px 24px 28px !important;
                    }
                    .step-title {
                        font-size: 24px !important;
                    }
                    .step-description {
                        font-size: 16px !important;
                    }
                    .cta-section {
                        padding: 40px 28px !important;
                    }
                    .cta-title {
                        font-size: 32px !important;
                    }
                    .step-item {
                        justify-content: center !important;
                    }
                }
                
                @media (max-width: 640px) {
                    .process-section {
                        padding: 40px 0 60px;
                    }
                    .process-section .container-wrapper {
                        padding: 0 16px;
                    }
                    .step-card {
                        padding: 24px 18px 22px !important;
                        border-radius: 24px !important;
                    }
                    .step-title {
                        font-size: 22px !important;
                    }
                    .step-description {
                        font-size: 15px !important;
                    }
                    .step-icon-wrapper {
                        width: 64px !important;
                        height: 64px !important;
                        border-radius: 20px !important;
                    }
                    .step-icon-wrapper svg {
                        width: 30px !important;
                        height: 30px !important;
                    }
                    .cta-section {
                        border-radius: 28px;
                        padding: 32px 20px !important;
                    }
                    .cta-title {
                        font-size: 26px !important;
                    }
                    .cta-description {
                        font-size: 16px !important;
                    }
                    .cta-icon-wrapper {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    .cta-icon-wrapper svg {
                        width: 30px !important;
                        height: 30px !important;
                    }
                    .step-item {
                        justify-content: center !important;
                    }
                    .heading-wrapper {
                        margin-bottom: 60px;
                    }
                    .cta-wrapper {
                        margin-top: 60px;
                    }
                }
            `}</style>

            <section className="process-section">
                {/* Background Effects */}
                <div className="glow-orb absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#46A6D9]/20 blur-[150px] -z-10" />
                <div className="glow-orb-delayed absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[#183B73]/10 blur-[170px] -z-10" />

                {/* Centered Container */}
                <div className="container-wrapper">
                    {/* Heading - Center Aligned */}
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
                            duration: .8,
                        }}
                        className="heading-wrapper"
                    >
                        <div className="badge-pill inline-flex items-center gap-2 rounded-full bg-[#183B73]/10 px-6 py-2.5 text-sm font-semibold text-[#183B73]">
                            <Sparkles size={16} />
                            {t.process.badge}
                        </div>

                        <h2 className="section-title mt-8 text-4xl font-black leading-tight md:text-5xl">
                            {t.process.title}
                            <br />
                            <span className="section-subtitle">{t.process.titleHighlight}</span>
                        </h2>

                        <p className="section-description mt-6 text-lg leading-8 text-slate-600">
                            {t.process.description}
                        </p>
                    </motion.div>

                    {/* Timeline - Center Aligned */}
                    <div className="timeline-wrapper">
                        {/* Center Line - Enhanced */}
                        <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#46A6D9] via-[#183B73] to-[#46A6D9] lg:block">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#46A6D9] shadow-lg shadow-[#46A6D9]/50" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#46A6D9] shadow-lg shadow-[#46A6D9]/50" />
                        </div>

                        {/* Center Glow */}
                        <div className="absolute left-1/2 top-0 hidden h-full w-4 -translate-x-1/2 rounded-full bg-[#46A6D9]/20 blur-xl lg:block" />

                        {processSteps.map((step, index) => {
                            const Icon = step.icon;
                            const left = index % 2 === 0;

                            const localizedNumber = isRTL
                                ? toPersianNumber(step.number)
                                : step.number;

                            const localizedStep =
                                t.process.steps[
                                    step.titleKey as keyof typeof t.process.steps
                                ];

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{
                                        opacity: 0,
                                        y: 80,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: index * .15,
                                        duration: .8,
                                    }}
                                    className={`step-item mb-24 ${
                                        left ? "step-item-left" : "step-item-right"
                                    }`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.15, 1],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                            }}
                                            style={{
                                                background: step.color,
                                            }}
                                            className="timeline-node flex h-20 w-20 items-center justify-center rounded-full border-8 border-white shadow-2xl"
                                        >
                                            <Icon size={34} className="text-white" />
                                        </motion.div>
                                    </div>

                                    {/* Card - Center Aligned with Padding */}
                                    <motion.div
                                        whileHover={{
                                            y: -10,
                                            scale: 1.02,
                                        }}
                                        className="step-card relative w-full overflow-hidden rounded-[34px] border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl lg:w-[46%]"
                                    >
                                        {/* Top Color Bar - Enhanced */}
                                        <div
                                            style={{
                                                background: `linear-gradient(90deg, ${step.color}, ${step.color}dd)`,
                                            }}
                                            className="absolute inset-x-0 top-0 h-2 rounded-t-[34px]"
                                        />

                                        {/* Glow */}
                                        <div
                                            style={{
                                                background: `${step.color}25`,
                                            }}
                                            className="card-glow absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
                                        />

                                        {/* Step Number - Center */}
                                        <span
                                            style={{
                                                color: step.color,
                                            }}
                                            className="step-number"
                                        >
                                            {t.process.step} {localizedNumber}
                                        </span>

                                        {/* Icon - Center */}
                                        <div
                                            style={{
                                                background: `${step.color}15`,
                                                border: `1px solid ${step.color}20`,
                                            }}
                                            className="step-icon-wrapper flex h-20 w-20 items-center justify-center rounded-3xl"
                                        >
                                            <div className="icon-bg absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent to-[${step.color}05]" />
                                            <Icon
                                                size={38}
                                                style={{
                                                    color: step.color,
                                                }}
                                            />
                                        </div>

                                        {/* Title - Center */}
                                        <h3 className="step-title">
                                            {localizedStep.title}
                                        </h3>

                                        {/* Description - Center */}
                                        <p className="step-description">
                                            {localizedStep.description}
                                        </p>

                                        {/* Decorative Bottom - Center */}
                                        <div className="step-footer">
                                            <div
                                                style={{
                                                    background: step.color,
                                                }}
                                                className="dot shadow-lg"
                                            />
                                            <span className="workflow-label">
                                                {t.process.professionalWorkflow}
                                            </span>
                                            <motion.div
                                                animate={{
                                                    x: [0, 8, 0],
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 2,
                                                }}
                                                style={{
                                                    color: step.color,
                                                }}
                                                className="arrow-icon text-2xl font-bold"
                                            >
                                                →
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA - Center Aligned */}
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
                            duration: .8,
                        }}
                        className="cta-wrapper"
                    >
                        <div className="cta-section">
                            {/* Glows */}
                            <div className="cta-glow-1 absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />
                            <div className="cta-glow-2 absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-300/20 blur-[120px]" />

                            <div className="relative z-10">
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 6,
                                    }}
                                    className="cta-icon-wrapper"
                                >
                                    <Rocket size={40} className="text-white" />
                                </motion.div>

                                <h2 className="cta-title">
                                    {t.process.cta.title}
                                </h2>

                                <p className="cta-description">
                                    {t.process.cta.description}
                                </p>

                                {/* Decorative dots */}
                                <div className="cta-dots">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="dot"
                                            style={{
                                                animationDelay: `${i * 0.15}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}