import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Header from "./Header";
import PropTypes from "prop-types";

import { login } from "../RESTApi";

import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "25em",
    backgroundColor: "#f2f3f4",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 5),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1.2em",
  },
  txtError: {
    margin: "0.2em",
    color: "tomato",
  },
}));

export default function LoiginModal(props) {
  const prop = props.prop;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    login(data).then((data) => {
      console.log("this response", data); // JSON data parsed by `response.json()` call
    });
  };
  // console.log(errors);

  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [values, setValues] = useState({
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  // useEffect(() => {
  //   // console.log(prop);
  // });

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
    prop.setIsLogIn(false);
  };

  // const handleLogin = async () => {
  //   login().then((data) => {
  //     console.log(data); // JSON data parsed by `response.json()` call
  //   });
  // }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={true}
        onClose={() => prop.setIsLogIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.paper}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <TextField
                id="email"
                // type={values.showPassword ? "text" : "email"}
                // value={values.password}
                className={clsx(classes.margin, classes.textField)}
                onChange={handleChange("email")}
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                    message: "massage error",
                  },
                })}
              />
              {errors.email && (
                <p className={classes.txtError}>
                  Please enter correct email, example@ya.ru
                </p>
              )}
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /(?=.{4,})/,
                      message: "error message",
                    },
                  })}
                />
                {errors.password && (
                  <p className={classes.txtError}>
                    You must enter more than 8 characters
                  </p>
                )}
              </FormControl>
              <div className={classes.btnGroup}>
                <input
                  type="submit"
                  value="Ok"
                  // onClick={() => {
                  //   login(values.email, values.password);
                  //   handleClose();
                  // }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  // onClick={() =>
                  //   handleLogin()
                  // handleClose();
                  // }
                >
                  Ok
                </Button>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

LoiginModal.propTypes = {
  prop: PropTypes.object.isRequired,
};
