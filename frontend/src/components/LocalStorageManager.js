export function setLocalStorageKey(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return;
  }
}

export function setLoginTimerSettings(data) {
  const currentTime = data.data.user.TimerSettings
  const timerSettingsData = [
    { name: 'defDuaration',  value: currentTime.DefaultDuration },
    { name: 'longBreakDuaration', value: currentTime.LongBreakDuration},
    { name: 'shortBreakDuration', value: currentTime.ShortBreakDuration},
    { name: 'tickTrack', value: currentTime.TickTrack },
    { name: 'alarmTrack', value: currentTime.AlarmTrack },
  ]

  for (let i = 0; i < timerSettingsData.length; i++){
    localStorage.setItem(timerSettingsData[i].name, JSON.stringify(timerSettingsData[i].value))
  }
}

export function getLocalStorageKey(key) {
  if (localStorage.getItem(key)) {
    const time = JSON.parse(localStorage.getItem("defDuaration"));
    return time; 
  } else {
    return 1;
  }
}

export function setUserData(data) {
  const userData = {
    user: {
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

export function clearLocalStorage() {
  localStorage.clear();
}

export function getUserName(user) {
  if (localStorage.getItem(user)) {
    const userName = JSON.parse(localStorage.getItem('user'))
    return userName.name
  } else {
    return;
  }
}
