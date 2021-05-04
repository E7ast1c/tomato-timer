import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import {register} from '../RESTApi'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "25em",
    backgroundColor: '#f2f3f4',
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 5, 4),
  },
  emailMargin: {
    marginTop: '0.8em'
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1.2em",
  }
}));

export default function Register(props) {
  const prop = props.prop;
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [values, setValues] = useState({
    login: '',
    email: '',
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  useEffect(() => {
    // console.log(prop);
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    prop.setRegisterModal(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={true}
        onClose={() => prop.setRegisterModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <div className={classes.paper}>
            <TextField
              id="login"
              placeholder="Login"
              className={clsx(classes.margin, classes.textField)}
              onChange={handleChange('login')}
              value={values.login}

            />
            <TextField
              id="email"
              placeholder="Email"
              className={clsx(classes.margin, classes.textField, classes.emailMargin)}
              onChange={handleChange('email')}
              value={values.email}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={classes.btnGroup}>
              <Button
              color='primary'
              variant='contained'
              onClick={() => {
                register(values.login, values.email, values.password)
                handleClose()
              }}
              >
                Ok
                </Button>
              <Button 
              color='secondary'
              variant='contained'
              onClick={handleClose}>Cancel</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
