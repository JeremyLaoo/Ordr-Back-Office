var express = require('express');
var router = express.Router();
var request = require('sync-request');

var userModel = require('../models/users');

var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

const sgMail = require('@sendgrid/mail');

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
      token: newToken(32),
      tokenToCheck: newToken(16),
      checked: false
    })
    
    console.log('newUser :', newUser);

    saveUser = await newUser.save()
  
    if (saveUser) {
      result = true
      const msg = {
        to: 'edgarcovarel@yahoo.fr',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>your validation token is :${saveUser.tokenToCheck}</strong>`,
      };
      sgMail.send(msg);
    }
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
        if (userBdd.checked == false) {
          if ((req.body.token == userBdd.tokenToCheck)) {
            result = true;
            await userModel.update({ email: userBdd.email }, {$set:{checked: true}})
            console.log('userBdd :', userBdd);
          }
          error.push("Votre compte n'est pas activé")
        } else {
          result = true;
        }
      }
    }
  }

  console.log('userBdd :', userBdd);
  // Envoie des informations importantes vers le front-end

  res.json({ result, userBdd, error })

});

module.exports = router;
