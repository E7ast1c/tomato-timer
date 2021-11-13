import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { timerSettingsReduсer } from "./reducers/timerSettingsReduсer";
import thunk from "redux-thunk";
import { openModal } from "./actions/modalActions";

const rootReducer = combineReducers({
	timerSettings: timerSettingsReduсer,
	// еще будет редюсер модалки
	openModal: openModal,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
