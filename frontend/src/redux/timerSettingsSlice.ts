import { createSlice } from "@reduxjs/toolkit";
import { EnumTimerAction, EnumTimerMode, TimerSettingsState } from "./common";
import { loginThunk } from "./thunk";

export const initialState: TimerSettingsState = {
  user: {
    Name: "",
    TimerSettings: {
      DefaultDuration: 30,
      LongBreakDuration: 20,
      ShortBreakDuration: 1,
      TickTrack: "",
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
      state.Loading = false;
      state.AuthFlag = true;
      state.user = payload.user
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.Loading = false;
      state.user = initialState.user
    })

  }
})

export default timerSettings.reducer;
export const { clearTimerSettingsState } = timerSettings.actions;
