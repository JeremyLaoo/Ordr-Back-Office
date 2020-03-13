import React, {useState, useEffect} from 'react';
import {Input,Button, Menu} from 'antd';

import { FaEllipsisH } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

import '../App.css';

function Produit(props) {

    //Antd SubMenu import
    const { SubMenu } = Menu;

    //Produit Management
    const [produitName, setProduitName] = useState('');
    const [produitPrice, setProduitPrice] = useState();
    const [produitNameError, setProduitNameError] = useState('');
    const [produitData, setProduitData] = useState(null);

    //Change l'état de l'input
    const [changeProduitName, setChangeProduitName] = useState(props.produitName);
    const [disabled, setDisabled] = useState(true);

    //Message de confirmation ou d'erreurs
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(null);
    const [changeCategorieNameError, setChangeCategorieNameError] = useState('');

    //Import du nom d'origin
    const categorieNameOrigin = props.categorieName;
  
    console.log('props :', props);

    useEffect(() => {
        props.handleClickParent();
    }, []);

    // var loadProduit = async () => {
    //     const dataTable = await fetch('/load-produit', {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //       body: `categorieName=${changeCategorieName}&restoToken=${props.restoToken}`
    //     })
    //     var myResponse = await dataTable.json();
    
    //     if (myResponse.allProduit !== undefined) {
    //         setProduitData(myResponse.allProduit)
    //     }
    //   }
    
    //   console.log('produitData :', produitData);

    //   if (produitData) {
    //     var produitList = produitData.map((produit,i) => {
    //     return <Menu.Item key={i}>{produit.name} prix: {produit.price+produit.tva}</Menu.Item>
    //     })
    //   }

    // var handleSubmitUpdateCategory = async () => {

    //     let data = await fetch('/update-menu', {
    //       method: 'POST',
    //       headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //       body: `newCategorieName=${changeCategorieName}&categorieName=${categorieNameOrigin}&restoToken=${props.restoToken}`
    //     })
    //     var response = await data.json()
  
    //     if (!response.result) {
    //         setChangeCategorieNameError(response.error[0]);
    //     }
    // }

    var editMode = () => {
        setDisabled(!disabled);
    }

    var deleteElement = async () => {

        let data = await fetch('/delete-produit', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `produitName=${changeProduitName}&categorieName=${props.categorieName}&restoToken=${props.restoToken}`
          })
          var response = await data.json()
    
          if (response.result) {
              setDeleteSuccessMsg('Element supprimé');
              props.handleClickParent();
          }

    }

    var iconChecked = null;

    if (!disabled)
        iconChecked = <FaCheck style={{cursor: 'pointer'}} onClick={() => {setDisabled(true); props.handleClickParent()} } />;

    return (

        <div style={{ display:'flex', flexDirection:'row', flexGrow: 1 , flexWrap: 'wrap', backgroundColor: '#E5E6EA', margin:10, borderRadius:10}}>

            <Input onChange={(e) => setChangeProduitName(e.target.value)} className="Login-input" value={changeProduitName} disabled={disabled} />

            {iconChecked}

            <Menu style={{ width: 75, backgroundColor: 'transparent', border: 'none' }} mode="vertical">
                <SubMenu
                key="sub1"
                title={ <FaEllipsisH /> }
                >
                    {/* <Menu.Item key="1" onClick={() => editMode()}>Edit</Menu.Item> */}
                    <Menu.Item key="2" onClick={() =>  deleteElement()}>Delete</Menu.Item>
                </SubMenu>
            </Menu>

            <span style={{marginTop: '10px', color: 'red'}} className="error">{deleteSuccessMsg}</span>
            <span style={{marginTop: '10px'}} className="error">{changeCategorieNameError}</span>

        </div>

    );
}

export default Produit;