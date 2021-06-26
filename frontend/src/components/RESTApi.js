// const requestURL = `http://192.168.31.174:8080`;


// export async function login(userData) {
//   const url = "http://192.168.31.174:8080/login";

//   const myHeaders = new Headers({
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   });
//   try {
//     const response = await fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       body: JSON.stringify(userData), // body data type must match "Content-Type" header
//     });
//     if (response.status > 299) {
//       console.warn(response.body);
//       throw new Error(response);
//     }
//     return response.json(); // parses JSON response into native JavaScript objects
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// export async function register(login, email, password) {
//   let userData = { email, password };
//   console.log(userData);

//   let response = await fetch(`${requestURL}/register`, {
//     method: "POST",
//     mode: "no-cors",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify(userData),
//   });
//   console.log(response);
// }
