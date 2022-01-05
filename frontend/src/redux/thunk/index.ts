import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../api/login";
import getAuthSettings from "../../api/getAuthSettings";
import {
  LoginData,
  RegisterData,
  TimerSettingsState,
  UserSettingsType,
} from "../common";
import { getToken, setUserData } from "../../components/LocalStorageManager";
import { setUserSettings } from "../../api/setSettings";
import register from "../../api/register";

export const loginThunk = createAsyncThunk<
  Omit<TimerSettingsState, "Loading">,
  LoginData
>("timerSettings", async (userData) => {
  const res = await login(userData);
  setUserData(res.data);
  return res.data;
});

export const registerThunk = createAsyncThunk<
  Omit<TimerSettingsState, "Loading">,
  RegisterData
>("timerSettings", async (userData) => {
  const res = await register(userData);
  setUserData(res.data);
  return res.data;
});

export const getAuthSettingsThunk = createAsyncThunk(
  "getAuthSettings",
  async () => {
    const token = getToken();
    const res = await getAuthSettings();
    return { TimerSettings: res.data.settings };
  }
);

export const setSettingsThunk = createAsyncThunk(
  "set",
  async (timerSettings: UserSettingsType) => {
    const res = await setUserSettings(timerSettings);
  }
);