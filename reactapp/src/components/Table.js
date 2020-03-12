import React, {useState} from 'react';
import {Input,Button, Menu} from 'antd';

import { FaEllipsisH } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

import '../App.css';


function Table(props) {

    //Antd SubMenu import
    const { SubMenu } = Menu;

    //Change l'état de l'input
    const [changeTableName, setChangeTableName] = useState(props.tableName);
    const [disabled, setDisabled] = useState(true);

    //Message de confirmation ou d'erreurs
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(null);
    const [changeTableNameError, setChangeTableNameError] = useState('');

    //Import du nom d'origin
    const tableNameOrigin = props.tableName;

    var handleSubmitUpdateTable = async () => {

        let data = await fetch('/update-table', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `newTableName=${changeTableName}&tableName=${tableNameOrigin}&restoToken=${props.restoToken}`
        })
        var response = await data.json()
  
        if (!response.result) {
            setChangeTableNameError(response.error[0]);
        }
    }

    var editMode = () => {
        setDisabled(!disabled);
    }

    var deleteTable = async (name) => {

        console.log('props.tableName :', props.tableName);
        console.log('changeTableName :', changeTableName);

        let data = await fetch('/delete-table', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `tableName=${changeTableName}&restoToken=${props.restoToken}`
          })
          var response = await data.json()
    
          if (response.result) {
              setDeleteSuccessMsg('Element supprimé');
              props.handleClickParent();
          }

    }

    var iconChecked = null;

    if (!disabled)
        iconChecked = <FaCheck style={{cursor: 'pointer'}} onClick={() => {setDisabled(true); handleSubmitUpdateTable()} } />;

    return (

        <div className="Sign" style={{display: 'flex', backgroundColor:'#50bda1'}}>

            <Input onChange={(e) => setChangeTableName(e.target.value)} className="Login-input" value={changeTableName} disabled={disabled} />

            {iconChecked}

            <Menu style={{ width: 75, backgroundColor: 'transparent', border: 'none' }} mode="vertical">
                <SubMenu
                key="sub1"
                title={ <FaEllipsisH /> }
                >
                    <Menu.Item key="1" onClick={() => editMode()}>Edit</Menu.Item>
                    <Menu.Item key="2" onClick={() =>  deleteTable()}>Delete</Menu.Item>
                </SubMenu>
            </Menu>

            <span style={{marginTop: '10px', color: 'red'}} className="error">{deleteSuccessMsg}</span>
            <span style={{marginTop: '10px'}} className="error">{changeTableNameError}</span>

        </div>

    );
}

export default Table;