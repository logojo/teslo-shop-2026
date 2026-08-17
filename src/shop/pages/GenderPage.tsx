import { useParams } from "react-router"
import CustomPagination from "@/components/custom/CustomPagination"
import { products } from "@/data/products"
import { CustomJumbotron } from "../components/CustomJumbotron"
import { ProductsGrid } from "../components/ProductsGrid"


const GenderPage = () => {
  const { gender } = useParams()

  const genderLabel =  gender === 'men'
  ? 'Hombres'
  : gender === 'women' 
     ? 'Mujeres' : 'Niños';

  return (
    <>
      <CustomJumbotron
       title={`Productos para ${genderLabel}`}
      />
      <ProductsGrid products={ products } />
      <CustomPagination
        totalPages={10}
      />
    </>
  )
}

export default GenderPage