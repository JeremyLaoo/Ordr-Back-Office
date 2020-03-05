import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './nav'
import NavOrder  from  './navOrders'

// Import tab
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});





function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 'X2      Leffe', 6.0, 24, 8),
  createData('Ice cream sandwich', 237, 9.0, 37, 12),
  createData('Eclair', 262, 16.0, 24, 16),
  createData('Cupcake', 305, 3.7, 67, 13),
  createData('Gingerbread', 356, 16.0, 49, 22),
];

function NewOrder() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div style={{display:'flex', marginTop: 70}}>
       <Nav/>
       <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>
       <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>
      <NavOrder />
      </div><div>
    <TableContainer component={Paper}  style={{ flexGrow: 1, padding: theme.spacing(3) }} >
    <Table aria-label="caption table">
      <TableHead style={{ backgroundColor:  'black', color: 'white'}}>
        <TableRow classeName={classes.titleTable}>
          <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '24'}} align="left">N° de commande</TableCell>
          <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '24'}} align="left">Quantité </TableCell>
          <TableCell style={{color: 'white',  fontWeight: 'bold', fontSize: '24'}} align="left">Prix total</TableCell>
          <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '24'}} align="left">Timer</TableCell>
          <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '24'}} align="left">Table</TableCell>
          <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '24'}} align="center">Statut</TableCell>
     </TableRow>
  </TableHead>
  </Table>
 </TableContainer>

 <TableContainer component={Paper}  style={{ flexGrow: 1, padding: theme.spacing(3) }} >
    <Table aria-label="caption table">
      <TableHead style={{ backgroundColor:  'black', color: 'white'}}></TableHead>
  <TableBody>
       {rows.map(row => (
         <TableRow key={row.name}>
           <TableCell component="th" scope="row" style={{ verticalAlign: 'top'}}>
           <div >
               <div style={{ fontSize: 22, fontWeight: 'Bold' }} >W95</div>
               <div  style={{ fontSize: 18 }}>{row.calories}</div>
               <div  style={{ fontSize: 18 }}>{row.calories}</div>
               </div> </TableCell>
        
           <TableCell align="left" style={{ verticalAlign: 'top'}}>
               <div >
               <div style={{ fontSize: 22, fontWeight: 'Bold' }} >2</div>
               <div  style={{ fontSize: 18 }}>{row.calories}</div>
               <div  style={{ fontSize: 18 }}>{row.calories}</div>
               </div> </TableCell>
           <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>{row.fat}</TableCell>
           <TableCell align="center"style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>{row.carbs}</TableCell>
           <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>{row.protein}</TableCell>
           <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}> <Button variant="contained" disableElevation  style={{ backgroundColor: '#06C216',  color:  'white', fontWeight: 'bold'}}>
   Accepter
 </Button></TableCell>
         </TableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer>
 </div>
 </div>
 </div>
  );
}





export default NewOrder;
