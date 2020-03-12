import React, {useState, useEffect} from 'react';
import {Input,Button} from 'antd';
import {connect} from 'react-redux';

import { FaQrcode } from 'react-icons/fa';

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
      return <Categorie key={i} categorieName={categorie.category} categorieProducts={categorie.products} restoToken={props.restoToken} handleClickParent={loadCategorie} />
    })
  }
  var qrLogo = null;

  return (

    <div>

      <div className="Sign">
                
          <Input onChange={(e) => setCategorieName(e.target.value)} className="Login-input" value={categorieName} placeholder="new categorie name" />

          <Button onClick={() => handleSubmitNewTable()}  style={{width:'80px'}} type="primary">+</Button>

          <span style={{marginTop: '10px'}} className="error">{CategorieNameError}</span>

      </div>

      {categorieList}

    </div>

  );
}

function mapStateToProps(state) {
  return { restoToken: state.token }
}

export default connect(
  mapStateToProps
)(NavTable);