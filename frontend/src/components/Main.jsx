import React, {useEffect} from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerButton from "./TimerButton";
import {makeStyles} from "@material-ui/core/styles";
import FakeTime from "./FakeTime";
import {useDispatch, useSelector} from "react-redux";
import {StyledMusicButton} from "./MainStyles";
import {useTypedSelector} from "../hooks/useTypedSelector";
import MusicButton from "./MusicButton";
import MusicButton2 from "./MusicButton2";
import {getUserSettingsManager} from "./AuthManager";
import {getSettingsAction} from "../Store/Actions/TimeSettingsReduсer";


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

export default function Main() {
  const dispatch = useDispatch()
  const statusTimer = useSelector(state => state.startStopTimer.status)
  const changeCurrentTime = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)
  const vueCurrentTimer = useSelector(state => state.vueCurrentTimer)

  if(false){
    useEffect(() => {
      dispatch(getUserSettingsManager())
    }, [])
  }

  // Test state time settings 
  const timeSettings = useTypedSelector(state => state.timeSettings)
  console.log("main timesettings", timeSettings)
  return (
    <div>
      {changeCurrentTime && <Header />}
      <div>
        <TimerButton />
      </div>
          {/* {currentTimeComponent} */}
         { statusTimer ? (<Time />):(<FakeTime />)}

        <StyledMusicButton>
          <MusicButton2/>
        </StyledMusicButton>
    </div>
  );
}
