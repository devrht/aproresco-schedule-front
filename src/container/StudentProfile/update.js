import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { useLocation } from "react-router-dom";
import { PageHeader, Form, Input, Button, Select } from 'antd';
import { updateStudent } from '../../services/Teacher';
import { getParentProfile, getTags } from '../../services/Student';
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function UpdateStudent() {

    const history = useHistory();
    const location = useLocation();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(location.state.student);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [parents, setParents] = useState([]);
    const [parent, setParent] = useState(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState(location.state.student.lastName);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState([]);
    const [defaulttags, setDefaultTags] = useState([]);
    const [sortingName, setSortingName] = useState("name");
    const [sortingType, setSortingType] = useState("desc");

    const [listProps, setListProps] = useState({
        index: 0,
        size: 10,
    });

    useEffect(() => {
        console.log(data)
        formData.firstName = data.firstName;
        setLastName(data.lastName);
        formData.schoolName = data.schoolName;
        formData.schoolBoard = data.schoolBoard;
        formData.email = data.email;
        formData.grade = data.grade;
        setParent(data.parent.email)
        getListView();
        if(data.tags){
            data.tags.map(tag=> defaulttags.push(tag.name))
        }
        getEnabledTags();
    }, []);

    const getEnabledTags = () => {
        setLoading(true)
        getTags(listProps.index, listProps.size, sortingName, sortingType).then(data => {
            if (data) {
                if (data.content) {
                    setTagsList(data.content.filter(t => t.enabled == true));
                }
            }
        }).finally(() => setLoading(false))
    }

    const handleChangeTags = (value) =>{
        setTags(value);
    }

    const getListView = () => {
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

        let tgs=[]
        tags.map(res => tgs.push({"id": res}))

        updateStudent(data.id, formData.firstName, lastName, formData.email, formData.schoolName, formData.schoolBoard, formData.grade, parents.find(p => p.email === parent).id, tgs).then(data => {
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
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Update Student</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    autoComplete="off"
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
                                }}
                                onChange={(__, newValue) => {
                                    changeParent(newValue);
                                }}
                                open={open}
                                defaultValue={data.parent}
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
                        <Form.Item label="First Name" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="text" name="firstName" onChange={handleChange} defaultValue={data.firstName} />
                        </Form.Item>
                        <Form.Item label="Last Name" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} defaultValue={data.lastName} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Student Email" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="email" name="email" onChange={handleChange} defaultValue={data.email} />
                        </Form.Item>
                        <Form.Item label="Student grade" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="number" min={0} max={12} step={1} name="grade" onChange={handleChange} defaultValue={data.grade} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="School Name" required style={{ flex: 1, marginRight: '10px' }}>
                            <Input type="text" name="schoolName" onChange={handleChange} defaultValue={data.schoolName} />
                        </Form.Item>
                        <Form.Item label="School Board" required style={{ flex: 1, marginLeft: '10px' }}>
                            <Input type="text" name="schoolBoard" onChange={handleChange} defaultValue={data.schoolBoard} />
                        </Form.Item>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Tags" required style={{ flex: 1, marginRight: '10px'}} onClick={() => setOpen1(open1 ? false : true)}>
                            <Select mode="multiple"
                                allowClear
                                defaultValue={defaulttags}
                                loading={loading}
                                open={open1}
                                onFocus={() => setOpen1(true)}
                                onBlur={() => setOpen1(false)}
                                style={{ width: '100%' }}
                                onSelect={() => setOpen1(false)}
                                placeholder="Please select tags"
                                onChange={handleChangeTags}>
                                {
                                    tagsList.map(tag => {
                                        return (
                                            <Select.Option value={tag.id} key={tag.id}>{tag.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Update Student Profile'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default UpdateStudent
