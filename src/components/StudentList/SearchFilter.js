import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Button } from 'antd'
import { SearchOutlined } from "@ant-design/icons"

const { Option } = Select;
const SearchFilter = ({ changeInput, searchList, type }) => {


    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    useEffect(() => {
        setStartDate(localStorage.getItem('startDate'));
        setEndDate(localStorage.getItem('endDate'));
        setStartTime(localStorage.getItem('startTime'));
        setEndTime(localStorage.getItem('endTime'));
    });

    const convertDate = (date, status) => {
        let tmp = date.target.value.split('-');
        let result = new Date(Date.UTC(tmp[0], tmp[1] - 1, tmp[2]));
        if (date.target.value) {
            let day = result.getDate() < 10 ? '0' + (result.getDate()) : (result.getDate())
            let month = result.getMonth() + 1 < 10 ? '0' + (result.getMonth() + 1) : (result.getMonth() + 1);
            let year = result.getFullYear();
            let hours = result.getHours().toString().padStart(2, '0');
            let minutes = result.getMinutes().toString().padStart(2, '0');
            let d = month + '/' + day + '/' + year + '%2000:00:00'
            if (status) {
                localStorage.setItem('startDate', year + '-' + month + '-' + day)
                localStorage.setItem('toStart', month + '%2F' + day + '%2F' + year + '%20'+hours+':'+minutes+':00 -0500')
                setStartDate(year + '-' + month + '-' + day)
            } else {
                localStorage.setItem('endDate', year + '-' + month + '-' + day)
                localStorage.setItem('toEnd', month + '%2F' + day + '%2F' + year + '%20'+hours+':'+minutes+':00 -0500')
                setEndDate(year + '-' + month + '-' + day)
            }
        }
    }

    const convertTime = (time, status) => {
        time = time.target.value;
        if (time) {
            if (status) {
                setStartDate(time)
                localStorage.setItem('startTime', time);
                let tmp = localStorage.getItem('toStart').split('%20');
                tmp[1] = time + tmp[1].substr(5, tmp[1].length);
                localStorage.setItem('toStart', tmp.join('%20'));
            } else {
                setEndDate(time)
                localStorage.setItem('endTime', time);
                let tmp = localStorage.getItem('toEnd').split('%20');
                tmp[1] = time + tmp[1].substr(5, tmp[1].length);
                localStorage.setItem('toEnd', tmp.join('%20'));
            }
        }
    }

    const onKeyEnter = (e) => {
        //alert("not enter")
        if (e.keyCode == 13) {
            searchList();
        }
    }
    return (
        <Form layout="inline" style={{ marginRight: '20px' }}>
            {
                type != 'schedule' ?
                    <Form.Item>
                        <Input
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onKeyDown={onKeyEnter}
                            onChange={changeInput}
                        />
                    </Form.Item> :
                    <>
                        <Form.Item style={{ width: '120px' }}>
                            <Input
                                type="number"
                                placeholder="Grade Min"
                                name="gradeMin"
                                onKeyDown={onKeyEnter}
                                onChange={changeInput}
                            />
                        </Form.Item>
                        <Form.Item style={{ width: '120px' }}>
                            <Input
                                type="number"
                                placeholder="Grade Max"
                                name="gradeMax"
                                onKeyDown={onKeyEnter}
                                onChange={changeInput}
                            />
                        </Form.Item>
                    </>
            }
            <Form.Item>
                <Input
                    type='date'
                    placeholder="Min search date"
                    value={startDate}
                    onChange={(value) => convertDate(value, true)}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    type='time'
                    placeholder="Time"
                    value={startTime}
                    onChange={(value) => convertTime(value, true)}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    type='date'
                    placeholder="Max search date"
                    value={endDate}
                    onChange={(value) => convertDate(value, false)}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    type='time'
                    placeholder="Time"
                    value={endTime}
                    onChange={(value) => convertTime(value, false)}
                />
            </Form.Item>
            <Button onClick={searchList} type="primary">
                <SearchOutlined />
            </Button>
        </Form>
    )
}

export default SearchFilter
