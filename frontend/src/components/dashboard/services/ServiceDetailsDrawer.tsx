"use client";

import {
    Calendar,
    DollarSign,
    Hash,
    Layers3,
    Palette,
    Star,
} from "lucide-react";

import { Service } from "@/types/service";
import { useLanguage } from "@/context/language-context";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
    open: boolean;
    service: Service | null;
    onClose: () => void;
}

export default function ServiceDetailsDrawer({
    open,
    service,
    onClose,
}: Props) {
    const { t, language } = useLanguage();

    if (!service) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
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
                        {t.dashboard.services.details}
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
                    {/* Cover */}
                    <div
                        style={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                            width: "100%",
                            boxSizing: "border-box",
                            position: "relative",
                        }}
                    >
                        <img
                            src={
                                service.cover_image ??
                                "/images/placeholders/service-cover.jpg"
                            }
                            alt={
                                language === "fa"
                                    ? service.title_fa
                                    : service.title_en
                            }
                            style={{
                                height: "256px",
                                width: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>

                    {/* Icon + Title */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                background: "#f1f5f9",
                                overflow: "hidden",
                                flexShrink: 0,
                                width: "80px",
                                height: "80px",
                                position: "relative",
                            }}
                        >
                            <img
                                src={
                                    service.icon ??
                                    "/images/placeholders/service-icon.png"
                                }
                                alt={
                                    language === "fa"
                                        ? service.title_fa
                                        : service.title_en
                                }
                                style={{
                                    height: "80px",
                                    width: "80px",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                flex: 1,
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "28px",
                                    fontWeight: 700,
                                    margin: 0,
                                    padding: "4px",
                                    color: "#000000",
                                }}
                            >
                                {language === "fa"
                                    ? service.title_fa
                                    : service.title_en}
                            </h2>

                            <p
                                style={{
                                    marginTop: "8px",
                                    color: "#000000",
                                    padding: "4px",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                }}
                            >
                                {language === "fa"
                                    ? service.short_description_fa
                                    : service.short_description_en}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
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
                            {t.dashboard.services.description}
                        </h3>

                        <p
                            style={{
                                lineHeight: 1.8,
                                color: "#000000",
                                whiteSpace: "pre-line",
                                padding: "4px",
                                fontSize: "16px",
                                fontWeight: 500,
                            }}
                        >
                            {service.description || "-"}
                        </p>
                    </div>

                    {/* Information */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <Hash
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                    Slug
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                >
                                    {service.slug}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <DollarSign
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                    {t.dashboard.services.startingPrice}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                >
                                    {service.starting_price
                                        ? `$${service.starting_price}`
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <Layers3
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                    {t.dashboard.services.displayOrder}
                                </p>
                                <p
                                    style={{
                                        fontWeight: 600,
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                >
                                    {service.display_order}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <Palette
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                    {t.dashboard.services.themeColor}
                                </p>
                                <div
                                    style={{
                                        marginTop: "4px",
                                        height: "28px",
                                        width: "48px",
                                        borderRadius: "4px",
                                        border: "1px solid #e2e8f0",
                                        background: service.theme_color,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <Badge
                            variant={
                                service.status === "active"
                                    ? "default"
                                    : "secondary"
                            }
                            style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                padding: "6px 14px",
                            }}
                        >
                            {service.status}
                        </Badge>

                        {service.is_featured && (
                            <Badge
                                variant="outline"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    padding: "6px 14px",
                                }}
                            >
                                <Star
                                    style={{
                                        marginRight: "4px",
                                        height: "14px",
                                        width: "14px",
                                    }}
                                />
                                {t.dashboard.services.featured}
                            </Badge>
                        )}
                    </div>

                    {/* Packages */}
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
                            {t.dashboard.services.packages}
                        </h3>

                        {service.packages && service.packages.length > 0 ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                    width: "100%",
                                }}
                            >
                                {service.packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0",
                                            padding: "16px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px",
                                            boxSizing: "border-box",
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    fontWeight: 700,
                                                    margin: 0,
                                                    padding: "2px 4px",
                                                    fontSize: "18px",
                                                    color: "#000000",
                                                }}
                                            >
                                                {pkg.name[language]}
                                            </h4>
                                            <Badge
                                                variant={
                                                    pkg.status === "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {pkg.status}
                                            </Badge>
                                        </div>

                                        <p
                                            style={{
                                                fontSize: "16px",
                                                color: "#000000",
                                                margin: 0,
                                                padding: "2px 4px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {pkg.description?.[language] || "-"}
                                        </p>

                                        <div
                                            style={{
                                                fontSize: "16px",
                                                color: "#000000",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                                padding: "2px 4px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            <p style={{ margin: 0 }}>
                                                Price: ${pkg.price}
                                            </p>
                                            <p style={{ margin: 0 }}>
                                                Delivery: {pkg.delivery_days} days
                                            </p>
                                            <p style={{ margin: 0 }}>
                                                Revisions: {pkg.revisions}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p
                                style={{
                                    color: "#000000",
                                    padding: "4px",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                }}
                            >
                                {t.dashboard.services.noPackages}
                            </p>
                        )}
                    </div>

                    {/* Dates */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            padding: "4px",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <Calendar
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#000000",
                                    }}
                                >
                                    {new Date(
                                        service.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                                padding: "16px",
                                boxSizing: "border-box",
                                width: "100%",
                            }}
                        >
                            <Calendar
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    color: "#2563eb",
                                    flexShrink: 0,
                                }}
                            />
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
                                        margin: 0,
                                        padding: "2px 4px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#000000",
                                    }}
                                >
                                    {new Date(
                                        service.updated_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}