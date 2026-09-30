import { Package } from "./package";

export type ServiceStatus =
    | "active"
    | "inactive";

export interface Service {

    /*
    |--------------------------------------------------------------------------
    | Basic
    |--------------------------------------------------------------------------
    */

    id: number;

    slug: string;

    /*
    |--------------------------------------------------------------------------
    | Localized
    |--------------------------------------------------------------------------
    */

    title: string;

    short_description: string | null;

    description: string | null;

    /*
    |--------------------------------------------------------------------------
    | Multilingual
    |--------------------------------------------------------------------------
    */

    title_fa: string;

    title_en: string;

    short_description_fa: string | null;

    short_description_en: string | null;

    description_fa: string | null;

    description_en: string | null;

    /*
    |--------------------------------------------------------------------------
    | Media
    |--------------------------------------------------------------------------
    */

    icon: string | null;

    cover_image: string |null;

    /*
    |--------------------------------------------------------------------------
    | Pricing
    |--------------------------------------------------------------------------
    */

    starting_price: number | string | null;

    /*
    |--------------------------------------------------------------------------
    | Display
    |--------------------------------------------------------------------------
    */

    display_order: number;

    theme_color: string;

    is_featured: boolean;

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    status: ServiceStatus;

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    packages_count?: number;

    packages?: Package[];

    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    created_at: string;

    updated_at: string;

}

export interface CreateServiceData {

    title_fa: string;

    title_en: string;

    slug: string;

    short_description_fa?: string;

    short_description_en?: string;

    description_fa?: string;

    description_en?: string;

    icon?: File | null;

    cover_image?: File | null;

    starting_price?: number | null;

    display_order?: number;

    theme_color?: string;

    is_featured?: boolean;

    status?: ServiceStatus;

}

export interface UpdateServiceData
    extends Partial<CreateServiceData> {}

export interface ServiceFilters {

    search?: string;

    status?: ServiceStatus | "all";

    featured?: boolean;

}