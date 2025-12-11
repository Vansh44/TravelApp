import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-border"></div>

      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <p>Help Center</p>
            <p>Safety</p>
            <p>Guidelines</p>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>

        <div className="footer-social">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>

      <p className="footer-copy">© 2024 TravelPro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
