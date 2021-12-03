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
import { changeTimerAction } from "../redux/actions/timerSettingsActions";
import { EnumTimerAction, EnumTimerMode } from "../redux/common";
import { duration } from "moment";
import {RootState} from "../redux/store";

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
export default function Time() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const {TimerMode, TimerAction} = useSelector(
		(state: RootState) => state.timerSettings
	);

	let timerDuration: any;
	switch (TimerMode) {
		case EnumTimerMode.POMODORO:
			timerDuration = useSelector(
				(state: RootState) =>
					state.timerSettings.user.TimerSettings.DefaultDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			timerDuration = useSelector(
				(state: RootState) =>
					state.timerSettings.user.TimerSettings.ShortBreakDuration
			);
			break;
		case EnumTimerMode.SHORT_BREAK:
			timerDuration = useSelector(
				(state: RootState) =>
					state.timerSettings.user.TimerSettings.LongBreakDuration
			);
			break;
		default:
			break;
	}

	function getExpiryDate(timerDuration: any) {
		let expiry = new Date();
		return expiry.setSeconds(expiry.getSeconds() + timerDuration * 60);
	}

	function headerCorrector(action: string) {
		switch (action) {
			case EnumTimerAction.START:
				return "started";
			case EnumTimerAction.PAUSE:
				return "paused";
			case EnumTimerAction.STOP:
				return "stopped";
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
		// @ts-ignore
		expiryTimestamp: getExpiryDate(timerDuration),
		// @ts-ignore
		onExpire: () => dispatch(changeTimerAction("MusicNotification")),
	});

	return (
		<div className={classes.timer}>
			<div>
				<p>{`Timer ${headerCorrector(TimerAction)}`}</p>
				{`${minutes < 10 ? `0${minutes}` : minutes}:${
					seconds < 10 ? `0${seconds}` : seconds
				}`}
			</div>
			<ProgressBar
				minutes={minutes}
				seconds={seconds}
				duration={timerDuration}
			/>
			<div>
				<Button
					className={classes.btn}
					variant="contained"
					style={{backgroundColor: "yellowgreen"}}
					onClick={() => {
						start();
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
						pause();
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
						// @ts-ignore
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