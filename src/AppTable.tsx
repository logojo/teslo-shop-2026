import type { ColumnDef } from "@tanstack/react-table"

import { CustomTable, type PaginationFeatures } from "./components/custom/CustomTable"
import { formatter } from "./lib/formatter"
import { data } from './data/MOCK_DATA';

import type { Person } from "./data/MOCK_DATA"


const columns: Array<ColumnDef<PaginationFeatures, Person>> = [
   {
    accessorKey: 'id', // accessorKey shorthand
    header: () => (
      <div className="font-bold text-gray-500">
        #
      </div>
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) =>`${row.name} ${row.lastname}`, // accessorFn alternative with a custom id
    id: 'name',
    header: () => (
        <div className="flex items-center gap-2">
          <span>Name</span>
        </div>
    ),
    //cell: (info) => <i>{info.getValue<string>()}</i>,
  },
  {
    accessorFn: (row) => row.email, // accessorFn alternative with a custom id
    id: 'email',
    header: () => <span className='flex'>Email</span>,
    cell: (info) => (
      <span className="font-bold text-blue-500">
      {info.getValue<string>()}
    </span>
    ),
  },
  {
    accessorKey: 'country',
    header: () => <span className='flex'>Country</span>,
  },
  {
    accessorKey: 'birthday',
    header: () => <span className='flex'>Birthday</span>,
    cell: (info) => <i>{ formatter.format( info.getValue<Date>() )}</i>,
    enableGlobalFilter: false, //deshabilitando busqueda para esta columna
  },
]

export const AppTable = () => {
  return <CustomTable
          tableKey='person-table'
          data={[...data]}
          columns={columns}
         />
}
