import { api } from "@/services/api";

import type { Order } from "@/types/order";
import type { Conversation } from "@/types/conversation";

export type DashboardRole =
    | "admin"
    | "content_manager"
    | "customer";

export interface DashboardUser {

    id: number;

    name: string;

    email: string;

    role: DashboardRole;

}

/*
|--------------------------------------------------------------------------
| Administrator Dashboard
|--------------------------------------------------------------------------
*/

export interface AdminDashboardResponse {

    user?: DashboardUser;

    stats: {

        customers: number;
        admins: number;
        content_managers: number;

        orders: number;
        pending_orders: number;
        in_progress_orders: number;
        completed_orders: number;
        delivered_orders: number;
        cancelled_orders: number;

        paid_orders: number;
        total_revenue: number;

        services: number;
        packages: number;
        portfolio: number;
        team_members: number;
        testimonials: number;

        contact_messages: number;
        unread_contact_messages: number;
        open_conversations: number;
        closed_conversations: number;

    };

    orders: Order[];

    conversations: Conversation[];

}

/*
|--------------------------------------------------------------------------
| Content Manager Dashboard
|--------------------------------------------------------------------------
*/

export interface ContentManagerDashboardResponse {

    user?: DashboardUser;

    stats: {

        activeOrders: number;

        totalPortfolio: number;

        totalServices: number;

        totalTestimonials: number;

    };

    orders: Order[];

    conversations: Conversation[];

}

/*
|--------------------------------------------------------------------------
| Customer Dashboard
|--------------------------------------------------------------------------
*/

export interface CustomerDashboardResponse {

    user?: DashboardUser;

    stats: {

        totalOrders: number;

        activeOrders: number;

        totalMessages: number;

    };

    orders: Order[];

    conversations: Conversation[];

}

/*
|--------------------------------------------------------------------------
| Administrator Dashboard
|--------------------------------------------------------------------------
*/

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
    const response = await api.get("/admin/dashboard");

    const raw = response.data;

    const dashboard = raw?.data ?? raw;

    return {
        user: dashboard.user,

        stats: {
            customers: dashboard.customers ?? 0,
            admins: dashboard.admins ?? 0,
            content_managers: dashboard.content_managers ?? 0,

            orders: dashboard.orders ?? 0,
            pending_orders: dashboard.pending_orders ?? 0,
            in_progress_orders: dashboard.in_progress_orders ?? 0,
            completed_orders: dashboard.completed_orders ?? 0,
            delivered_orders: dashboard.delivered_orders ?? 0,
            cancelled_orders: dashboard.cancelled_orders ?? 0,

            paid_orders: dashboard.paid_orders ?? 0,
            total_revenue: dashboard.total_revenue ?? 0,

            services: dashboard.services ?? 0,
            packages: dashboard.packages ?? 0,
            portfolio: dashboard.portfolio ?? 0,
            team_members: dashboard.team_members ?? 0,
            testimonials: dashboard.testimonials ?? 0,

            contact_messages: dashboard.contact_messages ?? 0,
            unread_contact_messages:
                dashboard.unread_contact_messages ?? 0,
            open_conversations:
                dashboard.open_conversations ?? 0,
            closed_conversations:
                dashboard.closed_conversations ?? 0,
        },

        orders: Array.isArray(dashboard.orders)
            ? dashboard.orders
            : Array.isArray(dashboard.orders?.data)
                ? dashboard.orders.data
                : [],

        conversations: Array.isArray(dashboard.conversations)
            ? dashboard.conversations
            : Array.isArray(dashboard.conversations?.data)
                ? dashboard.conversations.data
                : [],
    };
}

/*
|--------------------------------------------------------------------------
| Content Manager Dashboard
|--------------------------------------------------------------------------
*/

export async function getContentManagerDashboard(): Promise<ContentManagerDashboardResponse> {
    const response = await api.get("/content-manager/dashboard");

    const raw = response.data;

    const dashboard = raw?.data ?? raw;

    return {
        ...dashboard,

        user: dashboard.user,

        stats: dashboard.stats ?? dashboard,

        orders: Array.isArray(dashboard.orders)
            ? dashboard.orders
            : Array.isArray(dashboard.orders?.data)
                ? dashboard.orders.data
                : [],

        conversations: Array.isArray(dashboard.conversations)
            ? dashboard.conversations
            : Array.isArray(dashboard.conversations?.data)
                ? dashboard.conversations.data
                : [],
    };
}

/*
|--------------------------------------------------------------------------
| Customer Dashboard
|--------------------------------------------------------------------------
*/

export async function getCustomerDashboard(): Promise<CustomerDashboardResponse> {
    const response = await api.get("/customer/dashboard");

    const raw = response.data;

    const dashboard = raw?.data ?? raw;

    return {
        ...dashboard,

        user: dashboard.user,

        stats: dashboard.stats ?? dashboard,

        orders: Array.isArray(dashboard.orders)
            ? dashboard.orders
            : Array.isArray(dashboard.orders?.data)
                ? dashboard.orders.data
                : [],

        conversations: Array.isArray(dashboard.conversations)
            ? dashboard.conversations
            : Array.isArray(dashboard.conversations?.data)
                ? dashboard.conversations.data
                : [],
    };
}