const timeSettings = {
  authFlag: false,
  settings: {
    user: {
      TimerSettings: {
        DefaultDuration: 30,
        LongBreakDuration: 20,
        ShortBreakDuration: 1,
        TickTrack: "",
      },
    },
  },
};

const LOGIN_GET_SETTINGS = "LOGIN_GET_SETTINGS";
const CLEAR_SETTINGS = "CLEAR_SETTINGS";
const CHANGE_DEFAULT_TIME = "CHANGE_DEFAULT_TIME";
const CHANGE_LONG_BREAK = "CHANGE_LONG_BREAK";
const CHANGE_SHORT_BREAK = "CHANGE_SHORT_BREAK";
const CHANGE_AUTH_FLAG = "CHANGE_AUTH_FLAG";
const CHANGE_TICKTRACK = "CHANGE_TICKTRACK";
const GET_SETTINGS = "GET_SETTINGS";

export const timeSettingsReduсer = (state = timeSettings, action) => {
  switch (action.type) {
    case CHANGE_AUTH_FLAG:
      return { ...state, authFlag: (state.authFlag = action.payload) };
    case LOGIN_GET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case CHANGE_DEFAULT_TIME:
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            TimerSettings: {
              ...state.settings.user.TimerSettings,
              DefaultDuration: (state.settings.user.TimerSettings.DefaultDuration =
                action.payload),
            },
          },
        },
      };
    case CHANGE_LONG_BREAK:
      // if (state.settings.user.TimerSettings.LongBreakDuration) {
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            TimerSettings: {
              ...state.settings.user.TimerSettings,
              LongBreakDuration: (state.settings.user.TimerSettings.LongBreakDuration =
                action.payload),
            },
          },
        },
      };
    // }
    case CHANGE_SHORT_BREAK:
      // if (state.settings.user.TimerSettings.ShortBreakDuration) {
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            TimerSettings: {
              ...state.settings.user.TimerSettings,
              ShortBreakDuration: (state.settings.user.TimerSettings.ShortBreakDuration =
                action.payload),
            },
          },
        },
      };
    // }
    case CLEAR_SETTINGS:
      return { ...state, settings: action.payload };
    case CHANGE_TICKTRACK:
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            TimerSettings: {
              ...state.settings.user.TimerSettings,
              TickTrack: (state.settings.user.TimerSettings.TickTrack =
                action.payload),
            },
          },
        },
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          user: {
            ...state.settings.user,
            TimerSettings: {
              ...state.settings.user.TimerSettings,
              ...action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
};
export const changeAuthFlagAction = (payload) => ({
  type: CHANGE_AUTH_FLAG,
  payload,
});

export const getLoginAction = (payload) => ({
  type: LOGIN_GET_SETTINGS,
  payload,
});
export const clearUsersSettingsAction = (payload) => ({
  type: CLEAR_SETTINGS,
  payload,
});
export const changeDefaultTimeAction = (payload) => ({
  type: CHANGE_DEFAULT_TIME,
  payload,
});
export const changeLongBreakAction = (payload) => ({
  type: CHANGE_LONG_BREAK,
  payload,
});
export const changeShortBreakAction = (payload) => ({
  type: CHANGE_SHORT_BREAK,
  payload,
});
export const changeTickTrackAction = (payload) => ({
  type: CHANGE_TICKTRACK,
  payload,
});
export const getSettingsAction = (payload) => ({ type: GET_SETTINGS, payload });
