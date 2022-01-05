import axios from "axios";
import config from "../configuration.json";

const baseAdress = process.env.NODE_ENV === 'production' ? config.TOMATO_API_URL_PROD : config.TOMATO_API_URL_DEV;

const headers = {
  "Content-Type": "application/json",
};



export async function register(userData) {
  const response = await axios.post(
    `${baseAdress}/register`,
    JSON.stringify(userData),
    { headers: headers }
  );
  return response;
}


