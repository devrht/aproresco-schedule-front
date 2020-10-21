import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Popconfirm } from 'antd';
import { getTeacherList, findTeacherListByFirstNameAndLastName, getTeacherListByDate } from '../../services/Teacher'
import { assignStudentlistToTeacher } from '../../services/Student'
import { assignStudents } from '../../Action-Reducer/Student/action'
import SearchFilter from '../../components/TeacherList/SearchFilter'
//import AssignStudent from '../../components/TeacherList/AssignStudent'
//icon
import { Form, Select, Input } from 'antd'

import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
import DateFilter from '../../components/StudentList/DateFilter';
function TeacherList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const assignStudentList = useSelector((state) => {
        return state.Student.assignStudent;
    })
    const [teacherList, setTeacherList] = useState();
    const [sortingName, setSortingName] = useState("");
    const [sortingType, setSortingType] = useState("");
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [loading,setLoading] = useState(false);
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [endDate, setEndDate] = useState('2030-01-01');
    const [startDate, setStartDate] = useState('1900-01-01');

    const convertDate = (date, status) => {
        let result = new Date(date.target.value);
        console.log(result)
        let day = result.getDate() < 10 ? '0'+(result.getDate()) : (result.getDate())
        let month = result.getMonth()+1 < 10 ? '0'+(result.getMonth()+1) : (result.getMonth()+1);
        let year = result.getFullYear();
        let d = month+'/'+day+'/'+year+'%2000:00:00'
         if(status) {
        //         localStorage.setItem('startDate', date.target.value);
        //         localStorage.setItem('startDateString', d);
                 setStart(d);
                 setStartDate(date.target.value);
        //         setStartType('text');
         } else  {
        //         localStorage.setItem('endDate', date.target.value);
        //         localStorage.setItem('endDateString', d);setStart(result)
        //         setEndType('text');

            setEndDate(date.target.value);
            setEnd(d)
         }
        return d;
    }
    const [search, setSearch] = useState({
        name:"",
        firstName:"",
        lastName:"",
    })
    const Assigntitle = <div>
        <h3>Assign Student List</h3>
        {assignStudentList.map((student, index) => {
            return <div key={student.id}>
                <spann>{index + 1}. {student.firstName} {student.lastName}</spann>
            </div>
        })}
    </div>
    
    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);
    useEffect(() => {
        getListView();
    }, [sortingType,sortingName]);

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            getTeacherList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                setTeacherList(data._embedded.teacherAvailabilities)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
                setLoading(false);
            })
        }
        else {
            findTeacherListByFirstNameAndLastName(search.firstName.trim(), start ? start : '01/01/1900%2000:00:00', sortingType).then(data => {
                setTeacherList(data)
                setTableProps({
                    totalCount: 1,
                    pageIndex: 0,
                    pageSize: 30,
                });
                setLoading(false);
            })
        }
    }
    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "teacherProfile.firstName" && sortingType==="asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "teacherProfile.firstName" && sortingType==="desc" && <VerticalAlignTopOutlined />}
                {sortingName === "teacherProfile.firstName" && sortingType==="" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("teacherProfile.firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("");setSortingName(""); }
                    }
                };
            },
            render: (record) => (
                <div>
                    {record.teacherProfile.firstName + " " + record.teacherProfile.lastName}
                </div>
            ),
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
            title: 'Subjects',
            key: 'subjects',
            // onHeaderCell: (column) => {
            //     return {
            //         onClick: () => {
            //             setSortingName("subject");
            //             if (sortingType == "") { setSortingType("asc") }
            //             else if (sortingType == "asc") { setSortingType("desc") }
            //             else if (sortingType == "desc") { setSortingType("") }
            //         }
            //     };
            // },
            render: (record) => (
                <div>
                    {
                        record.teacherProfile.subjects.join(', ')
                    }
                </div>
            )
        }
        ,
        {
            title: 'Grades',
            key: 'grades',
            render: (record) => (
                <div>
                    {record.teacherProfile.grades.join(', ')}
                </div>
            )
        }
        ,
        {
            title: <div><span>Student Count </span>
                {sortingName === "studentCount" && sortingType==="asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "studentCount" && sortingType==="desc" && <VerticalAlignTopOutlined />}
                {sortingName === "studentCount" && sortingType==="" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("studentCount");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("");setSortingName(""); }
                    }
                };
            },
            render: (studentCount) => (
                <div>
                    {studentCount}
                </div>
            ),
            dataIndex: 'studentCount',
            key: 'studentCount',
        },
        {
            title: 'Google meet',
            key: 'meet',
            render: (record) => 
                <Button
                    style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(record.teacherProfile.conferenceUrl)
                    }}
                    disabled={!record.teacherProfile.conferenceUrl}><u>Google Meet</u></Button>
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: (record) => {
                const confirm = (e) => {
                    e.stopPropagation();
                    let studentIdArray = [];
                    assignStudentList.map((student) => {
                        studentIdArray.push(student.id)
                    })
                    let studentIds = studentIdArray.join(',');
                    assignStudentlistToTeacher(record.id, studentIds)
                        .then(res => {
                            setLoading(true);
                            dispatch(assignStudents([])); 
                            getListView(); 
                        })
                }
                return (
                    <div>
                        <Popconfirm
                            icon={false}
                            title={Assigntitle}
                            placement="left"
                            onConfirm={confirm}
                            onCancel={(e) => {e.stopPropagation(); dispatch(assignStudents([])) }}
                            okText="Assign"
                            cancelText="Cancel"
                            disabled={assignStudentList.length > 0 ? false : true}
                        >
                            <Button disabled={assignStudentList.length > 0 ? false : true} onClick={(e) => e.stopPropagation()}>Assign Students</Button>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setTeacherList([]);
    };

    const computeLastName = (name) => {
        let lastName = '';
        for (let index = 1; index < name.length; index++) {
            lastName = lastName.trim() +' '+name[index].trim();
        }
        return lastName
    }

    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value.trim() });
        console.log("Enter:",e.target)
        if(e.target.name==="name"){
            var nameData = value.trim().split(" ");
            if(nameData.length>1){
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: computeLastName(nameData) });
            }
            else{
                setSearch({ ...search, firstName: nameData[0].trim(), lastName: nameData[0].trim() });
            }
        }
    };
    const searchList = () => {
        getListView();
    }

    const searchTeacherListByDate = (start, end) => {

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
        getTeacherListByDate(start, end).then(data => {
            console.log('DATA ==> ', data)
            setTeacherList(data._embedded.teacherAvailabilities)
            setTableProps({
                ...tableProps,
                totalCount: data ? data.page ? data.page.totalElements ? 0 : 0 : 0 : 0,
            });
            setLoading(false);
        })
    }

    return (
        <React.Fragment>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>Teachers</p>}
                extra={[
                    // <Button key='3' type="primary"
                    //     disabled={selectedRow.length > 0 ? false : true}
                    //     onClick={() => {
                    //         dispatch(assignStudents(selectedRow))
                    //         history.push('/teacherlist');
                    //     }}
                    // >
                    //     ASSIGN STUDENT
                    // </Button>
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <SearchFilter
                            changeInput={changeSearch}
                            searchList={searchList}
                        />
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                        <Form layout="inline">
                            <Form.Item>
                                <Input
                                    type='date'
                                    placeholder="Min search date"
                                    name="start"
                                    value={startDate}
                                    onChange={(value) => convertDate(value, true)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    style={{ marginLeft: '10px' }}
                                    type='date'
                                    placeholder="Max search date"
                                    name="end"
                                    value={endDate}
                                    onChange={(value) => convertDate(value, false)}
                                />
                            </Form.Item>
                            <Button style={{ marginLeft: '20px' }} onClick={() => searchTeacherListByDate(start, end)}> Search </Button>
                        </Form>
                    </div>
                        </div>
                    </div>
                </div>
                {!teacherList ? <Spin className="loading-table" /> :
                    <Table
                        className="table-padding"
                        columns={columns}
                        loading={loading}
                        dataSource={teacherList}
                        onChange={handleTableChange}
                        pagination={{
                            total: tableProps.totalCount,
                            pageSize: tableProps.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                        }}
                        onRow={(record) => ({
                            onClick: () => (history.push(`/studentlist/teacher/${record.id}/${record.teacherProfile.firstName + " " + record.teacherProfile.lastName}`))
                        })}
                    />}

            </PageHeader>

    </React.Fragment>
    )
}
export default TeacherList
