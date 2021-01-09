import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Clock from './Clock'
import ViewClock from './ViewClock'
import Time from './Time'

import { startTimer } from '../Store/Actions/actions'
import store from '../Store/store'
import { connect } from 'react-redux'




const useStyles = makeStyles({
  timer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '32vh'
  },
  btn: {
    margin: '.2em'
  }
});

function Timer(props) {
  const classes = useStyles();
  const [clockEnabled, setClockEnabled] = useState(false)
  const [pauseClock, setPauseClock] = useState(false)
  const [progress, setProgress] = useState(1);

  // const start = () => {
  //   setClockEnabled(true)
  //   setPauseClock(false)
  // }

  const stop = () => {
    setProgress(0)
    setClockEnabled(false)
  }

  const timerStatus = {
    START:"START",
    STOP:"STOP"
  }

  const start = (e) => {
    e.preventDefault()
    store.dispatch(startTimer(timerStatus.START))
  }

  // const i = props.start.value
  // console.log(props.start.value + Date.now());
  return (
    <div className={classes.timer}> 
    <Time/>
      {/* { !clockEnabled && 
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width="60%" mr={1}>
          <LinearProgress variant="determinate" value={0} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" >{"0%"}</Typography>
        </Box>
      </Box>} */}
      { props.timer.value === timerStatus.START && !pauseClock && <Clock params={{ progress, setProgress }} />}
      {/* {clockEnabled && pauseClock && <ViewClock params={{ progress }} />} */}
      <div>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          // onClick={() => start()}
          onClick={start}
        
        >
          Start
        </Button>
        <Button
          className={classes.btn}
          variant="contained"
          style={{ "backgroundColor": "yellow" }}
          onClick={() => setPauseClock(true)}
        >
          Pause
        </Button>
        <Button
          className={classes.btn}
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

const mapStateToProps = function(state) {
  return {
    timer: state.timer
  }
}

export default connect(mapStateToProps)(Timer);

