import "./Navbar.css";
import Logo from "../../assets/plane-logo.svg";
import profilePic from "../../assets/portrait.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <Link to="/" className="user-button">
        <div className="nav-left">
          <img src={Logo} alt="logo" className="nav-logo" />
          <span className="brand">Argo</span>
        </div>
      </Link>

      <ul className="nav-links">
        <li>
          <a href="/" className={isActive("/")}>
            Home
          </a>
        </li>
        <li>
          <a href="/bookings" className={isActive("/bookings")}>
            My Bookings
          </a>
        </li>
        <li>
          <a href="/profile" className={isActive("/profile")}>
            Profile
          </a>
        </li>
        <li>
          <a href="/admin" className={isActive("/admin")}>
            Admin
          </a>
        </li>
      </ul>

      <div className="nav-user">
        <Link to="/profile" className="user-button">
          <img src={profilePic} alt="user avatar" className="user-avatar" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
