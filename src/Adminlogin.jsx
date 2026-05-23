import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./utils/api";
import "./adminlogin.css";

function MailIcon() {
  return <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}

function EyeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();

    axios
      .post(apiUrl("/adminlogin"), {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status === "1") {
          localStorage.setItem("admintoken", response.data.token);
          localStorage.setItem("aid", response.data.id);
          localStorage.setItem("adminemail", email);
          localStorage.removeItem("email");
          localStorage.removeItem("usertoken");
          localStorage.removeItem("uid");
          localStorage.removeItem("cid");

          setRes("");
          navigate("/Admin");
        } else {
          setRes("Login failed. Invalid details.");
        }
      })
      .catch(() => {
        setRes("Server error. Please try again.");
      });
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <img
          src="/assets/storefront/photo-1542291026-7eec264c27ff.jpg"
          alt="Shoes background"
        />
      </div>

      <main className="admin-login-main">
        <div className="admin-login-card">
          <div className="admin-login-head">
            <p className="admin-login-kicker">Administrator Access</p>
            <br></br>
            <h1>Welcome <span>Admin</span></h1>
            <p>Login to your admin account</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className="admin-login-field">
              <label htmlFor="adminEmail">Email Address</label>
              <div className="admin-login-input-wrap">
                <span className="admin-login-field-icon"><MailIcon /></span>
                <input
                  type="email"
                  id="adminEmail"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="adminPassword">Password</label>
              <div className="admin-login-input-wrap">
                <span className="admin-login-field-icon"><LockIcon /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="adminPassword"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="admin-login-toggle-pw"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-btn-main">LOGIN</button>
            <p className="admin-login-inline-message">{res}</p>
          </form>

          <button
            type="button"
            className="admin-login-back-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}

export default Adminlogin;

