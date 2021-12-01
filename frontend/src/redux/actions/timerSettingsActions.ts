import { TimerActionsTypes, EnumTimerMode, EnumTimerAction } from "../common"

export const changeAuthFlagAction = (payload: any) => ({
	type: TimerActionsTypes.CHANGE_AUTH_FLAG,
	payload,
});

export const getLoginAction = (payload: any) => ({
	type: TimerActionsTypes.LOGIN_GET_SETTINGS,
	payload,
});

export const clearUsersSettingsAction = (payload: any) => ({
	type: TimerActionsTypes.CLEAR_SETTINGS,
	payload,
});

export const changeDefaultTimeAction = (payload: any) => ({
	type: TimerActionsTypes.CHANGE_DEFAULT_TIME,
	payload,
});

export const changeTickTrackAction = (payload: any) => ({
	type: TimerActionsTypes.CHANGE_TICKTRACK,
	payload,
});

export const getSettingsAction = (payload: any) => ({
	type: TimerActionsTypes.GET_SETTINGS, payload
});

export const changeTimerAction = (payload: EnumTimerAction) => ({
	type: TimerActionsTypes.CHANGE_TIMER_ACTION,
	payload,
});

export const changeTimerModeAction = (payload: EnumTimerMode) => ({
	type: TimerActionsTypes.CHANGE_TIMER_MODE,
	payload,
});



