import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import { setLocalStorageKey } from "../LocalStorageManager";
import { getLocalStorageKey } from "../LocalStorageManager";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeDefaultTimeAction, changeLongBreakAction, changeShortBreakAction } from "../../Store/Actions/TimeSettingsReduser";

const useStyles = makeStyles((theme) => ({
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
  },
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
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
  input: {
    width: "5em",
  },
}));

export default function SettingModal(props) {
  const prop = props.prop;
  const dispatch = useDispatch();


  const timeDefultDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)
  const longBreakDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.LongBreakDuration)
  const shortBreakDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.ShortBreakDuration)


  const changeDefultTime = (currentTime) => {
    dispatch(changeDefaultTimeAction(+currentTime))
  }

  const changeLongBreak = (currentTime) => {
    dispatch(changeLongBreakAction(+currentTime))
  }

  const changeShortBreak = (currentTime) => {
    dispatch(changeShortBreakAction(+currentTime))
  }


  const classes = useStyles();
  const timeKey = "defDuaration";

  const [valueDefultTime, setValueDefultTime] = useState(
    timeDefultDuration
  );
  const [valueShortBreak, setValueShortBreak] = useState(
    shortBreakDuration
  );
  const [valueLongBreak, setValueLongBreak] = useState(
    longBreakDuration
  );

  const [isDisabled, setIsDisabled] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    valueDefultTime >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  }, [valueDefultTime]);
  useEffect(() => {
    valueShortBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  }, [valueShortBreak]);
  useEffect(() => {
    valueLongBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  }, [valueLongBreak]);

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
          changeDefultTime(valueDefultTime)
          changeLongBreak(valueLongBreak)
          changeShortBreak(valueShortBreak)

        }}
        onClick={(e) => e.preventDefault()}
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
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              {/* <input {...register("age", { min: 18, max: 99 })} />
              {errors.age && (
                <p>You Must be older then 18 and younger then 99 years old</p>
              )} */}
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(e) => setValueDefultTime(e.target.value)}
                value={valueDefultTime}
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
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              {/* <input {...register("age", { min: 18, max: 99 })} />
              {errors.age && (
                <p>You Must be older then 18 and younger then 99 years old</p>
              )} */}
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(e) => setValueShortBreak(e.target.value)}
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
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              {/* <input {...register("age", { min: 18, max: 99 })} />
              {errors.age && (
                <p>You Must be older then 18 and younger then 99 years old</p>
              )} */}
              <TextField
                type="number"
                className={classes.input}
                id="outlined-basic"
                label="Minutes"
                variant="outlined"
                onChange={(e) => setValueLongBreak(e.target.value)}
                value={valueLongBreak}
              />
            </form>
          </div>
          <div className={classes.btnGroup}>
            <Button
              disabled={isDisabled}
              color="primary"
              variant="contained"
              onClick={() => {
                prop.setSettingsModal(false);
                changeDefultTime(valueDefultTime)
                changeShortBreak(valueShortBreak)
                changeLongBreak(valueLongBreak)
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
