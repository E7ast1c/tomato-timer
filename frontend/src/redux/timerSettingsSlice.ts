import { createSlice } from '@reduxjs/toolkit'
import {EnumTimerAction, EnumTimerMode, TimerSettingsResponse, TimerSettingsState} from "./common";
import {loginThunk} from "./thunk";

export const initialState: TimerSettingsState = {
  data:{
    user: {
      Name: "",
      TimerSettings: {
        DefaultDuration: 30,
        LongBreakDuration: 20,
        ShortBreakDuration: 1,
        TickTrack: "",
      },
    },
  },
  Loading: false,
  AuthFlag: false,
  TimerMode: EnumTimerMode.POMODORO,
  TimerAction: EnumTimerAction.STOP,

};

export const timerSettings = createSlice({
  name: "timerSettings",
  initialState,
  reducers: {

    clearTimerSettingsState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
      state.Loading = false;
      state.AuthFlag = true;
      state.data = payload.data
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.Loading = false;
      state.data = initialState.data
    })

  }
})

export default timerSettings.reducer;
export const { clearTimerSettingsState } = timerSettings.actions;
