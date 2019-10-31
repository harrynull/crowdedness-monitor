import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: -6,
    overflowX: 'auto',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '98%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: '1%',
  },
}));

function createData (name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData('Monday - Friday', '8:00am - 11:00pm'),
  createData('Saturday - Sunday', '11:00am - 11:00pm'),
];

export default function HoursTable () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
