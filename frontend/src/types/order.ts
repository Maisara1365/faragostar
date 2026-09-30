export interface OrderUser {
    id: number;
    name: string;
    email: string;
}

export interface OrderService {
    id: number;
    title: string;
}

export interface OrderPackage {
    id: number;
    name: string;
    price: number;
}

export interface OrderFile {
    id: number;
    order_id: number;
    file_name: string;
    file_path: string;
    file_size: number;
    file_type: string;
    uploaded_by: number;
    file_url: string;
    file_size_formatted?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Order {
    id: number;

    order_number: string;

    user_id?: number;

    title: string | null;

    description: string | null;

    budget: number | null;

    deadline: string | null;

    status: string;

    payment_status: string;

    created_at: string;

    updated_at: string;

    user?: OrderUser;

    customer?: OrderUser;

    service: OrderService;

    package: OrderPackage | null;
 
    conversation_id: number | null;

    files?: OrderFile[];
}