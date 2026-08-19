import axios from "axios";
import { mapAxiosError } from "./mapAxiosError";

const BASE_URL = import.meta.env.VITE_API_URL;

export const shopApi = axios.create({
    baseURL: `${BASE_URL}/api`
});

shopApi.interceptors.response.use(
    //todo: enviar token
    (response) => response,
    (error) => {
        throw mapAxiosError( error )
    }
)