import React from "react";

function CollectionCards({ cards }) {
  return (
    <section className="hp-collections" id="collections">
      {cards.map((card) => (
        <article key={card.title} className={`hp-collection-card hp-collection-card--${card.tone}`}>
          <div className="hp-collection-card__copy">
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <a href="#products">Shop Now</a>
          </div>
          <div className="hp-collection-card__visual">
            <img src={card.image} alt={card.title} />
          </div>
        </article>
      ))}
    </section>
  );
}

export default CollectionCards;

