import { getAuthSettings, login, register, setUserSettings } from "../API/Api";
import { getToken, getUserName, setUserData } from "./LocalStorageManager";
import {
  getSettingsAction,
  getLoginAction,
  changeAuthFlagAction,
} from "../Store/Actions/TimeSettingsReduсer";

export const AuthLoginManager = (data) => {
  return async function (dispatch) {
    const currentUser = await login(data);
    dispatch(getLoginAction(currentUser.data.data));
    dispatch(changeAuthFlagAction(true));
    setUserData(currentUser.data.data);
    getUserName();
  };
};

export const AuthRegisterManager = (data) => {
  return async function (dispatch) {
    const currentUser = await register(data);
    dispatch(getLoginAction(currentUser.data.data));
    setUserData(currentUser.data.data);
  };
};

export const setUserSettingsManager = (data) => {
  return async function (dispatch) {
    const token = getToken();
    const response = await setUserSettings(data, token);
  };
};

export const getUserSettingsManager = () => {
  return async function (dispatch) {
    const token = getToken();
    const response = await getAuthSettings(token);
    dispatch(getSettingsAction(response.data.data.settings));
  };
};
