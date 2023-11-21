import { MouseEvent, ReactElement, ReactNode, UIEvent, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import DataTableHeaderColumn from './DataTableHeaderColumn'
import { createDefaultRenderFooterFunction, createDefaultRenderRowFunction } from './DataTableRow'
import cx from '../../fundamentals/classNames'

export interface SortState {
  sortColumn: string
  sortDirection: 'ascending' | 'descending'
}

export type DataRowRenderer<T> = (rowData: T, rowIndex: number) => ReactNode

export interface DataColumn<T> {
  headerText: ReactNode

  renderCell(rowData: T): ReactNode

  headerAlign?: /* default */ 'left' | 'right'

  /**
   * Define this to indicate that a column is sortable.
   *
   * If defined, a sort control will be shown for the column, and will indicate the current sort state if the
   * state's field matches. This field name will be passed back to the onChooseSort callback when the sort
   * control is clicked.
   */
  sortField?: string

  /**
   * Define this to indicate that a column is filterable.
   *
   * If defined, a filter control will be shown for the column, next to the sort control, and will indicate
   * the current filtering state if the field is in the set of current filters. This field name will
   * be passed back to the onChooseFilter callback when the filter control is clicked.
   */
  filterField?: string

  /**
   * If set, this should render the footer for this column based on the entire data set
   */
  renderFooter?: (data: T[]) => ReactNode

  /**
   * If truthy, this column will expand to fill all the spare horizontal space available for the table.
   *
   * Only the first column setting this attribute will be so expanded
   */
  fillHorizontalSpace?: boolean

  /**
   * Width of sticky column.
   *
   * If specified, the column is made sticky and its width fixed to this number of pixels. Sticky columns
   * are only valid at the *start* of the column list.
   */
  stickyWidth?: number

  /**
   * Ideally used with fixedLayout tables (can work without fixedLayout but columns may get resized).
   * This maybe any valid `width` (e.g. percentage or pixels)
   */
  fixedWidth?: string

  /**
   * Set to show a separator line after this column
   */
  separator?: boolean
}

export interface DataTableProps<T> {
  className?: string

  data: T[]
  columns: DataColumn<T>[]

  sortState?: SortState
  onChooseSort?: (sortField: string) => void

  filterState?: string[]
  onChooseFilter?: (filterField: string, e: MouseEvent) => void

  onRowClick?: (data: T) => void

  renderRow?: DataRowRenderer<T>
  renderExpandedRow?: DataRowRenderer<T>
  renderFooterRow?: (data: T[]) => ReactNode

  fixedLayout?: boolean

  onScroll?: (e: UIEvent) => void
}

const noop = () => undefined

export const DataTable: <T>(props: DataTableProps<T>) => ReactElement = ({
  className,
  data,
  columns,
  sortState,
  onChooseSort = noop,
  filterState = [],
  onChooseFilter = noop,
  onRowClick,
  renderRow = createDefaultRenderRowFunction(columns, onRowClick),
  renderFooterRow = columns.find((it) => it.renderFooter) ? createDefaultRenderFooterFunction(columns) : undefined,
  fixedLayout,
  onScroll,
}) => {
  const spaceFillerColumn = useMemo(() => {
    let index: number
    for (index = 0; index < columns.length; index++) {
      if (columns[index].fillHorizontalSpace) {
        return index
      }
    }
    return
  }, [columns])
  const stickyOffsets: StickyInfo[] = useMemo(() => {
    let index: number
    const offsets: StickyInfo[] = []
    let stickyOffset = 0
    for (index = 0; index < columns.length; index++) {
      const { stickyWidth } = columns[index]
      if (stickyWidth) {
        offsets.push({ offset: stickyOffset, width: stickyWidth })
        stickyOffset += stickyWidth
      } else {
        break
      }
    }
    return offsets
  }, [columns])
  const separatorIndices = useMemo(() => {
    const indices = new Set<number>()
    let index: number
    for (index = 0; index < columns.length; index++) {
      if (columns[index].separator) {
        indices.add(index)
      }
    }
    return indices
  }, [columns])
  const [scrolled, setScrolled] = useState<boolean>(false)
  const onViewPortScroll = useCallback((e) => setScrolled(e.currentTarget.scrollLeft !== 0), [])
  const tableViewPortRef = useRef<HTMLDivElement>(null)
  const onLastTableHeaderHover = useCallback(() => {
    if (tableViewPortRef.current) {
      tableViewPortRef.current.scrollLeft = tableViewPortRef.current.scrollWidth
    }
  }, [])

  return (
    <TableViewPort
      data-testid="data-table"
      ref={tableViewPortRef}
      className={className}
      spaceFillerColumn={spaceFillerColumn}
      stickyOffsets={stickyOffsets}
      separatorIndices={separatorIndices}
      onScroll={(e) => {
        onViewPortScroll(e)
        onScroll?.(e)
      }}
      fixedLayout={fixedLayout}
    >
      <table>
        <thead className={cx({ isScrolled: scrolled })}>
          <tr>
            {columns.map((column, index) => (
              <DataTableHeaderColumn
                key={index}
                column={column}
                onChooseSort={onChooseSort}
                sortDirection={
                  column.sortField && sortState && sortState.sortColumn === column.sortField
                    ? sortState.sortDirection
                    : undefined
                }
                onChooseFilter={onChooseFilter}
                filterActive={column.filterField ? filterState.includes(column.filterField) : false}
                onMouseOver={index === columns.length - 1 ? onLastTableHeaderHover : undefined}
              />
            ))}
          </tr>
        </thead>
        <tbody className={cx({ isScrolled: scrolled })}>{data.map(renderRow)}</tbody>
        {renderFooterRow ? <tfoot className={cx({ isScrolled: scrolled })}>{renderFooterRow(data)}</tfoot> : null}
      </table>
    </TableViewPort>
  )
}

const TableViewPort = styled.div<{
  spaceFillerColumn?: number
  stickyOffsets: StickyInfo[]
  separatorIndices: Set<number>
  fixedLayout?: boolean
}>`
  overflow: auto;
  font-size: 14px;
  position: relative;

  :not(:hover) {
    ::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    ${({ spaceFillerColumn }) => (spaceFillerColumn === undefined ? `` : `table-layout: auto;`)}
    ${({ fixedLayout }) => (!fixedLayout ? `` : `table-layout: fixed;`)}

    td {
      min-width: 25px;
      height: 36px;
      padding: 0 12px;
      white-space: nowrap;
    }

    thead th:first-child,
    tbody td:first-child {
      padding-left: 12px;
    }

    ${({ spaceFillerColumn }) =>
      spaceFillerColumn === undefined
        ? ``
        : `
            thead th:nth-child(${spaceFillerColumn + 1}),
            tbody td:nth-child(${spaceFillerColumn + 1}),
            tfoot td:nth-child(${spaceFillerColumn + 1}) {
              width: 100%;
            }
          `}

    thead th, tfoot td {
      position: sticky;
      top: 0;
      text-align: left;
      min-width: 25px;
      height: 36px;
      white-space: nowrap;
      background: #1d2734;
      padding: 0 12px;
    }

    ${({ stickyOffsets }) =>
      stickyOffsets.map(
        ({ offset, width }, index) => `
          thead th:nth-child(${index + 1}) {
            position: sticky;
            left: ${offset}px;
            min-width: ${width}px;
            z-index: 2;
          }

          tbody td:nth-child(${index + 1}),
          tfoot td:nth-child(${index + 1}) {
            position: sticky;
            left: ${offset}px;
            z-index: 1;
          }
        `,
      )}
    ${({ stickyOffsets }) =>
      stickyOffsets.length > 0
        ? `
            thead th:nth-child(${stickyOffsets.length}),
            tbody td:nth-child(${stickyOffsets.length}),
            tfoot td:nth-child(${stickyOffsets.length}) {
              :after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                width: 6px;
                transform: translateX(100%);
                transition: box-shadow 0.3s;
                content: '';
                pointer-events: none;
              }
            }

            thead.isScrolled th:nth-child(${stickyOffsets.length}),
            tbody.isScrolled td:nth-child(${stickyOffsets.length}),
            tfoot.isScrolled td:nth-child(${stickyOffsets.length}) {
              :after {
                box-shadow: inset 6px 0 4px -6px rgba(0, 0, 0, 0.25);
              }
            }
          `
        : ``}

    ${({ separatorIndices }) =>
      Array.from(separatorIndices).map(
        (index) => `
          thead th:nth-child(${index + 1}),
          tbody td:nth-child(${index + 1}),
          tfoot td:nth-child(${index + 1}) {
            box-shadow: inset -1px 0 #29333f;
          }
        `,
      )}

    tbody {
      tr {
        border-bottom: 1px solid #29333f;

        > td {
          background-color: #101b29;
        }

        &:hover > td {
          background-color: #29333f;
        }
      }
    }
  }
`

type StickyInfo = { offset: number; width: number }

export default DataTable
