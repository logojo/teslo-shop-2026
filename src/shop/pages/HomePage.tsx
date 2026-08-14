import CustomPagination from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrid"
import { products } from "@/data/products"


const HomePage = () => {
  return (
    <>
      <CustomJumbotron
       title="Todos los productos"
      />
      <ProductsGrid products={ products } />
      <CustomPagination
        totalPages={10}
      />
    </>
  )
}

export default HomePage