const requestURL = `http://192.168.31.174:8080`;

export function getData(method, url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

let updateData = getData("GET", requestURL)
  .then((data) => {})
  .catch((er) => console.error(`Error fatch ${er}`));

export async function login(objUser) {
//   let userData = { email, password };

  try {
    let response = await fetch(`${requestURL}/login`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(objUser),
      });
      console.log(response);
      
  } catch (error) {
    console.error(error)
  }

  
}

export async function register(login, email, password) {
  let userData = { email, password };
  try {
    let response = await fetch(`${requestURL}/register`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
  } catch (error) {
      console.error(error)
  }
}

// export async function register(login, email, password) {
//     let userData = { email, password };

//       let response = await fetch(`${requestURL}/register`, {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//           "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify(userData),
//       });
//       console.log(response);

//   }