import { useState, useEffect } from "react";
import { Card, Col, Layout, Menu, Typography } from "antd";
import { UserOutlined, HomeOutlined, UserAddOutlined, FileTextOutlined } from "@ant-design/icons";
import "../styles/AdminDashboard.css";
import MediTrackerLogo from "../images/MediTracker.png";
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from "../components/users/AuthContext.jsx";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");
    const { Title } = Typography;

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user || user.role !== "administrator") {
                alert("STOP PLAYING AROUND");
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
        if (path === "/adminDashboard" || path === "/adminDashboard/home") {
            setSelectedKey("1");
        } else if (path === "/adminDashboard/users") {
            setSelectedKey("2");
        } else if (path === "/adminDashboard/addUser") {
            setSelectedKey("3");
        }
    }, [location.pathname]);

    const toggleCollapse = () => setCollapsed(!collapsed);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: `${user?.firstName || "Admin Dashboard"}`,
            onClick: () => navigate("/adminDashboard/home"),
        },
        {
            key: "2",
            icon: <UserOutlined />,
            label: "All Users",
            onClick: () => navigate("/adminDashboard/users"),
        },
        {
            key: "3",
            icon: <UserAddOutlined />,
            label: "Add User",
            onClick: () => navigate("/adminDashboard/addUser"),
        },
    ];

    if (!user) {
        return <div>Loading...</div>; // Show loading until user is fetched
    }

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
                <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} className="dashboard-sider" width={300}>
                    <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={menuItems} />
                </Sider>
                <Layout className="dashboard-main">
                    <Content className="dashboard-content">
                        <Col span={24}>
                            <Card className="dashboard-card" title={<Title level={4}><FileTextOutlined /> Welcome, {user.firstName}</Title>}>
                                <Outlet context={{ user }} />
                            </Card>
                        </Col>
                    </Content>
                    <Footer className="footer">MediTracker ©2025</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;