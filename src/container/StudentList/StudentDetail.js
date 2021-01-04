import React, { useState, useEffect } from 'react'
import { getStudentDetail } from '../../services/Student'
import { Row, Col, PageHeader, Button, Card, Divider } from 'antd';
import { useLocation } from "react-router-dom";
import { assignStudentToAnotherTeacher } from '../../services/Student'
import Moment from 'react-moment';

function StudentDetail(props) {

    const location = useLocation();
    const { params } = props.match;
    const [studentDetail, setStudentDetail] = useState(location.state.student);

    useEffect(() => {
        // getDetailView();
        console.log(location.state.student);
    }, []);

    const getDetailView = () => {
        getStudentDetail(params.id).then(data => {
            console.log('DATA ==> ', data)
            setStudentDetail(data)
        })
    }


    const rejectStudent = () => {
        assignStudentToAnotherTeacher(null, studentDetail.id)
        .then(res => {
            getDetailView(); 
            //window.location.reload();
        })
    };
    
    return (
        <div>
            { studentDetail ?
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>{studentDetail.studentProfile.firstName} {studentDetail.studentProfile.lastName}</p>}
                extra={[
                    <Button key='4' type="primary"
                        style={{ display: studentDetail.teacherAvailability ? 'block' : 'none' }}
                        onClick={() => {
                            rejectStudent()
                        }}
                        >
                        REJECT STUDENT
                    </Button>
                ]}
            >

                <Row gutter={24} style={{ marginBottom: '3%'  }}>
                    <Card title="Student informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Period</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 > 
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        { studentDetail.schedule.startDate }
                                    </Moment>
                                </h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Subject</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.schedule.subject}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Grade</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.studentProfile.grade}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.studentProfile.email}</h4>
                            </Col>
                        </Row><Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Parent Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.studentProfile.parent ? studentDetail.studentProfile.parent.email : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 onClick={() => window.open(studentDetail.studentProfile.conferenceUrl.includes('http') ? studentDetail.studentProfile.conferenceUrl : 'http://' + studentDetail.studentProfile.conferenceUrl)}>{studentDetail.studentProfile.conferenceUrl}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.studentProfile.parent ? studentDetail.studentProfile.parent.phoneNumber : ''}</h4>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ display : studentDetail.effectiveStartDate ? 'flex' : 'none'}}>
                            <Col className="gutter-row" span={8}>
                                <h4>Effective Start Date</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.effectiveStartDate ? 
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        { studentDetail.effectiveStartDate }
                                    </Moment> : 
                                    'Undefined'}
                                </h4>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ display : studentDetail.rejectionDate ? 'flex' : 'none'}}>
                            <Col className="gutter-row" span={8}>
                                <h4>Rejection Date</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.rejectionDate ? 
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        { studentDetail.rejectionDate }
                                    </Moment> : 
                                    'Undefined'}
                                </h4>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ display : studentDetail.teacherAssignedDate ? 'flex' : 'none'}}>
                            <Col className="gutter-row" span={8}>
                                <h4>Teacher Assigned Date</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAssignedDate ? 
                                    <Moment format="D MMM YYYY HH:MM" withTitle>
                                        { studentDetail.teacherAssignedDate }
                                    </Moment> : 
                                    'Undefined'}
                                </h4>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Teacher informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4>Name</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.firstName : '' : ''} {studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.lastName : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.subjects.join(', ') : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Grades</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.grades.join(', ') : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4>ConferenceUrl</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.conferenceUrl : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.internalEmail : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? 'flex' : 'none' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.phoneNumber : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: studentDetail.teacherAvailability ? 'flex' : 'none' }}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.studentCount : ''}</h4>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </PageHeader> : null }
        </div>
    )
}

export default StudentDetail
