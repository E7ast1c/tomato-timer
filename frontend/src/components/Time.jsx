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
import { timerSettingsAction } from "../store/actions/timerSettingsActions";

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
	const dispatch = useDispatch();

	const vueCurrentTimer = useSelector((state) => state.vueCurrentTimer);
	console.log(vueCurrentTimer)
	const stopTimer = () => {
		dispatch(TimerSettingsAction(false));
	};

	let time;
	switch (true) {
		case vueCurrentTimer.pomodoro:
			time = useSelector(
				(state) => state.timerSettings.settings.user.TimerSettings.DefaultDuration
			);
			break;
		case vueCurrentTimer.shortBreak:
			time = shortBreakDuration = useSelector(
				(state) => state.timeSettings.settings.user.TimerSettings.ShortBreakDuration
			);
			break;
		case vueCurrentTimer.longBreak:
			time = useSelector(
				(state) => state.timeSettings.settings.user.TimerSettings.LongBreakDuration
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
		expiryTimestamp: getExpiryDate(time),
		onExpire: () => console.warn("onExpire called"),
	});

	console.log("minutes", minutes);
	console.log("seconds", seconds);
	console.log("isRunning", isRunning);

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
			<Clock />

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
