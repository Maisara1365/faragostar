import { api } from "@/services/api";

import type {
    Customer,
    CustomerFilters,
    CustomerListResponse,
    CustomerResponse,
    UpdateCustomerPayload,
} from "@/types/customer";

/*
|--------------------------------------------------------------------------
| Get Customers
|--------------------------------------------------------------------------
*/

export async function getCustomers(
    filters?: CustomerFilters
): Promise<CustomerListResponse> {

    const response = await api.get(
        "/admin/customers",
        {
            params: filters,
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Customer Details
|--------------------------------------------------------------------------
*/

export async function getCustomer(
    id: number
): Promise<CustomerResponse> {

    const response = await api.get(
        `/dashboard/customers/${id}`
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Update Customer
|--------------------------------------------------------------------------
*/

export async function updateCustomer(
    id: number,
    payload: UpdateCustomerPayload
): Promise<void> {

    await api.put(
        `/dashboard/customers/${id}`,
        payload
    );

}

/*
|--------------------------------------------------------------------------
| Activate Customer
|--------------------------------------------------------------------------
*/

export async function activateCustomer(
    id: number
): Promise<void> {

    await api.patch(
        `/dashboard/customers/${id}/activate`
    );

}

/*
|--------------------------------------------------------------------------
| Block Customer
|--------------------------------------------------------------------------
*/

export async function blockCustomer(
    id: number
): Promise<void> {

    await api.patch(
        `/dashboard/customers/${id}/block`
    );

}