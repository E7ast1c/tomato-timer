import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useStopwatch, useTimer } from "react-timer-hook";
import PropTypes from "prop-types";

import ProgressBar from "./ProgressBar";

import { getLocalStorageKey } from "./LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { changeTimerAction } from "../store/actions/timerSettingsActions";
import { EnumTimerAction, EnumTimerMode } from "../store/common";
import { duration } from "moment";

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

	let timerDuration;
	switch (TimerMode) {
		case EnumTimerMode.POMODORO:
			timerDuration = useSelector(
				(state) => state.timerSettings.UserSettings.DefaultDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			timerDuration = useSelector(
				(state) => state.timerSettings.UserSettings.ShortBreakDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			timerDuration = useSelector(
				(state) => state.timerSettings.UserSettings.LongBreakDuration
			);
			break;
		default:
			break;
	}

	function getExpiryDate(timerDuration) {
		let expiry = new Date();
		return expiry.setSeconds(expiry.getSeconds() + timerDuration * 60);
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
		expiryTimestamp: getExpiryDate(timerDuration),
		onExpire: () => dispatch(changeTimerAction("MusicNotification"))
	});

	return (
		<div className={classes.timer}>
			<div>
				<p>{`Timer ${headerCorrector(TimerAction)}`}</p>
				{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
			}`}
			
			</div>
			<ProgressBar minutes={minutes} seconds={seconds} duration={timerDuration}/>

			<div>
				<Button
					className={classes.btn}
					variant="contained"
					style={{ backgroundColor: "yellowgreen" }}
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
					color="primary"
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
						restart(getExpiryDate(timerDuration), noAutoStart);
						dispatch(changeTimerAction(EnumTimerAction.STOP));
					}}
				>
					stop
				</Button>
			</div>
		</div>
	);
}
