import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Clock from './Clock'
import ViewClock from './ViewClock'


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Timer() {
  const initial = 0
  const classes = useStyles();
  const [clockEnabled, setClockEnabled] = useState(false)
  const [pauseClock, setPauseClock] = useState(false)
  const [progress, setProgress] = useState(1);


  const start = () => {
    setClockEnabled(true)
    setPauseClock(false)
  }

  const stop = () => {
    setProgress(0)
    setClockEnabled(false)
  }

  return (
    <div>
      { !clockEnabled && 
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width="60%" mr={1}>
          <LinearProgress variant="determinate" value={0} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" >{"0%"}</Typography>
        </Box>
      </Box>}
      {clockEnabled && !pauseClock && <Clock params={{ progress, setProgress }} />}
      {clockEnabled && pauseClock && <ViewClock params={{ progress }} />}
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => start()}
        >
          Start
        </Button>
        <Button
          variant="contained"
          style={{ "backgroundColor": "yellow" }}
          onClick={() => setPauseClock(true)}
        >
          Pause
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => stop()}
        >
          Stop
        </Button>
      </div>
    </div>
  );
}