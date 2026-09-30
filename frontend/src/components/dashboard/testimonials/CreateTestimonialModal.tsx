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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Loader2 } from "lucide-react";

import { useLanguage } from "@/context/language-context";

import testimonialService from "@/services/testimonial";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

interface FormData {
    name: string;

    company_fa: string;
    company_en: string;

    position_fa: string;
    position_en: string;

    review_fa: string;
    review_en: string;

    rating: number;

    display_order: number;

    status: "active" | "inactive";

    is_featured: boolean;

    image: File | null;
}

const initialState: FormData = {
    name: "",

    company_fa: "",
    company_en: "",

    position_fa: "",
    position_en: "",

    review_fa: "",
    review_en: "",

    rating: 5,

    display_order: 0,

    status: "active",

    is_featured: false,

    image: null,
};

export default function CreateTestimonialModal({
    open,
    onOpenChange,
    onSuccess,
}: Props) {
    const { t } = useLanguage();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<FormData>(initialState);

    useEffect(() => {
        if (!open) {
            setForm(initialState);
        }
    }, [open]);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await testimonialService.create({
                name: form.name,

                company_fa: form.company_fa,
                company_en: form.company_en,

                position_fa: form.position_fa,
                position_en: form.position_en,

                review_fa: form.review_fa,
                review_en: form.review_en,

                rating: form.rating,

                display_order: form.display_order,

                status: form.status,

                is_featured: form.is_featured,

                image: form.image,
            });

            onSuccess();

            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
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
                        {t.dashboard.testimonials.create}
                    </DialogTitle>

                    <DialogDescription
                        style={{
                            padding: "4px",
                        }}
                    >
                        {t.dashboard.testimonials.createDescription}
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

                    {/* Client Information */}

                    <div
                        className="grid grid-cols-2 gap-4"
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.name}
                            </Label>

                            <Input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.rating}
                            </Label>

                            <Select
                                value={String(form.rating)}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        rating: Number(value),
                                    })
                                }
                            >

                                <SelectTrigger
                                    style={{
                                        width: "100%",
                                        minHeight: "48px",
                                        padding: "12px 14px",
                                        boxSizing: "border-box",
                                    }}
                                >

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="1">
                                        1 ⭐
                                    </SelectItem>

                                    <SelectItem value="2">
                                        2 ⭐⭐
                                    </SelectItem>

                                    <SelectItem value="3">
                                        3 ⭐⭐⭐
                                    </SelectItem>

                                    <SelectItem value="4">
                                        4 ⭐⭐⭐⭐
                                    </SelectItem>

                                    <SelectItem value="5">
                                        5 ⭐⭐⭐⭐⭐
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                    {/* Company */}

                    <div
                        className="grid grid-cols-2 gap-4"
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.companyFa}
                            </Label>

                            <Input
                                value={form.company_fa}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_fa: e.target.value,
                                    })
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.companyEn}
                            </Label>

                            <Input
                                value={form.company_en}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_en: e.target.value,
                                    })
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                    </div>

                    {/* Position */}

                    <div
                        className="grid grid-cols-2 gap-4"
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.positionFa}
                            </Label>

                            <Input
                                value={form.position_fa}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        position_fa: e.target.value,
                                    })
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.dashboard.testimonials.positionEn}
                            </Label>

                            <Input
                                value={form.position_en}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        position_en: e.target.value,
                                    })
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 14px",
                                    boxSizing: "border-box",
                                }}
                            />

                        </div>

                    </div>

                    {/* Reviews */}

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
                            {t.dashboard.testimonials.reviewFa}
                        </Label>

                        <Textarea
                            rows={5}
                            value={form.review_fa}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    review_fa: e.target.value,
                                })
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

                        <Label
                            style={{
                                display: "block",
                                padding: "2px 4px",
                                marginBottom: "8px",
                            }}
                        >
                            {t.dashboard.testimonials.reviewEn}
                        </Label>

                        <Textarea
                            rows={5}
                            value={form.review_en}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    review_en: e.target.value,
                                })
                            }
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                boxSizing: "border-box",
                            }}
                        />

                    </div>

                    {/* Display */}

                    <div
                        className="grid grid-cols-2 gap-4"
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.common.displayOrder}
                            </Label>

                            <Input
                                type="number"
                                value={form.display_order}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        display_order: Number(
                                            e.target.value
                                        ),
                                    })
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

                            <Label
                                style={{
                                    display: "block",
                                    padding: "2px 4px",
                                    marginBottom: "8px",
                                }}
                            >
                                {t.common.status}
                            </Label>

                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        status: value as
                                            | "active"
                                            | "inactive",
                                    })
                                }
                            >

                                <SelectTrigger
                                    style={{
                                        width: "100%",
                                        minHeight: "48px",
                                        padding: "12px 14px",
                                        boxSizing: "border-box",
                                    }}
                                >

                                    <SelectValue />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="active">
                                        {t.common.active}
                                    </SelectItem>

                                    <SelectItem value="inactive">
                                        {t.common.inactive}
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                    {/* Featured */}

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
                                    setForm({
                                        ...form,
                                        is_featured: e.target.checked,
                                    })
                                }
                            />

                            <Label>
                                {t.dashboard.testimonials.featured}
                            </Label>

                        </div>

                    </div>

                    {/* Image */}

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
                            {t.dashboard.testimonials.image}
                        </Label>

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image:
                                        e.target.files?.[0] ??
                                        null,
                                })
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

                {/* Footer */}

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
                        onClick={() =>
                            onOpenChange(false)
                        }
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

                    {/* Create */}

                    <Button
                        onClick={handleSubmit}
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
                            <Loader2
                                className="mr-2 h-4 w-4 animate-spin"
                            />
                        )}

                        {t.common.create}

                    </Button>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}