import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";

import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, editExpense }) {
  /*---
  const [amountValue, setAmountValue] = useState('') //no importa q el input sea number ó text, simpre se inicializa con un string vacío

  function amountChangeHandler(enteredAmount) {
  //simpre lo provee reactnative el argumento del handler.
    setAmountValue(enteredAmount)
  }
   */
  /* 
  const [inputValues, setInputValues] = useState ({
    amount: editExpense ? editExpense.amount.toString() : '',
    date: editExpense ? getFormattedDate(editExpense.date) : '',
    description: editExpense ? editExpense.description.toString() : ''
  });
*/

  //usando un obj en la creación del useState
  const [inputs, setInputs] = useState({
    amount: {
      value: editExpense ? editExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: editExpense ? getFormattedDate(editExpense.date) : "",
      isValid: true, //!!editExpense = niego si no existe editExpress = !(!editExoress)
    },
    description: {
      value: editExpense ? editExpense.description.toString() : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //pongo q está validado, pero desp lo revalido
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      // el + convierte el inputs.amunt en un number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      new Date(expenseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid Input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            //---value: amountValue

            onChangeText: inputChangeHandler.bind(this, "amount"),
            //inputChangeHandler.bind -> permite configurar la llamada a la función (sin ejecutarla en ese momento)
            //(this, 'amount')
            //el this va SIEMPRE (default, xq es ejecutada en este componente)
            // el 'amount' es xq lo usamos como key en la función para modificar ese valor del obj
            // el 3er parámetro no lo ponemos y es el q react native siempre lo manda por dafualt, q es el vlaor ingresado
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //https://reactnative.dev/docs/textinput
          //autoCapitalize: 'characters', // 'none' 'sentences' 'words'
          //autoCorrect: false //default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: 'center'
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
