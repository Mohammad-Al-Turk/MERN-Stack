import { useState, useEffect } from "react";
import { Col, Layout, Menu } from "antd";
import { HomeOutlined, CalendarOutlined ,WechatOutlined} from "@ant-design/icons";
import "../styles/AssistDashboard.css";
import MediTrackerLogo from "../images/MediTracker.png";
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from "../components/users/AuthContext.jsx";
import {useNavigate, useLocation, Outlet} from "react-router-dom"; // Import useLocation

import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const AssistantDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user || user.role !== "assistant") {
                alert("Stop Playing Around!");
                try {
                    await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });
                    logout();
                    navigate("/");
                } catch (error) {
                    console.log("Logout failed:", error);
                }
            }
        };

        if (user) {
            checkUserRole().then();
        }
    }, [user, navigate, logout]);

    useEffect(() => {
        const path = location.pathname;
        if (path === "/assistDashboard" || path === "/assistDashboard/home") {
            setSelectedKey("1");
        } else if (path === "/assistDashboard/appointments") {
            setSelectedKey("2");
        } else if (path === "/assistDashboard/chats") {
            setSelectedKey("3");
        }
    }, [location.pathname]);

    const toggleCollapse = () => setCollapsed(!collapsed);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Assistant Dashboard",
            onClick: () => navigate("/assistDashboard/home"),
        },
        {
            key: "2",
            icon: <CalendarOutlined/>,
            label: "Appointments",
            onClick: () => navigate("/assistDashboard/appointments")
        },
        {
            key: "3",
            icon: <WechatOutlined />,
            label: "Messages",
            onClick: () => navigate("/assistDashboard/chats")
        },
    ];

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-title">
                    <img src={MediTrackerLogo} alt="Logo" className="dashboard-image" />
                    <div className="logout-button">
                        <LogoutButton />
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={toggleCollapse}
                    className="dashboard-sider"
                    width={300}
                >
                    <Menu
                        theme="dark"
                        selectedKeys={[selectedKey]}
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
                <Layout className="dashboard-main">
                    <Content className="dashboard-content">
                        <div className="dashboard-welcome-container">
                            {user ? `Welcome, ${user.firstName} ${user.lastName}` : "Loading..."}
                        </div>
                        <Col span={24}>
                            <Outlet context={{ user }} />
                        </Col>
                    </Content>

                    {/* Footer */}
                    <Footer className="footer">MediTracker ©2025</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AssistantDashboard;