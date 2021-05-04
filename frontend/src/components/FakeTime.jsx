import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {getLocalStorageKey} from "./settings";
import moment from "moment";


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

export default function Time(props) {
  const classes = useStyles();
  const timeKey = 'Time'
  // ----- Convert in minutes ------
  const time = getLocalStorageKey(timeKey) * 60000;

  return (
    <div className={classes.timer}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      ></div>
      <div>
        <p>{"Timer stopped"}</p>
        {moment(time).format('mm:ss')}
      </div>

      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width="60%" mr={1}>
          <LinearProgress variant="determinate" value={0} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2">{"0%"}</Typography>
        </Box>
      </Box>
      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => {
            props.setActiveTimerDispatcher(true);
          }}
        >
          Start
        </Button>
        <Button className={classes.btn} variant="contained" color="secondary">
          Stop
        </Button>
      </div>
    </div>
  );
}
