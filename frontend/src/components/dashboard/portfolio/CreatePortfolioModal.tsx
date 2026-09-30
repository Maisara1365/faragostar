"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useLanguage } from "@/context/language-context";

import {
    createPortfolio,
} from "@/services/portfolio";

import type {
    PortfolioFormData,
} from "@/types/portfolio";

interface Props {
    open: boolean;

    onClose: () => void;

    onCreated: () => void;
}

const initialData: PortfolioFormData = {
    title_fa: "",
    title_en: "",

    slug: "",

    category_fa: "",
    category_en: "",

    description_fa: "",
    description_en: "",

    image: null,

    project_url: "",

    client_name: "",

    completion_date: "",

    theme_color: "#183B73",

    display_order: 0,

    is_featured: false,

    status: "active",
};

export default function CreatePortfolioModal({
    open,
    onClose,
    onCreated,
}: Props) {
    const { t } = useLanguage();

    const [loading, setLoading] = useState(false);

    const [form, setForm] =
        useState<PortfolioFormData>(initialData);

    /*
    |--------------------------------------------------------------------------
    | Reset Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) {
            setForm(initialData);
        }
    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Update Form
    |--------------------------------------------------------------------------
    */

    function update<K extends keyof PortfolioFormData>(
        key: K,
        value: PortfolioFormData[K]
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function submit() {
        try {
            setLoading(true);

            await createPortfolio(form);

            toast.success(
                t.dashboard.portfolio.messages?.created ??
                    t.common.create
            );

            setForm(initialData);

            onCreated();

            onClose();
        } catch (error: any) {
            console.error(
                "Failed to create portfolio:",
                error
            );

            toast.error(
                error?.response?.data?.message ??
                    t.common.somethingWentWrong
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!loading) {
                    onClose();
                }
            }}
        >
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

                {/* =========================================================
                    HEADER
                ========================================================= */}

                <DialogHeader
                    style={{
                        padding: "4px 8px 12px 8px",
                    }}
                >
                    <DialogTitle
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.portfolio.create}
                    </DialogTitle>

                    <DialogDescription
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.portfolio.createDescription}
                    </DialogDescription>
                </DialogHeader>

                <div
                    className="grid gap-6"
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                >

                    {/* =====================================================
                        BASIC INFORMATION
                    ===================================================== */}

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Title Persian */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.titleFa}
                            </Label>

                            <Input
                                value={form.title_fa}
                                onChange={(e) =>
                                    update(
                                        "title_fa",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Title English */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.titleEn}
                            </Label>

                            <Input
                                value={form.title_en}
                                onChange={(e) =>
                                    update(
                                        "title_en",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                    </div>

                    {/* =====================================================
                        SLUG + CLIENT
                    ===================================================== */}

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Slug */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.slug}
                            </Label>

                            <Input
                                value={form.slug}
                                onChange={(e) =>
                                    update(
                                        "slug",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Client */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.client}
                            </Label>

                            <Input
                                value={form.client_name}
                                onChange={(e) =>
                                    update(
                                        "client_name",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                    </div>

                    {/* =====================================================
                        CATEGORY
                    ===================================================== */}

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Category Persian */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.categoryFa}
                            </Label>

                            <Input
                                value={form.category_fa}
                                onChange={(e) =>
                                    update(
                                        "category_fa",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Category English */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.categoryEn}
                            </Label>

                            <Input
                                value={form.category_en}
                                onChange={(e) =>
                                    update(
                                        "category_en",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                    </div>

                    {/* =====================================================
                        PROJECT INFORMATION
                    ===================================================== */}

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Completion Date */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.completionDate}
                            </Label>

                            <Input
                                type="date"
                                value={form.completion_date}
                                onChange={(e) =>
                                    update(
                                        "completion_date",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Project URL */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.projectUrl}
                            </Label>

                            <Input
                                type="url"
                                value={form.project_url}
                                onChange={(e) =>
                                    update(
                                        "project_url",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                    </div>

                    {/* =====================================================
                        DISPLAY SETTINGS
                    ===================================================== */}

                    <div
                        className="grid grid-cols-2 gap-4"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        {/* Display Order */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.displayOrder}
                            </Label>

                            <Input
                                type="number"
                                value={form.display_order}
                                onChange={(e) =>
                                    update(
                                        "display_order",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Theme Color */}

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >
                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.portfolio.themeColor}
                            </Label>

                            <Input
                                type="color"
                                value={form.theme_color}
                                onChange={(e) =>
                                    update(
                                        "theme_color",
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    height: "48px",
                                    padding: "6px",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                    </div>

                    {/* =====================================================
                        STATUS
                    ===================================================== */}

                    <div
                        style={{
                            padding: "4px",
                        }}
                    >
                        <Label
                            style={{
                                display: "block",
                                padding: "2px 4px",
                                marginBottom: "8px",
                            }}
                        >
                            {t.dashboard.portfolio.statusLabel}
                        </Label>

                        <select
                            value={form.status}
                            onChange={(event) =>
                                update(
                                    "status",
                                    event.target.value as
                                        | "active"
                                        | "inactive"
                                )
                            }
                            style={{
                                width: "100%",
                                minHeight: "48px",
                                padding: "12px 14px",
                                borderRadius: "8px",
                                boxSizing: "border-box",
                                background: "transparent",
                            }}
                        >
                            <option value="active">
                                {t.common.active}
                            </option>

                            <option value="inactive">
                                {t.common.inactive}
                            </option>
                        </select>
                    </div>

                    {/* =====================================================
                        DESCRIPTIONS
                    ===================================================== */}

                    {/* Persian Description */}

                    <div
                        style={{
                            padding: "4px",
                        }}
                    >
                        <Label
                            style={{
                                display: "block",
                                padding: "2px 4px",
                                marginBottom: "8px",
                            }}
                        >
                            {t.dashboard.portfolio.descriptionFa}
                        </Label>

                        <Textarea
                            rows={5}
                            value={form.description_fa}
                            onChange={(e) =>
                                update(
                                    "description_fa",
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* English Description */}

                    <div
                        style={{
                            padding: "4px",
                        }}
                    >
                        <Label
                            style={{
                                display: "block",
                                padding: "2px 4px",
                                marginBottom: "8px",
                            }}
                        >
                            {t.dashboard.portfolio.descriptionEn}
                        </Label>

                        <Textarea
                            rows={5}
                            value={form.description_en}
                            onChange={(e) =>
                                update(
                                    "description_en",
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* =====================================================
                        FEATURED
                    ===================================================== */}

                    <div
                        style={{
                            padding: "4px",
                        }}
                    >
                        <div
                            className="flex items-center gap-3"
                            style={{
                                padding: "12px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Checkbox
                                checked={form.is_featured}
                                onChange={(e) =>
                                    update(
                                        "is_featured",
                                        e.target.checked
                                    )
                                }
                            />

                            <Label>
                                {t.dashboard.portfolio.featured}
                            </Label>
                        </div>
                    </div>

                    {/* =====================================================
                        IMAGE
                    ===================================================== */}

                    <div
                        style={{
                            padding: "4px",
                        }}
                    >
                        <Label
                            style={{
                                display: "block",
                                padding: "2px 4px",
                                marginBottom: "8px",
                            }}
                        >
                            {t.dashboard.portfolio.image}
                        </Label>

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(event) =>
                                update(
                                    "image",
                                    event.target.files?.[0] ??
                                        null
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                </div>

                {/* =========================================================
                    FOOTER
                ========================================================= */}

                <DialogFooter
                    style={{
                        padding: "20px 8px 8px 8px",
                        marginTop: "8px",
                        gap: "12px",
                    }}
                >

                    {/* Cancel */}

                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "12px 24px",
                            minHeight: "46px",
                            minWidth: "120px",
                            borderRadius: "9999px",
                            border: "2px solid #94a3b8",
                            background: "transparent",
                            color: "#475569",
                            fontWeight: 600,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                            opacity: loading ? 0.7 : 1,
                            boxSizing: "border-box",
                        }}
                    >
                        {t.common.cancel}
                    </Button>

                    {/* Create */}

                    <Button
                        onClick={submit}
                        disabled={loading}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "12px 24px",
                            minHeight: "46px",
                            minWidth: "130px",
                            borderRadius: "9999px",
                            border: "2px solid #2563eb",
                            background: "transparent",
                            color: "#2563eb",
                            fontWeight: 700,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                            opacity: loading ? 0.7 : 1,
                            boxSizing: "border-box",
                        }}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {t.common.create}
                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}