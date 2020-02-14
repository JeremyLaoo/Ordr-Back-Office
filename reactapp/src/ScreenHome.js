import React, { useState } from 'react';
import './App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


function ScreenHome(props) {

  const [isLogin, setIsLogin] = useState(false);

  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  var handleSignUpClick = async ()=> {
    let userSignUp = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `firstname=${signUpFirstName}&email=${signUpEmail}&password=${signUpPassword}`
    })
    var response = await userSignUp.json()



    if(response.state === true){

      let token = response.token;
      let lang = response.lang;
      props.saveToken(token);
      props.saveLang(lang);
      setIsLogin(true);

    } else {
      
      setSignUpError(response.mess);
      setSignUpFirstName('');
      setSignUpEmail('');
      setSignUpPassword('');

    }
  }

  var handleSignInClick = async ()=> {
    var userSignIn = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })
    var response = await userSignIn.json();

    if(response.state === true){    

      let token = response.token;
      let lang = response.lang;
      props.saveToken(token);
      props.saveLang(lang);
      setIsLogin(true);

      console.log('sign in token ' + token + lang)

    } else {

      setSignInError(response.mess);
      setSignInEmail('');
      setSignInPassword('');

    }
  }


  if(isLogin){

    return (
      <Redirect to='/screensource' />
    );

  } else {


    return (

      <div className="Login-page" > 

      {/* SIGN-IN */}

      <div className="Sign">
              
        <Input
        className="Login-input" 
        placeholder="arthur@lacapsule.com"
        onChange={(e) => setSignInEmail(e.target.value)}
        value={signInEmail} 
        required
        />

        <Input.Password
        className="Login-input" 
        placeholder="Mot de passe"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword} 
        required
        />  

        <Button onClick={() => handleSignInClick()} style={{width:'80px'}} type="primary">Sign-in</Button>

        <span className="error">{signInError}</span>

      </div>

      {/* SIGN-UP */}

      <div className="Sign">


        <Input 
        className="Login-input" 
        placeholder="Arthur"
        type="text"
        onChange={(e) => setSignUpFirstName(e.target.value)}
        value={signUpFirstName} 
        required
        />
              
        <Input 
        className="Login-input" 
        placeholder="arthur@lacapsule.com"
        onChange={(e) => setSignUpEmail(e.target.value)}
        value={signUpEmail} 
        required
        />

        <Input.Password
        className="Login-input" 
        placeholder="Mot de passe"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword} 
        required
        />            

        <Button onClick={() => handleSignUpClick()} style={{width:'80px'}} type="primary">Sign-up</Button>

        <span className="error">{signUpError}</span>

      </div>

  </div>
  );
      
  }

}

function mapDispatchToProps(dispatch) {

  return {
    saveToken: function(token) { 
        dispatch( {type: 'saveToken', token: token} )

        console.log('SAVE TOKEN : ' + token);

    },
    saveLang: function(lang) {
        dispatch( {type: 'saveLang', lang: lang})

        console.log('LOGIN LANG : ' + lang)
    }
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(ScreenHome);
