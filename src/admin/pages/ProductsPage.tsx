import type { ColumnDef } from '@tanstack/react-table'

import { AdminTitle } from "../components/AdminTitle"
import { CustomTable, type PaginationFeatures } from '@/components/custom/CustomTable'
import { products, type Product } from '../../data/products';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router';
import { CirclePlus, Edit3 } from 'lucide-react';



// 4. Define your columns
const columns: Array<ColumnDef<PaginationFeatures, Product>> = [
  {
    accessorKey: 'id', // accessorKey shorthand
    header: () => (
      <div className="font-bold text-gray-500">
        #
      </div>
    ),
  },
  {
    accessorKey: 'image', // accessorKey shorthand
    header: 'Image',
    cell: (info) => <img className='w-10' src={info.getValue<string>()}/>,
  },
  {
    accessorKey: 'name', // accessorKey shorthand
    header: 'Name',
  },
  {
    accessorKey: 'price', // accessorKey shorthand
    header: 'Price',
  },
  {
    accessorKey: 'category', // accessorKey shorthand
    header: 'Category',
  },
  {
    accessorKey: 'sizes', 
    header: 'Sizes',
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
    accessorKey: 'colors', 
    header: 'Colors',
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


      <CustomTable
        tableKey='products-table'
        data={[...products]}
        columns={columns}
      />

    </>
  )
}

export default ProductsPage