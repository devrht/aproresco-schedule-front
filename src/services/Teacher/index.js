import axios from 'axios'
import * as routes from '../routes';

const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    AccessControlAllowOrigin: '*'
    // Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getTeacherList = (page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-availabilities?page=${page}&size=${size}&sort=${sortName},${sortType}`, {
        headers: {
            // AccessControlAllowOrigin: "*",
            AccessControlAllowHeaders: "Content-Type",
            AccessControlAllowMethods: "GET, POST, OPTIONS, DELETE, PATCH",
            AccessControlAllowCredentials: "true"
        },
    })
        .then(res => {
            return res.data;
        })
}

export const markAsSupervisor = (id, value) => {

    let data = {
        "supervisor": value
    }

    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-profile/${id}`, data)
        .then(res => {
            return res.data;
        })
}

export const markAsAdmin = (id, value) => {

    let data = {
        "tenantAdmin": value
    }

    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-profile/${id}`, data)
        .then(res => {
            return res.data;
        })
}

export const getTeacherListByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-availabilities?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PATCH",
            "Access-Control-Allow-Credentials": "true"
        },
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const deleteTeacherAvailabilities = (teacherIds) => {
    return axios.get(`${routes.SERVER_ADDRESS}/teacher-availabilities/disable/${teacherIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}


export const markTeacherAsPresent = (teacherIds, value) => {
    return axios.get(`${routes.SERVER_ADDRESS}/teacher-availabilities/update/${teacherIds}?present=${value}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findTeacherListByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-availabilities?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, PATCH",
            "Access-Control-Allow-Credentials": "true"
        },
    })
        .then(res => {
            return res.data;
        })
}

export const googleSignIn = (id_token) => {
    const body = new FormData();
    body.append('idToken', id_token);

    var config = {
        headers: {
            'Content-Length': 0,
            'Content-Type': 'text/plain'
        },
        responseType: 'text'
    };

    return axios.post(`${routes.SERVER_ADDRESS}/oauth/verify`, { token: id_token, source: 'google' }, {
        headers: {
            'Content-Type': 'text/plain'
        }
    }).then(res => {
        console.log("DATA RESPONSE => ", res)
        localStorage.setItem('token', JSON.stringify(res));
        var date = new Date(); // Now
        date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
        localStorage.setItem('expireAt', date);
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