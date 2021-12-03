import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { timerSettingsReduсer } from "./reducers/timerSettingsReduсer";
import thunk from "redux-thunk";
// import { openModal } from "./actions/modalActions";
import { configureStore } from "@reduxjs/toolkit";
import {timerSettings} from "./timerSettingsSlice";
import {openModal} from "./openModalSlice"

// const rootReducer = combineReducers({
// 	timerSettings: timerSettingsReduсer,
// 	// еще будет редюсер модалки
// 	openModal: openModal,
// });
//
// export type RootState = ReturnType<typeof rootReducer>;
//
// export const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
	reducer: {
		timerSettings: timerSettings.reducer,
		openModal: openModal.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware();
	}
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
