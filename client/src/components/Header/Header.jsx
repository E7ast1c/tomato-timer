import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import Register from "./RegisterModal";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid `
  },
  toolbarButton: {
    color: "white",
    borderColor: "white",
    marginLeft: "1em",
  },
  toolbarIcon: {
    marginLeft: "1em",
    marginRight: "8em",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    overflowX: 'auto',
  },
  toolbarLink: {
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const [registerModal, setRegisterModal] = React.useState(false);
  const [isLogIn, setIsLogIn] = React.useState(false);
  const classes = useStyles();
  const title = "Tomato timer";
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <GitHubIcon className={classes.toolbarIcon} />
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
          <Button className={classes.toolbarButton} variant="outlined" size="small"
            onClick={() => setIsLogIn(!isLogIn)} >
            Log in
        </Button>
          <Button className={classes.toolbarButton} variant="outlined" size="small"
            onClick={() => setRegisterModal(!registerModal)} >
            Register
        </Button>
        </Toolbar>
      </Toolbar>
      {registerModal && <Register prop={{registerModal, setRegisterModal}}/>}
    </React.Fragment>
  );
}