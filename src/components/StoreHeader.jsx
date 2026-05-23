import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./store-header.css";
import { getCartCount } from "../utils/cart";

const defaultRibbonMessages = [
  "Enjoy 20% off your entire order with code SHOEFRESH20",
  "Get 15% off your first purchase when you sign up",
  "Buy one pair, get the second pair 50% off",
  "Free shipping on orders over Rs. 2000",
];

function SearchIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>;
}

function UserIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

function CartIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
}

function ChevronIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>;
}

function formatCustomerName(rawValue) {
  const safeValue = String(rawValue || "").trim();
  if (!safeValue) return "My Account";
  const base = safeValue.includes("@") ? safeValue.split("@")[0] : safeValue;
  return base
    .replace(/[._-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "My Account";
}

function StoreHeader({ active = "home", topbarText = "Welcome in the world of Footwears", onSearch, showAdminLink = true }) {
  const navigate = useNavigate();
  const accountMenuRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [customerSession, setCustomerSession] = useState({
    loggedIn: false,
    name: "My Account",
  });

  useEffect(() => {
    function syncCartCount() {
      setCartCount(getCartCount());
    }

    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    function syncCustomerSession() {
      const token = localStorage.getItem("usertoken");
      const explicitName =
        localStorage.getItem("name") ||
        localStorage.getItem("username") ||
        localStorage.getItem("customerName") ||
        localStorage.getItem("userName") ||
        localStorage.getItem("email");

      setCustomerSession({
        loggedIn: Boolean(token),
        name: formatCustomerName(explicitName),
      });
    }

    syncCartCount();
    syncCustomerSession();
    handleScroll();

    window.addEventListener("cart-updated", syncCartCount);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", syncCustomerSession);
    window.addEventListener("customer-session-updated", syncCustomerSession);

    return () => {
      window.removeEventListener("cart-updated", syncCartCount);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", syncCustomerSession);
      window.removeEventListener("customer-session-updated", syncCustomerSession);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setAccountOpen(false);
      }
    }

    function handleOutsideClick(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const repeatedMessages = useMemo(() => [...defaultRibbonMessages, ...defaultRibbonMessages], []);

  function handleSearchOpen() {
    if (onSearch) {
      onSearch();
      return;
    }
    setSearchOpen(true);
  }

  function handleSearchSubmit() {
    const query = searchValue.trim();
    setSearchOpen(false);
    if (query) {
      navigate(`/collections/all?search=${encodeURIComponent(query)}`);
      return;
    }
    navigate("/collections/all");
  }

  function handleCustomerLogout() {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("uid");
    localStorage.removeItem("cid");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("customerName");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("customer-session-updated"));
    setAccountOpen(false);
    navigate("/login");
  }

  return (
    <div className="store-header-shell">
      <div className="store-ribbon">
        <div className="store-ribbon-track">
          {repeatedMessages.map((message, index) => (
            <span key={`${message}-${index}`}>{message}</span>
          ))}
        </div>
      </div>

      <div className="store-topbar">
        <div className="store-topbar-left">{topbarText}</div>
        <div className="store-topbar-right">
          <button type="button" onClick={() => navigate("/login")}>Login</button>
          <span className="store-sep">/</span>
          <button type="button" onClick={() => navigate("/reg")}>Register</button>
          {showAdminLink ? <button type="button" onClick={() => navigate("/adminlogin")}>Admin</button> : null}
          <div className="store-topbar-social">
            <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            <svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5.4 4.2 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </div>
        </div>
      </div>

      <header className={`store-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="store-navbar-brand" onClick={() => navigate("/")}>SHO<span>P</span>IX</div>

        <ul className="store-nav-links">
          <li><button type="button" className={active === "home" ? "active" : ""} onClick={() => navigate("/")}>Home</button></li>
          <li><button type="button" className={active === "contact" ? "active" : ""} onClick={() => navigate("/collections/all")}>Contact</button></li>
          <li><button type="button" className={active === "about us" ? "active" : ""} onClick={() => navigate("/collections/all")}>About Us</button></li>
          <li><button type="button" className="store-buy-now-btn" onClick={() => navigate("/collections/all")}>Buy Now <span className="store-sale-badge">Sale</span></button></li>
        </ul>

        <div className="store-navbar-actions">
          <button type="button" aria-label="Search" onClick={handleSearchOpen}><SearchIcon /></button>

          {customerSession.loggedIn ? (
            <div className="store-account-menu" ref={accountMenuRef}>
              <button
                type="button"
                className={`store-account-trigger ${accountOpen ? "open" : ""}`}
                onClick={() => setAccountOpen((current) => !current)}
              >
                <UserIcon />
                <span>{customerSession.name}</span>
                <ChevronIcon />
              </button>
              <div className={`store-account-dropdown ${accountOpen ? "open" : ""}`}>
                <button type="button" onClick={() => { setAccountOpen(false); navigate("/userpanel"); }}>User Panel</button>
                <button type="button" onClick={handleCustomerLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <button type="button" aria-label="Account" onClick={() => navigate("/login")}><UserIcon /></button>
          )}

          <button type="button" className="store-cart-pill" aria-label="Cart" onClick={() => navigate("/cart")}><CartIcon /><span>{`(${cartCount})`}</span></button>
        </div>
      </header>

      {!onSearch ? (
        <div className={`store-search-overlay ${searchOpen ? "open" : ""}`}>
          <div className="store-search-box">
            <input
              type="text"
              placeholder="Search for shoes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              autoFocus={searchOpen}
            />
            <button type="button" className="store-search-submit" onClick={handleSearchSubmit}>
              <SearchIcon />
            </button>
            <button type="button" className="store-search-close" onClick={() => setSearchOpen(false)}>&times;</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default StoreHeader;

