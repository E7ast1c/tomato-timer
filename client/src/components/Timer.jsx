import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Clock from './Clock'


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Timer() { 
  const initial = 0
  const classes = useStyles();
  const [progress, setProgress] = React.useState(initial);
  const [clockEnabled, setClockEnabled] = useState(0)


  const start = () => {
    // console.log(clockEnabled)
    setClockEnabled(true)
  }
  // const tick = (a) => {
  //   let t 

  //   if(a){
  //     t = setInterval(() => {
  //       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 1));
  //     }, 1000); 
  //   }

  //   if (!a){
  //     clearInterval(t)
  //   }
  // }
  const stop = () => {
    setClockEnabled(0)
  }

  const pause = () => {
    // setClockEnabled(12)
  }

  return (
    <div>
    {clockEnabled && <Clock />}
      {/* <div className={classes.root}>
        <LinearProgressWithLabel value={progress} />
      </div> */}
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
          style={{"backgroundColor": "yellow"}}
          onClick={() => pause()}
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