import axios from "axios";
import { UserSettingsType } from "../redux/common";
import { getToken } from "../components/LocalStorageManager";

const setUserSettings = async (userSettings: UserSettingsType) => {
  const token = getToken();
  const response = await axios.post(`auth/set-user-settings`, JSON.stringify(userSettings),
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }
  );
};

export default setUserSettings;