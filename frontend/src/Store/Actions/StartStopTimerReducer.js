const timerState = {
  status: false,
};

const CHANGE_STATUS = "CHANGE_STATUS";

export const startStopTimerReducer = (state = timerState, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return { ...state, status: (state.status = action.payload) };
    default:
      return state;
  }
};

export const startStopTimerAction = (payload) => ({
  type: CHANGE_STATUS,
  payload,
});