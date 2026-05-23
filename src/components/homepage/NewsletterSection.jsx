import React from "react";

function NewsletterSection() {
  return (
    <section className="hp-newsletter" id="contact">
      <div className="hp-newsletter__copy">
        <h2>
          SUBSCRIBE TO OUR NEWS
          <br />
          ARTICALS
        </h2>
        <div className="hp-newsletter__form">
          <input type="email" placeholder="Your email" />
          <button type="button">SUBSCRIBE</button>
        </div>
      </div>
      <div className="hp-newsletter__image">
        <img src="/assets/storefront/photo-1542291026-7eec264c27ff.jpg" alt="shoe newsletter" />
      </div>
    </section>
  );
}

export default NewsletterSection;

