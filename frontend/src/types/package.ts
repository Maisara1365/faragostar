export type Language = "en" | "fa";

export interface LocalizedText {
    fa: string;
    en: string;
}

export interface LocalizedFeatures {
    fa: string[];
    en: string[];
}

export interface Package {
    id: number;

    service_id?: number;

    service?: {
        id: number;
        title: LocalizedText;
    };

    name: LocalizedText;

    description: LocalizedText | null;

    features: LocalizedFeatures;

    price: number | string;

    delivery_days: number;

    revisions: number;

    display_order: number;

    is_featured: boolean;

    status: "active" | "inactive";

    created_at?: string;

    updated_at?: string;
}