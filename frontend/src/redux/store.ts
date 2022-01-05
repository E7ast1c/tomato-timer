import { configureStore } from "@reduxjs/toolkit";
import { timerSettings } from "./timerSettingsSlice";
import { openModal } from "./openModalSlice";
import { ringtone } from "./ringtoneSlice";

const store = configureStore({
  reducer: {
    timerSettings: timerSettings.reducer,
    openModal: openModal.reducer,
    ringtone: ringtone.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
