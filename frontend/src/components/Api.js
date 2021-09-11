import axios from "axios";
import config from "../configuration.json";

const baseAdress = config.TOMATO_API_URL;
console.log(baseAdress);

const headers = {
  "Content-Type": "application/json",

}

export async function login(userData) {
  console.warn(baseAdress);
  console.log(userData);
  const response = await axios.post(
    `${baseAdress}/login`,
    JSON.stringify(userData),
    { headers:  headers}
  );
  console.log(response);
  return response;
}

export async function register() {
  const response = await axios.post(
    `${baseAdress}/register`,
    JSON.stringify()
  )
}
