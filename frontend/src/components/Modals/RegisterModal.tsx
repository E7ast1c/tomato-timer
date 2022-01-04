import React, { useState } from "react";

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
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";

import { AuthRegisterManager } from "../AuthManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleRegisterModal } from "../../redux/openModalSlice";

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
  captcha: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1.2em",
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

export default function RegisterModal() {
  const dispatch = useDispatch();
  const { registerModal } = useSelector((state: RootState) => state.openModal);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const classes = useStyles();
  const [values, setValues] = useState({
    login: "",
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleClose = () => {
    dispatch(toggleRegisterModal());
  };

  const onSubmit = async (data: any) => {
    dispatch(AuthRegisterManager(data));
    handleClose();
  };

  const fieldErrorMessage = (message: string) => (
    <p className={classes.txtError}>{message}</p>
  );

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
              <FormControl>
                <InputLabel htmlFor="login">Login</InputLabel>
                <Input
                  id="login"
                  // @ts-ignore
                  onChange={handleChange("Login")}
                  {...register("login", {
                    required: true,
                    maxLength: 12,
                    minLength: 4,
                    pattern: {
                      value: /^[a-zA-Z0-9_.-]*$/,
                      message: "",
                    },
                  })}
                />
                {errors.login?.type === "maxLength" &&
                  fieldErrorMessage("Max length 12 characters")}
                {errors.login?.type === "minLength" &&
                  fieldErrorMessage("Min length 4 characters")}
                {errors.login?.type === "pattern" &&
                  fieldErrorMessage(
                    "Login can contain only letters and numbers"
                  )}
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="Email">Email</InputLabel>
                <Input
                  id="Email"
                  // @ts-ignore
                  onChange={handleChange("email")}
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
                    minLength: 8,
                  })}
                />
                {errors.password?.type === "maxLength" &&
                  fieldErrorMessage("Max length 16 characters")}
                {errors.password?.type === "minLength" &&
                  fieldErrorMessage("Min length 8 characters")}
              </FormControl>

              <FormControl>
                <div className={classes.captcha}>
                  {process.env.REACT_APP_CAPTCHA_KEY !== "" ? (
                    <ReCAPTCHA
                      hl="en"
                      sitekey={process.env.REACT_APP_CAPTCHA_KEY || ""}
                      onChange={(v) => setCaptcha(v)}
                      onExpired={() => setCaptcha(null)}
                    />
                  ) : (
                    fieldErrorMessage(
                      "Missing required parameters: ReCAPTCHA sitekey"
                    )
                  )}
                </div>
              </FormControl>

              <div className={classes.btnGroup}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={captcha === null}
                >
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
