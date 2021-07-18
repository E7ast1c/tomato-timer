const timeSettings = {
  settings: {
    user: {
      TimerSettings: {
        DefaultDuration: 1
      }
    }
  }
}

const GET_SETTINGS = "GET_SETTINGS";
const CLEAR_SETTINGS = "CLEAR_SETTINGS";
const CHANGE_DEFAULT_TIME = 'CHANGE_DEFAULT_TIME'

export const timeSettingsReduser = (state = timeSettings, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case CHANGE_DEFAULT_TIME:
      return { ...state, TimerSettings: state.settings.user.TimerSettings.DefaultDuration = action.payload }
    case CLEAR_SETTINGS:
      return { ...state, settings: action.payload }
    default:
      return state
  }
}

export const getTimeSettingsAction = (payload) => ({ type: GET_SETTINGS, payload });
export const clearUsersSettingsAction = (payload) => ({ type: CLEAR_SETTINGS, payload });
export const changeDefaultTimeAction = (payload) => ({ type: CHANGE_DEFAULT_TIME, payload })

