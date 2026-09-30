export interface ProfileStatistics {
    total_orders: number;
    completed_orders: number;
    pending_orders: number;
    open_conversations: number;
}

export interface ProfileUser {
    id: number;

    name: string;

    email: string;

    phone: string | null;

    role:
        | "admin"
        | "content_manager"
        | "customer";

    status:
        | "active"
        | "blocked";

    language:
        | "fa"
        | "en";

    profile_photo_path: string | null;

    profile_photo_url: string | null;

    email_verified: boolean;

    email_verified_at: string | null;

    must_change_password: boolean;

    created_at: string;

    updated_at: string;
}

export interface ProfileResponse {
    user: ProfileUser;

    statistics: ProfileStatistics;
}

export interface UpdateProfilePayload {
    name: string;

    phone: string | null;

    language: "fa" | "en";
}

export interface ChangePasswordPayload {
    current_password: string;

    password: string;

    password_confirmation: string;
}