import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from "react-redux";
import { EnumTimerMode } from "../redux/common";
import { changeTimerMode } from "../redux/timerSettingsSlice";

const useStyles = makeStyles((theme) => ({
  btngroup: {
    marginTop: "1em",
  },
  btn: {
    color: "#fff",
  },
  activeBtn: {
    background: "tomato",
  },
}));

export default function TimerModeButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <ButtonGroup variant="text" className={classes.btngroup}>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.POMODORO))}
        >
          Pomodoro
        </Button>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.SHORT_BREAK))}
        >
          Short break
        </Button>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.LONG_BREAK))}
        >
          Long break
        </Button>
      </ButtonGroup>
    </div>
  );
}
