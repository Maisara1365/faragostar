export type PortfolioStatus =
    | "active"
    | "inactive";

export interface Portfolio {

    id: number;

    slug: string;

    /*
    |--------------------------------------------------------------------------
    | Localized
    |--------------------------------------------------------------------------
    */

    title: string;

    category: string;

    description: string | null;

    /*
    |--------------------------------------------------------------------------
    | Multilingual
    |--------------------------------------------------------------------------
    */

    title_fa: string;

    title_en: string;

    category_fa: string;

    category_en: string;

    description_fa: string | null;

    description_en: string | null;

    /*
    |--------------------------------------------------------------------------
    | Media
    |--------------------------------------------------------------------------
    */

    image: string | null;

    /*
    |--------------------------------------------------------------------------
    | Project Information
    |--------------------------------------------------------------------------
    */

    project_url: string | null;

    client_name: string | null;

    completion_date: string | null;

    /*
    |--------------------------------------------------------------------------
    | Display
    |--------------------------------------------------------------------------
    */

    theme_color: string;

    display_order: number;

    is_featured: boolean;

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    status: PortfolioStatus;

    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    created_at: string;

    updated_at: string;

}

export interface PortfolioFilters {

    search?: string;

    status?: PortfolioStatus;

    featured?: boolean;

    category?: string;

    page?: number;

    per_page?: number;

}

export interface PortfolioFormData {

    title_fa: string;

    title_en: string;

    slug: string;

    category_fa: string;

    category_en: string;

    description_fa?: string;

    description_en?: string;

    image?: File | null;

    project_url?: string;

    client_name?: string;

    completion_date?: string;

    theme_color?: string;

    display_order?: number;

    is_featured?: boolean;

    status?: PortfolioStatus;

}