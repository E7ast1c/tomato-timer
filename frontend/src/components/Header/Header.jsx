import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import Register from "./RegisterModal";
import SettingModal from "./SettingsModal";
import LoiginModal from "./LoiginModal";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid `,
  },
  toolbarButton: {
    color: "white",
    borderColor: "white",
    marginLeft: "1em",
  },
  toolbarIcon: {
    marginLeft: "1em",
    marginRight: "2em",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: "auto",
  },
  toolbarLink: {
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const setCurrentDuarationTime = props.setCurrentDuarationTime;
  const [registerModal, setRegisterModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();
  const title = "Tomato timer";

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <GitHubIcon className={classes.toolbarIcon} />
        <Button
          className={classes.toolbarButton}
          variant="outlined"
          size="small"
          onClick={() => setSettingsModal(!settingsModal)}
        >
          Settings
        </Button>

        <Typography
          component="h2"
          variant="h5"
          // color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>

        <Toolbar className={classes.toolbarSecondary}>
          <Button
            className={classes.toolbarButton}
            variant="outlined"
            size="small"
            onClick={() => setIsLoginModal(!isLoginModal)}
          >
            Log in
          </Button>
          <Button
            className={classes.toolbarButton}
            variant="outlined"
            size="small"
            onClick={() => setRegisterModal(!registerModal)}
          >
            Register
          </Button>
        </Toolbar>
      </Toolbar>
      {isLoginModal && <LoiginModal prop={{ isLoginModal, setIsLoginModal, setIsAuthenticated }} />}
      {registerModal && <Register prop={{ registerModal, setRegisterModal }} />}
      {settingsModal && (
        <SettingModal prop={{ setSettingsModal, setCurrentDuarationTime }} />
      )}
    </React.Fragment>
  );
}

Header.propTypes = {
  setCurrentDuarationTime: PropTypes.func.isRequired,
};
