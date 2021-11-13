import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getLocalStorageKey } from "./LocalStorageManager";
import moment from "moment";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { changeTimerAction } from "../store/actions/timerSettingsActions.ts";

import {EnumTimerAction, EnumTimerMode} from "../store/common"
import { useTypedSelector } from "../hooks/useTypedSelector";


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
	const classes = useStyles();
	const dispatch = useDispatch();
	const startTimer = () => {
		dispatch(changeTimerAction(EnumTimerAction.START));
	};

const {TimerMode} = useTypedSelector((state) => state.timerSettings)
	const minuteInMilliseconds = 60000;
	let time;
	switch (TimerMode) {
		case EnumTimerMode.POMODORO:
			time = useTypedSelector(
				(state) => state.timerSettings.UserSettings.DefaultDuration
			) * minuteInMilliseconds;
			break;
		case EnumTimerMode.SHORT_BREAK:
			time == useTypedSelector(
				(state) => state.timerSettings.UserSettings.ShortBreakDuration
			) * minuteInMilliseconds;
			break;
		case EnumTimerMode.LONG_BREAK:
			time = useTypedSelector(
				(state) => state.timerSettings.UserSettings.LongBreakDuration
			) * minuteInMilliseconds;
			break;
		default:
			break;
	}

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
				<p>{"Timer stopped"}</p>
				{moment(time).format("mm:ss")}
			</div>

			<Box display="flex" alignItems="center" justifyContent="center">
				<Box width="60%" mr={1}>
					<LinearProgress variant="determinate" value={0} />
				</Box>
				<Box minWidth={35}>
					<Typography variant="body2">{"0%"}</Typography>
				</Box>
			</Box>
			<div>
				<Button
					className={classes.btn}
					variant="contained"
					color="primary"
					onClick={() => startTimer()}
				>
					Start
				</Button>
				<Button className={classes.btn} variant="contained" color="secondary">
					Stop
				</Button>
			</div>
		</div>
	);
}


