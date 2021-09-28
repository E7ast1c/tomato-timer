export enum ModalActionType {
  CHANGE_ERROR_MODAL = 'CHANGE_ERROR_MODAL',
  CHANGE_LOGIN_MODAL = 'CHANGE_LOGIN_MODAL',
  CHANGE_REGISTER_MODAL = 'CHANGE_LOGIN_MODAL',
  CHANGE_SETTINGS_MODAL = 'CHANGE_SETTINGS_MODAL',
}

interface ChangeErrorModal {
  type: ModalActionType.CHANGE_ERROR_MODAL;
  payload: boolean;
}
interface ChangeLoginModal {
  type: ModalActionType.CHANGE_LOGIN_MODAL;
  payload: boolean;
}
interface ChangeRegisterModal {
  type: ModalActionType.CHANGE_REGISTER_MODAL;
  payload: boolean;
}
interface ChangeSettingsModal {
  type: ModalActionType.CHANGE_SETTINGS_MODAL;
  payload: boolean;
}

export type ModalAction = ChangeErrorModal | ChangeLoginModal | ChangeRegisterModal | ChangeSettingsModal

export interface ModalState {
  errorModal: boolean;
  loginModal: boolean;
  registerModal: boolean;
  settingsModal: boolean;
}