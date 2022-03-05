import axios from "axios";
import { RegisterData, TimerSettingsResponse } from "../redux/common";

const headers = {
  "Content-Type": "application/json",
};

const register = async (
  userData: RegisterData
): Promise<TimerSettingsResponse> => {
  const { data } = await axios.post<TimerSettingsResponse>(`register`, JSON.stringify(userData),
    { headers: headers }
  );
  return data;
};

export default register;
