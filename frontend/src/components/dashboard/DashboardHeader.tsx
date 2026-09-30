// Phase 19 — Imports
"use client";

import {
    Search,
    Bell,
    Menu,
    Sparkles,
    User,
    Crown,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/AuthContext";

// Phase 20 — Component
interface DashboardHeaderProps {
    title: string;
    description?: string;
    onOpenMenu?: () => void;
}

export default function DashboardHeader({
    title,
    description,
    onOpenMenu,
}: DashboardHeaderProps) {
    const { t } = useLanguage();
    const { user } = useAuth();

    // Phase 21-26 — Layout with all sections combined
    return (
        <div className="mb-10">
            {/* Main Header Container with Glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(24,59,115,0.08)] p-6 lg:p-8 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(24,59,115,0.15)]">
                
                {/* Decorative Background Elements */}
                <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[#46A6D9]/5 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#183B73]/5 blur-3xl" />
                
                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(24,59,115,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(24,59,115,.8)_1px,transparent_1px)] bg-[size:55px_55px] pointer-events-none" />
                
                {/* Gradient Border Line - Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#46A6D9] to-transparent opacity-50" />

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
                    
                    {/* Phase 22 — Left Side */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <div className="flex h-2.5 w-2.5 rounded-full bg-[#46A6D9] animate-pulse shadow-[0_0_12px_rgba(70,166,217,0.4)]" />
                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#46A6D9]">
                                {t.dashboard.welcome}
                                {", "}
                                <span className="text-[#183B73] font-extrabold bg-gradient-to-r from-[#183B73] to-[#24579D] bg-clip-text text-transparent">
                                    {user?.name}
                                </span>
                            </p>
                            <div className="flex h-2.5 w-2.5 rounded-full bg-[#46A6D9] animate-pulse shadow-[0_0_12px_rgba(70,166,217,0.4)]" />
                        </div>
                        
                        <h1 className="mt-3 text-4xl lg:text-5xl font-extrabold tracking-tight text-[#183B73] flex items-center gap-2">
                            {title}
                            <span className="text-[#46A6D9] inline-flex items-center gap-1">
                                <Sparkles className="h-6 w-6" />
                            </span>
                        </h1>
                        
                        {description && (
                            <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Phase 23 — Right Side */}
                    <div className="flex items-center gap-3 lg:gap-4 flex-wrap">
                        
                        {/* Mobile Menu */}
                        <button
                            onClick={onOpenMenu}
                            className="
                                flex
                                h-11
                                w-11
                                lg:h-12
                                lg:w-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-slate-200/80
                                bg-white/80
                                backdrop-blur-sm
                                shadow-[0_4px_15px_rgba(24,59,115,0.06)]
                                transition-all
                                duration-300
                                hover:bg-[#46A6D9]/10
                                hover:border-[#46A6D9]/30
                                hover:shadow-[0_8px_25px_rgba(24,59,115,0.15)]
                                hover:scale-105
                                lg:hidden
                                relative
                                overflow-hidden
                                group
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 group-hover:from-[#46A6D9]/10 group-hover:via-[#46A6D9]/10 group-hover:to-[#46A6D9]/10 transition-all duration-500" />
                            <Menu
                                className="
                                    h-5
                                    w-5
                                    text-slate-700
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:text-[#46A6D9]
                                    relative
                                    z-10
                                "
                            />
                        </button>

                        {/* Phase 24 — Search Box */}
                        <div
                            className="
                                hidden
                                lg:flex
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-slate-200/80
                                bg-white/80
                                backdrop-blur-sm
                                px-4
                                py-2.5
                                shadow-[0_4px_15px_rgba(24,59,115,0.06)]
                                transition-all
                                duration-300
                                hover:border-[#46A6D9]/30
                                hover:shadow-[0_8px_25px_rgba(24,59,115,0.15)]
                                hover:scale-[1.02]
                                relative
                                group
                                min-w-[200px]
                            "
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 group-hover:from-[#46A6D9]/5 group-hover:via-[#46A6D9]/10 group-hover:to-[#46A6D9]/5 transition-all duration-500" />
                            <Search
                                className="
                                    h-5
                                    w-5
                                    text-slate-400
                                    transition-all
                                    duration-300
                                    group-hover:text-[#46A6D9]
                                    relative
                                    z-10
                                "
                            />
                            <input
                                disabled
                                type="text"
                                placeholder={`${t.dashboard.search} (Coming Soon)`}
                                className="
                                    bg-transparent
                                    outline-none
                                    placeholder:text-slate-400
                                    text-slate-700
                                    font-medium
                                    text-sm
                                    relative
                                    z-10
                                    cursor-not-allowed
                                    opacity-70
                                    flex-1
                                    min-w-[120px]
                                "
                            />
                            <Sparkles
                                className="
                                    h-4
                                    w-4
                                    text-[#46A6D9]/40
                                    relative
                                    z-10
                                    transition-all
                                    duration-500
                                    group-hover:rotate-180
                                    group-hover:text-[#46A6D9]/70
                                    group-hover:scale-110
                                "
                            />
                        </div>

                        {/* Phase 25 — Notification Button */}
                        <button
                            className="
                                relative
                                flex
                                h-11
                                w-11
                                lg:h-12
                                lg:w-12
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-slate-200/80
                                bg-white/80
                                backdrop-blur-sm
                                shadow-[0_4px_15px_rgba(24,59,115,0.06)]
                                transition-all
                                duration-300
                                hover:bg-[#46A6D9]/10
                                hover:border-[#46A6D9]/30
                                hover:shadow-[0_8px_25px_rgba(24,59,115,0.15)]
                                hover:scale-105
                                overflow-hidden
                                group
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 group-hover:from-[#46A6D9]/10 group-hover:via-[#46A6D9]/10 group-hover:to-[#46A6D9]/10 transition-all duration-500" />
                            <Bell
                                className="
                                    h-5
                                    w-5
                                    text-slate-600
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:text-[#46A6D9]
                                    relative
                                    z-10
                                "
                            />
                            <span
                                className="
                                    absolute
                                    -top-1
                                    -right-1
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-[#46A6D9]
                                    to-[#24579D]
                                    text-[10px]
                                    font-bold
                                    text-white
                                    shadow-[0_4px_12px_rgba(70,166,217,0.5)]
                                    animate-pulse
                                    z-20
                                    border-2
                                    border-white
                                "
                            >
                                3
                            </span>
                        </button>

                        {/* Phase 26 — User Card */}
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                lg:gap-4
                                rounded-2xl
                                border
                                border-slate-200/80
                                bg-white/80
                                backdrop-blur-sm
                                px-4
                                lg:px-5
                                py-2.5
                                lg:py-3
                                shadow-[0_4px_15px_rgba(24,59,115,0.06)]
                                transition-all
                                duration-300
                                hover:border-[#46A6D9]/30
                                hover:shadow-[0_8px_25px_rgba(24,59,115,0.15)]
                                hover:scale-[1.02]
                                relative
                                group
                                overflow-hidden
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 group-hover:from-[#46A6D9]/5 group-hover:via-[#46A6D9]/10 group-hover:to-[#46A6D9]/5 transition-all duration-500" />
                            
                            {/* Avatar with Gradient */}
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    lg:h-12
                                    lg:w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gradient-to-br
                                    from-[#183B73]
                                    via-[#24579D]
                                    to-[#46A6D9]
                                    font-extrabold
                                    text-white
                                    text-base
                                    lg:text-lg
                                    shadow-[0_8px_25px_rgba(24,59,115,0.25)]
                                    transition-all
                                    duration-300
                                    group-hover:scale-110
                                    group-hover:shadow-[0_12px_35px_rgba(24,59,115,0.35)]
                                    relative
                                    z-10
                                    flex-shrink-0
                                "
                            >
                                {user?.name?.charAt(0).toUpperCase()}
                                
                                {/* Online Status Dot */}
                                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 lg:h-4 lg:w-4 rounded-full bg-emerald-400 border-2 border-white shadow-[0_4px_10px_rgba(52,211,153,0.4)] animate-pulse" />
                                
                                {/* Role Icon Badge */}
                                {user?.role === "admin" && (
                                    <div className="absolute -top-1 -left-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full bg-[#FFD700] border-2 border-white shadow-[0_4px_10px_rgba(255,215,0,0.4)] flex items-center justify-center">
                                        <Crown className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-[#183B73]" />
                                    </div>
                                )}
                            </div>
                            
                            {/* User Info */}
                            <div className="relative z-10 flex-1 min-w-0">
                                <h3
                                    className="
                                        font-bold
                                        text-slate-900
                                        text-xs
                                        lg:text-sm
                                        transition-colors
                                        duration-300
                                        group-hover:text-[#183B73]
                                        truncate
                                    "
                                >
                                    {user?.name}
                                </h3>
                                <p
                                    className="
                                        text-[10px]
                                        lg:text-xs
                                        text-slate-500
                                        font-medium
                                        transition-colors
                                        duration-300
                                        group-hover:text-slate-600
                                        truncate
                                    "
                                >
                                    {user?.email}
                                </p>
                                <span
                                    className="
                                        mt-1
                                        inline-flex
                                        rounded-full
                                        bg-gradient-to-r
                                        from-[#46A6D9]/10
                                        to-[#46A6D9]/5
                                        px-2
                                        py-0.5
                                        text-[8px]
                                        lg:text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-[#46A6D9]
                                        border
                                        border-[#46A6D9]/20
                                        transition-all
                                        duration-300
                                        group-hover:border-[#46A6D9]/40
                                        group-hover:bg-[#46A6D9]/20
                                    "
                                >
                                    {
                                        user?.role === "admin"
                                            ? "Administrator"
                                            : user?.role === "content_manager"
                                                ? "Content Manager"
                                                : "Customer"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Gradient Bar - matches welcome banner */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#46A6D9]/20 to-transparent" />
            </div>
        </div>
    );
}