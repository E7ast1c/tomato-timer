import React, { useState, useEffect, useLayoutEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerButton from "./TimerButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FakeTime from "./FakeTime";
import { useSelector } from "react-redux";
import ShortClock from "./ShortClock";
import LongClock from "./LongClock";


const useStyles = makeStyles({
  timer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "32vh",
  },
  btn: {
    margin: ".2rem",
  },
});

export default function Main() {
  const statusTimer = useSelector(state => state.startStopTimer.status)
  const changeCurrentTime = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)
  const vueCurrentTimer = useSelector(state => state.vueCurrentTimer)


  // Test state time settings 
  const timeSettings = useSelector(state => state.timeSettings.settings)
  console.log(timeSettings);
  console.log(vueCurrentTimer);


  let currentTimeComponent;

  if(vueCurrentTimer.pomodoro){
    currentTimeComponent = statusTimer ? (<Time />):(<FakeTime />)
  } else if(vueCurrentTimer.shortBreak){
    currentTimeComponent = <ShortClock/>
  } else if(vueCurrentTimer.longBreak){
    currentTimeComponent = <LongClock/>
  }

  return (
    <div>
      {changeCurrentTime && <Header />}
      <div>
        <TimerButton />
      <div>
          {currentTimeComponent}
      </div>
       


        
      </div>
    </div>
  );
}
