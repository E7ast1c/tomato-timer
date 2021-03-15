import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Setting from "../settings";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
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
}));

export default function SettingModal(props) {
  const prop = props.prop;
  const classes = useStyles();
  const [valueInputTime, setvalueInputTime] = useState(12);

  return (
    <div>
      {/* {console.log(props)} */}
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
                // onChange={() => props.setSettings(valueInputTime)}
              />
              {/* {console.log(props.setSettings)} */}
            </form>
          </div>
          <Button variant="contained"
          onClick={() => prop.setSettingsModal(false)}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Setting valueInputTime={valueInputTime} />
    </div>
  );
}
