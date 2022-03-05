import axios from "axios";
import { GetAuthSettingsResponse } from "../redux/common";
import { getToken } from "../components/LocalStorageManager";

const getAuthSettings = async (): Promise<GetAuthSettingsResponse> => {
  const token = getToken();
  const { data } = await axios.get(`auth/get-user-settings`, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};

export default getAuthSettings;
