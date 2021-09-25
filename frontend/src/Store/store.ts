import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { startStopTimerReducer } from "./Actions/StartStopTimerReducer";
import { timeSettingsReduser } from "./Actions/TimeSettingsReduser";
import { vueCurrentTimerReduser } from "./Actions/VueCurrentTimer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  startStopTimer: startStopTimerReducer,
  timeSettings: timeSettingsReduser,
  vueCurrentTimer: vueCurrentTimerReduser,
});

export type RootState = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));