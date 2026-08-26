
import type { ApiError } from "@/shared/api/api-error"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProduct } from "../actions/get-product.action"
import type { Product } from "@/shared/interfaces/products.interface"
import { createUpdate } from "../actions/create-update.action"

export interface FormInputs extends Product {
    files?: File[]
}

export const useProduct = ( id: string ) => {
    const queryClient = useQueryClient();

    const query = useQuery<Product, ApiError>({
        queryKey: ['product', id],
        queryFn: () => getProduct( id  ),
        staleTime: 1000 * 60 * 5
    })

    const mutation = useMutation({
        mutationFn: createUpdate,
        onSuccess: ( product ) => {
            //actualizando la información de la actualización para no hacer otra petición
            queryClient.setQueryData(["product", id], product);

            //invalidando la consulta anterior para actualizar los datos 
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        }
    });


    return {
        ...query,
        mutation
    }
}
