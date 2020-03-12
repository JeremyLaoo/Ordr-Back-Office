import React, {useEffect, useState} from 'react';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';


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
 
  const status_Payed = 'Payed'
  const status_EnCours = 'En cours de préparation'
  const status_Terminer = 'terminée'
  var status = ''
  var orderIdToSend = props.orderId
  var statusRecupFromDB = props.status
  var titleButton = 'ACCEPTER'

  const[statusState, setStatusState] = useState('')

  
  useEffect( () => {

    const fetchData = async () => {
      console.log('statusRecup useEffect :', statusRecupFromDB);



    }
    fetchData();
  
  }, []);



  
  

  var AcceptOnClick = async() => {


   status = status_EnCours
  

    const data = await fetch("/status", {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `orderId=${orderIdToSend}&status=${status}`
    })

   
    
  }

 

  var TermineOnClick = async() => {


    status = status_Terminer
   
     const data = await fetch("/status", {
       method: 'POST',
       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       body: `orderId=${orderIdToSend}&status=${status}`
     })
 
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
          <TableCell align="right">{statusRecupFromDB}</TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">{props.total} €</TableCell>
          <TableCell align="right">Table 10</TableCell>
          <TableCell align="right">
            <Button style={{
              backgroundColor:'#4CAF50', 
              color: 'white', 
              border:0, 
              borderRadius:10, 
              paddingTop: 15, 
              paddingBottom:15, 
              paddingLeft:30, 
              paddingRight:30, 
              textAlign: 'center', 
              fontSize:16,
              transitionDuration: 0.4,
              cursor:'pointer'
        
              }} onClick={() => AcceptOnClick()}>ACCEPTER</Button>
            <Button variant="contained" color="primary" onClick={() => TermineOnClick()}>TERMINER</Button>
          </TableCell>
      </TableRow>

      {articles}

    </TableBody>
  

  
  );
}


export default OrderList;


