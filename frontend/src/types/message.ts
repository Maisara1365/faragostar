export interface Message {

    id: number;

    conversation_id: number;

    sender_id: number;

    message: string;

    attachment: string | null;

    seen: boolean;

    seen_at: string | null;

    created_at: string;

    updated_at: string;

}