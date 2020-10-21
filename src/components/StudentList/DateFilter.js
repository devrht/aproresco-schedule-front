import React, { useState, useEffect } from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const DateFilter = ({changeInput}) => {

    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [startType, setStartType] = useState('date');
    const [endType, setEndType] = useState('date');

    const convertDate = (date, status) => {
        let result = new Date(date.target.value);
        let day = result.getDate() < 10 ? '0'+(result.getDate()) : (result.getDate)
        let month = (result.getMonth()+1) < 10 ? '0'+(result.getMonth()+1) : (result.getMonth()+1);
        let year = result.getFullYear();
        let d = month+'/'+day+'/'+year+' 00:00:00'
        if(status) {
            localStorage.setItem('startDate', date.target.value);
            localStorage.setItem('startDateString', d);
            setStart(date.target.value)
            setStartType('text');
        } else  {
            localStorage.setItem('endDate', date.target.value);
            localStorage.setItem('endDateString', d);setStart(result)
            setEndType('text');
        }
        return d;
    }

    useEffect(() => {
        if(localStorage.getItem('startDateString').length > 0) {
            setStart(localStorage.getItem('startDateString'));
            setStartType('text');
        };
        if(localStorage.getItem('endDateString').length > 0) {
            setEnd(localStorage.getItem('endDateString'));
            setEndType('text');
        };
     }, []);

    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    type={startType}
                    placeholder="Min search date"
                    name="start"
                    value={start}
                    disabled={startType == 'text' ? true : false}
                    onChange={(value) => console.log('Start date => ', convertDate(value, true))}
                />
            </Form.Item>
            <Button onClick={() => {setStart(null); setStartType('date'); localStorage.setItem('startDate', null); localStorage.setItem('startDateString', '');} }> Clear start date </Button>
            <Form.Item>
                <Input
                    style={{ marginLeft: '10px' }}
                    type={endType}
                    placeholder="Max search date"
                    disabled={endType == 'text' ? true : false}
                    name="end"
                    value={end}
                    onChange={(value) => console.log('Start date => ', convertDate(value, false))}
                />
            </Form.Item>
            <Button onClick={() => { setEnd(null); setEndType('date'); localStorage.setItem('endDate', null); localStorage.setItem('endDateString', '');} }> Clear end date </Button>
        </Form>
    )
}

export default DateFilter
