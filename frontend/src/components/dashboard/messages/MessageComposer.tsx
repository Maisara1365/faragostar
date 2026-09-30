"use client";

import { useRef, useState } from "react";
import { sendMessage } from "@/services/message";
import {
    Paperclip,
    SendHorizontal,
    ArrowLeft,
    X,
} from "lucide-react";
import Button from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import AttachmentPreview from "./AttachmentPreview";

interface Props {
    conversationId?: number;
    onSent?: () => void;
}

export default function MessageComposer({
    conversationId,
    onSent,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [sending, setSending] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleSend() {
        if (!conversationId || sending) return;
        if (!message.trim() && files.length === 0) return;

        setSending(true);

        try {
            await sendMessage(conversationId, message.trim(), files);
            setMessage("");
            setFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            onSent?.();
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setSending(false);
        }
    }

    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setFiles((prev) => [...prev, ...Array.from(fileList)]);
    }

    function removeFile(index: number) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }

    const canSend =
        Boolean(conversationId) &&
        !sending &&
        (Boolean(message.trim()) || files.length > 0);

    // ─── Translations ───
    const getSendText = () => isRTL ? "ارسال" : "Send";
    const getPlaceholderText = () => {
        if (!conversationId) {
            return isRTL ? "مکالمه‌ای انتخاب کنید" : "Select a conversation";
        }
        return isRTL ? "پیام خود را تایپ کنید..." : "Type a message...";
    };
    const getNoAttachmentsText = () => isRTL ? "بدون پیوست" : "No attachments";
    const getAttachLabel = () => isRTL ? "ضمیمه" : "Attach file";

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

                /* ─── Composer Container ─── */
                .composer-container {
                    border-top: 1px solid rgba(245, 184, 27, 0.06);
                    background: linear-gradient(180deg, rgba(10, 22, 40, 0.95), rgba(6, 16, 29, 0.98));
                    padding: 0.75rem 1.25rem 1rem 1.25rem;
                    backdrop-filter: blur(10px);
                }

                /* ─── Attachment Preview Area ─── */
                .attachments-area {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    padding-bottom: 0.5rem;
                }

                .rtl .attachments-area {
                    justify-content: flex-start;
                }

                .attachment-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.25rem 0.6rem 0.25rem 0.75rem;
                    border-radius: 8px;
                    border: 1px solid rgba(245, 184, 27, 0.08);
                    background: rgba(245, 184, 27, 0.04);
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 180px;
                }

                .rtl .attachment-item {
                    flex-direction: row-reverse;
                    padding: 0.25rem 0.75rem 0.25rem 0.6rem;
                }

                .attachment-item .file-name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .attachment-item .remove-file {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(239, 68, 68, 0.12);
                    color: #f87171;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    padding: 0;
                }

                .attachment-item .remove-file:hover {
                    background: rgba(239, 68, 68, 0.25);
                    transform: scale(1.1);
                }

                .attachment-item .remove-file svg {
                    width: 10px;
                    height: 10px;
                }

                .no-attachments {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.15);
                }

                /* ─── Input Row ─── */
                .input-row {
                    display: flex;
                    align-items: flex-end;
                    gap: 0.6rem;
                }

                /* ─── Attachment Button ─── */
                .attach-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    background: rgba(255, 255, 255, 0.02);
                    color: rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    cursor: pointer;
                    flex-shrink: 0;
                }

                .attach-btn:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.15);
                    background: rgba(245, 184, 27, 0.06);
                    color: #f5b81b;
                    transform: scale(1.05);
                }

                .attach-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .attach-btn svg {
                    width: 18px;
                    height: 18px;
                }

                /* ─── Textarea ─── */
                .message-input {
                    flex: 1;
                    min-height: 44px;
                    max-height: 160px;
                    padding: 0.6rem 1rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    background: rgba(255, 255, 255, 0.02);
                    color: #eef2f7;
                    font-size: 0.85rem;
                    resize: none;
                    outline: none;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    line-height: 1.5;
                }

                .rtl .message-input {
                    text-align: right;
                }

                .message-input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .message-input:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.1);
                    background: rgba(255, 255, 255, 0.04);
                }

                .message-input:focus {
                    border-color: rgba(245, 184, 27, 0.25);
                    box-shadow: 0 0 0 3px rgba(245, 184, 27, 0.05);
                    background: rgba(255, 255, 255, 0.05);
                }

                .message-input:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                /* ─── Send Button ─── */
                .send-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0 1.4rem;
                    height: 44px;
                    border-radius: 12px;
                    border: 1px solid rgba(245, 184, 27, 0.2);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.12), rgba(245, 184, 27, 0.03));
                    color: #f5b81b;
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .send-btn:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.4);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.2), rgba(245, 184, 27, 0.06));
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(245, 184, 27, 0.15);
                }

                .send-btn:active:not(:disabled) {
                    transform: scale(0.97);
                }

                .send-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .send-btn svg {
                    width: 16px;
                    height: 16px;
                }

                /* ─── Flip send icon in RTL ─── */
                .send-btn .send-icon {
                    width: 16px;
                    height: 16px;
                }

                .send-btn .spinner {
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
                    .composer-container {
                        padding: 0.5rem 0.75rem 0.75rem 0.75rem;
                    }

                    .input-row {
                        gap: 0.4rem;
                    }

                    .attach-btn {
                        width: 38px;
                        height: 38px;
                    }

                    .attach-btn svg {
                        width: 16px;
                        height: 16px;
                    }

                    .message-input {
                        min-height: 38px;
                        padding: 0.5rem 0.75rem;
                        font-size: 0.8rem;
                    }

                    .send-btn {
                        padding: 0 1rem;
                        height: 38px;
                        font-size: 0.7rem;
                    }

                    .send-btn svg {
                        width: 14px;
                        height: 14px;
                    }

                    .attachment-item {
                        font-size: 0.6rem;
                        padding: 0.2rem 0.4rem 0.2rem 0.6rem;
                        max-width: 120px;
                    }

                    .rtl .attachment-item {
                        padding: 0.2rem 0.6rem 0.2rem 0.4rem;
                    }
                }

                @media (max-width: 380px) {
                    .composer-container {
                        padding: 0.4rem 0.5rem 0.6rem 0.5rem;
                    }

                    .attach-btn {
                        width: 34px;
                        height: 34px;
                    }

                    .attach-btn svg {
                        width: 14px;
                        height: 14px;
                    }

                    .message-input {
                        min-height: 34px;
                        padding: 0.4rem 0.6rem;
                        font-size: 0.75rem;
                    }

                    .send-btn {
                        padding: 0 0.75rem;
                        height: 34px;
                        font-size: 0.65rem;
                    }

                    .send-btn svg {
                        width: 12px;
                        height: 12px;
                    }
                }
            `}</style>

            <div className={`composer-container ${isRTL ? "rtl" : "ltr"}`}>
                <div>
                    {/* Attachment Preview */}
                    <div className="attachments-area">
                        {files.length > 0 ? (
                            files.map((file, index) => (
                                <span key={index} className="attachment-item">
                                    <span className="file-name">{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="remove-file"
                                        aria-label={isRTL ? "حذف فایل" : "Remove file"}
                                    >
                                        <X />
                                    </button>
                                </span>
                            ))
                        ) : (
                            <span className="no-attachments">
                                {getNoAttachmentsText()}
                            </span>
                        )}
                    </div>

                    {/* Input Row */}
                    <div className="input-row">
                        {/* Attachment Button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={sending || !conversationId}
                            className="attach-btn"
                            aria-label={getAttachLabel()}
                        >
                            <Paperclip />
                        </button>

                        {/* Textarea */}
                        <textarea
                            rows={1}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={sending || !conversationId}
                            placeholder={getPlaceholderText()}
                            className="message-input"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />

                        {/* Send Button */}
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!canSend}
                            className="send-btn"
                        >
                            {sending ? (
                                <span className="spinner" />
                            ) : (
                                <>
                                    {isRTL ? (
                                        <>
                                            {getSendText()}
                                            <ArrowLeft className="send-icon" />
                                        </>
                                    ) : (
                                        <>
                                            <SendHorizontal className="send-icon" />
                                            {getSendText()}
                                        </>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    hidden
                    multiple
                    type="file"
                    onChange={handleFiles}
                />
            </div>
        </>
    );
}