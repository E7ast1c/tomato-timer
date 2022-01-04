export type KeyOf<T extends Record<string, unknown>> = Extract<keyof T, string>;
export const changeSettingsValue =
  <T extends Record<string, unknown>>(
  key: KeyOf<T>,
  state: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
) => (e: React.ChangeEvent<HTMLInputElement>): void => {
  setValue({
    ...state,
    [key]: +e.currentTarget.value,
  })
}
export const changeRingtoneSettingsValue =
  <T extends Record<string, unknown>>(
  key: KeyOf<T>,
  state: T,
  setValue: React.Dispatch<React.SetStateAction<T>>
) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
  setValue({
    ...state,
    [key]: e.target.value,
  })
}