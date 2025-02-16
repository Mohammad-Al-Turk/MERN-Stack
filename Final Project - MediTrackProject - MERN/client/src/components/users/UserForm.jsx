import React, { useState, useEffect } from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import '../../styles/Form.css'

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [error, setError] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEditing) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/user/${id}`, { withCredentials: true });
                    const { firstName, lastName, email, mobilePhone, role } = response.data.user;

                    // Set form values
                    form.setFieldsValue({ firstName, lastName, email, mobilePhone, role });

                    // Update state
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmail(email);
                    setMobilePhone(mobilePhone);
                    setRole(role);
                } catch (error) {
                    setError(error.response?.data || error.message);
                }
            };

            fetchUserData().then();
        }
    }, [id, isEditing, form]);

    // Handle form submission
    const onFinish = () => {
        const userData = { firstName, lastName, email, mobilePhone, role };

        if (!isEditing) {
            userData.password = password;
            userData.confirmPassword = confirmPassword;
        }

        const apiCall = isEditing
            ? axios.put(`http://localhost:8000/api/user/${id}`, userData, {withCredentials: true})
            : axios.post('http://localhost:8000/api/register', userData, {withCredentials: true});

        apiCall
            .then(() => {
                navigate("/adminDashboard/users")
            })
            .catch(error => {
                const errorResponse = error.response?.data?.errors || {};
                form.setFields(
                    Object.entries(errorResponse).map(([key, value]) => ({
                        name: key,
                        errors: [value.message],
                    }))
                );
                setError(error.response?.data?.message || "An error occurred while submitting the form.");
            });
    };

    return (
        <div>
            {isEditing ?
                <div className="editTitle">
                    <h1>Edit User</h1>
                    <Link to="/adminDashboard/users">
                        <Button type="primary">Cancel</Button>
                    </Link>
                </div>
                :
                <h1>Add a User</h1>}
            <Form
                form={form}
                name="userForm"
                onFinish={onFinish}
                layout="vertical" // Set form layout to vertical
                className="form-container"
            >
                <div className="form-table">
                    {/* First Column: First Name, Last Name, Email, Mobile Phone */}
                    <div className="form-column">
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: "First name is required!" }]}
                        >
                            <Input
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: "Last name is required!" }]}
                        >
                            <Input
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email is required!" },
                                { type: "email", message: "Invalid email format!" }
                            ]}
                        >
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mobile Phone"
                            name="mobilePhone"
                            rules={[{ required: true, message: "Mobile phone is required!" }]}
                        >
                            <Input
                                onChange={(e) => setMobilePhone(e.target.value)}
                                value={mobilePhone}
                            />
                        </Form.Item>
                    </div>

                    {/* Second Column: Role, Password, Confirm Password */}
                    <div className="form-column">
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Role is required!" }]}
                        >
                            <Select
                                onChange={(value) => setRole(value)}
                                value={role}
                            >
                                <Select.Option value="practitioner">Practitioner</Select.Option>
                                <Select.Option value="assistant">Assistant</Select.Option>
                                <Select.Option value="administrator">Administrator</Select.Option>
                                <Select.Option value="patient">Patient</Select.Option>
                            </Select>
                        </Form.Item>

                        {!isEditing && (
                            <>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: "Password is required!" }]}
                                >
                                    <Input.Password
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    rules={[{ required: true, message: "Confirm Password is required!" }]}
                                >
                                    <Input.Password
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                    />
                                </Form.Item>
                            </>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <Form.Item className="submit-button">
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}
            </Form>
        </div>
    );
};

export default UserForm;