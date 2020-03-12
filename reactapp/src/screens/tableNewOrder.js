import React, {useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './nav'
import NavOrder  from  './navOrders'


/**
 * import components
 */
import OrderList from '../components/OrderList'



function NewOrder() {

 
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
    <div style={{display:'flex', marginTop: 80}}>
      <Nav/>

        <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 }}>

      <Table bordered >

      <thead >
        <tr style={{borderColor:'black', borderWidth:1}}>
          <th>N°</th>
          <th>Article</th>
          <th>Quantité</th>
          <th>Prix</th>
          <th>Total</th>
          <th>Table</th>
          <th>Status</th>
        </tr>
      </thead>

      {oderListItems}
   
    </Table>
  
        </div>
      </div>
  );
}


export default NewOrder;
