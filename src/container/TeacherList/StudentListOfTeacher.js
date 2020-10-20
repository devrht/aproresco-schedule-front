import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, PageHeader, Button,Spin} from 'antd';
import {getStudentListById} from '../../services/Student'
import { useSelector, useDispatch } from 'react-redux'
import { assignStudents } from '../../Action-Reducer/Student/action'
import { assignStudentlistToTeacher } from '../../services/Student'

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
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
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

    const dispatch = useDispatch();
    const {params} = props.match;
    const [studentList,setStudentList] = useState();
    const [students, setStudents] = useState();
    const [studentsTmp, setStudentsTmp] = useState([]);
    const history = useHistory();
    const [selectedRow, setSelectedRow] = useState([]);
    const assignStudentList = useSelector((state) => {
        return state.Student.assignStudent;
    })
    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            var recordIdArray = [];
            records.map(record => {
                recordIdArray.push({ id: record.id, firstName: record.firstName, lastName: record.lastName })
            })
            setSelectedRow(recordIdArray);
            console.log(selectedRow);
        }
    };
    
    useEffect(() => {
        getListView();
    },[]);
    const getListView = () =>{
        setStudents(null);
        setStudentList(null);
        setStudentsTmp([])
        getStudentListById(params.id).then(data => {
            setStudentList(data._embedded.studentBookings);
            data._embedded.studentBookings.forEach(student => {
                let datas = studentsTmp;
                let elt = new Object();
                elt.studentProfile = student.studentProfile;
                elt.studentProfile.subject = student.subject;
                elt.studentProfile.id = student.id;
                elt.studentProfile.startDate = student.startDate
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
                title={`Student List of ${params.name}`}
                extra={[
                    <Button key='3' type="primary"
                        disabled={assignStudentList.length > 0 ? false : true}
                        onClick={() => {
                            let studentIdArray = [];
                            assignStudentList.map((student) => {
                                studentIdArray.push(student.id)
                            })
                            let studentIds = studentIdArray.join(',');
                            assignStudentlistToTeacher(params.id, studentIds)
                            .then(res => {
                                setStudentList(null);
                                dispatch(assignStudents([])); 
                                getListView(); 
                                window.location.reload();
                            })
                        }}
                    >
                        ASSIGN STUDENT
                    </Button>
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
