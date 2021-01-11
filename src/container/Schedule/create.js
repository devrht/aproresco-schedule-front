import React, { useEffect, useState, useReducer } from 'react'
import { PageHeader, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { createSchedule } from '../../services/Teacher'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateSchedule() {

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

        if (formData.subject && formData.startDate && formData.description) {
            if (formData.subject.toString().length <= 0
                || formData.startDate.toString().length <= 0
                || formData.description.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }

        let date = new Date(formData.startDate);
        let day = date.getDate() < 10 ? '0'+(date.getDate()) : (date.getDate())
        let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
        let year = date.getFullYear();
        let d = year+'-'+month+'-'+day+'T00:00:00.900Z'

        console.log('Subject => ', formData.subject);
        console.log('startDate => ', formData.startDate);
        console.log('description => ', formData.description);

        createSchedule(formData.subject, d, formData.description).then(data => {
            console.log(data);
        })
    }

    return (

        <div>
            <PageHeader
                ghost={false}
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Schedule</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <Form.Item label="Subject" required>
                        <Input type="text" name="subject" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Start date" required>
                        <Input type="date" name="startDate" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Description" required>
                        <Input type="text" name="description" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateSchedule
