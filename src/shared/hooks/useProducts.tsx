import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Gender, ProductsResponse } from "@/shared/interfaces/products.interface";
import type { ApiError } from "../api/api-error";
import { getProducts } from "../actions/get-products.action";
import { useSearchParams } from "react-router";



export const useProducts = ( gender?: Gender ) => {
  const [ searchParams ] = useSearchParams();

  let page = Number(searchParams.get("page") || '1');
  let limit = Number(searchParams.get("limit") || '10');
  const sizes = searchParams.get("sizes") || undefined;
  const price = searchParams.get("price") || 'any';
  const q = searchParams.get("q") || undefined;

  let minPrice = undefined;
  let maxPrice = undefined;

  switch( price ) {
    case 'any':      
      break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
       minPrice = 50;
      maxPrice = 100;
      break;

    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;

    default:
      minPrice = 200;
      maxPrice = undefined;
      break;

  }

  page = isNaN( page ) ? 1 : page;
  limit = isNaN( limit ) ? 10 : limit;

  const query = useQuery<ProductsResponse, ApiError>({
    queryKey: ['products', { page, limit, gender, sizes, price, q }],
    queryFn: () => getProducts({page, limit, gender, sizes, minPrice, maxPrice, q }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5
  });

  return {
    page,
    limit,
    q,
    query
  }
  
}
