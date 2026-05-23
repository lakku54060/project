import React from "react";

function Footer({ columns }) {
  return (
    <footer className="hp-footer">
      <div className="hp-footer__grid">
        <div>
          <h4>IMPORTANT LINKS</h4>
          {columns.important.map((item) => (
            <a key={item} href="#top">{item}</a>
          ))}
        </div>

        <div>
          <h4>EXTRA LINKS</h4>
          {columns.extra.map((item) => (
            <a key={item} href="#top">{item}</a>
          ))}
        </div>

        <div className="hp-footer__brand">
          <h3>SHOOZ</h3>
          <p>T: + (08) 9055 0269</p>
          <p>E: example@example.com</p>
          <p>50 Porana Place, West Casuarinas, Western Australia, Australia.</p>
        </div>

        <div>
          <h4>CATEGORIES</h4>
          {columns.categories.map((item) => (
            <a key={item} href="#products">{item}</a>
          ))}
        </div>

        <div>
          <h4>SUPPORT</h4>
          {columns.support.map((item) => (
            <a key={item} href="#contact">{item}</a>
          ))}
        </div>
      </div>

      <div className="hp-footer__bottom">
        <p>Copyright © 2026 Shooz. All rights reserved</p>
        <div className="hp-footer__payments">
          <span>AMEX</span>
          <span>PAY</span>
          <span>DISC</span>
          <span>VISA</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

