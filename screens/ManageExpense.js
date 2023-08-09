import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";

function ManageExpense({ route, navigation }) {
  //const editExpenseId = route.params.expenseId;
  const editExpenseId = route.params?.expenseId; //compruebo q sea un obj antes de intentar asignar
  const isEditing = !!editExpenseId; //convierte editExpenseId en boolean

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {}
  function cancelHandler() {}
  function confirmHandler() {}

  return (
    <View style={styles.container}>
      <View>
        <Button mode='flat' onPress={cancelHandler}>Cancel</Button>
        <Button onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})
