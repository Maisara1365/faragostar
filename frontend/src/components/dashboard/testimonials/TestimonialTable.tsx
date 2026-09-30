"use client";

import Image from "next/image";

import {
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
    Star,
} from "lucide-react";

import Button from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useLanguage } from "@/context/language-context";

import { Testimonial } from "@/types/testimonial";

interface TestimonialTableProps {

    testimonials: Testimonial[];

    loading: boolean;

    onView: (testimonial: Testimonial) => void;

    onEdit: (testimonial: Testimonial) => void;

    onDelete: (testimonial: Testimonial) => void;

}

export default function TestimonialTable({

    testimonials,

    loading,

    onView,

    onEdit,

    onDelete,

}: TestimonialTableProps) {

    const { t } = useLanguage();

    if (loading) {

        return (

            <div className="rounded-lg border p-8 text-center">

                {t.dashboard.testimonials.loading}

            </div>

        );

    }

    return (

        <div className="rounded-lg border overflow-hidden">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>

                            {t.dashboard.testimonials.client}

                        </TableHead>

                        <TableHead>

                            {t.dashboard.testimonials.company}

                        </TableHead>

                        <TableHead>

                            {t.dashboard.testimonials.rating}

                        </TableHead>

                        <TableHead>

                            {t.dashboard.testimonials.featured}

                        </TableHead>

                        <TableHead>

                            {t.dashboard.testimonials.status}

                        </TableHead>

                        <TableHead>

                            {t.dashboard.testimonials.order}

                        </TableHead>

                        <TableHead className="w-16"/>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {testimonials.map((testimonial) => (

                        <TableRow key={testimonial.id}>

                            <TableCell>

                                <div className="flex items-center gap-3">

                                    {testimonial.image ? (

                                        <div
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                minWidth: "48px",
                                                minHeight: "48px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                backgroundColor: "#f1f5f9",
                                                border: "1px solid #e2e8f0",
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    minWidth: "48px",
                                                    minHeight: "48px",
                                                    display: "block",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    borderRadius: "50%",
                                                }}
                                                onError={(event) => {
                                                    event.currentTarget.style.display = "none";

                                                    const fallback =
                                                        event.currentTarget.parentElement
                                                            ?.querySelector(
                                                                "[data-testimonial-image-fallback]"
                                                            ) as HTMLElement | null;

                                                    if (fallback) {
                                                        fallback.style.display = "flex";
                                                    }
                                                }}
                                            />

                                            <div
                                                data-testimonial-image-fallback
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                    display: "none",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#f1f5f9",
                                                    color: "#64748b",
                                                    fontSize: "18px",
                                                    fontWeight: 600,
                                                    boxSizing: "border-box",
                                                }}
                                            >
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        </div>

                                    ) : (

                                        <div
                                            style={{
                                                width: "48px",
                                                height: "48px",
                                                minWidth: "48px",
                                                minHeight: "48px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "50%",
                                                backgroundColor: "#f1f5f9",
                                                border: "1px solid #e2e8f0",
                                                color: "#64748b",
                                                fontSize: "18px",
                                                fontWeight: 600,
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {testimonial.name.charAt(0)}
                                        </div>

                                    )}

                                    <div>

                                        <p className="font-medium">

                                            {testimonial.name}

                                        </p>

                                        <p className="text-xs text-muted-foreground">

                                            {testimonial.position}

                                        </p>

                                    </div>

                                </div>

                            </TableCell>

                            <TableCell>

                                {testimonial.company || "-"}

                            </TableCell>

                            <TableCell>

                                <div className="flex items-center gap-1">

                                    {Array.from({

                                        length: testimonial.rating,

                                    }).map((_, index) => (

                                        <Star

                                            key={index}

                                            className="h-4 w-4 fill-yellow-400 text-yellow-400"

                                        />

                                    ))}

                                </div>

                            </TableCell>

                            <TableCell>

                                <Badge

                                    variant={

                                        testimonial.is_featured

                                            ? "default"

                                            : "secondary"

                                    }

                                >

                                    {testimonial.is_featured

                                        ? t.common.yes

                                        : t.common.no}

                                </Badge>

                            </TableCell>

                            <TableCell>

                                <Badge

                                    variant={

                                        testimonial.status === "active"

                                            ? "default"

                                            : "destructive"

                                    }

                                >

                                    {testimonial.status === "active"
                                        ? t.common.active
                                        : t.common.inactive}

                                </Badge>

                            </TableCell>

                            <TableCell>

                                {testimonial.display_order}

                            </TableCell>

                            <TableCell>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {/* View */}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            onView(testimonial)
                                        }
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            minWidth: "38px",
                                            padding: "0s",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "9px",
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #cbd5e1",
                                            color: "#475569",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Eye
                                            style={{
                                                display: "block",
                                                width: "18px",
                                                height: "18px",
                                                color: "#475569",
                                                stroke: "#475569",
                                                strokeWidth: 2,
                                            }}
                                        />
                                    </Button>

                                    {/* Edit */}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() =>
                                            onEdit(testimonial)
                                        }
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            minWidth: "38px",
                                            padding: "0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "9px",
                                            backgroundColor: "#eff6ff",
                                            border: "1px solid #bfdbfe",
                                            color: "#2563eb",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Pencil
                                            style={{
                                                display: "block",
                                                width: "18px",
                                                height: "18px",
                                                color: "#2563eb",
                                                stroke: "#2563eb",
                                                strokeWidth: 2,
                                            }}
                                        />
                                    </Button>

                                    {/* Delete */}
                                    <Button
                                        size="icon"
                                        variant="danger"
                                        onClick={() =>
                                            onDelete(testimonial)
                                        }
                                        style={{
                                            width: "38px",
                                            height: "38px",
                                            minWidth: "38px",
                                            padding: "0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "9px",
                                            backgroundColor: "#fee2e2",
                                            border: "1px solid #fecaca",
                                            color: "#dc2626",
                                            cursor: "pointer",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        <Trash2
                                            style={{
                                                display: "block",
                                                width: "18px",
                                                height: "18px",
                                                minWidth: "18px",
                                                minHeight: "18px",
                                                color: "#dc2626",
                                                stroke: "#dc2626",
                                                strokeWidth: 2.2,
                                                opacity: 1,
                                                visibility: "visible",
                                            }}
                                        />
                                    </Button>
                                </div>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>

    );

}