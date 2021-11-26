import { SignalCellular0Bar } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import ReactHowler from "react-howler";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { StyledPlayBtn } from "./MainStyles";

import signal from "../ringtone/signal.mp3"
import signal_ring from "../ringtone/signal_ring.mp3"
import signal_piano from "../ringtone/signal_piano.mp3"

const MusicButton = () => {
	const ringtone = useTypedSelector(
		(state) => state.timerSettings.UserSettings.TickTrack || signal
	);

	const [playing, setPlaying] = useState(false);
	const [volume] = useState(1.0);
	const [player, setPlayer] = useState();

	const handleOnPlay = () => setPlaying(!playing);
	const handleOnEnd = () => setPlaying(!playing);

	function handleStop() {
		player.stop();
		setPlaying(false);
	}

	const playerRef = useCallback((node) => {
		if (node !== null) {
			setPlayer(node);
		}
	});

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
			<StyledPlayBtn onClick={!playing ? handleOnPlay : handleStop} pl={!playing} />
		</div>
	);
};

export default MusicButton;
