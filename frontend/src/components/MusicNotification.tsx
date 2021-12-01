import { SignalCellular0Bar } from "@material-ui/icons";
import React, { ReactNode, useCallback, useState } from "react";
import ReactHowler from "react-howler";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { StyledPlayBtn } from "./MainStyles";

import signal from "../ringtone/signal.mp3";
import signal_ring from "../ringtone/signal_ring.mp3";
import signal_piano from "../ringtone/signal_piano.mp3";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MusicNotification = () => {
  // const ringtone = useTypedSelector(
  // 	(state) => state.timerSettings.UserSettings.TickTrack || signal
  // );

  const ringtone = useSelector(
    (state: RootState) =>
      state.timerSettings.data.user.TimerSettings.TickTrack || signal
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

export default MusicNotification;
