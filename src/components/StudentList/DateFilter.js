import React, { useState, useEffect } from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const DateFilter = ({searchStudentListByDate}) => {

    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [startType, setStartType] = useState('date');
    const [endType, setEndType] = useState('date');

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
                 setStart(d)
        //         setStartType('text');
         } else  {
        //         localStorage.setItem('endDate', date.target.value);
        //         localStorage.setItem('endDateString', d);setStart(result)
        //         setEndType('text');
                setEnd(d)
         }
        return d;
    }

    // useEffect(() => {
    //     if(localStorage.getItem('startDateString') != null)
    //         if(localStorage.getItem('startDateString').length > 0) {
    //             setStart(localStorage.getItem('startDateString'));
    //             setStartType('text');
    //         };
    //     if(localStorage.getItem('endDateString') != null)
    //         if(localStorage.getItem('endDateString').length > 0) {
    //             setEnd(localStorage.getItem('endDateString'));
    //             setEndType('text');
    //     };
    //  }, [start, end, startType, endType]);

    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    type='date'
                    placeholder="Min search date"
                    name="start"
                    //value={start}
                    disabled={startType == 'text' ? true : false}
                    onChange={(value) => convertDate(value, true)}
                />
            </Form.Item>
            <Button onClick={() => {setStart(null); setStartType('date'); localStorage.setItem('startDate', null); localStorage.setItem('startDateString', '');} }> Clear  </Button>
            <Form.Item>
                <Input
                    style={{ marginLeft: '10px' }}
                    type='date'
                    placeholder="Max search date"
                    name="end"
                    //value={end}
                    onChange={(value) => convertDate(value, false)}
                />
            </Form.Item>
            <Button onClick={() => { setEnd(null); setEndType('date'); localStorage.setItem('endDate', null); localStorage.setItem('endDateString', '');} }> Clear </Button>
            <Button style={{ marginLeft: '20px' }} onClick={() => searchStudentListByDate(start, end)}> Search </Button>
        </Form>
    )
}

export default DateFilter
