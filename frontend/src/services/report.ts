// src/services/report.ts

import { getAdminOrders } from "@/services/orders";
import { getServices } from "@/services/service";
import { getPortfolio } from "@/services/portfolio";
import testimonialService from "@/services/testimonial";
import { getCustomers } from "@/services/customer";

import type {
    ReportsData,
    ReportStatistics,
} from "@/types/report";

import type { Order } from "@/types/order";
import type { Service } from "@/types/service";
import type { Portfolio } from "@/types/portfolio";
import type { Testimonial } from "@/types/testimonial";
import type { Customer } from "@/types/customer";

class ReportService {

    async getReports(): Promise<ReportsData> {

        const [

            orders,

            services,

            portfolios,

            testimonials,

            customersResponse,

        ] = await Promise.all([

            getAdminOrders(),

            getServices(),

            getPortfolio(),

            testimonialService.getAll(),

            getCustomers(),

        ]);

        const customers = customersResponse.data;
        const typedOrders = orders as Order[];
        const typedServices = services as Service[];
        const typedPortfolios = portfolios as Portfolio[];
        const typedTestimonials = testimonials as Testimonial[];
        const typedCustomers = customers as Customer[];

        const statistics: ReportStatistics = {

            totalOrders: typedOrders.length,

            pendingOrders: typedOrders.filter(
                order => order.status === "pending"
            ).length,

            inProgressOrders: typedOrders.filter(
                order => order.status === "in_progress"
            ).length,

            completedOrders: typedOrders.filter(
                order => order.status === "completed"
            ).length,

            deliveredOrders: typedOrders.filter(
                order => order.status === "delivered"
            ).length,

            cancelledOrders: typedOrders.filter(
                order => order.status === "cancelled"
            ).length,

            totalServices: typedServices.length,

            activeServices: typedServices.filter(
                service => service.status === "active"
            ).length,

            featuredServices: typedServices.filter(
                service => service.is_featured
            ).length,

            totalPortfolios: typedPortfolios.length,

            featuredPortfolios: typedPortfolios.filter(
                portfolio => portfolio.is_featured
            ).length,

            activePortfolios: typedPortfolios.filter(
                portfolio => portfolio.status === "active"
            ).length,

            totalTestimonials: typedTestimonials.length,

            featuredTestimonials: typedTestimonials.filter(
                testimonial => testimonial.is_featured
            ).length,

            averageRating:
                typedTestimonials.length === 0
                    ? 0
                    : Number(
                          (
                              typedTestimonials.reduce(
                                  (sum, testimonial) =>
                                      sum + testimonial.rating,
                                  0
                              ) / typedTestimonials.length
                          ).toFixed(1)
                      ),

            totalCustomers: typedCustomers.length,

            activeCustomers: typedCustomers.filter(
                customer => customer.status === "active"
            ).length,

            verifiedCustomers: typedCustomers.filter(
                customer => customer.email_verified
            ).length,

        };

        return {

            statistics,

            recentOrders: [...typedOrders]
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )
                .slice(0, 5),

            recentCustomers: [...typedCustomers]
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                )
                .slice(0, 5),

            orders: typedOrders,

            services: typedServices,

            portfolios: typedPortfolios,

            testimonials: typedTestimonials,

        };

    }

}

const reportService = new ReportService();

export default reportService;