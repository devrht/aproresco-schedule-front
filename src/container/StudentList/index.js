import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip, Row, Col, Result } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { getStudentList, findStudentListByFirstNameAndLastName, getStudentListByDate, deleteStudentBooking } from '../../services/Student'
import SearchFilter from '../../components/StudentList/SearchFilter'
import { assignStudents } from '../../Action-Reducer/Student/action'
//icon

import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import DateFilter from '../../components/StudentList/DateFilter';


function StudentList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [studentList, setStudentList] = useState();
    const [sortingName, setSortingName] = useState("");
    const [sortingType, setSortingType] = useState("");
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        name: "",
        firstName: "",
        lastName: "",
    })
    const [selectedRow, setSelectedRow] = useState([]);
    const [loading, setLoading] = useState(false);
    const startDate = useSelector((state) => {
        return state.StarDate.startDate;
    })
    const endDate = useSelector((state) => {
        return state.EndDate.endDate;
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
            dispatch(assignStudents(recordIdArray))
        }
    };

    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => <Tooltip title={"Consulter les details de l'étudiant"}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px", cursor: 'pointer'}}
                    onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/studentlist/studentDetail/${record.id}`)
                    }}>{record.studentProfile.firstName + " " + record.studentProfile.lastName}</Button>
            </Tooltip>,
            key: 'name',
            fixed: 'left',
        },
        {
            title: <div><span>Start Date </span>
                {sortingName === "startDate" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "startDate" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "startDate" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("startDate");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: <div><span>Subject </span>
                {sortingName === "studentProfile.subject" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "studentProfile.subject" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "studentProfile.subject" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("studentProfile.subject");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            dataIndex: 'subject',
            key: 'subject',
        }
        ,
        {
            title: <div><span>Grade </span>
                {sortingName === "studentProfile.grade" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "studentProfile.grade" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "studentProfile.grade" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("studentProfile.grade");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                var min = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades[0] : 0 : 0;
                return (
                    <span>{computeMinGrade(min, record.teacherAvailability ? record.teacherAvailability.teacherProfile : null, record.studentProfile.grade) > 0 ? `${record.studentProfile.grade} (${computeMinGrade(min, record.teacherAvailability ? record.teacherAvailability.teacherProfile : null, record.studentProfile.grade)})` : record.studentProfile.grade}</span>
                )
            },
            key: 'grade',
        }
        ,
        {
            title: 'Teacher Name',
            title: <div><span>Teacher Name </span>
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "teacherAvailability.teacherProfile.firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("teacherAvailability.teacherProfile.firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                var isSubjectContains = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.subjects.includes(record.subject) : false : false;
                const text = <div className="grade-coloumn-tooltip">
                    <h4>Details :</h4>
                    <Row>Subjects : {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.subjects.join(', ') : "Nothing" : "Nothing"}</Row>
                    <Row>Grades : {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades.join(', ') : "Nothing" : "Nothing"}</Row>
                </div>
                return (
                    <Tooltip placement="topLeft" title={text} color={"white"}>
                        <div onClick={(e) => {
                            //e.stopPropagation();
                            if (record.teacherAvailability) 
                                if(record.teacherAvailability.teacherProfile)
                                    history.push(`/studentlist/teacher/${record.teacherAvailability.id}`, { teacher: record.teacherAvailability })
                        }} style={{ cursor: 'pointer', color: isSubjectContains ? 'black': 'orange' }}>
                            {record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.firstName + " " + record.teacherAvailability.teacherProfile.lastName + " (" + record.teacherAvailability.studentCount + ")" : "No teacher found" : "No teacher found"}
                        </div>
                    </Tooltip>
                )
            },
            key: 'studentCount',
        },
        {
            title: 'Action',
            key: 'operation',
            render: (record) => <Tooltip title={record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.conferenceUrl ? record.teacherAvailability.teacherProfile.conferenceUrl : "Link Not Found": "Teacher Not Found" : "Teacher Not Found"}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                    onClick={(e) => {
                        //e.stopPropagation();
                        if (record.teacherAvailability) 
                                if(record.teacherAvailability.teacherProfile)
                                    window.open(record.teacherAvailability.teacherProfile.conferenceUrl.includes('http') ? record.teacherAvailability.teacherProfile.conferenceUrl : 'http://'+record.teacherAvailability.teacherProfile.conferenceUrl)
                    }}
                    disabled={record.teacherAvailability ? record.teacherAvailability.teacherProfile ? !record.teacherAvailability.teacherProfile.conferenceUrl : false : false}><u>Google Meet</u></Button>
            </Tooltip>,
        },
    ];

    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);
    useEffect(() => {
        getListView();
    }, [sortingType, sortingName]);

    const computeLastName = (name) => {
        let lastName = '';
        for (let index = 1; index < name.length; index++) {
            lastName = lastName.trim() +' '+name[index].trim();
        }
        return lastName
    }

    const computeMinGrade = (min, profile, grade) => {
        let i = 0;
        let result = min;
        if( profile == null ) {
            return 0;
        }

        for (i = 0; i < profile.grades.length; i++) {
            let gradeindex = Number(profile.grades[i]) - Number(grade.toString());
            gradeindex = Math.abs(gradeindex);
            if (gradeindex >= 0 && gradeindex < result) {
                result = gradeindex;
            }
        }
        return result < min ? result : min;
    }

    const deleteBooking = (selectedrow) => {
        if(selectedrow.length > 0) {
            let ids = selectedrow.reduce((a, b) => {
                return a+','+b.id;
            }, '')
            deleteStudentBooking(ids.substring(1)).then(data => {
                console.log(data);
                setSelectedRow([]);
                getListView();
            });
        } else {
            alert('Select at least one student');
        }
    }

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            //getStudentList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                getStudentListByDate(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if(data) {
                    if(data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalElements,
                            pageSize: 30,
                        });
                    } else {
                        setStudentList([])
                        setTableProps({
                            ...tableProps,
                            totalCount: 0,
                            pageSize: 30,
                        });
                    }
                } else {
                    setStudentList([])
                    setTableProps({
                        ...tableProps,
                        totalCount: 0,
                        pageSize: 30,
                    });
                }
                setLoading(false);
            })
        }
        else {
            findStudentListByFirstNameAndLastName(search.firstName.trim(), localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if(data) {
                    if(data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalElements,
                            pageSize: 30,
                        });
                    } else {
                        setStudentList([])
                        setTableProps({
                            ...tableProps,
                            totalCount: 0,
                            pageSize: 30,
                        });
                    }
                } else {
                    setStudentList([])
                    setTableProps({
                        ...tableProps,
                        totalCount: 0,
                        pageSize: 30,
                    });
                }
                setLoading(false);
            })
        }
    }
    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        if (e.target.name === "name") {
            var nameData = value.split(" ");
            if (nameData.length > 1) {
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: computeLastName(nameData) });
            }
            else {
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: nameData[0].trim() });
            }
        }
    };
    const searchList = () => {
        getListView();
    }

    const searchStudentListByDate = (start, end) => {

        if(start == null)
            start = '01/01/1900%2000:00:00';
        if(end == null)
            end = '01/01/2100%2000:00:00';

        // if(localStorage.getItem('startDateString') != null)
        //     if(localStorage.getItem('startDateString').length > 0) {
        //         start = localStorage.getItem('startDateString');
        //     };
        // if(localStorage.getItem('endDateString') != null)
        //     if(localStorage.getItem('endDateString').length > 0) {
        //         end = localStorage.getItem('endDateString');
        //     };
        //if
        getStudentListByDate(start, end).then(data => {
            console.log('DATA ==> ', data)
            setStudentList(data._embedded.studentBookings)
            setTableProps({
                ...tableProps,
                totalCount: data ? data.page ? data.page.totalElements ? 0 : 0 : 0 : 0,
            });
            setLoading(false);
        })
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current-1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setStudentList([]);
    };
    return (
        <React.Fragment>
            
        {/* <LayoutOfApp> */}
        <PageHeader
            ghost={false}
            title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px'}}>Students</p>}
            extra={[
            ]}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <SearchFilter
                        changeInput={changeSearch}
                        searchList={searchList}
                    />
                    <Button onClick={() => deleteBooking(selectedRow)}> Supprimer </Button>
                </div>
            </div>
            
            {!studentList ? <Spin className="loading-table" /> :
                <Table
                    className="table-padding"
                    columns={columns}
                    loading={loading}
                    dataSource={studentList}
                    onChange={handleTableChange}
                    pagination={{
                        total: tableProps.totalCount,
                        pageSize: tableProps.pageSize,
                        showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                    }}
                    rowSelection={rowSelection}
                    rowKey="id"
                    // onRow={(record) => ({
                    //     onClick: () => (history.push(`/studentlist/studentDetail/${record.id}`))
                    // })}
                />}

        </PageHeader>
        {/* </LayoutOfApp> */}
        </React.Fragment>
    )
}
export default StudentList
