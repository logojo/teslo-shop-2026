
import { useParams } from 'react-router';

import ErrorPage from '../components/errors/ErrorPage';
import { ProductSkeleton } from '../components/skeletons/ProductSckeleton';
import { useProduct } from '../hooks/useProduct';
import { ProductForm } from '../components/ProductForm';

 const AdminProductPage = () => {
   const { id = '' } = useParams();
   const {  data : product,  isPending, error, refetch } =  useProduct( id )


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
         />;
};

export default AdminProductPage;