import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectFooter() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>Information</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Returns Policy</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="#">My Account</a>
          <a href="#">My Cart</a>
          <a href="#">Size Chart</a>
        </div>
        <div className="footer-col footer-brand">
          <h3>SHOPIX</h3>
          <p>
            M: +91 7999384310<br />
            E: info@shopix.in<br />
            <br />
            50 Porana Place, West Casuarinas,<br />
            Indore, India.
          </p>
        </div>
        <div className="footer-col">
          <h4>Categories</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/collections/all"); }}>Athletic Footwear</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/collections/all"); }}>Boots for Every Occasion</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/collections/all"); }}>Luxury Leather Shoes</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/collections/all"); }}>Sneakerhead's Haven</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Contact Us</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Sign In</a>
          <a href="#">My Account</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2026 <span style={{ color: "var(--red)", fontWeight: 500 }}>Shooz.</span> All rights reserved</p>
        <div className="footer-payments">
          {["AMEX", "PAY", "DISC", "VISA", "JCB", "MC"].map((item) => (
            <span key={item} className="payment-badge">{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default ProjectFooter;

