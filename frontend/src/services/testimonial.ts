// src/services/testimonial.ts

import { api } from "@/services/api";

import type {
    Testimonial,
    TestimonialResponse,
    TestimonialListResponse,
    CreateTestimonialRequest,
    UpdateTestimonialRequest,
} from "@/types/testimonial";

/*
|--------------------------------------------------------------------------
| Testimonial Management Routes
|--------------------------------------------------------------------------
|
| Admin:
|     /admin/testimonials
|
| Content Manager:
|     /content-manager/testimonials
|
*/


// ==========================================================================
// Get Correct Testimonial Base Route
// ==========================================================================

async function getTestimonialBaseRoute(): Promise<string> {

    const response = await api.get("/me");

    const user = response.data.data ?? response.data;

    if (user.role === "content_manager") {
        return "/content-manager/testimonials";
    }

    if (user.role === "admin") {
        return "/admin/testimonials";
    }

    throw new Error(
        "Unauthorized: You do not have permission to manage testimonials."
    );
}


class TestimonialService {

    /*
    |--------------------------------------------------------------------------
    | Get All Testimonials
    |--------------------------------------------------------------------------
    */

    async getAll(): Promise<Testimonial[]> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.get<TestimonialListResponse>(
                baseRoute
            );

        return response.data.data;
    }


    /*
    |--------------------------------------------------------------------------
    | Get Single Testimonial
    |--------------------------------------------------------------------------
    */

    async getById(
        id: number
    ): Promise<Testimonial> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.get<TestimonialResponse>(
                `${baseRoute}/${id}`
            );

        return response.data.data;
    }


    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    async create(
        data: CreateTestimonialRequest
    ): Promise<Testimonial> {

        const formData = new FormData();

        formData.append(
            "name",
            data.name
        );

        formData.append(
            "company_fa",
            data.company_fa ?? ""
        );

        formData.append(
            "company_en",
            data.company_en ?? ""
        );

        formData.append(
            "position_fa",
            data.position_fa ?? ""
        );

        formData.append(
            "position_en",
            data.position_en ?? ""
        );

        formData.append(
            "review_fa",
            data.review_fa
        );

        formData.append(
            "review_en",
            data.review_en ?? ""
        );

        formData.append(
            "rating",
            String(data.rating)
        );

        formData.append(
            "display_order",
            String(data.display_order ?? 0)
        );

        formData.append(
            "is_featured",
            data.is_featured ? "1" : "0"
        );

        formData.append(
            "status",
            data.status
        );

        if (data.image) {

            formData.append(
                "image",
                data.image
            );
        }

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.post<TestimonialResponse>(
                baseRoute,
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
    | Update
    |--------------------------------------------------------------------------
    */

    async update(
        id: number,
        data: UpdateTestimonialRequest
    ): Promise<Testimonial> {

        const formData = new FormData();

        formData.append(
            "_method",
            "PUT"
        );

        if (data.name !== undefined) {
            formData.append(
                "name",
                data.name
            );
        }

        if (data.company_fa !== undefined) {
            formData.append(
                "company_fa",
                data.company_fa
            );
        }

        if (data.company_en !== undefined) {
            formData.append(
                "company_en",
                data.company_en
            );
        }

        if (data.position_fa !== undefined) {
            formData.append(
                "position_fa",
                data.position_fa
            );
        }

        if (data.position_en !== undefined) {
            formData.append(
                "position_en",
                data.position_en
            );
        }

        if (data.review_fa !== undefined) {
            formData.append(
                "review_fa",
                data.review_fa
            );
        }

        if (data.review_en !== undefined) {
            formData.append(
                "review_en",
                data.review_en
            );
        }

        if (data.rating !== undefined) {
            formData.append(
                "rating",
                String(data.rating)
            );
        }

        if (data.display_order !== undefined) {
            formData.append(
                "display_order",
                String(data.display_order)
            );
        }

        if (data.is_featured !== undefined) {
            formData.append(
                "is_featured",
                data.is_featured ? "1" : "0"
            );
        }

        if (data.status !== undefined) {
            formData.append(
                "status",
                data.status
            );
        }

        if (data.image) {
            formData.append(
                "image",
                data.image
            );
        }

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.post<TestimonialResponse>(
                `${baseRoute}/${id}`,
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
    | Delete
    |--------------------------------------------------------------------------
    */

    async delete(
        id: number
    ): Promise<void> {

        const baseRoute =
            await getTestimonialBaseRoute();

        await api.delete(
            `${baseRoute}/${id}`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Activate
    |--------------------------------------------------------------------------
    */

    async activate(
        id: number
    ): Promise<Testimonial> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.patch<TestimonialResponse>(
                `${baseRoute}/${id}/activate`
            );

        return response.data.data;
    }


    /*
    |--------------------------------------------------------------------------
    | Deactivate
    |--------------------------------------------------------------------------
    */

    async deactivate(
        id: number
    ): Promise<Testimonial> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.patch<TestimonialResponse>(
                `${baseRoute}/${id}/deactivate`
            );

        return response.data.data;
    }


    /*
    |--------------------------------------------------------------------------
    | Feature
    |--------------------------------------------------------------------------
    */

    async feature(
        id: number
    ): Promise<Testimonial> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.patch<TestimonialResponse>(
                `${baseRoute}/${id}/feature`
            );

        return response.data.data;
    }


    /*
    |--------------------------------------------------------------------------
    | Unfeature
    |--------------------------------------------------------------------------
    */

    async unfeature(
        id: number
    ): Promise<Testimonial> {

        const baseRoute =
            await getTestimonialBaseRoute();

        const response =
            await api.patch<TestimonialResponse>(
                `${baseRoute}/${id}/unfeature`
            );

        return response.data.data;
    }
}


export const testimonialService =
    new TestimonialService();

export default testimonialService;