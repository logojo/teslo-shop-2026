import { useSearchParams } from 'react-router';

import type { RowData, Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button';

import type { PaginationFeatures } from './CustomTable';
import { useEffect } from 'react';

type PaginationProps<TData extends RowData> = {
  table: Table<PaginationFeatures, TData>;
};

type PaginationItem = number | 'ellipsis'


function getPaginationItems(
  pageIndex: number,
  pageCount: number,
): PaginationItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index)
  }

  if (pageIndex <= 3) {
    return [0, 1, 2, 3, 4, 'ellipsis', pageCount - 1]
  }

  if (pageIndex >= pageCount - 4) {
    return [
      0,
      'ellipsis',
      pageCount - 5,
      pageCount - 4,
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
    ]
  }

  return [
    0,
    'ellipsis',
    pageIndex - 1,
    pageIndex,
    pageIndex + 1,
    'ellipsis',
    pageCount - 1,
  ]
}

export function TablePagination<TData extends RowData>({ table }: PaginationProps<TData>) {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { pageIndex, pageSize } = table.store.state.pagination;
  const pageCount = table.getPageCount()

  const paginationItems = getPaginationItems(
    pageIndex,
    pageCount,
  )


  useEffect(() => {
     setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", (pageIndex + 1) + '');
      return params;
    });
  }, [pageIndex])
  

  return (
      <div className="mt-6 flex flex-col gap-4 border-t pt-4">
        {/* Controles principales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Mostrar
            </span>

            <Select value={String(pageSize)}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}>
                <SelectTrigger className="w-14">
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

          <span className="text-sm text-gray-600">
            Página {pageIndex + 1} de{' '}
            {table.getPageCount()}
          </span>
        </div>

        {/* Navegación */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}               
              >
                <ChevronsLeft />
              </Button>

              <Button
                variant="ghost"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft />
                <span>Previous</span>
            </Button>
            </PaginationItem>


            {paginationItems.map((item, index) => {
              if (item === 'ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              const active = pageIndex === item

              return (
                <PaginationItem  
                    key={item}
                    onClick={() => table.setPageIndex(item)}
                >
                  <PaginationLink href="#" isActive={active}>
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
                
              )
            })}
          
            <PaginationItem>
              <Button
                variant="ghost"
                  onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                
              >
                  <span>Next</span>
                  <ChevronRight />
              </Button>
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}             
              >
                  <ChevronsRight />
                </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
      </div>
  )
}