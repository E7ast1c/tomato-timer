import ReactHowler from "react-howler";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { ReactNode, useCallback, useState } from "react";

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
	const ringtone = useSelector(
		(state: RootState) =>
			state.timerSettings.user.TimerSettings.TickTrack || GetDefaultRingtone()
	);
	const [playing, setPlaying] = useState(false);
	const [volume] = useState(1.0);
	const [player, setPlayer] = useState<any>();

	const handleOnPlay = () => setPlaying(!playing);
	const handleOnEnd = () => setPlaying(!playing);

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

	function PlayRingtone(): void {
		setPlaying(!playing);
	}	

	return (
		<div className="full-control">
			<ReactHowler
				src={[ringtone]}
				playing={playing}
				onPlay={handleOnPlay}
				onEnd={handleOnEnd}
				volume={volume}
				ref={playerRef}
			/>
			<StyledPlayBtn
				onClick={!playing ? handleOnPlay : handleStop}
				pl={!playing}
			/>
		</div>
	);
};

export default RingtonePlayer;
