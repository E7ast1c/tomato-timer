import { createSlice } from "@reduxjs/toolkit";
import { EnumTimerAction, EnumTimerMode, TimerSettingsState } from "./common";
import {getAuthSettingsThunk, loginThunk, registerThunk} from "./thunk";
import config from "../configuration.json";

export const initialState: TimerSettingsState = {
	user: {
		Name: "",
		TimerSettings: {
			DefaultDuration: config.defaultDuration.DefaultDuration,
			LongBreakDuration: config.defaultDuration.LongBreakDuration,
			ShortBreakDuration: config.defaultDuration.ShortBreakDuration,
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
		changeTimerMode: (state: TimerSettingsState, {payload}) => {
			state.TimerMode = payload;
		},
		changeTimerAction: (state: TimerSettingsState, {payload}) => {
			state.TimerAction = payload;
		},
		updateTimerSettings: (state: TimerSettingsState, {payload}) => {
			state.user.TimerSettings = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginThunk.pending || registerThunk.pending, (state) => {
			state.Loading = true;
		});
		builder.addCase(loginThunk.fulfilled || registerThunk.pending, (state, { payload }) => {
			state.Loading = false;
			state.AuthFlag = true;
			state.user = payload.user
		});
		builder.addCase(loginThunk.rejected || registerThunk.pending, (state) => {
			state.Loading = false;
			state.user = initialState.user
		});
		// builder.addCase(registerThunk.pending, (state) => {
		// 	state.Loading = true;
		// });
		// builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
		// 	state.Loading = false;
		// 	state.AuthFlag = true;
		// 	state.user = payload.user
		// });
		// builder.addCase(registerThunk.rejected, (state) => {
		// 	state.Loading = false;
		// 	state.user = initialState.user
		// });
		builder.addCase(getAuthSettingsThunk.pending, (state) => {
			state.Loading = true;
		});
		builder.addCase(getAuthSettingsThunk.fulfilled, (state, { payload }) => {
			state.Loading = false;
			state.AuthFlag = true;
			state.user.TimerSettings = payload.TimerSettings
		});
		builder.addCase(getAuthSettingsThunk.rejected, (state) => {
			state.Loading = false;
			state.user = initialState.user
		})
	},
})

export default timerSettings.reducer;
export const { clearTimerSettingsState, changeTimerMode, changeTimerAction, updateTimerSettings } = timerSettings.actions;
