import axios from "axios";
import config from "../configuration.json";
import {LoginData, TimerSettingsResponse, TimerSettingsState} from "../redux/common";

const baseAdress = process.env.NODE_ENV === 'production' ? config.TOMATO_API_URL_PROD : config.TOMATO_API_URL_DEV;

const headers = {
  "Content-Type": "application/json",
};

const login = async (userData: LoginData): Promise<TimerSettingsResponse> => {
  console.log("api userData", userData)
  // let data = {} as TimerSettingsState;
  // try {
    const { data } = await axios.post<TimerSettingsResponse>(
      `${baseAdress}/login`,
    userData,
    { headers: headers }
    );
    // data = response.data
  // } catch (error: any) {
  //   console.warn(error);
  // }
  // console.log("LOGIN DATA", data);
  return data;
}
export default login;

// export async function login(userData) {
//   console.log("userData", userData);
//   const response = await axios.post(
//     `${baseAdress}/login`,
//     JSON.stringify(userData),
//     { headers: headers }
//   );
//   console.log("axios login response", response);
//   return response;
// }
