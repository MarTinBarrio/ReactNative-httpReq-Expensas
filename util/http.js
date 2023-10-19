import axios from 'axios';

//cree un projecto en firebase en modo desarrollo (sin seguridad)
//lo q m permite una base de datos en la nube en la cual puedo 
//almacenar y consultar datos.

//backend - https://firebase.google.com/
//proyecto - https://console.firebase.google.com/project/


const BACKEND_URL = ''
//BACKEND_URL m lo dá la misma página de fireBase a la cual le agrego lo q
//quiero agrear / modificar con .json...

export async function storeExpense(expenseData){
  const response = await axios.post(
    BACKEND_URL + '/expenses.json', 
    expenseData
  );
  const id = response.data.name;
  // response.data.name -> es la forma de firebase de devolver el id del elemento q creó
  return id;
}

export async function fetchExpense(){
  const response = await axios.get(BACKEND_URL + '/expenses.json')

  const expenses = [];

  //console.log(response.data)
  for (const key in response.data){
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date) ,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData){
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id){
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
