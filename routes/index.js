var express = require('express');
var router = express.Router();
var request = require('sync-request');

var userModel = require('../models/users');

var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
  
});

router.post('/sign-up', async function(req, res, next) {

  var error = [];
  var result = false;
  var saveUser = null;

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

  // Enregistrement d'un nouvel utilisateur

  var salt = newToken(32);

  if (error.length == 0) {
    var newUser = new userModel({
      email: req.body.email,
      salt: salt,
      password: SHA256(req.body.password + salt).toString(encBase64),
      token: newToken(32)
    })
    
    console.log('newUser :', newUser);

    saveUser = await newUser.save()
  
    if (saveUser)
      result = true
  }

  // Envoie des informations importantes vers le front-end

  res.json({result, saveUser, error})
});


router.post('/sign-in', async function(req, res, next) {

  var error = [];
  var result = false;
  var userBdd = null;
  var token = null;

  // Gestion des erreurs

  if (req.body.email == '' || req.body.password == '') {
      error.push('Champs vides')
  } else {

    var userBdd = await userModel.findOne({ email:req.body.email });

    if (userBdd == null) {
      error.push('Compte introuvable')
    } else {

      // Comparaison des mots de passes cryptées

      if (SHA256(req.body.password + userBdd.salt).toString(encBase64) == userBdd.password) {
        result = true
        token = userBdd.token;
      } else {
        error.push('Mot de passe incorrect');
      }
    }
  }

  // Envoie des informations importantes vers le front-end

  res.json({ result, userBdd, error, token })

});

module.exports = router;
