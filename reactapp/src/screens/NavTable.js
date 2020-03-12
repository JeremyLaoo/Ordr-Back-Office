import React, {useState, useEffect} from 'react';
import {Input,Button} from 'antd';
import {connect} from 'react-redux';

import { FaQrcode } from 'react-icons/fa';
import Nav from './nav'
import Table from '../components/Table'

import './App.css';

function NavTable(props) {

  const [tableName, setTableName] = useState('');
  const [tableNameError, setTableNameError] = useState('');
  const [qrCodeLogo, setQrCodeLogo] = useState();
  const [tableData, setTableData] = useState();

  var handleSubmitNewTable = async () => {

      let data = await fetch('/new-table', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `tableName=${tableName}&restoToken=${props.restoToken}`
      })
      var response = await data.json()

      if (response.result) {
        setQrCodeLogo(<FaQrcode style={{cursor: 'pointer'}} />);
        setTableName('');
      } else {
        setTableNameError(response.error[0]);
        console.log('not working');
      }

      loadTable();
  }

  useEffect(() => {
    loadTable();
  }, []);

  var loadTable = async () => {
    const dataTable = await fetch('/load-table', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `restoToken=${props.restoToken}`
    })
    var myResponse = await dataTable.json();

    if (myResponse.allTable !== undefined) {
      console.log('myResponse.allTable :', myResponse.allTable);
      setTableData(myResponse.allTable)
    }
  }

  if (tableData) {
    console.log('tableData :', tableData);
    var tableList = tableData.map((table,i) => {
      console.log('table.tableName :', table.tableName);
      return <Table key={table.tableName} tableName={table.tableName} tableToken={table.tableToken} tableQrCode={table.tableQrCode} restoToken={props.restoToken} handleClickParent={loadTable} />
    })
  }
  var qrLogo = null;

  return (

    <div style={{display:'flex', marginTop: 70}}>
       <Nav/>
       <div style={{ display:'flex', flexDirection:'row', flexGrow: 1 , flexWrap: 'wrap'}}>
       <div className="Sign" style={{color: 'white', fontWeight: 'bold', fontSize: '24', backgroundColor:'#011429', width:200}}>
       <Input style={{width:180}} onChange={(e) => setTableName(e.target.value)} className="Login-input" value={tableName} placeholder="Ajouter une table" />
        <Button onClick={() => handleSubmitNewTable()}  style={{width:180, backgroundColor:'#50bda1'}} type="primary">+</Button>

<span style={{marginTop: '10px'}} className="error">{tableNameError}</span>

</div>

{tableList}

  </div>

 </div>

  );
}

function mapStateToProps(state) {
  return { restoToken: state.token }
}

export default connect(
  mapStateToProps
)(NavTable);