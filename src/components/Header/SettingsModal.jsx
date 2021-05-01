import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setLocalStorageKey } from "../settings";
import { getLocalStorageKey } from "../settings";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: '#f2f3f4',
    border: "2px solid #000",
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1.2em'
  }
}));

export default function SettingModal(props) {
  const { setSettingsModal, setCurrentDuarationTime } = props;
  console.log(props.prop);
  const classes = useStyles();
  const timeKey = "Time";
  const [valueInputTime, setvalueInputTime] = useState(
    getLocalStorageKey(timeKey)
  );

  function onSaveHandler() {
    setLocalStorageKey(timeKey, valueInputTime);
  }

  function checkBtn(){
    if (valueInputTime >= 1){
      return 
    } else {
      return disabled
    }
  }

  console.log(classes)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        // onClose={() => prop.setSettingsModal(false)}
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Setting</h2>
          <div id="transition-modal-description">
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                type="number"
                label="Enter pomidoro time"
                variant="outlined"
                onChange={(e) => setvalueInputTime(e.target.value)}
                value={valueInputTime}
              />
            </form>
          </div>
          <div className={classes.btnGroup}>
            <Button
              style={{disabled:'disabled'}}
              color='primary'
              variant="contained"
              onClick={() => {
                
                onSaveHandler();
                props.prop.setSettingsModal(false);
                props.prop.prop.setCurrentDuarationTime(valueInputTime);
              }}
            >
              Save
            </Button>
            <Button
              color='secondary'
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
