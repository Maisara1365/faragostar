"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import TestimonialTable from "@/components/dashboard/testimonials/TestimonialTable";
import CreateTestimonialModal from "@/components/dashboard/testimonials/CreateTestimonialModal";
import EditTestimonialModal from "@/components/dashboard/testimonials/EditTestimonialModal";
import TestimonialDetailsDrawer from "@/components/dashboard/testimonials/TestimonialDetailsDrawer";
import DeleteTestimonialDialog from "@/components/dashboard/testimonials/DeleteTestimonialDialog";

import testimonialService from "@/services/testimonial";

import type {
    Testimonial,
} from "@/types/testimonial";

import { useLanguage } from "@/context/language-context";

import {
    MessageSquareQuote,
    CheckCircle2,
    Star,
    Clock3,
    Plus,
} from "lucide-react";

import Button from "@/components/ui/button";

// Import Header and Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TestimonialsPage() {

    const { t, language } = useLanguage();

    // ============================================================
    // Helper Functions for Number Formatting
    // ============================================================

    // Convert English digits to Persian digits
    const toPersianDigits = (num: number): string => {
        const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return num
            .toString()
            .split("")
            .map((digit) => persianDigits[parseInt(digit)] || digit)
            .join("");
    };

    // Format number based on current language
    const formatNumber = (num: number): string => {
        if (language === "fa") {
            return toPersianDigits(num);
        }
        return num.toString();
    };

    // ============================================================
    // Loading
    // ============================================================

    const [loading, setLoading] =
        useState(true);

    // ============================================================
    // Testimonials
    // ============================================================

    const [testimonials, setTestimonials] =
        useState<Testimonial[]>([]);

    const [selectedTestimonial, setSelectedTestimonial] =
        useState<Testimonial | null>(null);

    // ============================================================
    // Filters
    // ============================================================

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [featuredFilter, setFeaturedFilter] =
        useState("all");

    // ============================================================
    // Dialog States
    // ============================================================

    const [createOpen, setCreateOpen] =
        useState(false);

    const [editOpen, setEditOpen] =
        useState(false);

    const [detailsOpen, setDetailsOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    // ============================================================
    // Load Testimonials
    // ============================================================

    async function loadTestimonials() {

        try {

            setLoading(true);

            const data =
                await testimonialService.getAll();

            setTestimonials(data);

        } catch (error) {

            console.error(
                "Failed to load testimonials:",
                error
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadTestimonials();

    }, []);

    // ============================================================
    // Statistics
    // ============================================================

    const statistics =
        useMemo(() => {

            return {

                total:
                    testimonials.length,

                active:
                    testimonials.filter(
                        item =>
                            item.status ===
                            "active"
                    ).length,

                featured:
                    testimonials.filter(
                        item =>
                            item.is_featured
                    ).length,

                inactive:
                    testimonials.filter(
                        item =>
                            item.status ===
                            "inactive"
                    ).length,

            };

        }, [testimonials]);

    // Format statistics numbers for display
    const formattedStatistics = useMemo(() => {
        return {
            total: formatNumber(statistics.total),
            active: formatNumber(statistics.active),
            featured: formatNumber(statistics.featured),
            inactive: formatNumber(statistics.inactive),
        };
    }, [statistics, language]);

    // ============================================================
    // Filtering
    // ============================================================

    const filteredTestimonials =
        useMemo(() => {

            return testimonials.filter(
                item => {

                    const searchValue =
                        search
                            .trim()
                            .toLowerCase();

                    const matchesSearch =
                        !searchValue ||

                        item.name
                            .toLowerCase()
                            .includes(
                                searchValue
                            );

                    const matchesStatus =
                        statusFilter === "all"
                            ? true
                            : item.status ===
                              statusFilter;

                    const matchesFeatured =
                        featuredFilter === "all"
                            ? true
                            : featuredFilter ===
                              "featured"
                                ? item.is_featured
                                : !item.is_featured;

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesFeatured
                    );

                }
            );

        }, [
            testimonials,
            search,
            statusFilter,
            featuredFilter,
        ]);

    // ============================================================
    // Render
    // ============================================================

    return (

        <AuthGuard
            allowedRoles={[
                "admin",
                "content_manager",
            ]}
        >
            <Header />

            <DashboardShell
                title={
                    t.dashboard.testimonials.title
                }
                description={
                    t.dashboard.testimonials.subtitle
                }
            >

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "28px",
                        padding: "8px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >

                    {/* ==================================================
                        Statistics
                    ================================================== */}

                    <div
                        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
                        style={{
                            gap: "24px",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Total */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                boxShadow:
                                    "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor:
                                        "#eff6ff",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <MessageSquareQuote
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#2563eb",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard
                                        .testimonials
                                        .statistics
                                        .total
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.total}

                            </h3>

                        </div>


                        {/* Active */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                boxShadow:
                                    "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor:
                                        "#ecfdf5",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <CheckCircle2
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#16a34a",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard
                                        .testimonials
                                        .statistics
                                        .active
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.active}

                            </h3>

                        </div>


                        {/* Featured */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                boxShadow:
                                    "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor:
                                        "#fffbeb",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <Star
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#f59e0b",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard
                                        .testimonials
                                        .statistics
                                        .featured
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.featured}

                            </h3>

                        </div>


                        {/* Inactive */}

                        <div
                            className="rounded-2xl border bg-white"
                            style={{
                                padding: "24px",
                                borderRadius: "16px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                boxShadow:
                                    "0 2px 8px rgba(15, 23, 42, 0.04)",
                                minHeight: "160px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "12px",
                                    backgroundColor:
                                        "#fef2f2",
                                    marginBottom: "16px",
                                    padding: "8px",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <Clock3
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        color: "#ef4444",
                                    }}
                                />

                            </div>

                            <p className="text-sm text-slate-500">

                                {
                                    t.dashboard
                                        .testimonials
                                        .statistics
                                        .inactive
                                }

                            </p>

                            <h3
                                className="text-3xl font-bold"
                                style={{
                                    marginTop: "8px",
                                    direction: "ltr",
                                }}
                            >

                                {formattedStatistics.inactive}

                            </h3>

                        </div>

                    </div>


                    {/* ==================================================
                        Filters
                    ================================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            rounded-2xl
                            border
                            bg-white
                            lg:flex-row
                            lg:items-center
                        "
                        style={{
                            gap: "16px",
                            padding: "24px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border:
                                "1px solid #e2e8f0",
                            backgroundColor:
                                "#ffffff",
                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.04)",
                            boxSizing:
                                "border-box",
                        }}
                    >

                        {/* Search */}

                        <input
                            type="text"
                            placeholder={
                                t.dashboard
                                    .testimonials
                                    .search
                            }
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            style={{
                                flex: 1,
                                minWidth: 0,
                                minHeight: "46px",
                                padding:
                                    "12px 16px",
                                borderRadius:
                                    "10px",
                                border:
                                    "1px solid #e2e8f0",
                                outline: "none",
                                backgroundColor:
                                    "#ffffff",
                                boxSizing:
                                    "border-box",
                            }}
                        />


                        {/* Status */}

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                            style={{
                                minHeight: "46px",
                                minWidth: "170px",
                                padding:
                                    "12px 16px",
                                borderRadius:
                                    "10px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                color:
                                    "#334155",
                                outline: "none",
                                cursor:
                                    "pointer",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <option value="all">

                                {t.common.all}

                            </option>

                            <option value="active">

                                {t.common.active}

                            </option>

                            <option value="inactive">

                                {t.common.inactive}

                            </option>

                        </select>


                        {/* Featured */}

                        <select
                            value={featuredFilter}
                            onChange={(e) =>
                                setFeaturedFilter(
                                    e.target.value
                                )
                            }
                            style={{
                                minHeight: "46px",
                                minWidth: "180px",
                                padding:
                                    "12px 16px",
                                borderRadius:
                                    "10px",
                                border:
                                    "1px solid #e2e8f0",
                                backgroundColor:
                                    "#ffffff",
                                color:
                                    "#334155",
                                outline: "none",
                                cursor:
                                    "pointer",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <option value="all">

                                {t.common.all}

                            </option>

                            <option value="featured">

                                {t.common.featured}

                            </option>

                            <option value="normal">

                                {t.common.normal}

                            </option>

                        </select>


                        {/* Create Testimonial Button */}

                        <Button
                            onClick={() =>
                                setCreateOpen(
                                    true
                                )
                            }
                            style={{
                                display:
                                    "inline-flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                gap: "9px",

                                minHeight:
                                    "48px",

                                padding:
                                    "32px 12px",

                                borderRadius:
                                    "12px",

                                background:
                                    "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",

                                color:
                                    "#1e40af",

                                border:
                                    "1px solid #93c5fd",

                                fontSize:
                                    "14px",

                                fontWeight: 700,

                                letterSpacing:
                                    "0.1px",

                                boxShadow:
                                    "0 4px 10px rgba(59, 130, 246, 0.15)",

                                cursor:
                                    "pointer",

                                whiteSpace:
                                    "nowrap",

                                transition:
                                    "all 0.2s ease",

                                flexShrink: 0,
                            }}
                        >

                            <span
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    borderRadius:
                                        "8px",
                                    backgroundColor:
                                        "#ffffff",
                                    boxShadow:
                                        "0 2px 5px rgba(37, 99, 235, 0.12)",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <Plus
                                    style={{
                                        width:
                                            "17px",
                                        height:
                                            "17px",
                                        color:
                                            "#2563eb",
                                        strokeWidth:
                                            2.5,
                                    }}
                                />

                            </span>

                            <span>

                                {
                                    t.dashboard
                                        .testimonials
                                        .create
                                }

                            </span>

                        </Button>

                    </div>


                    {/* ==================================================
                        Testimonial Table
                    ================================================== */}

                    <div
                        style={{
                            width: "100%",
                            padding: "4px",
                            marginTop: "4px",
                            borderRadius: "16px",
                            border:
                                "1px solid #e2e8f0",
                            backgroundColor:
                                "#ffffff",
                            boxShadow:
                                "0 4px 12px rgba(15, 23, 42, 0.05)",
                            boxSizing:
                                "border-box",
                            overflow:
                                "hidden",
                        }}
                    >

                        <div
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing:
                                    "border-box",
                            }}
                        >

                            <TestimonialTable

                                loading={
                                    loading
                                }

                                testimonials={
                                    filteredTestimonials
                                }

                                onView={(item) => {

                                    setSelectedTestimonial(
                                        item
                                    );

                                    setDetailsOpen(
                                        true
                                    );

                                }}

                                onEdit={(item) => {

                                    setSelectedTestimonial(
                                        item
                                    );

                                    setEditOpen(
                                        true
                                    );

                                }}

                                onDelete={(item) => {

                                    setSelectedTestimonial(
                                        item
                                    );

                                    setDeleteOpen(
                                        true
                                    );

                                }}

                            />

                        </div>

                    </div>


                    {/* ==================================================
                        Empty Filter Result
                    ================================================== */}

                    {!loading &&
                        testimonials.length > 0 &&
                        filteredTestimonials.length === 0 && (

                            <div
                                style={{
                                    borderRadius:
                                        "16px",
                                    border:
                                        "1px solid #e2e8f0",
                                    backgroundColor:
                                        "#ffffff",
                                    padding:
                                        "40px",
                                    textAlign:
                                        "center",
                                    boxShadow:
                                        "0 2px 8px rgba(15, 23, 42, 0.04)",
                                    boxSizing:
                                        "border-box",
                                }}
                            >

                                <p
                                    style={{
                                        fontWeight:
                                            600,
                                        color:
                                            "#0f172a",
                                    }}
                                >

                                    {
                                        language === "fa"
                                            ? "هیچ نظری با فیلترهای شما مطابقت ندارد."
                                            : "No testimonials match your filters."
                                    }

                                </p>

                                <p
                                    style={{
                                        marginTop:
                                            "8px",
                                        fontSize:
                                            "14px",
                                        color:
                                            "#64748b",
                                    }}
                                >

                                    {
                                        language === "fa"
                                            ? "سعی کنید جستجو یا فیلترهای خود را تنظیم کنید."
                                            : "Try adjusting your search or filter options."
                                    }

                                </p>

                            </div>

                        )}

                </div>

            </DashboardShell>


            {/* ==========================================================
                Create Testimonial
            ========================================================== */}

            <CreateTestimonialModal

                open={
                    createOpen
                }

                onOpenChange={
                    setCreateOpen
                }

                onSuccess={
                    loadTestimonials
                }

            />


            {/* ==========================================================
                Edit Testimonial
            ========================================================== */}

            <EditTestimonialModal

                open={
                    editOpen
                }

                testimonial={
                    selectedTestimonial
                }

                onOpenChange={
                    setEditOpen
                }

                onSuccess={
                    loadTestimonials
                }

            />


            {/* ==========================================================
                Testimonial Details
            ========================================================== */}

            <TestimonialDetailsDrawer

                open={
                    detailsOpen
                }

                testimonial={
                    selectedTestimonial
                }

                onOpenChange={
                    setDetailsOpen
                }

            />


            {/* ==========================================================
                Delete Testimonial
            ========================================================== */}

            <DeleteTestimonialDialog

                open={
                    deleteOpen
                }

                testimonial={
                    selectedTestimonial
                }

                onOpenChange={
                    setDeleteOpen
                }

                onDeleted={
                    loadTestimonials
                }

            />

            <Footer />

        </AuthGuard>

    );

}