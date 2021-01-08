import React, { useState, useEffect } from 'react'
import { Row, Col, PageHeader, Card, Table, Spin } from 'antd';
import { useLocation } from "react-router-dom";
import { getBookings } from '../../services/Student'
import Moment from 'react-moment';

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
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subjects',
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
    },
];

function StudentDetail(props) {

    const location = useLocation();
    const { params } = props.match;
    const [bookings, setBookings] = useState();
    const [studentDetail, setStudentDetail] = useState(location.state.student);

    useEffect(() => {
        // getDetailView();
    }, []);

    const getDetailView = () => {
        getBookings(location.state.student.id).then(data => {
            setBookings(data)
        }).catch(() => setBookings(null))
    }
    
    return (
        <div>
            { studentDetail ?
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>{studentDetail.firstName} {studentDetail.lastName}</p>}
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
                                        { studentDetail.startDate }
                                    </Moment>
                                </h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Grade</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.grade}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.email}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4 >Conference URL</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 onClick={() => window.open(studentDetail.conferenceUrl.includes('http') ? studentDetail.conferenceUrl : 'http://' + studentDetail.conferenceUrl)}>{studentDetail.conferenceUrl}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>Parent Email</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.parent ? studentDetail.parent.email : ''}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>School Name</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.schoolName}</h4>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={8}>
                                <h4>School Board</h4>
                            </Col>
                            <Col className="gutter-row" span={14}>
                                <h4 >{studentDetail.schoolBoard}</h4>
                            </Col>
                        </Row>
                    </Card>

                    {/* <Card title="Teacher informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
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
                    </Card> */}
                </Row>
                {/* {!bookings ? <Spin /> :
                    <Table
                        columns={columns}
                        dataSource={bookings}
                        rowKey="id"
                    />
                } */}
            </PageHeader> : null }
        </div>
    )
}

export default StudentDetail
