import axios from "axios";
import { mapAxiosError } from "./mapAxiosError";

const BASE_URL = import.meta.env.VITE_API_URL;

export const shopApi = axios.create({
    baseURL: `${BASE_URL}/api`
});

//interceptor en la request
shopApi.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token')
        if( token ) 
            request.headers.Authorization = `Bearer ${token}`
        
        return request
    }
)

//interceptor en la response
shopApi.interceptors.response.use(
    (response) => response,
    (error) => {
        throw mapAxiosError( error )
    }
)