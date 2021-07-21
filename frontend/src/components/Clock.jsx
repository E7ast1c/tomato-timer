import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";



const Clock = (props) => {
  const [progress, setProgress] = useState(0);

  const DefaultDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration);
  
  const prop = props.params;
  const MIN = 0

  // change to second
  const MAX = DefaultDuration * 60


  const normalise = value => (value - MIN) * 100 / (MAX - MIN)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= MAX ? MAX : prevProgress + 1
      );
    }, 900);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="60%" mr={1}>
        <LinearProgress variant="determinate" value={normalise(progress)}/>
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(
          normalise(progress)
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

Clock.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Clock;
