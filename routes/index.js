var express = require('express');
var router = express.Router();
var request = require('sync-request');

var userModel = require('../models/users');
var orderModel = require('../models/order')

var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

const sgMail = require('@sendgrid/mail');

function newToken(num) {

  var token = "";

  for (let i = 0; i < num; i++) {

    var letter;
    var maj = Math.floor(Math.random()*3);

    if (maj == 0)
      maj = 65;
    else if (maj == 1)
      maj = 97;
    else
      maj = 48
    
    maj == 65 || maj == 97 ?  letter = maj + Math.floor(Math.random()*(25+1)) : letter = maj + Math.floor(Math.random()*(9+1));
    letter = String.fromCharCode(letter)
    token += letter;
  }
  return token;
}

/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
  
});

router.post('/sign-up', async function(req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;
  var SENDGRID_API_KEY = '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'
  sgMail.setApiKey(SENDGRID_API_KEY);

  const data = await userModel.findOne({
    email: req.body.email
  })

  // Gestion des erreurs

  if (data != null) {
    error.push('Utilisateur déjà présent')
  }

  if (req.body.email == ''
  || req.body.password == ''
  || req.body.confirmedpassword == ''
  ){
    error.push('Champs vides')
  }

  if (req.body.password != req.body.confirmedpassword) {
    error.push('Mots de passe différents')

  }

  if (req.body.termsofuse == 'false') {
    error.push("Veuillez accepter les conditions d'utilisation");
  }

  // Nouveau Token

  var salt = newToken(32);

  // Enregistrement d'un nouvel utilisateur

  if (error.length == 0) {
    var newUser = new userModel({
      email: req.body.email,
      salt: salt,
      password: SHA256(req.body.password + salt).toString(encBase64),
      token: newToken(32),
    })
    
    console.log('newUser :', newUser);

    saveUser = await newUser.save()

  }

  // Envoie des informations importantes vers le front-end

  res.json({result, saveUser, error})
});


router.post('/sign-in', async function(req, res, next) {

  var error = [];
  var result = false;
  var userBdd = null;

  // Gestion des erreurs

  if (req.body.email == '' || req.body.password == '') {
      error.push('Champs vides')
  } else {

    var userBdd = await userModel.findOne({ email:req.body.email });

    if (userBdd == null) {
      error.push('Compte introuvable')
    } else {

      // Comparaison des mots de passes cryptées

      if (!(SHA256(req.body.password + userBdd.salt).toString(encBase64) == userBdd.password)) {
        error.push('Mot de passe incorrect');
      } else {
          result = true;
        }
      }
    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, userBdd, error })

});

// ROUTE POST POUR LA CONFIGURATION DE LA TABLE

router.post('/new-table', async function(req, res, next) {

  var error = [];
  var result = false;
  var userBdd = null;
  var saveUser = null;
  var qrCodeTable = null;

  // Gestion des erreurs
  console.log('req.body.tableName :', req.body.tableName);

  if (req.body.tableName == '') {
      error.push('Champ vide')
  } else {

      var tokenTable = newToken(8);

      var restoBdd = await userModel.findOne({ token: req.body.restoToken })

      var right = true;

      for (let j = 0; j < restoBdd.table.length; j++) {
        if (restoBdd.table[j].tableName == req.body.tableName) {
          right = false;
          break;
        }
      }

      if (restoBdd && right) {
        restoBdd.table.push(
          { tableName: req.body.tableName, tableToken: tokenTable, tableQrCode: 'none' }
        )
        qrCodeTable = restoBdd.token + '/' + tokenTable;
        saveUser = await restoBdd.save();
        result = true;
      }
    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error, qrCodeTable, saveUser })

});

