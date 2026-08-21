import { Link, useSearchParams } from 'react-router';

import { CirclePlus, Edit3 } from 'lucide-react';

import type { ColumnDef } from '@tanstack/react-table'

import { AdminTitle } from "../components/AdminTitle"
import { CustomTable, type PaginationFeatures } from '@/components/custom/CustomTable'
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import ErrorPage from '../components/errors/ErrorPage';

import { useProducts } from '@/shared/hooks/useProducts';
import type { Product } from '@/shared/interfaces/products.interface';
import { TableSkeleton } from '../components/skeletons/TableScheleton';

// 4. Define your columns
const columns: Array<ColumnDef<PaginationFeatures, Product>> = [
  {
    accessorKey: 'id', // accessorKey shorthand
    header: () => (
      <div className="font-bold text-gray-500">
       ID
      </div>
    ),
  },
  {
    accessorFn: (row) => row.images[0] , // accessorFn alternative with a custom id
    id: 'image',
    header: 'Image',
    cell: (info) => <img className='w-10' src={info.getValue<string>()}/>,
  },
  {
    accessorKey: 'title', // accessorKey shorthand
    header: 'Name',
  },
  {
    accessorKey: 'price', // accessorKey shorthand
    header: 'Price',
  },
  {
    accessorKey: 'stock', // accessorKey shorthand
    header: 'stock',
  },
  {
    accessorKey: 'sizes', 
    header: 'Sizes',
    cell: ({ getValue }) => {
      const sizes = getValue<string[]>()

      return (
        <div className="flex flex-wrap gap-1">
          {sizes.map((size) => (
            <Badge key={size} variant="secondary">
              {size},
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'tags', 
    header: 'Tags',
    cell: ({ getValue }) => {
      const colors = getValue<string[]>()

      return (
        <div className="flex flex-wrap gap-1">
          {colors.map((color) => (
            <Badge key={color} variant="secondary">
              {color},
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.id,
    id: 'actions',
    header: 'actions',
    cell: (info) => (
      <div>
        <Link
          to={`/admin/products/${info.getValue<string>()}`}
          className={buttonVariants({ variant: "outline", size: "icon" })}
        >
          <Edit3 />
        </Link>       
      </div>
    ),
  },
]

const ProductsPage = () => {
  const [ , setSearchParams ] = useSearchParams();
  const { query, page, limit, q } = useProducts() 
  const { data: shopResponse, error, isPending, isFetching, refetch  } = query;

  return (
    <>

      <div className='flex justify-between items-center px-10'>
        <AdminTitle 
          title="Products"
          subtitle="Here you can view and manage your products."
        />
       
        <Link
          to='/admin/products/new'
          className={buttonVariants({ variant: "default"})}
        >
          <CirclePlus data-icon="inline-start" />
          New Product
        </Link>       
      </div>

      {
        error 
        ? <ErrorPage 
              error={error.variant} //enviando la variante del error
              onRetry={refetch}
            />
        : isPending 
        ? <TableSkeleton
                  columns={columns.length}
                  rows={10}
              />
        : <CustomTable
            tableKey='products-table'
            data={[...shopResponse.products ?? []]}
            columns={columns}
            pageCount={shopResponse.pages ?? 1 }
            pageIndex={ page -1 }
            pageSize={ limit }
            globalFilter={ q }
            onPaginationChange={(pageIndex, pageSize) => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev)

                params.set("page", String(pageIndex + 1))
                params.set("limit", String(pageSize))

                return params
              })
            }}
            onGlobalFilterChange={(value) => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev)

                params.set("q", value)
                params.set("page", "1")

                return params
              })
            }}
            isLoading={ isPending || isFetching }
          />
      }
      

    </>
  )
}

export default ProductsPage