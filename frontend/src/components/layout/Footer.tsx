"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUp,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

import { useLanguage } from "@/context/language-context";
import { company } from "@/config/company";
import { api } from "@/services/api";

/*
|--------------------------------------------------------------------------
| Footer Component
|--------------------------------------------------------------------------
*/

export default function Footer() {

    const { t, language } = useLanguage();

    const currentYear =
        new Date().getFullYear();

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [service, setService] =
        useState("");

    const [subject, setSubject] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Services
    |--------------------------------------------------------------------------
    |
    | The service names come from your existing translation files.
    |
    */

    const servicesList = [
        {
            id: 1,
            title: t.services.videoProduction,
        },
        {
            id: 2,
            title: t.services.graphicDesign,
        },
        {
            id: 3,
            title: t.services.logoDesign,
        },
        {
            id: 4,
            title: t.services.websiteDevelopment,
        },
        {
            id: 5,
            title: t.services.motionGraphics,
        },
        {
            id: 6,
            title: t.services.printing,
        },
        {
            id: 7,
            title: t.services.digitalMarketing,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | Scroll To Top
    |--------------------------------------------------------------------------
    */

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Submit Form
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post(
                "/contact",
                {
                    name,
                    phone,
                    email,
                    service,
                    subject,
                    message,
                }
            );

            console.log(
                "Contact form submitted successfully:",
                response.data
            );

            setName("");
            setPhone("");
            setEmail("");
            setService("");
            setSubject("");
            setMessage("");

            alert(
                language === "fa"
                    ? "پیام شما با موفقیت ارسال شد."
                    : "Your message has been sent successfully."
            );

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            alert(
                language === "fa"
                    ? "ارسال پیام با مشکل مواجه شد."
                    : "Failed to send your message. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Input Focus Helper
    |--------------------------------------------------------------------------
    */

    const handleFocus = (
        e: React.FocusEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        e.currentTarget.style.borderColor =
            "#46A6D9";

        e.currentTarget.style.boxShadow =
            "0 0 0 3px rgba(70,166,217,0.12)";

        e.currentTarget.style.background =
            "rgba(255,255,255,0.075)";

    };

    const handleBlur = (
        e: React.FocusEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        e.currentTarget.style.borderColor =
            "rgba(255,255,255,0.09)";

        e.currentTarget.style.boxShadow =
            "none";

        e.currentTarget.style.background =
            "rgba(255,255,255,0.055)";

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <footer style={styles.footer}>

            {/* ========================================================= */}
            {/* INTERNAL CSS - ENHANCED VISUAL STYLING */}
            {/* ========================================================= */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                
                @keyframes slideInLine {
                    from { width: 0; }
                    to { width: 34px; }
                }
                
                .footer-link {
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .footer-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1.5px;
                    background: linear-gradient(90deg, #46A6D9, #7BC6E8);
                    transition: width 0.3s ease;
                }
                
                .footer-link:hover::after {
                    width: 100%;
                }
                
                .social-icon {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .social-icon:hover {
                    transform: translateY(-4px) scale(1.1);
                    box-shadow: 0 8px 25px rgba(70, 166, 217, 0.3);
                }
                
                .form-input {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .form-input:focus {
                    border-color: #46A6D9;
                    box-shadow: 0 0 0 4px rgba(70, 166, 217, 0.15), inset 0 2px 8px rgba(70, 166, 217, 0.05);
                    background: rgba(255, 255, 255, 0.08);
                    transform: translateY(-1px);
                }
                
                .form-input:hover {
                    background: rgba(255, 255, 255, 0.07);
                }
                
                .submit-btn {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .submit-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 200%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.6s ease;
                }
                
                .submit-btn:hover::before {
                    left: 100%;
                }
                
                .submit-btn:active {
                    transform: scale(0.97);
                }
                
                .service-tag {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: default;
                    position: relative;
                    padding-left: 12px;
                }
                
                .service-tag::before {
                    content: '▸';
                    position: absolute;
                    left: 0;
                    color: #46A6D9;
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                
                .service-tag:hover {
                    color: #7BC6E8;
                    transform: translateX(4px);
                }
                
                .service-tag:hover::before {
                    opacity: 1;
                    transform: translateX(-6px);
                }
                
                .contact-item {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 12px;
                    padding: 6px 10px 6px 6px;
                }
                
                .contact-item:hover {
                    background: rgba(70, 166, 217, 0.06);
                    transform: translateX(4px);
                }
                
                .icon-box {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .contact-item:hover .icon-box {
                    background: rgba(70, 166, 217, 0.2);
                    border-color: #46A6D9;
                    transform: scale(1.05);
                }
                
                .form-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .form-card:hover {
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
                    transform: translateY(-2px);
                }
                
                .scroll-top-btn {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .scroll-top-btn:hover {
                    animation: float 2s ease-in-out infinite;
                }
                
                .logo-wrapper {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .logo-wrapper:hover {
                    transform: rotate(-5deg) scale(1.05);
                    box-shadow: 0 16px 40px rgba(70, 166, 217, 0.25);
                }
                
                .heading-line {
                    animation: slideInLine 0.6s ease forwards;
                }
                
                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 32px !important;
                    }
                }
                
                @media (max-width: 640px) {
                    .footer-grid {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    .footer-bottom {
                        flex-direction: column !important;
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .brand-section {
                        align-items: center !important;
                        text-align: center !important;
                    }
                    .description-text {
                        text-align: center !important;
                    }
                    .form-card {
                        padding: 20px !important;
                    }
                }
            `}</style>

            {/* Background Effects */}
            <div style={styles.glowOne} />
            <div style={styles.glowTwo} />

            <div style={styles.container}>

                {/* ========================================================= */}
                {/* MAIN GRID */}
                {/* ========================================================= */}

                <div style={styles.mainGrid} className="footer-grid">

                    {/* ===================================================== */}
                    {/* COMPANY */}
                    {/* ===================================================== */}

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
                            duration: 0.6,
                        }}
                        style={styles.companyColumn}
                        className="brand-section"
                    >
                        <a
                            href="/"
                            style={styles.logoLink}
                        >
                            <div style={styles.logoWrapper} className="logo-wrapper">
                                <img
                                    src={company.logo}
                                    alt={
                                        language === "fa"
                                            ? company.name
                                            : company.englishName
                                    }
                                    style={styles.logoImg}
                                />
                            </div>

                            <div>
                                <p style={styles.brandName}>
                                    {
                                        language === "fa"
                                            ? company.name
                                            : company.englishName
                                    }
                                </p>

                                <p style={styles.brandSub}>
                                    {
                                        language === "fa"
                                            ? company.slogan
                                            : company.slogan_en
                                    }
                                </p>
                            </div>
                        </a>

                        <p style={styles.description} className="description-text">
                            {t.footer.description}
                        </p>
                    </motion.div>

                    {/* ===================================================== */}
                    {/* QUICK LINKS */}
                    {/* ===================================================== */}

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
                            duration: 0.6,
                            delay: 0.1,
                        }}
                    >

                        <h4
                            style={
                                styles.heading
                            }
                        >

                            {
                                t.footer
                                    .quick_links
                            }

                            <span
                                style={
                                    styles.headingLine
                                }
                                className="heading-line"
                            />

                        </h4>

                        <ul
                            style={
                                styles.linkList
                            }
                        >

                            {[
                                "home",
                                "services",
                                "portfolio",
                                "about",
                                "contact",
                            ].map(
                                (key) => (

                                    <li
                                        key={key}
                                    >

                                        <a
                                            href={
                                                key ===
                                                "home"
                                                    ? "/"
                                                    : `/${key}`
                                            }
                                            style={
                                                styles.linkItem
                                            }
                                            className="footer-link"
                                            onMouseEnter={(
                                                e
                                            ) => {

                                                e.currentTarget.style.color =
                                                    "#46A6D9";

                                                e.currentTarget.style.transform =
                                                    "translateX(6px)";

                                            }}
                                            onMouseLeave={(
                                                e
                                            ) => {

                                                e.currentTarget.style.color =
                                                    "rgba(255,255,255,0.58)";

                                                e.currentTarget.style.transform =
                                                    "translateX(0)";

                                            }}
                                        >

                                            {
                                                t
                                                    .navigation[
                                                    key as keyof typeof t.navigation
                                                ]
                                            }

                                        </a>

                                    </li>

                                )
                            )}

                        </ul>

                    </motion.div>

                    {/* ===================================================== */}
                    {/* SERVICES */}
                    {/* ===================================================== */}

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
                            duration: 0.6,
                            delay: 0.2,
                        }}
                    >

                        <h4
                            style={
                                styles.heading
                            }
                        >

                            {
                                t.footer
                                    .services
                            }

                            <span
                                style={
                                    styles.headingLine
                                }
                                className="heading-line"
                            />

                        </h4>

                        <ul
                            style={
                                styles.linkList
                            }
                        >

                            {servicesList.map(
                                (serviceItem) => (

                                    <li
                                        key={
                                            serviceItem.id
                                        }
                                        style={
                                            styles.serviceItem
                                        }
                                        className="service-tag"
                                    >

                                        {
                                            serviceItem
                                                .title
                                        }

                                    </li>

                                )
                            )}

                        </ul>

                    </motion.div>

                    {/* ===================================================== */}
                    {/* CONTACT */}
                    {/* ===================================================== */}

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
                            duration: 0.6,
                            delay: 0.3,
                        }}
                    >

                        <h4
                            style={
                                styles.heading
                            }
                        >

                            {
                                t.footer
                                    .contact
                            }

                            <span
                                style={
                                    styles.headingLine
                                }
                                className="heading-line"
                            />

                        </h4>

                        <div
                            style={
                                styles.contactGroup
                            }
                        >

                            {/* Phone */}

                            <div
                                style={
                                    styles.contactRow
                                }
                                className="contact-item"
                            >

                                <div
                                    style={
                                        styles.iconBox
                                    }
                                    className="icon-box"
                                >

                                    <Phone
                                        style={
                                            styles.icon
                                        }
                                    />

                                </div>

                                <div
                                    style={
                                        styles.contactContent
                                    }
                                >

                                    <span
                                        style={
                                            styles.contactLabel
                                        }
                                    >
                                        {
                                            t.contact
                                                .phone
                                        }
                                    </span>

                                    {(
                                        language === "fa"
                                            ? company.phone
                                            : company.phone_en
                                    ).map((number) => (
                                        <a
                                            key={number}
                                            href={`tel:${number}`}
                                            style={styles.contactText}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color =
                                                    "#46A6D9";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color =
                                                    "rgba(255,255,255,0.67)";
                                            }}
                                        >
                                            {number}
                                        </a>
                                    ))}

                                </div>

                            </div>

                            {/* Email */}

                            <div
                                style={
                                    styles.contactRow
                                }
                                className="contact-item"
                            >

                                <div
                                    style={
                                        styles.iconBox
                                    }
                                    className="icon-box"
                                >

                                    <Mail
                                        style={
                                            styles.icon
                                        }
                                    />

                                </div>

                                <div
                                    style={
                                        styles.contactContent
                                    }
                                >

                                    <span
                                        style={
                                            styles.contactLabel
                                        }
                                    >
                                        {
                                            t.contact
                                                .email
                                        }
                                    </span>

                                    <a
                                        href={
                                            `mailto:${company.supportEmail}`
                                        }
                                        style={
                                            styles.contactText
                                        }
                                        onMouseEnter={(
                                            e
                                        ) => {

                                            e.currentTarget.style.color =
                                                "#46A6D9";

                                        }}
                                        onMouseLeave={(
                                            e
                                        ) => {

                                            e.currentTarget.style.color =
                                                "rgba(255,255,255,0.67)";

                                        }}
                                    >

                                        {
                                            company.supportEmail
                                        }

                                    </a>

                                </div>

                            </div>

                            {/* Address */}

                            <div
                                style={
                                    styles.contactRow
                                }
                                className="contact-item"
                            >

                                <div
                                    style={
                                        styles.iconBox
                                    }
                                    className="icon-box"
                                >

                                    <MapPin
                                        style={
                                            styles.icon
                                        }
                                    />

                                </div>

                                <div
                                    style={
                                        styles.contactContent
                                    }
                                >

                                    <span
                                        style={
                                            styles.contactLabel
                                        }
                                    >
                                        {
                                            t.footer
                                                .contact
                                        }
                                    </span>

                                    {(
                                        language === "fa"
                                            ? company.address
                                            : company.address_en
                                    ).map((line) => (
                                        <p
                                            key={line}
                                            style={styles.addressLine}
                                        >
                                            {line}
                                        </p>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

                {/* ========================================================= */}
                {/* CONTACT FORM */}
                {/* ========================================================= */}

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
                        duration: 0.7,
                        delay: 0.15,
                    }}
                    style={{
                        marginTop: "55px",
                    }}
                >

                    <div
                        style={
                            styles.formCard
                        }
                        className="form-card"
                    >

                        <div
                            style={
                                styles.formGlow
                            }
                        />

                        <div
                            style={
                                styles.formHeader
                            }
                        >

                            <h2
                                style={
                                    styles.formTitle
                                }
                            >
                                {
                                    t.contact
                                        .formTitle
                                }
                            </h2>

                            <p
                                style={
                                    styles.formSub
                                }
                            >
                                {
                                    t.contact
                                        .formDescription
                                }
                            </p>

                        </div>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            style={
                                styles.form
                            }
                        >

                            {/* Name */}

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    t.contact.name
                                }
                                style={
                                    styles.input
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            />

                            {/* Phone */}

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) =>
                                    setPhone(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    t.contact.phone
                                }
                                style={
                                    styles.input
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            />

                            {/* Email */}

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    t.contact.email
                                }
                                style={
                                    styles.input
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            />

                            {/* Service */}

                            <select
                                value={service}
                                onChange={(e) =>
                                    setService(
                                        e.target.value
                                    )
                                }
                                style={
                                    styles.select
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            >

                                <option
                                    value=""
                                    style={{
                                        backgroundColor:
                                            "#13294a",
                                        color:
                                            "#ffffff",
                                    }}
                                >
                                    {
                                        t.contact
                                            .selectService
                                    }
                                </option>

                                {servicesList.map(
                                    (
                                        serviceItem
                                    ) => (

                                        <option
                                            key={
                                                serviceItem.id
                                            }
                                            value={
                                                serviceItem.title
                                            }
                                            style={{
                                                backgroundColor:
                                                    "#13294a",
                                                color:
                                                    "#ffffff",
                                            }}
                                        >
                                            {
                                                serviceItem
                                                    .title
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                            {/* Subject */}

                            <input
                                type="text"
                                value={subject}
                                onChange={(e) =>
                                    setSubject(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    t.contact.subject
                                }
                                style={
                                    styles.input
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            />

                            {/* Message */}

                            <textarea
                                rows={4}
                                value={message}
                                onChange={(e) =>
                                    setMessage(
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    t.contact.message
                                }
                                style={
                                    styles.textarea
                                }
                                className="form-input"
                                onFocus={
                                    handleFocus
                                }
                                onBlur={
                                    handleBlur
                                }
                                required
                            />

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                style={{
                                    ...styles.submitButton,
                                    opacity:
                                        loading
                                            ? 0.65
                                            : 1,
                                    cursor:
                                        loading
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                                className="submit-btn"
                                onMouseEnter={(
                                    e
                                ) => {

                                    if (!loading) {

                                        e.currentTarget.style.transform =
                                            "translateY(-3px)";

                                        e.currentTarget.style.boxShadow =
                                            "0 20px 40px rgba(24,59,115,0.45), 0 0 60px rgba(70,166,217,0.15)";

                                    }

                                }}
                                onMouseLeave={(
                                    e
                                ) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 12px 28px rgba(24,59,115,0.30)";

                                }}
                            >

                                <span>
                                    {
                                        loading
                                            ? t.contact
                                                .sending
                                            : t.contact
                                                .send
                                    }
                                </span>

                                <Send
                                    size={17}
                                />

                            </button>

                        </form>

                    </div>

                </motion.div>

                {/* ========================================================= */}
                {/* BOTTOM BAR */}
                {/* ========================================================= */}

                <div
                    style={
                        styles.bottomBar
                    }
                    className="footer-bottom"
                >

                    <p
                        style={
                            styles.copyright
                        }
                    >

                        © {currentYear}{" "}

                        {
                            t.footer
                                .brand_name
                        }

                        .{" "}

                        {
                            t.footer
                                .copyright
                        }

                    </p>

                    <div
                        style={
                            styles.socialGroup
                        }
                    >

                        {/* Facebook */}

                        <a
                            href={
                                company.social
                                    ?.facebook ||
                                "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={
                                styles.socialLink
                            }
                            className="social-icon"
                            aria-label={
                                t.footer.social
                                    .facebook
                            }
                            onMouseEnter={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "#46A6D9";

                                e.currentTarget.style.background =
                                    "rgba(70,166,217,0.15)";

                                e.currentTarget.style.transform =
                                    "translateY(-4px) scale(1.1)";

                            }}
                            onMouseLeave={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "rgba(255,255,255,0.52)";

                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.045)";

                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                            }}
                        >

                            <Facebook
                                size={18}
                            />

                        </a>

                        {/* Instagram */}

                        <a
                            href={
                                company.social
                                    ?.instagram ||
                                "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={
                                styles.socialLink
                            }
                            className="social-icon"
                            aria-label={
                                t.footer.social
                                    .instagram
                            }
                            onMouseEnter={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "#46A6D9";

                                e.currentTarget.style.background =
                                    "rgba(70,166,217,0.15)";

                                e.currentTarget.style.transform =
                                    "translateY(-4px) scale(1.1)";

                            }}
                            onMouseLeave={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "rgba(255,255,255,0.52)";

                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.045)";

                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                            }}
                        >

                            <Instagram
                                size={18}
                            />

                        </a>

                        {/* LinkedIn */}

                        <a
                            href={
                                company.social
                                    ?.linkedin ||
                                "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            style={
                                styles.socialLink
                            }
                            className="social-icon"
                            aria-label={
                                t.footer.social
                                    .linkedin
                            }
                            onMouseEnter={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "#46A6D9";

                                e.currentTarget.style.background =
                                    "rgba(70,166,217,0.15)";

                                e.currentTarget.style.transform =
                                    "translateY(-4px) scale(1.1)";

                            }}
                            onMouseLeave={(
                                e
                            ) => {

                                e.currentTarget.style.color =
                                    "rgba(255,255,255,0.52)";

                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.045)";

                                e.currentTarget.style.transform =
                                    "translateY(0) scale(1)";

                            }}
                        >

                            <Linkedin
                                size={18}
                            />

                        </a>

                        {/* Scroll To Top */}

                        <button
                            type="button"
                            onClick={
                                scrollToTop
                            }
                            style={
                                styles.scrollButton
                            }
                            className="scroll-top-btn"
                            aria-label={
                                t.footer
                                    .scroll_to_top
                            }
                            title={
                                t.footer
                                    .scroll_to_top
                            }
                            onMouseEnter={(
                                e
                            ) => {

                                e.currentTarget.style.background =
                                    "rgba(70,166,217,0.2)";

                                e.currentTarget.style.color =
                                    "#46A6D9";

                                e.currentTarget.style.transform =
                                    "translateY(-4px)";

                            }}
                            onMouseLeave={(
                                e
                            ) => {

                                e.currentTarget.style.background =
                                    "rgba(255,255,255,0.06)";

                                e.currentTarget.style.color =
                                    "#ffffff";

                                e.currentTarget.style.transform =
                                    "translateY(0)";

                            }}
                        >

                            <ArrowUp
                                size={18}
                            />

                        </button>

                    </div>

                </div>

            </div>

        </footer>

    );
}

// ============================================================
// STYLES OBJECT - KEPT EXACTLY AS ORIGINAL
// ============================================================

const styles = {

    footer: {
        position: "relative" as const,
        overflow: "hidden" as const,
        background:
            "linear-gradient(135deg, #07111f 0%, #0f172a 45%, #10264b 100%)",
        color: "#ffffff",
        borderTop:
            "1px solid rgba(255,255,255,0.08)",
        fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    container: {
        position: "relative" as const,
        zIndex: 5,
        width: "100%",
        maxWidth: "1380px",
        margin: "0 auto",
        padding:
            "80px 28px 32px",
        boxSizing: "border-box" as const,
    },

    glowOne: {
        position: "absolute" as const,
        top: "-180px",
        left: "-120px",
        width: "480px",
        height: "480px",
        borderRadius: "50%",
        background:
            "rgba(70,166,217,0.13)",
        filter: "blur(100px)",
        pointerEvents:
            "none" as const,
    },

    glowTwo: {
        position: "absolute" as const,
        right: "-160px",
        bottom: "-180px",
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background:
            "rgba(24,59,115,0.28)",
        filter: "blur(110px)",
        pointerEvents:
            "none" as const,
    },

    mainGrid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
        gap: "46px",
        alignItems: "start",
    },

    companyColumn: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "20px",
    },

    logoLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: "15px",
        textDecoration: "none",
        color: "#ffffff",
        width: "fit-content",
    },

    logoWrapper: {
        width: "64px",
        height: "64px",
        borderRadius: "18px",
        padding: "3px",
        background:
            "linear-gradient(135deg, #46A6D9, #183B73)",
        boxShadow:
            "0 12px 30px rgba(0,0,0,0.30)",
        boxSizing: "border-box" as const,
    },

    logoImg: {
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        objectFit: "cover" as const,
        display: "block",
    },

    brandName: {
        margin: 0,
        fontSize: "21px",
        fontWeight: 800,
        lineHeight: 1.2,
        color: "#ffffff",
    },

    brandSub: {
        margin: "5px 0 0",
        fontSize: "12px",
        fontWeight: 500,
        color:
            "rgba(255,255,255,0.48)",
        letterSpacing:
            "0.08em",
        textTransform:
            "uppercase" as const,
    },

    description: {
        margin: 0,
        maxWidth: "330px",
        color:
            "rgba(255,255,255,0.62)",
        fontSize: "14px",
        lineHeight: 1.9,
    },

    heading: {
        margin: "0 0 22px",
        fontSize: "15px",
        fontWeight: 800,
        color: "#ffffff",
        position: "relative" as const,
        paddingBottom: "10px",
    },

    headingLine: {
        position: "absolute" as const,
        left: 0,
        bottom: 0,
        width: "34px",
        height: "2px",
        borderRadius: "10px",
        background:
            "linear-gradient(90deg, #46A6D9, #183B73)",
    },

    linkList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column" as const,
        gap: "13px",
    },

    linkItem: {
        display: "inline-flex",
        alignItems: "center",
        color:
            "rgba(255,255,255,0.58)",
        textDecoration: "none",
        fontSize: "14px",
        transition:
            "all 0.25s ease",
    },

    serviceItem: {
        color:
            "rgba(255,255,255,0.58)",
        fontSize: "14px",
        lineHeight: 1.5,
    },

    contactGroup: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "18px",
    },

    contactRow: {
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
    },

    iconBox: {
        width: "36px",
        height: "36px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "11px",
        background:
            "rgba(70,166,217,0.10)",
        border:
            "1px solid rgba(70,166,217,0.16)",
    },

    icon: {
        width: "17px",
        height: "17px",
        color: "#46A6D9",
    },

    contactContent: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "3px",
        minWidth: 0,
    },

    contactLabel: {
        fontSize: "11px",
        fontWeight: 700,
        color:
            "rgba(255,255,255,0.38)",
        textTransform:
            "uppercase" as const,
        letterSpacing:
            "0.06em",
    },

    contactText: {
        color:
            "rgba(255,255,255,0.67)",
        textDecoration: "none",
        fontSize: "13px",
        lineHeight: 1.6,
        transition:
            "color 0.2s ease",
    },

    addressLine: {
        margin: 0,
        color:
            "rgba(255,255,255,0.67)",
        fontSize: "13px",
        lineHeight: 1.6,
    },

    formCard: {
        position: "relative" as const,
        overflow: "hidden" as const,
        borderRadius: "26px",
        padding: "30px",
        background:
            "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
        border:
            "1px solid rgba(255,255,255,0.10)",
        boxShadow:
            "0 25px 70px rgba(0,0,0,0.28)",
        backdropFilter:
            "blur(20px)",
        WebkitBackdropFilter:
            "blur(20px)",
    },

    formGlow: {
        position: "absolute" as const,
        top: "-100px",
        right: "-90px",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background:
            "rgba(70,166,217,0.14)",
        filter: "blur(65px)",
        pointerEvents:
            "none" as const,
    },

    formHeader: {
        position: "relative" as const,
        zIndex: 2,
    },

    formTitle: {
        margin: 0,
        fontSize: "23px",
        fontWeight: 800,
        color: "#ffffff",
    },

    formSub: {
        margin:
            "8px 0 0",
        color:
            "rgba(255,255,255,0.55)",
        fontSize: "13px",
        lineHeight: 1.7,
    },

    form: {
        position: "relative" as const,
        zIndex: 2,
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
        marginTop: "22px",
    },

    input: {
        width: "100%",
        minHeight: "48px",
        boxSizing: "border-box" as const,
        padding:
            "0 16px",
        borderRadius: "13px",
        border:
            "1px solid rgba(255,255,255,0.09)",
        background:
            "rgba(255,255,255,0.055)",
        color: "#ffffff",
        fontSize: "13px",
        outline: "none",
        fontFamily: "inherit",
        transition:
            "all 0.25s ease",
    },

    select: {
        width: "100%",
        minHeight: "48px",
        boxSizing: "border-box" as const,
        padding:
            "0 16px",
        borderRadius: "13px",
        border:
            "1px solid rgba(255,255,255,0.09)",
        background:
            "#13294a",
        color: "#ffffff",
        fontSize: "13px",
        outline: "none",
        fontFamily: "inherit",
        transition:
            "all 0.25s ease",
    },

    textarea: {
        width: "100%",
        boxSizing: "border-box" as const,
        padding:
            "14px 16px",
        borderRadius: "13px",
        border:
            "1px solid rgba(255,255,255,0.09)",
        background:
            "rgba(255,255,255,0.055)",
        color: "#ffffff",
        fontSize: "13px",
        lineHeight: 1.6,
        outline: "none",
        resize: "vertical" as const,
        minHeight: "105px",
        fontFamily: "inherit",
        transition:
            "all 0.25s ease",
    },

    submitButton: {
        width: "100%",
        minHeight: "50px",
        border: "none",
        borderRadius: "14px",
        background:
            "linear-gradient(135deg, #183B73 0%, #46A6D9 100%)",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        cursor: "pointer",
        boxShadow:
            "0 12px 28px rgba(24,59,115,0.30)",
        transition:
            "all 0.25s ease",
        fontFamily: "inherit",
    },

    bottomBar: {
        marginTop: "60px",
        paddingTop: "26px",
        borderTop:
            "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent:
            "space-between",
        gap: "20px",
        flexWrap: "wrap" as const,
    },

    copyright: {
        margin: 0,
        color:
            "rgba(255,255,255,0.38)",
        fontSize: "12px",
        lineHeight: 1.6,
    },

    socialGroup: {
        display: "flex",
        alignItems: "center",
        gap: "9px",
    },

    socialLink: {
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "11px",
        color:
            "rgba(255,255,255,0.52)",
        background:
            "rgba(255,255,255,0.045)",
        border:
            "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
        transition:
            "all 0.25s ease",
    },

    scrollButton: {
        width: "40px",
        height: "40px",
        marginLeft: "5px",
        borderRadius: "11px",
        border:
            "1px solid rgba(255,255,255,0.08)",
        background:
            "rgba(255,255,255,0.06)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition:
            "all 0.25s ease",
    },
};