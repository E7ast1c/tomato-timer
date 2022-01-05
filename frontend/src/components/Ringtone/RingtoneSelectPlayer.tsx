import ReactHowler from "react-howler";
import React, { useCallback, useState } from "react";
import { StyledSound } from "./RingtoneStyle";

import PropTypes from "prop-types";

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
      <StyledSound vis={true} onClick={playToggle} dark={true} />
    </div>
  );
};

RingtoneSelectPlayer.propTypes = {
  sound: PropTypes.string.isRequired,
};


export default RingtoneSelectPlayer;
