import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Nav from './nav'
import Button from 'react-bootstrap/Button';

// Import tab


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


// function createData(Numero, Articles, Quantité, Prix, Table, Status) {
//   return { Numero, Articles, Quantité, Prix, Table, Status };
// }

// const rows = [
//   createData('WC69', "Leffe", 1, 24, 'Table 1', 'Accepter'),
//   createData('AK47', "Brooklyn", 9.0, 37, 'Table 2', 'Accepter'),
//   // createData('AZ77', "Desperados", 16.0, 24, 'Table 3', 'Accepter'),
//   // createData('VT94', "Heineken", 3.7, 67, 'Table 4', 'Accepter'),
//   // createData('ID75', "Mazeltov", 16.0, 49, 'Table 5', 'Accepter'),
// ];


export default function SimpleTable() {
    const classes = useStyles();

  return (
    <div style={{display:'flex', marginTop: 70}}>
       <Nav/>
       
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor: 'yellow', }}>
                <TableCell align="center" style={{fontSize: 18, fontWeight: 'bold'}}>Numéro de Commande</TableCell>
                <TableCell style={{fontSize: 18, fontWeight: 'bold'}} align="right">Articles</TableCell>
                <TableCell style={{fontSize: 18, fontWeight: 'bold'}} align="right">Quantité</TableCell>
                <TableCell style={{fontSize: 18, fontWeight: 'bold'}} align="right">Prix (€)</TableCell>
                <TableCell style={{fontSize: 18, fontWeight: 'bold'}} align="right">Table</TableCell>
                <TableCell style={{fontSize: 18, fontWeight: 'bold'}} align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

{/* CONTENU DU TABLEAU */}
              <TableRow style={{backgroundColor: '#fafafa', }}>
                <TableCell align="center"component="th" scope="row">WC96</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">10 Articles</TableCell>
                <TableCell align="right">100 €</TableCell>
                <TableCell align="right">Table 10</TableCell>
                <TableCell align="right"><Button variant="outline-success">Accepter</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" component="th" scope="row"></TableCell>
                <TableCell align="right"><div><p>Leffe</p></div><div><p>Brooklyn</p></div></TableCell>
                <TableCell align="right"><div><p>x1</p></div><div><p>x1</p></div></TableCell>
                <TableCell align="right"><div><p>x5€</p></div><div><p>x5€</p></div></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
{/* FIN DU CONTENU DU TABLEAU */} 

{/* CONTENU DU TABLEAU */}
              <TableRow style={{backgroundColor: '#fafafa', marginTop: '30%' }}>
                <TableCell align="center"component="th" scope="row">AK47</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">6 Articles</TableCell>
                <TableCell align="right">50 €</TableCell>
                <TableCell align="right">Table 8</TableCell>
                <TableCell align="right">  <Button variant="outline-success">Accepter</Button></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" component="th" scope="row"></TableCell>
                <TableCell align="right"><div><p>Desperados</p></div><div><p>Desperados</p></div></TableCell>
                <TableCell align="right"><div><p>x1</p></div><div><p>x1</p></div></TableCell>
                <TableCell align="right"><div><p>x3€</p></div><div><p>x3€</p></div></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
{/* FIN DU CONTENU DU TABLEAU */} 
</TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}
























// import React from 'react';
// import Nav from './nav'
// import NavOrder  from  './navOrders'

// // Import tab

// import { makeStyles, useTheme } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function NewOrder() {
//   const classes = useStyles();
//   const theme = useTheme();

//   return (
//     <div style={{display:'flex', marginTop: 70}}>
//        <Nav/>
       
//         <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>

//             <div style={{ display:'flex', flexDirection:'row',flexGrow: 1, backgroundColor: 'black', height:50, margin:10, padding: 10,}}>

//                 <p style={{display:'flex', width: 100, backgroundColor: 'orange', marginRight: 5, alignItems:'center', justifyContent: 'center',}}> N° commande</p>
//                 <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Articles</p>
//                 <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Quantité</p>
//                 <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Prix</p>
//                 <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Table</p>
//                 <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'pink',  marginLeft: 5, width: 50}}> Status</p>

//             </div>
//             <div style={{display:'flex', flexDirection:'column', flexGrow: 1, backgroundColor: 'yellow', marginLeft:10, marginRight:10, marginTop:10, padding: 10,}}>
//                 <div style={{display:'flex', flexDirection:'row', flexGrow: 1, backgroundColor: 'grey', height:50, marginTop:10, padding: 10,}}>

//                     <p style={{display:'flex', width: 100, backgroundColor: 'orange', marginRight: 5, alignItems:'center', justifyContent: 'center',}}> WC96</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Leffe</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Total : 10</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Total : 50€</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Table</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'pink', marginLeft: 5, width: 50}} >Status</p>

//                 </div>
//                 <div style={{display:'flex', flexDirection:'row',  backgroundColor: 'orange', height:100, width: 715, }}>

//                     <p style={{display:'flex', width: 100, backgroundColor: 'orange', marginRight: 5, alignItems:'center', justifyContent: 'center',}}> WC96</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Leffe</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Total : 10</p>
//                     <p style={{display:'flex', flexGrow: 1, alignItems:'center', justifyContent: 'center', backgroundColor: 'green', marginLeft: 5, marginRight: 5,}}> Total : 50€</p>

//                     {/* <p style={{display:'flex', flexDirection:'row', backgroundColor: 'red', width: 205, margin:10}}> LEFFE </p>
//                     <p style={{display:'flex', flexDirection:'row',  backgroundColor: 'blue', width: 235, marginTop: 10,  marginBottom: 10, marginRight: 10}}>  -1</p>
//                     <p style={{display:'flex', flexDirection:'row',  backgroundColor: 'purple', width: 235, marginTop: 10,  marginBottom: 10, marginRight: 10}}>  - 5€</p> */}

//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// }

// export default NewOrder;