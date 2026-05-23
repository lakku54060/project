import React, { useMemo, useState } from "react";

function ProductSection({ products, onProductClick }) {
  const [activeTab, setActiveTab] = useState("Featured");
  const tabs = ["Featured", "New Arrivals", "Best Seller"];

  const visibleProducts = useMemo(
    () => products.filter((product) => product.tag === activeTab).slice(0, 4),
    [products, activeTab]
  );

  return (
    <section className="hp-products" id="products">
      <p className="hp-section-kicker">The Latest Trends In Athletic Footwear</p>
      <h2>Sneakers & Kicks</h2>

      <div className="hp-products__tabs">
        {tabs.map((tab) => (
          <button key={tab} type="button" className={activeTab === tab ? "is-active" : ""} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="hp-products__grid">
        {visibleProducts.map((product) => (
          <article key={product.id} className="hp-product-card" onClick={() => onProductClick(product)}>
            <div className="hp-product-card__image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="hp-product-card__body">
              <span>{product.category}</span>
              <h3>{product.title}</h3>
              <div className="hp-product-card__rating">{"?".repeat(product.rating)}<em>{"?".repeat(5 - product.rating)}</em></div>
              <strong>Rs. {Number(product.price).toFixed(2)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;

