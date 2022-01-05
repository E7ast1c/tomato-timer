import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { EnumTimerMode } from "../redux/common";
import { changeTimerMode } from "../redux/timerSettingsSlice";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiBottomNavigation-root": {
      background: "#282c34",
      marginTop: "1em",
    },
    "&.MuiBottomNavigationAction-root": {
      color: "#fff !important",
      "&.Mui-selected": {
        textShadow: "0px 0px 20px #D72402",
      },
    },
    "&.MuiBottomNavigationAction-root .MuiBottomNavigationAction-label": {
      fontSize: "1rem !important",
    },
    "&.MuiBottomNavigationAction-root .MuiBottomNavigationAction-label.Mui-selected": {
      fontSize: "1.2rem !important",
    },
  },
  navBtn: {
    "&.MuiBottomNavigationAction-root": {
      color: "#fff !important",
    },
    "&:.Mui-selected": {
      color: "red !important",
      fontSize: "40px !important",
    },
  },
  btngroup: {
    marginTop: "1em",
  },
}));

export default function TimerModeButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("Pomodoro");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Pomodoro"
          value="Pomodoro"
          className={classes.root}
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.POMODORO))}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Short break"
          value="Short break"
          className={classes.root}
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.SHORT_BREAK))}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Long break"
          value="Long break"
          onClick={() => dispatch(changeTimerMode(EnumTimerMode.LONG_BREAK))}
          className={classes.root}
        ></BottomNavigationAction>
      </BottomNavigation>
    </div>
  );
}
