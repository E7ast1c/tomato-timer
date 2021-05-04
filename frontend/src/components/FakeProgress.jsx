import React from "react";
// import PropTypes from 'prop-types';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const ViewClock = (props) => {
  const prop = props.params;

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

export default ViewClock;
