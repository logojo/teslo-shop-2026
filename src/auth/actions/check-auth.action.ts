import { shopApi } from "@/shared/api/shop.api";
import type { AuthResponse } from "../interfaces/auth.interface";


export const checkAuth = async() : Promise<AuthResponse> => {
   const token = localStorage.getItem('token');

    if( !token ) throw new Error('No found token ')

    try {
       const { data } = await shopApi.get<AuthResponse>('/auth/check-status');
       localStorage.setItem('token', data.token);
       return data;
    } catch (error) {
      localStorage.removeItem('token');
      throw new Error('Token no valid ');
    }
}
