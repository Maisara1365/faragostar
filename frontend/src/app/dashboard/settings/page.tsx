"use client";

import {
    useEffect,
    useState,
} from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import Header
    from "@/components/layout/Header";

import Footer
    from "@/components/layout/Footer";

import CompanyInformationForm
    from "@/components/dashboard/settings/CompanyInformationForm";

import BrandingForm
    from "@/components/dashboard/settings/BrandingForm";

import SocialLinksForm
    from "@/components/dashboard/settings/SocialLinksForm";

import WebsiteSettingsForm
    from "@/components/dashboard/settings/WebsiteSettingsForm";

import SEOSettingsForm
    from "@/components/dashboard/settings/SEOSettingsForm";

import SystemSettingsForm
    from "@/components/dashboard/settings/SystemSettingsForm";

import {
    getSettings,
} from "@/services/setting";

import type {
    SettingResponse,
} from "@/types/setting";

import {
    useLanguage,
} from "@/context/language-context";


export default function SettingsPage() {

    const { t } = useLanguage();

    const [
        settings,
        setSettings,
    ] = useState<SettingResponse | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);


    async function loadSettings() {

        try {

            setLoading(true);

            const data =
                await getSettings();

            setSettings(data);

        } catch (error) {

            console.error(
                "Failed to load settings:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadSettings();

    }, []);


    return (

        <AuthGuard
            allowedRoles={[
                "admin",
            ]}
        >

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    background:
                        "linear-gradient(180deg, #020617 0%, #0f172a 45%, #111827 100%)",
                }}
            >

                {/* =========================
                    PUBLIC HEADER
                ========================== */}

                <Header />


                {/* =========================
                    MAIN CONTENT
                ========================== */}

                <main
                    style={{
                        flex: 1,
                        width: "100%",
                    }}
                >

                    <DashboardShell
                        title={
                            t.dashboard.settings.title
                        }
                        description={
                            t.dashboard.settings.subtitle
                        }
                    >

                        <div
                            style={{
                                width: "100%",
                                maxWidth: "1400px",
                                margin: "0 auto",
                                padding:
                                    "20px 16px 60px",
                            }}
                        >


                            {/* =========================
                                SETTINGS INTRO
                            ========================== */}

                            <section
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    marginBottom: "32px",
                                    padding:
                                        "32px",
                                    borderRadius: "24px",
                                    border:
                                        "1px solid rgba(148,163,184,0.16)",
                                    background:
                                        "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.72))",
                                    boxShadow:
                                        "0 20px 60px rgba(0,0,0,0.25)",
                                }}
                            >

                                {/* Decorative glow */}

                                <div
                                    style={{
                                        position: "absolute",
                                        width: "220px",
                                        height: "220px",
                                        borderRadius: "50%",
                                        background:
                                            "rgba(59,130,246,0.10)",
                                        filter:
                                            "blur(70px)",
                                        top: "-100px",
                                        right: "-50px",
                                        pointerEvents:
                                            "none",
                                    }}
                                />


                                <div
                                    style={{
                                        position: "relative",
                                        zIndex: 1,
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "space-between",
                                        gap: "24px",
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                display:
                                                    "inline-flex",
                                                alignItems:
                                                    "center",
                                                gap: "8px",
                                                padding:
                                                    "7px 12px",
                                                marginBottom:
                                                    "14px",
                                                borderRadius:
                                                    "999px",
                                                border:
                                                    "1px solid rgba(96,165,250,0.22)",
                                                background:
                                                    "rgba(59,130,246,0.08)",
                                                color:
                                                    "#93c5fd",
                                                fontSize:
                                                    "12px",
                                                fontWeight:
                                                    600,
                                                letterSpacing:
                                                    "0.04em",
                                            }}
                                        >

                                            <span
                                                style={{
                                                    width:
                                                        "7px",
                                                    height:
                                                        "7px",
                                                    borderRadius:
                                                        "50%",
                                                    background:
                                                        "#60a5fa",
                                                    boxShadow:
                                                        "0 0 12px rgba(96,165,250,0.8)",
                                                }}
                                            />

                                            ADMIN SETTINGS

                                        </div>


                                        <h1
                                            style={{
                                                margin: 0,
                                                color:
                                                    "#f8fafc",
                                                fontSize:
                                                    "clamp(26px, 4vw, 38px)",
                                                fontWeight:
                                                    700,
                                                lineHeight:
                                                    1.2,
                                                letterSpacing:
                                                    "-0.025em",
                                            }}
                                        >
                                            {t.dashboard.settings.title}
                                        </h1>


                                        <p
                                            style={{
                                                margin:
                                                    "12px 0 0",
                                                maxWidth:
                                                    "720px",
                                                color:
                                                    "#94a3b8",
                                                fontSize:
                                                    "15px",
                                                lineHeight:
                                                    1.7,
                                            }}
                                        >
                                            {t.dashboard.settings.subtitle}
                                        </p>

                                    </div>


                                    {/* Status */}

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "12px",
                                            padding:
                                                "14px 18px",
                                            borderRadius:
                                                "16px",
                                            border:
                                                "1px solid rgba(34,197,94,0.18)",
                                            background:
                                                "rgba(34,197,94,0.06)",
                                        }}
                                    >

                                        <span
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                width:
                                                    "38px",
                                                height:
                                                    "38px",
                                                borderRadius:
                                                    "12px",
                                                background:
                                                    "rgba(34,197,94,0.12)",
                                                color:
                                                    "#4ade80",
                                                fontSize:
                                                    "18px",
                                            }}
                                        >
                                            ✓
                                        </span>


                                        <div>

                                            <div
                                                style={{
                                                    color:
                                                        "#e2e8f0",
                                                    fontSize:
                                                        "13px",
                                                    fontWeight:
                                                        600,
                                                }}
                                            >
                                                Settings Center
                                            </div>

                                            <div
                                                style={{
                                                    marginTop:
                                                        "3px",
                                                    color:
                                                        "#64748b",
                                                    fontSize:
                                                        "11px",
                                                }}
                                            >
                                                Manage your website
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </section>


                            {/* =========================
                                SETTINGS OVERVIEW
                            ========================== */}

                            <section
                                style={{
                                    display:
                                        "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit, minmax(180px, 1fr))",
                                    gap: "14px",
                                    marginBottom:
                                        "32px",
                                }}
                            >

                                {[
                                    {
                                        icon: "🏢",
                                        title: "Company",
                                        description:
                                            "Business information",
                                    },
                                    {
                                        icon: "🎨",
                                        title: "Branding",
                                        description:
                                            "Logo and visual identity",
                                    },
                                    {
                                        icon: "🔗",
                                        title: "Social",
                                        description:
                                            "Social media links",
                                    },
                                    {
                                        icon: "🌐",
                                        title: "Website",
                                        description:
                                            "Website configuration",
                                    },
                                    {
                                        icon: "🔍",
                                        title: "SEO",
                                        description:
                                            "Search optimization",
                                    },
                                    {
                                        icon: "⚙️",
                                        title: "System",
                                        description:
                                            "System preferences",
                                    },
                                ].map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            style={{
                                                padding:
                                                    "18px",
                                                borderRadius:
                                                    "18px",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.72)",
                                                transition:
                                                    "all 0.2s ease",
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap:
                                                        "12px",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        width:
                                                            "42px",
                                                        height:
                                                            "42px",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        borderRadius:
                                                            "12px",
                                                        background:
                                                            "rgba(51,65,85,0.55)",
                                                        fontSize:
                                                            "19px",
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>


                                                <div>

                                                    <div
                                                        style={{
                                                            color:
                                                                "#e2e8f0",
                                                            fontSize:
                                                                "13px",
                                                            fontWeight:
                                                                600,
                                                        }}
                                                    >
                                                        {item.title}
                                                    </div>

                                                    <div
                                                        style={{
                                                            marginTop:
                                                                "3px",
                                                            color:
                                                                "#64748b",
                                                            fontSize:
                                                                "11px",
                                                        }}
                                                    >
                                                        {item.description}
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </section>


                            {/* =========================
                                SETTINGS FORMS
                            ========================== */}

                            {loading && (

                                <section
                                    style={{
                                        display:
                                            "flex",
                                        flexDirection:
                                            "column",
                                        gap:
                                            "18px",
                                    }}
                                >

                                    {[1, 2, 3].map(
                                        (item) => (

                                            <div
                                                key={item}
                                                style={{
                                                    height:
                                                        "180px",
                                                    borderRadius:
                                                        "20px",
                                                    border:
                                                        "1px solid rgba(148,163,184,0.10)",
                                                    background:
                                                        "linear-gradient(90deg, rgba(15,23,42,0.8), rgba(30,41,59,0.65), rgba(15,23,42,0.8))",
                                                    animation:
                                                        "settingsPulse 1.8s ease-in-out infinite",
                                                }}
                                            />

                                        )
                                    )}

                                </section>

                            )}


                            {!loading &&
                                settings && (

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            gap:
                                                "24px",
                                        }}
                                    >

                                        {/* Company */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <CompanyInformationForm
                                                setting={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>


                                        {/* Branding */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <BrandingForm
                                                setting={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>


                                        {/* Social Links */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <SocialLinksForm
                                                setting={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>


                                        {/* Website */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <WebsiteSettingsForm
                                                setting={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>


                                        {/* SEO */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <SEOSettingsForm
                                                settings={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>


                                        {/* System */}

                                        <section
                                            style={{
                                                borderRadius:
                                                    "22px",
                                                overflow:
                                                    "hidden",
                                                border:
                                                    "1px solid rgba(148,163,184,0.12)",
                                                background:
                                                    "rgba(15,23,42,0.58)",
                                                boxShadow:
                                                    "0 12px 35px rgba(0,0,0,0.15)",
                                            }}
                                        >

                                            <SystemSettingsForm
                                                settings={
                                                    settings
                                                }
                                                onUpdated={
                                                    loadSettings
                                                }
                                            />

                                        </section>

                                    </div>

                                )}


                            {/* Empty state */}

                            {!loading &&
                                !settings && (

                                    <div
                                        style={{
                                            padding:
                                                "60px 24px",
                                            textAlign:
                                                "center",
                                            borderRadius:
                                                "22px",
                                            border:
                                                "1px solid rgba(239,68,68,0.15)",
                                            background:
                                                "rgba(127,29,29,0.08)",
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize:
                                                    "40px",
                                                marginBottom:
                                                    "16px",
                                            }}
                                        >
                                            ⚠️
                                        </div>

                                        <h3
                                            style={{
                                                margin:
                                                    "0 0 8px",
                                                color:
                                                    "#f8fafc",
                                                fontSize:
                                                    "18px",
                                                fontWeight:
                                                    600,
                                            }}
                                        >
                                            Unable to load settings
                                        </h3>

                                        <p
                                            style={{
                                                margin:
                                                    0,
                                                color:
                                                    "#94a3b8",
                                                fontSize:
                                                    "13px",
                                            }}
                                        >
                                            Please refresh the page and
                                            try again.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={
                                                loadSettings
                                            }
                                            style={{
                                                marginTop:
                                                    "20px",
                                                padding:
                                                    "10px 18px",
                                                borderRadius:
                                                    "10px",
                                                border:
                                                    "1px solid rgba(96,165,250,0.25)",
                                                background:
                                                    "rgba(59,130,246,0.12)",
                                                color:
                                                    "#93c5fd",
                                                cursor:
                                                    "pointer",
                                                fontSize:
                                                    "13px",
                                                fontWeight:
                                                    600,
                                            }}
                                        >
                                            Try Again
                                        </button>

                                    </div>

                                )}

                        </div>

                    </DashboardShell>

                </main>


                {/* =========================
                    PUBLIC FOOTER
                ========================== */}

                <Footer />

            </div>


            {/* =========================
                LOADING ANIMATION
            ========================== */}

            <style jsx>{`

                @keyframes settingsPulse {

                    0% {
                        opacity: 0.45;
                    }

                    50% {
                        opacity: 0.8;
                    }

                    100% {
                        opacity: 0.45;
                    }

                }

            `}</style>

        </AuthGuard>

    );
}