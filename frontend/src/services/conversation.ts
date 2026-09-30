import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface CreateConversationData {
    subject?: string;
}

export interface CreateAdminConversationData {
    customer_id: number;
    subject?: string;
}

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

interface CurrentUser {
    id?: number;
    role?: string;
}

function getCurrentUser(): CurrentUser {
    if (typeof window === "undefined") {
        return {};
    }

    try {
        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {
            return {};
        }

        return JSON.parse(storedUser);
    } catch {
        return {};
    }
}

/*
|--------------------------------------------------------------------------
| User Role
|--------------------------------------------------------------------------
*/

function getUserRole(): string | null {
    const user = getCurrentUser();

    return user?.role ?? null;
}

/*
|--------------------------------------------------------------------------
| Get Conversations
|--------------------------------------------------------------------------
|
| Customer:
|   GET /customer/conversations
|
| Admin:
|   GET /admin/conversations
|
| Content Manager:
|   GET /content-manager/conversations
|
| Content Manager:
|   The backend returns only conversations explicitly
|   assigned to the authenticated content manager.
|
*/

export async function getConversations() {
    const role = getUserRole();

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint = "/customer/conversations";
            break;

        case "admin":
            endpoint = "/admin/conversations";
            break;

        case "content_manager":
            endpoint = "/content-manager/conversations";
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.get(endpoint);


    return Array.isArray(response.data?.data)
        ? response.data.data
        : [];
}

/*
|--------------------------------------------------------------------------
| Get Single Conversation
|--------------------------------------------------------------------------
|
| Content Manager:
|   Access is verified by the backend.
|   Only the assigned Content Manager can access
|   an assigned customer conversation.
|
*/

