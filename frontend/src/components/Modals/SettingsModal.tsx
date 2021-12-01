import React, { ChangeEvent, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import signal_bam from "../../ringtone/signal.mp3";
import signal_piano from "../../ringtone/signal_piano.mp3";
import signal_ring from "../../ringtone/signal_ring.mp3";

import { getUserSettingsManager, setUserSettingsManager } from "../AuthManager";
import { MenuItem } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  changeDefaultTimeAction,
  changeTickTrackAction,
} from "../../redux/actions/timerSettingsActions";

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

export default function SettingModal(props: any) {
  const prop = props.prop;
  const dispatch = useDispatch();

  // const changeDefaultTime = (currentTime: number) => {
  //   dispatch(changeDefaultTimeAction(+currentTime));
  // };

  // const changeLongBreak = (currentTime: number) => {
  //   dispatch(changeLongBreakAction(+currentTime));
  // };

  // const changeShortBreak = (currentTime: number) => {
  //   dispatch(changeShortBreakAction(+currentTime));
  // };

  const classes = useStyles();
  const timeKey = "defDuaration";

  const [valueDefaultTime, setValueDefaultTime] = useState(0);
  const [valueShortBreak, setValueShortBreak] = useState(0);
  const [valueLongBreak, setValueLongBreak] = useState(0);

  // const [isDisabled, setIsDisabled] = useState(false);

  // //temporary solution
  // const [allSettings, setAllSettings] = useState({
  //   alarmTrack: "string",
  //   defaultDuration: valueDefaultTime,
  //   longBreakDuration: longBreakDuration,
  //   shortBreakDuration: valueShortBreak,
  //   tickTrack: "string",
  // });

  const [ringtone, setRingtone] = useState("");
  //test
  //   useEffect(() => {
  //     dispatch(changeTickTrackAction(ringtone))
  //   }, [])
  //   //

  const changeRingtone = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRingtone(event.target.value);
  };

  const optionRingtone = [
    {
      value: "none",
      label: "none",
    },
    {
      value: signal_piano,
      label: "piano",
    },
    {
      value: signal_ring,
      label: "ring",
    },
    {
      value: signal_bam,
      label: "bam",
    },
  ];

  // const changeRingtone = (event) => {
  //
  // }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  // useEffect(() => {
  //   valueDefaultTime >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  //   valueShortBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  //   valueLongBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  //   setAllSettings({
  //     alarmTrack: "string",
  //     defaultDuration: +valueDefaultTime,
  //     longBreakDuration: +valueLongBreak,
  //     shortBreakDuration: +valueShortBreak,
  //     tickTrack: "string",
  //   });
  // }, [valueDefaultTime, valueShortBreak, valueLongBreak]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={() => props.prop.setSettingsModal(false)}
        onSubmit={() => {
          props.prop.setSettingsModal(false);
          // changeDefaultTime(valueDefaultTime);
          // changeLongBreak(valueLongBreak);
          // changeShortBreak(valueShortBreak);
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
            <form
              // onSubmit={handleSubmit(onSubmit)}
              // className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValueDefaultTime(0)
                }
                value={valueDefaultTime}
              />
            </form>
          </div>
          <div
            id="transition-modal-description"
            className={classes.settingsTime}
          >
            <h3>Enter Short Break</h3>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              // className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setValueShortBreak(0)}
                value={valueShortBreak}
              />
            </form>
          </div>
          <div
            id="transition-modal-description"
            className={classes.settingsTime}
          >
            <h3>Enter Long Break</h3>
            <form
              // onSubmit={handleSubmit(onSubmit)}
              // className={classes.root}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setValueLongBreak(0)}
                value={valueLongBreak}
              />
            </form>
          </div>
          <div className={classes.settingsTime}>
            <h3>Choose ringtone</h3>
            <TextField
              variant="outlined"
              className={classes.formControl}
              onChange={(
                event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => changeRingtone(event)}
              select
              label="Ringtone"
              value={ringtone}
            >
              {optionRingtone.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={classes.btnGroup}>
            <Button
              // disabled={isDisabled}
              color="primary"
              variant="contained"
              onClick={() => {
                prop.setSettingsModal(false);
                // changeDefaultTime(valueDefaultTime);
                // changeShortBreak(valueShortBreak);
                // changeLongBreak(valueLongBreak);
                dispatch(changeTickTrackAction(ringtone));

                // api set user settings
                // dispatch(setUserSettingsManager(allSettings));
              }}
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                props.prop.setSettingsModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

SettingModal.propTypes = {
  prop: PropTypes.object.isRequired,
};
