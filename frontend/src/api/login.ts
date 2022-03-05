import axios from "axios";
import { LoginData, TimerSettingsResponse } from "../redux/common";

const headers = {
  "Content-Type": "application/json",
};

const login = async (userData: LoginData): Promise<TimerSettingsResponse> => {
  const { data } = await axios.post<TimerSettingsResponse>(`login`, userData,
    { headers: headers }
  );
  return data;
};
export default login;

