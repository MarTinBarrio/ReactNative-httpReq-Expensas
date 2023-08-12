import { useContext, useEffect } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

function RecentExpenses() {

  const expensesCtx = useContext(ExpensesContext);
  //uso context aunq use fetch para optimizar las búsquedas y para no recargar la navegación cada vez q cambio de página.

  useEffect(()=>{
    async function getExpenses(){
      const expenses = await fetchExpense();
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  },[]);

  

  //const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7daysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenese registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
