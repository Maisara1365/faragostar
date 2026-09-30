import {
    LayoutDashboard,
    ShoppingCart,
    MessageCircle,
    User,
    Settings,
    Users,
    ShieldCheck,
    FolderKanban,
    Briefcase,
    Star,
    BarChart3,
} from "lucide-react";

export type DashboardRole =
    | "admin"
    | "content_manager"
    | "customer";

export interface DashboardNavigationItem {
    key: string;
    href: string;
    icon: any;
}

const adminNavigation: DashboardNavigationItem[] = [
    {
        key: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        key: "orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
    },

    {
        key: "messages",
        href: "/dashboard/messages",
        icon: MessageCircle,
    },

    // Website Content
    {
        key: "portfolio",
        href: "/dashboard/portfolio",
        icon: FolderKanban,
    },

    {
        key: "services",
        href: "/dashboard/services",
        icon: Briefcase,
    },

    {
        key: "testimonials",
        href: "/dashboard/testimonials",
        icon: Star,
    },

    // ADD TEAM MEMBERS HERE
    {
        key: "team", 
        href: "/dashboard/team",
        icon: Users,
    },

    // User Management
    {
        key: "admins",
        href: "/dashboard/admins",
        icon: ShieldCheck,
    },

    {
        key: "contentManagers",
        href: "/dashboard/content-managers",
        icon: Briefcase,
    },

    {
        key: "customers",
        href: "/dashboard/customers",
        icon: Users,
    },

    // Reports
    {
        key: "reports",
        href: "/dashboard/reports",
        icon: BarChart3,
    },

    // Account
    {
        key: "profile",
        href: "/dashboard/profile",
        icon: User,
    },

    {
        key: "settings",
        href: "/dashboard/settings",
        icon: Settings,
    },

];

const contentManagerNavigation: DashboardNavigationItem[] = [
    {
        key: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        key: "orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
    },

    {
        key: "messages",
        href: "/dashboard/messages",
        icon: MessageCircle,
    },

    {
        key: "portfolio",
        href: "/dashboard/portfolio",
        icon: FolderKanban,
    },

    {
        key: "services",
        href: "/dashboard/services",
        icon: Briefcase,
    },

    {
        key: "testimonials",
        href: "/dashboard/testimonials",
        icon: Star,
    },

    {
        key: "profile",
        href: "/dashboard/profile",
        icon: User,
    },

];

const customerNavigation: DashboardNavigationItem[] = [
    {
        key: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        key: "orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
    },

    {
        key: "messages",
        href: "/dashboard/messages",
        icon: MessageCircle,
    },

    {
        key: "profile",
        href: "/dashboard/profile",
        icon: User,
    },

];

export function getDashboardNavigation(
    role?: DashboardRole
): DashboardNavigationItem[] {
    switch (role) {
        case "admin":
            return adminNavigation;
        case "content_manager":
            return contentManagerNavigation;
        case "customer":
            return customerNavigation;
        default:
            return [];
    }
}