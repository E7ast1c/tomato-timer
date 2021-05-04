import { combineReducers } from "redux";
import { CHANGE_TIMER_ACTION } from "./Actions/actions";

const initialState = {
  value: "",
};

export function TimerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIMER_ACTION:
      return { ...state, value: action.value };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  timer: TimerReducer,
});
