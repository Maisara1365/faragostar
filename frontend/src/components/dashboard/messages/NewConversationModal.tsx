"use client";

import {
    useEffect,
    useState,
} from "react";

import Button from "@/components/ui/button";

import {
    X,
    MessageCircle,
    User,
    Users,
    ShieldCheck,
} from "lucide-react";

import {
    createConversation,
    createAdminConversation,
    createContentManagerConversation,
} from "@/services/conversation";

import { api } from "@/services/api";

import { useLanguage } from "@/hooks/use-language";

interface Customer {
    id: number;
    name: string;
    email: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export default function NewConversationModal({
    open,
    onClose,
    onCreated,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    const [subject, setSubject] = useState("");
    const [customerId, setCustomerId] = useState<number | "">("");
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [customersLoading, setCustomersLoading] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Load User Role
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!open) return;

        try {
            const storedUser = localStorage.getItem("user");
            const user = JSON.parse(storedUser || "{}");
            const currentRole = typeof user?.role === "string" ? user.role.toLowerCase() : null;
            setRole(currentRole);

            if (currentRole === "admin") {
                loadCustomers();
            }
        } catch (error) {
            console.error("Failed to load current user:", error);
            setRole(null);
        }
    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Load Customers
    |--------------------------------------------------------------------------
    */

    async function loadCustomers() {
        try {
            setCustomersLoading(true);

            const response = await api.get("/admin/customers", {
                params: {
                    per_page: 100,
                },
            });

            const customerData = Array.isArray(response.data?.data)
                ? response.data.data
                : [];

            setCustomers(customerData);
        } catch (error) {
            console.error("Failed to load customers:", error);
            setCustomers([]);
        } finally {
            setCustomersLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create Conversation
    |--------------------------------------------------------------------------
    */

    async function handleCreate() {
        if (role !== "admin" && role !== "customer" && role !== "content_manager") {
            return;
        }

        if (role === "admin" && !customerId) {
            return;
        }

        try {
            setLoading(true);

            if (role === "admin") {
                await createAdminConversation({
                    customer_id: Number(customerId),
                    subject: subject.trim() || undefined,
                });
            }

            if (role === "customer") {
                await createConversation({
                    subject: subject.trim() || undefined,
                });
            }

            if (role === "content_manager") {
                await createContentManagerConversation({
                    subject: subject.trim() || undefined,
                });
            }

            setSubject("");
            setCustomerId("");
            onCreated();
            onClose();
        } catch (error) {
            console.error("Failed to create conversation:", error);
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    /*
    |--------------------------------------------------------------------------
    | Get Role Specific Translations
    |--------------------------------------------------------------------------
    */

    const getRoleDescription = () => {
        if (role === "admin") {
            return isRTL ? "شروع مکالمه با مشتری" : "Start a conversation with a customer";
        } else if (role === "content_manager") {
            return isRTL ? "شروع مکالمه با مدیر" : "Start a conversation with an administrator";
        } else {
            return isRTL ? "شروع مکالمه با تیم پشتیبانی" : "Start a conversation with our support team";
        }
    };

    const getSubjectPlaceholder = () => {
        if (role === "admin") {
            return isRTL ? "موضوع مکالمه را وارد کنید" : "Enter conversation subject";
        } else if (role === "content_manager") {
            return isRTL ? "موضوع را برای مدیر وارد کنید" : "Enter subject for the administrator";
        } else {
            return isRTL ? "موضوع مکالمه را وارد کنید" : "Enter conversation subject";
        }
    };

    const getCustomerLabel = () => {
        return isRTL ? "مشتری" : "Customer";
    };

    const getSelectCustomerText = () => {
        if (customersLoading) {
            return isRTL ? "در حال بارگذاری مشتریان..." : "Loading customers...";
        }
        return isRTL ? "انتخاب مشتری" : "Select a customer";
    };

    const getContentManagerTitle = () => {
        return isRTL ? "مکالمه با مدیر" : "Conversation with administrator";
    };

    const getContentManagerDescription = () => {
        return isRTL ? "مکالمه شما به یک مدیر موجود ارسال خواهد شد" : "Your conversation will be sent to an available administrator.";
    };

    const getSubjectLabel = () => {
        return isRTL ? "موضوع" : "Subject";
    };

    const getStartConversationText = () => {
        return isRTL ? "شروع مکالمه" : "Start Conversation";
    };

    const getCancelText = () => {
        return isRTL ? "لغو" : "Cancel";
    };

    const getNewConversationTitle = () => {
        return isRTL ? "مکالمه جدید" : "New Conversation";
    };

    const getNewConversationDescription = () => {
        return isRTL ? "برای شروع مکالمه جدید، اطلاعات زیر را تکمیل کنید" : "Fill in the details below to start a new conversation";
    };

    return (
        <>
            <style jsx>{`
                /* ─── RTL Support ─── */
                .rtl {
                    direction: rtl;
                    text-align: right;
                }

                .ltr {
                    direction: ltr;
                    text-align: left;
                }

                /* ─── Overlay ─── */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 50;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(8px);
                    animation: fadeIn 0.25s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* ─── Modal Container ─── */
                .modal-container {
                    width: 100%;
                    max-width: 520px;
                    overflow: hidden;
                    border-radius: 24px;
                    border: 1px solid rgba(245, 184, 27, 0.08);
                    background: linear-gradient(180deg, #0f1f33 0%, #0a1628 100%);
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
                    animation: slideUp 0.3s ease;
                }

                /* ─── Header ─── */
                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem 1rem 1.5rem;
                    border-bottom: 1px solid rgba(245, 184, 27, 0.06);
                }

                .rtl .modal-header {
                    flex-direction: row-reverse;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .rtl .header-left {
                    flex-direction: row-reverse;
                }

                .header-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.12), rgba(245, 184, 27, 0.04));
                    border: 1px solid rgba(245, 184, 27, 0.1);
                }

                .header-icon svg {
                    width: 22px;
                    height: 22px;
                    color: #f5b81b;
                }

                .header-title-wrapper {
                    min-width: 0;
                }

                .header-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #ffffff;
                    letter-spacing: -0.2px;
                }

                .header-subtitle {
                    margin-top: 0.1rem;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.35);
                    font-weight: 400;
                }

                /* ─── Close Button ─── */
                .close-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    background: rgba(255, 255, 255, 0.02);
                    color: rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .close-btn:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.15);
                    background: rgba(245, 184, 27, 0.06);
                    color: #f5b81b;
                    transform: rotate(90deg);
                }

                .close-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .close-btn svg {
                    width: 18px;
                    height: 18px;
                }

                /* ─── Body ─── */
                .modal-body {
                    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
                }

                .body-description {
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.4);
                    line-height: 1.6;
                }

                /* ─── Form Group ─── */
                .form-group {
                    margin-top: 1.25rem;
                }

                .form-label {
                    display: block;
                    margin-bottom: 0.4rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    letter-spacing: 0.3px;
                }

                .form-select {
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background: rgba(255, 255, 255, 0.03);
                    color: #eef2f7;
                    font-size: 0.8rem;
                    outline: none;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    appearance: none;
                    cursor: pointer;
                }

                .form-select:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.15);
                    background: rgba(255, 255, 255, 0.05);
                }

                .form-select:focus {
                    border-color: rgba(245, 184, 27, 0.3);
                    box-shadow: 0 0 0 3px rgba(245, 184, 27, 0.06);
                    background: rgba(255, 255, 255, 0.06);
                }

                .form-select:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .form-select option {
                    background: #0a1628;
                    color: #eef2f7;
                    padding: 0.4rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.7rem 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background: rgba(255, 255, 255, 0.03);
                    color: #eef2f7;
                    font-size: 0.8rem;
                    outline: none;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }

                .form-input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .form-input:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.15);
                    background: rgba(255, 255, 255, 0.05);
                }

                .form-input:focus {
                    border-color: rgba(245, 184, 27, 0.3);
                    box-shadow: 0 0 0 3px rgba(245, 184, 27, 0.06);
                    background: rgba(255, 255, 255, 0.06);
                }

                .form-input:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                /* ─── Info Box ─── */
                .info-box {
                    margin-top: 1.25rem;
                    padding: 1rem 1.25rem;
                    border-radius: 14px;
                    border: 1px solid rgba(245, 184, 27, 0.08);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.06), rgba(245, 184, 27, 0.01));
                }

                .info-box-inner {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                }

                .rtl .info-box-inner {
                    flex-direction: row-reverse;
                }

                .info-box-icon {
                    flex-shrink: 0;
                    margin-top: 0.1rem;
                    color: #f5b81b;
                    width: 18px;
                    height: 18px;
                }

                .info-box-title {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.8);
                }

                .info-box-description {
                    margin-top: 0.2rem;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.35);
                    line-height: 1.5;
                }

                /* ─── Footer ─── */
                .modal-footer {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    padding: 1rem 1.5rem 1.5rem 1.5rem;
                    border-top: 1px solid rgba(245, 184, 27, 0.04);
                    background: rgba(0, 0, 0, 0.15);
                }

                .rtl .modal-footer {
                    flex-direction: row-reverse;
                }

                .btn-cancel {
                    padding: 0.5rem 1.2rem;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background: rgba(255, 255, 255, 0.02);
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .btn-cancel:hover:not(:disabled) {
                    border-color: rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.7);
                }

                .btn-cancel:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .btn-submit {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1.4rem;
                    border-radius: 10px;
                    border: 1px solid rgba(245, 184, 27, 0.2);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.12), rgba(245, 184, 27, 0.03));
                    color: #f5b81b;
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .btn-submit:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.4);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.2), rgba(245, 184, 27, 0.06));
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(245, 184, 27, 0.15);
                }

                .btn-submit:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .btn-submit svg {
                    width: 16px;
                    height: 16px;
                }

                .btn-submit .spinner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid rgba(245, 184, 27, 0.2);
                    border-top-color: #f5b81b;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                /* ─── Responsive ─── */
                @media (max-width: 480px) {
                    .modal-container {
                        border-radius: 16px;
                        max-width: 100%;
                    }

                    .modal-header {
                        padding: 1rem 1.25rem 0.75rem 1.25rem;
                    }

                    .modal-body {
                        padding: 1.25rem 1.25rem 0.25rem 1.25rem;
                    }

                    .modal-footer {
                        padding: 0.75rem 1.25rem 1.25rem 1.25rem;
                        flex-direction: column-reverse;
                    }

                    .rtl .modal-footer {
                        flex-direction: column-reverse;
                    }

                    .btn-cancel,
                    .btn-submit {
                        width: 100%;
                        justify-content: center;
                    }

                    .header-icon {
                        width: 38px;
                        height: 38px;
                    }

                    .header-icon svg {
                        width: 18px;
                        height: 18px;
                    }

                    .header-title {
                        font-size: 0.95rem;
                    }
                }
            `}</style>

            <div
                className={`modal-overlay ${isRTL ? "rtl" : "ltr"}`}
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div
                    className="modal-container"
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    {/* Header */}
                    <div className="modal-header">
                        <div className="header-left">
                            <div className="header-icon">
                                <MessageCircle />
                            </div>
                            <div className="header-title-wrapper">
                                <h2 className="header-title">
                                    {getNewConversationTitle()}
                                </h2>
                                <p className="header-subtitle">
                                    {getRoleDescription()}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="close-btn"
                        >
                            <X />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                        <p className="body-description">
                            {getNewConversationDescription()}
                        </p>

                        {/* Admin Customer Selector */}
                        {role === "admin" && (
                            <div className="form-group">
                                <label className="form-label">
                                    {getCustomerLabel()}
                                </label>
                                <select
                                    value={customerId}
                                    onChange={(event) => {
                                        setCustomerId(
                                            event.target.value ? Number(event.target.value) : ""
                                        );
                                    }}
                                    disabled={customersLoading || loading}
                                    className="form-select"
                                >
                                    <option value="">
                                        {getSelectCustomerText()}
                                    </option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} — {customer.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Content Manager Info */}
                        {role === "content_manager" && (
                            <div className="info-box">
                                <div className="info-box-inner">
                                    <ShieldCheck className="info-box-icon" />
                                    <div>
                                        <p className="info-box-title">
                                            {getContentManagerTitle()}
                                        </p>
                                        <p className="info-box-description">
                                            {getContentManagerDescription()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Subject */}
                        <div className="form-group">
                            <label className="form-label">
                                {getSubjectLabel()}
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(event) => setSubject(event.target.value)}
                                placeholder={getSubjectPlaceholder()}
                                disabled={loading}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="btn-cancel"
                        >
                            {getCancelText()}
                        </button>

                        <button
                            type="button"
                            onClick={handleCreate}
                            disabled={loading || (role === "admin" && !customerId)}
                            className="btn-submit"
                        >
                            {loading ? (
                                <span className="spinner" />
                            ) : (
                                <>
                                    <MessageCircle size={16} />
                                    {getStartConversationText()}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}