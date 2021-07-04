import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { startStopTimerReducer } from "./Actions/StartStopTimerReducer";
import { currentTimeResucer } from './Actions/CurrentTimeReduser'
import { timeSettingsReduser } from "./Actions/TimeSettingsReduser";

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  startStopTimer: startStopTimerReducer,
  currentTime: currentTimeResucer,
  timeSettings: timeSettingsReduser,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))