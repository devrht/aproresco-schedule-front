import React, { useState, useEffect } from 'react'
import { getStudentDetail } from '../../services/Student'
import { Row, Col, PageHeader, Button, Card, Divider } from 'antd';
import { useLocation } from "react-router-dom";

function StudentDetail(props) {

    const location = useLocation();
    const { params } = props.match;
    const [studentDetail, setStudentDetail] = useState();
    const [student, setStudent] = useState(location.state.student);

    useEffect(() => {
        //getDetailView();
    }, []);
    const getDetailView = () => {
        getStudentDetail(params.id).then(data => {
            console.log('DATA ==> ', data)
            setStudentDetail(data)
        })
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>{student.studentProfile.firstName} {student.studentProfile.lastName}</p>}
                extra={[
                ]}
            >

                <Row gutter={24} style={{ marginBottom: '3%' }}>
                    <Card title="Student informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Period</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.period}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Subject</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.subject}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Grade</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.studentProfile.grade}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.studentProfile.studentEmail}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.studentProfile.phoneNumber}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.comment}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >resources</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.resources}</h4>
                            </Col>
                        </Row>
                    </Card>

                    <Card title="Teacher informations" hoverable={true} bordered={true} style={{ width: "47%", marginLeft: '2%' }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Name</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.firstName} {student.teacherAvailability.teacherProfile.lastName}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.subjects.join(', ')}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Grades</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.grades.join(', ')}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>ConferenceUrl</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.conferenceUrl}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.internalEmail}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.teacherProfile.phoneNumber}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{student.teacherAvailability.studentCount}</h4>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </PageHeader>
        </div>
    )
}

export default StudentDetail
