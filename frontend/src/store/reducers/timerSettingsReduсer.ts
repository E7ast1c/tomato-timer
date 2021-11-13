import { TimerActionsTypes, EnumTimerMode, EnumTimerAction } from "../common"

const timerSettings = {
	AuthFlag: false,
	TimerMode: EnumTimerMode.POMODORO,
	TimerAction: EnumTimerAction.STOP,
	UserSettings: {
		DefaultDuration: 30,
		LongBreakDuration: 20,
		ShortBreakDuration: 1,
		TickTrack: "",
	}
}

export const timerSettingsReduсer = (state = timerSettings, action: any) => {
	switch (action.type) {
		case TimerActionsTypes.CHANGE_TIMER_ACTION:
			return { ...state, TimerAction: action.payload };
		case TimerActionsTypes.CHANGE_TIMER_MODE:
			return { ...state, TimerMode: action.payload };
		default:
			return state
	};
};


	 //   // case TimerActionsTypes.CHANGE_AUTH_FLAG:


    //   return { ...state, authFlag: (state.authFlag = action.payload) };
    // case TTimerActionsTypes.LOGIN_GET_SETTINGS:
    //   return { ...state, settings: { ...state.settings, ...action.payload } };
    // case TimerActionsTypes.CHANGE_DEFAULT_TIME:
	//   return {
    //     ...state,
 //     settings: {
    //       ...state.settings,
    //       user: {
    //         ...state.settings.user,
    //         TimerSettings: {
    //           ...state.settings.user.TimerSettings,
    //           DefaultDuration: (state.settings.user.TimerSettings.DefaultDuration =
    //             action.payload),
    //         },
    //       },
    //     },
    //   };
    // case TimerActionsTypes.CHANGE_LONG_BREAK:
    //   // if (state.settings.user.TimerSettings.LongBreakDuration) {
    //   return {
    //     ...state,
    //     settings: {
    //       ...state.settings,
    //       user: {
    //         ...state.settings.user,
    //         TimerSettings: {
    //           ...state.settings.user.TimerSettings,
    //           LongBreakDuration: (state.settings.user.TimerSettings.LongBreakDuration =
    //             action.payload),
    //         },
    //       },
    //     },
    //   };
    // // }
    // case TimerActionsTypes.CHANGE_SHORT_BREAK:
    //   // if (state.settings.user.TimerSettings.ShortBreakDuration) {
    //   return {
    //     ...state,
    //     settings: {
    //       ...state.settings,
    //       user: {
    //         ...state.settings.user,
    //         TimerSettings: {
    //           ...state.settings.user.TimerSettings,
    //           ShortBreakDuration: (state.settings.user.TimerSettings.ShortBreakDuration =
    //             action.payload),
    //         },
    //       },
    //     },
    //   };
    // // }
    // case TimerActionsTypes.CLEAR_SETTINGS:
    //   return { ...state, settings: action.payload };
    // case TimerActionsTypes.CHANGE_TICKTRACK:
    //   return {
    //     ...state,
    //     settings: {
    //       ...state.settings,
    //       user: {
    //         ...state.settings.user,
    //         TimerSettings: {
    //           ...state.settings.user.TimerSettings,
    //           TickTrack: (state.settings.user.TimerSettings.TickTrack =
    //             action.payload),
    //         },
    //       },
    //     },
    //   };


    // case TimerActionsTypes.GET_SETTINGS:
    //   return {
    //     ...state,
    //     settings: {
    //       ...state.settings,
    //       user: {
    //         ...state.settings.user,
    //         TimerSettings: {
    //           ...state.settings.user.TimerSettings,
    //           ...action.payload,
    //         },
    //       },
    //     },
    //   };
		// 	case TimerActionsTypes.CHANGE_TO_POMODORO:
		// 		return {
		// 			...state,
		// 			pomodoro: (state.pomodoro = action.payload),
		// 			shortBreak: (state.shortBreak = false),
		// 			longBreak: (state.longBreak = false),
		// 		};
		// 	case TimerActionsTypes.CHANGE_TO_SHORT_BREAK:
		// 		return {
		// 			...state,
		// 			pomodoro: (state.pomodoro = false),
		// 			shortBreak: (state.shortBreak = action.payload),
		// 			longBreak: (state.longBreak = false),
		// 		};
		// 	case TimerActionsTypes.CHANGE_TO_LONG_BREAK:
		// 		return {
		// 			...state,
		// 			pomodoro: (state.pomodoro = false),
		// 			shortBreak: (state.shortBreak = false),
		// 			longBreak: (state.longBreak = action.payload),
		// 		};

