import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip, Row, Col, Result } from 'antd';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { getStudentList, findStudentListByFirstNameAndLastName, } from '../../services/Student'
import SearchFilter from '../../components/StudentList/SearchFilter'
import { assignStudents } from '../../Action-Reducer/Student/action'
import LayoutOfApp from '../../components/Layout'
//icon

import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"


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
            render: (record) => (
                <div>
                    {record.studentProfile.firstName + " " + record.studentProfile.lastName}
                </div>
            ),
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
        },
        {
            title: <div><span>Subject </span>
                {sortingName === "subject" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "subject" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "subject" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("subject");
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
                {sortingName === "grade" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "grade" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "grade" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("grade");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => {
                var min = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades[0] : 0 : 0;
                // const indexGrade = () => {
                //     var min = record.teacherAvailability ? record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades[0] : 0 : 0;
                //     record.teacherAvailability.teacherProfile ?
                //     record.teacherAvailability.teacherProfile.grades.map(iteam => {
                //         const gradeindex = parseInt(iteam) - parseInt(record.grade);
                //         if (gradeindex > 0 && gradeindex < min) {
                //             min = gradeindex;
                //         }
                //         return null;
                //     }) : min = 0;
                //     return min;
                // }
                return (
                    <span>{computeMinGrade(min, record.teacherAvailability.teacherProfile, record.studentProfile.grade) > 0 ? `${record.studentProfile.grade} (${computeMinGrade(min, record.teacherAvailability.teacherProfile, record.studentProfile.grade)})` : record.studentProfile.grade}</span>
                )
            },
            key: 'grade',
        }
        ,
        {
            title: 'Teacher Name',
            title: <div><span>Teacher Name </span>
                {sortingName === "teacher.firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "teacher.firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "teacher.firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("teacher.firstName");
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
                    <Row>Subjects : {record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.subjects.join(', ') : "Nothing"}</Row>
                    <Row>Grades : {record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.grades.join(', ') : "Nothing"}</Row>
                </div>
                return (
                    <Tooltip placement="topLeft" title={text} color={"white"}>
                        <div style={{ color: !isSubjectContains ? 'orange' : '' }} onClick={(e) => {
                            e.stopPropagation();
                            history.push(`/studentlist/teacher/${record.teacherAvailability.teacherProfile.id}/${record.teacherAvailability.teacherProfile.firstName + " " + record.teacherAvailability.teacherProfile.lastName}`)
                        }} style={{ cursor: 'pointer', color: 'orange' }}>
                            {record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.firstName + " " + record.teacherAvailability.teacherProfile.lastName + " (" + record.teacherAvailability.studentCount + ")" : "No teacher found"}
                        </div>
                    </Tooltip>
                )
            },
            key: 'studentCount',
        },
        {
            title: 'Action',
            key: 'operation',
            render: (record) => <Tooltip title={record.teacherAvailability.teacherProfile ? record.teacherAvailability.teacherProfile.conferenceUrl ? record.teacherAvailability.teacherProfile.conferenceUrl : "Link Not Found": "Teacher Not Found"}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(record.teacherAvailability.teacherProfile.conferenceUrl)
                    }}
                    disabled={record.teacherAvailability.teacherProfile ? !record.teacherAvailability.teacherProfile.conferenceUrl : false}><u>Google Meet</u></Button>
            </Tooltip>,
        },
        {
            title: 'Details',
            key: 'details',
            render: (record) => <Tooltip title={"Consulter les details de l'étudiant"}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                    onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/studentlist/studentDetail/${record.id}`)
                    }}><u>Voir les details</u></Button>
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
        for (i = 0; i < profile.grades.length; i++) {
            let gradeindex = Number(profile.grades[i]) - Number(grade.toString());
            gradeindex = Math.abs(gradeindex);
            if (gradeindex >= 0 && gradeindex < result) {
                result = gradeindex;
            }
        }
        return result < min ? result : min;
    }

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            getStudentList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                setStudentList(data._embedded.studentBookings)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
                setLoading(false);
            })
        }
        else {
            findStudentListByFirstNameAndLastName(search.firstName.trim(), search.lastName.trim(), sortingName, sortingType).then(data => {
                setStudentList(data._embedded.studentBookings)
                setTableProps({
                    totalCount: 1,
                    pageIndex: 0,
                    pageSize: 30,
                });
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
    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current,
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
            title="Student List View"
            extra={[
                <Button key='3' type="primary"
                    disabled={selectedRow.length > 0 ? false : true}
                    onClick={() => {
                        dispatch(assignStudents(selectedRow))
                        history.push('/teacherlist');
                    }}
                >
                    ASSIGN STUDENT
                </Button>
            ]}
        >
            <SearchFilter
                changeInput={changeSearch}
                searchList={searchList}
            />
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
