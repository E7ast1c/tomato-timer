import React, { ChangeEvent, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { GetRingtones, returnNameRingtone } from "../Ringtone/Ringtone";
import { MenuItem } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { toggleSettingsModal } from "../../redux/openModalSlice";
import { RootState } from "../../redux/store";
import RingtoneSelectPlayer from "../Ringtone/RingtoneSelectPlayer";
import { changeRingtoneSettingsValue, changeSettingsValue } from "../common";
import { updateTimerSettings } from "../../redux/timerSettingsSlice";
import { setSettingsThunk } from "../../redux/thunk";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "18em",
    backgroundColor: "#f2f3f4",
    border: "2px solid #000",
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 5, 3),
    borderRadius: 7,
  },
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "5em",
    },
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1.2em",
  },
  settingsTime: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function SettingModal() {
  const dispatch = useDispatch();
  const { settingsModal } = useSelector((state: RootState) => state.openModal);
  const handleClose = () => {
    dispatch(toggleSettingsModal());
  };

  const classes = useStyles();
  const {
    DefaultDuration,
    ShortBreakDuration,
    LongBreakDuration,
    TickTrack,
  } = useSelector((state: RootState) => state.timerSettings.user.TimerSettings);

  const [timerSettings, SetTimerSettings] = useState({
    DefaultDuration: DefaultDuration,
    LongBreakDuration: LongBreakDuration,
    ShortBreakDuration: ShortBreakDuration,
    TickTrack: TickTrack,
  });

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={settingsModal}
        onClose={handleClose}
        onSubmit={() => {
          dispatch(toggleSettingsModal());
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Settings</h2>
          <div
            id="transition-modal-description"
            className={classes.settingsTime}
          >
            <h3>Enter pomodoro time</h3>
            <TextField
              type="number"
              className={classes.input}
              id="outlined-basic"
              label="Minutes"
              variant="outlined"
              onChange={changeSettingsValue(
                "DefaultDuration",
                timerSettings,
                SetTimerSettings
              )}
              value={timerSettings.DefaultDuration}
            />
          </div>
          <div
            id="transition-modal-description"
            className={classes.settingsTime}
          >
            <h3>Enter Short Break</h3>
            <TextField
              type="number"
              className={classes.input}
              id="outlined-basic"
              label="Minutes"
              variant="outlined"
              onChange={changeSettingsValue(
                "ShortBreakDuration",
                timerSettings,
                SetTimerSettings
              )}
              value={timerSettings.ShortBreakDuration}
            />
          </div>
          <div
            id="transition-modal-description"
            className={classes.settingsTime}
          >
            <h3>Enter Long Break</h3>
            <TextField
              type="number"
              className={classes.input}
              id="outlined-basic"
              label="Minutes"
              variant="outlined"
              onChange={changeSettingsValue(
                "LongBreakDuration",
                timerSettings,
                SetTimerSettings
              )}
              value={timerSettings.LongBreakDuration}
            />
          </div>
          <div className={classes.settingsTime}>
            <h3>Choose ringtone</h3>
            <div style={{ alignSelf: "center" }}>
              <RingtoneSelectPlayer
                sound={returnNameRingtone(timerSettings.TickTrack)}
              />
            </div>

            <TextField
              variant="outlined"
              className={classes.formControl}
              onChange={changeRingtoneSettingsValue(
                "TickTrack",
                timerSettings,
                SetTimerSettings
              )}
              select
              label="Ringtone"
              value={timerSettings.TickTrack}
            >
              {GetRingtones().map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.btnGroup}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                dispatch(toggleSettingsModal());
                dispatch(setSettingsThunk(timerSettings));
                dispatch(updateTimerSettings(timerSettings));
              }}
            >
              Save
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
