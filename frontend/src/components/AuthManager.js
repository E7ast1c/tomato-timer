// import { login } from "./RESTApi";
import { login } from "./Api";
import { setUserData } from "./LocalStorageManager";

export async function AuthLogin(data) {
  const currentUser = await login(data)
  setUserData(currentUser.data)
 
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