import { useState, useEffect } from "react";
import {Col, Layout, Menu, Row} from "antd";
import {CalendarOutlined, HomeOutlined, MedicineBoxOutlined, DiffOutlined} from "@ant-design/icons";
import '../styles/PractDashboard.css';
import MediTrackerLogo from '../images/MediTracker.png';
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from '../components/users/AuthContext.jsx';
import {useNavigate, useLocation, Outlet} from "react-router-dom"; // Import useLocation
const { Header, Content, Footer, Sider } = Layout;
import axios from "axios";

const PractitionerDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user || user.role !== "practitioner") {
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
        if (path === "/practDashboard" || path === "/practDashboard/home") {
            setSelectedKey("1");
        } else if (path === "/practDashboard/medicalHistory") {
            setSelectedKey("2");
        } else if (path === "/practDashboard/appointments") {
            setSelectedKey("3");
        } else if (path === "/practDashboard/prescription") {
            setSelectedKey("4");
        }
    }, [location.pathname]); // Add location.pathname to dependency array

    const toggleCollapse = () => setCollapsed(!collapsed);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined/>,
            label: "Practitioner Dashboard",
            onClick: () => navigate("/practDashboard/home")
        },
        {
            key: "2",
            icon: <MedicineBoxOutlined/>,
            label: "Medical History",
            onClick: () => navigate("/practDashboard/medicalHistory")
        },
        {
            key: "3",
            icon: <CalendarOutlined/>,
            label: "Appointments",
            onClick: () => navigate("/practDashboard/appointments")
        },
        {
            key: "4",
            icon: <DiffOutlined/>,
            label: "Prescriptions",
            onClick: () => navigate("/practDashboard/prescription")
        }
    ];

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-title">
                    <img src={MediTrackerLogo} alt="Logo" className="dashboard-image" />
                    <div style={{ flex: 1 }}></div> {/* Spacer */}
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
                        selectedKeys={[selectedKey]}  // Use selectedKeys (plural)
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
                <Layout className="dashboard-main">
                    <Content className="dashboard-content">
                        <div className="dashboard-welcome-container">
                            {user ? `Welcome, Dr. ${user.firstName} ${user.lastName}` : "Loading..."}
                        </div>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Outlet context={{ user }} />
                            </Col>
                        </Row>
                    </Content>

                    {/* Footer */}
                    <Footer className="footer">MediTracker ©2025</Footer>
                </Layout>
            </Layout>

        </Layout>
    );
}

export default PractitionerDashboard;