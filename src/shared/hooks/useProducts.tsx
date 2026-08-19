import { useQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "@/admin/interfaces/products.interface";
import type { ApiError } from "../api/api-error";
import { getProducts } from "@/admin/actions/get-products.action";


export const useProducts = (page : number, limit : number) => {

   return useQuery<ProductsResponse, ApiError>({
    queryKey: ['products', { page, limit }],
    queryFn: () => getProducts(page, limit),
    staleTime: 1000 * 60 * 5
  });
  
}
