const requestURL = `http://192.168.31.174:8080`;

// export function getData(method, url) {
//   return fetch(url).then((response) => {
//     return response.json();
//   });
// }

// let updateData = getData("GET", requestURL)
//   .then((data) => {})
//   .catch((er) => console.error(`Error fatch ${er}`));

export async function login(userData) {
  // console.log(userData)

  const url = "http://192.168.31.174:8080/login";

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  });
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // origin: 'http://192.168.31.174:8080',
      //   credentials: 'include',
      //  headers: myHeaders,
      // redirect: 'follow', // manual, *follow, error
      //  referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(userData), // body data type must match "Content-Type" header
    })
    if(response.status > 299){
      console.warn(response.body);
      throw new Error(response)
    }
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error.message);
  }
}

// export async function register(login, email, password) {
//   let userData = { email, password };
//   try {
//     let response = await fetch(`${requestURL}/register`, {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(userData),
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function register(login, email, password) {
  let userData = { email, password };
  console.log(userData);

  let response = await fetch(`${requestURL}/register`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
  console.log(response);
}
