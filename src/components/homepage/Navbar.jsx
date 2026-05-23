import React, { useEffect, useRef, useState } from "react";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.2 16.2 21 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19c1.7-3.3 4.3-5 6.5-5s4.8 1.7 6.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}


function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4v12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m3.5 7.5 3.5-3.5 3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 20V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13.5 16.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h15l-1.3 8.5H7.2L5 6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 6 4 3H2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function Navbar({ onHome, onLogin, onAdmin, onProductsSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (megaRef.current && !megaRef.current.contains(event.target)) {
        setMegaOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function jumpTo(selector) {
    setMenuOpen(false);
    setMegaOpen(false);
    if (selector) {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header className="hp-navbar">
      <div className="hp-navbar__brand" onClick={onHome}>SHOOZ</div>

      <button type="button" className="hp-navbar__toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>

      <nav className={`hp-navbar__links ${menuOpen ? "is-open" : ""}`}>
        <button type="button" className="hp-navbar__navbtn" onClick={() => jumpTo("#top")}>Home</button>
        <button type="button" className="hp-navbar__navbtn" onClick={() => jumpTo("#collections")}>Shop</button>
        <div
          className="hp-navbar__mega-wrap"
          ref={megaRef}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button type="button" className="hp-navbar__mega-trigger" onClick={() => setMegaOpen((prev) => !prev)}>
            Products
          </button>
          {megaOpen ? (
            <div className="hp-mega-menu">
              <div>
                <h4>Product Layouts</h4>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Thumbnails - bottom</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>With video</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Grid showcase</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Quick view</button>
              </div>
              <div>
                <h4>Product Type</h4>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Simple Product</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Variable Product</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Count Down</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Cross Selling</button>
              </div>
              <div>
                <h4>List Featured</h4>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Sticky ATC</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Swatch Variant</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Size Guide</button>
                <button type="button" className="hp-mega-link" onClick={onProductsSection}>Description Tabs</button>
              </div>
              <div className="hp-mega-menu__card" onClick={onProductsSection}>
                <img src="/assets/storefront/photo-1549298916-b41d501d3772.jpg" alt="Waterproof Hiking Boots" />
                <span>$25.00</span>
                <strong>Waterproof Hiking Boots</strong>
                <small>TrailGear</small>
              </div>
            </div>
          ) : null}
        </div>
        <button type="button" className="hp-navbar__navbtn" onClick={() => jumpTo("#blog")}>Blog</button>
        <button type="button" className="hp-navbar__navbtn" onClick={() => jumpTo("#pages")}>Pages</button>
        <button type="button" className="hp-navbar__navbtn" onClick={() => jumpTo("#contact")}>Contact</button>
      </nav>

      <div className="hp-navbar__actions">
        <button type="button" aria-label="Search"><SearchIcon /></button>
        <button type="button" aria-label="Profile" onClick={onLogin}><UserIcon /></button>
        <button type="button" aria-label="Compare"><CompareIcon /></button>
        <button type="button" className="hp-navbar__cart" aria-label="Admin" onClick={onAdmin}><CartIcon /><span>Admin</span></button>
      </div>
    </header>
  );
}

export default Navbar;



