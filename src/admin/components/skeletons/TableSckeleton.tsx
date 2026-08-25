import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

type TableSkeletonProps = {
  columns: number
  rows: number
}

export function TableSkeleton({
  columns,
  rows,
}: TableSkeletonProps) {
  return (
    <div className='py-5 px-10 relative'>
    <Table className='bg-white shadow-xs border border-gray-150 '>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <TableCell key={columnIndex}>
                <Skeleton
                  className={
                    columnIndex === 0
                      ? "h-4 w-32"
                      : "h-4 w-20"
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

