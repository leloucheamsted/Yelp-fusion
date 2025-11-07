// Types TypeScript pour l'application

export interface Business {
    id?: number;
    yelp_id: string;
    name: string;
    address: string;
    phone: string;
    website: string;
    image_url: string;
    rating: number;
    review_count: number;
    categories?: Category[];
    coordinates?: {
        latitude: number | null;
        longitude: number | null;
    };
    created_at?: string;
    updated_at?: string;
}

export interface Category {
    alias: string;
    title: string;
}

export interface SearchParams {
    term: string;
    location: string;
    limit?: number;
    offset?: number;
}

export interface Pagination {
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
}

export interface APIResponse {
    success: boolean;
    data: Business[];
    pagination: Pagination;
    saved_to_database?: number;
    search_params?: SearchParams;
    timestamp: string;
}

export interface APIError {
    error: boolean;
    message: string;
    timestamp: string;
}