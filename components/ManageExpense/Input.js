import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input ({ label, style, textInputConfig}) {
//------function Input({ label, type, maxLength }){

  let inputStyles = [styles.input];

  if(textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiLine)
  }


  return <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{label}</Text>
    {/* https://reactnative.dev/docs/textinput */}
    {/*------ <TextInput keyboardType={type} maxLength={maxLength}/> */}
    <TextInput style={inputStyles} {...textInputConfig}/>
  </View>
}
export default Input;

const styles = StyleSheet.create({
  inputContainer:{
   marginHorizontal: 4,
   marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine:{
    minHeight: 100,
    textAlignVertical: 'top'
  }
})