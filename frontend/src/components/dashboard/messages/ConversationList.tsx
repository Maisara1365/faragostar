"use client";

import {
    Search,
    Plus,
    MessageCircle,
    Trash2,
} from "lucide-react";

import ConversationCard from "./ConversationCard";

import Button from "@/components/ui/button";

import { useLanguage } from "@/hooks/use-language";

import type {
    Conversation,
} from "@/types/conversation";

interface Props {
    conversations?: Conversation[];
    selectedConversation: Conversation | null;
    onSelect: (conversation: Conversation) => void;
    onNewConversation: () => void;
    userRole?: string | null;
    onDeleteConversation?: (conversationId: number) => void;
    deletingConversationId?: number | null;
}

export default function ConversationList({
    conversations = [],
    selectedConversation,
    onSelect,
    onNewConversation,
    userRole,
    onDeleteConversation,
    deletingConversationId = null,
}: Props) {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";

    const safeConversations = Array.isArray(conversations) ? conversations : [];

    const normalizedRole = typeof userRole === "string" ? userRole.trim().toLowerCase() : null;

    const canCreateConversation =
        normalizedRole === "admin" ||
        normalizedRole === "customer" ||
        normalizedRole === "content_manager";

    const canDeleteConversation = normalizedRole === "admin";

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

                /* ─── Main Container ─── */
                .conversation-list {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    width: 100%;
                    background: linear-gradient(180deg, #0a1628 0%, #0f1f33 100%);
                    border-right: 1px solid rgba(245, 184, 27, 0.06);
                    position: relative;
                    overflow: hidden;
                }

                .rtl .conversation-list {
                    border-right: none;
                    border-left: 1px solid rgba(245, 184, 27, 0.06);
                }

                /* Gold accent glow on top */
                .conversation-list::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(245, 184, 27, 0.3), transparent);
                    z-index: 5;
                }

                /* ─── Header ─── */
                .list-header {
                    padding: 1.25rem 1.25rem 0.75rem 1.25rem;
                    flex-shrink: 0;
                    border-bottom: 1px solid rgba(245, 184, 27, 0.04);
                }

                .header-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                }

                .header-title-wrapper {
                    min-width: 0;
                }

                .header-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #ffffff;
                    letter-spacing: -0.2px;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                }

                .header-subtitle {
                    margin-top: 0.15rem;
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 400;
                    letter-spacing: 0.3px;
                }

                /* ─── New Conversation Button ─── */
                .new-convo-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1.2rem;
                    border-radius: 10px;
                    border: 1px solid rgba(245, 184, 27, 0.25);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.1), rgba(245, 184, 27, 0.03));
                    color: #f5b81b;
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    white-space: nowrap;
                    backdrop-filter: blur(8px);
                }

                .new-convo-btn:hover {
                    border-color: rgba(245, 184, 27, 0.5);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.2), rgba(245, 184, 27, 0.06));
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(245, 184, 27, 0.15);
                }

                .new-convo-btn svg {
                    width: 16px;
                    height: 16px;
                }

                /* ─── Search ─── */
                .search-wrapper {
                    position: relative;
                    margin-top: 0.75rem;
                }

                .search-wrapper svg {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    color: rgba(255, 255, 255, 0.2);
                    pointer-events: none;
                    transition: color 0.3s ease;
                }

                .ltr .search-wrapper svg {
                    left: 0.75rem;
                }

                .rtl .search-wrapper svg {
                    right: 0.75rem;
                }

                .search-wrapper:focus-within svg {
                    color: #f5b81b;
                }

                .search-wrapper input {
                    width: 100%;
                    padding: 0.6rem 1rem;
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background: rgba(255, 255, 255, 0.04);
                    color: #eef2f7;
                    font-size: 0.8rem;
                    outline: none;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }

                .ltr .search-wrapper input {
                    padding-left: 2.4rem;
                    padding-right: 1rem;
                }

                .rtl .search-wrapper input {
                    padding-right: 2.4rem;
                    padding-left: 1rem;
                }

                .search-wrapper input::placeholder {
                    color: rgba(255, 255, 255, 0.25);
                }

                .search-wrapper input:hover:not(:disabled) {
                    border-color: rgba(245, 184, 27, 0.2);
                    background: rgba(255, 255, 255, 0.06);
                }

                .search-wrapper input:focus {
                    border-color: rgba(245, 184, 27, 0.4);
                    box-shadow: 0 0 0 3px rgba(245, 184, 27, 0.06);
                    background: rgba(255, 255, 255, 0.07);
                }

                /* ─── Conversations List ─── */
                .conversations-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 0.75rem 0.75rem 1rem 0.75rem;
                }

                .conversations-list::-webkit-scrollbar {
                    width: 4px;
                }

                .conversations-list::-webkit-scrollbar-track {
                    background: transparent;
                }

                .conversations-list::-webkit-scrollbar-thumb {
                    background: rgba(245, 184, 27, 0.2);
                    border-radius: 10px;
                }

                .conversations-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 184, 27, 0.3);
                }

                .conversations-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                /* ─── Conversation Item Wrapper ─── */
                .conversation-item {
                    position: relative;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .conversation-item:hover {
                    background: rgba(245, 184, 27, 0.03);
                }

                /* ─── Delete Button ─── */
                .delete-btn {
                    position: absolute;
                    top: 4.25rem;
                    right: 0.5rem;
                    z-index: 20;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: 1px solid rgba(239, 68, 68, 0.15);
                    background: rgba(239, 68, 68, 0.08);
                    color: rgba(248, 113, 113, 0.6);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .rtl .delete-btn {
                    right: auto;
                    left: 0.5rem;
                }

                .delete-btn:hover:not(:disabled) {
                    border-color: rgba(239, 68, 68, 0.4);
                    background: rgba(239, 68, 68, 0.18);
                    color: #f87171;
                    transform: scale(1.05);
                }

                .delete-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .delete-btn svg {
                    width: 14px;
                    height: 14px;
                }

                .delete-spinner {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 2px solid rgba(248, 113, 113, 0.2);
                    border-top-color: #f87171;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                /* ─── Empty State ─── */
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding: 2rem 1.5rem;
                    text-align: center;
                }

                .empty-icon {
                    width: 48px;
                    height: 48px;
                    color: rgba(255, 255, 255, 0.08);
                    margin-bottom: 1rem;
                }

                .empty-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.6);
                }

                .empty-description {
                    margin-top: 0.5rem;
                    font-size: 0.8rem;
                    color: rgba(255, 255, 255, 0.3);
                    max-width: 200px;
                }

                .empty-btn {
                    margin-top: 1.25rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.5rem 1.2rem;
                    border-radius: 10px;
                    border: 1px solid rgba(245, 184, 27, 0.25);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.1), rgba(245, 184, 27, 0.03));
                    color: #f5b81b;
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .empty-btn:hover {
                    border-color: rgba(245, 184, 27, 0.5);
                    background: linear-gradient(135deg, rgba(245, 184, 27, 0.2), rgba(245, 184, 27, 0.06));
                    transform: translateY(-1px);
                    box-shadow: 0 4px 20px rgba(245, 184, 27, 0.15);
                }

                .empty-btn svg {
                    width: 16px;
                    height: 16px;
                }

                /* ─── Responsive ─── */
                @media (max-width: 820px) {
                    .list-header {
                        padding: 0.75rem 1rem 0.5rem 1rem;
                    }

                    .header-title {
                        font-size: 1rem;
                    }

                    .conversations-list {
                        padding: 0.5rem 0.5rem 0.75rem 0.5rem;
                    }

                    .new-convo-btn {
                        padding: 0.4rem 0.8rem;
                        font-size: 0.7rem;
                    }

                    .new-convo-btn svg {
                        width: 14px;
                        height: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .list-header {
                        padding: 0.5rem 0.75rem 0.4rem 0.75rem;
                    }

                    .header-title {
                        font-size: 0.9rem;
                    }

                    .header-subtitle {
                        font-size: 0.65rem;
                    }

                    .conversations-list {
                        padding: 0.3rem 0.3rem 0.5rem 0.3rem;
                    }

                    .new-convo-btn {
                        padding: 0.3rem 0.6rem;
                        font-size: 0.65rem;
                    }

                    .new-convo-btn svg {
                        width: 12px;
                        height: 12px;
                    }

                    .search-wrapper input {
                        padding: 0.5rem 0.75rem;
                        font-size: 0.7rem;
                    }

                    .ltr .search-wrapper input {
                        padding-left: 2rem;
                    }

                    .rtl .search-wrapper input {
                        padding-right: 2rem;
                    }

                    .search-wrapper svg {
                        width: 14px;
                        height: 14px;
                    }
                }
            `}</style>

            <aside className={`conversation-list ${isRTL ? "rtl" : "ltr"}`}>
                {/* HEADER */}
                <div className="list-header">
                    <div className="header-top">
                        <div className="header-title-wrapper">
                            <h2 className="header-title">
                                {t.dashboard.messages.title || "Messages"}
                            </h2>
                            <p className="header-subtitle">
                                {t.dashboard.messages.description || "Manage support conversations"}
                            </p>
                        </div>

                        {canCreateConversation && (
                            <button
                                type="button"
                                onClick={onNewConversation}
                                className="new-convo-btn"
                            >
                                <Plus />
                                {t.dashboard.messages.newConversation || "New"}
                            </button>
                        )}
                    </div>

                    {/* Search */}
                    <div className="search-wrapper">
                        <Search />
                        <input
                            type="text"
                            placeholder={t.dashboard.messages.search || "Search conversations..."}
                        />
                    </div>
                </div>

                {/* CONVERSATIONS */}
                <div className="conversations-list">
                    {safeConversations.length === 0 ? (
                        <div className="empty-state">
                            <MessageCircle className="empty-icon" />
                            <h3 className="empty-title">
                                {t.dashboard.messages.emptyTitle || "No conversations yet"}
                            </h3>
                            <p className="empty-description">
                                {t.dashboard.messages.emptyDescription || "Start a new conversation to get help"}
                            </p>

                            {canCreateConversation && (
                                <button
                                    type="button"
                                    onClick={onNewConversation}
                                    className="empty-btn"
                                >
                                    <Plus />
                                    {t.dashboard.messages.newConversation || "New Conversation"}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="conversations-grid">
                            {safeConversations.map((conversation) => {
                                const isDeleting = deletingConversationId === conversation.id;

                                return (
                                    <div key={conversation.id} className="conversation-item">
                                        <ConversationCard
                                            conversation={conversation}
                                            active={selectedConversation?.id === conversation.id}
                                            onClick={() => onSelect(conversation)}
                                            userRole={userRole}
                                        />

                                        {canDeleteConversation && onDeleteConversation && (
                                            <button
                                                type="button"
                                                disabled={isDeleting}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    onDeleteConversation(conversation.id);
                                                }}
                                                title={t.dashboard.messages.deleteConversation || "Delete"}
                                                aria-label={t.dashboard.messages.deleteConversation || "Delete"}
                                                className="delete-btn"
                                            >
                                                {isDeleting ? (
                                                    <span className="delete-spinner" />
                                                ) : (
                                                    <Trash2 />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}