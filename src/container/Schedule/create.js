import React, { useEffect, useState, useReducer } from 'react'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { createSchedule } from '../../services/Teacher'
import { getSchedule } from '../../services/Student'
import { useHistory } from 'react-router-dom'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateSchedule() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [isCreation, setIsCreation] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [subject, setSubject] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

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
            var obj = {};
            for (var i = 0, len = data.content.length; i < len; i++)
                obj[data.content[i]['subject']] = data.content[i];

            data.content = new Array();
            for (var key in obj)
                data.content.push(obj[key]);
            setSubjects(data.content)
        });
    }

    const handleChangeSelect = (value) => {
        setGrades(value.toString().split(',').map(i => Number(i)));
    }

    const handleChangeSubjects = (value) => {
        setSelectedSubjects(value);
    }

    const handleSubmit = () => {

        if (selectedSubjects && formData.startDate && formData.endDate) {
            if (selectedSubjects.length <= 0
                || formData.endDate.toString().length <= 0
                || formData.startDate.toString().length <= 0
            ) {
                alert("Please, fill the form 1!");
                return
            }
        } else {
            alert("Please, fill the form 2!");
            return
        }
        setSubmitting(true)
        let date = new Date(formData.startDate);
        let day = date.getDate() < 10 ? '0' + (date.getDate()) : (date.getDate())
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let year = date.getFullYear();
        let d = month + '/' + day + '/' + year + ' ' + formData.startTime + ':00 -0500';

        date = new Date(formData.endDate);
        day = date.getDate() < 10 ? '0' + (date.getDate()) : (date.getDate())
        month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        year = date.getFullYear();
        let f = month + '/' + day + '/' + year + ' ' + formData.endTime + ':00 -0500';

        createSchedule(selectedSubjects, d, f, grades).then(data => {
            history.push(`/schedules`)

        }).finally(() => setSubmitting(false));
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Schedule</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    onClick={() => console.log('Bonjour')}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    {
                        !isCreation ?
                            <Form.Item label="Subjects" required>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select subjects"
                                    // onChange={(e) => { console.log(e[e.length-1]) }}>
                                    onChange={(e) => { e[e.length-1] == null ? setIsCreation(true) : handleChangeSubjects(e) }}>
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
                                    if (e.key === 'Enter') {
                                        setSubjects([...subjects, {subject: e.target.value, id: subjects.length+1}]);
                                        setIsCreation(false);
                                    }
                                }} onChange={(e) => setSubject(e.target.value)} />
                            </Form.Item>
                    }

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Start date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="date" name="startDate" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Start time" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="time" name="startTime" onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="End date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="date" name="endDate" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="End time" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="time" name="endTime" onChange={handleChange} />
                        </Form.Item>
                    </div>
                    {/* <Form.Item label="Description" required>
                        <Input type="text" name="description" onChange={handleChange} />
                    </Form.Item> */}
                    <Form.Item label="Grades" required>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select grades"
                            onChange={handleChangeSelect}
                        >
                            <Select.Option value={1}>1</Select.Option>
                            <Select.Option value={2}>2</Select.Option>
                            <Select.Option value={3}>3</Select.Option>
                            <Select.Option value={4}>4</Select.Option>
                            <Select.Option value={5}>5</Select.Option>
                            <Select.Option value={6}>6</Select.Option>
                            <Select.Option value={7}>7</Select.Option>
                            <Select.Option value={8}>8</Select.Option>
                            <Select.Option value={9}>9</Select.Option>
                            <Select.Option value={10}>10</Select.Option>
                            <Select.Option value={11}>11</Select.Option>
                            <Select.Option value={12}>12</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a Schedule'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateSchedule
