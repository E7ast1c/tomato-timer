import React, { useEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerModeButtons from "./TimerModeButtons";
import { useDispatch, useSelector } from "react-redux";
import RingtonePlayer from "./Ringtone/RingtonePlayer";
import { getUserSettingsManager } from "./AuthManager";
import { getUserName } from "./LocalStorageManager";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { RootState } from "../redux/store";
import { changeAuthFlagAction } from "../redux/actions/timerSettingsActions";

export default function Main() {
	const dispatch = useDispatch();
	const hasNameToLocalStorage = getUserName("user");
	// const {timerSettings} = useTypedSelector((state: RootState) => state.timerSettings);

	useEffect(() => {
		if (hasNameToLocalStorage) {
			dispatch(changeAuthFlagAction(true));
			dispatch(getUserSettingsManager());
		}
	}, [dispatch]);

	const timerSettings = useSelector((state: RootState) => state.timerSettings)
	console.log("timerSettings", timerSettings)
	return (
		<div>
			{timerSettings.user.TimerSettings.DefaultDuration && <Header />}
			<div>
				<TimerModeButtons />
				<Time />
			</div>
		</div>
	);
}
