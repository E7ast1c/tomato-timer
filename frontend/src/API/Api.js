import axios from "axios";
import config from "../configuration.json";

const baseAdress = config.TOMATO_API_URL;

const headers = {
  "Content-Type": "application/json",
}

export async function login(userData) {
  console.log('userData', userData)
  const response = await axios.post(
    `${baseAdress}/login`,
    JSON.stringify(userData),
    { headers:  headers}
  );
  console.log("axios login response", response);
  return response;
}

export async function register(userData) {
  const response = await axios.post(
    `${baseAdress}/register`,
    JSON.stringify(userData),
    {headers: headers}
  );
  console.log("axios register response", response);
  return response;
}

export async function setUserSettings(userSettings, token){
  console.log('userSettings', userSettings)
  console.log('token', token)
  const response = await axios.post(
    `${baseAdress}/auth/set-user-settings`,
    JSON.stringify(userSettings),
    {
      headers: {
        "Content-Type": "application/json",
        'x-access-token': token,
      }
    })
  console.log("setUserSettings response", response)
  return response;
}

export async function getAuthSettings(token){
  try{
    const response = await axios.get('http://localhost:8081/auth/get-user-settings', {
      headers: {
        'x-access-token': token,
      },
    })
    console.log('api response', response)
    return response
  }catch (error){
    console.log(error)
  }
}

