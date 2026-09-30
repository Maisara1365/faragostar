"use client";

import {
    ShoppingCart,
    Loader2,
    BriefcaseBusiness,
    Image as ImageIcon,
    Star,
    TrendingUp,
    BarChart3,
    Zap,
    Activity,
    Rocket,
    Sparkles,
} from "lucide-react";

import { useLanguage } from "@/context/language-context";

import DashboardWelcome from "@/components/dashboard/home/DashboardWelcome";
import DashboardQuickStats from "@/components/dashboard/home/DashboardQuickStats";
import DashboardQuickActions from "@/components/dashboard/home/DashboardQuickActions";

import RecentOrdersCard, {
    DashboardOrder,
} from "@/components/dashboard/home/RecentOrdersCard";

import RecentMessagesCard, {
    DashboardMessage,
} from "@/components/dashboard/home/RecentMessagesCard";

import type { Order } from "@/types/order";
import type { Conversation } from "@/types/conversation";

interface ContentManagerDashboardProps {
    name: string;

    stats?: {
        activeOrders?: number;
        totalPortfolio?: number;
        totalServices?: number;
        totalTestimonials?: number;
    };

    orders?: Order[];
    conversations?: Conversation[];
}

export default function ContentManagerDashboard({
    name,
    stats,
    orders,
    conversations,
}: ContentManagerDashboardProps) {
    const { language } = useLanguage();

    const isPersian =
        language === "fa";

    const text = isPersian
        ? {
              overview: "نمای کلی داشبورد",
              detailedStatistics: "آمار تفصیلی",
              overviewDescription:
                  "سفارش‌های فعال و محتوای وب‌سایت را مدیریت و عملکرد بخش محتوا را پیگیری کنید.",

              contentActivity: "محتوا و فعالیت",
              contentActivityDescription:
                  "نمای کلی سفارش‌های فعال و محتوای عمومی وب‌سایت.",

              activeOrders: "سفارش‌های فعال",
              portfolio: "نمونه‌کارها",
              services: "خدمات",
              testimonials: "نظرات مشتریان",

              quickActions: "اقدامات سریع",
              quickActionsDescription:
                  "به سرعت به بخش‌های مختلف مدیریت محتوا دسترسی پیدا کنید.",

              recentActivity: "فعالیت‌های اخیر",
              latestActivity: "آخرین فعالیت‌ها",
              recentActivityDescription:
                  "آخرین سفارش‌ها و پیام‌های مشتریان را پیگیری کنید.",

              unknownCustomer: "مشتری نامشخص",
              unknownService: "خدمت نامشخص",
              noSubject: "بدون موضوع",
              customer: "مشتری",
              noMessages: "هنوز پیامی وجود ندارد",
          }
        : {
              overview: "Dashboard Overview",
              detailedStatistics: "Detailed Statistics",
              overviewDescription:
                  "Manage active orders and website content while monitoring content activity.",

              contentActivity: "Content & Activity",
              contentActivityDescription:
                  "Overview of active orders and the company's public website content.",

              activeOrders: "Active Orders",
              portfolio: "Portfolio",
              services: "Services",
              testimonials: "Testimonials",

              quickActions: "Quick Actions",
              quickActionsDescription:
                  "Quickly access different content management sections.",

              recentActivity: "Recent Activity",
              latestActivity: "Latest Activity",
              recentActivityDescription:
                  "Keep track of the latest orders and customer messages.",

              unknownCustomer: "Unknown Customer",
              unknownService: "Unknown Service",
              noSubject: "No Subject",
              customer: "Customer",
              noMessages: "No messages yet",
          };

    const safeStats = stats ?? {};

    const safeOrders = Array.isArray(orders)
        ? orders
        : [];

    const safeConversations = Array.isArray(conversations)
        ? conversations
        : [];

    const activeOrders =
        safeStats.activeOrders ?? 0;

    const totalPortfolio =
        safeStats.totalPortfolio ?? 0;

    const totalServices =
        safeStats.totalServices ?? 0;

    const totalTestimonials =
        safeStats.totalTestimonials ?? 0;

    /*
     * Recent Orders
     */

    const dashboardOrders: DashboardOrder[] =
        safeOrders.map((order) => ({
            id: order.id,

            order_number:
                order.order_number,

            customer_name:
                order.customer?.name ??
                text.unknownCustomer,

            service:
                order.service?.title ??
                text.unknownService,

            status:
                order.status,

            created_at:
                order.created_at,
        }));

    /*
     * Recent Messages
     */

    const dashboardMessages: DashboardMessage[] =
        safeConversations.map((conversation) => ({
            id: conversation.id,

            subject:
                conversation.subject ??
                text.noSubject,

            sender:
                text.customer,

            preview:
                conversation.last_message?.message ??
                text.noMessages,

            created_at:
                conversation.last_message?.created_at ??
                conversation.updated_at,

            unread:
                conversation.unread_count > 0,
        }));

    return (
        <div
            dir={isPersian ? "rtl" : "ltr"}
            className={`space-y-20 ${
                isPersian
                    ? "text-right"
                    : "text-left"
            }`}
        >
            <br />

            {/* ============================================================
                Welcome
            ============================================================ */}

            <DashboardWelcome
                name={name}
                role="content_manager"
            />

            <div className="h-4" />

            {/* ============================================================
                Quick Stats
            ============================================================ */}

            <DashboardQuickStats
                role="content_manager"
                stats={{
                    activeOrders:
                        activeOrders,

                    totalPortfolio:
                        totalPortfolio,

                    totalServices:
                        totalServices,

                    totalTestimonials:
                        totalTestimonials,
                }}
            />

            <div className="h-8" />

            {/* ============================================================
                Detailed Statistics
            ============================================================ */}

            <section className="space-y-14">

                <div className="flex justify-center text-center">
                    <div className="max-w-3xl">

                        <div className="mb-3 flex items-center justify-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#46A6D9]">
                                {text.overview}
                            </span>

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                        </div>

                        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-[#183B73] sm:text-4xl">

                            <TrendingUp className="h-8 w-8 text-[#46A6D9]" />

                            {text.detailedStatistics}

                            <BarChart3 className="h-8 w-8 text-[#46A6D9]" />

                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                            {text.overviewDescription}
                        </p>

                    </div>
                </div>

                <div className="h-2" />

                {/* ========================================================
                    Content & Activity
                ======================================================== */}

                <StatisticsSection
                    title={text.contentActivity}
                    description={text.contentActivityDescription}
                    icon={
                        <BriefcaseBusiness size={20} />
                    }
                    iconClass="
                        bg-gradient-to-br
                        from-[#183B73]/10
                        to-[#46A6D9]/10
                        text-[#183B73]
                        border
                        border-[#183B73]/10
                    "
                    gradient="
                        from-[#183B73]/5
                        to-[#46A6D9]/5
                    "
                >

                    <StatCard
                        label={text.activeOrders}
                        value={safeStats.activeOrders}
                        icon={
                            <Loader2
                                size={20}
                                className="animate-spin"
                            />
                        }
                        iconClass="
                            bg-gradient-to-br
                            from-sky-500/10
                            to-sky-600/10
                            text-sky-600
                        "
                        gradient="hover:from-sky-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.portfolio}
                        value={safeStats.totalPortfolio}
                        icon={
                            <ImageIcon size={20} />
                        }
                        iconClass="
                            bg-gradient-to-br
                            from-violet-500/10
                            to-violet-600/10
                            text-violet-600
                        "
                        gradient="hover:from-violet-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.services}
                        value={safeStats.totalServices}
                        icon={
                            <BriefcaseBusiness size={20} />
                        }
                        iconClass="
                            bg-gradient-to-br
                            from-blue-500/10
                            to-blue-600/10
                            text-blue-600
                        "
                        gradient="hover:from-blue-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.testimonials}
                        value={safeStats.totalTestimonials}
                        icon={<Star size={20} />}
                        iconClass="
                            bg-gradient-to-br
                            from-amber-500/10
                            to-amber-600/10
                            text-amber-600
                        "
                        gradient="hover:from-amber-50/50"
                        isPersian={isPersian}
                    />

                </StatisticsSection>

            </section>

            <div className="h-10" />

            {/* ============================================================
                Quick Actions
            ============================================================ */}

            <section className="space-y-10 pt-6">

                <div className="flex justify-center text-center">

                    <div className="max-w-3xl">

                        <div className="mb-3 flex items-center justify-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#46A6D9]">
                                {text.quickActions}
                            </span>

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                        </div>

                        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-[#183B73] sm:text-4xl">

                            <Rocket className="h-8 w-8 text-[#46A6D9]" />

                            {text.quickActions}

                            <Zap className="h-8 w-8 text-[#183B73]" />

                        </h2>

                        <p className="mt-3 text-sm font-medium text-slate-500">
                            {text.quickActionsDescription}
                        </p>

                    </div>

                </div>

                <div className="relative">

                    <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-[#183B73]/5 via-[#46A6D9]/5 to-[#183B73]/5 blur-3xl" />

                    <div className="relative">
                        <DashboardQuickActions
                            role="content_manager"
                        />
                    </div>

                </div>

            </section>

            <div className="h-10" />

            {/* ============================================================
                Recent Activity
            ============================================================ */}

            <section className="space-y-10 pt-6">

                <div className="flex justify-center text-center">

                    <div className="max-w-3xl">

                        <div className="mb-3 flex items-center justify-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#46A6D9]">
                                {text.recentActivity}
                            </span>

                            <span className="h-2 w-2 rounded-full bg-[#46A6D9] animate-pulse" />

                        </div>

                        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-[#183B73] sm:text-4xl">

                            <Zap className="h-8 w-8 text-[#46A6D9]" />

                            {text.latestActivity}

                            <Activity className="h-8 w-8 text-[#183B73]" />

                        </h2>

                        <p className="mt-3 text-sm font-medium text-slate-500">
                            {text.recentActivityDescription}
                        </p>

                    </div>

                </div>

                <div className="grid gap-8 xl:grid-cols-2">

                    <RecentOrdersCard
                        orders={dashboardOrders}
                    />

                    <RecentMessagesCard
                        messages={dashboardMessages}
                    />

                </div>

            </section>

            <br />
            <br />
            <br />

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Statistics Section
|--------------------------------------------------------------------------
*/

function StatisticsSection({
    title,
    description,
    icon,
    iconClass,
    gradient = "",
    children,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
    gradient?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-200/80
                bg-white
                shadow-[0_10px_35px_rgba(24,59,115,0.06)]
                transition-all
                duration-300
                hover:border-[#46A6D9]/20
                hover:shadow-[0_15px_50px_rgba(24,59,115,0.12)]
                group
                ${
                    gradient
                        ? `bg-gradient-to-br ${gradient}`
                        : ""
                }
            `}
        >

            <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[80px] bg-gradient-to-br from-[#46A6D9]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-[80px] bg-gradient-to-tr from-[#183B73]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex flex-col items-center justify-center gap-4 border-b border-slate-100 px-5 py-8 text-center sm:px-8">

                <Sparkles className="absolute right-4 top-2 h-4 w-4 text-[#46A6D9]/20 transition-transform duration-500 group-hover:rotate-180" />

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        shadow-lg
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:shadow-xl
                        ${iconClass}
                    `}
                >
                    {icon}
                </div>

                <div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-800">
                        {title}
                    </h3>

                    <p className="mx-auto mt-1 max-w-xl text-xs font-medium leading-5 text-slate-500">
                        {description}
                    </p>

                </div>

            </div>

            <div className="flex flex-wrap items-stretch justify-center gap-px bg-gradient-to-r from-slate-100 via-slate-200/50 to-slate-100">
                {children}
            </div>

        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Statistic Card
|--------------------------------------------------------------------------
*/

function StatCard({
    label,
    value,
    prefix,
    icon,
    iconClass,
    gradient = "",
    highlight = false,
    isPersian = false,
}: {
    label: string;
    value?: number | null;
    prefix?: string;
    icon: React.ReactNode;
    iconClass: string;
    gradient?: string;
    highlight?: boolean;
    isPersian?: boolean;
}) {
    const numericValue =
        typeof value === "number" &&
        Number.isFinite(value)
            ? value
            : 0;

    const formattedValue =
        numericValue.toLocaleString(
            isPersian
                ? "fa-IR"
                : "en-US"
        );

    return (
        <div
            className={`
                group
                relative
                w-full
                min-h-[155px]
                cursor-default
                overflow-hidden
                bg-white
                p-6
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-gradient-to-br

                sm:w-[calc(50%-1px)]
                lg:w-[calc(33.333%-1px)]
                xl:w-[calc(25%-1px)]

                ${gradient}

                ${
                    highlight
                        ? "border-r-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40"
                        : ""
                }
            `}
        >

            <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 transition-all duration-500 group-hover:from-[#46A6D9]/5 group-hover:via-[#46A6D9]/5 group-hover:to-[#46A6D9]/5" />

            <div
                className={`
                    absolute
                    bottom-0
                    left-0
                    right-0
                    h-0.5
                    scale-x-0
                    bg-gradient-to-r
                    from-transparent
                    via-[#46A6D9]
                    to-transparent
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                    ${
                        isPersian
                            ? "origin-right"
                            : "origin-left"
                    }
                `}
            />

            <div
                className={`
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                    ${
                        isPersian
                            ? "flex-row-reverse"
                            : ""
                    }
                `}
            >

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300
                        group-hover:scale-110
                        ${
                            isPersian
                                ? "group-hover:-rotate-3"
                                : "group-hover:rotate-3"
                        }
                        ${iconClass}
                    `}
                >
                    {icon}
                </div>

                <div className="h-1.5 w-1.5 rounded-full bg-slate-200 transition-all duration-300 group-hover:scale-150 group-hover:bg-[#46A6D9]" />

            </div>

            <div
                className={`
                    relative
                    z-10
                    mt-5
                    ${
                        isPersian
                            ? "text-right"
                            : ""
                    }
                `}
            >

                <p className="min-h-[20px] text-xs font-semibold uppercase tracking-[0.08em] text-slate-400 transition-colors group-hover:text-slate-500">
                    {label}
                </p>

                <p
                    className={`
                        mt-1.5
                        text-3xl
                        font-extrabold
                        tracking-tight
                        transition-all
                        duration-300
                        group-hover:scale-105
                        ${
                            isPersian
                                ? "text-right group-hover:origin-right"
                                : "group-hover:origin-left"
                        }
                        ${
                            highlight
                                ? "text-emerald-600 group-hover:text-emerald-700"
                                : "text-[#183B73] group-hover:text-[#183B73]/90"
                        }
                    `}
                    dir="ltr"
                >
                    {prefix ?? ""}
                    {formattedValue}
                </p>

            </div>

        </div>
    );
}