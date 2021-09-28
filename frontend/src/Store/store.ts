import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { startStopTimerReducer } from "./Actions/StartStopTimerReducer";
import { timeSettingsReduсer } from "./Actions/TimeSettingsReduсer";
import { vueCurrentTimerReducer } from "./Actions/VueCurrentTimer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  startStopTimer: startStopTimerReducer,
  timeSettings: timeSettingsReduсer,
  vueCurrentTimer: vueCurrentTimerReducer,
});

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));