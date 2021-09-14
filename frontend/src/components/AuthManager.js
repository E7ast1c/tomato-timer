import {getAuthSettings, login, register, setUserSettings} from "./Api";
import {getToken, setUserData} from "./LocalStorageManager";
import {getTimeSettingsAction} from "../Store/Actions/TimeSettingsReduser"


export const AuthLoginManager = (data) => {
  return async function(dispatch){
    const currentUser = await login(data)
    dispatch(getTimeSettingsAction(currentUser.data.data))
    setUserData(currentUser.data.data);
    // setLoginTimerSettings(currentUser.data)
    console.log('REDUX', currentUser.data);
  }
}

export const AuthRegisterManager = (data) => {
  return async function(dispatch){
    const currentUser = await register(data)
    dispatch(getTimeSettingsAction(currentUser.data.data))
    setUserData(currentUser.data.data);
    // setLoginTimerSettings(currentUser.data)
    console.log('REDUX', currentUser.data);
  }
}

export const setUserSettingsManager = (data) => {
  return async function(dispatch){
    const token = getToken()
    console.log("manager data", data)
    console.log("manager token", token)
    const response = await setUserSettings(data, token)

    console.log("REDUX SUSM", response)
  }
}

export const getUserSettingsManager = () => {
  return async function(dispatch){
    const token = getToken()
    const response = await getAuthSettings()

    console.log("REDUX GUSM", response)
  }
}
