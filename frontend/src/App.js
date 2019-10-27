import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import Copyright from "./Copyright";
import PrimaryAppBar from "./AppBar";
import Panel from "./Panel";
import './index.css'
import {
  CssBaseline,
  Container,
} from '@material-ui/core';

export const FONT_FAMILY = 'Rubik';

class App extends Component {
  state = {
    data: [],
  };

  componentDidMount () {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 30000);
  }

  fetchData () {
    fetch('https://harrynull.tech/cm/data/current', {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({data: responseData.data});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <PrimaryAppBar/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Container maxWidth="md" className={classes.container}>
            <Panel locations={this.state.data}/>
          </Container>
          {/*<Copyright/>*/}
        </main>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflowY: 'scroll',
    paddingRight: '3px',
    [theme.breakpoints.between('xs', 'sm')]: {
      minWidth: "90%"
    }
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.between('xs', 'sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    }
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
