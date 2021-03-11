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
        
        let tmp = new Date(date.target.value);
        console.log("Date from the input ==> ",tmp)

        let result = new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate());
        console.log("Date converted to local time ==>  ", result)

        let result1 = new Date(Date.UTC(tmp.getUTCFullYear(), tmp.getUTCMonth(), tmp.getUTCDate()));
        console.log("Date converted to  UTC time ==>  ", result1) 
       
        if (result) {

            let day = result.getDate().toString().padStart(2, '0');
            let month = (result.getMonth() + 1).toString().padStart(2, '0');
            let year = result.getFullYear();
            let hours = result.getHours().toString().padStart(2, '0');
            let minutes = result.getMinutes().toString().padStart(2, '0');

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
                setStartTime(time)
                localStorage.setItem('startTime', time);
                let tmp = localStorage.getItem('toStart').split('%20');
                tmp[1] = time + tmp[1].substr(5, tmp[1].length);
                localStorage.setItem('toStart', tmp.join('%20'));
            } else {
                setEndTime(time)
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
