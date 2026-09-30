import { api } from "./api";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface OrderFilters {
    search?: string;
    status?: string;
    payment_status?: string;
    service_id?: number;
    package_id?: number;
    per_page?: number;
}

export interface CreateCustomerOrderData {
    service_id: number;
    package_id?: number;
    title?: string;
    description?: string;
    budget?: number;
    deadline?: string;
}

export interface UpdateCustomerOrderData {
    service_id?: number;
    package_id?: number;
    title?: string;
    description?: string;
    budget?: number;
    deadline?: string;
    status?: string;
    payment_status?: string;
}

/*
|--------------------------------------------------------------------------
| Customer Orders
|--------------------------------------------------------------------------
*/

export async function getCustomerOrders(
    filters: OrderFilters = {}
) {
    const response = await api.get(
        "/customer/orders",
        {
            params: filters,
        }
    );

    return response.data.data;
}

export async function getCustomerOrder(
    id: number
) {
    const response = await api.get(
        `/customer/orders/${id}`
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Shared Order Detail
|--------------------------------------------------------------------------
|
| The detail page is shared by Customer and Admin.
| Content Manager access will use the assigned-order endpoint
| when that backend functionality is implemented.
|--------------------------------------------------------------------------
*/

export async function getOrder(
    id: number,
    role: "admin" | "content_manager" | "customer"
) {
    let endpoint = "";

    switch (role) {
        case "admin":
            endpoint = `/admin/orders/${id}`;
            break;

        case "customer":
            endpoint = `/customer/orders/${id}`;
            break;

        case "content_manager":
            // Content Manager assigned-order endpoint will be connected
            // when the conversation/order assignment feature is implemented.
            endpoint = `/content-manager/orders/${id}`;
            break;

        default:
            throw new Error("Invalid user role");
    }

    const response = await api.get(endpoint);

    return response.data.data ?? response.data;
}

export async function createCustomerOrder(
    data: CreateCustomerOrderData
) {
    try {
        const payload = {
            service_id: Number(data.service_id),

            ...(data.package_id
                ? {
                      package_id: Number(data.package_id),
                  }
                : {}),

            ...(data.title
                ? {
                      title: data.title,
                  }
                : {}),

            ...(data.description
                ? {
                      description: data.description,
                  }
                : {}),

            ...(data.budget !== undefined
                ? {
                      budget: Number(data.budget),
                  }
                : {}),

            ...(data.deadline
                ? {
                      deadline: data.deadline,
                  }
                : {}),
        };

        console.log(
            "CREATE ORDER PAYLOAD:",
            JSON.stringify(payload, null, 2)
        );

        const response = await api.post(
            "/customer/orders",
            payload
        );

        return response.data.data;
    } catch (error: any) {
        console.error(
            "CREATE ORDER ERROR STATUS:",
            error?.response?.status
        );

        console.error(
            "CREATE ORDER ERROR DATA:",
            error?.response?.data
                ? JSON.stringify(
                      error.response.data,
                      null,
                      2
                  )
                : "NO RESPONSE DATA"
        );

        console.error(
            "CREATE ORDER ERROR MESSAGE:",
            error?.message
        );

        throw error;
    }
}

export async function updateCustomerOrder(
    id: number,
    data: UpdateCustomerOrderData
) {
    const response = await api.put(
        `/customer/orders/${id}`,
        data
    );

    return response.data.data;
}

export async function deleteCustomerOrder(
    id: number
) {
    const response = await api.delete(
        `/customer/orders/${id}`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Order Files
|--------------------------------------------------------------------------
*/

export async function uploadOrderFile(
    orderId: number,
    file: File,
    onProgress?: (progress: number) => void
) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        `/customer/orders/${orderId}/files`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },

            onUploadProgress(event) {
                if (
                    event.total &&
                    onProgress
                ) {
                    onProgress(
                        Math.round(
                            (event.loaded * 100) /
                                event.total
                        )
                    );
                }
            },
        }
    );

    return response.data.data;
}

export async function deleteOrderFile(
    fileId: number
) {
    await api.delete(
        `/customer/order-files/${fileId}`
    );
}

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

export async function getServices() {
    const response = await api.get(
        "/services"
    );

    return response.data.data;
}

export async function getServicePackages(
    serviceSlug: string
) {
    const response = await api.get(
        `/services/${serviceSlug}/packages`
    );

    return response.data.data;
}

/*
|--------------------------------------------------------------------------
| Administrator Orders
|--------------------------------------------------------------------------
*/

export async function getAdminOrders(
    filters: OrderFilters = {}
) {
    const response = await api.get(
        "/admin/orders",
        {
            params: filters,
        }
    );

    return response.data.data ?? response.data;
}

export async function getAdminOrder(
    id: number
) {
    const response = await api.get(
        `/admin/orders/${id}`
    );

    return response.data.data ??
        response.data;
}

export async function updateAdminOrder(
    id: number,
    data: {
        service_id?: number;
        package_id?: number;
        title?: string;
        description?: string;
        budget?: number;
        deadline?: string;
    }
) {
    const response = await api.put(
        `/admin/orders/${id}`,
        data
    );

    return response.data.data ??
        response.data;
}

export async function deleteAdminOrder(
    id: number
) {
    const response = await api.delete(
        `/admin/orders/${id}`
    );

    return response.data;
}

export async function updateAdminOrderStatus(
    id: number,
    status: string
) {
    const response = await api.patch(
        `/admin/orders/${id}/status`,
        {
            status,
        }
    );

    return response.data.data ??
        response.data;
}

export async function updateAdminPaymentStatus(
    id: number,
    payment_status: string
) {
    const response = await api.patch(
        `/admin/orders/${id}/payment-status`,
        {
            payment_status,
        }
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Content Manager Orders
|--------------------------------------------------------------------------
*/

export async function getContentManagerOrders(
    filters: OrderFilters = {}
) {
    const response = await api.get(
        "/content-manager/orders",
        {
            params: filters,
        }
    );

    return response.data?.data ?? [];
}

export async function getContentManagerOrder(
    id: number
) {
    const response = await api.get(
        `/content-manager/orders/${id}`
    );

    return response.data?.data;
}