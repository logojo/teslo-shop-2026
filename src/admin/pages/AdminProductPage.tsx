
import { useNavigate, useParams } from 'react-router';

import ErrorPage from '../components/errors/ErrorPage';
import { ProductSkeleton } from '../components/skeletons/ProductSckeleton';
import { useProduct } from '../hooks/useProduct';
import { ProductForm } from '../components/ProductForm';
import type { Product } from '@/shared/interfaces/products.interface';
import { toast } from 'sonner';

 const AdminProductPage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const {  data : product,  isPending, error, refetch, mutation } =  useProduct( id )

  const { isPending : isMutationPending } = mutation

  const handleSubmit = async( productLike: Partial<Product> & { files?: File[] }) => {

    mutation.mutateAsync( productLike, {
      onSuccess: () => {       
        if(productLike.id === 'new')
          toast.success('Producto creado correctamente!!!', { position: 'top-center' })
        else
          toast.success('Producto actualizado correctamente!!!', { position: 'top-center' })
        navigate(`/admin/products/${id}`)
      },
      onError:( error ) => {
        toast.error(error.message, { position: 'top-center' })
      }
    })
  }

  if( isPending )
      return <ProductSkeleton />

  if ( error ) 
      return <ErrorPage 
        error={error.variant} //enviando la variante del error
        onRetry={refetch}
      />

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  
  return <ProductForm 
            product={product}
            productTitle={title}
            productSubtitle={subtitle}
            onSubmit={handleSubmit}
            isPending={isMutationPending}
         />;
};

export default AdminProductPage;