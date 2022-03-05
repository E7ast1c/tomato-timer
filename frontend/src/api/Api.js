import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export async function register(userData) {
  return await axios.post(`register`, JSON.stringify(userData),
      {headers: headers}
  );
}


