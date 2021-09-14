import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {
  changeDefaultTimeAction,
  changeLongBreakAction,
  changeShortBreakAction
} from "../../Store/Actions/TimeSettingsReduser";
import {getUserSettingsManager, setUserSettingsManager} from "../AuthManager";

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

export default function SettingModal(props) {
  const prop = props.prop;
  const dispatch = useDispatch();


  const timeDefaultDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.DefaultDuration)
  const longBreakDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.LongBreakDuration)
  const shortBreakDuration = useSelector(state => state.timeSettings.settings.user.TimerSettings.ShortBreakDuration)
  // token
  // const token = useSelector (state => state.timeSettings.settings.token)
  // console.log("token", token)

  const changeDefaultTime = (currentTime) => {
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

  const [valueDefaultTime, setValueDefaultTime] = useState(
    timeDefaultDuration
  );
  const [valueShortBreak, setValueShortBreak] = useState(
    shortBreakDuration
  );
  const [valueLongBreak, setValueLongBreak] = useState(
    longBreakDuration
  );

  const [isDisabled, setIsDisabled] = useState(false);

  const [allSettings, setAllSettings] = useState({
    "alarmTrack": "string",
    "defaultDuration": valueDefaultTime,
    "longBreakDuration": longBreakDuration,
    "shortBreakDuration": valueShortBreak,
    "tickTrack": "string"
  })


  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    valueDefaultTime >= 1 ? setIsDisabled(false) : setIsDisabled(true);
    valueShortBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
    valueLongBreak >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  }, [valueDefaultTime, valueShortBreak, valueLongBreak]);

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
          changeDefaultTime(valueDefaultTime)
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
                onChange={(e) => setValueDefaultTime(e.target.value)}
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
                changeDefaultTime(valueDefaultTime)
                changeShortBreak(valueShortBreak)
                changeLongBreak(valueLongBreak)
                // api set user settings
                dispatch(setUserSettingsManager(allSettings))
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
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                props.prop.setSettingsModal(false);
                dispatch(getUserSettingsManager())
              }}
            >
              Get Settings
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
