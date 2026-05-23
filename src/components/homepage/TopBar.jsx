import React from "react";

const promoMessages = [
  "For our newsletter. Dismiss",
  "Enjoy 20% off your entire order with code SHOEFRESH20.",
  "Get 15% off your first purchase when you sign up.",
];

function TopBar({ onLogin, onRegister, onAdmin }) {
  return (
    <>
      <div className="hp-promo-ribbon">
        {promoMessages.map((message) => (
          <span key={message}>{message}</span>
        ))}
      </div>

      <div className="hp-topbar">
        <div className="hp-topbar-left">One Day Delivery Available</div>
        <div className="hp-topbar-right">
          <button type="button" className="hp-topbar-link" onClick={onLogin}>
            Login
          </button>
          <span>/</span>
          <button type="button" className="hp-topbar-link" onClick={onRegister}>
            Register
          </button>
          <button type="button" className="hp-topbar-link hp-topbar-admin" onClick={onAdmin}>
            Admin Login
          </button>
          <span>f</span>
          <span>t</span>
          <span>ig</span>
        </div>
      </div>
    </>
  );
}

export default TopBar;

