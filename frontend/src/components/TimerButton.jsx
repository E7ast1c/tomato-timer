import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useDispatch } from "react-redux";
import { vuePomodoroTimerAction, vueShortBreakTimerAction, vueLongBreakTimerAction } from "../Store/Actions/VueCurrentTimer";


const useStyles = makeStyles((theme) => ({
  btn: {
    color: '#fff'
  },
  btngroup: {
    marginTop: '1em'
  },
}));


export default function TimerButton() {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <div>
      <ButtonGroup variant="text" className={classes.btngroup}>
        <Button
         className={classes.btn}
         onClick={() => dispatch(vuePomodoroTimerAction(true))}
         >
           Pomodoro
        </Button>
        <Button
          className={classes.btn}
          onClick={() => dispatch(vueShortBreakTimerAction(true))}
        >
          Short break
        </Button>
        <Button 
          className={classes.btn}
          onClick={() => dispatch(vueLongBreakTimerAction(true))}
          >Long break</Button>
      </ButtonGroup>
    </div>
  )
}