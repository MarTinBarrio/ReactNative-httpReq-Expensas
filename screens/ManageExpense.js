import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { setStatusBarBackgroundColor } from "expo-status-bar";

function ManageExpense({ route, navigation }) {
  const expsesCtx = useContext(ExpensesContext);

  const [isSubmiting, setIsSubmiting] = useState(false) ;
  const [error, setError] = useState(null);

  //const editExpenseId = route.params.expenseId;
  const editExpenseId = route.params?.expenseId; //compruebo q sea un obj antes de intentar asignar
  const isEditing = !!editExpenseId; //convierte editExpenseId en boolean

  const selectedExpense = expsesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try{
      await deleteExpense(editExpenseId);
      expsesCtx.deleteExpense(editExpenseId);
      //setIsSubmiting(false); no es necesario ya q estoy navegando al salir con navigation.goBack();
      navigation.goBack();
    }
    catch (error){
      setError('Clould not delete expense - please try again later');
      setIsSubmiting(false);
    }
    
  }
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmiting(true);

    try{
      if (isEditing) {
        await updateExpense (editExpenseId, expenseData)//actualizo en firebase
        expsesCtx.updateExpense(editExpenseId, expenseData);//actualizo local
      } else {
        const id = await storeExpense(expenseData); //guardo en firebase
        expsesCtx.addExpense({...expenseData, id: id}); //guardo en local
      }
      //setIsSubmiting(false); no es necesario xq paso sig m voy d la pag.
      navigation.goBack();
    }catch(error){
      setError('Could not save data - please try again later!');
      setIsSubmiting(false);
    }
    
    
  }

  function errorHandler(){
    setError(null);
  }

  if (isSubmiting){
    return <LoadingOverlay />
  }

  if(error && !isSubmiting){
    return <ErrorOverlay onConfirm={errorHandler} message={error}/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        editExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
