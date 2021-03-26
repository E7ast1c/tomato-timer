const api = () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "x-access-token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjQsIk5hbWUiOiIiLCJFbWFpbCI6ImFkbWluIiwiZXhwIjoxNjA3NzgyNDcyfQ.DgZMy2ujIyCrUnStDWPs-2F3Mqhig9RqgN8_TrEl_ic"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ Email: "admin", Password: "admin" });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://192.168.31.174:8080/auth/users", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export default api;
