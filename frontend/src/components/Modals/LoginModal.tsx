import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/thunk";
import { toggleLoginModal } from "../../redux/openModalSlice";
import { RootState } from "../../redux/store";

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
    borderRadius: 7,
    [theme.breakpoints.down(`sm`)]: {
      width: "14em",
    },
    [theme.breakpoints.up(`sm`)]: {
      width: "25em",
    },
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

export default function LoginModal() {
  const { loginModal } = useSelector((state: RootState) => state.openModal);
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

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onSubmit = async (data: any) => {
    dispatch(loginThunk(data));
    handleClose();
  };
  const handleClose = () => {
    dispatch(toggleLoginModal());
  };

  const fieldErrorMessage = (message: string) => (
    <p className={classes.txtError}>{message}</p>
  );

  return (
    <div>
      <Modal
        className={classes.modal}
        open={loginModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.paper}>
              <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  // @ts-ignore
                  onChange={handleChange("Email")}
                  type="text"
                  {...register("email", {
                    required: true,
                    maxLength: 320,
                    minLength: 6,
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "",
                    },
                  })}
                />
                {errors.email?.type === "maxLength" &&
                  fieldErrorMessage("Max length 320 characters")}
                {errors.email?.type === "minLength" &&
                  fieldErrorMessage("Min length 6 characters")}
                {errors.email?.type === "pattern" &&
                  fieldErrorMessage("Enter correct email, example@ya.ru")}
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  // @ts-ignore
                  onChange={handleChange("Password")}
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
                    maxLength: 16,
                    minLength: 6,
                  })}
                />
                {errors.password?.type === "maxLength" &&
                  fieldErrorMessage("Max length 16 characters")}
                {errors.password?.type === "minLength" &&
                  fieldErrorMessage("Min length 6 characters")}
              </FormControl>
              <div className={classes.btnGroup}>
                <Button type="submit" color="primary" variant="contained">
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