"use client";

import * as React from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/language-context";
import { updatePortfolio } from "@/services/portfolio";
import type { Portfolio, PortfolioFormData } from "@/types/portfolio";

interface EditPortfolioModalProps {
    open: boolean;
    portfolio: Portfolio | null;
    onClose: () => void;
    onUpdated: () => void;
}

export default function EditPortfolioModal({
    open,
    portfolio,
    onClose,
    onUpdated,
}: EditPortfolioModalProps) {
    const { t } = useLanguage();

    const [loading, setLoading] = React.useState(false);

    const [imagePreview, setImagePreview] =
        React.useState<string | null>(null);

    const [form, setForm] =
        React.useState<PortfolioFormData>({
            title_fa: "",
            title_en: "",
            slug: "",
            category_fa: "",
            category_en: "",
            description_fa: "",
            description_en: "",
            client_name: "",
            project_url: "",
            completion_date: "",
            theme_color: "#183B73",
            display_order: 0,
            is_featured: false,
            status: "active",
            image: null,
        });

    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    React.useEffect(() => {

        if (!portfolio) return;

        setForm({
            title_fa: portfolio.title_fa,
            title_en: portfolio.title_en,
            slug: portfolio.slug,
            category_fa: portfolio.category_fa,
            category_en: portfolio.category_en,
            description_fa: portfolio.description_fa ?? "",
            description_en: portfolio.description_en ?? "",
            client_name: portfolio.client_name ?? "",
            project_url: portfolio.project_url ?? "",
            completion_date: portfolio.completion_date ?? "",
            theme_color: portfolio.theme_color,
            display_order: portfolio.display_order,
            is_featured: portfolio.is_featured,
            status: portfolio.status,
            image: null,
        });

        setImagePreview(portfolio.image);

    }, [portfolio]);

    /*
    |--------------------------------------------------------------------------
    | Input Change
    |--------------------------------------------------------------------------
    */

    function handleChange<T extends keyof PortfolioFormData>(
        key: T,
        value: PortfolioFormData[T]
    ) {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    /*
    |--------------------------------------------------------------------------
    | Image
    |--------------------------------------------------------------------------
    */

    function handleImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        handleChange("image", file);

        setImagePreview(
            URL.createObjectURL(file)
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit() {

        if (!portfolio) return;

        try {

            setLoading(true);

            await updatePortfolio(
                portfolio.id,
                form
            );

            toast.success(
                t.dashboard.portfolio.messages.updated
            );

            onUpdated();

            onClose();

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message ??
                t.common.somethingWentWrong
            );

        } finally {

            setLoading(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Dialog
            open={open}
            onOpenChange={(value) => {

                if (!loading && !value) {
                    onClose();
                }

            }}
        >

            <DialogContent
                className="max-h-[95vh] overflow-y-auto sm:max-w-5xl"
                style={{
                    width: "90vw",
                    maxWidth: "1000px",
                    maxHeight: "90vh",
                    padding: "32px",
                    boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >

                {/* ======================================================
                    HEADER
                ====================================================== */}

                <DialogHeader
                    style={{
                        padding: "4px 8px 16px 8px",
                    }}
                >

                    <DialogTitle
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.portfolio.edit}
                    </DialogTitle>

                    <DialogDescription
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.portfolio.editDescription}
                    </DialogDescription>

                </DialogHeader>


                {/* ======================================================
                    MAIN CONTENT
                ====================================================== */}

                <div
                    className="space-y-8"
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                >

                    {/* ------------------------------------------------
                        IMAGE
                    ------------------------------------------------ */}

                    <div
                        className="space-y-4"
                        style={{
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >

                        <label
                            className="text-sm font-medium"
                            style={{
                                display: "block",
                                padding: "2px 4px 8px 4px",
                            }}
                        >
                            {t.dashboard.portfolio.image}
                        </label>

                        <div
                            className="flex flex-col gap-6 md:flex-row"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <div
                                className="relative h-48 w-full overflow-hidden rounded-xl border md:w-72"
                                style={{
                                    padding: "4px",
                                    boxSizing: "border-box",
                                }}
                            >

                                {imagePreview ? (

                                    <Image
                                        fill
                                        src={imagePreview}
                                        alt="Portfolio"
                                        className="object-cover"
                                    />

                                ) : (

                                    <div
                                        className="flex h-full items-center justify-center text-slate-400"
                                        style={{
                                            padding: "16px",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        No Image
                                    </div>

                                )}

                            </div>

                            <div
                                className="flex flex-1 items-center"
                                style={{
                                    padding: "8px",
                                    boxSizing: "border-box",
                                }}
                            >

                                <label
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed transition hover:bg-slate-50"
                                    style={{
                                        width: "100%",
                                        padding: "16px 20px",
                                        boxSizing: "border-box",
                                    }}
                                >

                                    <Upload
                                        className="h-5 w-5"
                                    />

                                    <span>
                                        {t.dashboard.portfolio.uploadImage}
                                    </span>

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />

                                </label>

                            </div>

                        </div>

                    </div>


                    {/* ------------------------------------------------
                        PERSIAN
                    ------------------------------------------------ */}

                    <section
                        className="space-y-5"
                        style={{
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >

                        <h3
                            className="text-lg font-semibold"
                            style={{
                                padding: "4px",
                            }}
                        >
                            فارسی
                        </h3>

                        <div
                            className="grid gap-5 md:grid-cols-2"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <div
                                style={{
                                    padding: "4px",
                                }}
                            >

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.titleFa}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.title_fa}
                                    onChange={(e) =>
                                        handleChange(
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

                            <div
                                style={{
                                    padding: "4px",
                                }}
                            >

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.categoryFa}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.category_fa}
                                    onChange={(e) =>
                                        handleChange(
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

                        </div>

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="mb-2 block text-sm font-medium"
                                style={{
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.portfolio.descriptionFa}
                            </label>

                            <textarea
                                rows={5}
                                className="w-full rounded-xl border"
                                value={form.description_fa}
                                onChange={(e) =>
                                    handleChange(
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

                    </section>


                    {/* ------------------------------------------------
                        ENGLISH
                    ------------------------------------------------ */}

                    <section
                        className="space-y-5"
                        style={{
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >

                        <h3
                            className="text-lg font-semibold"
                            style={{
                                padding: "4px",
                            }}
                        >
                            English
                        </h3>

                        <div
                            className="grid gap-5 md:grid-cols-2"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <div
                                style={{
                                    padding: "4px",
                                }}
                            >

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.titleEn}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.title_en}
                                    onChange={(e) =>
                                        handleChange(
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

                            <div
                                style={{
                                    padding: "4px",
                                }}
                            >

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.categoryEn}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.category_en}
                                    onChange={(e) =>
                                        handleChange(
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

                        <div
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="mb-2 block text-sm font-medium"
                                style={{
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.portfolio.descriptionEn}
                            </label>

                            <textarea
                                rows={5}
                                className="w-full rounded-xl border"
                                value={form.description_en}
                                onChange={(e) =>
                                    handleChange(
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

                    </section>


                    {/* ------------------------------------------------
                        PROJECT INFORMATION
                    ------------------------------------------------ */}

                    <section
                        className="space-y-5"
                        style={{
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >

                        <h3
                            className="text-lg font-semibold"
                            style={{
                                padding: "4px",
                            }}
                        >
                            {t.dashboard.portfolio.details}
                        </h3>

                        <div
                            className="grid gap-5 md:grid-cols-2"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.slug}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.slug}
                                    onChange={(e) =>
                                        handleChange(
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

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.client}
                                </label>

                                <input
                                    className="w-full rounded-xl border"
                                    value={form.client_name}
                                    onChange={(e) =>
                                        handleChange(
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

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.projectUrl}
                                </label>

                                <input
                                    type="url"
                                    className="w-full rounded-xl border"
                                    value={form.project_url}
                                    onChange={(e) =>
                                        handleChange(
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

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.completionDate}
                                </label>

                                <input
                                    type="date"
                                    className="w-full rounded-xl border"
                                    value={form.completion_date}
                                    onChange={(e) =>
                                        handleChange(
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

                        </div>

                    </section>


                    {/* ------------------------------------------------
                        DISPLAY
                    ------------------------------------------------ */}

                    <section
                        className="space-y-5"
                        style={{
                            padding: "8px",
                            boxSizing: "border-box",
                        }}
                    >

                        <h3
                            className="text-lg font-semibold"
                            style={{
                                padding: "4px",
                            }}
                        >
                            {t.dashboard.portfolio.display}
                        </h3>

                        <div
                            className="grid gap-5 md:grid-cols-2"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.themeColor}
                                </label>

                                <input
                                    type="color"
                                    className="w-full rounded-xl border"
                                    value={form.theme_color}
                                    onChange={(e) =>
                                        handleChange(
                                            "theme_color",
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        padding: "5px",
                                        borderRadius: "10px",
                                        boxSizing: "border-box",
                                    }}
                                />

                            </div>

                            <div style={{ padding: "4px" }}>

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.displayOrder}
                                </label>

                                <input
                                    type="number"
                                    min={0}
                                    className="w-full rounded-xl border"
                                    value={form.display_order}
                                    onChange={(e) =>
                                        handleChange(
                                            "display_order",
                                            Number(e.target.value)
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

                        <div
                            className="grid gap-5 md:grid-cols-2"
                            style={{
                                width: "100%",
                                padding: "4px",
                                boxSizing: "border-box",
                            }}
                        >

                            <label
                                className="flex items-center gap-3 rounded-xl border"
                                style={{
                                    padding: "14px",
                                    boxSizing: "border-box",
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={form.is_featured}
                                    onChange={(e) =>
                                        handleChange(
                                            "is_featured",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    {t.dashboard.portfolio.featured}
                                </span>

                            </label>

                            <div
                                style={{
                                    padding: "4px",
                                }}
                            >

                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{
                                        padding: "2px 4px",
                                    }}
                                >
                                    {t.dashboard.portfolio.statusLabel}
                                </label>

                                <select
                                    className="w-full rounded-xl border"
                                    value={form.status}
                                    onChange={(e) =>
                                        handleChange(
                                            "status",
                                            e.target.value as
                                                | "active"
                                                | "inactive"
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        padding: "12px 14px",
                                        borderRadius: "10px",
                                        boxSizing: "border-box",
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

                        </div>

                    </section>

                </div>


                {/* ======================================================
                    FOOTER BUTTONS
                ====================================================== */}

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
                        disabled={loading}
                        onClick={onClose}
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


                    {/* Save */}

                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
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
                            <Loader2
                                className="mr-2 h-4 w-4 animate-spin"
                            />
                        )}

                        {t.dashboard.portfolio.edit}

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );
}