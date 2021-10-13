import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { startStopTimerReducer } from "./Actions/StartStopTimerReducer";
import { timeSettingsReduсer } from "./Actions/TimeSettingsReduсer";
import { vueCurrentTimerReducer } from "./Actions/VueCurrentTimer";
import thunk from "redux-thunk";
import { openModal } from "./Actions/OpenModal";

const rootReducer = combineReducers({
  startStopTimer: startStopTimerReducer,
  timeSettings: timeSettingsReduсer,
  vueCurrentTimer: vueCurrentTimerReducer,
  openModal: openModal,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);