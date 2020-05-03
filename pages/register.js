import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, message } from 'antd';
import { register } from '../api/user';
import validator from 'validator';
const { Option } = Select;

const SignUp = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        emailId: '',
        password: '',
        role: ''
    });
    const [btnSubmit, setBtnSubmit] = useState(false);
    const handleSubmit = async (formData) => {
        let err = null;

        if (!formData.password) {
            err = "Please Enter Password";
        }

        if (!formData.emailId) {
            err = "Please Enter Email";
        }
        if (formData.emailId) {
            !validator.isEmail(formData.emailId) ? err = "Please Enter Valid Email"
                : '';
        }
        if (!formData.name) {
            err = "Please Enter Name";
        }
        if (err) {
            message.error(err, 7);
            return;
        }
        formData.roleId = 1;
        isAgent ? formData.roleId = 2 : formData.roleId;
        setBtnSubmit(true);
        const registerAPI = await register(formData);
        setBtnSubmit(false);
        if (registerAPI.error) {
            message.error(registerAPI.error, 7)
        } else {
            message.success(registerAPI.message, 7);
            window.location.href = "/";
        }
    }
    const countryCodeUpdate = (c, code) => {
        setFormData({ ...formData, 'countryCode': code.dialCode });
    }

    const mobileNumberUpdate = (val, number) => {
        setFormData({ ...formData, 'mobileNo': number })
    }
    return (
        <div className="py-12 bg-light-grey">
            <Row>
                <Col span={4} xs={22} sm={22} md={4}></Col>
                <Col span={16} xs={22} sm={22} md={16}>
                    <Row className="mb-10">
                        <Col span={24}>
                            <div className="custom-font font-bold text-4xl leading-tight text-navy flex justify-center py-4">
                                Tata AIG Assignment
                            </div>
                            <div className="custom-font font-bold text-2xl leading-tight text-navy flex justify-center">
                                Sign up form
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}></Col>
                        <Col span={10}>
                            <Row>
                                <Col span={24}>
                                    <div>
                                        <div className="pr-6">
                                            <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">FIRST NAME</div>
                                            <div>
                                                <Input size="large" value={formData.name} onChange={(e) => setFormData({ ...formData, 'name': e.target.value })} className="custom-font text-lg font-medium leading-tight bg-pale-grey text-steel" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="mt-6">
                                        <div className="pr-6">
                                            <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">EMAIL ID</div>
                                            <div>
                                                <Input size="large" type="email" value={formData.emailId} onChange={(e) => setFormData({ ...formData, 'emailId': e.target.value })} className="custom-font text-lg font-medium leading-tight bg-pale-grey text-steel" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="mt-6">
                                        <div className="pr-6">
                                            <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">PASSWORD</div>
                                            <div>
                                                <Input.Password size="large" value={formData.password} onChange={(e) => setFormData({ ...formData, 'password': e.target.value })} className="custom-font text-lg font-medium leading-tight bg-pale-grey text-steel" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col span={24}>
                                    <div className="mt-6">
                                        <div className="pr-6">
                                            <div className="custom-font  text-base font-bold leading-tight text-steel pb-1">Role</div>
                                            <div>
                                                <Select
                                                    className='custom-font w-full' size="large"
                                                    placeholder="Select a role"
                                                    value={formData.role}
                                                    onChange={(value) => setFormData({ ...formData, 'role': value })}
                                                >
                                                    <Option className="custom-font text-steel font-bold" value="1">Admin</Option>
                                                    <Option className="custom-font text-steel font-bold" value="2">User</Option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col span={24}>
                                    <div className="py-12">
                                        <span className="pr-2 sm:pr-2 md:pr-6">
                                            <Button loading={btnSubmit} type="primary" onClick={() => handleSubmit(formData)} size="large" className="custom-font bg-pumpkin-orange border-pumpkin-orange text-lg font-bold">SIGN UP</Button>
                                        </span>
                                        <span>
                                            <span className="custom-font font-medium text-lg leading-tight text-navy">Have an account?</span>
                                            <span className="custom-font font-medium text-lg leading-tight text-teal-blue cursor-pointer"><a href="/"> Log-in</a> </span>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={7}></Col>
                    </Row>
                </Col>
                <Col span={4} xs={22} sm={22} md={4}></Col>
            </Row>
        </div>
    )
}

export default SignUp;