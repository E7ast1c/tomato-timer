// import { login } from "./RESTApi";
import { useDispatch } from "react-redux";
import { login, register } from "./Api";
import { setUserData, setLoginTimerSettings } from "./LocalStorageManager";
import { getTimeSettingsAction } from "../Store/Actions/TimeSettingsReduser"


export const setTimeSettingsRedux = (data) => {
  return async function(dispactch){
    const currentUser = await login(data)
    dispactch(getTimeSettingsAction(currentUser.data.data))
    console.log('REDUX', currentUser.data);
  }
}

export async function AuthLogin(data) {
  const currentUser = await login(data);
  setUserData(currentUser.data.data);
  setLoginTimerSettings(currentUser.data)
  
  // const dispatch = useDispatch()
  // const setTimeSetiingsRedux = (data) => {
  //   dispatch(timeSettingsAction(data))
  //   console.log(data);
  // }
  // setTimeSetiingsRedux(registerUser.data)

  // setLocalStorageKey()
  return true;
}

export async function AuthRegister(data){
  // console.log(data);
  const registerUser = await register(data);
  setLoginTimerSettings(registerUser.data)
  return true;
}

// .then((response) => console.log(response.data))
// .catch((error) => console.log(error));
// .then((data) => {
//   setUserData(data);

//   console.log("this response", data); // JSON data parsed by `response.json()` call
// })
// .catch((error) => {
//   console.error("Error response", error);
// });
