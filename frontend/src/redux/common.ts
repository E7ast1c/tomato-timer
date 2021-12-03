export interface TimerSettingsResponse {
	data: TimerSettingsState
}

export interface TimerSettingsState {
	user : UserType;
	Loading?: boolean;
	AuthFlag: boolean;
	TimerMode: string;
	TimerAction: string;
}
export interface DataSettingsType {
	// token?: string;
	user : UserType;
}

// export interface SettingsType {
// 	token?: string;
// 	user : UserType;
// }

export interface UserType {
	Email?: string;
	Name?: string;
	TimerSettings: UserSettingsType
}
export interface UserSettingsType {
	AlarmTrack?: string;
	DefaultDuration: any;
	LongBreakDuration: any;
	ShortBreakDuration: any;
	TickTrack: string;
}

export const TimerActionsTypes = {
	LOGIN_GET_SETTINGS: "LOGIN_GET_SETTINGS",
	CLEAR_SETTINGS: "CLEAR_SETTINGS",
	CHANGE_DEFAULT_TIME: "CHANGE_DEFAULT_TIME",
	CHANGE_AUTH_FLAG: "CHANGE_AUTH_FLAG",
	CHANGE_TICKTRACK: "CHANGE_TICKTRACK",
	GET_SETTINGS: "GET_SETTINGS",
	CHANGE_STATUS: "CHANGE_STATUS",
	CHANGE_TIMER_MODE: "CHANGE_TIMER_MODE",
	CHANGE_TIMER_ACTION: "CHANGE_TIMER_ACTION"
}

export enum EnumTimerMode {
	POMODORO = "POMODORO",
	LONG_BREAK = "LONG_BREAK",
	SHORT_BREAK = "SHORT_BREAK"
}

export enum EnumTimerAction {
	START = "START",
	STOP = "STOP",
	PAUSE = "PAUSE"
}

export interface LoginData {
	Email: string;
	Password: string;
}
