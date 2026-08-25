import { shopApi } from "@/shared/api/shop.api";
import type { Product } from "@/shared/interfaces/products.interface";

export const getProduct = async( id: string ) : Promise<Product> => {
    
    if( id === 'new'){
        return {
            id,
            title:       '',
            price:       0,
            description: '',
            slug:        '',
            stock:       0,
            sizes:       [],
            gender:      'men',
            tags:        [],
            images:      [],
        } as unknown as Product
    }
        
    const { data } = await shopApi.get<Product>(`/products/${id}`);
    const images = data.images.map(image => {
        if( image.includes('http') ) return image;
        return `${ import.meta.env.VITE_API_URL}/api/files/product/${image}`
    })

    return {
        ...data,
        images
    }
}