import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import '../../Assets/container/StudentList.css'
import { PageHeader, Form, Input, Button } from 'antd';
import 'react-phone-input-2/lib/bootstrap.css'
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from 'react-phone-input-2';
import { createSchedule, createTeacher } from '../../services/Teacher';
import React, { useEffect, useState, useReducer } from 'react'
import { getCountry } from '../../services/Student';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function CreateTeacher() {

    const history = useHistory();
    const [country, setCountry] = useState(null)
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [form] = Form.useForm();

    useEffect(() => {
        getCountry().then(data => {
            setCountry(data.countryCode.toString().toLowerCase());
        })

    }, []);

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleSubmit = () => {

        if (formData.firstName && formData.lastName && formData.email && formData.iemail && formData.grade && formData.subjects && formData.schoolName && formData.schoolBoard && phone) {
            if (formData.firstName.toString().length <= 0
                || formData.lastName.toString().length <= 0
                || formData.email.toString().length <= 0
                || formData.schoolName.toString().length <= 0
                || formData.schoolBoard.toString().length <= 0
                || phone.toString().length <= 0
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

        setLoading(true);

        createTeacher(formData.firstName, formData.lastName, formData.email, formData.iemail, formData.schoolName, formData.schoolBoard, formData.grade, formData.subjects, phone).then(data => {
            // console.log(data)
            history.push(`/teacherprofiles`);
            // history.push(`/studentlist/teacher/${data.data.id}`, { teacher: data.data })
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
                title={<p style={{ fontSize: '3em', textAlign: 'center', marginTop: '20px', marginBottom: '20px'  }}>Create Teacher</p>}
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
                    <Form.Item label="Phone Number" required>
                        <PhoneInput
                            enableSearch
                            countryCodeEditable={false}
                            disableCountryCode={false}
                            inputClass={"form-control"}
                            searchStyle={{
                                width: "90%",
                            }}
                            inputStyle={{
                                borderRadius: "0px",
                                width: "inherit",
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                            country={country}
                            // value={phone}
                            onChange={(value, country, e, formattedValue) => {
                                setPhone(formattedValue)
                            }}
                        />
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
export default CreateTeacher
