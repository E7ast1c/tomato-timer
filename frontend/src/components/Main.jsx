import React from "react";
import Time from "./Time";
import Header from "./Header/Header";
import TimerButton from "./TimerButton";
import {makeStyles} from "@material-ui/core/styles";
import FakeTime from "./FakeTime";
import {useSelector} from "react-redux";
import {StyledMusicButton} from "./MainStyles";
import {useTypedSelector} from "../hooks/useTypedSelector";
import MusicButton from "./MusicButton";
import MusicButton2 from "./MusicButton2";


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
  const statusTimer = useSelector(state => state.startStopTimer.status)
  const changeCurrentTime = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)
  const vueCurrentTimer = useSelector(state => state.vueCurrentTimer)


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
