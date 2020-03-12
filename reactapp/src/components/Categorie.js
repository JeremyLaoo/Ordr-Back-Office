import React, {useState, useEffect} from 'react';
import {Input,Button, Menu} from 'antd';

import Produit from './Produit';

import { FaEllipsisH } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

import '../App.css';

function Categorie(props) {

    //Antd SubMenu import
    const { SubMenu } = Menu;

    //Produit Management
    const [produitName, setProduitName] = useState('');
    const [produitPrice, setProduitPrice] = useState();
    const [produitNameError, setProduitNameError] = useState('');
    const [produitData, setProduitData] = useState(null);

    //Change l'état de l'input
    const [changeCategorieName, setChangeCategorieName] = useState(props.categorieName);
    const [disabled, setDisabled] = useState(true);

    //Message de confirmation ou d'erreurs
    const [deleteSuccessMsg, setDeleteSuccessMsg] = useState(null);
    const [changeCategorieNameError, setChangeCategorieNameError] = useState('');

    //Import du nom d'origin
    const categorieNameOrigin = props.categorieName;

    var handleSubmitNewProduit = async () => {

        let data = await fetch('/new-produit', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `produitName=${produitName}&produitPrice=${produitPrice}&categorieName=${changeCategorieName}&restoToken=${props.restoToken}`
        })
        var response = await data.json()
  
        if (response.result) {
          setProduitName('');
        } else {
            setProduitNameError(response.error[0]);
          console.log('not working');
        }
  
        loadProduit();
    }
  
    useEffect(() => {
        loadProduit();
    }, []);

    var loadProduit = async () => {
        const dataTable = await fetch('/load-produit', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `categorieName=${changeCategorieName}&restoToken=${props.restoToken}`
        })
        var myResponse = await dataTable.json();
    
        if (myResponse.allProduit !== undefined) {
            setProduitData(myResponse.allProduit)
        }
      }

      if (produitData) {
        var produitList = produitData.map((produit,i) => {
            return <Produit key={i} produitName={produit.name} produitPrice={produit.price} produitTVA={produit.tva} restoToken={props.restoToken} handleClickParent={loadProduit} categorieName={changeCategorieName} />
        })
      }

    var handleSubmitUpdateCategory = async () => {

        let data = await fetch('/update-menu', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `newCategorieName=${changeCategorieName}&categorieName=${categorieNameOrigin}&restoToken=${props.restoToken}`
        })
        var response = await data.json()
  
        if (!response.result) {
            setChangeCategorieNameError(response.error[0]);
        }
    }

    var editMode = () => {
        setDisabled(!disabled);
    }

    var deleteElement = async () => {

        let data = await fetch('/delete-menu', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `catgorieName=${changeCategorieName}&restoToken=${props.restoToken}`
          })
          var response = await data.json()
    
          if (response.result) {
              setDeleteSuccessMsg('Element supprimé');
              props.handleClickParent();
          }

    }

    var iconChecked = null;

    if (!disabled)
        iconChecked = <FaCheck style={{cursor: 'pointer'}} onClick={() => {setDisabled(true); handleSubmitUpdateCategory()} } />;

    return (

        <Menu mode="inline">

            <SubMenu
            key="sub1"
            popupClassName="Sign"
            title={
                <span>
                    <span>{changeCategorieName}</span>
                </span>
            }
            >

                {/* <div className="Sign" style={{display: 'flex'}}>

                    <Input onChange={(e) => setChangeCategorieName(e.target.value)} className="Login-input" value={changeCategorieName} disabled={disabled} />

                    {iconChecked}

                    <Menu style={{ width: 75, backgroundColor: 'transparent', border: 'none' }} mode="vertical">
                        <SubMenu
                        key="sub1"
                        title={ <FaEllipsisH /> }
                        >
                            <Menu.Item key="1" onClick={() => editMode()}>Edit</Menu.Item>
                            <Menu.Item key="2" onClick={() =>  deleteElement()}>Delete</Menu.Item>
                        </SubMenu>
                    </Menu>

                    <span style={{marginTop: '10px', color: 'red'}} className="error">{deleteSuccessMsg}</span>
                    <span style={{marginTop: '10px'}} className="error">{changeCategorieNameError}</span>

                </div> */}

                <div className="Sign">
                    
                    <Input onChange={(e) => setProduitName(e.target.value)} className="Login-input" value={produitName} placeholder="new produit name" />
        
                    <Input onChange={(e) => setProduitPrice(e.target.value)} className="Login-input" value={produitPrice} placeholder="price" />

                    {/* <Input onChange={(e) => setProduitPrice(e.target.value)} className="Login-input" value={produitPrice} placeholder="price" /> */}

                    <Button onClick={() => handleSubmitNewProduit()}  style={{width:'80px'}} type="primary">+</Button>
        
                    <span style={{marginTop: '10px'}} className="error">{produitNameError}</span>

                </div>

                {produitList}

                {/* <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item> */}

            </SubMenu>

        
        </Menu>

    );
}

export default Categorie;