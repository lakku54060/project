import React from "react";

function BootsSection({ categories }) {
  return (
    <section className="hp-boots-section">
      <p className="hp-section-kicker">Stylish And Comfortable For Every Season</p>
      <h2>Boots & Booties</h2>
      <p className="hp-boots-section__subtitle">Check out our collection of the top New Products that encourage conversion.</p>
      <div className="hp-boots-section__grid">
        {categories.map((item) => (
          <article key={item.title} className="hp-boots-card">
            <img src={item.image} alt={item.title} />
            <div className={`hp-boots-card__label hp-boots-card__label--${item.accent}`}>
              <span>{item.title}</span>
              <strong>{item.count}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BootsSection;

