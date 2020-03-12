import React, {useEffect, useState} from 'react';
import { Button } from 'reactstrap';
import {connect} from 'react-redux'

/**
 * import components
 */

 /**
 * import for tables
 */

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';




function OrderList(props) {
 
  var status_EnCours = 'En cours de préparation'
  var orderIdToSend = props.orderId
  var statusRecupFromDB = props.status
  var titleButton = 'ACCEPTER'


  var AcceptOnClick = async() => {

    console.log('status :', status_EnCours);
    console.log('orderId :', orderIdToSend);

    const data = await fetch("/status", {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `orderId=${orderIdToSend}&status=${status_EnCours}`
    })
  }

  console.log('statusRecupFromDB :', statusRecupFromDB);

  if (statusRecupFromDB == status_EnCours) {
    titleButton = 'TERMINER'
  }


  var articles = props.panier.map((article) => {

     return ( 
      <TableRow>
          <TableCell align="right" component="th" scope="row"></TableCell>
          <TableCell align="right">{article.name}</TableCell>
          <TableCell align="right">x {article.quantity}</TableCell>
          <TableCell align="right">{article.price } €</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
      </TableRow>
    )
  })


  return (

    <TableBody>

      <TableRow style={{backgroundColor: '#fafafa', }}>
          <TableCell align="center"component="th" scope="row">{props.orderId}</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">10 Articles</TableCell>
          <TableCell align="right">{props.total} €</TableCell>
          <TableCell align="right">Table 10</TableCell>
          <TableCell align="right"><Button variant="contained" color="primary" onClick={() => AcceptOnClick()}>{titleButton}</Button></TableCell>
      </TableRow>

      {articles}

    </TableBody>

  
  );
}


export default OrderList;


