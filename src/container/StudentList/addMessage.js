import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button, Checkbox } from 'antd';
import React, { useEffect, useState, useReducer } from 'react'
import { createMessage } from '../../services/Teacher';
import { getShortMessagesTemplates } from '../../services/Student'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function AddMessage(props) {

    const history = useHistory();
    const { params } = props.match;
    const [open, setOpen] = useState(false);
    const [loadingS, setLoadingS] = useState(false);
    const [subject, setSubject] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [asTemplate, setAsTemplate] = useState(false);
    const [async, setAsync] = useState(false);
    const [body, setBody] = useState('');
    const [formData, setFormData] = useReducer(formReducer, {});
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        getTemplates();
    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    // const changeTemplate = (id) => {
    //     setTemplate()
    // }

    const handleSubmit = () => {
        // let s = schedules.filter(s => s.startDate == dat).filter(s => s.subject == subjec)[0];
        // if (comment == null || s == null || children == null)
        //     alert('Fill the form');
        createMessage(params.id, startDate, endDate, body, subject, async, asTemplate).then(data => {
            history.push(`/studentlist`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        })
    }

    const getTemplates = () => {
        setLoadingS(true);
        getShortMessagesTemplates(params.id, 0, 1000, 'firstName', 'asc').then(data => {
            if (data) {
                if (data.content) {
                    setTemplates(data.content);
                }
            }
        }).finally(() => setLoadingS(false))
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Message</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >


                    <Form.Item label="Start Date" required>
                        <Input type="date" name="startDate" onChange={(e) => setStartDate(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="End Date" required>
                        <Input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Message Template" required>
                        <Autocomplete
                            id="asynchronous-search"
                            options={templates}
                            size="small"
                            inputValue={template}
                            // closeIcon={<EditOutlined style={{ color: 'blue' }}/>}
                            onInputChange={(__, newInputValue) => {
                                setTemplate(newInputValue);
                            }}
                            onChange={(__, newValue) => {
                                //changeChildren(newValue.id);
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
                        <Input type="text" name="subject" onChange={(e) => setSubject(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Body" required>
                        <Input type="text" name="body" onChange={(e) => setBody(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Save as template" required>
                        <Checkbox onChange={(e) => setAsTemplate(e.target.checked)} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => handleSubmit} type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default AddMessage
