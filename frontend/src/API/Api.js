import axios from "axios";
import config from "../configuration.json";

const baseAdress = config.TOMATO_API_URL;

const headers = {
  "Content-Type": "application/json",
}

export async function login(userData) {
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
  const response = await axios.post(
    `${baseAdress}/auth/set-user-settings`,
    JSON.stringify(userSettings),
    {
      headers: {
        "Access-Control-Allow-Headers": "x-access-token",
        "Access-Control-Allow-Origin": "*",
        // "Authorization": `Bearer ${token}`,
        "x-access-token": token
        // "x-access-token": token
      }
    })
  console.log("setUserSettings response", response)
  return response;
}

export async function getAuthSettings(token){
  console.log("token", token)
  try{
    const response = await axios.get('http://localhost:8081/auth/get-user-settings', {
      mode: 'no-cors',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          Accept: 'application/json',
          "x-access-token": token,
        },
      withCredentials: true,
      credentials: 'same-origin',
      crossdomain: true,
    })
    return console.log('response', response)
  }catch (error){
    console.log(error)
  }

}