router.post('/update-table', async function(req, res, next) {

  var error = [];
  var result = false;
  var restoBdd = null;
  var nameExist = false;

  // Gestion des erreurs

  if (req.body.newTableName == '') {
      error.push('Champ vide');
  } else {

      var restoBdd = await userModel.findOne({ token: req.body.restoToken })
      var position = null;
      var idSd = null;

      for (var j = 0; j < restoBdd.table.length; j++) {
        if (restoBdd.table[j].tableName == req.body.tableName) {
          position = j;
          idSd = restoBdd.table[j]._id;
          break;
        }
      }

      for (let i = 0; i < restoBdd.table.length; i++) {
        if (i != j && restoBdd.table[i].tableName == req.body.newTableName) {
          error.push('Nom déjà existant')
          nameExist = true;
        }
      }

      console.log('idSd :', idSd);
      console.log('restoBdd.table[0]._id :', restoBdd.table[0]._id);
      console.log('nameExist :', nameExist);
      if (!nameExist) {

        restoBdd.table[position].tableName = req.body.newTableName;
        saveUser = await restoBdd.save();

        // userModel.findByIdAndUpdate(idSd, {
        //   $set: {
        //       tableName: req.body.newTableName
        //   }
        // });

        result = true;
      }

    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error })

});

router.post('/delete-table', async function(req, res, next) {

  var error = [];
  var result = false;
  var restoBdd = null;

  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  if (restoBdd == undefined) {
    error.push('Fatal Error : Restorant introuvable')
  } else {

    var restoBdd = await userModel.findOne({ token: req.body.restoToken })
    var position = null;

    for (var j = 0; j < restoBdd.table.length; j++) {
      if (restoBdd.table[j].tableName == req.body.tableName) {
        position = j;
        break;
      }
    }

    restoBdd.table.splice(position, 1)

    saveUser = await restoBdd.save();

    result = true;
  }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error })

});

router.post('/load-table', async function(req, res, next) {

  var allTable = null;
  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  console.log('restoBdd :', restoBdd);

  if (restoBdd) {
    allTable = restoBdd.table;
  }

  // Envoie des informations importantes vers le front-end

  res.json({ allTable })

});

// ROUTE POST POUR LA CONFIGURATION DU MENU

router.post('/new-menu', async function(req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;

  // Gestion des erreurs

  if (req.body.categorieName == '') {
      error.push('Champ vide')
  } else {

      var restoBdd = await userModel.findOne({ token: req.body.restoToken })

      var right = true;

      for (let j = 0; j < restoBdd.menu.length; j++) {
        if (restoBdd.menu[j].category == req.body.categorieName) {
          right = false;
          break;
        }
      }

      if (restoBdd && right) {
        restoBdd.menu.push(
          { category: req.body.categorieName, products: [] }
        )
        console.log('restoBdd :', restoBdd.menu);
        saveUser = await restoBdd.save();
        result = true;
      }

    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error, saveUser })

});

router.post('/delete-menu', async function(req, res, next) {

  var error = [];
  var result = false;
  var restoBdd = null;

  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  if (restoBdd == undefined) {
    error.push('Fatal Error : Restorant introuvable')
  } else {

    var position = null;

    for (var j = 0; j < restoBdd.menu.length; j++) {
      if (restoBdd.menu[j].category == req.body.catgorieName) {
        position = j;
        break;
      }
    }

    restoBdd.menu.splice(position, 1)

    saveUser = await restoBdd.save();

    result = true;
  }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error })

});

router.post('/update-menu', async function(req, res, next) {

  var error = [];
  var result = false;
  var restoBdd = null;
  var nameExist = false;

  // Gestion des erreurs

  if (req.body.newCategorieName == '') {
      error.push('Champ vide');
  } else {

      var restoBdd = await userModel.findOne({ token: req.body.restoToken })
      var position = null;
      var idSd = null;

      for (var j = 0; j < restoBdd.menu.length; j++) {
        if (restoBdd.menu[j].category == req.body.categorieName) {
          position = j;
          idSd = restoBdd.menu[j]._id;
          break;
        }
      }

      for (let i = 0; i < restoBdd.menu.length; i++) {
        if (i != j && restoBdd.menu[i].category == req.body.newCategorieName) {
          error.push('Nom déjà existant')
          nameExist = true;
        }
      }

      if (!nameExist) {
        restoBdd.menu[position].category = req.body.newCategorieName;
        saveUser = await restoBdd.save();
        result = true;
      }

    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error })

});

