"use client";

import {
    Users,
    ShieldCheck,
    UserCog,
    ShoppingCart,
    Clock3,
    Loader2,
    CheckCircle2,
    Truck,
    XCircle,
    CreditCard,
    DollarSign,
    BriefcaseBusiness,
    Image as ImageIcon,
    UsersRound,
    Star,
    Mail,
    MailOpen,
    MessageCircle,
    MessagesSquare,
    TrendingUp,
    Activity,
    BarChart3,
    Zap,
    Sparkles,
    Rocket,
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

interface AdminDashboardProps {
    name: string;

    stats?: {
        customers?: number;
        admins?: number;
        content_managers?: number;

        orders?: number;
        pending_orders?: number;
        in_progress_orders?: number;
        completed_orders?: number;
        delivered_orders?: number;
        cancelled_orders?: number;

        paid_orders?: number;
        total_revenue?: number;

        services?: number;
        portfolio?: number;
        team_members?: number;
        testimonials?: number;

        contact_messages?: number;
        unread_contact_messages?: number;
        open_conversations?: number;
        closed_conversations?: number;
    };

    orders?: Order[];

    conversations?: Conversation[];
}

export default function AdminDashboard({
    name,
    stats,
    orders,
    conversations,
}: AdminDashboardProps) {
    const { language } = useLanguage();

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    */

    const isPersian =
        language === "fa";

    const text = isPersian
        ? {
              overview: "نمای کلی داشبورد",
              detailedStatistics: "آمار تفصیلی",
              overviewDescription:
                  "کاربران، سفارش‌ها، محتوای کسب‌وکار، درآمد و ارتباط با مشتریان را مدیریت و نظارت کنید.",

              usersTeam: "کاربران و تیم",
              usersTeamDescription:
                  "نمای کلی مدیران، مشتریان و اعضای تیم.",

              customers: "مشتریان",
              administrators: "مدیران",
              contentManagers: "مدیران محتوا",
              teamMembers: "اعضای تیم",

              ordersRevenue: "سفارش‌ها و درآمد",
              ordersRevenueDescription:
                  "روند سفارش‌ها، وضعیت پرداخت و درآمد کسب‌وکار را پیگیری کنید.",

              totalOrders: "کل سفارش‌ها",
              pendingOrders: "سفارش‌های در انتظار",
              inProgress: "در حال انجام",
              completedOrders: "سفارش‌های تکمیل‌شده",
              deliveredOrders: "سفارش‌های تحویل‌شده",
              cancelledOrders: "سفارش‌های لغوشده",
              paidOrders: "سفارش‌های پرداخت‌شده",
              totalRevenue: "کل درآمد",

              websiteContent: "محتوای وب‌سایت",
              websiteContentDescription:
                  "نمای کلی محتوای عمومی وب‌سایت شرکت.",

              services: "خدمات",
              portfolio: "نمونه‌کارها",
              testimonials: "نظرات مشتریان",

              messagesConversations: "پیام‌ها و گفتگوها",
              messagesConversationsDescription:
                  "پیام‌های تماس و گفتگوهای مشتریان را مدیریت کنید.",

              contactMessages: "پیام‌های تماس",
              unreadMessages: "پیام‌های خوانده‌نشده",
              openConversations: "گفتگوهای باز",
              closedConversations: "گفتگوهای بسته",

              recentActivity: "فعالیت‌های اخیر",
              latestActivity: "آخرین فعالیت‌ها",
              recentActivityDescription:
                  "آخرین سفارش‌ها و پیام‌های مشتریان را پیگیری کنید.",

              unknownCustomer: "مشتری نامشخص",
              unknownService: "خدمت نامشخص",
              noSubject: "بدون موضوع",
              customer: "مشتری",
              noMessages: "هنوز پیامی وجود ندارد",

              quickActions: "اقدامات سریع",
              quickActionsDescription:
                  "به سرعت به بخش‌های مختلف مدیریتی دسترسی پیدا کنید.",
          }
        : {
              overview: "Dashboard Overview",
              detailedStatistics: "Detailed Statistics",
              overviewDescription:
                  "Monitor users, orders, business content, revenue, and customer communication.",

              usersTeam: "Users & Team",
              usersTeamDescription:
                  "Overview of administrators, customers and team members.",

              customers: "Customers",
              administrators: "Administrators",
              contentManagers: "Content Managers",
              teamMembers: "Team Members",

              ordersRevenue: "Orders & Revenue",
              ordersRevenueDescription:
                  "Track order progress, payment status and business revenue.",

              totalOrders: "Total Orders",
              pendingOrders: "Pending Orders",
              inProgress: "In Progress",
              completedOrders: "Completed Orders",
              deliveredOrders: "Delivered Orders",
              cancelledOrders: "Cancelled Orders",
              paidOrders: "Paid Orders",
              totalRevenue: "Total Revenue",

              websiteContent: "Website Content",
              websiteContentDescription:
                  "Overview of the company's public website content.",

              services: "Services",
              portfolio: "Portfolio",
              testimonials: "Testimonials",

              messagesConversations: "Messages & Conversations",
              messagesConversationsDescription:
                  "Monitor contact messages and customer conversations.",

              contactMessages: "Contact Messages",
              unreadMessages: "Unread Messages",
              openConversations: "Open Conversations",
              closedConversations: "Closed Conversations",

              recentActivity: "Recent Activity",
              latestActivity: "Latest Activity",
              recentActivityDescription:
                  "Keep track of the latest orders and customer messages.",

              unknownCustomer: "Unknown Customer",
              unknownService: "Unknown Service",
              noSubject: "No Subject",
              customer: "Customer",
              noMessages: "No messages yet",

              quickActions: "Quick Actions",
              quickActionsDescription:
                  "Quickly access different management sections.",
          };

    /*
    |--------------------------------------------------------------------------
    | Safe Data
    |--------------------------------------------------------------------------
    */

    const safeStats = stats ?? {};

    const safeOrders = Array.isArray(orders)
        ? orders
        : [];

    const safeConversations = Array.isArray(conversations)
        ? conversations
        : [];

    /*
    |--------------------------------------------------------------------------
    | Recent Orders
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | Recent Messages
    |--------------------------------------------------------------------------
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
                isPersian ? "text-right" : "text-left"
            }`}
        >
            {/* Top spacing */}
            <br />
 

            {/* ============================================================
                Welcome
            ============================================================ */}

            <DashboardWelcome
                name={name}
                role="admin"
            />

            {/* Spacer between Welcome and Quick Stats */}
            <div className="h-4" />

            {/* ============================================================
                Main Overview
            ============================================================ */}

            <DashboardQuickStats
                role="admin"
                stats={{
                    orders: safeStats.orders ?? 0,
                    customers: safeStats.customers ?? 0,
                    contact_messages: safeStats.contact_messages ?? 0,
                    unread_contact_messages:
                        safeStats.unread_contact_messages ?? 0,
                }}
            />

            {/* Spacer between Quick Stats and Detailed Statistics */}
            <div className="h-8" />

            {/* ============================================================
                Detailed Statistics
            ============================================================ */}

            <section className="space-y-14">

                {/* Main Header */}

                <div className="flex justify-center text-center">

                    <div className="max-w-3xl">

                        <div className="mb-3 flex items-center justify-center gap-2">

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-[#46A6D9]
                                    animate-pulse
                                "
                            />

                            <span
                                className="
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.16em]
                                    text-[#46A6D9]
                                "
                            >
                                {text.overview}
                            </span>

                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-[#46A6D9]
                                    animate-pulse
                                "
                            />

                        </div>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-[#183B73]
                                sm:text-4xl
                                flex
                                items-center
                                justify-center
                                gap-3
                            "
                        >
                            <TrendingUp className="w-8 h-8 text-[#46A6D9]" />
                            {text.detailedStatistics}
                            <BarChart3 className="w-8 h-8 text-[#46A6D9]" />
                        </h2>

                        <p
                            className="
                                mx-auto
                                mt-3
                                max-w-2xl
                                text-sm
                                leading-6
                                text-slate-500
                                font-medium
                            "
                        >
                            {text.overviewDescription}
                        </p>

                    </div>

                </div>

                {/* Spacer between header and first stat section */}
                <div className="h-2" />

                {/* ========================================================
                    Users & Team
                ======================================================== */}

                <StatisticsSection
                    title={text.usersTeam}
                    description={text.usersTeamDescription}
                    icon={<Users size={20} />}
                    iconClass="bg-gradient-to-br from-[#183B73]/10 to-[#46A6D9]/10 text-[#183B73] border border-[#183B73]/10"
                    gradient="from-[#183B73]/5 to-[#46A6D9]/5"
                    isPersian={isPersian}
                >

                    <StatCard
                        label={text.customers}
                        value={safeStats.customers}
                        icon={<Users size={20} />}
                        iconClass="bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600"
                        gradient="hover:from-blue-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.administrators}
                        value={safeStats.admins}
                        icon={<ShieldCheck size={20} />}
                        iconClass="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 text-indigo-600"
                        gradient="hover:from-indigo-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.contentManagers}
                        value={safeStats.content_managers}
                        icon={<UserCog size={20} />}
                        iconClass="bg-gradient-to-br from-violet-500/10 to-violet-600/10 text-violet-600"
                        gradient="hover:from-violet-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.teamMembers}
                        value={safeStats.team_members}
                        icon={<UsersRound size={20} />}
                        iconClass="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 text-cyan-600"
                        gradient="hover:from-cyan-50/50"
                        isPersian={isPersian}
                    />

                </StatisticsSection>

                {/* Spacer between stat sections */}
                <div className="h-6" />

                {/* ========================================================
                    Orders & Revenue
                ======================================================== */}

                <StatisticsSection
                    title={text.ordersRevenue}
                    description={text.ordersRevenueDescription}
                    icon={<ShoppingCart size={20} />}
                    iconClass="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 text-emerald-600 border border-emerald-200/30"
                    gradient="from-emerald-50/30 to-teal-50/30"
                    isPersian={isPersian}
                >

                    <StatCard
                        label={text.totalOrders}
                        value={safeStats.orders}
                        icon={<ShoppingCart size={20} />}
                        iconClass="bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600"
                        gradient="hover:from-blue-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.pendingOrders}
                        value={safeStats.pending_orders}
                        icon={<Clock3 size={20} />}
                        iconClass="bg-gradient-to-br from-amber-500/10 to-amber-600/10 text-amber-600"
                        gradient="hover:from-amber-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.inProgress}
                        value={safeStats.in_progress_orders}
                        icon={<Loader2 size={20} className="animate-spin" />}
                        iconClass="bg-gradient-to-br from-sky-500/10 to-sky-600/10 text-sky-600"
                        gradient="hover:from-sky-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.completedOrders}
                        value={safeStats.completed_orders}
                        icon={<CheckCircle2 size={20} />}
                        iconClass="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 text-emerald-600"
                        gradient="hover:from-emerald-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.deliveredOrders}
                        value={safeStats.delivered_orders}
                        icon={<Truck size={20} />}
                        iconClass="bg-gradient-to-br from-teal-500/10 to-teal-600/10 text-teal-600"
                        gradient="hover:from-teal-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.cancelledOrders}
                        value={safeStats.cancelled_orders}
                        icon={<XCircle size={20} />}
                        iconClass="bg-gradient-to-br from-red-500/10 to-red-600/10 text-red-600"
                        gradient="hover:from-red-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.paidOrders}
                        value={safeStats.paid_orders}
                        icon={<CreditCard size={20} />}
                        iconClass="bg-gradient-to-br from-violet-500/10 to-violet-600/10 text-violet-600"
                        gradient="hover:from-violet-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.totalRevenue}
                        value={safeStats.total_revenue}
                        prefix="$"
                        icon={<DollarSign size={20} />}
                        iconClass="bg-gradient-to-br from-green-500/10 to-green-600/10 text-green-600"
                        gradient="hover:from-green-50/50"
                        highlight
                        isPersian={isPersian}
                    />

                </StatisticsSection>

                {/* Spacer between stat sections */}
                <div className="h-6" />

                {/* ========================================================
                    Website Content
                ======================================================== */}

                <StatisticsSection
                    title={text.websiteContent}
                    description={text.websiteContentDescription}
                    icon={<BriefcaseBusiness size={20} />}
                    iconClass="bg-gradient-to-br from-purple-500/10 to-purple-600/10 text-purple-600 border border-purple-200/30"
                    gradient="from-purple-50/30 to-pink-50/30"
                    isPersian={isPersian}
                >

                    <StatCard
                        label={text.services}
                        value={safeStats.services}
                        icon={<BriefcaseBusiness size={20} />}
                        iconClass="bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600"
                        gradient="hover:from-blue-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.portfolio}
                        value={safeStats.portfolio}
                        icon={<ImageIcon size={20} />}
                        iconClass="bg-gradient-to-br from-violet-500/10 to-violet-600/10 text-violet-600"
                        gradient="hover:from-violet-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.testimonials}
                        value={safeStats.testimonials}
                        icon={<Star size={20} />}
                        iconClass="bg-gradient-to-br from-amber-500/10 to-amber-600/10 text-amber-600"
                        gradient="hover:from-amber-50/50"
                        isPersian={isPersian}
                    />

                </StatisticsSection>

                {/* Spacer between stat sections */}
                <div className="h-6" />

                {/* ========================================================
                    Messages & Conversations
                ======================================================== */}

                <StatisticsSection
                    title={text.messagesConversations}
                    description={text.messagesConversationsDescription}
                    icon={<MessagesSquare size={20} />}
                    iconClass="bg-gradient-to-br from-orange-500/10 to-orange-600/10 text-orange-600 border border-orange-200/30"
                    gradient="from-orange-50/30 to-yellow-50/30"
                    isPersian={isPersian}
                >

                    <StatCard
                        label={text.contactMessages}
                        value={safeStats.contact_messages}
                        icon={<Mail size={20} />}
                        iconClass="bg-gradient-to-br from-blue-500/10 to-blue-600/10 text-blue-600"
                        gradient="hover:from-blue-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.unreadMessages}
                        value={safeStats.unread_contact_messages}
                        icon={<MailOpen size={20} />}
                        iconClass="bg-gradient-to-br from-orange-500/10 to-orange-600/10 text-orange-600"
                        gradient="hover:from-orange-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.openConversations}
                        value={safeStats.open_conversations}
                        icon={<MessageCircle size={20} />}
                        iconClass="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 text-emerald-600"
                        gradient="hover:from-emerald-50/50"
                        isPersian={isPersian}
                    />

                    <StatCard
                        label={text.closedConversations}
                        value={safeStats.closed_conversations}
                        icon={<MessagesSquare size={20} />}
                        iconClass="bg-gradient-to-br from-slate-500/10 to-slate-600/10 text-slate-600"
                        gradient="hover:from-slate-50/50"
                        isPersian={isPersian}
                    />

                </StatisticsSection>

            </section>

            {/* Spacer between Detailed Statistics and Quick Actions */}
            <div className="h-10" />

            {/* ============================================================
                Quick Actions - Enhanced with Styling (No Duplicate)
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
                        <h2 className="text-3xl font-bold text-[#183B73] sm:text-4xl flex items-center justify-center gap-3">
                            <Rocket className="w-8 h-8 text-[#46A6D9]" />
                            {text.quickActions}
                            <Zap className="w-8 h-8 text-[#183B73]" />
                        </h2>
                        <p className="mt-3 text-sm text-slate-500 font-medium">
                            {text.quickActionsDescription}
                        </p>
                    </div>
                </div>

                {/* DashboardQuickActions component - only here, no duplicate */}
                <div className="relative">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#183B73]/5 via-[#46A6D9]/5 to-[#183B73]/5 rounded-3xl blur-3xl -z-10" />
                    <div className="relative">
                        <DashboardQuickActions role="admin" />
                    </div>
                </div>
            </section>

            {/* Spacer between Quick Actions and Recent Activity */}
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
                        <h2 className="text-3xl font-bold text-[#183B73] sm:text-4xl flex items-center justify-center gap-3">
                            <Zap className="w-8 h-8 text-[#46A6D9]" />
                            {text.latestActivity}
                            <Activity className="w-8 h-8 text-[#183B73]" />
                        </h2>
                        <p className="mt-3 text-sm text-slate-500 font-medium">
                            {text.recentActivityDescription}
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-2">
                    <RecentOrdersCard orders={dashboardOrders} />
                    <RecentMessagesCard messages={dashboardMessages} />
                </div>
            </section>

            {/* Bottom spacing */}
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
    isPersian = false,
    children,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconClass: string;
    gradient?: string;
    isPersian?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div
            className={`
                overflow-hidden
                rounded-3xl
                border
                border-slate-200/80
                bg-white
                shadow-[0_10px_35px_rgba(24,59,115,0.06)]
                transition-all
                duration-300
                hover:shadow-[0_15px_50px_rgba(24,59,115,0.12)]
                hover:border-[#46A6D9]/20
                relative
                group
                ${gradient ? `bg-gradient-to-br ${gradient}` : ""}
            `}
        >

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#46A6D9]/5 to-transparent rounded-bl-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#183B73]/5 to-transparent rounded-tr-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* ============================================================
                Centered Category Header
            ============================================================ */}

            <div
                className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    border-b
                    border-slate-100
                    px-5
                    py-8
                    text-center
                    sm:px-8
                    relative
                `}
            >

                {/* Floating sparkle decoration */}
                <Sparkles className="absolute top-2 right-4 w-4 h-4 text-[#46A6D9]/20 group-hover:rotate-180 transition-transform duration-500" />

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

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-slate-800
                            tracking-tight
                        "
                    >
                        {title}
                    </h3>

                    <p
                        className="
                            mx-auto
                            mt-1
                            max-w-xl
                            text-xs
                            leading-5
                            text-slate-500
                            font-medium
                        "
                    >
                        {description}
                    </p>

                </div>

            </div>

            {/* ============================================================
                Centered Statistics Cards
            ============================================================ */}

            <div
                className="
                    flex
                    flex-wrap
                    items-stretch
                    justify-center
                    gap-px
                    bg-gradient-to-r from-slate-100 via-slate-200/50 to-slate-100
                "
            >
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
    /*
     * IMPORTANT:
     * Convert undefined, null and invalid numeric values to 0.
     *
     * This guarantees that "Total Orders" and every other statistic
     * always displays 0 when the backend has no value.
     */
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
                bg-white
                p-6
                transition-all
                duration-300
                hover:bg-gradient-to-br
                ${gradient}
                hover:scale-[1.02]
                cursor-default
                overflow-hidden

                sm:w-[calc(50%-1px)]

                lg:w-[calc(33.333%-1px)]

                xl:w-[calc(25%-1px)]

                ${highlight
                    ? "bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border-r-2 border-emerald-200/50"
                    : ""
                }
            `}
        >

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#46A6D9]/0 via-[#46A6D9]/0 to-[#46A6D9]/0 group-hover:from-[#46A6D9]/5 group-hover:via-[#46A6D9]/5 group-hover:to-[#46A6D9]/5 transition-all duration-500" />

            {/* Animated border highlight - fixed for RTL */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#46A6D9] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isPersian ? 'origin-right' : 'origin-left'}`} />

            {/* ============================================================
                Icon + Indicator
            ============================================================ */}

            <div
                className={`
                    flex
                    items-start
                    justify-between
                    gap-4
                    relative
                    z-10
                    ${isPersian ? 'flex-row-reverse' : ''}
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
                        ${isPersian ? 'group-hover:-rotate-3' : 'group-hover:rotate-3'}
                        ${iconClass}
                    `}
                >
                    {icon}
                </div>

                <div
                    className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-slate-200
                        transition-all
                        duration-300
                        group-hover:bg-[#46A6D9]
                        group-hover:scale-150
                        group-hover:shadow-[0_0_10px_rgba(70,166,217,0.5)]
                    "
                />

            </div>

            {/* ============================================================
                Label + Value
            ============================================================ */}

            <div className={`mt-5 relative z-10 ${isPersian ? 'text-right' : ''}`}>

                <p
                    className={`
                        min-h-[20px]
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-slate-400
                        group-hover:text-slate-500
                        transition-colors
                        ${isPersian ? 'text-right' : ''}
                    `}
                >
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
                        ${isPersian ? 'group-hover:origin-right text-right' : 'group-hover:origin-left'}
                        ${highlight
                            ? "text-emerald-600 group-hover:text-emerald-700"
                            : "text-[#183B73] group-hover:text-[#183B73]/90"
                        }
                    `}
                    dir={isPersian ? "rtl" : "ltr"}
                >
                    {prefix ?? ""}
                    {formattedValue}
                </p>

                {/* Decorative sparkle on hover */}
                {highlight && (
                    <div className={`absolute -top-1 ${isPersian ? '-left-1' : '-right-1'} w-3 h-3`}>
                        <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                    </div>
                )}

            </div>

        </div>
    );
}