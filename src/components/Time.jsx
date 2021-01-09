import React from 'react'
import Timer from 'react-compound-timer'

export default function Time(){
  return(
    <div>
    <Timer
    initialTime={1500000}
    direction="backward"
    startImmediately={true}
>
    {/* {({ start, resume, pause, stop, reset, timerState }) => ( */}
        <React.Fragment>
            <div>
                <Timer.Minutes />: 
                <Timer.Seconds/> 
            </div>
            {/* <div>{timerState}</div> */}
            <br />
        </React.Fragment>
    {/* // )} */}
</Timer>
    </div>
  )
}