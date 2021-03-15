import React, { useState } from "react";
import SettingModal from "./Header/SettingsModal";
import Time from "./Time";

export default function Setting(props) {
  console.log(props.valueInputTime);
  let userTime = props.valueInputTime;



  let [getSettings, isGetSettings] = useState();
  let [setSettings, isSetSettings] = useState(0)
  isSetSettings(() => userTime)

//   function uppdateSetSettings(time) {
//     setSettings = userTime
//   }
//   uppdateSetSettings(userTime)

  console.log(setSettings)



  if (localStorage.getItem("time")) {
    isGetSettings( () => JSON.parse(localStorage.getItem("time")))
//    uppdateSetSettings(a)
  } else {
    localStorage.setItem("time", JSON.stringify(setSettings));
  }
  return (
    <div>
      {/* {console.log(setSettings)} */}
      <span>test</span>
      {/* <SettingModal /> */}
      {/* <Time /> */}
    </div>
  );
}
