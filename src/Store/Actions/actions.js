import { PAUSE_TIMER, START_TIMER, STOP_TIMER } from "./actionsTypes"

export function startTimer(type){
  return{
    type: CHANGE_TIMER_ACTION,
    value: type,
  }
}

export const CHANGE_TIMER_ACTION = 'CHANGE_TIMER_ACTION'

