import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button } from 'antd';
import { createParent } from '../../services/Teacher';
import React, { useEffect, useState, useReducer } from 'react'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateParent() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    useEffect(() => {

    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = () => {

        if (formData.email && formData.phoneNumber && formData.phoneCode && formData.tenant) {
            if(
                formData.email.toString().length <= 0
                || formData.phoneNumber.toString().length <= 0
                || formData.phoneCode.toString().length <= 0
                || formData.tenant.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }

        setLoading(true);

        createParent(formData.phoneNumber, formData.phoneCode, formData.email, formData.tenant).then(data => {
            history.push(`/parentProfiles`)
        }).catch(err => {
            alert("Error occured when saving data, please retry!")
            console.log(err)
        })
        .finally(() => setLoading(false));
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Parent</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <Form.Item label="Parent Email" required>
                        <Input type="email" name="email" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Phone Code" required>
                        <Input type="number" name="phoneCode" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Phone Number" required>
                        <Input type="number" name="phoneNumber" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Tenant" required>
                        <Input type="text" name="tenant" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateParent;
