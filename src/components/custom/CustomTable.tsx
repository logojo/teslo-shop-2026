import { 
  // para paginacion
  //createPaginatedRowModel,
  rowPaginationFeature,

  //ordenamiento
  rowSortingFeature,
  createSortedRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  sortFn_datetime,

  //busqueda
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  globalFilteringFeature,

  tableFeatures, 
  useTable } from '@tanstack/react-table';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { useTanStackTableDevtools } from '@tanstack/react-table-devtools'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { TablePagination } from './TablePagination';
import { TableSkeleton } from '@/admin/components/skeletons/TableScheleton';


const features = tableFeatures({
  //paginacion
  rowPaginationFeature,
  //paginatedRowModel: createPaginatedRowModel(), //*esto solo se aplica cuando la paginación es del lado del cliente

  //ordenamiento
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime
  },

  // Busqueda
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),

  filterFns: {
    includesString: filterFn_includesString,
    //inNumberRange: filterFn_inNumberRange,
  },
  
})

export type PaginationFeatures = typeof features;


type TableProps<TData extends RowData> = {
    tableKey: string
    data: TData[],
    columns: Array<ColumnDef<PaginationFeatures, TData>>
    pageCount: number
    pageIndex: number
    pageSize: number
    onPaginationChange: (pageIndex: number, pageSize: number) => void
    isLoading?: boolean
};

export const CustomTable = <TData extends RowData>( { 
  tableKey, 
  data, 
  columns,  
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  isLoading = false, } : TableProps<TData> ) => {

  const table =  useTable({
    key: tableKey,
    features,
    columns,
    data,

    manualPagination: true,
    pageCount,

    //definiendo estado inicial del paginador
   state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },

    onPaginationChange: (updater) => {
        const currentPagination = {
            pageIndex,
            pageSize,
        }

        const nextPagination =
            typeof updater === 'function'
            ? updater(currentPagination)
            : updater

        onPaginationChange(
            nextPagination.pageIndex,
            nextPagination.pageSize
        )
    },

  });

  
  useTanStackTableDevtools(table)

  return (
    <div className='py-5 px-10'>

        {/* input Search */}
        <div className='flex items-center m-5 gap-10'>            

            <Input 
                type="search"
                value={table.state.globalFilter ?? ''}
                onChange={(event) => {
                    table.setGlobalFilter(event.target.value)
                    table.setPageIndex(0)
                }}
                placeholder="Buscar..."
            />

            <div className='flex items-end gap-3'>
                <span className="text-sm text-gray-600">
                    Mostrar
                </span>

                <Select value={String(table.state.pagination.pageSize)}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}>
                    <SelectTrigger className="w-10">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={5}>5</SelectItem>
                            <SelectItem value={10}>10</SelectItem>
                            <SelectItem value={20}>20</SelectItem>
                            <SelectItem value={50}>50</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <span className="text-sm text-gray-600">
                    registros
                </span>
            </div>
        </div>

        
        <Table className='bg-white shadow-xs border border-gray-150 '>
            <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow  key={headerGroup.id}>
                     
                        {headerGroup.headers.map((header) => {
                            if (header.isPlaceholder) {
                            return <th key={header.id} />
                            }

                            const isSorted = header.column.getIsSorted()

                            return (
                             <TableHead
                                key={header.id}
                                className="px-4 py-3 text-left"
                            >
                                <button
                                    type="button"
                                    disabled={!header.column.getCanSort()}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="
                                        cursor-pointer
                                        flex w-full items-center gap-2
                                        font-semibold
                                        hover:text-gray-800
                                        disabled:cursor-default
                                        disabled:hover:text-inherit
                                    "
                                >
                                <table.FlexRender header={header} />

                                {isSorted === 'asc' && <span>↑</span>}
                                {isSorted === 'desc' && <span>↓</span>}
                                </button>
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    
            </TableHeader>
            <TableBody>
                {isLoading ? (
                        <TableSkeleton
                        columns={columns.length}
                        rows={pageSize}
                        />
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.getAllCells().map((cell) => (
                                <TableCell key={cell.id}>
                                <table.FlexRender cell={cell} />
                                </TableCell>
                            ))}
                            </TableRow>
                        )))}
            </TableBody>
        </Table>

        <TablePagination table={table} />
    </div>
  
  )
}
