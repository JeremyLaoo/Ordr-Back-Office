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





function createData(name, produit, totalQuantity, carbs, protein) {
  return { name, produit, totalQuantity, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 'Leffe', 6.0, 24, 8),
  createData('Ice cream sandwich', 'Brooklyn', 9.0, 37, 12),
  // createData('Eclair', 262, 16.0, 24, 16),
  // createData('Cupcake', 305, 3.7, 67, 13),
  // createData('Gingerbread', 356, 16.0, 49, 22),
];

function NewOrder() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div style={{display:'flex', marginTop: 80}}>
      <Nav/>
        <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>
          <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>
            <NavOrder />
          </div>
          <div>
            <TableContainer component={Paper}  style={{ flexGrow: 1, padding: theme.spacing(3) }} >
              <Table aria-label="caption table">
                <TableHead style={{ backgroundColor:  'black', color: 'white'}}>
                  <TableRow classeName={classes.titleTable}>
                    <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '28'}} align="left">N° de commande</TableCell>
                    <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '28'}} align="left">Name </TableCell>
                    <TableCell style={{color: 'white',  fontWeight: 'bold', fontSize: '28'}} align="center">Quantité</TableCell>
                    <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '28'}} align="center">Prix Total</TableCell>
                    <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '28'}} align="center">Table</TableCell>
                    <TableCell style={{color: 'white', fontWeight: 'bold', fontSize: '28'}} align="center">Statut</TableCell>
                  </TableRow>
                </TableHead>
             
                {/* <TableHead style={{ backgroundColor:  'black', color: 'white'}}></TableHead> */}
                
                  {rows.map(row => (
                    <TableBody>
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row" style={{ verticalAlign: 'top'}}>
                        <div >
                          <div style={{ fontSize: 22, fontWeight: 'Bold' }} >W69</div>
                        </div> 
                      </TableCell>
        
                      <TableCell>
                      {/* MISE EN PAGE CELLULE POUR ALIGNEMENT */}
                      </TableCell>

                      <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>
                        {row.totalQuantity}
                      </TableCell>

                      <TableCell align="center"style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>
                        {row.carbs}
                      </TableCell>

                      <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}>
                        {row.protein}
                      </TableCell>

                      <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 22, fontWeight: 'Bold'}}> 
                        <Button variant="contained" disableElevation  style={{ backgroundColor: '#50bda1',  color:  'white', fontWeight: 'bold'}}>
                        Accepter
                        </Button>
                      </TableCell>

                    </TableRow>
                      <TableCell>
                        {/* MISE EN PAGE CELLULE POUR ALIGNEMENT */}
                      </TableCell>
                      <TableCell  style={{ verticalAlign: 'top', fontSize: 18, fontStyle: 'italic'}}>
                            <div>{row.produit}</div>
                            <div>{row.produit}</div>
                      </TableCell>
                      <TableCell align="center" style={{ verticalAlign: 'top', fontSize: 18}}>
                            <div>{row.totalQuantity}</div>
                            <div>{row.totalQuantity}</div>
                      </TableCell>
                      <TableCell>
                        {/* MISE EN PAGE CELLULE POUR ALIGNEMENT */}
                      </TableCell>
                      <TableCell>
                       {/* MISE EN PAGE CELLULE POUR ALIGNEMENT */} 
                      </TableCell>
                      <TableCell>
                        {/* MISE EN PAGE CELLULE POUR ALIGNEMENT */}
                      </TableCell>

                  </TableBody>
                   ))}
                
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
  );
}

// var styles = StyleSheet.create({

//   numberOrder: {
//     fontSize: 22, 
//     fontWeight: 'Bold',
//     color: "#eb4034"
//   },
  



// });





export default NewOrder;
