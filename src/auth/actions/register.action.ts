import { shopApi } from "@/shared/api/shop.api"

import type { AuthResponse } from "../interfaces/auth.interface"

export const register = async( fullName: string, email: string, password: string) : Promise<AuthResponse> => {
   try {
    const { data } = await shopApi.post<AuthResponse>('/auth/register', {
        fullName,
        email, 
        password
    });
    
    return data
    
   } catch (error) {
    console.log(error);
    throw error;
   }
}