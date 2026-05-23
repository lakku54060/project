import React from "react";
import { useNavigate } from "react-router-dom";
import "./store-footer.css";

function StoreFooter() {
  const navigate = useNavigate();

  return (
    <footer className="store-footer">
      <div className="store-footer-grid">
        <div className="store-footer-col">
          <h4>Information</h4>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Returns Policy</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Terms &amp; Conditions</a>
        </div>

        <div className="store-footer-col">
          <h4>Quick Links</h4>
          <a href="#">My Account</a>
          <a href="#">My Cart</a>
          <a href="#">Size Chart</a>
        </div>

        <div className="store-footer-col store-footer-brand">
          <h3>SHOPIX</h3>
          <p>M: +91 7999384310<br />E: info@shopix.in<br /><br />50 Porana Place, West Casuarinas,<br />Indore, India.</p>
        </div>

        <div className="store-footer-col">
          <h4>Categories</h4>
          <a href="#">Athletic Footwear</a>
          <a href="#">Boots for Every Occasion</a>
          <a href="#">Luxury Leather Shoes</a>
          <a href="#">Sneakerhead's Haven</a>
        </div>

        <div className="store-footer-col">
          <h4>Support</h4>
          <a href="#">Contact Us</a>
          <button type="button" className="store-footer-link-button" onClick={() => navigate("/login")}>Sign In</button>
          <a href="#">My Account</a>
        </div>
      </div>

      <div className="store-footer-bottom">
        <p>Copyright ï¿½ 2026 <span>Shopix</span> All rights reserved</p>
        <div className="store-footer-payments">
          {['AMEX', 'PAY', 'DISC', 'VISA', 'JCB', 'MC'].map((item) => (
            <span key={item} className="store-payment-badge">{item}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default StoreFooter;

