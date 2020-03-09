import React, {useState, useEffect} from 'react';
import {Input,Button} from 'antd';
import {connect} from 'react-redux';

import { FaQrcode } from 'react-icons/fa';

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
      setTableData(myResponse.allTable)
    }
  }

  var handleClick = async () => {
    loadTable();
  } 

  if (tableData) {
    var tableList = tableData.map((table,i) => {
      return <Table key={i} tableName={table.tableName} tableToken={table.tableToken} tableQrCode={table.tableQrCode} restoToken={props.restoToken} handleClickParent={handleClick} />
    })
  }
  var qrLogo = null;

  return (

    <div>

      <div className="Sign">
                
          <Input onChange={(e) => setTableName(e.target.value)} className="Login-input" value={tableName} placeholder="new table name" />

          <Button onClick={() => handleSubmitNewTable()}  style={{width:'80px'}} type="primary">+</Button>

          <span style={{marginTop: '10px'}} className="error">{tableNameError}</span>

      </div>

      {tableList}

    </div>

  );
}

function mapStateToProps(state) {
  return { restoToken: state.token }
}

export default connect(
  mapStateToProps
)(NavTable);