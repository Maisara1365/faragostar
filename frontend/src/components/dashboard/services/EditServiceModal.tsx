"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Service,
    UpdateServiceData,
} from "@/types/service";

import { useLanguage } from "@/context/language-context";

interface Props {
    open: boolean;
    loading: boolean;

    service: Service | null;

    onClose: () => void;

    onSubmit: (
        id: number,
        data: FormData
    ) => Promise<void>;
}

const initialState: UpdateServiceData = {
    title_fa: "",
    title_en: "",

    slug: "",

    short_description_fa: "",
    short_description_en: "",

    description_fa: "",
    description_en: "",

    starting_price: null,

    display_order: 0,

    theme_color: "#183B73",

    status: "active",

    is_featured: false,
};

export default function EditServiceModal({

    open,
    loading,
    service,

    onClose,
    onSubmit,

}: Props) {

    const { t } = useLanguage();

    const [form, setForm] =
        useState<UpdateServiceData>(initialState);

    const [icon, setIcon] =
        useState<File | null>(null);

    const [coverImage, setCoverImage] =
        useState<File | null>(null);

    // Part 2 — Load Existing Service Into Form
    useEffect(() => {

        if (!service) return;

        setForm({

            title_fa: service.title_fa,

            title_en: service.title_en,

            slug: service.slug,

            short_description_fa:
                service.short_description_fa ?? "",

            short_description_en:
                service.short_description_en ?? "",

            description_fa:
                service.description_fa ?? "",

            description_en:
                service.description_en ?? "",

            starting_price:
                service.starting_price === null
                    ? null
                    : Number(service.starting_price),

            display_order:
                service.display_order,

            theme_color:
                service.theme_color,

            status:
                service.status,

            is_featured:
                service.is_featured,

        });

        setIcon(null);

        setCoverImage(null);

    }, [service]);

    function update<
        K extends keyof UpdateServiceData
    >(key: K, value: UpdateServiceData[K]) {

        setForm(prev => ({

            ...prev,

            [key]: value,

        }));

    }

    // Part 3 — Submit Logic
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        if (!service) return;

        const data = new FormData();

        data.append("title_fa", form.title_fa ?? "");

        data.append("title_en", form.title_en ?? "");

        data.append("slug", form.slug ?? "");

        data.append(
            "short_description_fa",
            form.short_description_fa ?? ""
        );

        data.append(
            "short_description_en",
            form.short_description_en ?? ""
        );

        data.append(
            "description_fa",
            form.description_fa ?? ""
        );

        data.append(
            "description_en",
            form.description_en ?? ""
        );

        data.append(
            "starting_price",
            form.starting_price?.toString() ?? ""
        );

        data.append(
            "display_order",
            String(form.display_order)
        );

        data.append(
            "theme_color",
            form.theme_color ?? "#183B73"
        );

        data.append(
            "status",
            form.status ?? "active"
        );

        data.append(
            "is_featured",
            form.is_featured ? "1" : "0"
        );

        if (icon) {
            data.append("icon", icon);
        }

        if (coverImage) {
            data.append("cover_image", coverImage);
        }

        await onSubmit(
            service.id,
            data
        );

    }

    // Part 4 — Modal UI
    return (

        <Dialog
            open={open}
            onOpenChange={onClose}
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

                        {t.dashboard.services.edit}

                    </DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    style={{
                        width: "100%",
                        padding: "8px",
                        boxSizing: "border-box",
                    }}
                >

                    <div
                        className="grid grid-cols-2 gap-5"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.titleFa}
                            </label>

                            <Input
                                value={form.title_fa ?? ""}
                                onChange={(e) =>
                                    update(
                                        "title_fa",
                                        e.target.value
                                    )
                                }
                                required
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.titleEn}
                            </label>

                            <Input
                                value={form.title_en ?? ""}
                                onChange={(e) =>
                                    update(
                                        "title_en",
                                        e.target.value
                                    )
                                }
                                required
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.slug}
                            </label>

                            <Input
                                value={form.slug ?? ""}
                                onChange={(e) =>
                                    update(
                                        "slug",
                                        e.target.value
                                    )
                                }
                                required
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.startingPrice}
                            </label>

                            <Input
                                type="number"
                                value={form.starting_price ?? ""}
                                onChange={(e) =>
                                    update(
                                        "starting_price",
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value)
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
                        className="grid grid-cols-2 gap-5"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.shortDescriptionFa}
                            </label>

                            <Textarea
                                value={form.short_description_fa ?? ""}
                                onChange={(e) =>
                                    update(
                                        "short_description_fa",
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
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.shortDescriptionEn}
                            </label>

                            <Textarea
                                value={form.short_description_en ?? ""}
                                onChange={(e) =>
                                    update(
                                        "short_description_en",
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
                        className="grid grid-cols-2 gap-5"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.descriptionFa}
                            </label>

                            <Textarea
                                rows={6}
                                value={form.description_fa ?? ""}
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

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.descriptionEn}
                            </label>

                            <Textarea
                                rows={6}
                                value={form.description_en ?? ""}
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

                    </div>

                    {/* Part 5 — File Uploads and Additional Fields */}

                    <div
                        className="grid grid-cols-2 gap-5"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.icon}
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setIcon(
                                        e.target.files?.[0] ?? null
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

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.coverImage}
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setCoverImage(
                                        e.target.files?.[0] ?? null
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

                    <div
                        className="grid grid-cols-4 gap-5"
                        style={{
                            width: "100%",
                            padding: "4px",
                            boxSizing: "border-box",
                        }}
                    >

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.displayOrder}
                            </label>

                            <Input
                                type="number"
                                value={form.display_order}
                                onChange={(e) =>
                                    update(
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

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.themeColor}
                            </label>

                            <input
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
                                    padding: "5px",
                                    borderRadius: "10px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                        <div
                            className="space-y-2"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="text-sm font-medium"
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                }}
                            >
                                {t.dashboard.services.status}
                            </label>

                            <select
                                value={form.status}
                                onChange={(e) =>
                                    update(
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
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                        <div
                            className="flex items-end"
                            style={{
                                padding: "4px",
                            }}
                        >

                            <label
                                className="flex items-center gap-3"
                                style={{
                                    padding: "12px",
                                    width: "100%",
                                    boxSizing: "border-box",
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={form.is_featured}
                                    onChange={(e) =>
                                        update(
                                            "is_featured",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    {t.dashboard.services.featured}
                                </span>

                            </label>

                        </div>

                    </div>

                    <DialogFooter
                        className="gap-3"
                        style={{
                            padding: "20px 8px 8px 8px",
                            marginTop: "8px",
                            gap: "12px",
                        }}
                    >

                        {/* Cancel */}

                        <Button
                            type="button"
                            variant="outline"
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
                                cursor: "pointer",
                                boxSizing: "border-box",
                            }}
                        >
                            {t.common.cancel}
                        </Button>

                        {/* Save */}

                        <Button
                            type="submit"
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

                            {loading ? (

                                <Loader2
                                    className="mr-2 h-4 w-4 animate-spin"
                                />

                            ) : (

                                <Save
                                    className="mr-2 h-4 w-4"
                                />

                            )}

                            {t.common.save}

                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}