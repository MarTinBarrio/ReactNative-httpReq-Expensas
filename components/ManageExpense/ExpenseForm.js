import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";


function ExpenseForm({onCancel, onSubmit, submitButtonLabel, editExpense}) {

  /*---
  const [amountValue, setAmountValue] = useState('') //no importa q el input sea number ó text, simpre se inicializa con un string vacío

  function amountChangeHandler(enteredAmount) {
  //simpre lo provee reactnative el argumento del handler.
    setAmountValue(enteredAmount)
  }
   */

  const [inputValues, setInputValues] = useState ({
    amount: editExpense ? editExpense.amount.toString() : '',
    date: editExpense ? getFormattedDate(editExpense.date) : '',
    description: editExpense ? editExpense.description.toString() : ''
  });

  function inputChangeHandler (inputIdentifier, enteredValue) {
    setInputValues((curInputValues)=>{
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue
      };
    });
  }


  function submitHandler (){
    const expenseData = {
      amount: +inputValues.amount,
      // el + convierte el inputValues.amunt en un number
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    onSubmit(expenseData);
  }

  

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            //---value: amountValue

            onChangeText: inputChangeHandler.bind(this, 'amount'),
            //inputChangeHandler.bind -> permite configurar la llamada a la función (sin ejecutarla en ese momento)
            //(this, 'amount') 
            //el this va SIEMPRE (default, xq es ejecutada en este componente)
            // el 'amount' es xq lo usamos como key en la función para modificar ese valor del obj
            // el 3er parámetro no lo ponemos y es el q react native siempre lo manda por dafualt, q es el vlaor ingresado
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //https://reactnative.dev/docs/textinput
          //autoCapitalize: 'characters', // 'none' 'sentences' 'words'
          //autoCorrect: false //default is true
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
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
    marginTop: 80
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput:{
    flex: 1
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
})