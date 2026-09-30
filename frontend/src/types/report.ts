// src/types/report.ts

import type { Order } from "./order";
import type { Service } from "./service";
import type { Portfolio } from "./portfolio";
import type { Testimonial } from "./testimonial";
import type { Customer } from "./customer";

export interface ReportStatistics {
    totalOrders: number;
    pendingOrders: number;
    inProgressOrders: number;
    completedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;

    totalServices: number;
    activeServices: number;
    featuredServices: number;

    totalPortfolios: number;
    featuredPortfolios: number;
    activePortfolios: number;

    totalTestimonials: number;
    featuredTestimonials: number;
    averageRating: number;

    totalCustomers: number;
    activeCustomers: number;
    verifiedCustomers: number;
}

export interface ReportsData {
    statistics: ReportStatistics;

    recentOrders: Order[];

    recentCustomers: Customer[];

    orders: Order[];

    services: Service[];

    portfolios: Portfolio[];

    testimonials: Testimonial[];
}