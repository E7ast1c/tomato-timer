const vueTimerState = {
  pomodoro: true,
  shortBreak: false,
  longBreak: false,
};

const CHANGE_TO_POMODORO = "CHANGE_TO_POMODORO";
const CHANGE_TO_SHORT_BREAK = "CHANGE_TO_SHORT_BREAK";
const CHANGE_TO_LONG_BREAK = "CHANGE_TO_LONG_BREAK";

export const vueCurrentTimerReducer = (state = vueTimerState, action) => {
  switch (action.type) {
    case CHANGE_TO_POMODORO:
      return {
        ...state,
        pomodoro: (state.pomodoro = action.payload),
        shortBreak: (state.shortBreak = false),
        longBreak: (state.longBreak = false),
      };
    case CHANGE_TO_SHORT_BREAK:
      return {
        ...state,
        pomodoro: (state.pomodoro = false),
        shortBreak: (state.shortBreak = action.payload),
        longBreak: (state.longBreak = false),
      };
    case CHANGE_TO_LONG_BREAK:
      return {
        ...state,
        pomodoro: (state.pomodoro = false),
        shortBreak: (state.shortBreak = false),
        longBreak: (state.longBreak = action.payload),
      };
    default:
      return state;
  }
};

export const vuePomodoroTimerAction = (payload) => ({
  type: CHANGE_TO_POMODORO,
  payload,
});
export const vueShortBreakTimerAction = (payload) => ({
  type: CHANGE_TO_SHORT_BREAK,
  payload,
});
export const vueLongBreakTimerAction = (payload) => ({
  type: CHANGE_TO_LONG_BREAK,
  payload,
});