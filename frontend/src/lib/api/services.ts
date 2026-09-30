import api from "./client";
import { Service } from "@/types/service";
import { Package } from "@/types/package";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export async function getServices(): Promise<Service[]> {

    const response =
        await api.get<ApiResponse<Service[]>>(
            "/services"
        );

    return response.data.data;
}

export async function getFeaturedServices(): Promise<Service[]> {

    const response =
        await api.get<ApiResponse<Service[]>>(
            "/services/featured"
        );

    return response.data.data;
}

export async function getService(
    slug: string
): Promise<Service> {

    const response =
        await api.get<ApiResponse<Service>>(
            `/services/${slug}`
        );

    return response.data.data;
}

export async function getPackages(
    serviceId: number
): Promise<Package[]> {

    const response =
        await api.get<ApiResponse<Package[]>>(
            `/services/${serviceId}/packages`
        );

    return response.data.data;
}