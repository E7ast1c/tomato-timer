import { login } from "./RESTApi";
import { setUserData } from "./LocalStorageManager";

export function AuthLogin(data) {
  console.log(data);

  login(data)
    .then((data) => {
      setUserData(data);

      console.log("this response", data); // JSON data parsed by `response.json()` call
    })
    .catch((error) => {
      console.error("Error response", error);
    });
  return true;
}
