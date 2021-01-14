import React, { useEffect, useState, useReducer } from 'react'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { createSchedule } from '../../services/Teacher'
import { getSchedule } from '../../services/Student'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateSchedule() {

    const [loading, setLoading] = useState(false);
    const [isCreation, setIsCreation] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    useEffect(() => {
        getSubjects();
    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const getSubjects = () => {
        getSchedule(1).then(data => {
            console.log(data)
            var obj = {};
            for (var i = 0, len = data.content.length; i < len; i++)
                obj[data.content[i]['subject']] = data.content[i];

            data.content = new Array();
            for (var key in obj)
                data.content.push(obj[key]);
            setSubjects(data.content)
        });
    }

    const handleSubmit = () => {

        if (subject && formData.startDate && formData.description) {
            if (subject.length <= 0
                || formData.startDate.toString().length <= 0
                || formData.description.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }

        let date = new Date(formData.startDate);
        let day = date.getDate() < 10 ? '0' + (date.getDate()) : (date.getDate())
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let year = date.getFullYear();
        let d = month + '/' + day + '/' + year + ' 00:00:00 -0500';

        createSchedule(subject, d, formData.description).then(data => {
            console.log(data);
        })
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Schedule</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    {
                        !isCreation ?
                            <Form.Item label="Subjects" required>
                                <Select onChange={(e) => { e == null ? setIsCreation(true) : setSubject(e) }}>
                                    <Select.Option value={null}>Create a new subject</Select.Option>
                                    {
                                        subjects.map(subject => {
                                            return (
                                                <Select.Option value={subject.subject} key={subject.id}>{subject.subject}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            :
                            <Form.Item label="Subject (press Escape to view existing subject)" required>
                                <Input type="text" name="subject" value={subject} onKeyUp={(e) => {
                                    if (e.key === 'Escape') {
                                        setIsCreation(false);
                                    }
                                }} onChange={(e) => setSubject(e.target.value)} />
                            </Form.Item>
                    }
                    <Form.Item label="Start date" required>
                        <Input type="date" name="startDate" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <Input type="text" name="description" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateSchedule
