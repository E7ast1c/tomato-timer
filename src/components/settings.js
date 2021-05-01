import React, { useState } from "react";
// import SettingModal from "./Header/SettingsModal";

export function setLocalStorageKey(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    return
  }
}
// setTime(userTime)
export function getLocalStorageKey(key) {
  if (localStorage.getItem(key)) {
    const time = JSON.parse(localStorage.getItem("Time"));
    return time;
  } else {
    return 1;
  }
}