export async function getConversation(
    id: number
) {
    const role = getUserRole();

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint =
                `/customer/conversations/${id}`;
            break;

        case "admin":
            endpoint =
                `/admin/conversations/${id}`;
            break;

        case "content_manager":
            endpoint =
                `/content-manager/conversations/${id}`;
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.get(endpoint);

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Customer - Create Conversation
|--------------------------------------------------------------------------
*/

export async function createConversation(
    data: CreateConversationData
) {
    const response = await api.post(
        "/customer/conversations",
        data
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Content Manager - Create Conversation
|--------------------------------------------------------------------------
|
| This remains available for the existing Content Manager →
| Administrator communication flow.
|
| It does NOT create or assign a customer conversation.
|
*/

export async function createContentManagerConversation(
    data: CreateConversationData
) {
    const response = await api.post(
        "/content-manager/conversations",
        data
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Admin - Create Conversation For Customer
|--------------------------------------------------------------------------
*/

export async function createAdminConversation(
    data: CreateAdminConversationData
) {
    const response = await api.post(
        "/admin/conversations",
        data
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Admin - Assign Conversation to Administrator
|--------------------------------------------------------------------------
|
| Admin-only action.
| The backend verifies:
| - authenticated admin
| - conversation permissions
| - target administrator
| - conversation status
|
*/

export async function assignConversationToAdmin(
    conversationId: number,
    adminId: number
) {
    const role = getUserRole();

    if (role !== "admin") {
        throw new Error(
            "Only administrators can assign conversations."
        );
    }

    const response = await api.patch(
        `/admin/conversations/${conversationId}/assign-admin`,
        {
            admin_id: adminId,
        }
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Admin - Assign Conversation to Content Manager
|--------------------------------------------------------------------------
|
| Admin-only action.
|
*/

export async function assignConversationToContentManager(
    conversationId: number,
    contentManagerId: number
) {
    const role = getUserRole();

    if (role !== "admin") {
        throw new Error(
            "Only administrators can assign conversations."
        );
    }

    const response = await api.patch(
        `/admin/conversations/${conversationId}/assign-content-manager`,
        {
            content_manager_id: contentManagerId,
        }
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Admin - Close Conversation
|--------------------------------------------------------------------------
|
| Admin-only action.
|
*/

export async function closeConversation(
    conversationId: number
) {
    const role = getUserRole();

    if (role !== "admin") {
        throw new Error(
            "Only administrators can close conversations."
        );
    }

    const response = await api.patch(
        `/admin/conversations/${conversationId}/close`
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Admin - Delete Conversation
|--------------------------------------------------------------------------
|
| Admin-only action.
|
*/

export async function deleteConversation(
    conversationId: number
) {
    const role = getUserRole();

    if (role !== "admin") {
        throw new Error(
            "Only administrators can delete conversations."
        );
    }

    const response = await api.delete(
        `/admin/conversations/${conversationId}`
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Get Conversation Messages
|--------------------------------------------------------------------------
|
| Content Manager:
|   GET /content-manager/conversations/{id}/messages
|
| The backend verifies that the Content Manager is explicitly
| assigned to the conversation before returning messages.
|
*/

export async function getConversationMessages(
    conversationId: number
) {
    const role = getUserRole();

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint =
                `/customer/conversations/${conversationId}/messages`;
            break;

        case "admin":
            endpoint =
                `/admin/conversations/${conversationId}/messages`;
            break;

        case "content_manager":
            endpoint =
                `/content-manager/conversations/${conversationId}/messages`;
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.get(endpoint);

    return Array.isArray(response.data?.data)
        ? response.data.data
        : [];
}

/*
|--------------------------------------------------------------------------
| Send Message
|--------------------------------------------------------------------------
|
| Content Manager:
|   Can send only when explicitly assigned to the conversation.
|   Backend authorization is responsible for enforcing this.
|
*/

export async function sendMessage(
    data: {
        conversation_id: number;
        body: string;
        attachment?: File;
    }
) {
    const role = getUserRole();

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint = "/customer/messages";
            break;

        case "admin":
            endpoint = "/admin/messages";
            break;

        case "content_manager":
            endpoint =
                "/content-manager/messages";
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const formData = new FormData();

    formData.append(
        "conversation_id",
        String(data.conversation_id)
    );

    formData.append(
        "message",
        data.body
    );

    if (data.attachment) {
        formData.append(
            "attachment",
            data.attachment
        );
    }

    const response = await api.post(
        endpoint,
        formData
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Mark Message As Seen
|--------------------------------------------------------------------------
|
| Content Manager:
|   Backend verifies that the message belongs to a conversation
|   assigned to that Content Manager.
|
*/

export async function markMessageAsSeen(
    messageId: number
) {
    const role = getUserRole();

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint =
                `/customer/messages/${messageId}/seen`;
            break;

        case "admin":
            endpoint =
                `/admin/messages/${messageId}/seen`;
            break;

        case "content_manager":
            endpoint =
                `/content-manager/messages/${messageId}/seen`;
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.patch(endpoint);

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Update Message
|--------------------------------------------------------------------------
|
| Content Manager:
|   Cannot update messages.
|
*/

export async function updateMessage(
    messageId: number,
    data: {
        body: string;
    }
) {
    const role = getUserRole();

    if (role === "content_manager") {
        throw new Error(
            "Content managers cannot update messages."
        );
    }

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint =
                `/customer/messages/${messageId}`;
            break;

        case "admin":
            endpoint =
                `/admin/messages/${messageId}`;
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.put(
        endpoint,
        {
            message: data.body,
        }
    );

    return response.data?.data;
}

/*
|--------------------------------------------------------------------------
| Delete Message Attachment
|--------------------------------------------------------------------------
|
| Content Manager:
|   Cannot delete attachments.
|
*/

export async function deleteMessageAttachment(
    messageId: number
) {
    const role = getUserRole();

    if (role === "content_manager") {
        throw new Error(
            "Content managers cannot delete message attachments."
        );
    }

    let endpoint: string;

    switch (role) {
        case "customer":
            endpoint =
                `/customer/messages/${messageId}/attachment`;
            break;

        case "admin":
            endpoint =
                `/admin/messages/${messageId}/attachment`;
            break;

        default:
            throw new Error(
                "Unable to determine the current user's role."
            );
    }

    const response = await api.delete(endpoint);

    return response.data?.data;
}