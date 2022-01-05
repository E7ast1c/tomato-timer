import { createSlice } from "@reduxjs/toolkit";

type RingtoneInitialState = {
  play: boolean;
};

export const initialState: RingtoneInitialState = {
  play: false,
};

export const ringtone = createSlice({
  name: "ringtone",
  initialState,
  reducers: {
    togglePlayRingtone: (state: RingtoneInitialState) => {
      state.play = !state.play;
    },
  },
});

export default ringtone.reducer;
export const { togglePlayRingtone } = ringtone.actions;