router.post('/load-menu', async function(req, res, next) {

  var allMenu = null;
  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  if (restoBdd) {
    allMenu = restoBdd.menu;
  }

  console.log('allMenu :', allMenu);

  // Envoie des informations importantes vers le front-end

  res.json({ allMenu })

});

<<<<<<< HEAD
// ROUTE POST POUR LA CONFIGURATION DE PRODUIT

router.post('/new-produit', async function(req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;

  // Gestion des erreurs
  console.log('req.body :', req.body);
  console.log('req.body.produitTVA :', req.body.produitTVA);
  console.log('req.body.produitTVA PARSE :', parseInt(req.body.produitTVA));

  if (req.body.produitName == '' || req.body.produitPrice == undefined || req.body.produitTVA == undefined) {
      error.push('Champ(s) vide(s)');
  } else {

      var restoBdd = await userModel.findOne({ token: req.body.restoToken })

      var right = true;

      for (let k = 0; k < restoBdd.menu.length; k++) {
        for (let j = 0; j < restoBdd.menu[k].products.length; j++) {
          console.log('restoBdd.menu[k].products[j] :', restoBdd.menu[k].products[j]);
          if (restoBdd.menu[k].products[j].name == req.body.produitName) {
            right = false;
            console.log('restoBdd.menu[k].products[j].name :', restoBdd.menu[k].products[j].name);
            error.push('Nom déjà existant')
            break;
          }
        }
      }

      var position = null;

      for (let i = 0; i < restoBdd.menu.length; i++) {
        if (restoBdd.menu[i].category == req.body.categorieName) {
          position = i;
          break;
        }
      }

      var priceWithTva = null;

      if (req.body.produitTVA >= 0 && req.body.produitTVA <= 100) {
        priceWithTva = parseInt(req.body.produitPrice) + ((parseInt(req.body.produitPrice) * parseInt(req.body.produitTVA))/100)
      } else
        error.push('Veuillez rentrez un nombre entre 0 et 100 pour la tva');

      if (restoBdd && right && position != null && priceWithTva != null) {
        console.log('priceWithTva :', priceWithTva);
        restoBdd.menu[position].products.push(
          { name: req.body.produitName, price: priceWithTva, tva: parseInt(req.body.produitTVA) }
        )
        console.log('restoBdd :', restoBdd.menu);
        saveUser = await restoBdd.save();
        result = true;
      }

    }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error, saveUser })

});

router.post('/load-produit', async function(req, res, next) {

  var position = null;
  var allProduit = null;
  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  if (restoBdd) {
    dataProduit = restoBdd.menu;
  }

  for (let l = 0; l < restoBdd.menu.length; l++) {
    if (restoBdd.menu[l].category == req.body.categorieName) {
      position = l;
      break;
    }
  }

  var allProduit = restoBdd.menu[position].products;

  console.log('allProduit :', allProduit);

  // Envoie des informations importantes vers le front-end

  res.json({ allProduit })

});

router.post('/delete-produit', async function(req, res, next) {

  var error = [];
  var result = false;
  var restoBdd = null;

  var restoBdd = await userModel.findOne({ token: req.body.restoToken })

  if (restoBdd == undefined) {
    error.push('Fatal Error : Restorant introuvable')
  } else {

    var position = null;

    for (var j = 0; j < restoBdd.menu.length; j++) {
      if (restoBdd.menu[j].category == req.body.categorieName) {
        for (let z = 0; z < restoBdd.menu[j].products.length; z++) {
          if (restoBdd.menu[j].products[z].name == req.body.produitName) {
            restoBdd.menu[j].products.splice(z, 1);
          }
        }
      }
    }

    // restoBdd.menu.splice(position, 1)

    saveUser = await restoBdd.save();

    result = true;
  }

  // Envoie des informations importantes vers le front-end

  res.json({ result, restoBdd, error })

});
=======


/**
 * Get order infos from BDD
 */
router.get('/orderPayed', async function(req, res, next) {

  
  var order = await orderModel.find()

 
  console.log('order in back:', order);

  res.json({ result:true, order: order.orderBDD })

  

});



>>>>>>> 9934d026be6763e3907c8a7a63c67c3919e71248


module.exports = router;
