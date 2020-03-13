import React, {useState, useEffect} from 'react';
import {Input,Button} from 'antd';
import {connect} from 'react-redux';

import { FaQrcode } from 'react-icons/fa';
import Nav from './nav'
import Table from '../components/Table'

import './App.css';
import Categorie from '../components/Categorie';

function NavTable(props) {

  const [categorieName, setCategorieName] = useState('');
  const [CategorieNameError, setCategorieNameError] = useState('');
  const [categorieData, setCategorieData] = useState();

  var handleSubmitNewTable = async () => {

      let data = await fetch('/new-menu', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `categorieName=${categorieName}&restoToken=${props.restoToken}`
      })
      var response = await data.json()

      if (response.result) {
        setCategorieName('');
      } else {
        setCategorieNameError(response.error[0]);
        console.log('not working');
      }

      loadCategorie();
  }

  useEffect(() => {
    loadCategorie();
  }, []);

  var loadCategorie = async () => {
    const dataTable = await fetch('/load-menu', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `restoToken=${props.restoToken}`
    })
    var myResponse = await dataTable.json();

    if (myResponse.allMenu !== undefined) {
      setCategorieData(myResponse.allMenu)
    }
  }

  if (categorieData) {
    var categorieList = categorieData.map((categorie,i) => {
      return <Categorie key={i} categorieName={categorie.name} categorieProducts={categorie.produits} restoToken={props.restoToken} handleClickParent={loadCategorie} />
    })
  }
  var qrLogo = null;

  return (

    <div style={{display:'flex', marginTop: 70}}>
    <Nav/>
    <div style={{ display:'flex', flexDirection:'column', flexGrow: 1 , flexWrap: 'wrap'}}>
      <div  style={{color: 'white', fontWeight: 'bold', fontSize: '24', backgroundColor:'#011429', flexDirection:'row', margin :40, width:520, borderRadius: 10}}>
                
          <Input onChange={(e) => setCategorieName(e.target.value)} className="Login-input" value={categorieName} placeholder="Créer une nouvelle catégorie" />

          <Button onClick={() => handleSubmitNewTable()}  style={{width:'80px', alignSelf:' flex-end' }} type="primary">+</Button>

          <span style={{marginTop: '10px'}} className="error">{CategorieNameError}</span>

      </div>
      <span style={{fontSize: '26px', marginLeft: 10, fontWeight:'bold'}}>Choisissez votre catégorie</span>
      {categorieList}
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