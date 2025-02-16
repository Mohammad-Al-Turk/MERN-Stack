import {Card, Col, message, Row, Spin, Statistic} from "antd";
import {FileTextOutlined, UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/AdminDashboard.css';


const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roleCounts, setRoleCounts] = useState({
        practitioner: 0,
        assistant: 0,
        administrator: 0,
        patient: 0,
    });

    useEffect(() => {
        const fetchUsers = async () => { // Make the fetch function async
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/users',
                    { withCredentials: true },
                );

                if (Array.isArray(response.data.users)) { // Check if it is an array
                    setUsers(response.data.users);
                } else {
                    console.error("API returned non-array data:", response.data);
                    setError("Invalid data format from API"); // Set error message
                    message.error("Invalid data format from API"); // Display a message to the user
                }

            } catch (error) {
                console.error("API Error:", error);
                setError("Error fetching users. Please try again later."); // Set error message
                message.error("Error fetching users. Please try again later."); // Display a message to the user
            }
        };

        fetchUsers().then();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            const counts = {
                practitioner: 0,
                assistant: 0,
                administrator: 0,
                patient: 0,
            };

            users.forEach(user => {
                if (user.role && counts.hasOwnProperty(user.role)) { // Check if the role exists and is in the counts object
                    counts[user.role]++;
                }
            });

            setRoleCounts(counts);
            setLoading(false);
        }
    }, [users]);

    if (loading) {
        return (
            <div className="loading-container">
                <Spin spinning={loading} tip="Loading...">
                    <div style={{ height: '100vh' }}></div>
                </Spin>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ width: "100%" }}>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Total Users" value={users.length} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Total Admins" value={roleCounts.administrator} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Reports" value={93} prefix={<FileTextOutlined />} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Practitioners" value={roleCounts.practitioner} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Assistants" value={roleCounts.assistant} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}> {/* Each card takes 1/3 on medium and larger screens */}
                    <Card className="dashboard-card">
                        <Statistic title="Patients" value={roleCounts.patient} prefix={<UserOutlined />} />
                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default AdminHome;