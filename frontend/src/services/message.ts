import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

function getCurrentUser() {
    if (typeof window === "undefined") {
        return {};
    }

    try {
        return JSON.parse(
            localStorage.getItem("user") || "{}"
        );
    } catch {
        return {};
    }
}

/*
|--------------------------------------------------------------------------
| Send Message
|--------------------------------------------------------------------------
|
| Customer:
|   POST /customer/messages
|
| Admin:
|   POST /admin/messages
|
| Content Manager:
|   POST /content-manager/messages
|
| Content Manager permission:
|   The backend only allows the Content Manager to send
|   messages when the Content Manager is explicitly assigned
|   to the conversation.
|
*/

export async function sendMessage(
    conversationId: number,
    message: string,
    attachments?: File[]
) {
    const user = getCurrentUser();

    const role = user?.role;

    const formData = new FormData();

    formData.append(
        "conversation_id",
        conversationId.toString()
    );

    formData.append(
        "message",
        message
    );

    if (attachments?.length) {
        formData.append(
            "attachment",
            attachments[0]
        );
    }

    let endpoint = "/customer/messages";

    if (role === "admin") {
        endpoint = "/admin/messages";
    }

    if (role === "content_manager") {
        endpoint = "/content-manager/messages";
    }

    const response = await api.post(
        endpoint,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Mark Message As Seen
|--------------------------------------------------------------------------
|
| Content Manager:
|   The backend verifies that the message belongs to a
|   conversation explicitly assigned to the Content Manager.
|
*/

export async function markMessageSeen(
    id: number
) {
    const user = getCurrentUser();

    const role = user?.role;

    let endpoint =
        `/customer/messages/${id}/seen`;

    if (role === "admin") {
        endpoint =
            `/admin/messages/${id}/seen`;
    }

    if (role === "content_manager") {
        endpoint =
            `/content-manager/messages/${id}/seen`;
    }

    const response = await api.patch(
        endpoint
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Update Message
|--------------------------------------------------------------------------
|
| Content Manager cannot edit messages.
|
*/

export async function updateMessage(
    id: number,
    message: string
) {
    const user = getCurrentUser();

    const role = user?.role;

    if (role === "content_manager") {
        throw new Error(
            "Content managers cannot edit messages."
        );
    }

    let endpoint =
        `/customer/messages/${id}`;

    if (role === "admin") {
        endpoint =
            `/admin/messages/${id}`;
    }

    const response = await api.put(
        endpoint,
        {
            message,
        }
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Delete Message Attachment
|--------------------------------------------------------------------------
|
| Content Manager cannot delete attachments.
|
*/

export async function deleteMessageAttachment(
    id: number
) {
    const user = getCurrentUser();

    const role = user?.role;

    if (role === "content_manager") {
        throw new Error(
            "Content managers cannot delete message attachments."
        );
    }

    let endpoint =
        `/customer/messages/${id}/attachment`;

    if (role === "admin") {
        endpoint =
            `/admin/messages/${id}/attachment`;
    }

    const response = await api.delete(
        endpoint
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Content Manager - Create Conversation With Admin
|--------------------------------------------------------------------------
|
| This is a separate communication flow:
|
| Content Manager → Administrator
|
| It is NOT the same as an administrator assigning a
| Content Manager to a customer conversation.
|
*/

export interface CreateContentManagerConversationData {
    subject?: string;
}

export async function createContentManagerConversation(
    data: CreateContentManagerConversationData
) {
    const response = await api.post(
        "/content-manager/conversations",
        data
    );

    return response.data.data;
}