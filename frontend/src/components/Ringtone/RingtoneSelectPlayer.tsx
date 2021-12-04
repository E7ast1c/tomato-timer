import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { RootState } from "../../redux/store";
import { GetDefaultRingtone } from "./Ringtone"
import { StyledSound } from "./RingtoneStyle"

import { togglePlayRingtone } from "../../redux/ringtoneSlice";

const RingtoneSelectPlayer = () => {
	const dispatch = useDispatch();
	const { play } = useSelector((state: RootState) => state.ringtone);
	const ringtone = useSelector((state: RootState) =>
		state.timerSettings.user.TimerSettings.TickTrack || GetDefaultRingtone());

	const [player, setPlayer] = useState<any>();
	const volume: number = 1.0;

	const playToggle = () => dispatch(togglePlayRingtone());

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
				src={[ringtone]}
				playing={play}
				onEnd={playToggle}
				volume={volume}
				ref={playerRef}
			/>
			<StyledSound
				onClick={playToggle}
				white={false}
			/>
		</div>
	);
};

export default RingtoneSelectPlayer;
