import React, { useState, useEffect } from 'react'
import { Row, Col, PageHeader, Card, Table, Spin, Tooltip, Button } from 'antd';
import { useLocation } from "react-router-dom";
import { getStudentListById } from '../../services/Student'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const columns = [
    {
        title: <div><span>Name </span>
        </div>,
        render: (record) =>
            <div
                style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}
            >
                <Tooltip title={record.lastSeenRoom != null ? record.lastSeenRoom : "No last seen room"}>
                    <FontAwesomeIcon icon={faCircle} color="green" style={{ display: record.onlineStatus == 0 ? "block" : "none" }} />
                    <FontAwesomeIcon icon={faCircle} color="orange" style={{ display: record.onlineStatus == 1 ? "block" : "none" }} />
                    <FontAwesomeIcon icon={faCircle} color="red" style={{ display: record.onlineStatus == 2 ? "block" : "none" }} />
                </Tooltip>
                <Tooltip title={(record.firstName + " " + record.lastName)}>
                    <Button
                        style={{ backgroundColor: "transparent", border: "0px", cursor: 'pointer', width: "60%" }}>
                        <p style={{ width: "50%", textAlign: "left" }}>
                            {(record.firstName + " " + record.lastName).length <= 20 ?
                                record.firstName + " " + record.lastName :
                                (record.firstName + " " + record.studentProfile.lastName).substring(0, 19) + '...'}
                        </p>
                    </Button>
                </Tooltip>
            </div>,
        key: 'name',
        fixed: 'left',
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
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);
    const [studentDetail, setStudentDetail] = useState(location.state.student);

    useEffect(() => {
        getDetailView();
    }, []);

    const getDetailView = () => {
        setBookingsLoading(true);
        getStudentListById(location.state.student.id, 'profileId').then(data => {
            data.content.forEach(student => {
                let elt = new Object();
                elt.studentProfile = new Object();
                elt.studentProfile.firstName = student.studentProfile.firstName;
                elt.studentProfile.grade = student.studentProfile.grade;
                elt.studentProfile.lastName = student.studentProfile.lastName;
                elt.studentProfile.onlineStatus = student.studentProfile.onlineStatus;
                // elt.studentProfile.subject = student.subject;
                elt.studentProfile.id = student.studentProfile.id;
                // elt.studentProfile.startDate = student.startDate
                setBookings([...bookings, elt.studentProfile]);
            });
        }).catch((err) => { console.log(err); setBookings([])} )
        .finally(() => setBookingsLoading(false))
    }

    return (
        <div>
            {studentDetail ?
                <PageHeader
                    ghost={false}
                    title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>{studentDetail.firstName} {studentDetail.lastName}</p>}
                >

                    <Row gutter={24} style={{ marginBottom: '3%' }}>
                        <Card title="Student informations" hoverable={true} bordered={true} style={{ width: "48%", marginLeft: '2%' }}>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <h4>Period</h4>
                                </Col>
                                <Col className="gutter-row" span={14}>
                                    <h4 >
                                        <Moment format="D MMM YYYY HH:MM" withTitle>
                                            {studentDetail.startDate}
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
                    {bookingsLoading ? <Spin /> :
                        <Table
                            columns={columns}
                            dataSource={bookings}
                            rowKey="id"
                        />
                    }
                </PageHeader> : null}
        </div>
    )
}

export default StudentDetail
