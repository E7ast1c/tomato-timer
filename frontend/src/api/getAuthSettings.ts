import axios from "axios";
import config from "../configuration.json";
import { GetAuthSettingsResponse } from "../redux/common";
import { getToken } from "../components/LocalStorageManager";

const baseAdress =
  process.env.NODE_ENV === "production"
    ? config.api.TOMATO_API_URL_PROD
    : config.api.TOMATO_API_URL_DEV;

const getAuthSettings = async (): Promise<GetAuthSettingsResponse> => {
  const token = getToken();
  const { data } = await axios.get(`${baseAdress}/auth/get-user-settings`, {
    headers: {
      "x-access-token": token,
    },
  });
  return data;
};

export default getAuthSettings;
