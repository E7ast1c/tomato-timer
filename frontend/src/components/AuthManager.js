import {getAuthSettings, login, register, setUserSettings} from "../API/Api";
import {getToken, getUserName, setUserData} from "./LocalStorageManager";
import {getSettingsAction, getLoginAction} from "../Store/Actions/TimeSettingsReduсer"


export const AuthLoginManager = (data) => {
  return async function(dispatch){
    const currentUser = await login(data)
    dispatch(getLoginAction(currentUser.data.data))
    setUserData(currentUser.data.data);
    getUserName()
    // setLoginTimerSettings(currentUser.data)
    console.log('REDUX', currentUser.data);
  }
}

export const AuthRegisterManager = (data) => {
  return async function(dispatch){
    const currentUser = await register(data)
    dispatch(getLoginAction(currentUser.data.data))
    setUserData(currentUser.data.data);
    // setLoginTimerSettings(currentUser.data)
    console.log('REDUX', currentUser.data);
  }
}

export const setUserSettingsManager = (data) => {
  return async function(dispatch){
    const token = getToken()
    const response = await setUserSettings(data, token)

    console.log("REDUX SUSM", response)
  }
}

export const getUserSettingsManager = () => {
  return async function(dispatch){
    const token = getToken()
    console.log('token', token)
    const response = await getAuthSettings(token)
    dispatch(getSettingsAction(response.data.data.settings))


    console.log("REDUX GUSM", response)
  }
}
