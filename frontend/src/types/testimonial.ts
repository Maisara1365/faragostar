// src/types/testimonial.ts

export type TestimonialStatus = "active" | "inactive";

export interface Testimonial {
    id: number;

    /*
    |--------------------------------------------------------------------------
    | Client Information
    |--------------------------------------------------------------------------
    */

    name: string;

    /*
    |--------------------------------------------------------------------------
    | Localized Fields
    |--------------------------------------------------------------------------
    */

    company: string | null;

    position: string | null;

    review: string;

    /*
    |--------------------------------------------------------------------------
    | Multilingual Fields
    |--------------------------------------------------------------------------
    */

    company_fa: string | null;

    company_en: string | null;

    position_fa: string | null;

    position_en: string | null;

    review_fa: string;

    review_en: string | null;

    /*
    |--------------------------------------------------------------------------
    | Media
    |--------------------------------------------------------------------------
    */

    image: string | null;

    /*
    |--------------------------------------------------------------------------
    | Rating
    |--------------------------------------------------------------------------
    */

    rating: number;

    /*
    |--------------------------------------------------------------------------
    | Display
    |--------------------------------------------------------------------------
    */

    display_order: number;

    is_featured: boolean;

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    status: TestimonialStatus;

    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    created_at: string;

    updated_at: string;
}

export interface TestimonialStatistics {
    total: number;
    active: number;
    inactive: number;
    featured: number;
    averageRating: number;
}

export interface TestimonialFilters {
    search?: string;
    status?: TestimonialStatus | "all";
    featured?: boolean | "all";
    rating?: number | "all";
}

export interface CreateTestimonialRequest {
    name: string;

    company_fa?: string;
    company_en?: string;

    position_fa?: string;
    position_en?: string;

    review_fa: string;
    review_en?: string;

    rating: number;

    image?: File | null;

    display_order?: number;

    is_featured?: boolean;

    status: TestimonialStatus;
}

export interface UpdateTestimonialRequest
    extends Partial<CreateTestimonialRequest> {}

export interface TestimonialListResponse {
    data: Testimonial[];
    message: string;
}

export interface TestimonialResponse {
    data: Testimonial;
    message: string;
}