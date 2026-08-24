import { shopApi } from "@/shared/api/shop.api"

import type { AuthResponse } from "../interfaces/auth.interface"

export const login = async( email: string, password: string) : Promise<AuthResponse> => {
   try {
    const { data } = await shopApi.post<AuthResponse>('/auth/login', {
        email, 
        password
    });
    
    return data
    
   } catch (error) {
    console.log(error);
    throw error;
   }
}