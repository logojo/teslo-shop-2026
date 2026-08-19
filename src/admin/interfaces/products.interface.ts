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
    sizes:       string[];
    gender:      Gender;
    tags:        Tag[];
    images:      string[];
    user:        User;
}

export const Gender = {
    Kid: "kid",
    Men: "men",
    Women: "women",
}


export type Gender = (typeof Gender)[keyof typeof Gender];

export const Tag = {
    Shirt: "shirt",
}

export type Tag = (typeof Tag)[keyof typeof Tag];

export interface User {
    id:       string;
    email:    Email;
    fullName: FullName;
    isActive: boolean;
    roles:    Role[];
}

export const Email =  {
    Test1GoogleCOM: "test1@google.com",
}

export type Email = (typeof Email)[keyof typeof Email];

export const FullName = {
    TestOne: "Test One",
}

export type FullName = (typeof FullName)[keyof typeof FullName];

export const Role = {
    Admin: "admin",
}

export type Role = (typeof Role)[keyof typeof Role];
