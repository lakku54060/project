import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg glass-navbar fixed-top">

      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand logo-text" to="/">
          KAIRA
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarMenu"
        >

          {/* Center Menu */}
          <ul className="navbar-nav mx-auto gap-lg-4 text-uppercase">

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/products">
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/blog">
                Blog
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/pages">
                Pages
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">

            <button className="btn-glass">
            </button>

            <button className="btn-glass-dark">
              Cart (0)
            </button>

            {/* Search */}
            <button className="icon-btn">

              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0Z"
                />
              </svg>

            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

