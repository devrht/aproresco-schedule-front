import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, PageHeader, Button,Spin} from 'antd';
import {getStudentListById} from '../../services/Student'
import StudentList from '../StudentList';

const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        fixed: 'left',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        fixed: 'left',
    },
    {
        title: 'Period',
        dataIndex: 'period',
        key: 'period',
        fixed: 'left',
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subjects',
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: () => <Button>Edit</Button>,
    },
];
function StudentListOfTeacher(props) {
    const {params} = props.match;
    const [studentList,setStudentList] = useState();
    const [students, setStudents] = useState();
    const [studentsTmp, setStudentsTmp] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getListView();
    },[]);
    const getListView = () =>{
        getStudentListById(params.id).then(data => {
            setStudentList(data._embedded.studentBookings);
            data._embedded.studentBookings.forEach(student => {
                let datas = studentsTmp;
                let elt = new Object();
                elt.studentProfile = student.studentProfile;
                elt.studentProfile.subject = student.subject;
                elt.studentProfile.id = student.id;
                datas.push(elt.studentProfile);
                setStudentsTmp(datas);
            });
            setStudents(studentsTmp);
        })
    }
    return (
        <div>
            {/* {console.log(params)}
            students history.... {params.id} */}
            <PageHeader
                ghost={false}
                title={studentList && studentList.length > 0 && `Student List of ${studentList[0].teacherAvailability.teacherProfile.firstName} ${studentList[0].teacherAvailability.teacherProfile.lastName}`}
                extra={[
                    <Button key="1" type="primary">Genrate Calender</Button>,
                    <Button key="2" type="primary">Launch Schedule</Button>
                ]}
            >
               
                {!studentList || !students ?<Spin/>:
                    <Table 
                columns={columns} 
                dataSource={students}
                onRow={(record) => ({
                    onClick: () => (history.push(`/studentlist/studentDetail/${record.id}`))
                })} 
                />
                }
            </PageHeader>
        </div>
    )
}
export default StudentListOfTeacher
