
import type { ApiError } from "@/shared/api/api-error"
import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../actions/get-product.action"
import type { Product } from "@/shared/interfaces/products.interface"


export const useProduct = ( id: string ) => {
    const query = useQuery<Product, ApiError>({
        queryKey: ['product', id],
        queryFn: () => getProduct( id  ),
        staleTime: 1000 * 60 * 5
    })

    //todo: manejar la mutación

    return {
        ...query
    }
}
