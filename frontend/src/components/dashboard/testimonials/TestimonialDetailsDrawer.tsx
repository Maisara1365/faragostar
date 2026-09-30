"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Star } from "lucide-react";

import { useLanguage } from "@/context/language-context";

import { Testimonial } from "@/types/testimonial";

interface Props {
    open: boolean;
    testimonial: Testimonial | null;
    onOpenChange: (open: boolean) => void;
}

export default function TestimonialDetailsDrawer({
    open,
    testimonial,
    onOpenChange,
}: Props) {
    const { language, t } = useLanguage();

    if (!testimonial) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-5xl"
                style={{
                    width: "90vw",
                    maxWidth: "1000px",
                    maxHeight: "90vh",
                    padding: "32px",
                    boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >
                <DialogHeader
                    style={{
                        padding: "4px 8px 12px 8px",
                    }}
                >
                    <DialogTitle
                        style={{
                            padding: "4px",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#000000",
                        }}
                    >
                        {testimonial.name}
                    </DialogTitle>
                </DialogHeader>

                <div
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        marginTop: "24px",
                    }}
                >
                    {/* Image */}
                    {testimonial.image && (
                        <div
                            style={{
                                borderRadius: "9999px",
                                border: "1px solid #e2e8f0",
                                overflow: "hidden",
                                width: "128px",
                                height: "128px",
                                boxSizing: "border-box",
                                position: "relative",
                                flexShrink: 0,
                            }}
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>
                    )}

                    {/* Client */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.dashboard.testimonials.clientInformation}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.dashboard.testimonials.name}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.name}
                                </p>
                            </div>

                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.dashboard.testimonials.rating}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        padding: "2px 4px",
                                    }}
                                >
                                    {Array.from({
                                        length: testimonial.rating,
                                    }).map((_, index) => (
                                        <Star
                                            key={index}
                                            style={{
                                                height: "16px",
                                                width: "16px",
                                                fill: "#facc15",
                                                color: "#facc15",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Company */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.dashboard.testimonials.company}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    فارسی
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.company_fa || "-"}
                                </p>
                            </div>

                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    English
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.company_en || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Position */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.dashboard.testimonials.position}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    فارسی
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.position_fa || "-"}
                                </p>
                            </div>

                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    English
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.position_en || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Review */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.dashboard.testimonials.review}
                        </h3>

                        <div
                            style={{
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                background: "#f8fafc",
                                whiteSpace: "pre-line",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "#000000",
                                lineHeight: 1.8,
                            }}
                        >
                            {language === "fa"
                                ? testimonial.review_fa
                                : testimonial.review_en ||
                                  testimonial.review_fa}
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Display */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.common.display}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.dashboard.testimonials.displayOrder}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {testimonial.display_order}
                                </p>
                            </div>

                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.dashboard.testimonials.featured}
                                </p>
                                <Badge
                                    variant={
                                        testimonial.is_featured
                                            ? "default"
                                            : "secondary"
                                    }
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        padding: "6px 14px",
                                    }}
                                >
                                    {testimonial.is_featured
                                        ? t.common.yes
                                        : t.common.no}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Status */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.common.status}
                        </h3>

                        <Badge
                            variant={
                                testimonial.status === "active"
                                    ? "default"
                                    : "secondary"
                            }
                            style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                padding: "6px 14px",
                            }}
                        >
                            {testimonial.status === "active"
                                ? t.common.active
                                : t.common.inactive}
                        </Badge>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            background: "#e2e8f0",
                        }}
                    />

                    {/* Timestamps */}
                    <div
                        style={{
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "12px",
                                fontSize: "20px",
                                fontWeight: 700,
                                padding: "4px",
                                color: "#000000",
                            }}
                        >
                            {t.common.timestamps}
                        </h3>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.common.createdAt}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {new Date(
                                        testimonial.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t.common.updatedAt}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        color: "#000000",
                                        margin: 0,
                                        padding: "2px 4px",
                                    }}
                                >
                                    {new Date(
                                        testimonial.updated_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}