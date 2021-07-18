import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTimer } from "react-timer-hook";
import PropTypes from "prop-types";

import Clock from "./Clock";
import ViewClock from "./FakeProgress";

import { getLocalStorageKey } from "./LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { startStopTimerAction } from '../Store/Actions/StartStopTimerReducer';



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
  const timeKey = "defDuaration";
  const dispatch = useDispatch();

  const timeDefultDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)

  const stopTimer = () => {
    dispatch(startStopTimerAction(false))


  }



  // ---- Convert in minutes ------
  // const timeDefultDuration = getLocalStorageKey(timeKey) * 60;
  // const timeDefultDuration = timeDefultDuration

  function getExpiryDate(timeDefultDuration) {
    let expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + timeDefultDuration * 60);
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
    expiryTimestamp: getExpiryDate(timeDefultDuration),
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
        {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
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
          onClick={() => stopTimer()}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}
