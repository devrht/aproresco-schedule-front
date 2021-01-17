import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import React, { useEffect, useState, useReducer } from 'react'
import { createBooking } from '../../services/Teacher';
import { getStudentProfileByDate, getSchedule } from '../../services/Student'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateBooking() {

    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [student, setStudent] = useState(null);
    const [comment, setComment] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [studentList, setStudentList] = useState([]);
    const [children, setChildren] = useState(null);
    const [form] = Form.useForm();
    const [schedules, setSchedules] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dat, setDat] = useState(null);
    const [subjec, setSubjec] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const changeChildren = (id) => {
        setDates([]);
        setSubjects([]);
        setDat(null);
        setSubjec(null);
        let _children = studentList.filter(c => c.id == id)[0];
        setChildren(_children);
        getSchedule(1).then(data => {
            setSchedules(data.content)
            var obj = {};
            for (var i = 0, len = data.content.length; i < len; i++)
                obj[data.content[i]['subject']] = data.content[i];

            data.content = new Array();
            for (var key in obj)
                data.content.push(obj[key]);
            setSubjects(data.content)
        });
    }

    const changeSubject = (subject) => {
        setSubjec(subject);
        setDat(null);
        setDates(schedules.filter(s => s.subject == subject));
    }

    const changeDate = (date) => {
        setDat(date);
    }

    const handleSubmit = () => {
        let s = schedules.filter(s => s.startDate == dat).filter(s => s.subject == subjec)[0];
        if (comment == null || s == null || children == null)
            alert('Fill the form');
        setSubmitting(true);
        createBooking(children, s, comment).then(data => {
            history.push(`/studentlist`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        }).finally(() => setSubmitting(false));
    }

    const getStudents = () => {
        setLoadingS(true);
        getStudentProfileByDate(localStorage.getItem('toStart'), localStorage.getItem('toEnd'), 0, 1000, 'firstName', 'asc').then(data => {
            if (data) {
                if (data.content) {
                    setStudentList(data.content);
                }
            }
        }).finally(() => setLoadingS(false))
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Booking</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >

                    <Form.Item label="Student" required>
                        <Autocomplete
                            id="asynchronous-search"
                            options={studentList}
                            size="small"
                            inputValue={student}
                            // closeIcon={<EditOutlined style={{ color: 'blue' }}/>}
                            onInputChange={(__, newInputValue) => {
                                setStudent(newInputValue);
                            }}
                            onChange={(__, newValue) => {
                                changeChildren(newValue.id);
                            }}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            loading={loadingS}
                            getOptionLabel={(record) => record.firstName + " " + record.lastName}
                            // style={{ minWidth: 450, marginLeft: -250 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loadingS ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Subject" required>
                        <Select onChange={(e) => changeSubject(e)}>
                            <option value={null}>Select a subject</option>
                            {
                                subjects.map(subject => {
                                    return (
                                        <option value={subject.subject} key={subject.id}>{subject.subject}</option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Start date" required>
                        <Select onChange={(e) => changeDate(e)}>
                            <option value={null}>Select a start date</option>
                            {
                                dates.map(date => {
                                    return (
                                        <option value={date.startDate} key={date.id}>{date.startDate}</option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Comment" required>
                        <Input type="text" name="comment" onChange={(e) => setComment(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => handleSubmit} disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a Student booking'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateBooking
