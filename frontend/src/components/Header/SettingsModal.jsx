import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setLocalStorageKey } from "../settings";
import { getLocalStorageKey } from "../settings";

import { useForm } from "react-hook-form";

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
  const classes = useStyles();
  const timeKey = "Time";
  const [valueInputTime, setvalueInputTime] = useState(
    getLocalStorageKey(timeKey)
  );
  const [isDisabled, setIsDisabled] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    valueInputTime >= 1 ? setIsDisabled(false) : setIsDisabled(true);
  }, [valueInputTime]);

  function onSaveHandler() {
    setLocalStorageKey(timeKey, valueInputTime);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={() => props.prop.setSettingsModal(false)}
        // onSubmit={(e) => e.preventDefault()}

        onSubmit={() => {
          onSaveHandler();
          props.prop.setSettingsModal(false);
          props.prop.setCurrentDuarationTime(valueInputTime);
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
            <h3>Enter pomidoro time</h3>
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
                onChange={(e) => setvalueInputTime(e.target.value)}
                value={valueInputTime}
              />
            </form>
          </div>
          <div className={classes.btnGroup}>
            <Button
              disabled={isDisabled}
              color="primary"
              variant="contained"
              onClick={() => {
                onSaveHandler();
                props.prop.setSettingsModal(false);
                props.prop.setCurrentDuarationTime(valueInputTime);
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
      {}
    </div>
  );
}
