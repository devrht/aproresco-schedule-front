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

export const newTenant = (value) => {

    let data = {
        tenants: [
            {
              "key": value
            }
        ]
    }

    let id = JSON.parse(localStorage.getItem("id"));

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

export const getTeacherProfile = (email = null) => {
    email = email == null ? JSON.parse(localStorage.getItem("email")) : email;
    return axios.get(`${routes.SERVER_ADDRESS}/teacher-profile/email/${email}`)
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
    body.append('token', id_token);
    body.append('provider', 'google');

    let data = { "token": id_token, "provider": 'google' }

    var config = {
        headers: {
            'Content-Length': 0,
            'Content-Type': 'text/plain'
        },
        responseType: 'text'
    };

    return axios.post(`${routes.SERVER_ADDRESS}/oauth/verify`, data).then(res => {
        localStorage.setItem('token', JSON.stringify(res.data));
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

export const createSchedule = (subject, startDate, description) => {
    let data = {
        subject,
        startDate,
        description
    }
    return axios.post(`${routes.SERVER_ADDRESS}/schedule`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const createStudent = (firstName, lastName, email, schoolName, schoolBoard, grade, parent) => {
    let data = {
        firstName,
        lastName,
        email,
        schoolName,
        schoolBoard,
        grade,
        parent: {email: parent}
    }
    return axios.post(`${routes.SERVER_ADDRESS}/student-profile`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const createTeacher = (firstName, lastName, email, iemail, schoolName, schoolBoard, grade, subjects, phone) => {
    let data = {
        firstName,
        lastName,
        externalEmail: email,
        internalEmail: iemail,
        schoolName,
        schoolBoard,
        grade,
        phoneNumber: phone,
        subjects: subjects.split(',')
    }
    return axios.post(`${routes.SERVER_ADDRESS}/teacher-profile/register`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const createBooking = (studentProfile, schedule, studentComment) => {
    let data = {
        studentProfile,
        schedule,
        studentComment
    }
    return axios.post(`${routes.SERVER_ADDRESS}/student-booking`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}


export const createAvailibility = (teacherProfile, schedule) => {
    let data = {
        teacherProfile,
        schedule,
    }
    return axios.post(`${routes.SERVER_ADDRESS}/teacher-availability`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const createParent = (phoneNumber, countryCode, email, tenant) => {
    let data = {
        phoneNumber,
        countryCode,
        email,
        tenants: [
            {
              "key": tenant
            }
        ]
    }
    return axios.post(`${routes.SERVER_ADDRESS}/student-parent`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}

export const createMessage = (type, startDate, endDate, message, subject, async, template) => {
    let data = {
        startDate,
        endDate,
        message,
        subject,
        async,
        template
    }
    let url = type == 'StudentProfile' ? '/reminder/students' : '/reminder/teachers';
    return axios.post(`${routes.SERVER_ADDRESS}/${url}`, data).then(res => {
        return res;
    }).catch(err => console.log(err));
}