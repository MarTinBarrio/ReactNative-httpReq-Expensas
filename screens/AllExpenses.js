import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expesesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expesesCtx.expenses}
      expensesPeriod="Total"
      fallBackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
