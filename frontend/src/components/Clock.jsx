import React, { useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const Clock = (props) => {
  const prop = props.params;

  useEffect(() => {
    const timer = setInterval(() => {
      prop.setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 1
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="60%" mr={1}>
        <LinearProgress variant="determinate" value={prop.progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(
          prop.progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

Clock.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Clock;
