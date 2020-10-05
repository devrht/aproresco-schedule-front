import axios from 'axios'
import * as routes from '../routes';

const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getTeacherList = (page,size,sortName,sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/teachers?page=${page}&size=${size}&sort=${sortName},${sortType}`
    )
        .then(res =>{
            return res.data;
        })
}

// export const getTeacherListByFirstName = (name) =>{
//     return axios.get(`${routes.SERVER_ADDRESS}/teachers/search/findByFirstName?name=${name}`)
//         .then(res =>{
//             console.log("env : ", process.env.REACT_APP_BASE_API_URL)
//             return res.data;
//         })
// }

export const findTeacherListByFirstNameAndLastName = (firstName,lastName,sortName,sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/teachers/search/findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`
    ,  { headers, withCredentials: true })
        .then(res =>{
            return res.data;
        })
}

export const googleSignIn = (google_id) => {
    const body = new FormData();
    body.append('idToken', google_id);
    return axios.post(`${routes.SERVER_ADDRESS}/auth/login/google`, body).then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('expireAt', res.data.expireAt);
        return res;
    })
}

export const googleSignUp = (user) => {
    const body = new FormData();
    body.append('email', user.email);
    body.append('family_name', user.familyName);
    body.append('given_name', user.givenName);
    body.append('avatar', user.imageUrl);
    body.append('name', user.name);
    body.append('google_id', user.googleId);
    body.append('password', '1234');

    return axios.post(`${routes.SERVER_ADDRESS}/auth/google/signup`, body).then(res => {
            console.log(res)
            return res;
        })
}
