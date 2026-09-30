import type { Message } from "./message";

/*
|--------------------------------------------------------------------------
| Conversation User
|--------------------------------------------------------------------------
|
| A conversation can have:
|
| - customer
| - content manager
| - admin
|
*/

export interface ConversationUser {

    id: number;

    name: string | null;

    email: string;

    role: string;
}

/*
|--------------------------------------------------------------------------
| Conversation
|--------------------------------------------------------------------------
*/

export interface Conversation {

    id: number;

    customer_id: number | null;

    admin_id: number | null;

    content_manager_id: number | null;

    /*
    |--------------------------------------------------------------------------
    | Participants
    |--------------------------------------------------------------------------
    */

    customer?: ConversationUser | null;

    admin?: ConversationUser | null;

    content_manager?: ConversationUser | null;

    /*
    |--------------------------------------------------------------------------
    | Conversation Information
    |--------------------------------------------------------------------------
    */

    subject: string | null;

    status: "open" | "closed";

    unread_count: number;

    /*
    |--------------------------------------------------------------------------
    | Messages
    |--------------------------------------------------------------------------
    */

    messages?: Message[];

    last_message?: Message | null;

    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    created_at: string;

    updated_at: string;
}