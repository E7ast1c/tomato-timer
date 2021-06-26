import React, { useState, useEffect, useLayoutEffect } from "react";
import Time from "./Time";
import Header from "./Header/Header";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FakeTime from "./FakeTime";

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
  const [activeTimerDispatcher, setActiveTimerDispatcher] = useState(false);
  const classes = useStyles();
  const [currentDuarationTime, setCurrentDuarationTime] = useState(1);
  

  return (
    <div>
      <Header setCurrentDuarationTime={setCurrentDuarationTime} />
      {activeTimerDispatcher ? (
        <Time setActiveTimerDispatcher={setActiveTimerDispatcher} />
      ) : (
        <FakeTime setActiveTimerDispatcher={setActiveTimerDispatcher} />
      )}
    </div>
  );
}
