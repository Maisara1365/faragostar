"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

import { company } from "@/config/company";
import {
    getDashboardNavigation,
} from "@/config/dashboard";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";

export default function DashboardSidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const { t, language } = useLanguage();

    const isRTL = language === "fa";

    const {
        user,
        logoutUser,
    } = useAuth();

    const navigation = getDashboardNavigation(
        user?.role
    );

    if (!user) {
        return null;
    }

    async function handleLogout() {

        await logoutUser();

        router.push("/");

    }

    return (
        <aside
            dir={isRTL ? "rtl" : "ltr"}
            style={{
                position: "sticky",
                top: "24px",
                display: "flex",
                height: "calc(100vh - 48px)",
                width: "280px",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
                marginTop: "110px",
            }}
        >
            {/* Decorative gradient borders */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #183B73, #46A6D9, #183B73)",
                backgroundSize: "200% 100%",
                animation: "gradientMove 3s ease infinite",
                zIndex: 10,
            }} />
            <style jsx>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>

            {/* Company Branding */}
            <div
                style={{
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    padding: "32px 28px 28px",
                }}
            >
                {/* Background Glow Effects */}
                <div
                    style={{
                        position: "absolute",
                        top: "-80px",
                        right: "-80px",
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(70,166,217,0.15) 0%, transparent 70%)",
                        filter: "blur(60px)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "-60px",
                        left: "-60px",
                        height: "180px",
                        width: "180px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(24,59,115,0.15) 0%, transparent 70%)",
                        filter: "blur(60px)",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: "300px",
                        width: "300px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(70,166,217,0.05) 0%, transparent 70%)",
                        filter: "blur(80px)",
                        pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", zIndex: 10 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        {/* Company Logo with Decorative Round Frame */}
                        <div
                            style={{
                                display: "flex",
                                height: "88px",
                                width: "88px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                boxShadow: "0 12px 40px rgba(24,59,115,0.4), inset 0 2px 8px rgba(255,255,255,0.3)",
                                position: "relative",
                                overflow: "hidden",
                                padding: "12px",
                                flexShrink: 0,
                            }}
                        >
                            {/* Enhanced decorative inner glow */}
                            <div style={{
                                position: "absolute",
                                top: "-40px",
                                right: "-40px",
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute",
                                bottom: "-30px",
                                left: "-30px",
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                                pointerEvents: "none",
                            }} />
                            
                            {/* Brighter pulsing inner glow */}
                            <div style={{
                                position: "absolute",
                                inset: "4px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3), rgba(70,166,217,0.1) 50%, transparent 80%)",
                                pointerEvents: "none",
                                animation: "pulse 2s ease-in-out infinite",
                            }} />
                            
                            {/* Main rotating border with enhanced glow */}
                            <div style={{
                                position: "absolute",
                                inset: "-4px",
                                borderRadius: "50%",
                                padding: "4px",
                                background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.7), #46A6D9, rgba(255,255,255,0.7), transparent)",
                                animation: "spin 3s linear infinite",
                                pointerEvents: "none",
                                boxShadow: "0 0 30px rgba(70,166,217,0.3)",
                            }}>
                                <div style={{
                                    position: "absolute",
                                    inset: "4px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                }} />
                            </div>
                            
                            {/* Secondary rotating border with different speed */}
                            <div style={{
                                position: "absolute",
                                inset: "-8px",
                                borderRadius: "50%",
                                padding: "3px",
                                background: "conic-gradient(from 180deg, transparent, rgba(255,255,255,0.4), transparent, rgba(70,166,217,0.4), transparent)",
                                animation: "spinReverse 5s linear infinite",
                                pointerEvents: "none",
                            }}>
                                <div style={{
                                    position: "absolute",
                                    inset: "3px",
                                    borderRadius: "50%",
                                    background: "transparent",
                                }} />
                            </div>

                            {/* Bright outer glow ring */}
                            <div style={{
                                position: "absolute",
                                inset: "-12px",
                                borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(70,166,217,0.15) 0%, transparent 70%)",
                                animation: "pulseGlow 2.5s ease-in-out infinite",
                                pointerEvents: "none",
                            }} />

                            {/* Sparkle effects */}
                            <div style={{
                                position: "absolute",
                                top: "8px",
                                right: "12px",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.8)",
                                boxShadow: "0 0 20px rgba(255,255,255,0.6)",
                                animation: "sparkle 2s ease-in-out infinite",
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute",
                                bottom: "12px",
                                left: "8px",
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.6)",
                                boxShadow: "0 0 15px rgba(255,255,255,0.4)",
                                animation: "sparkle 2.5s ease-in-out infinite 0.5s",
                                pointerEvents: "none",
                            }} />
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                right: "6px",
                                width: "3px",
                                height: "3px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.5)",
                                boxShadow: "0 0 12px rgba(255,255,255,0.3)",
                                animation: "sparkle 3s ease-in-out infinite 1s",
                                pointerEvents: "none",
                            }} />
                            
                            <Image
                                src="/images/company/logo.png"
                                alt={company.name}
                                width={64}
                                height={64}
                                style={{
                                    width: "auto",
                                    height: "auto",
                                    maxWidth: "64px",
                                    maxHeight: "64px",
                                    objectFit: "contain",
                                    position: "relative",
                                    zIndex: 2,
                                    borderRadius: "50%",
                                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
                                }}
                                priority
                            />
                        </div>
                        <div
                            style={{
                                flex: 1,
                                minWidth: 0,
                                overflow: "visible",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "800",
                                    background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    letterSpacing: "-0.3px",
                                    lineHeight: 1.25,
                                    whiteSpace: "normal",
                                    overflow: "visible",
                                    textOverflow: "clip",
                                    wordBreak: "break-word",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {language === "fa"
                                    ? company.name
                                    : company.englishName}
                            </h2>
                            <p
                                style={{
                                    marginTop: "4px",
                                    fontSize: "13px",
                                    color: "#64748b",
                                    fontWeight: "500",
                                    letterSpacing: "0.3px",
                                }}
                            >
                                {t.dashboard.title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav
                style={{
                    flex: 1,
                    padding: "24px 16px 16px",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    minHeight: 0,
                }}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    width: "100%",
                }}>
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        const translatedLabel =
                            t.dashboard.sidebar[
                                item.key as keyof typeof t.dashboard.sidebar
                            ];

                        const label =
                            translatedLabel ||
                            item.key
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (char) => char.toUpperCase());

                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                style={{ 
                                    display: "block",
                                    width: "100%",
                                }}
                            >
                                <motion.div
                                    whileHover={{
                                        x: isRTL ? -6 : 6,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "14px",
                                        overflow: "hidden",
                                        borderRadius: "16px",
                                        padding: "12px 18px",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        background: active
                                            ? "linear-gradient(135deg, #183B73, #46A6D9)"
                                            : "transparent",
                                        color: active ? "#fff" : "#475569",
                                        boxShadow: active
                                            ? "0 8px 24px rgba(24,59,115,0.25)"
                                            : "none",
                                        cursor: "pointer",
                                        width: "100%",
                                    }}
                                    className="nav-item"
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="dashboard-active"
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                height: "60%",
                                                width: "4px",
                                                borderRadius: "0 4px 4px 0",
                                                background: "#fff",
                                            }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            display: "flex",
                                            height: "38px",
                                            width: "38px",
                                            minWidth: "38px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "12px",
                                            transition: "all 0.3s ease",
                                            background: active
                                                ? "rgba(255,255,255,0.2)"
                                                : "rgba(71,85,105,0.08)",
                                            color: active ? "#fff" : "#475569",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon style={{ height: "20px", width: "20px" }} />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: active ? "700" : "600",
                                            letterSpacing: "0.2px",
                                            flex: 1,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            minWidth: 0,
                                            display: "block",
                                        }}
                                    >
                                        {label}
                                    </span>
                                    {active && (
                                        <span style={{
                                            fontSize: "10px",
                                            fontWeight: "600",
                                            padding: "2px 10px",
                                            borderRadius: "12px",
                                            background: "rgba(255,255,255,0.2)",
                                            color: "#fff",
                                            flexShrink: 0,
                                        }}>
                                            •
                                        </span>
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User Card */}
            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.3)",
                    padding: "20px 20px 12px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 100%)",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.7)",
                        padding: "16px 18px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                display: "flex",
                                height: "52px",
                                width: "52px",
                                minWidth: "52px",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "16px",
                                background: "linear-gradient(135deg, #183B73, #46A6D9)",
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#fff",
                                boxShadow: "0 8px 20px rgba(24,59,115,0.25)",
                                flexShrink: 0,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div style={{
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.15)",
                            }} />
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        {/* User */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4
                                style={{
                                    fontWeight: "700",
                                    color: "#183B73",
                                    fontSize: "15px",
                                    lineHeight: 1.2,
                                    marginBottom: "2px",
                                    letterSpacing: "-0.2px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {user?.name}
                            </h4>
                            <p
                                style={{
                                    fontSize: "12px",
                                    color: "#94a3b8",
                                    fontWeight: "500",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {user?.email}
                            </p>
                            <div
                                style={{
                                    marginTop: "6px",
                                    display: "inline-flex",
                                    padding: "2px 12px",
                                    borderRadius: "20px",
                                    background: "linear-gradient(135deg, rgba(70,166,217,0.12), rgba(24,59,115,0.08))",
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    letterSpacing: "0.5px",
                                    color: "#183B73",
                                    textTransform: "uppercase",
                                }}
                            >
                                {user?.role === "admin"
                                    ? "Administrator"
                                    : user?.role === "content_manager"
                                        ? "Content Manager"
                                        : "Customer"}
                            </div>
                        </div>

                        {/* Status indicator */}
                        <div style={{
                            width: "8px",
                            height: "8px",
                            minWidth: "8px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            boxShadow: "0 0 12px rgba(34,197,94,0.4)",
                            flexShrink: 0,
                        }} />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div
                style={{
                    margin: "12px 24px 8px",
                    borderTop: "1px solid rgba(226,232,240,0.6)",
                    flexShrink: 0,
                }}
            />

            {/* Logout Button */}
            <div style={{ padding: "8px 20px 20px", flexShrink: 0 }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "14px",
                        borderRadius: "20px",
                        border: "1px solid rgba(239,68,68,0.15)",
                        background: "rgba(254,242,242,0.5)",
                        padding: "12px 18px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                    }}
                    className="logout-btn"
                >
                    <div
                        style={{
                            display: "flex",
                            height: "40px",
                            width: "40px",
                            minWidth: "40px",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "14px",
                            background: "rgba(239,68,68,0.12)",
                            transition: "all 0.3s ease",
                            flexShrink: 0,
                        }}
                        className="logout-icon"
                    >
                        <LogOut
                            style={{
                                height: "20px",
                                width: "20px",
                                color: "#ef4444",
                            }}
                        />
                    </div>
                    <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                        <p
                            style={{
                                fontWeight: "700",
                                color: "#dc2626",
                                fontSize: "14px",
                                letterSpacing: "-0.2px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {t.dashboard.sidebar.logout}
                        </p>
                        <p
                            style={{
                                fontSize: "11px",
                                color: "#f87171",
                                fontWeight: "500",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {t.dashboard.sidebar.logoutDescription}
                        </p>
                    </div>
                    <span style={{
                        fontSize: "16px",
                        opacity: 0.3,
                        transition: "transform 0.3s ease",
                        flexShrink: 0,
                    }}
                    className="logout-arrow"
                    >
                        →
                    </span>
                </button>
            </div>

            <style jsx>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                @keyframes spinReverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.08);
                    }
                }
                @keyframes pulseGlow {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(0.95);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }
                @keyframes sparkle {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(0.8);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }
                .nav-item:hover {
                    background: rgba(71, 85, 105, 0.06);
                }
                .logout-btn:hover {
                    background: rgba(254, 242, 242, 0.8);
                    border-color: rgba(239, 68, 68, 0.3);
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.1);
                }
                .logout-btn:hover .logout-icon {
                    background: rgba(239, 68, 68, 0.2);
                    transform: scale(1.05);
                }
                .logout-btn:hover .logout-arrow {
                    transform: translateX(4px);
                    opacity: 0.6;
                }
                nav::-webkit-scrollbar {
                    width: 4px;
                }
                nav::-webkit-scrollbar-track {
                    background: transparent;
                }
                nav::-webkit-scrollbar-thumb {
                    background: rgba(71, 85, 105, 0.2);
                    border-radius: 10px;
                }
                nav::-webkit-scrollbar-thumb:hover {
                    background: rgba(71, 85, 105, 0.3);
                }
            `}</style>
        </aside>
    );
}