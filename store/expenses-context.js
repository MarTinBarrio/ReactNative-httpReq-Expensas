import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});


function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      //const id = new Date().toString() + Math.random().toString();
      //return [{ ...action.data, id: id }, ...state];
      return [ ...action.data, ...state];

    case "SET":
      const inverted = action.data.reverse();
      return inverted;

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.data.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.data.newData };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.data);
    default:
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispach] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispach({ type: "ADD", data: expenseData });
  }

  function setExpenses (expenses) {
    dispach({ type: "SET", data: expenses})
  }

  function deleteExpense(id) {
    dispach({ type: "DELETE", data: id });
  }

  function updateExpense(id, expenseData) {
    dispach({ type: "UPDATE", data: { id: id, newData: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
