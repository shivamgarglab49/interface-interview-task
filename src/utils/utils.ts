import { DataColumn } from "../components/dataTable/DataTable";
import { TransactionData } from "../types";

export function getDataColumns(
  transaction: TransactionData
): DataColumn<TransactionData>[] {
  return Object.keys(transaction).map((header: string) => {
    return {
      headerText: header,
      renderCell: (data: TransactionData) => {
        return "" + data[header];
      },
    };
  });
}
