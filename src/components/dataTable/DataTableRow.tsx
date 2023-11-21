import { DataColumn } from './DataTable'
import React, { ReactElement, ReactNode, useCallback } from 'react'
import styled from 'styled-components'

export function createDefaultRenderRowFunction<T>(
  columns: DataColumn<T>[],
  onRowClick?: (data: T) => void,
): (data: T, index: number) => ReactNode {
  return (rowData, rowIndex) => (
    <TableRow key={rowIndex} rowData={rowData} onRowClick={onRowClick} rowIndex={rowIndex} columns={columns} />
  )
}

const TableRow: <T>(props: {
  rowData: T
  onRowClick?: (rowData: T) => void
  rowIndex: number
  columns: DataColumn<T>[]
}) => ReactElement = ({ rowData, onRowClick, rowIndex, columns }) => {
  const onRowClickWrapper = useCallback(() => {
    if (onRowClick) {
      onRowClick(rowData)
    }
  }, [rowData, onRowClick])

  return (
    <Row className="t-data-row" isClickable={!!onRowClick} onClick={onRowClickWrapper}>
      {columns.map((column, colIndex) => (
        <Cell key={`row-${rowIndex}-col-${colIndex}`}>{column.renderCell(rowData)}</Cell>
      ))}
    </Row>
  )
}

const Cell = styled.td`
  box-sizing: border-box;
`

const Row = styled.tr<{ isClickable: boolean }>`
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'inherit')};
`

export function createDefaultRenderFooterFunction<T>(columns: DataColumn<T>[]): (data: T[]) => ReactElement {
  return (data) => (
    <tr>
      {columns.map((column, index) => (
        <td key={index}>{column.renderFooter ? column.renderFooter(data) : null}</td>
      ))}
    </tr>
  )
}
