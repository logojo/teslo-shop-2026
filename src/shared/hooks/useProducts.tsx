import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Gender, ProductsResponse } from "@/shared/interfaces/products.interface";
import type { ApiError } from "../api/api-error";
import { getProducts } from "../actions/get-products.action";



export const useProducts = ( page: number, limit: number, gender?: Gender ) => {
  return useQuery<ProductsResponse, ApiError>({
    queryKey: ['products', { page, limit, gender }],
    queryFn: () => getProducts(page, limit, gender),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  });

  
  
}
