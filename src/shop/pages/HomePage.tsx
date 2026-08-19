import CustomPagination from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrid"
import { useProducts } from "@/shared/hooks/useProducts"
import { useSearchParams } from "react-router"
import ErrorPage from "@/admin/components/errors/ErrorPage"
import ProductGridSkeleton from "../components/skeletons/ProductCardSckeleton"


const HomePage = () => {
  const [ searchParams ] = useSearchParams();

  const page = searchParams.get("page") ?? '1';
  const limit = searchParams.get("limit") ?? '10';

  const { data: shopResponse, error, isPending, refetch  } = useProducts(+page, +limit);
  return (
    <>
      <CustomJumbotron
       title="Todos los productos"
      />

      {
         error
                ? <ErrorPage 
                     error={error.variant} //enviando la variante del error
                     onRetry={refetch}
                   />
                : isPending
                    ? <ProductGridSkeleton />
                    : (
                        <>
                          <ProductsGrid products={ shopResponse.products } />
                          <CustomPagination
                            totalPages={shopResponse.pages }
                          />
                        </>
                      )
      }

    </>
  )
}

export default HomePage