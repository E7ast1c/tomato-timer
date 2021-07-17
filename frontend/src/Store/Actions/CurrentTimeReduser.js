const defStore = {
  time: 1,
}

const CHANGE_TIME = "CHANGE_TIME";

export const currentTimeResucer = (state = defStore, action) => {
  switch (action.type){
    case CHANGE_TIME: 
      return {...state, time : state.time + action.payload}
    default: 
      return state;
  }
}

export const currentTimeAction = (payload) => ({type: CHANGE_TIME, payload})