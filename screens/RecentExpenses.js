import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const expensesCtx = useContext(ExpensesContext);
  //uso context aunq use fetch para optimizar las búsquedas y para no recargar la navegación cada vez q cambio de página.

  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      try{
        const expenses = await fetchExpense();
        expensesCtx.setExpenses(expenses);
      }
      catch (error){
        setError('Could not fetch expenses');
      }
      
      setIsFetching(false);
      
    }
    getExpenses();
  },[]);

  function errorHandler(){
    setError(null);
  }

  if (isFetching){
    return <LoadingOverlay />;
  }

  if (error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

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
