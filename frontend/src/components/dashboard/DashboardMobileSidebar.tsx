"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    LogOut,
    X,
} from "lucide-react";

import {
    company,
} from "@/config/company";

import {
    getDashboardNavigation,
} from "@/config/dashboard";

import {
    useLanguage,
} from "@/context/language-context";

import {
    useAuth,
} from "@/context/AuthContext";

interface DashboardMobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function DashboardMobileSidebar({
    open,
    onClose,
}: DashboardMobileSidebarProps) {
    const {
        language,
        t,
    } = useLanguage();

    const router = useRouter();

    const {
        user,
        logoutUser,
    } = useAuth();

    const navigation =
        getDashboardNavigation(
            user?.role
        );

    async function handleLogout() {
        await logoutUser();
        onClose();
        router.push("/");
    }

    const isRTL =
        language === "fa";

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={onClose}
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/40
                            backdrop-blur-sm
                        "
                    />
                    <motion.aside
                        initial={{
                            x: isRTL ? 320 : -320,
                        }}
                        animate={{
                            x: 0,
                        }}
                        exit={{
                            x: isRTL ? 320 : -320,
                        }}
                        transition={{
                            duration: .25,
                        }}
                        className={`
                            fixed
                            top-0
                            ${isRTL ? "right-0" : "left-0"}
                            z-50
                            flex
                            h-screen
                            w-72
                            flex-col
                            border
                            border-slate-200
                            bg-white
                            shadow-2xl
                        `}
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                border-b
                                border-slate-200
                                px-6
                                py-5
                            "
                        >
                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    text-[#183B73]
                                "
                            >
                                {t.dashboard.mobileMenu}
                            </h2>
                            <button
                                onClick={onClose}
                                className="
                                    rounded-xl
                                    p-2
                                    transition
                                    hover:bg-slate-100
                                "
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav
                            className="
                                flex-1
                                space-y-2
                                p-5
                            "
                        >
                            {navigation.map((item) => {
                                const Icon =
                                    item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            px-4
                                            py-3
                                            text-slate-700
                                            transition
                                            hover:bg-[#183B73]/10
                                            hover:text-[#183B73]
                                        "
                                    >
                                        <Icon
                                            size={20}
                                        />
                                        <span>
                                            {
                                                t.dashboard.sidebar[
                                                    item.key as keyof typeof t.dashboard.sidebar
                                                ]
                                            }
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div
                            className="
                                border-t
                                border-slate-200
                                p-5
                            "
                        >
                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    p-4
                                "
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-gradient-to-br
                                            from-[#183B73]
                                            to-[#46A6D9]
                                            text-lg
                                            font-bold
                                            text-white
                                        "
                                    >
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[#183B73]">
                                            {user?.name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="
                                border-t
                                border-slate-200
                                p-5
                                space-y-4
                            "
                        >
                            <button
                                onClick={handleLogout}
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-2xl
                                    bg-red-50
                                    py-3
                                    font-semibold
                                    text-red-600
                                    transition
                                    hover:bg-red-100
                                "
                            >
                                <LogOut
                                    size={18}
                                />
                                {t.dashboard.sidebar.logout}
                            </button>
                            <p
                                className="
                                    text-center
                                    text-xs
                                    text-slate-500
                                "
                            >
                                {
                                    language === "fa"
                                        ? company.name
                                        : company.englishName
                                }
                                {" © 2026"}
                            </p>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}