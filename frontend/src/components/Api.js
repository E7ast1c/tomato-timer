import axios from "axios";

const baseAdress = process.env.REACT_APP_API_URL;
console.log(baseAdress);
// const currentURL = 'http://localhost:8081'
const headers = {
  "Content-Type": "application/json"
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
