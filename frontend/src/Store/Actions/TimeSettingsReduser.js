const timeSettings = {
  settings: {}
}

const GET_SETTINGS = "GET_SETTINGS";
const CLEAR_SETTINGS = "CLEAR_SETTINGS";

export const timeSettingsReduser = (state = timeSettings, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload}}
    case CLEAR_SETTINGS:
      return {...state, settings: action.payload }
    default:
      return state
  }
}

export const getTimeSettingsAction = (payload) => ({type: GET_SETTINGS, payload});
export const clearTimeSettingsAction = (payload) => ({type: CLEAR_SETTINGS, payload});