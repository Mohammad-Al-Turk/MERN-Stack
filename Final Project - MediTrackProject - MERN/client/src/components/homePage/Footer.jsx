import "../../styles/Footer.css";
import { Link } from "react-router-dom";
import logo from "../../images/MediTrackerTitle.png"; // ✅ Corrected import

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Subscribe to our newsletter to receive the latest news and updates.</p>
          <div className="newsletter">
            <input type="email" placeholder="Your Email" />
            <button type="button">Join Us</button> {/* ✅ Added button type */}
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>📍 Ramallah, Palestine<br /><span style={{marginLeft:"20px"}}>Al-Masayf, Ogaret Axsos</span></p> {/* ✅ Capitalized location for consistency */}
          <p>📞 Phone Number<br /><span style={{marginLeft:"20px"}}>0591234123</span></p>
        </div>

        <div className="footer-section">
          <img src={logo} alt="MediTracker Logo" className="footer-logo" style={{width:"300px"}}/> {/* ✅ Fixed image tag */}
          <p>An integrated clinic management system that allows clinic administration from anywhere.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
