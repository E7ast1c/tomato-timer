import React, { useEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerButton from "./TimerButton";
import FakeTime from "./FakeTime";
import { useDispatch, useSelector } from "react-redux";
import { StyledMusicButton } from "./MainStyles";
import MusicButton from "./MusicButton";
import { getUserSettingsManager } from "./AuthManager";
import { getUserName } from "./LocalStorageManager";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RootState} from "../Store/store";
import {changeAuthFlagAction} from "../Store/Actions/TimeSettingsReduсer";

export default function Main() {
  const dispatch = useDispatch();
  const hasNameToLocalStorage = getUserName("user");
  const {status} = useTypedSelector((state: RootState) => state.startStopTimer);

    useEffect(() => {
      if (hasNameToLocalStorage) {
        dispatch(changeAuthFlagAction(true));
        dispatch(getUserSettingsManager());
      }
    }, [dispatch]);
  const {authFlag} = useTypedSelector((state: RootState) => state.timeSettings);
  const {
    settings: {
      user: {
        TimerSettings: { DefaultDuration },
      },
    },
  } = useTypedSelector((state: RootState) => state.timeSettings);
  console.log("DefaultDuration", DefaultDuration);

  return (
    <div>
      {DefaultDuration && <Header />}
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
