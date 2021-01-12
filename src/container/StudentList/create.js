import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button } from 'antd';
import React, { useEffect, useState, useReducer } from 'react'
import { createTeacher } from '../../services/Teacher';
import { getStudentProfileByDate } from '../../services/Student'
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
    const [loading, setLoading] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [student, setStudent] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    useEffect(() => {
        getStudents();
    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = () => {

        if (formData.firstName && formData.lastName && formData.email && formData.iemail && formData.grade && formData.subjects && formData.schoolName && formData.schoolBoard && formData.phone) {
            if (formData.firstName.toString().length <= 0
                || formData.lastName.toString().length <= 0
                || formData.email.toString().length <= 0
                || formData.schoolName.toString().length <= 0
                || formData.schoolBoard.toString().length <= 0
                || formData.phone.toString().length <= 0
                || formData.subjects.toString().length <= 0
                || formData.iemail.toString().length <= 0
                || formData.grade.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                // return
            }
        } else {
            alert("Please, fill the form!");
            // return
        }

        console.log('Firs => ', formData.firstName);
        console.log('last => ', formData.lastName);
        console.log('email => ', formData.email);
        console.log('schoolname => ', formData.schoolName);
        console.log('schoolboard => ', formData.schoolBoard);
        console.log('iEmail => ', formData.iemail);
        console.log('grade => ', formData.grade);
        console.log('subjects => ', formData.subjects);

        setLoading(true);

        createTeacher(formData.firstName, formData.lastName, formData.email, formData.iemail, formData.schoolName, formData.schoolBoard, formData.grade, formData.subjects, formData.phone).then(data => {
            // history.push(`/studentprofiles`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        })
            .finally(() => setLoading(false));
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
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Booking</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <Autocomplete
                        id="asynchronous-search"
                        options={studentList}
                        size="small"
                        inputValue={student}
                        // closeIcon={<EditOutlined style={{ color: 'blue' }}/>}
                        onInputChange={(__, newInputValue) => {
                            setStudent(newInputValue);
                            console.log(newInputValue);
                        }}
                        onChange={(__, newValue) => {
                            if (newValue != null)
                                setStudent(newValue.id);
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
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <TextField {...params}
                                    label="Select a student"
                                    variant="outlined"
                                    // onChange={(e) => changeTeacherSearch(e)}
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
                            </div>

                        }
                    />
                    <Form.Item label="Last Name" required>
                        <Input type="text" name="lastName" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Internal Email" required>
                        <Input type="email" name="email" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="External Email" required>
                        <Input type="email" name="iemail" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Teacher grade" required>
                        <Input type="text" name="grade" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Teacher subjects" required>
                        <Input type="text" name="subjects" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Phone number" required>
                        <Input type="text" name="phone" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="School Name" required>
                        <Input type="text" name="schoolName" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="School Board" required>
                        <Input type="text" name="schoolBoard" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateBooking
