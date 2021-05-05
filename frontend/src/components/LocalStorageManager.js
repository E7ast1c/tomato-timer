export function setLocalStorageKey(key, value) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      return
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
  