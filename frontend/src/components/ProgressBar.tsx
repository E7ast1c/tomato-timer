import PropTypes from 'prop-types';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { Component }  from 'react';

const ProgessBar = (props: any): JSX.Element => {
	const earlyDate: string = "1970-01-01Z00:00:00:000";

	// gets current sec min remaning time, all duration
	// return actual progres in percent
	function calcProgress(): number {
		const act: Date = new Date(earlyDate);
		act.setSeconds(props.seconds)
		act.setMinutes(props.minutes)

		const max: Date = new Date(earlyDate);
		max.setSeconds(props.duration * 60)

		const min: Date = new Date(earlyDate)

		return rangeToPercent(act.getTime(), max.getTime(), min.getTime())
	}

	function rangeToPercent(act: number, min: number, max: number): number {
		return Math.round(((act - min) / (max - min)) * 100);
	}

	return (
		<Box display="flex" alignItems="center" justifyContent="center">
			<Box width="50%">
				<LinearProgress variant="determinate" value={calcProgress()} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2">{`${calcProgress()}%`}</Typography>
			</Box>
		</Box>
	);
};

ProgessBar.propTypes = {
	duration: PropTypes.number.isRequired,
	minutes: PropTypes.number.isRequired,
	seconds: PropTypes.number.isRequired,
};

export default ProgessBar;
