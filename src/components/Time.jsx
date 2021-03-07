import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTimer } from "react-timer-hook";

import Clock from "./Clock";
import ViewClock from "./FakeProgress";

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

export default function Time(props) {
  function getExpiryDate(timestamp = 60) {
    let expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + timestamp);
    return expiry;
  }


  const classes = useStyles();

  const [clockEnabled, setClockEnabled] = useState(false);
  const [pauseClock, setPauseClock] = useState(false);
  const [progress, setProgress] = useState(1);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryDate(),
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className={classes.timer}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      ></div>

      <div>
        <p>{isRunning ? "Timer running" : "Timer stopped"}</p>
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </div>  
      <Clock params={{ progress, setProgress }} />
    
      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={start}
        >
          Start
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={() => props.setActiveTimerDispatcher(false)}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}
