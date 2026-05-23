import React from "react";

function HeroSection({ slide, activeIndex, totalSlides, onSelectSlide }) {
  return (
    <section className="hp-hero" id="top">
      <img className="hp-hero__image" src={slide.image} alt={slide.title} />
      <div className="hp-hero__overlay" />
      <div className="hp-hero__content">
        <span className="hp-hero__eyebrow">{slide.kicker}</span>
        <h1>
          Find The Perfect Pair
          <br />
          Of Shoes To Complete.
        </h1>
        <p>{slide.text}</p>
        <button type="button">Shop Now</button>
        <div className="hp-hero__dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => onSelectSlide(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

