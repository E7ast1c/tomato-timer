import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles((theme) => ({
    btn: {
      color: '#fff'
    },
    btngroup: {
      marginTop: '1em'
    },
}));


export default function TimerButton() {
  const classes = useStyles();

  return (
    <div>
      <ButtonGroup variant="text" className={classes.btngroup}>
        <Button className={classes.btn}>Pomidoro</Button>
        <Button className={classes.btn}>Short break</Button>
        <Button className={classes.btn}>Long break</Button>
      </ButtonGroup>
    </div>
  )
}