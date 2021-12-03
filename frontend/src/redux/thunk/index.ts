import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../api/login";
import {LoginData, TimerSettingsState} from "../common";
import {setUserData} from "../../components/LocalStorageManager";

export const loginThunk = createAsyncThunk<
  Omit<TimerSettingsState , "Loading">,
  LoginData
>("timerSettings", async ( userData ) => {
  const res = await login(userData);
  console.log("res.data", res.data)
  setUserData(res.data)
  return res.data
});