import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/auth.css";
import PlaneLogo from "../../assets/plane-logo.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser: contextLoginUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser({ name, email, password });

      contextLoginUser(data.user, data.token);

      alert("Registered successfully!");

      navigate("/");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <img src={PlaneLogo} alt="plane logo" className="logo-img" />

          <h2>Create your Account</h2>
          <p>Join us today and get started</p>
        </div>

        <form onSubmit={handleRegister}>
          <InputField
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn-primary" type="submit">
            Sign Up
          </button>
        </form>

        <p className="switch-text">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
