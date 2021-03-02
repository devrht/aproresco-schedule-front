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
const OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'];

function CreateSchedule() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [isCreation, setIsCreation] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState(OPTIONS);
    const [grades, setGrades] = useState([]);
    const [subject, setSubject] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getSubjects();
    }, []);

    const handleChange = event => {
        console.log(event.target.value)
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

    useEffect(() => {
        setFilteredOptions(OPTIONS.filter(o => !grades.includes(Number(o))));
    }, [grades]);

    const handleChangeSubjects = (value) => {
        setSelectedSubjects(value);
    }

    const handleSubmit = () => {

        if (formData.startDate && formData.endDate) {
            if (formData.endDate.toString().length <= 0
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

        if (formData.endDate < formData.startDate) {
            alert("Start date cannot be after end date");
            setSubmitting(false);
            return
        }
        let date = new Date(formData.startDate + "T" + formData.startTime + ":00");
        // let d = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear()+' '+date.getHours().toString().padStart(2, '0') +':'+ date.getMinutes().toString().padStart(2, '0') + ':00 +0000';
        let d = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + date.getUTCDate().toString().padStart(2, '0') + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':00 +0000';

        date = new Date(formData.endDate + "T" + formData.endTime + ":00");

        // let f = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear()+' '+date.getHours().toString().padStart(2, '0') +':'+ date.getMinutes().toString().padStart(2, '0') + ':00 +0000';
        let f = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + date.getUTCDate().toString().padStart(2, '0') + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':00 +0000';

        let data = [];
        let tenant = JSON.parse(localStorage.getItem("tenant" + JSON.parse(localStorage.getItem("user")).id));

        if (isCreation) {
            data.push(
                {
                    subject: subject,
                    startDate: d,
                    endDate: f,
                    grades: grades,
                    tenant: {
                        "key": tenant
                    }
                })
        } else {
            selectedSubjects.forEach(s => data.push(
                {
                    subject: s,
                    startDate: d,
                    endDate: f,
                    grades: grades,
                    tenant: {
                        "key": tenant
                    }
                }))
        }

        createSchedule(data).then(result => {
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
                    autoComplete="off"
                    onFinish={handleSubmit}
                    layout="vertical"
                    onKeyPress={event => {
                        if (event.which === 13 /* Enter */) {
                            event.preventDefault();
                        }
                    }}
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    {
                        !isCreation ?
                            <Form.Item label="Subjects" required
                                onClick={() => setOpen(open ? false : true)}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    open={open}
                                    onFocus={() => setOpen(true)}
                                    onBlur={() => setOpen(false)}
                                    style={{ width: '100%' }}
                                    onSelect={() => setOpen(false)}
                                    placeholder="Please select subjects"
                                    onChange={(e) => { e[e.length - 1] == null ? setIsCreation(true) : handleChangeSubjects(e) }}>
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
                                <Input autoFocus type="text" name="subject" value={subject} onKeyUp={(e) => {
                                    if (e.key === 'Escape') {
                                        setIsCreation(false);
                                    }
                                    if (e.key === 'Enter') {
                                        setSubjects([...subjects, { subject: e.target.value, id: subjects.length + 1 }]);
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
                    <Form.Item label="Grades" required
                        onClick={() => setOpen2(open2 ? false : true)}>
                        <Select
                            mode="multiple"
                            allowClear
                            open={open2}
                            value={grades}
                            onFocus={() => setOpen2(true)}
                            onBlur={() => setOpen2(false)}
                            style={{ width: '100%' }}
                            onSelect={() => setOpen2(false)}
                            placeholder="Please select grades"
                            onChange={handleChangeSelect}
                        >
                            {filteredOptions.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
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
