import type { Gender, ProductsResponse } from "@/shared/interfaces/products.interface";
import { shopApi } from "@/shared/api/shop.api";



export const getProducts = async(
    page: number,
    limit: number,
    gender?: Gender,
 ) : Promise<ProductsResponse> => {

    if ( isNaN(page) ) {
         page = 1;
    }

    if ( isNaN(limit) ) {
         page = 10;
    }

    const { data } = await shopApi.get<ProductsResponse>('/products', {
        params : {
          limit,
          offset: ( page -1 ) * limit,
          gender
        }
    });

    const products = data.products.map( product => ({
        ...product,
        images: product.images.map( (image) => `${ import.meta.env.VITE_API_URL}/api/files/product/${image}` )
    }));

    return {
        ...data,
        products
    };
 }