import { apiFetch } from "./client";

export interface Package {

    id: number;

    name: string;

    description: string;

    price: number;

    delivery_days: number;

    revisions: number;

    features: string[];

    is_featured: boolean;

}

interface ApiResponse<T> {

    success: boolean;

    message: string;

    data: T;

}

export async function getPackages(
    serviceId: number
) {

    const response =
        await apiFetch<ApiResponse<Package[]>>(
            `/services/${serviceId}/packages`
        );

    return response.data;
}