import { DataColumn } from "../components/dataTable/DataTable";
import { TransactionData } from "../types";

function capitalizeFirstLetter(input: string): string {
  return input.slice(0, 1).toUpperCase() + input.slice(1);
}

export function getDataColumns(
  transaction: TransactionData,
  capitalizationEnabled: boolean = true,
  nonCapitalizationList: string[] = ["sizeValueUSD"],
  hiddenColumnNameList: string[] = ["id"]
): DataColumn<TransactionData>[] {
  return Object.keys(transaction)
    .filter((header: string) => !hiddenColumnNameList.includes(header))
    .map((header: string) => {
      return {
        headerText:
          !capitalizationEnabled || nonCapitalizationList.includes(header)
            ? header
            : capitalizeFirstLetter(header),
        renderCell: (data: TransactionData) => {
          const headerType = typeof data[header];
          if (headerType === "boolean") {
            return data[header] === true ? "Yes" : "No";
          } else if (headerType === "number") {
            return data[header] === 0 ? "--" : data[header];
          } else {
            return data[header];
          }
        },
      };
    });
}
