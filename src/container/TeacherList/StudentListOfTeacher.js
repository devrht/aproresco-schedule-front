import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, PageHeader, Button, Spin, Tooltip } from 'antd';
import { getStudentListById } from '../../services/Student'
import { useSelector, useDispatch } from 'react-redux'
import { assignStudents, enableAssigning } from '../../Action-Reducer/Student/action'
import { assignStudentToAnotherTeacher, assignMeetingToAnotherTeacher } from '../../services/Student'
import { markTeacherAsPresent, markAsSupervisor, markAsAdmin } from '../../services/Teacher'
import { Form, Row, Col, Card, Input } from 'antd'
import { useLocation } from "react-router-dom";
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

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
    // {
    //     title: 'Start Date',
    //     dataIndex: 'startDate',
    //     key: 'startDate',
    //     fixed: 'left',
    // },
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
    // {
    //     title: 'Action',
    //     key: 'operation',
    //     fixed: 'right',
    //     render: () => <Button>Edit</Button>,
    // },
];
function StudentListOfTeacher(props) {

    const dispatch = useDispatch();
    const location = useLocation();
    const { params } = props.match;
    const [studentList, setStudentList] = useState();
    const [confUrl, setConfUrl] = useState();
    const [editable, setEditable] = useState(false);
    const [supervisor, setSupervisor] = useState(location.state.teacher.teacherProfile.supervisor ? true : false);
    const [admin, setAdmin] = useState(location.state.teacher.teacherProfile.tenantAdmin ? true : false);
    const [students, setStudents] = useState();
    const [studentsTmp, setStudentsTmp] = useState([]);
    const [teacher, setTeacher] = useState(location.state.teacher);
    const history = useHistory();
    const [active, setActive] = useState(true);
    const [present, setPresent] = useState(true);
    const [effectiveStartDate, setEffectiveStartDate] = useState('');
    const [selectedRow, setSelectedRow] = useState([]);
    const assignStudentList = useSelector((state) => {
        return state.Student.assignStudent;
    })

    const assigningStatus = useSelector((state) => {
        return state.Student.enableAssigning;
    })
    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
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
        setPresent(teacher.effectiveStartDate ? false : true);
        setEffectiveStartDate(teacher.effectiveStartDate);
        getListView();
    }, []);

    const getListView = () => {
        setStudents(null);
        setStudentList(null);
        setStudentsTmp([])
        getStudentListById(params.id).then(data => {
            if (data) {
                setStudentList(data);
                data.forEach(student => {
                    let datas = studentsTmp;
                    let elt = new Object();
                    elt.studentProfile = new Object();
                    elt.studentProfile.firstName = student.firstName;
                    elt.studentProfile.grade = student.grade;
                    elt.studentProfile.lastName = student.lastName;
                    elt.studentProfile.subject = student.subject;
                    elt.studentProfile.id = student.id;
                    // elt.studentProfile.startDate = student.startDate
                    datas.push(elt.studentProfile);
                    setStudentsTmp(datas);
                });
                setConfUrl(location.state.teacher.teacherProfile.conferenceUrl);
                setStudents(studentsTmp);
            } else {
                setStudents([]);
                setStudentList([]);
                setStudentsTmp([])
            }
        })
    }

    const assignStudent = () => {
        if (active) {
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
                    //window.location.reload();
                })
        } else {
            dispatch(assignStudents(selectedRow))
            //history.push('/teacherlist');
        }
    };

    const setConferenceUrl = (url) => {
        console.log(teacher)
        setConfUrl(url.target.value);
        if (url.target.value.length > 0)
            assignMeetingToAnotherTeacher(teacher.id, url.target.value);
    }

    const markAsPresent = () => {

        markTeacherAsPresent(teacher.id, teacher.effectiveStartDate ? false : true).then(data => {
            if (teacher.effectiveStartDate) {
                delete teacher.effectiveStartDate;
                setTeacher(teacher);
                setEffectiveStartDate('');
            } else {
                teacher.effectiveStartDate = new Date();
                setTeacher(teacher);
                setEffectiveStartDate(new Date());
            }
            setPresent(teacher.effectiveStartDate ? false : true);
            //history.push('/teacherlist');
        });
    }

    const markTeacherAsAdmin = () => {
        markAsAdmin(teacher.teacherProfile.id, !admin).then(data => {
            setAdmin(!admin);
        });
    }

    const markTeacherAsSupervisor = () => {
        markAsSupervisor(teacher.teacherProfile.id, !supervisor).then(data => {
            setSupervisor(!supervisor);
        });
    }

    return (
        <div>
            {/* {console.log(params)}
            students history.... {params.id} */}
            <PageHeader
                ghost={false}
                title={
                    <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                        <p style={{ fontSize: '3em', textAlign: 'center', margin: '20px' }}>{`${teacher.teacherProfile.firstName} ${teacher.teacherProfile.lastName}`}</p>
                        <Tooltip title={admin ? "Administrator" : "Not An Administrator"}>
                            <FontAwesomeIcon onClick={() => markTeacherAsAdmin()} icon={faCrown} color={admin ? "gold" : "gray"} size={"2x"} style={{ marginLeft: 20 }} />
                        </Tooltip>
                        <Tooltip title={supervisor ? "Supervisor" : "Not A Supervisor"}>
                            <FontAwesomeIcon onClick={() => markTeacherAsSupervisor()} icon={faShieldAlt} color={supervisor ? "blue" : "gray"} size={"2x"} style={{ marginLeft: 20 }} />
                        </Tooltip>
                    </div>
                }
                extra={[
                    <div style={{ display: 'flex' }}>
                        <Button key='3' type="primary"
                            style={{ display: 'none' }}
                            onClick={() => markAsPresent()}
                        >
                            {present ? 'MARK AS PRESENT' : 'MARK AS ABSENT'}
                        </Button>
                        <Button key='3' type="primary"
                            style={{ display: assigningStatus ? 'block' : 'none', marginLeft: '20px' }}
                            disabled={(assignStudentList.length > 0 && active) || selectedRow.length > 0 ? false : true}
                            onClick={() => {
                                assignStudent()
                            }}
                        >
                            ASSIGN STUDENT
                        </Button>
                    </div>
                ]}
            >

                <Row gutter={24} style={{ marginBottom: '3%' }}>
                    <Card title="Profile" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Name</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>{`${teacher.teacherProfile.firstName} ${teacher.teacherProfile.lastName}`}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >External Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>{`${teacher.teacherProfile.externalEmail}`}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Internal Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>{`${teacher.teacherProfile.internalEmail}`}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <p onClick={(e) => {
                                    window.open(teacher.conferenceUrl ? teacher.conferenceUrl.includes('http') ? teacher.conferenceUrl : 'http://' + teacher.conferenceUrl : teacher.teacherProfile.conferenceUrl ? teacher.teacherProfile.conferenceUrl.includes('http') ? teacher.teacherProfile.conferenceUrl : 'http://' + teacher.teacherProfile.conferenceUrl : '')
                                }}>{`${teacher.teacherProfile.conferenceUrl}`}</p>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>{teacher.teacherProfile.subjects.join(', ')}</h4>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Availability" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Start Date</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        {teacher.startDate}
                                    </Moment>
                                </h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Effective Start Date</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        {effectiveStartDate}
                                    </Moment>
                                </h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={14} onDoubleClick={() => setEditable(!editable)}>
                                {!editable ?
                                    <p onClick={(e) => {
                                        window.open(teacher.conferenceUrl ? teacher.conferenceUrl.includes('http') ? teacher.conferenceUrl : 'http://' + teacher.conferenceUrl : teacher.teacherProfile.conferenceUrl ? teacher.teacherProfile.conferenceUrl.includes('http') ? teacher.teacherProfile.conferenceUrl : 'http://' + teacher.teacherProfile.conferenceUrl : '')
                                    }} >{confUrl}</p> :
                                    <Form layout="inline">
                                        <Form.Item>
                                            <Input
                                                type="text"
                                                placeholder="Conference Url"
                                                name="url"
                                                value={confUrl}
                                                onChange={setConferenceUrl}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        setEditable(false);
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    </Form>
                                }
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Students</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4>{teacher.studentCount}</h4>
                            </Col>
                        </Row>
                    </Card>
                </Row>

                {!studentList || !students ? <Spin /> :
                    <Table
                        columns={columns}
                        dataSource={students}
                        rowSelection={rowSelection}
                        rowKey="id"
                    // onRow={(teacher) => ({
                    //     onClick: (e) => {
                    //         console.log('to go', record)
                    //         e.stopPropagation();
                    //         history.push(`/studentlist/studentDetail/${record.id}`, { student: record })
                    //     }

                    // })}
                    />
                }
            </PageHeader>
        </div>
    )
}
export default StudentListOfTeacher
