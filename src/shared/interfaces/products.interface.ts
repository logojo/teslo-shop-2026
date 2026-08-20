import type { User } from "@/admin/interfaces/user.interface";

export interface ProductsResponse {
    count:    number;
    pages:    number;
    products: Product[];
}

export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        string[];
    images:      string[];
    user:        User;
}


export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XL' | 'XXL'

export const Gender = {
    Kid: "kid",
    Men: "men",
    Women: "women",
    Unisex: "unisex",
}


export type Gender = (typeof Gender)[keyof typeof Gender];


