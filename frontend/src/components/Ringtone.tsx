import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import React, { ReactNode, useCallback, useState } from "react";
import { RootState } from "../redux/store";

import { togglePlayRingtone } from "../redux/ringtoneSlice";
import { StyledPlayBtn } from "./MainStyles";

import signal_bam from "../ringtone/signal.mp3";
import signal_piano from "../ringtone/signal_piano.mp3";
import signal_ring from "../ringtone/signal_ring.mp3";

type Ringtone = {
		readonly value: string;
		readonly label: string;
		readonly priority: number;
	};

const DefaultRingtoneArray: Ringtone[] = [
	{
		value: signal_piano,
		label: "piano",
		priority: 0
	},
	{
		value: signal_ring,
		label: "ring",
		priority: 1
	},
	{
		value: signal_bam,
		label: "bam",
		priority: 2
	},
];

export const GetRingtones = (): Ringtone[] => DefaultRingtoneArray;

export const GetDefaultRingtone = (): string => DefaultRingtoneArray.find(r => r.priority == 0)!.value;


const RingtonePlayer = () => {
	const dispatch = useDispatch();

	const { play } = useSelector((state: RootState) => state.ringtone)
	const ringtone = useSelector(
		(state: RootState) =>
			state.timerSettings.user.TimerSettings.TickTrack || GetDefaultRingtone()
	);

	const [playing, setPlaying] = useState(false);
	const [volume] = useState(1.0);
	const [player, setPlayer] = useState<any>();

	const playToggle = () => dispatch(togglePlayRingtone());
	// const handleOnEnd = () => setPlaying(!playing);

	function handleStop() {
		player.stop();
		setPlaying(false);
	}

	const playerRef = useCallback(
		(node: any) => {
			if (node !== null) {
				setPlayer(node);
			}
		},
		[player]
	);

	return (
		<div className="full-control">
			<ReactHowler
				src={[ringtone]}
				playing={play}
				// onPlay={playToggle}
				// onEnd={playToggle}
				volume={volume}
				ref={playerRef}
			/>
			<StyledPlayBtn
				onClick={playToggle}
				pl={!play}
			/>
		</div>
	);
};

export default RingtonePlayer;
