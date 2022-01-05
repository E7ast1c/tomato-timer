import { createSlice } from "@reduxjs/toolkit";

import { ModalState } from "../types/ModalTypes";

export const initialState: ModalState = {
  errorModal: false,
  loginModal: false,
  registerModal: false,
  settingsModal: false,
};

export const openModal = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    toggleLoginModal: (state: ModalState) => {
      state.loginModal = !state.loginModal;
    },
    toggleRegisterModal: (state: ModalState) => {
      state.registerModal = !state.registerModal;
    },
    toggleSettingsModal: (state: ModalState) => {
      state.settingsModal = !state.settingsModal;
    },
  },
});

export default openModal.reducer;
export const {
  toggleLoginModal,
  toggleRegisterModal,
  toggleSettingsModal,
} = openModal.actions;