import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useStopwatch, useTimer} from "react-timer-hook";
import PropTypes from "prop-types";

import Clock from "./Clock";
import ViewClock from "./FakeProgress";

import { getLocalStorageKey } from "./LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { changeTimerAction } from "../store/actions/timerSettingsActions";
import { EnumTimerAction, EnumTimerMode } from "../store/common";

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
const noAutoStartTimer = false;
export default function Time(props) {
	const dispatch = useDispatch();

	const {TimerMode} = useSelector((state) => state.timerSettings);

	let time;
	switch (TimerMode) {
		case EnumTimerMode.POMODORO:
			time = useSelector(
				(state) => state.timerSettings.UserSettings.DefaultDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			time = useSelector(
				(state) => state.timerSettings.UserSettings.ShortBreakDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			time = useSelector(
				(state) => state.timerSettings.UserSettings.LongBreakDuration
			);
			break;
		default:
			break;
	}

	// ---- Convert in minutes ------
	// const timeDefaultDuration = getLocalStorageKey(timeKey) * 60;
	// const timeDefaultDuration = timeDefaultDuration

	function getExpiryDate(time) {
		let expiry = new Date();
		expiry.setSeconds(expiry.getSeconds() + time * 60);
		return expiry;
	}

	const classes = useStyles();

	// const [clockEnabled, setClockEnabled] = useState(false);
	// const [pauseClock, setPauseClock] = useState(false);
	// // const [progress, setProgress] = useState(0);

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
		autoStart: noAutoStartTimer,
		// offsetTimestamp: getExpiryDate(time),
    expiryTimestamp: getExpiryDate(time),
    // onExpire: () => console.warn("onExpire called"),
  });

	return (
    <div className={classes.timer}>
      <div>
        <p>{isRunning ? "Timer running" : "Timer stopped"}</p>
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </div>
      <Clock duration={time} />

      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => {
						start()
            dispatch(changeTimerAction(EnumTimerAction.START));
          }}
        >
          Start
        </Button>

        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          onClick={() => {
						pause();
						restart(getExpiryDate(time), noAutoStartTimer);
            dispatch(changeTimerAction(EnumTimerAction.STOP));
          }}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}
