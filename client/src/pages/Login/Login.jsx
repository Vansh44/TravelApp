import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/auth.css";
import PlaneLogo from "../../assets/plane-logo.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser: contextLoginUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      contextLoginUser(data.user, data.token);

      alert("Login successful!");

      navigate("/");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <img src={PlaneLogo} alt="Logo" className="logo-img" />

          <h2>
            Log In to Journey Booking
            <br />
            Platform
          </h2>
          <p>Welcome back! Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary" type="submit">
            Log In
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
