import React, { useState, useEffect } from 'react'
import { getStudentDetail } from '../../services/Student'
import { Row, Col, PageHeader, Button, Card, Divider } from 'antd';
function StudentDetail(props) {
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
    return (
        <div>
            <PageHeader
                ghost={false}
                title={studentDetail && `STUDENT DETAIL :`}
                extra={[
                    <Button key="1" type="primary">Genrate Calender</Button>,
                    <Button key="2" type="primary">Launch Schedule</Button>
                ]}
            >
                <Row gutter={24}>
                    <Card hoverable={true} title={studentDetail && `Student Name : ${studentDetail.studentProfile.firstName} ${studentDetail.studentProfile.lastName}`} bordered={false} style={{ width: "50%" }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Period</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.period}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Subject</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.subject}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Grade</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.studentProfile.grade}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.studentProfile.studentEmail}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.studentProfile.phoneNumber}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.comment}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >resources</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.resources}</h4>
                            </Col>
                        </Row>
                    </Card>


                    <Card hoverable={true} title={studentDetail && `Teacher Name : ${studentDetail.teacherAvailability.teacherProfile.firstName} ${studentDetail.teacherAvailability.teacherProfile.lastName}`} bordered={false} style={{ width: "50%" }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Subjects</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.teacherProfile.subjects.join(', ')}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Grades</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.teacherProfile.grades.join(', ')}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>ConferenceUrl</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.teacherProfile.conferenceUrl}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.teacherProfile.internalEmail}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4>Phone</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.teacherProfile.phoneNumber}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <h4 >Comment</h4>
                            </Col>
                            <Col className="gutter-row" span={20}>
                                <h4 >{studentDetail && studentDetail.teacherAvailability.studentCount}</h4>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </PageHeader>
        </div>
    )
}

export default StudentDetail
