import { Link, useNavigate } from "react-router-dom";
import "../../styles/TopBar.css";
import logo from "../../images/MediTrackerTitle.png";

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="logo">
        <img src={logo} className="img-logo" alt="logo" />
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/news">News</Link>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopBar;
