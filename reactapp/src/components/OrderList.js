import React, {useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from '../screens/nav'
import NavOrder  from  '../screens/navOrders'

/**
 * import components
 */


import { OmitProps } from 'antd/lib/transfer/renderListBody';



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
   
     <tr>
      <th scope="row"></th>
      <td>{article.name}</td>
      <td>{article.quantity}</td>
      <td>{article.price }</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    )
  })









  return (

    <tbody>
    <tr>
      <th scope="row">{props.orderId}</th>
      <td></td>
      <td></td>
      <td></td>
      <td>{props.total}</td>
      <td>18</td>
      <td><Button 
           color="success"
           onClick={() => AcceptOnClick()}
          >{titleButton}</Button></td>
    </tr>
   
   {articles}

  </tbody>
  );
}


export default OrderList;
