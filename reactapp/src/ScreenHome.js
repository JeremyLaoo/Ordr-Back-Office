import React, { useState } from 'react';
import './App.css';
import {Input,Button,Checkbox} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


function ScreenHome(props) {

  const [isLogin, setIsLogin] = useState(false);

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmedPassword, setSignUpConfirmedPassword] = useState('');
  const [termsOfUse, setTermsOfUse] = useState(false);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInTokenToCheck, setSignInTokenToCheck] = useState('');
  
  const [signInError, setSignInError] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const [inputTokenIsVisible, setInputTokenIsVisible]  = useState('none');

  /* SIGN-UP FUNCTION */

  var handleSignUpClick = async () => {
    console.log('termsOfUse :', termsOfUse);
    let userSignUp = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signUpEmail}&password=${signUpPassword}&confirmedpassword=${signUpConfirmedPassword}&termsofuse=${termsOfUse}`
    })
    var response = await userSignUp.json()

    if (response.result) {
      
      props.saveToken(response.saveUser.token, response.saveUser.tokenToCheck);
      setIsLogin(true);
      
    } else {
      
      setSignUpError(response.error[0]);
      // setSignUpEmail('');
      setSignUpPassword('');
      setSignUpConfirmedPassword('');

    }
  }

  /* SIGN-IN FUNCTION */

  var handleSignInClick = async () => {
    var userSignIn = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}&token=${signInTokenToCheck}`
    })
    var response = await userSignIn.json();

    if (response.result) {

      props.saveToken(response.userBdd.token, response.userBdd.tokenToCheck);

      setIsLogin(true);
      
    } else {
      
      if (response.error[0] === "Votre compte n'est pas activé") {
        setInputTokenIsVisible('block');
      } else {
      // setSignInEmail('');
      setSignInPassword('');
      }
      setSignInError(response.error[0]);
    }
  }

  /* REDIRECTION */

  if (isLogin) {
    return (
      <Redirect to='/screensuccess' />
    );

  } else {


    return (

      <div className="Login-page" > 

      {/* SIGN-IN */}

      <div className="Sign">
              
        <Input
        className="Login-input" 
        placeholder="email@placeholder.com"
        onChange={(e) => setSignInEmail(e.target.value)}
        value={signInEmail} 
        required
        />

        <Input.Password
        className="Login-input" 
        placeholder="Password"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword} 
        required
        />  

        <Input
        style={{display: `${inputTokenIsVisible}`}}
        className="Login-input" 
        placeholder="Your token (sended by mail)"
        onChange={(e) => setSignInTokenToCheck(e.target.value)}
        value={signInTokenToCheck} 
        required
        />  

        <Button onClick={() => handleSignInClick()} style={{width:'80px'}} type="primary">Sign-in</Button>

        <span style={{marginTop: '10px'}} className="error">{signInError}</span>

      </div>

      {/* SIGN-UP */}

      <div className="Sign">
              
        <Input 
        className="Login-input" 
        placeholder="email@placeholder.com"
        onChange={(e) => setSignUpEmail(e.target.value)}
        value={signUpEmail} 
        required
        />

        <Input.Password
        className="Login-input" 
        placeholder="Password"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword} 
        required
        />  

        <Input.Password
        className="Login-input" 
        placeholder="Repeat Password"
        onChange={(e) => setSignUpConfirmedPassword(e.target.value)}
        value={signUpConfirmedPassword} 
        required
        />          

        <Checkbox style={{marginBottom: '15px'}} onChange={() => setTermsOfUse(!termsOfUse)}>Terms of use</Checkbox>

        <Button onClick={() => handleSignUpClick()} style={{width:'80px'}} type="primary">Sign-up</Button>

        <span style={{marginTop: '10px'}} className="error">{signUpError}</span>

      </div>

  </div>
  );
      
  }

}

function mapDispatchToProps(dispatch) {

  return {
    saveToken: function(token, tokenToCheck) { 
        dispatch( {type: 'saveToken', token: token, tokenToCheck: tokenToCheck} )

        console.log('SAVE TOKEN : ' + token);
        console.log('SAVE TOKENTOCHECK : ' + tokenToCheck);

    }
  }
}

export default connect(
  null, 
  mapDispatchToProps
)(ScreenHome);
