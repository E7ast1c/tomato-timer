import axios from "axios";
import config from "../configuration.json";
import { UserSettingsType } from "../redux/common";
import { getToken } from "../components/LocalStorageManager";

const baseAdress =
  process.env.NODE_ENV === "production"
    ? config.api.TOMATO_API_URL_PROD
    : config.api.TOMATO_API_URL_DEV;

const setUserSettings = async (userSettings: UserSettingsType) => {
  const token = getToken();
  const response = await axios.post(
    `${baseAdress}/auth/set-user-settings`,
    JSON.stringify(userSettings),
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }
  );
};

export default setUserSettings;