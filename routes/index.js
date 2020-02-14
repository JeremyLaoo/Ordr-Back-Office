var express = require('express');
var router = express.Router();
var request = require('sync-request');
var uid2 = require("uid2");

var userModel = require('../models/users');

var bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/lang', async function(req,res,next) {

  bddUser = await userModel.findOne({ token:req.body.token });

  bddUser.lang = req.body.lang;
  await bddUser.save();

  res.json({
    lang: true, 
    lang: bddUser.lang,
    mess: 'Changement de langue réussie !'
  });

})



router.post('/sign-up', async function(req, res, next) {

  if(req.body.email == '' || req.body.password == '') {
    res.json({
      state: false, 
      mess: 'Vérifiez les informations saisies'
    });
  } else {
    alreadyExist = await userModel.findOne({ email:req.body.email });

    console.log(alreadyExist)

    if(alreadyExist === null){

        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
          var newUser = await new userModel({
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,
            token: uid2(32),
            lang: 'fr'
          })
          var userSaved = await newUser.save();

          console.log('*** Inscription ' + req.body.email + ' réussie ***')
          console.log(userSaved)

          res.json({
            state: true, 
            firstname: userSaved.firstname,
            email: userSaved.email, 
            token: userSaved.token,
            lang: userSaved.lang,
            mess: 'Inscription réussie'
          });
        
        });   

    } else {

      console.log('/// '+ req.body.email + ' est déjà inscrit !');
      res.json({
        state: false, 
        mess: 'Erreur d\'inscription'
      });

    }
  }
});


router.post('/sign-in', async function(req, res, next) {

  if(req.body.email == '' || req.body.password == '') {
    res.json({
      state: false, 
      mess: 'Vérifiez les informations saisies'
    });
  } else {

    let userBdd = await userModel.findOne({ email:req.body.email });

    if(userBdd == null) {

      console.log(userBdd.email + ' : Compte client introuvable')

      res.json({
        state: false, 
        mess: 'Erreur d\'authentification'
      }); 

    } else {

      bcrypt.compare(req.body.password, userBdd.password, function (err, result) {
          if (result == true) {

            console.log(userBdd.email + ' : Mot de passe correct')

            res.json({
              state: true, 
              mess: 'Authentification réussie',
              token: userBdd.token,
              lang: userBdd.lang
            }); 

          } else {
            console.log(userBdd.email + ' : Mauvais mot de passe')

            res.json({
              state: false, 
              mess: 'Erreur d\'authentification'
            }); 
            
          }
      });
    }

  }

});

router.post('/add-article', async function(req, res, next) {

  var objectWhishlist = JSON.parse(req.body.article);

  let user = await userModel.findOne({ token:req.body.token });

  user.whishlist.push(
    objectWhishlist
  )

  var userSaved = await user.save();
  
});


router.get('/get-whishlist/:token', async function(req, res, next) {
  
  var token = req.params.token;

  let user = await userModel.findOne({ token: token });

  console.log('user est ici et là :', user.whishlist);

  res.json(user.whishlist)
});

module.exports = router;
