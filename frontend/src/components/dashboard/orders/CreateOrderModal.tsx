"use client";

import { useEffect, useState } from "react";
import { 
    CheckCircle2, 
    X, 
    Upload, 
    FileText, 
    Calendar, 
    DollarSign,
    Package as PackageIcon,
    Briefcase,
    Type,
    AlignLeft,
    ArrowRight,
    ArrowLeft,
    Loader2
} from "lucide-react";

import {
    createCustomerOrder,
    updateCustomerOrder,
    getServicePackages,
    getServices,
    uploadOrderFile,
} from "@/services/orders";

import { useLanguage } from "@/hooks/use-language";
import FileUploader from "@/components/dashboard/orders/FileUploader";
import Button from "@/components/ui/button";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    order?: any;
}

export default function CreateOrderModal({
    open,
    onClose,
    onSuccess,
    order,
}: Props) {
    const { t, language} = useLanguage();
    const isRTL = language === "fa";
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<any[]>([]);
    const [packages, setPackages] = useState<any[]>([]);
    const [form, setForm] = useState({
        service_id: "",
        package_id: "",
        title: "",
        description: "",
        budget: "",
        deadline: "",
    });
    const [step, setStep] = useState(1);
    const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<
        Record<string, number>
    >({});
    const [uploadFinished, setUploadFinished] =
        useState<Record<string, boolean>>({});
    const [success, setSuccess] = useState(false);
    const [createdOrder, setCreatedOrder] = useState<any>(null);

    const isEditing = !!order;
    const isPersian = language === 'fa';

    useEffect(() => {
        if (!order) return;

        setForm({
            service_id: order.service?.id?.toString() || "",
            package_id: order.package?.id?.toString() || "",
            title: order.title || "",
            description: order.description || "",
            budget: order.budget?.toString() || "",
            deadline: order.deadline || "",
        });

        setStep(1);
        setCreatedOrderId(order.id);
        setCreatedOrder(order);
    }, [order]);

    useEffect(() => {
        if (!open) return;

        async function loadServices() {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadServices();
    }, [open]);

    useEffect(() => {
        if (!form.service_id || services.length === 0) {
            setPackages([]);
            return;
        }

        async function loadPackages() {
            try {
                const selectedService = services.find(
                    (service) =>
                        String(service.id) === String(form.service_id)
                );

                if (!selectedService?.slug) {
                    setPackages([]);
                    return;
                }

                const data = await getServicePackages(
                    selectedService.slug
                );

                setPackages(data);
            } catch (error) {
                console.error(
                    "Failed to load packages:",
                    error
                );
                setPackages([]);
            }
        }

        loadPackages();
    }, [form.service_id, services]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            const selectedService = services.find(
                (service) =>
                    String(service.id) === String(form.service_id)
            );

            const selectedPackage = packages.find(
                (pkg) =>
                    String(pkg.id) === String(form.package_id)
            );

            const data: any = {
                service_id: Number(selectedService?.id),
            };

            if (selectedPackage) {
                data.package_id = Number(selectedPackage.id);
            }

            if (form.title?.trim()) {
                data.title = form.title.trim();
            }

            if (form.description?.trim()) {
                data.description = form.description.trim();
            }

            if (form.budget) {
                data.budget = Number(form.budget);
            }

            if (form.deadline) {
                data.deadline = form.deadline;
            }

            console.log(
                "FINAL ORDER DATA:",
                JSON.stringify(data, null, 2)
            );

            const savedOrder = isEditing
                ? await updateCustomerOrder(
                      order.id,
                      data
                  )
                : await createCustomerOrder(data);

            setCreatedOrder(savedOrder);
            setCreatedOrderId(savedOrder.id);

            if (isEditing) {
                setSuccess(true);
            } else {
                setStep(2);
            }

            setForm({
                service_id: "",
                package_id: "",
                title: "",
                description: "",
                budget: "",
                deadline: "",
            });
        } catch (error: any) {
            console.error(
                "ORDER SUBMIT ERROR STATUS:",
                error?.response?.status
            );

            console.error(
                "ORDER SUBMIT ERROR DATA:",
                error?.response?.data
                    ? JSON.stringify(
                          error.response.data,
                          null,
                          2
                      )
                    : "NO RESPONSE DATA"
            );

            console.error(
                "ORDER SUBMIT ERROR MESSAGE:",
                error?.message
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleUploadFiles() {
        if (
            !createdOrderId ||
            files.length === 0
        ) {
            onSuccess();
            setSuccess(true);
            return;
        }

        try {
            setUploading(true);
            for (const file of files) {
                await uploadOrderFile(
                    createdOrderId,
                    file,
                    (progress) => {
                        setUploadProgress(prev => ({
                            ...prev,
                            [file.name]: progress,
                        }));
                    }
                );
                setUploadFinished(prev => ({
                    ...prev,
                    [file.name]: true,
                }));
            }
            onSuccess();
            setSuccess(true);
        } finally {
            setUploading(false);
        }
    }

    const handleReset = () => {
        setSuccess(false);
        setCreatedOrder(null);
        setUploadProgress({});
        setUploadFinished({});
        setFiles([]);
        setStep(1);
        if (!isEditing) {
            setForm({
                service_id: "",
                package_id: "",
                title: "",
                description: "",
                budget: "",
                deadline: "",
            });
        }
    };

    const handleClose = () => {
        handleReset();
        onClose();
    };

    if (!open) {
        return null;
    }

    if (success && createdOrder) {
        return (
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(8px)",
                    padding: "1.5rem",
                    animation: "fadeIn 0.3s ease-out",
                }}
                onClick={handleClose}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "42rem",
                        borderRadius: "1.5rem",
                        background: "linear-gradient(145deg, #0f172a, #1e293b)",
                        border: "1px solid rgba(51, 65, 85, 0.5)",
                        padding: "2rem",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2.5rem 2rem",
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "6rem",
                                height: "6rem",
                                borderRadius: "9999px",
                                background: "linear-gradient(135deg, #10b981, #059669)",
                                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
                                animation: "scaleIn 0.5s ease-out",
                            }}
                        >
                            <CheckCircle2
                                style={{
                                    width: "3.5rem",
                                    height: "3.5rem",
                                    color: "#ffffff",
                                }}
                            />
                        </div>

                        <h2
                            style={{
                                fontSize: "1.875rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                marginBottom: "0.75rem",
                            }}
                        >
                            {isEditing 
                                ? t.dashboard.orders.edit.successTitle 
                                : t.dashboard.orders.success.title}
                        </h2>

                        <p
                            style={{
                                color: "#94a3b8",
                                maxWidth: "28rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {isEditing 
                                ? t.dashboard.orders.edit.successMessage 
                                : t.dashboard.orders.success.message}
                        </p>

                        <div
                            style={{
                                borderRadius: "0.75rem",
                                background: "rgba(51, 65, 85, 0.5)",
                                padding: "0.75rem 1.25rem",
                                fontFamily: "monospace",
                                fontSize: "1.125rem",
                                color: "#ffffff",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {createdOrder.order_number}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                marginTop: "2rem",
                                flexDirection: isRTL ? "row-reverse" : "row",
                            }}
                        >
                            <Button
                                href={`/dashboard/orders?id=${createdOrder.id}`}
                                style={{
                                    padding: "0.75rem 2rem",
                                    borderRadius: "1rem",
                                    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                                    color: "#ffffff",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "scale(1.05)";
                                    e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(14, 165, 233, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                {t.dashboard.orders.success.view}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSuccess(false);
                                    handleClose();
                                }}
                                style={{
                                    padding: "0.75rem 2rem",
                                    borderRadius: "1rem",
                                    background: "transparent",
                                    color: "#94a3b8",
                                    fontWeight: 600,
                                    border: "1px solid #475569",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(71, 85, 105, 0.3)";
                                    e.currentTarget.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#94a3b8";
                                }}
                            >
                                {t.dashboard.orders.success.back}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
                padding: "1.5rem",
                animation: "fadeIn 0.3s ease-out",
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "48rem",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "1.5rem",
                    background: "linear-gradient(145deg, #0f172a, #1e293b)",
                    border: "1px solid rgba(51, 65, 85, 0.5)",
                    padding: "2rem",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1.5rem",
                        flexDirection: isRTL ? "row-reverse" : "row",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            background: "linear-gradient(135deg, #f0f9ff, #bae6fd)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {isEditing
                            ? t.dashboard.orders.edit.title
                            : t.dashboard.orders.createOrder.title}
                    </h2>

                    <button
                        onClick={handleClose}
                        style={{
                            padding: "0.5rem",
                            borderRadius: "0.75rem",
                            background: "rgba(71, 85, 105, 0.3)",
                            color: "#94a3b8",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(71, 85, 105, 0.5)";
                            e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(71, 85, 105, 0.3)";
                            e.currentTarget.style.color = "#94a3b8";
                        }}
                    >
                        <X style={{ width: "1.25rem", height: "1.25rem" }} />
                    </button>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            {/* Service */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        color: "#e2e8f0",
                                    }}
                                >
                                    <Briefcase style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                    {t.dashboard.orders.createOrder.service}
                                </label>
                                <select
                                    value={form.service_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            service_id: e.target.value,
                                            package_id: "",
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1.25rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(51, 65, 85, 0.6)",
                                        background: "rgba(30, 41, 59, 0.8)",
                                        color: "#ffffff",
                                        fontSize: "0.875rem",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#0ea5e9";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                    required
                                >
                                    <option value="">
                                        {isPersian ? "انتخاب سرویس" : "Select Service"}
                                    </option>
                                    {services.map((service) => (
                                        <option
                                            key={service.id}
                                            value={service.id}
                                        >
                                            {service.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Package */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        color: "#e2e8f0",
                                    }}
                                >
                                    <PackageIcon style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                    {t.dashboard.orders.createOrder.package}
                                </label>
                                <select
                                    value={form.package_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            package_id: e.target.value,
                                        })
                                    }
                                    disabled={!form.service_id}
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1.25rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(51, 65, 85, 0.6)",
                                        background: "rgba(30, 41, 59, 0.8)",
                                        color: "#ffffff",
                                        fontSize: "0.875rem",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        opacity: !form.service_id ? 0.5 : 1,
                                        cursor: !form.service_id ? "not-allowed" : "pointer",
                                    }}
                                    onFocus={(e) => {
                                        if (form.service_id) {
                                            e.currentTarget.style.borderColor = "#0ea5e9";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                        }
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <option value="">
                                        {t.dashboard.orders.createOrder.noPackage}
                                    </option>
                                    {packages.map((pkg) => (
                                        <option
                                            key={pkg.id}
                                            value={pkg.id}
                                        >
                                            {pkg.name[language]}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Project Title */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        color: "#e2e8f0",
                                    }}
                                >
                                    <Type style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                    {t.dashboard.orders.createOrder.projectTitle}
                                </label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder={isPersian ? "عنوان پروژه را وارد کنید" : "Enter project title"}
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1.25rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(51, 65, 85, 0.6)",
                                        background: "rgba(30, 41, 59, 0.8)",
                                        color: "#ffffff",
                                        fontSize: "0.875rem",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#0ea5e9";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        color: "#e2e8f0",
                                    }}
                                >
                                    <AlignLeft style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                    {t.dashboard.orders.createOrder.description}
                                </label>
                                <textarea
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder={isPersian ? "توضیحات پروژه را وارد کنید" : "Enter project description"}
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem 1.25rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(51, 65, 85, 0.6)",
                                        background: "rgba(30, 41, 59, 0.8)",
                                        color: "#ffffff",
                                        fontSize: "0.875rem",
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        resize: "vertical",
                                        minHeight: "6rem",
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = "#0ea5e9";
                                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                />
                            </div>

                            {/* Budget + Deadline */}
                            <div
                                style={{
                                    display: "grid",
                                    gap: "1rem",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                }}
                            >
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "0.5rem",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            color: "#e2e8f0",
                                        }}
                                    >
                                        <DollarSign style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                        {t.dashboard.orders.createOrder.budget}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.budget}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                budget: e.target.value,
                                            })
                                        }
                                        placeholder="0"
                                        style={{
                                            width: "100%",
                                            padding: "0.875rem 1.25rem",
                                            borderRadius: "1rem",
                                            border: "1px solid rgba(51, 65, 85, 0.6)",
                                            background: "rgba(30, 41, 59, 0.8)",
                                            color: "#ffffff",
                                            fontSize: "0.875rem",
                                            outline: "none",
                                            transition: "all 0.2s ease",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#0ea5e9";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "0.5rem",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            color: "#e2e8f0",
                                        }}
                                    >
                                        <Calendar style={{ display: "inline", width: "1rem", height: "1rem", marginRight: "0.5rem" }} />
                                        {t.dashboard.orders.createOrder.deadline}
                                    </label>
                                    <input
                                        type="date"
                                        value={form.deadline}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                deadline: e.target.value,
                                            })
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "0.875rem 1.25rem",
                                            borderRadius: "1rem",
                                            border: "1px solid rgba(51, 65, 85, 0.6)",
                                            background: "rgba(30, 41, 59, 0.8)",
                                            color: "#ffffff",
                                            fontSize: "0.875rem",
                                            outline: "none",
                                            transition: "all 0.2s ease",
                                        }}
                                        onFocus={(e) => {
                                            e.currentTarget.style.borderColor = "#0ea5e9";
                                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14, 165, 233, 0.15)";
                                        }}
                                        onBlur={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    gap: "1rem",
                                    paddingTop: "1rem",
                                    borderTop: "1px solid rgba(51, 65, 85, 0.3)",
                                    flexDirection: isRTL ? "row-reverse" : "row",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    style={{
                                        padding: "0.75rem 1.5rem",
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(51, 65, 85, 0.6)",
                                        background: "transparent",
                                        color: "#94a3b8",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(71, 85, 105, 0.3)";
                                        e.currentTarget.style.color = "#ffffff";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "#94a3b8";
                                    }}
                                >
                                    {isPersian ? "لغو" : "Cancel"}
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "0.5rem",
                                        padding: "0.75rem 2rem",
                                        borderRadius: "1rem",
                                        background: loading
                                            ? "rgba(51, 65, 85, 0.6)"
                                            : "linear-gradient(135deg, #0ea5e9, #2563eb)",
                                        color: "#ffffff",
                                        fontSize: "0.875rem",
                                        fontWeight: 600,
                                        border: "none",
                                        cursor: loading ? "not-allowed" : "pointer",
                                        transition: "all 0.3s ease",
                                        boxShadow: loading
                                            ? "none"
                                            : "0 10px 25px -5px rgba(14, 165, 233, 0.3)",
                                        opacity: loading ? 0.6 : 1,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!loading) {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                            e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(14, 165, 233, 0.4)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!loading) {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(14, 165, 233, 0.3)";
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        if (!loading) {
                                            e.currentTarget.style.transform = "scale(0.95)";
                                        }
                                    }}
                                    onMouseUp={(e) => {
                                        if (!loading) {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} />
                                            {isPersian ? "در حال ارسال..." : "Submitting..."}
                                        </>
                                    ) : (
                                        <>
                                            {isEditing
                                                ? t.dashboard.orders.edit.save
                                                : t.dashboard.orders.createOrder.submit}
                                            {!isRTL && <ArrowRight style={{ width: "1rem", height: "1rem" }} />}
                                            {isRTL && <ArrowLeft style={{ width: "1rem", height: "1rem" }} />}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <div>
                        <h2
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                marginBottom: "0.5rem",
                            }}
                        >
                            {t.dashboard.orders.createOrder.uploadFiles}
                        </h2>

                        <p
                            style={{
                                color: "#94a3b8",
                                marginBottom: "1.5rem",
                            }}
                        >
                            {isPersian
                                ? "فایل‌های مرتبط با پروژه خود را آپلود کنید"
                                : "Upload files related to your project"}
                        </p>

                        <div style={{ marginTop: "0.5rem" }}>
                            <FileUploader
                                files={files}
                                setFiles={setFiles}
                                uploadProgress={uploadProgress}
                                uploadFinished={uploadFinished}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "0.75rem",
                                marginTop: "2rem",
                                paddingTop: "1.5rem",
                                borderTop: "1px solid rgba(51, 65, 85, 0.3)",
                                flexDirection: isRTL ? "row-reverse" : "row",
                            }}
                        >
                            <button
                                onClick={() => {
                                    onSuccess();
                                    setSuccess(true);
                                }}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "1rem",
                                    border: "1px solid rgba(51, 65, 85, 0.6)",
                                    background: "transparent",
                                    color: "#94a3b8",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(71, 85, 105, 0.3)";
                                    e.currentTarget.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "#94a3b8";
                                }}
                            >
                                {isPersian ? "رد شدن" : "Skip"}
                            </button>

                            <button
                                disabled={uploading}
                                onClick={handleUploadFiles}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "1rem",
                                    background: uploading
                                        ? "rgba(51, 65, 85, 0.6)"
                                        : "linear-gradient(135deg, #0ea5e9, #2563eb)",
                                    color: "#ffffff",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: uploading ? "not-allowed" : "pointer",
                                    transition: "all 0.3s ease",
                                    opacity: uploading ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (!uploading) {
                                        e.currentTarget.style.transform = "scale(1.05)";
                                        e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(14, 165, 233, 0.3)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!uploading) {
                                        e.currentTarget.style.transform = "scale(1)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }
                                }}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 style={{ width: "1rem", height: "1rem", animation: "spin 1s linear infinite" }} />
                                        {isPersian ? "در حال آپلود..." : "Uploading..."}
                                    </>
                                ) : (
                                    <>
                                        <Upload style={{ width: "1rem", height: "1rem" }} />
                                        {isPersian ? "پایان" : "Finish"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
                
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}