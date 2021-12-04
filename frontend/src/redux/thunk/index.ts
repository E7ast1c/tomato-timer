import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../api/login";
import getAuthSettings from "../../api/getAuthSettings";
import {GetAuthSettingsState, LoginData, TimerSettingsResponse, TimerSettingsState, UserSettingsType} from "../common";
import { getToken, setUserData } from "../../components/LocalStorageManager";
export const loginThunk = createAsyncThunk<
  Omit<TimerSettingsState , "Loading">,
  LoginData
>("timerSettings", async ( userData ) => {
  const res = await login(userData);
  setUserData(res.data)
  return res.data
});

export const getAuthSettingsThunk = createAsyncThunk
("getAuthSettings", async () => {
  const token = getToken();
  const res = await getAuthSettings()
    console.log("getAuthSettings", res.data.settings)
    return { TimerSettings: res.data.settings };
})