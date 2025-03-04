import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button, Select } from 'antd';
import { createStudent } from '../../services/Teacher';
import { getParentProfile, findParentProfileByEmail, getTags } from '../../services/Student';
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from 'antd/lib/input/Search';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateStudent() {

    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [parents, setParents] = useState([]);
    const [parent, setParent] = useState(null);
    const [lastName, setLastName] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    useEffect(() => {
        getListView();
    }, []);

    const getListView = (search = '') => {
        if (search.length < 0) {
            getParentProfile(0, 100, 'firstName', 'asc').then(data => {
                if (data) {
                    if (data.content) {
                        setParents(data.content);
                    } else {
                        setParents([]);
                    }
                } else {
                    setParents([]);
                }
            })
        } else {
            findParentProfileByEmail(search, 0, 100, 'firstName', 'asc').then(data => {
                if (data) {
                    if (data.content) {
                        setParents(data.content);
                    } else {
                        setParents([]);
                    }
                } else {
                    setParents([]);
                }
            })
        }
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const changeParent = (p) => {
        setLastName(p.lastName);
        setParent(parent);
    }

    const handleSubmit = () => {
        if (formData.firstName && lastName && formData.email && formData.schoolName && formData.schoolBoard && parent && formData.grade) {
            if (formData.firstName.toString().length <= 0
                || lastName.toString().length <= 0
                || formData.schoolName.toString().length <= 0
                || formData.schoolBoard.toString().length <= 0
                || formData.email.toString().length <= 0
                || formData.grade.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }

        setSubmitting(true);

        createStudent(formData.firstName, lastName, formData.email, formData.schoolName, formData.schoolBoard, formData.grade, parents.find(p => p.email === parent).id).then(data => {

            history.push(`/studentprofiles`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        })
            .finally(() => setSubmitting(false));
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Student</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Parent Email" required style={{ flex: 1, marginRight: '10px' }}>
                            <Autocomplete
                                id="asynchronous-search"
                                options={parents}
                                size="small"
                                inputValue={parent}
                                onInputChange={(__, newInputValue) => {
                                    setParent(newInputValue);
                                    getListView(newInputValue)
                                }}
                                onChange={(__, newValue) => {
                                    changeParent(newValue);
                                }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                loading={loading}
                                getOptionLabel={(record) => record.email}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
                        {/* <Form.Item label="Parent Name" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input disabled={true} type="text" value={name} />
                        </Form.Item> */}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="First Name" required style={{ flex: 1, marginRight: '10px' }} autoComplete="off">
                            <Input type="text" name="firstName" onChange={handleChange} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Last Name" required style={{ flex: 1, marginLeft: '10px' }} autoComplete="off">
                            <Input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="off" />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Student Email" required style={{ flex: 1, marginRight: '10px' }} autoComplete="off">
                            <Input type="email" name="email" onChange={handleChange} autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Student grade" required style={{ flex: 1, marginLeft: '10px' }} autoComplete="off">
                            <Input type="number" min={0} max={12} step={1} name="grade" onChange={handleChange} autoComplete="off" />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="School Name" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="text" name="schoolName" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="School Board" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="text" name="schoolBoard" onChange={handleChange} />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a Student Profile'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateStudent
