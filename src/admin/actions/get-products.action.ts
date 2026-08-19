import { shopApi } from "@/shared/api/shop.api";
import type { ProductsResponse } from "../interfaces/products.interface";


export const getProducts = async(
    page: number,
    limit: number,
 ) : Promise<ProductsResponse> => {

     if ( isNaN(page) ) {
         page = 1;
    }

    const { data } = await shopApi.get<ProductsResponse>('/products', {
        params : {
          limit,
          offset: ( page -1 ) * limit,
        }
    });

    const products = data.products.map( product => ({
        ...product,
        images: product.images.map( (image) => `${ import.meta.env.VITE_API_URL}/api/files/product/${image}` )
    }));

    console.log(products);
    

    return {
        ...data,
        products
    };
 }