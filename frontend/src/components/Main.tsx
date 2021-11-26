import React, { useEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerModeButtons from "./TimerModeButtons";
import { useDispatch, useSelector } from "react-redux";
import { StyledMusicButton } from "./MainStyles";
import MusicButton from "./MusicNotification";
import { getUserSettingsManager } from "./AuthManager";
import { getUserName } from "./LocalStorageManager";
import { useTypedSelector } from "../hooks/useTypedSelector";

import { RootState } from "../store/store";
import { changeAuthFlagAction } from "../store/actions/timerSettingsActions";

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

	// const {authFlag} = useTypedSelector((state: RootState) => state.timerSettings?.authFlag);
	const timerSettings = useTypedSelector((state: RootState) => state.timerSettings)


return (
	<div>
		{timerSettings?.UserSettings.DefaultDuration && <Header />}
		<div>
			<TimerModeButtons />
		</div>
		<Time />  
		
		<StyledMusicButton>
			<MusicButton />
		</StyledMusicButton>
	</div>
);
}
