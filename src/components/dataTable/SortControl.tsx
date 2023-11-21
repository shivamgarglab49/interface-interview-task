import * as React from 'react'
import cx from '../../fundamentals/classNames'

export const SortControl: React.FC<{
  sortField?: string
  sortDirection?: 'ascending' | 'descending'
}> = ({ sortField, sortDirection }) => {
  if (!sortField) {
    return null
  }

  return (
    <div
      data-testid="sort-icon"
      className={cx({
        control: true,
        sortIcon: true,
        active: sortDirection,
        inactive: !sortDirection,
        [sortDirection || '']: sortDirection,
      })}
    >
      <LargeSortArrow className="large-arrow" />
      <SortArrows className="small-arrows" />
    </div>
  )
}
const SortArrows: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="12" height="15" viewBox="0 0 12 15" fill="none">
    <title>Sort</title>
    <path
      d="M9.16667 11.675V5.83333H7.5V11.675H5L8.33333 15L11.6667 11.675H9.16667ZM3.33333 0L0 3.325H2.5V9.16667H4.16667V3.325H6.66667L3.33333 0ZM9.16667 11.675V5.83333H7.5V11.675H5L8.33333 15L11.6667 11.675H9.16667ZM3.33333 0L0 3.325H2.5V9.16667H4.16667V3.325H6.66667L3.33333 0Z"
      fill="#989CA2"
    />
  </svg>
)
const LargeSortArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="10" height="15" viewBox="0 0 10 15" fill="none">
    <path
      d="M10 9.75L8.99286 8.6925L5.71429 12.1275L5.71429 0L4.28571 0L4.28571 12.1275L1.00714 8.685L0 9.75L5 15L10 9.75Z"
      fill="#DFE0E2"
    />
  </svg>
)
