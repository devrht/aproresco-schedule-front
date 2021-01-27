import React, { useEffect, useState, useReducer } from 'react'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { updateSchedule } from '../../services/Teacher'
import { getSchedule } from '../../services/Student'
import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function UpdateSchedule() {

    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState(location.state.schedule);
    const [open2, setOpen2] = useState(false);
    const [isCreation, setIsCreation] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [sDate, setSDate] = useState('');
    const [sTime, setSTime] = useState('');
    const [eTime, setETime] = useState('');
    const [eDate, setEDate] = useState('');
    const [subject, setSubject] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log(schedule)
        let s = schedule.startDate.replaceAll('/', '-').split(' ')[0].split('-');
        let f = schedule.startDate.replaceAll('/', '-').split(' ')[0].split('-');
        let st = schedule.startDate.replaceAll('/', '-').split(' ')[1].split(':');
        let et = schedule.endDate.replaceAll('/', '-').split(' ')[1].split(':');
        formData.startDate = s[2]+'-'+s[0]+'-'+s[1];
        formData.endDate = f[2]+'-'+f[0]+'-'+f[1];
        setSDate(formData.startDate);
        setEDate(formData.endDate);
        setSTime(st[0]+':'+st[1]);
        setETime(et[0]+':'+et[1]);
        formData.endDate = schedule.endDate;
        console.log(schedule.startDate, formData.startDate)
        setSelectedSubjects([schedule.subject])
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

    const handleChangeSubjects = (value) => {
        setSelectedSubjects(value);
    }

    const handleSubmit = () => {
        if (sDate && eDate) {
            if (eDate.toString().length <= 0
                || sDate.toString().length <= 0
            ) {
                alert("Please, fill the form 1!");
                return
            }
        } else {
            alert("Please, fill the form 2!");
            return
        }
        setSubmitting(true)

        if (eDate < sDate) {
            alert("Start date cannot be after end date");
            setSubmitting(false);
            return
        }
        let date = new Date(sDate + "T" + sTime + ":00");
        // let d = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear()+' '+date.getHours().toString().padStart(2, '0') +':'+ date.getMinutes().toString().padStart(2, '0') + ':00 +0000';
        let d = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + date.getUTCDate().toString().padStart(2, '0') + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':00 +0000';

        date = new Date(eDate + "T" + eTime + ":00");

        // let f = (date.getMonth()+1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear()+' '+date.getHours().toString().padStart(2, '0') +':'+ date.getMinutes().toString().padStart(2, '0') + ':00 +0000';
        let f = (date.getUTCMonth() + 1).toString().padStart(2, '0') + '/' + date.getUTCDate().toString().padStart(2, '0') + '/' + date.getUTCFullYear() + ' ' + date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0') + ':00 +0000';

        let data = [];
        let tenant = JSON.parse(localStorage.getItem("tenant" + JSON.parse(localStorage.getItem("user")).id));


        updateSchedule(schedule.id, {
            subject: isCreation ? subject : selectedSubjects[0],
            startDate: d,
            endDate: f,
            grades: grades,
            tenant: {
                "key": tenant
            }
        }).then(result => {
            history.push(`/schedules`)

        }).finally(() => setSubmitting(false));
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Update Schedule</p>}
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
                                    defaultValue={schedule.subject}
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
                            <Input type="date" name="startDate" onChange={(e) => setSDate(e.target.value)} value={sDate} />
                        </Form.Item>
                        <Form.Item label="Start time" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="time" name="startTime" onChange={(e) => setSTime(e.target.value)} value={sTime} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="End date" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="date" name="endDate" onChange={(e) => setEDate(e.target.value)} value={eDate}/>
                        </Form.Item>
                        <Form.Item label="End time" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="time" name="endTime" onChange={(e) => setETime(e.target.value)} value={eTime}/>
                        </Form.Item>
                    </div>
                    <Form.Item label="Grades" required
                        onClick={() => setOpen2(open2 ? false : true)}>
                        <Select
                            mode="multiple"
                            allowClear
                            defaultValue={schedule.grades}
                            open={open2}
                            onFocus={() => setOpen2(true)}
                            onBlur={() => setOpen2(false)}
                            style={{ width: '100%' }}
                            onSelect={() => setOpen2(false)}
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
                                submitting ? 'Loading...' : 'Update Schedule'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default UpdateSchedule;
