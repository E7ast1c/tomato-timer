import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { RootState } from "../../redux/store";
import { GetDefaultRingtone } from "./Ringtone"
import { StyledSound } from "./RingtoneStyle"
import React, { Component }  from 'react';

import PropTypes from "prop-types";
import { togglePlayRingtone } from "../../redux/ringtoneSlice";

const RingtoneSelectPlayer = (props: any) => {
	const [player, setPlayer] = useState<any>();
	const [playing, setPlaying] = useState<boolean>(false);

	const volume: number = 1.0;

	const playToggle = () => setPlaying(!playing);
	const playerRef = useCallback(
		(node: any) => {
			if (node !== null) {
				setPlayer(node);
			}
		},
		[player]
	);

	return (
		<div>
			<ReactHowler
				src={[props.sound]}
				playing={playing}
				onEnd={playToggle}
				volume={volume}
				ref={playerRef}
			/>
			<StyledSound
				onClick={playToggle}
				dark={true}
			/>
		</div>
	);
};

RingtoneSelectPlayer.propTypes = {
  sound: PropTypes.string.isRequired,
};


export default RingtoneSelectPlayer;
