import TopBar from "./TopBar";
import "../../styles/AboutUs.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TurkImage from "../../images/Turk.jpg";

const teamMembers = [
  { name: "Sami", role: "Full-Stack Developer", image: "https://i.ibb.co/4kbc7mM/unnamed-removebg-preview.png" },
  { name: "Mohammad Al-Turk", role: "Team Lead\nFull-Stack Developer", image: TurkImage },
  { name: "Yasser Alzoubi", role: "Full-Stack Developer", image: "https://i.ibb.co/HTTNXLtC/download-1.png" },
  { name: "Anas Zughayyar", role: "Full-Stack Developer", image: "https://i.ibb.co/jvPq32NC/image-2025-02-09-100326579.png" },
];

const AboutUs = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <TopBar />
      <div className="about-us-container">
        <div className="about-us-card">
          <h1 className="about-us-heading">About Us</h1>
          <p className="about-us-text">
          Welcome to Meditracker, your trusted healthcare management system. Our mission is to simplify clinic operations by efficiently managing roles, medical data, and prescriptions, ensuring seamless collaboration between healthcare professionals and enhanced patient care.
          </p>

          <h2 className="about-us-subheading">Who We Are</h2>
          <p className="about-us-text">
          Meditracker is an innovative platform designed to optimize clinic workflows. By offering role-based access and streamlining the management of medical records and prescriptions, we empower healthcare teams to provide better care with improved efficiency.
          </p>

          <h2 className="about-us-subheading">What We Offer</h2>
          <ul className="about-us-list">
            <li className="about-us-text">
              <span className="highlight-text">Role-Based Access:</span>  Tailored dashboards and permissions for doctors, nurses, and assistants, ensuring clear division of responsibilities.
            </li>
            <li className="about-us-text">
              <span className="highlight-text">Medical Data Management:</span>  Securely store and manage patients’ medical history and visit notes, making data retrieval quick and easy.
            </li>
            <li className="about-us-text">
              <span className="highlight-text">Prescription Management:</span>  Generate and manage digital prescriptions with the option to export as PDFs and send them directly to patients.
            </li>

            <li className="about-us-text">
              <span className="highlight-text">Efficient Workflow:</span>  Simplify day-to-day clinic operations by allowing healthcare professionals to focus on what matters most – patient care.
            </li>
          </ul>

          <h2 className="about-us-subheading">Our Vision</h2>
          <p className="about-us-text">
          To enhance clinic operations and improve healthcare delivery by offering efficient, role-driven solutions that foster collaboration and streamline workflows.
          </p>

          <h2 className="about-us-subheading">Our Commitment</h2>
          <p className="about-us-text">
          We are committed to security, efficiency, and ease of use. Our goal is to help healthcare professionals manage their clinic tasks seamlessly, so they can focus on delivering the best care to their patients.  
          </p>

          <h2 className="about-us-subheading">Our Team</h2>
          <Slider {...sliderSettings} className="team-slider">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="team-image-container">
                  <img src={member.image} alt={member.name} className="team-image" />
                </div>
                <div className="team-member-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
