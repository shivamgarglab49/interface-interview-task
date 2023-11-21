import React, { MouseEvent } from 'react'
import cx from '../../fundamentals/classNames'

export const FilterControl: React.FC<{
  filterActive: boolean
  onClickFilter: (e: MouseEvent<HTMLDivElement>) => void
  filterField?: string
}> = ({ filterField, filterActive, onClickFilter }) => {
  if (!filterField) {
    return null
  }

  return (
    <div
      data-testid="filter-icon"
      className={cx({
        control: true,
        filterIcon: true,
        active: filterActive,
        inactive: !filterActive,
      })}
      onClick={onClickFilter}
    >
      <Funnel className="funnel" />
    </div>
  )
}
const Funnel: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
    <title>Filter</title>
    <path
      d="M2.83324 1.99992H11.1666L6.99157 7.24992L2.83324 1.99992ZM0.541571 1.67492C2.2249 3.83325 5.33324 7.83325 5.33324 7.83325V12.8333C5.33324 13.2916 5.70824 13.6666 6.16657 13.6666H7.83324C8.29157 13.6666 8.66657 13.2916 8.66657 12.8333V7.83325C8.66657 7.83325 11.7666 3.83325 13.4499 1.67492C13.8749 1.12492 13.4832 0.333252 12.7916 0.333252H1.1999C0.508238 0.333252 0.116571 1.12492 0.541571 1.67492Z"
      fill="#989CA2"
    />
  </svg>
)
