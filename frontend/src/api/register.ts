import axios from "axios";
import config from "../configuration.json";
import { RegisterData, TimerSettingsResponse } from "../redux/common";

const baseAdress =
  process.env.NODE_ENV === "production"
    ? config.api.TOMATO_API_URL_PROD
    : config.api.TOMATO_API_URL_DEV;

const headers = {
  "Content-Type": "application/json",
};

const register = async (
  userData: RegisterData
): Promise<TimerSettingsResponse> => {
  const { data } = await axios.post<TimerSettingsResponse>(
    `${baseAdress}/register`,
    JSON.stringify(userData),
    { headers: headers }
  );
  return data;
};
export default register;
