import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Button } from 'antd'

const { Option } = Select;
const SearchFilter = ({changeInput,searchList}) => {


    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        setStartDate(localStorage.getItem('startDate'));
        setEndDate(localStorage.getItem('endDate'));
    });

    const convertDate = (date, status) => {
        let result = new Date(date.target.value);
        console.log(date.target.value)
        if(date.target.value) {
            console.log('Bitch, i\'m in: ', date.target.value)
            let day = result.getDate() < 10 ? '0'+(result.getDate()) : (result.getDate())
            let month = result.getMonth()+1 < 10 ? '0'+(result.getMonth()+1) : (result.getMonth()+1);
            let year = result.getFullYear();
            let d = month+'/'+day+'/'+year+'%2000:00:00'
            if(status) {
                localStorage.setItem('startDate', year+'-'+month+'-'+day)
                localStorage.setItem('toStart', month+'/'+day+'/'+year+'%2000:00:00')
                setStartDate(year+'-'+month+'-'+day)
                //dispatch(setStartDate(year+'-'+day+'-'+month));
            } else  {
                localStorage.setItem('endDate', year+'-'+month+'-'+day)
                localStorage.setItem('toEnd', month+'/'+day+'/'+year+'%2000:00:00')
                setEndDate(year+'-'+month+'-'+day)
                //dispatch(setEndDate(year+'-'+day+'-'+month));
            }
        }
    }

    const onKeyEnter = (e) => {
        //alert("not enter")
        if(e.keyCode == 13){
            searchList();
        }
    }
    return (
        <Form layout="inline" style={{ marginRight: '20px' }}>
            <Form.Item>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onKeyDown={onKeyEnter}
                    onChange={changeInput}
                />
            </Form.Item>
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
                    type='date'
                    placeholder="Max search date"
                    value={endDate}
                    onChange={(value) => convertDate(value, false)}
                />
            </Form.Item>
            <Button onClick={searchList}> Search </Button>
        </Form>
    )
}

export default SearchFilter
