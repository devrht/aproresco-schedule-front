import React from 'react';
import logo from './logo.svg';
import './style.css';
import GoogleLogin from 'react-google-login';
import { googleSignUp } from '../../services/Teacher'

function Login() {


    const _onGoogleSignUp = (data) => {
        console.log(data);
        googleSignUp(data.profileObj)
        .then(user => console.log('OVER...', user))
        .catch(apiError => {
            console.log('Erreur dans te APP.tsx ', apiError);
            if (apiError && apiError.status == 400) {
            } else {
            console.log('Erreur de connexion');
            }
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
            onSuccess={(data) => _onGoogleSignUp(data)}
            onFailure={(error) => console.log('ERROR ==> ', error)} >
        </GoogleLogin>
      </header>
    </div>
  );
}

export default Login;