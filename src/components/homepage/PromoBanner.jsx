import React from "react";

function PromoBanner() {
  return (
    <section className="hp-promo-banner">
      <img
        src="/assets/storefront/photo-1460353581641-37baddab0fa2.jpg"
        alt="Discover shoes that look great and feel even better"
      />
      <div className="hp-promo-banner__overlay" />
      <div className="hp-promo-banner__content">
        <span>Comfort Meets Fashion</span>
        <h2>
          Discover shoes that look great
          <br />
          and feel even better
        </h2>
        <p>Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.</p>
        <button type="button">Shop Now</button>
      </div>
      <div className="hp-promo-banner__strip">
        <span>Use code NEWSHOES15</span>
        <span>Buy one pair, get the second pair 50% off</span>
        <span>Enjoy 20% off with SHOEFRESH20</span>
        <span>Get 15% off your first purchase</span>
      </div>
    </section>
  );
}

export default PromoBanner;

