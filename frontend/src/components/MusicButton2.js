import React, {useCallback, useState} from 'react'
import ReactHowler from 'react-howler'
import tune from '../ringtone/signal.mp3'
import {useTypedSelector} from "../hooks/useTypedSelector";


const MusicButton2 = () => {
  const ringtone = useTypedSelector(state => state.timeSettings.settings.user.TimerSettings.TickTrack)

  const [playing, setPlaying] = useState(false)
  const [loop, setLoop] = useState(true)
  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(1.0)
  const [player, setPlayer] = useState()

  function handleOnPlay(){
    setPlaying(true)
  }
  function handleOnEnd(){
    setPlaying(false)
    // clearRAF()
  }
  function handleStop(){
    player.stop()
    setPlaying(false)
  }

  const playerRef = useCallback(node => {
    if(node !== null){
      setPlayer(node)
    }
  })

  return (
    <div className='full-control'>
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

      {!playing ?
        <button
          onClick={handleOnPlay}
        >
          Play
        </button> :
        <button onClick={handleStop}>
          Stop
        </button>
      }
    </div>
  );
};

export default MusicButton2;