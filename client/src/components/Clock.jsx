import React, { useState, useEffect } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Clock = (props) => {
  const [progress, setProgress] = useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 1));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="60%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" >{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  )


  // LinearProgressWithLabel.propTypes = {
  //   /**
  //    * The value of the progress indicator for the determinate and buffer variants.
  //    * Value between 0 and 100.
  //    */
  //   value: PropTypes.number.isRequired,
  // };

};

export default Clock
