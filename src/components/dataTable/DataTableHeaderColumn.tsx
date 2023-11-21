import React, { MouseEvent, useCallback } from 'react'
import { DataColumn } from './DataTable'
import styled, { css } from 'styled-components'
import cx from '../../fundamentals/classNames'
import { SortControl } from './SortControl'
import { FilterControl } from './FilterControl'

const DataTableHeaderColumn: React.FC<{
  column: DataColumn<never>
  onChooseSort: (sortField: string) => void
  sortDirection: 'ascending' | 'descending' | undefined
  onChooseFilter: (filterField: string, e: MouseEvent) => void
  filterActive: boolean
  onMouseOver?: () => void
}> = ({
  column: { sortField, filterField, headerAlign = 'left', headerText, fixedWidth },
  onChooseSort,
  sortDirection,
  onChooseFilter,
  filterActive,
  onMouseOver,
}) => {
  const onClickSort = useCallback(() => {
    if (sortField) {
      onChooseSort(sortField)
    }
  }, [sortField, onChooseSort])

  const onClickFilter = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (filterField) {
        onChooseFilter(filterField, e)
        e.stopPropagation()
      }
    },
    [filterField, onChooseFilter],
  )

  return (
    <SortableTh
      fixedWidth={fixedWidth}
      onClick={onClickSort}
      headerAlign={headerAlign}
      onMouseOver={onMouseOver}
      className={cx({ 'hover-highlight': sortField || filterField })}
    >
      <div>
        <span>{headerText}</span>
        {sortField || filterField ? (
          <div className="controls">
            <SortControl sortField={sortField} sortDirection={sortDirection} />
            <FilterControl filterField={filterField} filterActive={filterActive} onClickFilter={onClickFilter} />
          </div>
        ) : null}
      </div>
    </SortableTh>
  )
}

const SortableTh = styled.th<{ fixedWidth?: string; headerAlign: 'left' | 'right' }>`
  ${({ fixedWidth }) =>
    fixedWidth &&
    css`
      width: ${fixedWidth};
    `}

  white-space: nowrap;
  box-sizing: border-box;

  > div {
    display: flex;
    align-items: center;

    > span {
      ${({ headerAlign }) => (headerAlign === 'right' ? `text-align: right;` : ``)}
      font-size: 14px;
      line-height: 16px;
      flex-grow: 1;
    }

    .controls {
      margin-left: 12px;
      margin-right: -12px;
      display: flex;
    }

    .control {
      width: 36px;
      height: 36px;
      display: none;

      svg path {
        fill: #989ca2;
      }

      &.active {
        display: block;

        svg path {
          fill: #dfe0e2;
        }
      }

      &:hover {
        background-color: #4a525c;
      }

      &.sortIcon {
        svg {
          transform: translate(12px, 10px);
        }

        &.inactive .large-arrow,
        &.active .small-arrows {
          display: none;
        }

        &.ascending .large-arrow {
          transform: translate(12px, 10px) rotate(180deg);
        }
      }

      &.filterIcon {
        svg {
          transform: translate(12px, 10px);
        }
      }
    }

    .filterIcon {
      display: block;
    }
  }

  &.hover-highlight {
    cursor: pointer;

    &:hover {
      background-color: #29333f;
    }
  }
`

export default DataTableHeaderColumn
