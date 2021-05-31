export function setLocalStorageKey(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return;
  }
}

export function getLocalStorageKey(key) {
  if (localStorage.getItem(key)) {
    const time = JSON.parse(localStorage.getItem("Time"));
    return time;
  } else {
    return 1;
  }
}

export function setUserData(data) {
  const userData = {
    user : {
      name: data.user.Name, 
      email: data.user.Email,
    }, 
    token: data.token,
  };

  if (userData.token && userData.user.name && userData.user.email) {
    for (let key in userData) {
      localStorage.setItem(key, JSON.stringify(userData[key]));
    }
  } else {
    return;
  }
}

export function clearLocalStorage(){
  localStorage.clear()
}
