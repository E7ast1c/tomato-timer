import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import Register from "../Modals/RegisterModal";
import SettingModal from "../Modals/SettingsModal";
import LoiginModal from "../Modals/LoginModal";
import { clearLocalStorage, getUserName } from "../LocalStorageManager";

import { useDispatch, useSelector } from "react-redux";
import {
  changeAuthFlagAction,
  clearUsersSettingsAction,
} from "../../redux/actions/timerSettingsActions";
import { RootState } from "../../redux/store";
import {
  toggleLoginModal,
  toggleRegisterModal,
  toggleSettingsModal,
} from "../../redux/openModalSlice";
import { clearTimerSettingsState } from "../../redux/timerSettingsSlice";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid `,
    display: "flex",
    // justifyContent: "space-between",
  },
  toolbarButton: {
    color: "white",
    borderColor: "white",
    marginLeft: "1em",
  },
  toolbarIcon: {
    marginLeft: ".1em",
    marginRight: ".1em",
  },
  settingsButton: {
    margin: "0 auto 0 0 ",
    color: "white",
    borderColor: "white",
    marginLeft: "1em",
  },
  toolbarTitle: {
    flex: 1,
    [theme.breakpoints.down(`sm`)]: {
      display: "none",
    },
    [theme.breakpoints.up(`sm`)]: {
      display: "block",
    },
  },
  toolbarSecondary: {
    overflowX: "auto",
  },
  toolbarLink: {
    flexShrink: 0,
  },
  authButton: {
    display: "flex",
  },
  userName: {
    fontSize: "1em",
    alignSelf: "center",
  },
}));

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();
  const title = "Tomato timer";
  const user = "user";

  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  // test
  const {AuthFlag} = useSelector((state: RootState) => state.timerSettings)
  const {registerModal, settingsModal, loginModal} = useSelector((state: RootState) => state.openModal)

  useEffect(() => {
    setUserName(getUserName(user));
  }, [AuthFlag]);

  const clearUsersSettings = () => {
    dispatch(clearTimerSettingsState());
    setUserName("");
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Link
          href="https://github.com/E7ast1c/tomato-timer"
          color="inherit"
          target="_blank"
        >
          <GitHubIcon className={classes.toolbarIcon} />
        </Link>
        <Button
          className={classes.settingsButton}
          variant="outlined"
          size="small"
          onClick={() => dispatch(toggleSettingsModal())}
        >
          Settings
        </Button>

        <Typography
          component="h2"
          variant="h5"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>

        <div className={classes.authButton}>
          {AuthFlag ? (
            <div className={classes.authButton}>
              <Typography
                className={classes.userName}
                component="h2"
                variant="h5"
                align="center"
                noWrap
              >
                {userName}
              </Typography>

              <Button
                className={classes.toolbarButton}
                variant="outlined"
                size="small"
                onClick={() => {
                  setIsAuthenticated(!isAuthenticated),
                    clearLocalStorage(),
                    clearUsersSettings();
                }}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div className={classes.authButton}>
              <Button
                className={classes.toolbarButton}
                variant="outlined"
                size="small"
                onClick={() => dispatch(toggleLoginModal())}
              >
                Log in
              </Button>
              <Button
                className={classes.toolbarButton}
                variant="outlined"
                size="small"
                onClick={() => dispatch(toggleRegisterModal())}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
      {loginModal && <LoiginModal /> }
      {registerModal && <Register /> }
      {settingsModal && <SettingModal /> }
    </React.Fragment>
  );
}
