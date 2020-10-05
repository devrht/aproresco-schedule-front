import axios from 'axios';
import * as routes from '../routes';


const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getStudentListById = (TeacherId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students/search/findByTeacherId?id=${TeacherId}`
    )
        .then(res =>{
            console.log(res.data);
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentList = (page,size,sortName,sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentDetail = (studentId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students/${studentId}`
    ,  { headers, withCredentials: true })
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName,lastName,sortName,sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students/search/findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`
    ,  { headers, withCredentials: true })
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId,studentIds) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/plan/${teacherId}/${studentIds}`
    ,  { headers, withCredentials: true })
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}