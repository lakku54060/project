import React from "react";
import { useNavigate } from "react-router-dom";
import "../auth-pages.css";

function SearchIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>;
}

function UserIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

function CartIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
}

function ChevronIcon() {
  return <svg className="nav-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>;
}

function HeartPromoIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
}

function ClockPromoIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

function TruckPromoIcon() {
  return <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8l5-5" /><path d="M8 21l2-2" /><path d="M12 21l4-4" /></svg>;
}

function AuthStoreShell({ children, backgroundImage, cartCount = 0 }) {
  const navigate = useNavigate();
  const promoItems = [
    { text: "Get 15% off your first purchase when you sign up", icon: <HeartPromoIcon /> },
    { text: "Buy one pair, get the second pair 50% off", icon: <ClockPromoIcon /> },
    { text: "Free shipping on orders over Rs. 5,000", icon: <TruckPromoIcon /> },
  ];

  return (
    <div className="auth-shell-page">
      <div className="ribbon">
        <div className="ribbon-track">
          {promoItems.concat(promoItems).map((item, index) => (
            <span key={`${item.text}-${index}`}>{item.icon}{item.text}</span>
          ))}
        </div>
      </div>

      <header className="navbar auth-navbar">
        <div className="brand" onClick={() => navigate("/")}>SHO<span>P</span>IX</div>
        <ul className="nav-links auth-nav-links">
          <li><button type="button" onClick={() => navigate("/")}>Home</button></li>
          <li><button type="button" onClick={() => navigate("/collections/all")}>Shop <ChevronIcon /></button></li>
          <li><button type="button" onClick={() => navigate("/collections/all")}>Product <ChevronIcon /></button></li>
          <li><button type="button" className="nav-buy" onClick={() => navigate("/cart")}>Buy Now</button></li>
        </ul>
        <div className="navbar-icons">
          <button className="icon-btn" type="button" aria-label="Search" onClick={() => navigate("/collections/all")}><SearchIcon /></button>
          <button className="icon-btn" type="button" aria-label="Account" onClick={() => navigate("/login")}><UserIcon /></button>
          <button className="icon-btn" type="button" aria-label="Cart" onClick={() => navigate("/cart")}>
            <CartIcon />
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      <main className="page-main">
        <div className="bg-img">
          <img src={backgroundImage} alt="Shoes background" />
        </div>
        {children}
      </main>

      <footer className="footer auth-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Information</h4>
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Returns Policy</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="#">My Account</a>
            <a href="#">My Cart</a>
            <a href="#">Size Chart</a>
          </div>
          <div className="footer-col footer-brand-col">
            <h3>SHOPIX</h3>
            <p>M: +91 7999384310<br />E: info@shopix.in<br /><br />50 Porana Place, West Casuarinas,<br />Indore, India.</p>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <a href="#">Athletic Footwear</a>
            <a href="#">Boots for Every Occasion</a>
            <a href="#">Luxury Leather Shoes</a>
            <a href="#">Sneakerhead's Haven</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact Us</a>
            <a href="#">Sign In</a>
            <a href="#">My Account</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Shooz. All rights reserved</p>
          <div className="payment-badges">
            <span className="pay-badge">AMEX</span>
            <span className="pay-badge">PAY</span>
            <span className="pay-badge">DISC</span>
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">JCB</span>
            <span className="pay-badge">MAST</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AuthStoreShell;

