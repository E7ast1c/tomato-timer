import { createSlice } from '@reduxjs/toolkit'

import {
  ModalAction,
  ModalActionType,
  ModalState,
} from "../types/ModalTypes";

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
      state.loginModal = !state.loginModal
    },
    toggleRegisterModal: (state: ModalState) => {
      state.registerModal = !state.registerModal
    },
    toggleSettingsModal: (state: ModalState) => {
       state.settingsModal = !state.settingsModal
    }
  }
})

export default openModal.reducer
export const {toggleLoginModal, toggleRegisterModal, toggleSettingsModal} = openModal.actions

// export const openModal = (
//   state = initialState,
//   action: ModalAction
// ): ModalState => {
//   switch (action.type) {
//     case ModalActionType.CHANGE_LOGIN_MODAL:
//       return { ...state, loginModal: action.payload };
//     case ModalActionType.CHANGE_ERROR_MODAL:
//       return { ...state, errorModal: action.payload };
//     case ModalActionType.CHANGE_REGISTER_MODAL:
//       return { ...state, registerModal: action.payload };
//     case ModalActionType.CHANGE_SETTINGS_MODAL:
//       return { ...state, settingsModal: action.payload };
//     default:
//       return state;
//   }
// };
//
// export const changeErrorModal = (payload: boolean) => ({
//   type: ModalActionType.CHANGE_ERROR_MODAL,
//   payload,
// });
