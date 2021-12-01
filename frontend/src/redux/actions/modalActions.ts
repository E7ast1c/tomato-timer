import { createSlice } from '@reduxjs/toolkit'

import {
  ModalAction,
  ModalActionType,
  ModalState,
} from "../../types/ModalTypes";

export const initialState: ModalState = {
  errorModal: false,
  loginModal: false,
  registerModal: false,
  settingsModal: false,
};

const openModalSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {

  }
})

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
