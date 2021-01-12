import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button } from 'antd';
import { createStudent } from '../../services/Teacher';
import React, { useEffect, useState, useReducer } from 'react'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateStudent() {

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

        if (formData.firstName && formData.lastName && formData.email && formData.schoolName && formData.schoolBoard && formData.parentEmail && formData.grade) {
            if (formData.firstName.toString().length <= 0
                || formData.lastName.toString().length <= 0
                || formData.email.toString().length <= 0
                || formData.schoolName.toString().length <= 0
                || formData.schoolBoard.toString().length <= 0
                || formData.parentEmail.toString().length <= 0
                || formData.grade.toString().length <= 0
            ) {
                alert("Please, fill the form!");
                return
            }
        } else {
            alert("Please, fill the form!");
            return
        }

        console.log('Firs => ', formData.firstName);
        console.log('last => ', formData.lastName);
        console.log('email => ', formData.email);
        console.log('schoolname => ', formData.schoolName);
        console.log('schoolboard => ', formData.schoolBoard);
        console.log('parent => ', formData.parentEmail);
        console.log('grade => ', formData.grade);

        setLoading(true);

        createStudent(formData.firstName, formData.lastName, formData.email, formData.schoolName, formData.schoolBoard, formData.grade, formData.parentEmail).then(data => {
            history.push(`/studentprofiles`)
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
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px' }}>Create Student</p>}
                extra={[
                ]}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    style={{ width: '80%', marginLeft: '10%' }}
                >
                    <Form.Item label="Fist Name" required>
                        <Input type="text" name="firstName" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Last Name" required>
                        <Input type="text" name="lastName" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Student Email" required>
                        <Input type="email" name="email" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Student grade" required>
                        <Input type="number" name="grade" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="School Name" required>
                        <Input type="text" name="schoolName" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="School Board" required>
                        <Input type="text" name="schoolBoard" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Parent Email" required>
                        <Input type="email" name="parentEmail" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </PageHeader>
        </div>
    )
}
export default CreateStudent
