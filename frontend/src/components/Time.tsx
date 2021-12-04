import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { useTimer } from "react-timer-hook";

import ProgressBar from "./ProgressBar";

import { togglePlayRingtone } from "../redux/ringtoneSlice";
import { getLocalStorageKey } from "./LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { changeTimerAction } from "../redux/actions/timerSettingsActions";
import { EnumTimerAction, EnumTimerMode } from "../redux/common";
import store, {RootState} from "../redux/store";
import {useState} from "react";

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
	const {TimerMode, TimerAction, Loading} = useSelector(
		(state: RootState) => state.timerSettings
	);
	// const {DefaultDuration, LongBreakDuration, ShortBreakDuration} = store.getState().timerSettings.user.TimerSettings
	const {DefaultDuration,ShortBreakDuration, LongBreakDuration} = useSelector((state: RootState) => state.timerSettings.user.TimerSettings)
	const [timerDuration, setTimerDuration] = useState(DefaultDuration)

	// let timerDuration: any;
	useState(() => {
		switch (TimerMode) {
			case EnumTimerMode.POMODORO:
				setTimerDuration(DefaultDuration)
				break;
			case EnumTimerMode.SHORT_BREAK:
				setTimerDuration(ShortBreakDuration)
				break;
			case EnumTimerMode.LONG_BREAK:
				setTimerDuration(LongBreakDuration)
				break;
			default:
				break;
		}
		// @ts-ignore
	}, [Loading])

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
		onExpire: () => dispatch(togglePlayRingtone()),
	});
	const timerSettingsState = store.getState().timerSettings


	return (
		<div className={classes.timer}>
			<div>
				<p>{`Timer ${headerCorrector(TimerAction)}`}</p>
				{`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
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
					style={{ backgroundColor: "yellowgreen" }}
					onClick={() => {
						start();
						dispatch(changeTimerAction(EnumTimerAction.START));
						console.log("timerSettingsState", timerSettingsState)
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
