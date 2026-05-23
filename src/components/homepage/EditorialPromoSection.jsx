import React from "react";

function EditorialPromoSection({ links, images }) {
  return (
    <section className="hp-editorial-promo">
      <div className="hp-editorial-promo__copy">
        <span className="hp-section-kicker">Last Season Sale</span>
        <h2>Save big on shoes from last season</h2>
        <p>Discover discounted standouts, clean silhouettes, and wearable pairs that still feel fresh for right now.</p>
        <ul>
          {links.map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
        <button type="button">Shop Now</button>
      </div>

      <div className="hp-editorial-promo__visuals">
        <article className="hp-editorial-promo__hero-card">
          <img src={images[0].image} alt={images[0].title} />
          <div className="hp-editorial-promo__caption">{images[0].title}</div>
        </article>
        <div className="hp-editorial-promo__stack">
          {images.slice(1).map((item) => (
            <article key={item.title} className="hp-editorial-promo__mini-card">
              <img src={item.image} alt={item.title} />
              <div className="hp-editorial-promo__caption">{item.title}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EditorialPromoSection;

