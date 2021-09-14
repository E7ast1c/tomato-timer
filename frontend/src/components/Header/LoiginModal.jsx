import React, {useState} from "react";
import clsx from "clsx";

import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import config from "../../configuration.json";


import {AuthLoginManager} from "../AuthManager";

import {useForm} from "react-hook-form";

import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f3f4",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5, 5),
    [theme.breakpoints.down(`sm`)]: {
      width: '14em',
    },
    [theme.breakpoints.up(`sm`)]: {
      width: '25em'
    }
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

  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    dispatch(AuthLoginManager(data))
    handleClose();
  };
  const handleClose = () => {
    prop.setIsLoginModal(false);
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={true}
        onClose={() => prop.setIsLoginModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.paper}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
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
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
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
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
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
