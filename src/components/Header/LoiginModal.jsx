import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    top: '25%',
    left: '25%',
    position: 'absolute',
    width: '25em',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LoiginModal(props) {
  const prop = props.prop;
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [values, setValues] = useState({
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  useEffect(() => {
    console.log(prop)
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    prop.setIsLogIn(false);
  };

  return (
    <div >
      <Modal
        open={true}
        onClose={() => prop.setIsLogIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div >
          <div className={classes.paper}>
          <TextField
              id="login"
              placeholder='Login'
              className={clsx(classes.margin, classes.textField)}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={classes.btn}>
              <Button>Ok</Button>
              <Button
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      </div>
  )
}