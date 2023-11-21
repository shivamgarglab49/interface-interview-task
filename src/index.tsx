import ReactDOM from "react-dom";
import React from "react";
import GlobalStyling from "./fundamentals/GlobalStyling";
import transactions from "../transactions.json";

import { TransactionsTable } from "./pages/transactions/TransactionsTable";

const App: React.FC = () => (
  <>
    <GlobalStyling />
    <h1>Interface Interview Task</h1>
    <TransactionsTable data={transactions} />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
