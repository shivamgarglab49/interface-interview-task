import React from "react";
import transactions from "../../../transactions.json";

import { render, screen } from "@testing-library/react";
import { TransactionsTable } from "./TransactionsTable";

describe("TransactionsTable", () => {
  test("component columns shouldn't be visible when no data available", () => {
    render(<TransactionsTable data={[]} />);
    expect(screen.queryByText("PPP")).toBeNull();
  });

  test("component should be visible when data is available", () => {
    render(<TransactionsTable data={transactions} />);
    expect(screen.queryByText("PPP")).not.toBeNull();
  });

  test(`component columns "Id" should be hidden when data is available`, async () => {
    render(<TransactionsTable data={transactions} />);
    expect(screen.queryByText("Id")).toBeNull();
    expect(screen.queryByText("PPP")).not.toBeNull();
  });
});
