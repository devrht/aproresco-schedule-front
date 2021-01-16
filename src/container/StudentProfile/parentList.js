import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip } from 'antd';
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { findParentProfileByEmail, getParentProfile } from '../../services/Student'
import SearchFilter from '../../components/StudentList/SearchFilter'
import Moment from 'react-moment';
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined, PlusOutlined } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

function ParentProfile() {
    const history = useHistory();
    const [studentList, setStudentList] = useState();
    const [sortingName, setSortingName] = useState("firstName");
    const [sortingType, setSortingType] = useState("asc");
    const deletingStatus = useSelector((state) => {
        return state.Student.enableDeleting;
    })
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
            render: (record) =>
                <div
                    style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}
                >
                    <Tooltip title={(record.firstName + " " + record.lastName)}>
                        <Button
                            style={{ backgroundColor: "transparent", border: "0px", cursor: 'pointer', width: "60%" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push(`/parentProfiles/${record.id}/details`, { parent: record })
                            }}>
                            <p style={{ width: "50%", textAlign: "left" }}>
                                {(record.firstName + " " + record.lastName).length <= 20 ?
                                    record.firstName + " " + record.lastName :
                                    (record.firstName + " " + record.lastName).substring(0, 19) + '...'}
                            </p>
                        </Button>
                    </Tooltip>
                </div>,
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: <div><span>Activation Date </span>
                {sortingName === "activationDate" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "activationDate" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "activationDate" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("activationDate");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            render: (record) => (
                <div>
                    {
                        <Moment format="D MMM YYYY HH:MM" withTitle>
                            {record.activationDate}
                        </Moment>
                    }
                </div>
            ),
            key: 'activationDate',
        }

    ];

    useEffect(() => {
        getListView();
        const interval = setInterval(() => {
            getListView();
        }, 15000);
        return () => clearInterval(interval);
    }, [tableProps.pageIndex]);

    useEffect(() => {
        getListView();
    }, [sortingType, sortingName]);

    const computeLastName = (name) => {
        let lastName = '';
        for (let index = 1; index < name.length; index++) {
            lastName = lastName.trim() + ' ' + name[index].trim();
        }
        return lastName
    }

    const computeMinGrade = (min, profile, grade) => {
        let i = 0;
        let result = min;
        if (profile == null) {
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

    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            //getStudentList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
            getParentProfile(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if (data) {
                    if (data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalCount,
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
            findParentProfileByEmail(search.firstName.trim(), localStorage.getItem('toStart'), localStorage.getItem('toEnd'), tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                console.log('DATA ==> ', data)
                if (data) {
                    if (data.content) {
                        setStudentList(data.content)
                        setTableProps({
                            ...tableProps,
                            totalCount: data.totalCount,
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

    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current - 1,
            pageSize: pagination.pageSize,
        });
        setLoading(true);
        setStudentList([]);
    };


    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px'  }}>Parent Profiles</p>}
                extra={[
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <SearchFilter
                            changeInput={changeSearch}
                            searchList={searchList}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Button key='3' size="medium" type="primary" onClick={() => history.push('/parentProfiles/add')}>
                            <PlusOutlined />
                        </Button>
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
                        rowKey="id"
                    />}

            </PageHeader>
        </div>
    )
}
export default ParentProfile
