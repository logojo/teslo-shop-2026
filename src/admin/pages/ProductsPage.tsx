import { tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { AdminTitle } from "../components/AdminTitle"

interface Person {
  firstName: string,
  lastName: string,
  age: number
}

const data: Array<Person> = [
  { firstName: 'tanner', lastName: 'linsley', age: 24 },
  { firstName: 'tandy', lastName: 'miller', age: 40 },
  { firstName: 'joe', lastName: 'dirte', age: 45 },
]

// 3. New in v9: declare which features this table uses (none yet)
const features = tableFeatures({})

// 4. Define your columns
const columns: Array<ColumnDef<typeof features, Person>> = [
  {
    accessorKey: 'firstName', // accessorKey shorthand
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName, // accessorFn alternative with a custom id
    id: 'lastName',
    header: () => <span>Last Name</span>,
    cell: (info) => <i>{info.getValue<string>()}</i>,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
  },
]

const ProductsPage = () => {
  const table = useTable({
    key: 'products-table', // needed for devtools, omit if you don't want to use the devtools
    features,
    columns,
    data,
  })

  return (
    <>
      <AdminTitle 
        title="Products"
        subtitle="Here you can view and manage your products."
      />


      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          {
             
             table.getHeaderGroups().map((headerGroup) => (

               <TableRow key={headerGroup.id}>
                {
                    headerGroup.headers.map((header) => (
                 <TableHead key={header.id} className="w-25">
                  {
                    header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                 </TableHead>
                ))}
               </TableRow>
           


          )) }
          </TableHeader>
        <TableBody>
          {
           table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {
              row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ProductsPage