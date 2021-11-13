import React, { useCallback, useState } from "react";
import ReactHowler from "react-howler";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { StyledPlayBtn } from "./MainStyles";

const MusicButton = () => {
  const ringtone = useTypedSelector(
    (state) => state.timerSettings.UserSettings.TickTrack
  );

  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [player, setPlayer] = useState();

  function handleOnPlay() {
    setPlaying(true);
  }

  function handleOnEnd() {
    setPlaying(false);
    // clearRAF()
  }

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
        loop={loop}
        mute={mute}
        volume={volume}
        ref={playerRef}
      />
      <StyledPlayBtn onClick={!playing ? handleOnPlay : handleStop } pl={!playing} />
    </div>
  );
};

export default MusicButton;
