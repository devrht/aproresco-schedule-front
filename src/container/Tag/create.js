import React, { useState, useReducer } from 'react'

import { PageHeader, Form, Input, Button,Radio } from 'antd'
import { useHistory } from 'react-router-dom'
import {addTag} from '../../services/Student'
import 'antd/dist/antd.css';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const CreateTag = () => {

    const history = useHistory();
    
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();
    //const [enabled, setEnabled] = useState("true");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = () => {
        if (formData.name && formData.enabled) {
            if (formData.name.toString().length <= 0) {
                alert("Please, fill the form 1!");
                return
            }
        }else {
            alert("Please, fill the form 2!");
            return
        }
        setSubmitting(true)

        let data = {
            name:formData.name,
            enabled:formData.enabled,
        }
        console.log("Tag to register ===>", data)
        addTag(data).then(result => {
            console.log("Tag registered ===>", result);
            history.push(`/tagList`)
        }).finally(() => setSubmitting(false));

    }

    return (
        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Create Tag</p>}
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Form.Item label="Name" required style={{ flex: 1, marginRight: '40px' }}>
                            <Input type="text" name="name" onChange={handleChange} />
                        </Form.Item>
                        <Form.Item label="Enabled" required style={{ flex: 1, marginRight: '10px' }}>
                            <Radio.Group onChange={handleChange} name="enabled">
                                <Radio value={"true"}>True</Radio>
                                <Radio value={"false"}>False</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button disabled={submitting} type="primary" size="large" htmlType="submit">
                            {
                                submitting ? 'Loading...' : 'Create a Tag'
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateTag;
