import axios from "axios";

const baseAdress = process.env.REACT_APP_API_URL;
console.log(baseAdress);
const currentURL = 'http://localhost:8081'

export async function login(userData) {
  console.warn(currentURL);
  const response = await axios.post(
    `${currentURL}/login`,
    JSON.stringify(userData)
  );
  console.log(response);
  return response;
}

export async function register() {
  const response = await axios.post(
    `${currentURL}/register`,
    JSON.stringify()
  )
}
