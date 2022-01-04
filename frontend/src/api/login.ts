import axios from "axios";
import config from "../configuration.json";
import {LoginData, TimerSettingsResponse, TimerSettingsState} from "../redux/common";

const baseAdress = process.env.NODE_ENV === 'production' ? config.api.TOMATO_API_URL_PROD : config.api.TOMATO_API_URL_DEV;

const headers = {
  "Content-Type": "application/json",
};

const login = async (userData: LoginData): Promise<TimerSettingsResponse> => {
    const { data } = await axios.post<TimerSettingsResponse>(
      `${baseAdress}/login`,
    userData,
    { headers: headers }
    );
  return data;
}
export default login;

