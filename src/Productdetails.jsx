import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import "./productdetails.css";
import StoreHeader from "./components/StoreHeader";
import { addToCart } from "./utils/cart";
import { showToast } from "./utils/toast";
import { isCustomerLoggedIn, savePostLoginRedirect } from "./utils/auth";

const galleryFallbacks = [
  "/assets/storefront/photo-1603808033192-082d6919d3e1.jpg",
  "/assets/storefront/photo-1560769629-975ec94e6a86.jpg",
  "/assets/storefront/photo-1542291026-7eec264c27ff.jpg",
  "/assets/storefront/photo-1549298916-b41d501d3772.jpg",
];

function Star({ filled = true }) {
  return <svg className={filled ? "" : "empty"} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}

function resolveProductImage(imagePath) {
  return createImageUrl(imagePath, galleryFallbacks[0]);
}

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product?.price || 0),
    pimage: resolveProductImage(product?.pimage),
    category: product?.category || "Footwear",
    gender: product?.gender || "Unisex",
    sizes: Array.isArray(product?.sizes) && product.sizes.length ? product.sizes : ["Free Size"],
    brand: product?.brand || product?.gender || "Shooz",
  };
}

function Productdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Free Size");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeDescTab, setActiveDescTab] = useState("desc");
  const [openAccordion, setOpenAccordion] = useState("shipping");
  const [viewerCount, setViewerCount] = useState(26);


  useEffect(() => {
    if (!id) return;
    axios.get(apiUrl(`/products/${id}`)).then((res) => {
      const next = normalizeProduct(res.data);
      setProduct(next);
      setSelectedSize(next.sizes[0] || "Free Size");
      setActiveImageIndex(0);
    }).catch((err) => console.error(err));

    axios.get(apiUrl("/products")).then((res) => {
      const list = Array.isArray(res.data) ? res.data.map(normalizeProduct) : [];
      setRelatedProducts(list.filter((item) => item._id !== id).slice(0, 4));
    }).catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setViewerCount((prev) => Math.max(18, Math.min(40, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const galleryImages = useMemo(() => {
    if (!product) return galleryFallbacks.slice(0, 1);

    const rawImages = [
      product.pimage,
      ...(Array.isArray(product.images) ? product.images : []),
      ...(Array.isArray(product.gallery) ? product.gallery : []),
      product.image2,
      product.image3,
      product.image4,
    ].filter(Boolean);

    const normalizedImages = rawImages
      .map((image) => resolveProductImage(image))
      .filter(Boolean);

    const uniqueImages = [...new Set(normalizedImages)];
    return uniqueImages.length ? uniqueImages : galleryFallbacks.slice(0, 1);
  }, [product]);

  function handleAddToCart() {
    if (!product) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.pimage,
      category: product.category,
      gender: product.gender,
    }, quantity, selectedSize);
    showToast("Added to cart successfully");
  }

  function handleBuyNow() {
    if (!product) return;

    if (!isCustomerLoggedIn()) {
      savePostLoginRedirect(`/order/${id}`);
      showToast("Please login or register first to place an order");
      navigate("/login");
      return;
    }

    navigate(`/order/${id}`);
  }

  if (!product) {
    return <h3 className="loading-state">Loading product...</h3>;
  }

  const soldOut = product.price <= 0;
  const freeShippingRemaining = Math.max(0, 975 - product.price * quantity);

  return (
    <div className="detail-reference-page">
      <StoreHeader active="product" topbarText="Welcome in the world of Footwears" />

      <div className="breadcrumb">
        <button type="button" onClick={() => navigate("/")}>Home</button>
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        <button type="button" onClick={() => navigate("/collections/all")}>Products</button>
        <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        <span>{product.name}</span>
      </div>

      <section className="product-page-layout">
        <div className="gallery">
          <div className="thumbs">
            {galleryImages.map((image, index) => (
              <button key={`${image}-${index}`} type="button" className={`thumb ${index === activeImageIndex ? "active" : ""}`} onClick={() => setActiveImageIndex(index)}>
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className="main-img">
            <button type="button" className="img-nav img-prev" onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}>
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <img src={galleryImages[activeImageIndex]} alt={product.name} id="mainImg" />
            <button type="button" className="img-nav img-next" onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}>
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>

        <div className={`product-info ${soldOut ? "is-soldout" : ""}`}>
          {soldOut ? <span className="sold-out-tag soldout-badge">SOLD OUT</span> : null}
          <h1 className="product-title">{product.name}</h1>
          <div className="price-row">
            <span className="price-current">Rs.{product.price.toFixed(2)}</span>
          </div>
          {!soldOut ? <div className="stock-tag">In Stock</div> : null}

          <div className="atc-row">
            <div className="qty-ctrl">
              <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button type="button" className="btn-atc" onClick={handleAddToCart}>ADD TO CART</button>
            <button type="button" className="btn-bin" onClick={handleBuyNow}>BUY IT NOW</button>
          </div>

          <div className="size-row">
            <label htmlFor="sizeSelect">Size</label>
            <select id="sizeSelect" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              {product.sizes.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </div>
          <table className="meta-table">
            <tbody>
              <tr><td>Vendor:</td><td>{product.brand}</td></tr>
              <tr><td>Type:</td><td>{product.category}</td></tr>
              <tr><td>Available:</td><td style={{ color: soldOut ? "#888" : "#1a9e6e", fontWeight: 600 }}>{soldOut ? "Sold Out" : "Available"}</td></tr>
            </tbody>
          </table>

          <div className="accordion">
            <div className="accordion-item">
              <button type="button" className={`accordion-trigger ${openAccordion === "shipping" ? "open" : ""}`} onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}>
                <span>Shipping information</span><span className="plus">+</span>
              </button>
              <div className={`accordion-body ${openAccordion === "shipping" ? "open" : ""}`}>
                <p>Free standard shipping on orders over Rs. 2,000. Express delivery available within 24 hours for select cities. Orders are processed within 1-2 business days.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button type="button" className={`accordion-trigger ${openAccordion === "care" ? "open" : ""}`} onClick={() => setOpenAccordion(openAccordion === "care" ? "" : "care")}>
                <span>Care Guide</span><span className="plus">+</span>
              </button>
              <div className={`accordion-body ${openAccordion === "care" ? "open" : ""}`}>
                <p>Clean with a soft damp cloth. Avoid prolonged exposure to direct sunlight. Store in a cool, dry place and use a protective spray when needed.</p>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-item">Premium upper material with durable sole</div>
            <div className="trust-item">Secure payment</div>
            <div className="trust-item">2 Year Warranty</div>
          </div>

          <div className="live-stats">
            <div className="stat-row"><span><strong>{viewerCount}</strong> customers are viewing this product</span></div>
            <div className="stat-row"><span>Spend Rs.{freeShippingRemaining.toFixed(2)} for <strong>Free Shipping</strong></span></div>
          </div>

          <div className="share-row">
            <span>Share:</span>
            <button type="button" className="share-btn">f</button>
            <button type="button" className="share-btn">x</button>
            <button type="button" className="share-btn">i</button>
            <button type="button" className="share-btn">+</button>
          </div>
        </div>
      </section>

      <section className="desc-tabs-section">
        <div className="desc-tabs">
          <button type="button" className={`desc-tab ${activeDescTab === "desc" ? "active" : ""}`} onClick={() => setActiveDescTab("desc")}>Description</button>
          <button type="button" className={`desc-tab ${activeDescTab === "details" ? "active" : ""}`} onClick={() => setActiveDescTab("details")}>Details</button>
        </div>

        <div className={`desc-pane ${activeDescTab === "desc" ? "active" : ""}`}>
          <h4>About {product.name}</h4>
          <p>{product.description || `${product.name} is designed to balance comfort, statement styling, and everyday wearability.`}</p>
          <p style={{ marginTop: 14 }}>This reference-style layout keeps the same premium ecommerce rhythm as your sample: clear media, strong pricing, urgency, trust cues, and a detailed product story.</p>
        </div>

        <div className={`desc-pane ${activeDescTab === "details" ? "active" : ""}`}>
          <h4>Product Specifications</h4>
          <table className="detail-spec-table">
            <tbody>
              <tr><td>Material</td><td>Premium upper with durable sole</td></tr>
              <tr><td>Category</td><td>{product.category}</td></tr>
              <tr><td>Gender</td><td>{product.gender}</td></tr>
              <tr><td>Available Sizes</td><td>{product.sizes.join(", ")}</td></tr>
              <tr><td>Country of Origin</td><td>India</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="related-section">
        <div className="related-header-block">
          <p>You May Also Like</p>
          <h2>Related Products</h2>
        </div>
        <div className="related-grid">
          {relatedProducts.map((item) => (
            <article key={item._id} className="rpcard" onClick={() => navigate(`/products/${item._id}`)}>
              <div className="rpcard-img"><img src={item.pimage} alt={item.name} /><div className="rpcard-hover">+ Add to Cart</div></div>
              <div className="rpcard-body"><div className="rpcard-price">Rs.{item.price.toFixed(2)}</div><div className="rpcard-name">{item.name}</div><div className="rpcard-brand">{item.brand}</div></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Productdetails;



