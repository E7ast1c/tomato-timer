import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useStopwatch, useTimer } from "react-timer-hook";
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

const noAutoStart = false;
export default function Time(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { TimerMode, TimerAction } = useSelector((state) => state.timerSettings);

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

	function getExpiryDate(time) {
		let expiry = new Date();
		return expiry.setSeconds(expiry.getSeconds() + time * 60);
	}

	function headerCorrector(action) {
		switch (action) {
			case EnumTimerAction.START:
				return "started"
			case EnumTimerAction.PAUSE:
				return "paused"
			case EnumTimerAction.STOP:
				return "stopped"
			default:
				break;
		}
	}

	const {
		seconds,
		minutes,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		autoStart: noAutoStart,
		// offsetTimestamp: getExpiryDate(time),
		expiryTimestamp: getExpiryDate(time),
		onExpire: () => dispatch(changeTimerAction(EnumTimerAction.START))
	});

	return (
		<div className={classes.timer}>
			<div>
				<p>{`Timer ${headerCorrector(TimerAction)}`}</p>
				{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
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
					start
				</Button>

				<Button
					className={classes.btn}
					variant="contained"
					color="default"
					onClick={() => {
						pause()
						dispatch(changeTimerAction(EnumTimerAction.PAUSE));
					}}
				>
					pause
				</Button>

				<Button
					className={classes.btn}
					variant="contained"
					color="secondary"
					onClick={() => {
						restart(getExpiryDate(time), noAutoStart);
						dispatch(changeTimerAction(EnumTimerAction.STOP));
					}}
				>
					stop
				</Button>
			</div>
		</div>
	);
}
