import { useParams, useSearchParams } from "react-router"
import CustomPagination from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrid"
import ProductGridSkeleton from "../components/skeletons/ProductCardSckeleton"
import { useProducts } from "@/shared/hooks/useProducts"
import ErrorPage from "@/admin/components/errors/ErrorPage"
import { Spinner } from "@/components/ui/spinner"


const GenderPage = () => {
  const [ searchParams ] = useSearchParams();
  const { gender } = useParams()

  const genderLabel =  gender === 'men'
  ? 'Hombres'
  : gender === 'women' 
     ? 'Mujeres' : 'Niños';

  const page = searchParams.get("page") ?? '1';
  const limit = searchParams.get("limit") ?? '10';

  const { data: shopResponse, error, isPending, isFetching, refetch  } = useProducts(+page, +limit, gender);

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
       title={`Productos para ${genderLabel}`}
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

export default GenderPage