import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';

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
      <Button className={classes.toolbarButton} variant="outlined" size="small">
          Log in
        </Button>
        <Button className={classes.toolbarButton} variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
      </Toolbar>
    </React.Fragment>
  );
}