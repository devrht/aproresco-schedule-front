import React from 'react';
import logo from './logo.svg';
import './style.css';
import GoogleLogin from 'react-google-login';
import { googleSignIn } from '../../services/Teacher'

function Login() {


    const _onGoogleSignIn = (data) => {
        googleSignIn(data.tokenObj.id_token)
        .then(user => {
            console.log('USER ==> ', user)
            user ? window.location.reload(true) : alert('your account is not registered in the system');
        })
        .catch(apiError => {
            alert('your account is not registered in the system');
        });
    }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          You have to sign in with google before continue
        </p>
        <GoogleLogin
            clientId="631785752296-26dcjnpcnjma16s630fcvhivhi8qsdg6.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={(data) => _onGoogleSignIn(data)}
            onFailure={(error) => console.log('ERROR ==> ', error)} >
        </GoogleLogin>
      </header>
    </div>
  );
}

export default Login;