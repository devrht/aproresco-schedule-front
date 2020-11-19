import axios from 'axios';
import * as routes from '../routes';


const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getStudentListById = (TeacherId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByTeacherAvailabilityIdIn?ids=${TeacherId}`
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

    return axios.get(`${routes.SERVER_ADDRESS}/search/students_bookings?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentListByDate = (start, end, page, size, sortName, sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/search/students_bookings?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getShortMessagesByDate = (start, end, page, size, sortName, sortType) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/search/short_messages?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getStudentDetail = (studentId) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/${studentId}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName,start, end, page, size, sortName, sortType) =>{
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/students_bookings?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const getShortMessages = (firstName,start, end, page, size, sortName, sortType) =>{
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/short_messages?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId,studentIds) =>{
    console.log(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`);
    return axios.get(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const deleteStudentBooking = (studentIds) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/disable/${studentIds}`)
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            alert(err.message);
        })
}

export const assignStudentToAnotherTeacher = (teacherId,studentIds) =>{
    console.log(`${routes.SERVER_ADDRESS}/meet/assign/${studentIds}/${teacherId}`);
    return axios.get(`${routes.SERVER_ADDRESS}/meet/assign/${studentIds}/${teacherId}`)
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        alert(err.message);
    })
}

export const assignMeetingToAnotherTeacher = (teacherId,url) =>{
    console.log(`${routes.SERVER_ADDRESS}/meet/assign/${teacherId}?url=${url}`);
    return axios.get(`${routes.SERVER_ADDRESS}/meet/assign/${teacherId}?url=${url}`)
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        alert(err.message);
    })
}

export const bridgeManagement = (status) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge?open=${status}`)
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        alert(err.message);
    })
}

export const persistManagement = (status) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge?persist=${status}`)
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        alert(err.message);
    })
}

export const bridgeStatus = () =>{
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge/status`)
    .then(res =>{
        return res.data;
    })
    .catch(err =>{
        alert(err.message);
    })
}

export const editSubject = (id, subject) =>{
    return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/update/${id}?subject=${subject}`)
    .then(res =>{
        return res;
    })
    .catch(err =>{
        alert(err.message);
    })
}