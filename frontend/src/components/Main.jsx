import React, { useEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerButton from "./TimerButton";
import FakeTime from "./FakeTime";
import { useDispatch, useSelector } from "react-redux";
import { StyledMusicButton } from "./MainStyles";
import { useTypedSelector } from "../hooks/useTypedSelector";
import MusicButton from "./MusicButton";
import { getUserSettingsManager } from "./AuthManager";
import { getUserName } from "./LocalStorageManager";

export default function Main() {
  const asdas = getUserName("user");
  if (asdas) {
    useEffect(() => {
      dispatch(getUserSettingsManager());
    }, [asdas]);
  }

  const dispatch = useDispatch();
  const { status } = useTypedSelector((state) => state.startStopTimer);
  const changeCurrentTime = useSelector(
    (state) => state.timeSettings.settings.user.TimerSettings.DefaultDuration
  );
  // const {
  //   settings: {
  //     user: {
  //       TimerSettings: { DefaultDuration },
  //     },
  //   },
  // } = useTypedSelector((state) => state.timeSettings);
  console.log("DefaultDuration", changeCurrentTime);

  return (
    <div>
      {changeCurrentTime && <Header />}
      <div>
        <TimerButton />
      </div>
      {status ? <Time /> : <FakeTime />}

      <StyledMusicButton>
        <MusicButton />
      </StyledMusicButton>
    </div>
  );
}
