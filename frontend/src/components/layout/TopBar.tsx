"use client";

import {
    Phone,
    Mail,
    Globe,
    MessageCircle,
} from "lucide-react";

import { company } from "@/config/company";
import { useLanguage } from "@/hooks/use-language";

export default function TopBar() {
    const {
        language,
        setLanguage,
    } = useLanguage();

    const isRTL = language === "fa";

    return (
        <>
            {/* ========================================================= */}
            {/* INTERNAL CSS - ENHANCED VISUAL STYLING */}
            {/* ========================================================= */}
            <style>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shimmerEffect {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
                
                @keyframes pulseGlow {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 3px 15px rgba(37, 211, 102, 0.35);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 6px 30px rgba(37, 211, 102, 0.55);
                    }
                }
                
                @keyframes rotateGlobe {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes floatGlow {
                    0%, 100% {
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                
                .topbar-wrapper {
                    padding: 6px 0;
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #0f1f3a 0%, #183B73 40%, #1a4680 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
                }
                
                .topbar-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(70, 166, 217, 0.06) 25%,
                        rgba(70, 166, 217, 0.12) 50%,
                        rgba(70, 166, 217, 0.06) 75%,
                        transparent 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmerEffect 5s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .topbar-wrapper::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(70, 166, 217, 0.3), transparent);
                }
                
                .topbar-inner {
                    animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    position: relative;
                    z-index: 2;
                    padding: 4px 0;
                }
                
                .contact-item {
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 6px 14px;
                    border-radius: 10px;
                    cursor: default;
                    gap: 10px;
                }
                
                .contact-item:hover {
                    background: rgba(255, 255, 255, 0.07);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                
                .contact-item .icon {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    color: rgba(255, 255, 255, 0.7);
                }
                
                .contact-item:hover .icon {
                    transform: scale(1.15) rotate(-5deg);
                    color: #7BC6E8;
                }
                
                .contact-item .label {
                    transition: all 0.3s ease;
                    color: rgba(255, 255, 255, 0.75);
                    font-weight: 400;
                    letter-spacing: 0.3px;
                }
                
                .contact-item:hover .label {
                    color: #ffffff;
                }
                
                .divider-line {
                    width: 1px;
                    height: 24px;
                    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.12), transparent);
                    flex-shrink: 0;
                }
                
                .whatsapp-btn {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: #25D366;
                    color: #ffffff;
                    box-shadow: 0 3px 15px rgba(37, 211, 102, 0.35);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 1;
                }
                
                .whatsapp-btn::before {
                    content: '';
                    position: absolute;
                    inset: -4px;
                    border-radius: 50%;
                    background: rgba(37, 211, 102, 0.2);
                    opacity: 0;
                    transition: all 0.4s ease;
                }
                
                .whatsapp-btn:hover::before {
                    opacity: 1;
                    transform: scale(1.2);
                }
                
                .whatsapp-btn:hover {
                    transform: scale(1.12) translateY(-2px);
                    background: #20BD5A;
                    box-shadow: 0 6px 30px rgba(37, 211, 102, 0.5);
                }
                
                .whatsapp-btn:active {
                    transform: scale(0.92);
                }
                
                .whatsapp-btn .whatsapp-icon {
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 2;
                }
                
                .whatsapp-btn:hover .whatsapp-icon {
                    transform: scale(1.1);
                }
                
                .slogan-text {
                    position: relative;
                    font-weight: 500;
                    letter-spacing: 0.8px;
                    padding: 4px 16px;
                    border-radius: 20px;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.9),
                        rgba(123, 198, 232, 0.9),
                        rgba(255, 255, 255, 0.9)
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmerEffect 3s ease-in-out infinite;
                    text-shadow: none;
                }
                
                .language-btn {
                    position: relative;
                    padding: 6px 20px;
                    border-radius: 24px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    cursor: pointer;
                    gap: 8px;
                }
                
                .language-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #46A6D9, #183B73);
                    opacity: 0;
                    transition: all 0.4s ease;
                }
                
                .language-btn:hover::before {
                    opacity: 0.15;
                }
                
                .language-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(70, 166, 217, 0.25);
                    border-color: rgba(70, 166, 217, 0.4);
                }
                
                .language-btn:active {
                    transform: translateY(0) scale(0.95);
                }
                
                .language-btn .globe-icon {
                    transition: all 0.5s ease;
                    position: relative;
                    z-index: 1;
                    color: rgba(255, 255, 255, 0.7);
                }
                
                .language-btn:hover .globe-icon {
                    animation: rotateGlobe 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    color: #7BC6E8;
                }
                
                .language-btn .lang-text {
                    position: relative;
                    z-index: 1;
                    transition: all 0.3s ease;
                    color: rgba(255, 255, 255, 0.75);
                    font-weight: 500;
                    font-size: 13px;
                    letter-spacing: 0.5px;
                }
                
                .language-btn:hover .lang-text {
                    color: #ffffff;
                }
                
                /* Responsive Styles */
                @media (max-width: 1024px) {
                    .desktop-contact {
                        display: none !important;
                    }
                    .slogan-text {
                        font-size: 11px;
                        -webkit-text-fill-color: rgba(255, 255, 255, 0.9);
                        background: none;
                        animation: none;
                        padding: 4px 8px;
                    }
                    .topbar-wrapper {
                        padding: 4px 0;
                    }
                }
                
                @media (max-width: 640px) {
                    .slogan-text {
                        font-size: 10px;
                        text-align: center;
                        padding: 4px 4px;
                        letter-spacing: 0.3px;
                    }
                    .topbar-inner {
                        padding: 2px 0;
                    }
                }
            `}</style>

            <div className="topbar-wrapper">
                <div className="topbar-inner">
                    <div
                        className="
                        mx-auto
                        flex
                        min-h-[44px]
                        max-w-[1400px]
                        items-center
                        justify-between
                        px-6
                        lg:px-8
                        text-sm"
                    >
                        {/* ========================================================
                            CONTACT INFORMATION
                        ======================================================== */}

                        <div
                            className="
                            hidden
                            items-center
                            gap-1
                            lg:flex
                            desktop-contact"
                        >
                            {/* Phone 1 */}

                            <div
                                className="
                                flex
                                items-center
                                contact-item"
                            >
                                <Phone className="h-4 w-4 icon" />

                                <span className="label">
                                    {isRTL
                                        ? company.phone[0]
                                        : company.phone_en[0]}
                                </span>
                            </div>

                            {/* Phone 2 */}

                            <div
                                className="
                                flex
                                items-center
                                contact-item"
                            >
                                <Phone className="h-4 w-4 icon" />

                                <span className="label">
                                    {isRTL
                                        ? company.phone[1]
                                        : company.phone_en[1]}
                                </span>
                            </div>

                            <div className="divider-line" />

                            {/* Email + WhatsApp */}

                            <div
                                className="
                                flex
                                items-center
                                gap-2"
                            >
                                {/* Email */}

                                <div
                                    className="
                                    flex
                                    items-center
                                    contact-item"
                                >
                                    <Mail className="h-4 w-4 icon" />

                                    <span className="label">
                                        {company.supportEmail}
                                    </span>
                                </div>

                                <div className="divider-line" />

                                {/* WhatsApp */}

                                <a
                                    href="https://wa.me/0797373690"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    title="WhatsApp"
                                    className="whatsapp-btn"
                                >
                                    <MessageCircle
                                        className="whatsapp-icon"
                                        style={{
                                            width: "17px",
                                            height: "17px",
                                            strokeWidth: 2.5,
                                        }}
                                    />
                                </a>
                            </div>
                        </div>

                        {/* ========================================================
                            SLOGAN
                        ======================================================== */}

                        <p className="slogan-text">
                            {isRTL
                                ? company.slogan
                                : company.slogan_en}
                        </p>

                        {/* ========================================================
                            LANGUAGE SWITCHER
                        ======================================================== */}

                        <button
                            onClick={() =>
                                setLanguage(
                                    language === "fa"
                                        ? "en"
                                        : "fa"
                                )
                            }
                            className="
                            hidden
                            items-center
                            lg:flex
                            language-btn"
                        >
                            <Globe className="h-4 w-4 globe-icon" />

                            <span className="lang-text">
                                {language === "fa"
                                    ? "English"
                                    : "فارسی"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}