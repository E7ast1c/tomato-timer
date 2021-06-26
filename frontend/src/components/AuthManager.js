// import { login } from "./RESTApi";
import { login, register } from "./Api";
import { setUserData, setLoginTimerSettings } from "./LocalStorageManager";

export async function AuthLogin(data) {
  const currentUser = await login(data);
  setUserData(currentUser.data);
  setLoginTimerSettings(currentUser.data)
  // setLocalStorageKey()
  return true;
}

export async function AuthRegister(data){
  // console.log(data);
  const registerUser = await register(data);
  console.log(registerUser);

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
