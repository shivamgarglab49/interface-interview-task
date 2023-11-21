import { fireEvent, render, screen } from '@testing-library/react'
import DataTable, { DataColumn } from './DataTable'

describe('DataTable', () => {
  it('should render the data table', () => {
    const columns: DataColumn<Data>[] = [COL_1, COL_2]

    render(<DataTable data={data} columns={columns} />)

    expect(screen.getByText('Col1')).toBeInTheDocument()
    expect(screen.getByText('Col2')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Test2')).toBeInTheDocument()
  })

  it('does not have hover state if the column isnt sortable/filterable', () => {
    const columns: DataColumn<Data>[] = [COL_1, COL_2]

    const { container } = render(<DataTable data={data} columns={columns} />)

    expect(container.getElementsByClassName('hover-highlight')).toHaveLength(0)
  })

  describe('sort control', () => {
    it('does not show for unsortable column', () => {
      const columns: DataColumn<Data>[] = [COL_1]

      render(<DataTable data={data} columns={columns} />)

      expect(screen.queryByTitle('Sort')).not.toBeInTheDocument()
    })

    it('does not show sort icon on hover', () => {
      const columns: DataColumn<Data>[] = [{ ...COL_1, sortField: 'col1.sort' }]

      render(<DataTable data={data} columns={columns} />)

      fireEvent.mouseEnter(screen.getByText('Col1'))
      expect(screen.queryByTestId('sort-icon')).not.toBeVisible()
    })

    it('calls onChooseSort when sort control clicked', () => {
      const columns: DataColumn<Data>[] = [
        {
          ...COL_1,
          sortField: 'col1.sort',
        },
      ]

      const onChooseSort = jest.fn()

      render(<DataTable data={data} columns={columns} onChooseSort={onChooseSort} />)

      fireEvent.click(screen.getByTitle('Sort'))

      expect(onChooseSort).toHaveBeenCalledTimes(1)
      expect(onChooseSort).toHaveBeenCalledWith('col1.sort')
    })

    it('does have hover state if the column is sortable', () => {
      const columns: DataColumn<Data>[] = [{ ...COL_1, sortField: 'col1.sort' }, COL_2]

      const { container } = render(<DataTable data={data} columns={columns} />)

      expect(container.getElementsByClassName('hover-highlight')).toHaveLength(1)
    })
  })

  describe('filter control', () => {
    it('does not show for unfilterable column', () => {
      const columns: DataColumn<Data>[] = [COL_1]

      render(<DataTable data={data} columns={columns} />)

      expect(screen.queryByTitle('Filter')).not.toBeInTheDocument()
    })

    it('always show filter icon on filterable columns', () => {
      const columns: DataColumn<Data>[] = [{ ...COL_1, filterField: 'col1.filter' }]

      render(<DataTable data={data} columns={columns} />)

      expect(screen.queryByTestId('filter-icon')).toBeVisible()
    })

    it('calls onChooseFilter when filter control clicked', () => {
      const columns: DataColumn<Data>[] = [
        {
          ...COL_1,
          filterField: 'col1.filter',
        },
      ]

      const onChooseFilter = jest.fn()

      render(<DataTable data={data} columns={columns} onChooseFilter={onChooseFilter} />)

      fireEvent.click(screen.getByTitle('Filter'))

      expect(onChooseFilter).toHaveBeenCalledTimes(1)
      expect(onChooseFilter).toHaveBeenCalledWith('col1.filter', expect.anything())
    })

    it('calls onScroll when the table is scrolled', () => {
      const columns: DataColumn<Data>[] = [COL_1, COL_2]
      const onScroll = jest.fn()

      render(<DataTable data={data} columns={columns} onScroll={onScroll} />)

      expect(onScroll).toHaveBeenCalledTimes(0)

      fireEvent.scroll(screen.getByTestId('data-table'))

      expect(onScroll).toHaveBeenCalledTimes(1)
    })

    it('does have hover state if the column is filterable', () => {
      const columns: DataColumn<Data>[] = [{ ...COL_1, filterField: 'col1.sort' }, COL_2]

      const { container } = render(<DataTable data={data} columns={columns} />)

      expect(container.getElementsByClassName('hover-highlight')).toHaveLength(1)
    })
  })
})

interface Data {
  col1: string
  col2: string
}

const COL_1: DataColumn<Data> = {
  headerText: 'Col1',
  renderCell(rowData: Data) {
    return rowData.col1
  },
}

const COL_2: DataColumn<Data> = {
  headerText: 'Col2',
  renderCell(rowData: Data) {
    return rowData.col2
  },
}

const data: Data[] = [
  {
    col1: 'Test',
    col2: 'Test2',
  },
]
