import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./utils/api";
import { consumePostLoginRedirect } from "./utils/auth";
import StoreHeader from "./components/StoreHeader";
import ProjectFooter from "./components/ProjectFooter";
import "./homepage.css";
import "./login.css";

function MailIcon() {
  return <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
}

function EyeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}

function FetchPostexample() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resMsg, setResMsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      window.dispatchEvent(new Event("customer-session-updated"));
      navigate(consumePostLoginRedirect() || "/userpanel", { replace: true });
    }
  }, [navigate]);

  function isValidEmail(value) {
    return /^\S+@\S+\.\S+$/.test(value);
  }

  function handleLogin(event) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setResMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setResMsg("Password must be at least 6 characters.");
      return;
    }

    axios
      .post(apiUrl("/loginuser"), { email, password })
      .then((response) => {
        if (response.data.status === "1") {
          const token = response.data.token;
          const userId = response.data.id;
          const customerName = response.data.name || "";

          localStorage.setItem("usertoken", token);
          localStorage.setItem("uid", userId);
          localStorage.setItem("cid", userId);
          localStorage.removeItem("adminemail");
          localStorage.removeItem("admintoken");
          localStorage.removeItem("aid");
          localStorage.setItem("rememberCustomer", rememberMe ? "yes" : "no");

          if (customerName) {
            localStorage.setItem("name", customerName);
          }

          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.email) {
              localStorage.setItem("email", payload.email);
            }
            if (payload.name && !customerName) {
              localStorage.setItem("name", payload.name);
            }
          } catch (err) {
            console.log("Token decode error:", err);
          }

          window.dispatchEvent(new Event("customer-session-updated"));
          navigate(consumePostLoginRedirect() || "/userpanel", { replace: true });
        } else {
          setResMsg("Login failed. Invalid details.");
        }
      })
      .catch(() => {
        setResMsg("Server error");
      });
  }

  function handleForgot() {
    if (!isValidEmail(forgotEmail)) return;
    setForgotOpen(false);
    setForgotEmail("");
  }

  return (
    <div className="login-shared-page">
      <StoreHeader active="product" topbarText="Welcome in the world of Footwears" />

      <main className="login-shared-main">
        <div className="login-shared-bg">
          <img src="/assets/storefront/photo-1542291026-7eec264c27ff.jpg" alt="Shoes background" />
        </div>

        <div className="login-shared-card">
          <div className="login-shared-card-head">
            <h1>Welcome <span>Back</span></h1>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className="login-shared-field">
              <label htmlFor="loginEmail">Email Address</label>
              <div className="login-shared-input-wrap">
                <span className="login-shared-field-icon"><MailIcon /></span>
                <input type="email" id="loginEmail" placeholder="Enter your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="login-shared-field">
              <label htmlFor="loginPw">Password</label>
              <div className="login-shared-input-wrap">
                <span className="login-shared-field-icon"><LockIcon /></span>
                <input type={showPassword ? "text" : "password"} id="loginPw" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="login-shared-toggle-pw" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  <EyeIcon />
                </button>
              </div>
            </div>

            <div className="login-shared-row-opts">
              <label className="login-shared-check-label">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me
              </label>
              <button type="button" className="login-shared-forgot-link" onClick={() => setForgotOpen(true)}>Forgot Password?</button>
            </div>

            <button type="submit" className="login-shared-btn-main">LOGIN</button>
            <p className="login-shared-inline-message">{resMsg}</p>
          </form>

          <div className="login-shared-or-divider"><span>OR</span></div>

          <button type="button" className="login-shared-google-btn">
            <span className="login-shared-google-mark" />
            CONTINUE WITH GOOGLE
          </button>

          <div className="login-shared-switch-row">
            Don't have an account? <button type="button" onClick={() => navigate("/reg")}>Register</button>
          </div>
        </div>
      </main>

      <ProjectFooter />

      <div className={`login-shared-modal-overlay ${forgotOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setForgotOpen(false); }}>
        <div className="login-shared-modal">
          <span className="login-shared-modal-close" onClick={() => setForgotOpen(false)}>&times;</span>
          <h3>Reset Password</h3>
          <p>Enter your registered email address and we'll send you a link to reset your password.</p>
          <div className="login-shared-field">
            <label htmlFor="forgotEmail">Email Address</label>
            <div className="login-shared-input-wrap">
              <span className="login-shared-field-icon"><MailIcon /></span>
              <input type="email" id="forgotEmail" placeholder="Enter your email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            </div>
          </div>
          <button type="button" className="login-shared-btn-main" onClick={handleForgot}>SEND RESET LINK</button>
        </div>
      </div>
    </div>
  );
}

export default FetchPostexample;

