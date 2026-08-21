import { Spinner } from "@/components/ui/spinner"

import CustomPagination from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrid"
import { useProducts } from "@/shared/hooks/useProducts"
import ErrorPage from "@/admin/components/errors/ErrorPage"
import ProductGridSkeleton from "../components/skeletons/ProductCardSckeleton"



const HomePage = () => {
  const { query } = useProducts() 
  const { data: shopResponse, error, isPending, isFetching, refetch  } = query;

  if( isPending )
       return <ProductGridSkeleton />

  if ( error )
      return <ErrorPage 
        error={error.variant} //enviando la variante del error
        onRetry={refetch}
      />

  return (
    <>
      <CustomJumbotron
       title="Todos los productos"
      />

      <div className="relative">
        <ProductsGrid products={shopResponse.products} />

        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[1px]">
            <Spinner className="size-30" />
          </div>
        )}
      </div>

    <CustomPagination
      totalPages={shopResponse.pages}
    />

    </>
  )
}

export default HomePage