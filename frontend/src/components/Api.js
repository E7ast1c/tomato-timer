import axios from "axios";
import config from "../configuration.json";

const baseAdress = config.TOMATO_API_URL;

const headers = {
  "Content-Type": "application/json",
}

export async function login(userData) {
  const response = await axios.post(
    `${baseAdress}/login`,
    JSON.stringify(userData),
    { headers:  headers}
  );
  console.log("axios login response", response);
  return response;
}

export async function register(userData) {
  const response = await axios.post(
    `${baseAdress}/register`,
    JSON.stringify(userData),
    {headers: headers}
  );
  console.log("axios register response", response);
  return response;
}

export async function setUserSettings(userSettings, token){
  const response = await axios.post(
    `${baseAdress}/auth/set-user-settings`,
    JSON.stringify(userSettings),
    {
      headers: {
        "Access-Control-Allow-Headers": "x-access-token",
        "Access-Control-Allow-Origin": "*",
        // "Authorization": `Bearer ${token}`,
        "x-access-token": token
        // "x-access-token": token
      }
    })
  console.log("setUserSettings response", response)
  return response;
}

export async function getAuthSettings(){
  console.log("getAuthSettings", )
  // try{
  //   const response = await axios.get(`${baseAdress}/auth/get-user-settings`,
  //     {
  //       headers: {
  //         // "Access-Control-Allow-Headers": "*",
  //         // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
  //         // "Access-Control-Allow-Headers": "Authorization",
  //         // "Content-Type": "application/json",
  //         // "Access-Control-Allow-Origin": "*",
  //         "Accept": "*/*",
  //         "Accept-Encoding": "gzip, deflate, br",
  //         "Connection": "keep-alive"
  //         // "Authorization": `Bearer ${token}`,
  //         "x-access-token": token
  //
  //       }
  //     })
  //   console.log("get settings", response)
  // } catch (error){
  //   console.log(error)
  // }

  const config = {
    method: 'get',
    url: 'http://localhost:8081/auth/get-user-settings',
    headers: {
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjUsIk5hbWUiOiJhcnRlbSIsIkVtYWlsIjoia29yQHlhaG9vLmNvbSIsImV4cCI6MTYzMTYwODUzNX0.WEz_mC7rbCOS2-XxHOC9Y4xhw31jKOTxoE4bDgs5718',
      'Access-Control-Allow-Headers': 'x-access-token'
    }
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

}
