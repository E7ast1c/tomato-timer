import React, { ChangeEvent, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { GetRingtones } from "../Ringtone/Ringtone";
import { MenuItem } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { changeTickTrackAction } from "../../redux/actions/timerSettingsActions";
import { toggleSettingsModal } from "../../redux/openModalSlice";
import { RootState } from "../../redux/store";
import RingtoneSelectPlayer from "../Ringtone/RingtoneSelectPlayer";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		width: "18em",
		backgroundColor: "#f2f3f4",
		border: "2px solid #000",
		boxShadow: theme.shadows[4],
		padding: theme.spacing(2, 5, 3),
		borderRadius: 7,
	},
	input: {
		"& > *": {
			margin: theme.spacing(1),
			width: "5em",
		},
	},
	btnGroup: {
		display: "flex",
		justifyContent: "space-around",
		marginTop: "1.2em",
	},
	settingsTime: {
		display: "flex",
		justifyContent: "space-between",
	},
}));

export default function SettingModal() {
	const dispatch = useDispatch();
	const { settingsModal } = useSelector((state: RootState) => state.openModal)
	const handleClose = () => {
		dispatch(toggleSettingsModal())
	};

	const classes = useStyles();

	const [valueDefaultTime, setValueDefaultTime] = useState(0);
	const [valueShortBreak, setValueShortBreak] = useState(0);
	const [valueLongBreak, setValueLongBreak] = useState(0);

	const [ringtone, setRingtone] = useState("");

	const changeRingtone = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setRingtone(event.target.value);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={settingsModal}
				onClose={handleClose}
				onSubmit={() => {
					dispatch(toggleSettingsModal())
				}}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<div className={classes.paper}>
					<h2 id="transition-modal-title">Settings</h2>
					<div
						id="transition-modal-description"
						className={classes.settingsTime}
					>
						<h3>Enter pomodoro time</h3>
						<form
							noValidate
							autoComplete="off"
						>
							<TextField
								type="number"
								className={classes.input}
								id="outlined-basic"
								label="Minutes"
								variant="outlined"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setValueDefaultTime(0)
								}
								value={valueDefaultTime}
							/>
						</form>
					</div>
					<div
						id="transition-modal-description"
						className={classes.settingsTime}
					>
						<h3>Enter Short Break</h3>
						<form
							noValidate
							autoComplete="off"
						>
							<TextField
								type="number"
								className={classes.input}
								id="outlined-basic"
								label="Minutes"
								variant="outlined"
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
								) => setValueShortBreak(0)}
								value={valueShortBreak}
							/>
						</form>
					</div>
					<div
						id="transition-modal-description"
						className={classes.settingsTime}
					>
						<h3>Enter Long Break</h3>
						<form
							// onSubmit={handleSubmit(onSubmit)}
							// className={classes.root}
							noValidate
							autoComplete="off"
						>
							<TextField
								type="number"
								className={classes.input}
								id="outlined-basic"
								label="Minutes"
								variant="outlined"
								onChange={(
									e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
								) => setValueLongBreak(0)}
								value={valueLongBreak}
							/>
						</form>
					</div>
					<div className={classes.settingsTime}>
						<h3>Choose ringtone</h3>
					
						<TextField
							variant="outlined"
							className={classes.formControl}
							onChange={(
								event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
							) => changeRingtone(event)}
							select
							label="Ringtone"
							value={ringtone}
						>
								
							{GetRingtones().map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
											
						</TextField>
						<RingtoneSelectPlayer/>	
					</div>
					<div className={classes.btnGroup}>
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								dispatch(toggleSettingsModal())
								dispatch(changeTickTrackAction(ringtone));
							}}
						>
							Save
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleClose}
						>
							Cancel
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
