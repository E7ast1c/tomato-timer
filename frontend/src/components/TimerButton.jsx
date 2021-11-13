import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from "react-redux";
import {
	changeTimerModeAction,
} from "../store/actions/timerSettingsActions";
import { EnumTimerMode } from "../store/common";

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

export default function TimerButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <ButtonGroup variant="text" className={classes.btngroup}>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerModeAction(EnumTimerMode.POMODORO))}
        >
          Pomodoro
        </Button>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerModeAction(EnumTimerMode.SHORT_BREAK))}
        >
          Short break
        </Button>
        <Button
          className={classes.btn}
          onClick={() => dispatch(changeTimerModeAction(EnumTimerMode.LONG_BREAK))}
        >
          Long break
        </Button>
      </ButtonGroup>
    </div>
  );
}
