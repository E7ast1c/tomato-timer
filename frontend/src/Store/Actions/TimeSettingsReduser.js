const timeSettings = {
  authFlag: false,
  settings: {
    user: {
      TimerSettings: {
        DefaultDuration: 30,
        LongBreakDuration: 20,
        ShortBreakDuration: 1,
        TickTrack: ''
      }
    }
  }
}

const GET_SETTINGS = "GET_SETTINGS";
const CLEAR_SETTINGS = "CLEAR_SETTINGS";
const CHANGE_DEFAULT_TIME = 'CHANGE_DEFAULT_TIME'
const CHANGE_LONG_BREAKE = 'CHANGE_LONG_BREAKE'
const CHANGE_SHORT_BREAK = 'CHANGE_SHORT_BREAK'
const CHANGE_AUTH_FLAG = "CHANGE_AUTH_FLAG"
const CHANGE_TICKTRACK = 'CHANGE_TICKTRACK'

export const timeSettingsReduser = (state = timeSettings, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case CHANGE_DEFAULT_TIME:
      return { ...state, TimerSettings: state.settings.user.TimerSettings.DefaultDuration = action.payload }
    case CHANGE_LONG_BREAKE:
      if (state.settings.user.TimerSettings.LongBreakDuration) {
        return { ...state, TimerSettings: state.settings.user.TimerSettings.LongBreakDuration = action.payload }
      }
    case CHANGE_SHORT_BREAK:
      if (state.settings.user.TimerSettings.ShortBreakDuration) {
        return { ...state, TimerSettings: state.settings.user.TimerSettings.ShortBreakDuration = action.payload }
      }
    case CLEAR_SETTINGS:
      return { ...state, settings: action.payload }
    case CHANGE_TICKTRACK:
      return {...state,  TimerSettings: state.settings.user.TimerSettings.TickTrack = action.payload}
    default:
      return state
  }
}

export const getTimeSettingsAction = (payload) => ({ type: GET_SETTINGS, payload });
export const clearUsersSettingsAction = (payload) => ({ type: CLEAR_SETTINGS, payload });
export const changeDefaultTimeAction = (payload) => ({ type: CHANGE_DEFAULT_TIME, payload })
export const changeLongBreakAction = (payload) => ({ type: CHANGE_LONG_BREAKE, payload })
export const changeShortBreakAction = (payload) => ({ type: CHANGE_SHORT_BREAK, payload })
export const changeTickTrackAction = (payload) => ({ type: CHANGE_TICKTRACK, payload })



