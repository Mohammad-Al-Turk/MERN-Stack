import { Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const LogoutButton = () => {
    const navigate = useNavigate(); // Hook called INSIDE the component
    const { logout } = useAuth();     // Hook called INSIDE the component

    const handleLogout = async () => { // handleLogout is now INSIDE
        try {
            await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
            logout();
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error); // Improved error handling
        }
    };

    return (
        <Button type="primary" onClick={handleLogout} className="logout-button" danger>
            Logout
        </Button>
    );
};

export default LogoutButton;