import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import config from "../../configuration.json";

import { useForm } from "react-hook-form";

import { AuthRegisterManager } from "../AuthManager";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {
  toggleLoginModal,
  toggleRegisterModal,
} from "../../redux/openModalSlice";

const useStyles = makeStyles((theme) => ({
  emailMargin: {
    marginTop: "0.8em",
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
    borderRadius: 7,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 5, 4),
    [theme.breakpoints.down(`sm`)]: {
      width: "14em",
    },
    [theme.breakpoints.up(`sm`)]: {
      width: "25em",
    },
  },
}));

const Register: FC = ( ) => {
  // const prop = props.prop;
  const dispatch = useDispatch();
  const {registerModal} = useSelector((state: RootState) => state.openModal)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [values, setValues] = useState({
    login: "",
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  useEffect(() => {
    // console.log(prop);
  });

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const handleClose = () => {
    dispatch(toggleRegisterModal())
  };

  const onSubmit = async (data: any) => {
    dispatch(AuthRegisterManager(data));
    handleClose();
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={registerModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.paper}>
              <FormControl >
                <InputLabel htmlFor="login">Login</InputLabel>
                <Input
                  id="login"
                  placeholder="Login"
                  // className={clsx(classes.margin, classes.textField)}
                  // @ts-ignore
                  onChange={handleChange("Name")}
                  {...register("Name", {
                    required: true,
                    pattern: {
                      value: /[0-9a-zA-Z]{3,}/,
                      message: "massage error",
                    },
                  })}
                />
                {errors.Name && (
                  <p className={classes.txtError}>
                    Please enter more than 3 letters or numbers
                  </p>
                )}
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Input
                  id="Email"
                  placeholder="Email"
                  className={clsx(
                    // classes.margin,
                    // classes.textField,
                    classes.emailMargin
                  )}
                  // @ts-ignore
                  onChange={handleChange("email")}
                  {...register("Email", {
                    required: true,
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "massage error",
                    },
                  })}
                />
                {errors.Email && (
                  <p className={classes.txtError}>
                    Please enter correct email, example@ya.ru
                  </p>
                )}
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  // value={values.password}
                  // @ts-ignore
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
                  {...register("Password", {
                    required: true,
                    pattern: {
                      value: /(?=.{4,})/,
                      message: "error message",
                    },
                  })}
                />
                {errors.Password && (
                  <p className={classes.txtError}>
                    You must enter more than 8 characters
                  </p>
                )}
              </FormControl>
              <div className={classes.btnGroup}>
                <Button type="submit" color="primary" variant="contained">
                  Ok
                </Button>
                <Button
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

// Register.propTypes = {
//   prop: PropTypes.object.isRequired,
// };

export default Register;