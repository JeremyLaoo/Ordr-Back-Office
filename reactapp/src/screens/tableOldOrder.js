import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}  className={classes.table} >
    <Table aria-label="caption table">
      <TableHead>
        <TableRow classeName={classes.titleTable}>
          <TableCell  align="left">N° de commande</TableCell>
          <TableCell align="left">Quantité</TableCell>
          <TableCell align="left">Prix total</TableCell>
          <TableCell align="left">Timer</TableCell>
          <TableCell align="left">Table</TableCell>
          <TableCell align="center">Statut</TableCell>
     </TableRow>
  </TableHead>
  <TableBody>
       {rows.map(row => (
         <TableRow key={row.name}>
           <TableCell component="th" scope="row">
             {row.name}
           </TableCell>
           <TableCell align="left">{row.calories} </TableCell>
           <TableCell align="left">{row.fat}</TableCell>
           <TableCell align="left">{row.carbs}</TableCell>
           <TableCell align="left" >{row.protein}</TableCell>
           <TableCell align="center" > <Button variant="contained" color="secondary" disableElevation>
   Annuler
 </Button></TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
  );
}
