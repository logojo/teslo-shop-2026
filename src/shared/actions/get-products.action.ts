import type { Gender, ProductsResponse } from "@/shared/interfaces/products.interface";
import { shopApi } from "@/shared/api/shop.api";

interface Options {
    page: number;
    limit: number;
    gender?: Gender;
    sizes?: string;
    minPrice: number|undefined;
    maxPrice: number|undefined;
    q: string|undefined;
}

export const getProducts = async(
   options : Options
 ) : Promise<ProductsResponse> => {

    const { page,  limit, gender, sizes, minPrice, maxPrice, q } = options;

    const { data } = await shopApi.get<ProductsResponse>('/products', {
        params : {
          limit,
          offset: ( page -1 ) * limit,
          gender,
          sizes,
          minPrice,
          maxPrice,
          q
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