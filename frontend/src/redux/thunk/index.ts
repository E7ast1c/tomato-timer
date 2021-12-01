import { createAsyncThunk } from "@reduxjs/toolkit";
import login from "../../api/login";
import {LoginData, TimerSettingsState} from "../common";

export const loginThunk = createAsyncThunk<
  Omit<TimerSettingsState , "Loading">,
  LoginData
>("timerSettings", async ( userData ) => {
  const res = await login(userData);
  console.log("res.data", res)
  return res
});