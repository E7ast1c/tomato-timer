import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { startStopTimerReducer } from "./Actions/StartStopTimerReducer";
import { timeSettingsReduser } from "./Actions/TimeSettingsReduser";

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  startStopTimer: startStopTimerReducer,
  timeSettings: timeSettingsReduser,
});

export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));