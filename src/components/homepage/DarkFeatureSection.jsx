import React from "react";

function DarkFeatureSection({ cards }) {
  return (
    <section className="hp-dark-feature" id="pages">
      <p className="hp-dark-feature__kicker">Fashion Sneakers</p>
      <h2>Timeless styles for everyday wear</h2>
      <div className="hp-dark-feature__grid">
        {cards.map((card) => (
          <article key={card.title} className="hp-dark-feature__card">
            <img src={card.image} alt={card.title} />
            <div className="hp-dark-feature__card-overlay">
              <span>{card.title}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DarkFeatureSection;

