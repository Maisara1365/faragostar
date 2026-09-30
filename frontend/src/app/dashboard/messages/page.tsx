"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { useSearchParams } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/shell/DashboardShell";

import ConversationList from "@/components/dashboard/messages/ConversationList";
import ConversationHeader from "@/components/dashboard/messages/ConversationHeader";
import ChatMessages from "@/components/dashboard/messages/ChatMessages";
import MessageComposer from "@/components/dashboard/messages/MessageComposer";
import NewConversationModal from "@/components/dashboard/messages/NewConversationModal";

import {
    getConversations,
    assignConversationToAdmin,
    assignConversationToContentManager,
    closeConversation,
} from "@/services/conversation";

import { api } from "@/services/api";

import type {
    Conversation,
    ConversationUser,
} from "@/types/conversation";

import { useLanguage } from "@/context/language-context";

// ─── Layout Imports ───
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MessagesPage() {
    const { t, language } = useLanguage();
    const isRTL = language === "fa";
    const searchParams = useSearchParams();
    const conversationIdFromUrl = searchParams.get("conversation_id");

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [newConversationOpen, setNewConversationOpen] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
    const [refreshMessages, setRefreshMessages] = useState(0);

    /*
    |--------------------------------------------------------------------------
    | User Role
    |--------------------------------------------------------------------------
    */

    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoaded, setRoleLoaded] = useState(false);
    const [loadingConversations, setLoadingConversations] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Admin Assignment Data
    |--------------------------------------------------------------------------
    */

    const [admins, setAdmins] = useState<ConversationUser[]>([]);
    const [contentManagers, setContentManagers] = useState<ConversationUser[]>([]);
    const [loadingAssignmentData, setLoadingAssignmentData] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Admin Action Loading
    |--------------------------------------------------------------------------
    */

    const [actionLoading, setActionLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Prevent Overlapping Conversation Requests
    |--------------------------------------------------------------------------
    */

    const loadingRef = useRef(false);

    /*
    |--------------------------------------------------------------------------
    | Load Current User
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                setUserRole(null);
                setRoleLoaded(true);
                return;
            }

            const user = JSON.parse(storedUser);
            const role = typeof user?.role === "string" ? user.role.toLowerCase() : null;
            setUserRole(role);
        } catch (error) {
            console.error("Failed to read current user:", error);
            setUserRole(null);
        } finally {
            setRoleLoaded(true);
        }
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Conversation Permissions
    |--------------------------------------------------------------------------
    */

    const canCreateConversation = userRole === "admin" || userRole === "customer" || userRole === "content_manager";
    const isAdmin = userRole === "admin";

    /*
    |--------------------------------------------------------------------------
    | Load Admin Assignment Data
    |--------------------------------------------------------------------------
    */

    const loadAssignmentData = useCallback(async () => {
        if (!isAdmin) return;

        try {
            setLoadingAssignmentData(true);
            const [adminsResponse, contentManagersResponse] = await Promise.all([
                api.get("/admin/admins", { params: { per_page: 100 } }),
                api.get("/admin/content-managers", { params: { per_page: 100 } }),
            ]);

            const adminData = Array.isArray(adminsResponse.data?.data) ? adminsResponse.data.data : [];
            const contentManagerData = Array.isArray(contentManagersResponse.data?.data) ? contentManagersResponse.data.data : [];

            setAdmins(adminData);
            setContentManagers(contentManagerData);
        } catch (error) {
            console.error("Failed to load admin assignment data:", error);
            setAdmins([]);
            setContentManagers([]);
        } finally {
            setLoadingAssignmentData(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (!roleLoaded || !isAdmin) return;
        loadAssignmentData();
    }, [roleLoaded, isAdmin, loadAssignmentData]);

    /*
    |--------------------------------------------------------------------------
    | Load Conversations
    |--------------------------------------------------------------------------
    */

    const loadConversations = useCallback(async () => {
        if (!userRole) return;
        if (loadingRef.current) return;

        loadingRef.current = true;

        try {
            setLoadingConversations(true);
            const response = await getConversations();
            const data: Conversation[] = Array.isArray(response) ? response : [];

            setConversations(data);

            if (data.length === 0) {
                setSelectedConversation(null);
                setSelectedConversationId(null);
                return;
            }

            if (selectedConversationId === null) {
                /*
                |--------------------------------------------------------------------------
                | Open conversation requested by another page
                |--------------------------------------------------------------------------
                */

                if (conversationIdFromUrl) {
                    const requestedConversationId = Number(
                        conversationIdFromUrl
                    );

                    const requestedConversation = data.find(
                        conversation =>
                            conversation.id === requestedConversationId
                    );

                    if (requestedConversation) {
                        setSelectedConversationId(
                            requestedConversation.id
                        );

                        setSelectedConversation(
                            requestedConversation
                        );

                        setRefreshMessages(value => value + 1);

                        return;
                    }
                }

                /*
                |--------------------------------------------------------------------------
                | Default - First Conversation
                |--------------------------------------------------------------------------
                */

                const firstConversation = data[0];

                setSelectedConversationId(
                    firstConversation.id
                );

                setSelectedConversation(
                    firstConversation
                );

                return;
            }

            const currentConversation = data.find(conversation => conversation.id === selectedConversationId);

            if (currentConversation) {
                setSelectedConversation(currentConversation);
            } else {
                const firstConversation = data[0];
                setSelectedConversationId(firstConversation.id);
                setSelectedConversation(firstConversation);
            }
        } catch (error) {
            console.error("Failed to load conversations:", error);
        } finally {
            loadingRef.current = false;
            setLoadingConversations(false);
        }
    }, [userRole, selectedConversationId, conversationIdFromUrl]);

    useEffect(() => {
        if (!roleLoaded || !userRole) return;

        loadConversations();

        const interval = window.setInterval(() => {
            loadConversations();
        }, 10000);

        return () => {
            window.clearInterval(interval);
        };
    }, [roleLoaded, userRole, loadConversations]);

    /*
    |--------------------------------------------------------------------------
    | Select Conversation
    |--------------------------------------------------------------------------
    */

    function handleConversationSelect(conversation: Conversation) {
        setSelectedConversationId(conversation.id);
        setSelectedConversation(conversation);
        setRefreshMessages(value => value + 1);
    }

    /*
    |--------------------------------------------------------------------------
    | Open New Conversation
    |--------------------------------------------------------------------------
    */

    function handleOpenNewConversation() {
        if (!canCreateConversation) return;
        setNewConversationOpen(true);
    }

    /*
    |--------------------------------------------------------------------------
    | Conversation Created
    |--------------------------------------------------------------------------
    */

    async function handleConversationCreated() {
        setNewConversationOpen(false);
        await loadConversations();
    }

    /*
    |--------------------------------------------------------------------------
    | Update Selected Conversation Immediately
    |--------------------------------------------------------------------------
    */

    function updateSelectedConversation(updatedConversation: Conversation) {
        setSelectedConversation(updatedConversation);
        setConversations(current =>
            current.map(conversation =>
                conversation.id === updatedConversation.id ? updatedConversation : conversation
            )
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Admin - Assign Conversation to Administrator
    |--------------------------------------------------------------------------
    */

    async function handleAssignAdmin(adminId: number) {
        if (!isAdmin || !selectedConversation || selectedConversation.status !== "open") return;

        try {
            setActionLoading(true);
            const updatedConversation = await assignConversationToAdmin(selectedConversation.id, adminId);
            if (updatedConversation) {
                updateSelectedConversation(updatedConversation);
            }
            await loadConversations();
        } catch (error) {
            console.error("Failed to assign conversation to administrator:", error);
        } finally {
            setActionLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Admin - Assign Conversation to Content Manager
    |--------------------------------------------------------------------------
    */

    async function handleAssignContentManager(contentManagerId: number) {
        if (!isAdmin || !selectedConversation || selectedConversation.status !== "open") return;

        try {
            setActionLoading(true);
            const updatedConversation = await assignConversationToContentManager(selectedConversation.id, contentManagerId);
            if (updatedConversation) {
                updateSelectedConversation(updatedConversation);
            }
            await loadConversations();
        } catch (error) {
            console.error("Failed to assign conversation to content manager:", error);
        } finally {
            setActionLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Admin - Close Conversation
    |--------------------------------------------------------------------------
    */

    async function handleCloseConversation() {
        if (!isAdmin || !selectedConversation || selectedConversation.status !== "open") return;

        try {
            setActionLoading(true);
            const updatedConversation = await closeConversation(selectedConversation.id);

            if (updatedConversation) {
                updateSelectedConversation(updatedConversation);
            } else {
                setSelectedConversation(current => current ? { ...current, status: "closed" } : current);
                setConversations(current =>
                    current.map(conversation =>
                        conversation.id === selectedConversation.id
                            ? { ...conversation, status: "closed" }
                            : conversation
                    )
                );
            }

            await loadConversations();
        } catch (error) {
            console.error("Failed to close conversation:", error);
        } finally {
            setActionLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Admin - Delete Conversation
    |--------------------------------------------------------------------------
    */

    async function handleDeleteConversation(conversationId: number) {
        if (!isAdmin) return;

        try {
            setActionLoading(true);
            await api.delete(`/admin/conversations/${conversationId}`);

            setConversations(current => current.filter(conversation => conversation.id !== conversationId));

            if (selectedConversationId === conversationId) {
                const remainingConversations = conversations.filter(conversation => conversation.id !== conversationId);
                const nextConversation = remainingConversations[0] ?? null;

                if (nextConversation) {
                    setSelectedConversationId(nextConversation.id);
                    setSelectedConversation(nextConversation);
                    setRefreshMessages(value => value + 1);
                } else {
                    setSelectedConversationId(null);
                    setSelectedConversation(null);
                }
            }

            await loadConversations();
        } catch (error) {
            console.error("Failed to delete conversation:", error);
        } finally {
            setActionLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Loading Role
    |--------------------------------------------------------------------------
    */

    if (!roleLoaded) {
        return (
            <>
                <Header />
                <AuthGuard allowedRoles={["admin", "content_manager", "customer"]}>
                    <DashboardShell 
                        title={t.dashboard.messages.title} 
                        description={t.dashboard.messages.description}
                    >
                        <div className={`messages-loading ${isRTL ? "rtl" : "ltr"}`}>
                            <div className="loading-spinner"></div>
                            <p>{t.dashboard.messages.loading || "Loading messages..."}</p>
                        </div>
                    </DashboardShell>
                </AuthGuard>
                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Header />

            <AuthGuard allowedRoles={["admin", "content_manager", "customer"]}>
                <DashboardShell 
                    title={t.dashboard.messages.title} 
                    description={t.dashboard.messages.description}
                >
                    <div className={`messages-container ${isRTL ? "rtl" : "ltr"}`}>
                        {/* LEFT - CONVERSATION LIST */}
                        <div className="conversation-list-panel">
                            <ConversationList
                                conversations={Array.isArray(conversations) ? conversations : []}
                                selectedConversation={selectedConversation}
                                onSelect={handleConversationSelect}
                                onNewConversation={handleOpenNewConversation}
                                userRole={userRole}
                                onDeleteConversation={isAdmin ? handleDeleteConversation : undefined}
                            />
                        </div>

                        {/* RIGHT - CHAT AREA */}
                        <div className="chat-area">
                            {/* Conversation Header - Fixed at top */}
                            <div className="chat-header-wrapper">
                                <ConversationHeader
                                    conversation={selectedConversation}
                                    userRole={userRole}
                                    admins={admins}
                                    contentManagers={contentManagers}
                                    onAssignAdmin={handleAssignAdmin}
                                    onAssignContentManager={handleAssignContentManager}
                                    onCloseConversation={handleCloseConversation}
                                    actionLoading={actionLoading || loadingAssignmentData}
                                />
                            </div>

                            {/* Chat Messages - Scrollable area */}
                            <div className="chat-messages-scroll-wrapper">
                                <div className="chat-messages-inner">
                                    <ChatMessages
                                        conversation={selectedConversation}
                                        refresh={refreshMessages}
                                    />
                                </div>
                            </div>

                            {/* Message Composer - Fixed at bottom */}
                            <div className="chat-composer-wrapper">
                                <MessageComposer
                                    conversationId={selectedConversation?.id}
                                    onSent={() => {
                                        setRefreshMessages(value => value + 1);
                                        loadConversations();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </DashboardShell>

                {/* NEW CONVERSATION MODAL */}
                {canCreateConversation && (
                    <NewConversationModal
                        open={newConversationOpen}
                        onClose={() => setNewConversationOpen(false)}
                        onCreated={handleConversationCreated}
                    />
                )}
            </AuthGuard>

            <Footer />

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

                /* ─── Loading State ─── */
                .messages-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 400px;
                    border-radius: 24px;
                    padding: 2rem;
                    background: linear-gradient(145deg, #0b1a2e, #12263a);
                    border: 1px solid rgba(245, 184, 27, 0.08);
                    color: rgba(255, 255, 255, 0.5);
                    gap: 1.5rem;
                }

                .loading-spinner {
                    width: 48px;
                    height: 48px;
                    border: 3px solid rgba(245, 184, 27, 0.1);
                    border-top: 3px solid #f5b81b;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .messages-loading p {
                    font-size: 0.95rem;
                    font-weight: 400;
                    letter-spacing: 0.3px;
                }

                /* ─── Main Container ─── */
                .messages-container {
                    position: relative;
                    display: grid;
                    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
                    height: calc(100vh - 220px);
                    min-height: 560px;
                    overflow: hidden;
                    border-radius: 24px;
                    padding: 0;
                    border: 1px solid rgba(245, 184, 27, 0.06);
                    background: linear-gradient(145deg, #0b1a2e 0%, #12263a 100%);
                    box-shadow: 
                        0 25px 60px rgba(0, 0, 0, 0.45),
                        inset 0 1px 0 rgba(245, 184, 27, 0.03);
                }

                /* Gold accent glow on container */
                .messages-container::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: 20%;
                    right: 20%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #f5b81b, transparent);
                    opacity: 0.15;
                    border-radius: 50%;
                }

                /* ─── Left Panel ─── */
                .conversation-list-panel {
                    min-width: 0;
                    height: 100%;
                    padding: 0.5rem;
                    border-right: 1px solid rgba(245, 184, 27, 0.06);
                    background: rgba(11, 26, 46, 0.85);
                    backdrop-filter: blur(4px);
                    overflow: hidden;
                }

                .rtl .conversation-list-panel {
                    border-right: none;
                    border-left: 1px solid rgba(245, 184, 27, 0.06);
                }

                /* ─── Right Panel ─── */
                .chat-area {
                    min-width: 0;
                    min-height: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(15, 23, 42, 0.96),
                        rgba(11, 26, 46, 0.98)
                    );
                    position: relative;
                }

                /* ─── Header ─── */
                .chat-header-wrapper {
                    flex: 0 0 auto;
                    padding: 0.5rem;
                    border-bottom: 1px solid rgba(245, 184, 27, 0.04);
                    background: rgba(11, 26, 46, 0.9);
                    backdrop-filter: blur(8px);
                    z-index: 10;
                }

                /* ─── THIS IS THE SCROLL AREA ─── */
                .chat-messages-scroll-wrapper {
                    flex: 1 1 auto;
                    min-height: 0;
                    height: 0;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 0.5rem;
                    position: relative;
                }

                .chat-messages-scroll-wrapper::-webkit-scrollbar {
                    width: 4px;
                }

                .chat-messages-scroll-wrapper::-webkit-scrollbar-track {
                    background: transparent;
                }

                .chat-messages-scroll-wrapper::-webkit-scrollbar-thumb {
                    background: rgba(245, 184, 27, 0.15);
                    border-radius: 10px;
                }

                .chat-messages-scroll-wrapper::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 184, 27, 0.25);
                }

                /* ─── Messages ─── */
                .chat-messages-inner {
                    width: 100%;
                    min-height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                /* ─── Composer ─── */
                .chat-composer-wrapper {
                    flex: 0 0 auto;
                    padding: 0.5rem;
                    border-top: 1px solid rgba(245, 184, 27, 0.04);
                    background: rgba(11, 26, 46, 0.9);
                    backdrop-filter: blur(8px);
                    z-index: 10;
                }

                /* ─── Responsive ─── */
                @media (max-width: 820px) {
                    .messages-container {
                        grid-template-columns: 1fr;
                        height: calc(100vh - 180px);
                        min-height: 500px;
                        border-radius: 16px;
                    }

                    .conversation-list-panel {
                        padding: 0.5rem;
                        border-right: none !important;
                        border-left: none !important;
                        border-bottom: 1px solid rgba(245, 184, 27, 0.06);
                        max-height: 260px;
                        overflow: hidden;
                    }

                    .chat-area {
                        min-height: 300px;
                    }

                    .chat-header-wrapper {
                        padding: 0.4rem;
                    }

                    .chat-messages-scroll-wrapper {
                        padding: 0.4rem;
                    }

                    .chat-composer-wrapper {
                        padding: 0.4rem;
                    }

                    .messages-container::before {
                        left: 10%;
                        right: 10%;
                    }
                }

                @media (max-width: 480px) {
                    .messages-container {
                        border-radius: 12px;
                        height: calc(100vh - 140px);
                        min-height: 400px;
                    }

                    .conversation-list-panel {
                        padding: 0.3rem;
                        max-height: 200px;
                    }

                    .chat-header-wrapper {
                        padding: 0.3rem;
                    }

                    .chat-messages-scroll-wrapper {
                        padding: 0.3rem;
                    }

                    .chat-composer-wrapper {
                        padding: 0.3rem;
                    }
                }
            `}</style>
        </>
    );
}