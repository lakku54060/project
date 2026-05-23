import axios from "axios";
import { showToast } from "./utils/toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "./utils/api";
import StoreHeader from "./components/StoreHeader";
import ProjectFooter from "./components/ProjectFooter";
import "./homepage.css";
import "./Regform.css";

function UserIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

function MailIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 1 1 8 0v3" /></svg>;
}

function EyeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
}

function Regform() {
  const navigate = useNavigate();
  const [name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inlineMessage, setInlineMessage] = useState("");

  function registerUser(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setInlineMessage("Password and confirm password must match");
      return;
    }

    if (!acceptTerms) {
      setInlineMessage("Please accept the terms and conditions");
      return;
    }

    axios
      .post(apiUrl("/register"), {
        name,
        email,
        password,
        mobileno,
      })
      .then(() => {
        showToast("Registered successfully. Please login to continue.");
        navigate("/login");
      })
      .catch(() => {
        setInlineMessage("Error registering user");
        showToast("Error registering user");
      });
  }

  return (
    <div className="register-shared-page">
      <StoreHeader active="product" topbarText="Welcome in the world of Footwears" />

      <main className="register-shared-main">
        <div className="register-shared-bg">
          <img src="/assets/storefront/photo-1542291026-7eec264c27ff.jpg" alt="Shoes background" />
        </div>

        <div className="register-shared-card">
          <div className="register-shared-card-head">
            <h1>Create <span>Account</span></h1>
            <p>Join us and start shopping</p>
          </div>

          <form className="register-shared-form" onSubmit={registerUser}>
            <div className="register-shared-field">
              <label htmlFor="regName">Full Name</label>
              <div className="register-shared-input-wrap">
                <span className="register-shared-input-icon"><UserIcon /></span>
                <input id="regName" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setFullname(e.target.value)} required />
              </div>
            </div>

            <div className="register-shared-field">
              <label htmlFor="regEmail">Email Address</label>
              <div className="register-shared-input-wrap">
                <span className="register-shared-input-icon"><MailIcon /></span>
                <input id="regEmail" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="register-shared-field">
              <label htmlFor="regPassword">Password</label>
              <div className="register-shared-input-wrap">
                <span className="register-shared-input-icon"><LockIcon /></span>
                <input id="regPassword" type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" className="register-shared-input-trailing" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}><EyeIcon /></button>
              </div>
            </div>

            <div className="register-shared-field">
              <label htmlFor="regConfirmPassword">Confirm Password</label>
              <div className="register-shared-input-wrap">
                <span className="register-shared-input-icon"><LockIcon /></span>
                <input id="regConfirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="button" className="register-shared-input-trailing" onClick={() => setShowConfirmPassword((current) => !current)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}><EyeIcon /></button>
              </div>
            </div>

            <div className="register-shared-field">
              <label htmlFor="regMobile">Mobile Number</label>
              <div className="register-shared-input-wrap">
                <span className="register-shared-input-icon"><UserIcon /></span>
                <input id="regMobile" type="text" placeholder="Enter your mobile number" value={mobileno} onChange={(e) => setMobileno(e.target.value)} required />
              </div>
            </div>

            <label className="register-shared-checkbox">
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
              <span>I agree to the <button type="button" className="register-shared-link">Terms &amp; Conditions</button> and <button type="button" className="register-shared-link">Privacy Policy</button></span>
            </label>

            <button type="submit" className="register-shared-primary-btn">REGISTER</button>
            <p className="register-shared-inline-message">{inlineMessage}</p>

            <div className="register-shared-divider"><span>OR</span></div>

            <button type="button" className="register-shared-google-btn">
              <span className="register-shared-google-mark" />
              CONTINUE WITH GOOGLE
            </button>

            <div className="register-shared-footer-row">
              Already have an account?
              <button type="button" onClick={() => navigate("/login")}>Login</button>
            </div>
          </form>
        </div>
      </main>

      <ProjectFooter />
    </div>
  );
}

export default Regform;

