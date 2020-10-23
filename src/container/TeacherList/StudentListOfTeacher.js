import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, PageHeader, Button,Spin } from 'antd';
import {getStudentListById} from '../../services/Student'
import { useSelector, useDispatch } from 'react-redux'
import { assignStudents } from '../../Action-Reducer/Student/action'
import { assignStudentToAnotherTeacher, assignMeetingToAnotherTeacher } from '../../services/Student'
import { Form, Row, Col, Card, Input } from 'antd'
import { useLocation } from "react-router-dom";

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
    const location = useLocation();
    const {params} = props.match;
    const [studentList,setStudentList] = useState();
    const [confUrl,setConfUrl] = useState();
    const [students, setStudents] = useState();
    const [studentsTmp, setStudentsTmp] = useState([]);
    const [teacher, setTeacher] = useState(location.state.teacher);
    const history = useHistory();
    const [active, setActive] = useState(true);
    const [selectedRow, setSelectedRow] = useState([]);
    const assignStudentList = useSelector((state) => {
        return state.Student.assignStudent;
    })
    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            var recordIdArray = [];
            setActive(false);
            records.map(record => {
                recordIdArray.push({ id: record.id, firstName: record.firstName, lastName: record.lastName })
            })
            setSelectedRow(recordIdArray);
            dispatch(assignStudents(recordIdArray))
        }
    };
    
    useEffect(() => {
        setConfUrl(location.state.teacher.conferenceUrl);
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

    const assignStudent = () => {
        if(active) {
            let studentIdArray = [];
            assignStudentList.map((student) => {
                studentIdArray.push(student.id)
            })
            let studentIds = studentIdArray.join(',');
            assignStudentToAnotherTeacher(params.id, studentIds)
            .then(res => {
                setStudentList(null);
                dispatch(assignStudents([])); 
                getListView(); 
                window.location.reload();
            })
        } else {
            dispatch(assignStudents(selectedRow))
            history.push('/teacherlist');
        }
    };

    const setConferenceUrl = (url) => {
        console.log(url.target.value);
        setConfUrl(url.target.value);
        if(url.target.value.length > 0)
            assignMeetingToAnotherTeacher(teacher.id, encodeURIComponent(url.target.value));
    }

    return (
        <div>
            {/* {console.log(params)}
            students history.... {params.id} */}
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>{`${teacher.teacherProfile.firstName} ${teacher.teacherProfile.lastName}`}</p>}
                extra={[
                    <Button key='3' type="primary"
                        disabled={(assignStudentList.length > 0 && active) || selectedRow.length > 0 ? false : true}
                        onClick={() => {
                            assignStudent()
                        }}
                    >
                        ASSIGN STUDENT
                    </Button>
                ]}
            >

                <Row gutter={24} style={{ marginBottom: '3%' }}>
                    <Card title="Profile" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Name</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ `${teacher.teacherProfile.firstName} ${teacher.teacherProfile.lastName}` }</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >External Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ `${teacher.teacherProfile.externalEmail}` }</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Internal Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ `${teacher.teacherProfile.internalEmail}` }</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ `${teacher.teacherProfile.conferenceUrl}` }</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ teacher.teacherProfile.subjects.join(', ') }</h4>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Availability" hoverable={true} bordered={true} style={{ width: "47%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Start Date</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{teacher.startDate}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <Form layout="inline" style={{ marginRight: '20px' }}>
                                    <Form.Item>
                                        <Input
                                            type="text"
                                            placeholder="Conference Url"
                                            name="url"
                                            value={confUrl}
                                            onChange={setConferenceUrl}
                                        />
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Students</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4>{ teacher.studentCount }</h4>
                            </Col>
                        </Row>
                    </Card>
                </Row>
               
                {!studentList || !students ?<Spin/>:
                <Table 
                    columns={columns} 
                    dataSource={students}
                    rowSelection={rowSelection}
                    rowKey="id"
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
