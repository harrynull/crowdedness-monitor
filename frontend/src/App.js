import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PrimaryAppBar from "./appBar";
import CampusMap from "./campusMap";

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    [theme.breakpoints.between('sm','xl')]: {
      height: 'calc(100% - 64px)',
    },
    [theme.breakpoints.only('xs')]: {
      height: 'calc(100% - 56px)',
    },
    padding: 0
  },
}));

export default function App () {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <PrimaryAppBar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="xl" className={classes.container}>
          <CampusMap/>
        </Container>
        <Copyright/>
      </main>
    </div>
  );
}
