import DataTable from "../../components/dataTable/DataTable";

import { TransactionData } from "../../types";
import { getDataColumns } from "../../utils/utils";

interface TransactionsTableProps {
  data: TransactionData[];
}

export const TransactionsTable = ({ data }: TransactionsTableProps) => {
  if (data.length == 0) return <div />;

  // Getting all possible columns based on fist item index
  const columns = getDataColumns(data[0]);

  // Passing data and columns to component for rendering table info
  return <DataTable<TransactionData> data={data} columns={columns} />;
};
