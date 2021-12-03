import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { timerSettingsReduсer } from "./reducers/timerSettingsReduсer";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";
import { timerSettings } from "./timerSettingsSlice";
import { openModal } from "./openModalSlice"
import { ringtone } from "./ringtoneSlice";

const store = configureStore({
	reducer: {
		timerSettings: timerSettings.reducer,
		openModal: openModal.reducer,
		ringtone: ringtone.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware();
	}
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
