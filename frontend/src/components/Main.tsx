import React, { useEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerModeButtons from "./TimerModeButtons";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "./LocalStorageManager";

import { RootState } from "../redux/store";
import { changeAuthFlagAction } from "../redux/actions/timerSettingsActions";
import { getAuthSettingsThunk } from "../redux/thunk";

export default function Main() {
  const dispatch = useDispatch();
  const hasNameToLocalStorage = getUserName("user");

  useEffect(() => {
    if (hasNameToLocalStorage) {
      dispatch(changeAuthFlagAction(true));
      dispatch(getAuthSettingsThunk());
    }
  }, []);

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
