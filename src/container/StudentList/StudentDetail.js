import React, { useState, useEffect } from 'react'
import { getStudentDetail } from '../../services/Student'
import { Row, Col, PageHeader, Button, Card, Divider } from 'antd';
import { useLocation } from "react-router-dom";
import { assignStudentToAnotherTeacher } from '../../services/Student'

function StudentDetail(props) {

    const location = useLocation();
    const { params } = props.match;
    const [studentDetail, setStudentDetail] = useState();

    useEffect(() => {
        getDetailView();
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
                            <Col className="gutter-row" span={7}>
                                <h4>Period</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.startDate}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Subject</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.subject}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Grade</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.studentProfile.grade}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.studentProfile.studentEmail}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.studentProfile.conferenceUrl}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.studentProfile.phoneNumber}</h4>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Effective Start Date</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.effectiveStartDate ? studentDetail.effectiveStartDate : 'Undefined'}</h4>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Rejection Date</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.rejectionDate ? studentDetail.rejectionDate : 'Undefined'}</h4>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Teacher Assigned Date</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAssignedDate ? studentDetail.teacherAssignedDate : 'Undefined'}</h4>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Teacher informations" hoverable={true} bordered={true} style={{ width: "47%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Name</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.firstName : '' : ''} {studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.lastName : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.subjects.join(', ') : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Grades</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.grades.join(', ') : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>ConferenceUrl</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.conferenceUrl : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.internalEmail : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
                                <h4 >{studentDetail.teacherAvailability ? studentDetail.teacherAvailability.teacherProfile ? studentDetail.teacherAvailability.teacherProfile.phoneNumber : '' : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={7}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={15}>
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
