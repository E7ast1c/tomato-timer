import React from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf' // requestAnimationFrame polyfill
// import Button from '../components/Button'
import tune from '../ringtone/signal_piano.mp3'

class FullControl extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      playing: false,
      loaded: false,
      loop: true,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    // this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  // componentWillUnmount () {
  //   this.clearRAF()
  // }

  handleToggle () {
    this.setState({
      playing: !this.state.playing
    })
  }

  // handleOnLoad () {
  //   this.setState({
  //     loaded: true,
  //     duration: this.player.duration()
  //   })
  // }

  handleOnPlay () {
    this.setState({
      playing: true
    })
    // this.renderSeekPos()
  }

  handleOnEnd () {
    this.setState({
      playing: false
    })
    // this.clearRAF()
  }

  handleStop () {
    this.player.stop()
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    // this.renderSeekPos()
  }




  // clearRAF () {
  //   raf.cancel(this._raf)
  // }

  render () {
    return (
      <div className='full-control'>
        <ReactHowler
          src={[tune]}
          playing={this.state.playing}
          // onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
        />



        <button onClick={this.handleToggle}>
          {(this.state.playing) ? 'Pause' : 'Play'}
        </button>
        <button onClick={this.handleStop}>
          Stop
        </button>
      </div>
    )
  }
}

export default FullControl