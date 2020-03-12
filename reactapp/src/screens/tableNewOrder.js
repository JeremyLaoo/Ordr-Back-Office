import React, {useEffect, useState} from 'react';

import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './nav'
import NavOrder  from  './navOrders'

/**
 * import for tables
 */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'react-bootstrap/Button';

/**
 * import components
 */
import OrderList from '../components/OrderList'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function NewOrder() {

  const classes = useStyles();
  const[orderList, setOrderList] = useState([])
  const[panier, setPanier] = useState([])


  useEffect( () => {

    const fetchData = async () => {
      var response = await fetch("/orderPayed")
      var orderResponse = await response.json()

      console.log('orderResponse :', orderResponse);

      setOrderList(orderResponse.order)

    }
    fetchData();
  
  }, []);




  var oderListItems = orderList.map((order,i) => {
    console.log('order :', order);
    console.log('order.panier :', order.panier);

    return(<OrderList key={i} 
                      orderId ={order._id} 
                      panier={order.panier}
                      total={order.total}
                      status={order.status}/>)
   })





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

         

          {oderListItems}

      

        </Table>

      </TableContainer>
  </div>




  );
}


export default NewOrder;
