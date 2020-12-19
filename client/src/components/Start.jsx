import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login'
import Singup from "./Singup";
import Timer from "./Timer"



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Start() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Login />
        <Singup />
      </div>
      <div>
        <Timer />
      </div>
    </div>

  )
}

export default Start