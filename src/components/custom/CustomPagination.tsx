
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router";

interface Props {
    totalPages: number;
}

const CustomPagination = ({ totalPages }: Props) => {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const queryPage = searchParams.get("page") ?? '1'
  const  page = isNaN( +queryPage ) ? 1 : Number( queryPage);



  //modificando el url en base a la pagina seleccionada
  const handlePagechange = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage.toString());
      return params;
    });
  };



  return (
   <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" 
                size="sm" 
                disabled={page === 1} 
                onClick={() => handlePagechange(page - 1)} >
        <ChevronLeft className="h-4 w-4" />
        Previous
        </Button>

        {
            Array.from({ length: totalPages }).map((_, index) => (
                <Button 
                    key={index}
                    variant={page === (index + 1)  ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handlePagechange(index + 1)}
                >
                    {index + 1}
                </Button>
            ))
        }

       
        {/* <Button variant="ghost" size="sm" disabled>
        <MoreHorizontal className="h-4 w-4" />
        </Button> */}

        <Button variant="outline" 
                size="sm" 
                disabled={page === totalPages}
                onClick={() => handlePagechange(page + 1)} >
            Next
            <ChevronRight className="h-4 w-4" />
        </Button>
    </div>
  )
}

export default CustomPagination
