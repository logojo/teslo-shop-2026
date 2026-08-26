import { shopApi } from "@/shared/api/shop.api";
import type { Product } from "@/shared/interfaces/products.interface";

export const createUpdate = async( productLike : Partial<Product> & { files?: File[]} ) : Promise<Product> => {
  const { id, user, images = [], files = [], ...rest } = productLike;
  console.log( files );
  
  const isCreated = id === 'new';

  rest.stock = Number( rest.stock) || 0;
  rest.price = Number( rest.price) || 0;

  //preparando imagenes 

  if( files.length > 0 ) {
    const newImages = await uploadFiles( files );    
    images.push( ...newImages )
  }

    const imagesToSave = images.map(image => {
        if( image.includes('http') ) return image.split('/').pop() || '';
        return image
    })

   const { data } = await shopApi<Product>({
    url: isCreated ? '/products' : `/products/${ id }`,
    method: isCreated ? 'POST' : 'PATCH',
    data: { ...rest, images:imagesToSave }
   });

    const imgs = data.images.map(image => {
        if( image.includes('http') ) return image;
        return `${ import.meta.env.VITE_API_URL}/api/files/product/${image}`
    })

   return {
    ...data,
    images: imgs
   };

}

interface FileUpResponse {
    secureUrl: string;
    fileName: string;
}

const uploadFiles = async( Files: File[] ) => {
    const uploadPromises = Files.map( async(file) => {
        const formaData = new FormData();
        formaData.append('file', file)

        const { data } = await shopApi.post<FileUpResponse>('/files/product', formaData);

        return data.fileName
    });

    return await Promise.all(uploadPromises)
}