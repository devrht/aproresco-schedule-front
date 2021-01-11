import React from 'react';
import './style.css';
import background from '../../Assets/image.png';
import vector from '../../Assets/vector.png';
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { googleSignIn, getTeacherProfile } from '../../services/Teacher'

function Login() {

  const history = useHistory();

  const _onGoogleSignIn = (data) => {
    googleSignIn(data.tokenObj.id_token)
      .then(user => {
        if (user) {
          getTeacherProfile(data.profileObj.email).then(data => {
            let mail = JSON.parse(localStorage.getItem("email"));
            if (mail != data.externalEmail) {
              localStorage.removeItem('tenant');
            }
            localStorage.setItem('email', JSON.stringify(data.externalEmail));
            history.push(`/studentprofiles`);
          });
        } else {
          alert('your account is not registered in the system');
        }
      })
      .catch(apiError => {
        console.log(apiError)
        alert('your account is not registered in the system');
      });
  }


  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <img src={vector} style={{ width: '120px', marginLeft: '2%', marginTop: '2%' }} />
      <header className="App-header">
        <p className='pStyle'>
          Appuie Scolaire de la Reussite
        </p>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', minWidth: '25%' }}>
          <GoogleLogin
            clientId="631785752296-26dcjnpcnjma16s630fcvhivhi8qsdg6.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            style={{
              width: '331px',
              height: '60px',
              borderRadius: '60px',
              backgroundColor: '#f6f9ff',
              marginRight: '20px',
              border: '5px solid rgba(255,255,255,0.3)'
            }}
            onSuccess={(data) => _onGoogleSignIn(data)}
            onFailure={(error) => console.log('ERROR ==> ', error)} >
          </GoogleLogin>
          <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            buttonText="Sign in with Facebook"
            fields="name,email,picture"
            size={'small'}
          // onClick={componentClicked}
          // callback={responseFacebook} 
          />
        </div>

        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p style={{
            color: 'white',
            marginRight: '50px'
          }}>2013 - 2021 Aproresco</p>

          <p style={{
            color: 'white'
          }}>Terms and Services | Privacy | Contact Us</p>
        </div>
      </header>
    </div>
  );
}

export default Login;