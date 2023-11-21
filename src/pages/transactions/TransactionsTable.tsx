import { TransactionData } from "../../types";
import { compareFn, getDataColumns } from "../../utils/utils";
import { useEffect, useMemo, useState } from "react";

import DataTable, { SortState } from "../../components/dataTable/DataTable";

interface TransactionsTableProps {
  data: TransactionData[];
}

export const TransactionsTable = ({ data }: TransactionsTableProps) => {
  if (data.length == 0) return <div />;

  // transactions state
  const [transactions, setTransactions] = useState(data);

  // filters list
  const [filters, setFilters] = useState<string[]>([]);

  // sort selection state
  const [sortState, setSortState] = useState<SortState>({
    sortColumn: "name",
    sortDirection: "ascending",
  });

  // handler to invoke on sort click
  const chooseSortHandler = (selectedColumn: string) => {
    setSortState({
      sortColumn: selectedColumn,
      sortDirection:
        sortState.sortDirection === "ascending" ? "descending" : "ascending",
    });
  };

  // handler to invoke on filter click
  const chooseFilterHandler = (selectedColumn: string) => {
    const items = new Set([...filters]);
    if (items.has(selectedColumn)) {
      items.delete(selectedColumn);
    } else {
      items.add(selectedColumn);
    }
    console.log("Items", items);
    setFilters([...items]);
  };

  // Getting all possible columns based on fist item index
  const columns = useMemo(() => getDataColumns(data[0]), [data]);

  // Effect to be run when sort-state changed
  useEffect(() => {
    setTransactions(
      Array.from(transactions).sort((first, second) => {
        return compareFn(
          sortState.sortColumn,
          sortState.sortDirection,
          first,
          second
        );
      })
    );
  }, [sortState]);

  // Passing data and columns to component for rendering table info
  return (
    <DataTable<TransactionData>
      data={transactions}
      columns={columns}
      filterState={filters}
      onChooseSort={chooseSortHandler}
      onChooseFilter={chooseFilterHandler}
      sortState={sortState}
      onRowClick={(data) => alert(data.name)}
    />
  );
};
