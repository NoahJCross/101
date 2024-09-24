import "./footer.css";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="app__footer">
      <div className="app__footer-container">
        <div className="app__footer-column">
          <h2>Explore</h2>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#questions">Questions</a>
            </li>
            <li>
              <a href="#articles">Articles</a>
            </li>
            <li>
              <a href="#tutorials">Tutorials</a>
            </li>
          </ul>
        </div>
        <div className="app__footer-column">
          <h2>Support</h2>
          <ul>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
            <li>
              <a href="#help">Help</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="app__footer-column">
          <h2>Stay Connected</h2>
          <div className="app__footer-social-links">
            <a href="#facebook">
              <FaSquareFacebook size={40} />
            </a>
            <a href="#instagram">
              <FaSquareInstagram size={40} />
            </a>
            <a href="#twitter">
              <FaSquareXTwitter size={40} />
            </a>
          </div>
        </div>
      </div>
      <div className="app__footer-end">
        <h1>DEV@Deakin 2024</h1>
        <ul className="app__footer-end-links">
          <li>
            <a href="#privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="#terms">Terms</a>
          </li>
          <li>
            <a href="#code-of-conduct">Code of Conduct</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
