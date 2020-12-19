import React from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Login from './Login';
// import Singup from "./Singup";
import Timer from "./Timer";
import Header from "./Header/Header";



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
        <Header />
        {/* <Login /> */}
        {/* <Singup /> */}
      <div>
        <Timer />
      </div>
    </div>

  )
}

export default Start