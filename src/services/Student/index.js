import axios from 'axios';
import * as routes from '../routes';


const headers = {
    'Content-type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + btoa(routes.OAUTH.CLIENT_ID + ":" + routes.OAUTH.CLIENT_SECRET)
}

export const getStudentListById = (TeacherId, type = 'availabilityId') => {
    // return axios.get(`${routes.SERVER_ADDRESS}/teacher-availability/${TeacherId}/student-bookings`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?${type}=${TeacherId}`)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentList = (page, size, sortName, sortType) => {

    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentListByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getScheduleByDate = (gradeMin, gradeMax, start, end, page, size, sortName, sortType) => {
    let tenant = JSON.parse(localStorage.getItem("tenant"));
    return axios.get(`https://meet.appui.io:8443/search/schedules?gradeMin=${gradeMin}&gradeMax=${gradeMax}&tenantKey=${tenant}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentProfileByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-profiles?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getTeacherProfileByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-profiles?page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getShortMessagesByDate = (start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/short-messages?startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getStudentDetail = (studentId) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getBookings = (studentId) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/${studentId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentListByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-bookings?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findScheduleByGrade = (gradeMin, gradeMax, start, end, page, size, sortName, sortType) => {
    let tenant = JSON.parse(localStorage.getItem("tenant"));
    return axios.get(`https://meet.appui.io:8443/search/schedules?gradeMin=${gradeMin}&gradeMax=${gradeMax}&tenantKey=${tenant}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findStudentProfileByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    return axios.get(`${routes.SERVER_ADDRESS}/search/student-profiles?firstName=${firstName}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const findTeacherProfileByFirstNameAndLastName = (firstName, start, end, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/teacher-profiles?firstName=${firstName}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const getShortMessages = (firstName, start, end, page, size, sortName, sortType) => {
    //return axios.get(`${routes.SERVER_ADDRESS}/students_bookings/search/findByStudentProfileFirstNameIgnoreCaseContainingOrStudentProfileLastNameIgnoreCaseContaining?firstName=${firstName}&lastName=${lastName}&sort=${sortName},${sortType}`)
    return axios.get(`${routes.SERVER_ADDRESS}/search/short-messages?firstName=${firstName}&startDate=${start}&endDate=${end}&page=${page}&size=${size}&sort=${sortName},${sortType}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentlistToTeacher = (teacherId, studentIds) => {
    console.log(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`);
    return axios.get(`${routes.SERVER_ADDRESS}/schedule/${teacherId}/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const deleteStudentBooking = (studentIds) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/disable/${studentIds}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignStudentToAnotherTeacher = (teacherId, studentIds) => {
    let student_ids = [];

    studentIds.split(',').forEach(id => {
        let item = {};
        item.id = id;
        student_ids.push(item);
    });

    let data = {
        "studentBookings":
            student_ids
    }
    // console.log(`${routes.SERVER_ADDRESS}/meet/assign/${studentIds}/${teacherId}`);
    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-availability/${teacherId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const assignMeetingToAnotherTeacher = (teacherId, url) => {
    let data = {
        "teacherProfile": {
            "conferenceUrl": url
        }
    }
    return axios.patch(`${routes.SERVER_ADDRESS}/teacher-availability/${teacherId}`, data)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const bridgeManagement = (status) => {
    return axios.get(`https://meet.appui.io:8443/bridge?open=${status}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const persistManagement = (status) => {
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge?persist=${status}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const bridgeStatus = () => {
    return axios.get(`${routes.SERVER_ADDRESS}/meet/bridge/status`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const editSubject = (id, subject) => {
    return axios.get(`${routes.SERVER_ADDRESS}/student-bookings/update/${id}?subject=${subject}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            //alert(err.message);
        })
}

export const editSubjectGrade = (id, subjects, grades) => {
    return axios.get(`${routes.SERVER_ADDRESS}/teachers_availabilities/update/${id}?subjects=${subjects}&grades=${grades}`)
        .then(res => {
            return res;
        })
        .catch(err => {
            //alert(err.message);
        })
}