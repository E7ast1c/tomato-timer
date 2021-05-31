import axios from "axios";

const baseAdress = process.env.REACT_APP_API_URL;

export async function login(userData) {
  console.warn(baseAdress);
  const response = await axios.post(
    `${baseAdress}/login`,
    JSON.stringify(userData)
  );
  console.log(response);
  return response;
}
