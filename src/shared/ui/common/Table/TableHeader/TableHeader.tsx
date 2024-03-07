import { TableRow } from '../TableRow'
import { TableCellHead, TableCellHeadData } from '../TableCellHead'

export type TableSortState = [string | null, number]

type Props = {
  headData: TableCellHeadData[]
  sortState?: TableSortState
  classNameRow?: string
  gridTemplateColumns: string
  onChangeSort?: (val: TableSortState) => void
}

export function TableHeader({
  headData,
  sortState,
  classNameRow,
  gridTemplateColumns,
  onChangeSort,
}: Props) {
  const [sortBy, sortDesc] = sortState ?? []

  return (
    <TableRow
      isHead
      className={classNameRow}
      gridTemplateColumns={gridTemplateColumns}
    >
      {headData.map((cell, i) =>
        sortBy && sortDesc && onChangeSort ? (
          <TableCellHead
            cellData={cell}
            key={`header-cell-${i}`}
            isActive={sortBy === cell.sortField}
            onClickSort={() =>
              onChangeSort([
                cell.sortField!,
                sortBy === cell.sortField ? sortDesc * -1 : 1,
              ])
            }
            isDesc={sortDesc === 1}
          />
        ) : (
          <TableCellHead cellData={cell} key={`header-cell-${i}`} />
        ),
      )}
    </TableRow>
  )
}
