import React, { useEffect, useMemo, useState } from "react";
import { showToast } from "./utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import "./homepage.css";
import StoreHeader from "./components/StoreHeader";
import { addToCart } from "./utils/cart";
import ProjectFooter from "./components/ProjectFooter";

const heroSlides = [
  {
    kicker: "Elevate Your Look",
    titleLines: ["Find The Perfect Pair", "Of Shoes To Complete."],
    text:
      "Explore our wide range of styles, colors, and materials to find the perfect shoes for any occasion.",
    image:
      "/assets/storefront/photo-1542291026-7eec264c27ff.jpg",
  },
  {
    kicker: "Street Ready",
    titleLines: ["Performance Sneakers", "Built For The City."],
    text:
      "Versatile shoes designed for movement, grip, and a sharper everyday look.",
    image:
      "/assets/storefront/photo-1600185365926-3a2ce3cdb9eb.jpg",
  },
  {
    kicker: "New Season",
    titleLines: ["Fresh Drops Built", "For All-Day Wear."],
    text:
      "Upgrade your rotation with statement footwear for work, weekends, and city walks.",
    image:
      "/assets/storefront/photo-1607522370275-f14206abe5d3.jpg",
  },
];

const collectionCards = [
  {
    label: "New Arrivals",
    title: "Women's Collection",
    image:
      "/assets/storefront/photo-1560769629-975ec94e6a86.jpg",
  },
  {
    label: "Trending Now",
    title: "Men's Collection",
    image:
      "/assets/storefront/photo-1543508282-6319a3e2621f.jpg",
  },
  {
    label: "Just In",
    title: "Kids' Collection",
    image:
      "/assets/storefront/photo-1514989940723-e8e51635b782.jpg",
  },
];

const bootsCards = [
  {
    title: "Athletic Footwear",
    count: "8",
    tone: "red",
    image:
      "/assets/storefront/photo-1491553895911-0055eca6402d.jpg",
  },
  {
    title: "Luxury Leather Shoes",
    count: "8",
    tone: "dark",
    image:
      "/assets/storefront/photo-1525966222134-fcfa99b8ae77.jpg",
  },
  {
    title: "Sustainable Footwear",
    count: "8",
    tone: "teal",
    image:
      "/assets/storefront/photo-1515955656352-a1fa3ffcd111.jpg",
  },
  {
    title: "Sandals & Slides",
    count: "8",
    tone: "navy",
    image:
      "/assets/storefront/photo-1600185365483-26d7a4cc7519.jpg",
  },
];

const darkFeatureCardsTop = [
  {
    title: "Comfort Meets Fashion â€“ Discover shoes that look great",
    image:
      "/assets/storefront/photo-1542291026-7eec264c27ff.jpg",
  },
  {
    title: "Elevate Your Look â€“ Find the perfect pair of shoes",
    image:
      "/assets/storefront/photo-1460353581641-37baddab0fa2.jpg",
  },
  {
    title: "Step Into Style â€“ The latest trends in footwear",
    image:
      "/assets/storefront/photo-1494496195158-c3becb4f2475.jpg",
  },
];

const darkFeatureCardsBottom = [
  {
    title: "Shop By Brand â€“ Find your favorite brands and styles",
    image:
      "/assets/storefront/photo-1606107557195-0e29a4b5b4aa.jpg",
  },
  {
    title: "Sale And Clearance â€“ Shop our latest deals and discounts",
    image:
      "/assets/storefront/photo-1608231387042-66d1773070a5.jpg",
  },
];

const editorialLinks = [
  "Athletic & Running Shoes",
  "Boots & Booties",
  "Sandals & Slides",
  "Formal & Oxford Styles",
  "Sneakers & Casual",
];

const editorialMiniCards = [
  {
    title: "Runners â€“ 30% off",
    image:
      "/assets/storefront/photo-1491553895911-0055eca6402d.jpg",
  },
  {
    title: "Sneakers â€“ 25% off",
    image:
      "/assets/storefront/photo-1607522370275-f14206abe5d3.jpg",
  },
];

const blogPosts = [
  {
    featured: true,
    meta: "Oct 17, 2024 Â· 0 Comments",
    title: "The Future Of Footwear: A Look Ahead",
    excerpt:
      "Exploring upcoming trends in shoe design, materials, and technology shaping the industry in 2025 and beyond.",
    image:
      "/assets/storefront/photo-1460353581641-37baddab0fa2.jpg",
  },
  {
    meta: "Oct 17, 2024 Â· 0 Comments",
    title: "Top 10 Sneakers to Watch This Season",
    excerpt:
      "The must-have kicks that are turning heads on streets and courts worldwide.",
    image:
      "/assets/storefront/photo-1542291026-7eec264c27ff.jpg",
  },
  {
    meta: "Oct 17, 2024 Â· 0 Comments",
    title: "How to Style Your Favorite Sneakers",
    excerpt:
      "Expert tips on pairing your kicks with everyday outfits for maximum impact.",
    image:
      "/assets/storefront/photo-1515955656352-a1fa3ffcd111.jpg",
  },
  {
    meta: "Oct 17, 2024 Â· 0 Comments",
    title: "Choosing the Right Running Shoe",
    excerpt:
      "A guide to finding your perfect match based on gait, terrain, and distance goals.",
    image:
      "/assets/storefront/photo-1549298916-b41d501d3772.jpg",
  },
];

const fallbackProducts = [
  { id: "fallback-1", tag: "featured", name: "Classic Tennis Sneakers", brand: "SportStep", price: 2500, image: "/assets/storefront/photo-1542291026-7eec264c27ff.jpg", swatches: ["#111", "#c0392b", "#f0f0f0"], rating: 4 },
  { id: "fallback-2", tag: "featured", name: "Waterproof Hiking Boots", brand: "TrailGear", price: 2500, image: "/assets/storefront/photo-1549298916-b41d501d3772.jpg", swatches: ["#8B6914", "#2c2c2c"], rating: 5 },
  { id: "fallback-3", tag: "featured", name: "Classic Leather Sneakers", brand: "UrbanStep", price: 2100, image: "/assets/storefront/photo-1600269452121-4f2416e55c28.jpg", swatches: ["#1a1a2e", "#16213e", "#0f3460"], rating: 4 },
  { id: "fallback-4", tag: "featured", name: "High-Top Canvas Sneakers", brand: "TrendyFeet", price: 2500, image: "/assets/storefront/photo-1608231387042-66d1773070a5.jpg", swatches: ["#e74c3c", "#111", "#ffffff"], rating: 3 },
  { id: "fallback-5", tag: "new", name: "Pro Runner Boost", brand: "SpeedFit", price: 3200, image: "/assets/storefront/photo-1491553895911-0055eca6402d.jpg", swatches: ["#e74c3c", "#f39c12"], rating: 5 },
  { id: "fallback-6", tag: "new", name: "Urban Slip-On Loafers", brand: "CityWalk", price: 1800, image: "/assets/storefront/photo-1560769629-975ec94e6a86.jpg", swatches: ["#27ae60", "#2980b9"], rating: 4 },
  { id: "fallback-7", tag: "new", name: "Chunky Platform Sandals", brand: "ModeFlex", price: 2900, image: "/assets/storefront/photo-1603808033192-082d6919d3e1.jpg", swatches: ["#8e44ad", "#111"], rating: 5 },
  { id: "fallback-8", tag: "new", name: "Oxford Derby Formals", brand: "EliteSole", price: 3500, image: "/assets/storefront/photo-1606107557195-0e29a4b5b4aa.jpg", swatches: ["#5d4037", "#111"], rating: 4 },
  { id: "fallback-9", tag: "best", name: "Air Mesh Runners", brand: "BreezeStep", price: 1999, image: "/assets/storefront/photo-1551107696-a4b0c5a0d9a2.jpg", swatches: ["#e74c3c"], rating: 5 },
  { id: "fallback-10", tag: "best", name: "Street Sport Lace-Up", brand: "UrbanKick", price: 2200, image: "/assets/storefront/photo-1542291026-7eec264c27ff.jpg", swatches: ["#f39c12", "#111"], rating: 4 },
  { id: "fallback-11", tag: "best", name: "Flex Training Shoes", brand: "GymPace", price: 2750, image: "/assets/storefront/photo-1607522370275-f14206abe5d3.jpg", swatches: ["#3498db", "#e74c3c"], rating: 5 },
  { id: "fallback-12", tag: "best", name: "Limited Edition Collab", brand: "CollabKicks", price: 3100, image: "/assets/storefront/photo-1600269452121-4f2416e55c28.jpg", swatches: ["#c0392b", "#f1c40f"], rating: 5 },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="5 12 19 12" /><polyline points="12 5 19 12 12 19" /></svg>;
}

function Star({ filled = true }) {
  return <svg className={filled ? "" : "empty"} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}

function resolveProductImage(imagePath) {
  return createImageUrl(imagePath, fallbackProducts[0].image);
}

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("featured");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showBackTop, setShowBackTop] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(sliderTimer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowBackTop(window.scrollY > 400);
    }

    function handleEscape(event) {
      if (event.key === "Escape") setSearchOpen(false);
    }

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    axios
      .get(apiUrl("/products"))
      .then((response) => {
        if (!Array.isArray(response.data)) {
          setDbProducts([]);
          return;
        }
        const tabs = ["featured", "new", "best"];
        const mapped = response.data.map((item, index) => ({
          id: item._id,
          dbId: item._id,
          tag: tabs[index % 3],
          name: item.name || "Footwear Item",
          brand: item.category || item.gender || "Shooz",
          price: Number(item.price || 0),
          image: resolveProductImage(item.pimage),
          swatches: ["#111", "#c0392b", "#f0f0f0"],
          rating: 4 + (index % 2),
        }));
        setDbProducts(mapped);
      })
      .catch(() => setDbProducts([]));
  }, []);


  const displayProducts = useMemo(() => (dbProducts.length ? dbProducts : fallbackProducts), [dbProducts]);
  const filteredProducts = useMemo(
    () => displayProducts.filter((product) => product.tag === activeTab).slice(0, 4),
    [displayProducts, activeTab]
  );
  const featuredBlog = blogPosts.find((post) => post.featured) || blogPosts[0];
  const sideBlogs = blogPosts.filter((post) => !post.featured);

  function scrollToEl(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function openShopPage() {
    navigate("/collections/all");
  }

  function openProduct(product) {
    const productId = product.dbId || product.id;
    if (productId) navigate(`/products/${productId}`);
  }

  function handleSearchChange(value) {
    setSearchValue(value);
    if (value.length > 1) scrollToEl("products");
  }

  function handleAddToCart(product) {
    addToCart(
      {
        productId: product.dbId || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.brand,
        gender: "Unisex",
      },
      1,
      "Free Size"
    );

    showToast("Added to cart successfully");
  }

  function subscribeNewsletter() {
    const input = document.querySelector(".newsletter-form input");
    if (!input) return;
    if (input.value && input.value.includes("@")) {
      input.value = "";
      input.placeholder = "Thank you for subscribing! âœ“";
      window.setTimeout(() => {
        input.placeholder = "Your email";
      }, 3000);
    } else {
      input.style.border = "2px solid #c0392b";
      window.setTimeout(() => {
        input.style.border = "none";
      }, 1500);
    }
  }

  return (
    <div>
      <StoreHeader
        active="home"
        topbarText="Welcome in the world of Footwears"
        onSearch={() => setSearchOpen(true)}
      />


      <section className="hero" id="top">
        <div className="hero-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroSlides.map((slide) => (
            <div key={slide.text} className="hero-slide">
              <img src={slide.image} alt={slide.titleLines.join(" ")} />
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <p className="hero-kicker">{slide.kicker}</p>
                <h1 className="hero-title">{slide.titleLines[0]}<br />{slide.titleLines[1]}</h1>
                <p className="hero-text">{slide.text}</p>
                <button className="btn-primary" type="button" onClick={() => scrollToEl("products")}>Shop Now <ArrowIcon /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button key={index} type="button" className={`hero-dot ${index === currentSlide ? "active" : ""}`} onClick={() => setCurrentSlide(index)}></button>
          ))}
        </div>
      </section>

      <section className="collections" id="collections">
        {collectionCards.map((card) => (
          <article key={card.title} className="col-card">
            <img src={card.image} alt={card.title} />
            <div className="col-card-overlay">
              <p className="col-card-label">{card.label}</p>
              <h3 className="col-card-title">{card.title}</h3>
              <span className="col-card-btn" onClick={() => scrollToEl("products")}>Shop Now <ArrowIcon /></span>
            </div>
          </article>
        ))}
      </section>

      <section className="products-section" id="products">
        <div className="sec-header">
          <p className="sec-kicker">The Latest Trends In Athletic Footwear</p>
          <h2 className="sec-title">Sneakers & Kicks</h2>
        </div>
        <div className="tabs">
          <button type="button" className={`tab-btn ${activeTab === "featured" ? "active" : ""}`} onClick={() => setActiveTab("featured")}>Featured</button>
          <button type="button" className={`tab-btn ${activeTab === "new" ? "active" : ""}`} onClick={() => setActiveTab("new")}>New Arrivals</button>
          <button type="button" className={`tab-btn ${activeTab === "best" ? "active" : ""}`} onClick={() => setActiveTab("best")}>Best Seller</button>
        </div>

        <div className="tab-pane active">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card" onClick={() => openProduct(product)}>
                <div className="product-card-img">
                  <img src={product.image} alt={product.name} />
                  <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="add-cart" onClick={() => handleAddToCart(product)}>+ Add to Cart</button>
                  </div>
                </div>
                <div className="product-swatches">
                  {product.swatches.map((color, idx) => (
                    <span key={`${product.id}-${idx}`} className="swatch" style={{ background: color, border: color === "#ffffff" ? "1px solid #ddd" : "1px solid rgba(0,0,0,.15)" }}></span>
                  ))}
                </div>
                <div className="product-card-body">
                  <div className="product-price">Rs. {Number(product.price).toFixed(2)}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-stars">
                    {Array.from({ length: 5 }).map((_, index) => <Star key={index} filled={index < product.rating} />)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <img src="/assets/storefront/photo-1460353581641-37baddab0fa2.jpg" alt="Promo" />
        <div className="promo-banner-overlay"></div>
        <div className="promo-banner-content">
          <span>Comfort Meets Fashion</span>
          <h2>Discover shoes that look great<br />and feel even better</h2>
          <p>Our collection features comfortable and stylish footwear designed to keep your feet happy all day long.</p>
          <button className="btn-primary" type="button" onClick={() => openShopPage()}>Shop Now <ArrowIcon /></button>
        </div>
        <div className="promo-strip">
          <div className="promo-strip-track">
            {["Use code NEWSHOES15", "Buy one pair, get the second pair 50% off. Use code BOGO50", "Enjoy 20% off with SHOEFRESH20", "Get 15% off your first purchase", "Use code NEWSHOES15", "Buy one pair, get the second pair 50% off. Use code BOGO50", "Enjoy 20% off with SHOEFRESH20", "Get 15% off your first purchase"].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="boots-section">
        <div className="sec-header" style={{ padding: 0 }}>
          <p className="sec-kicker">Stylish And Comfortable For Every Season</p>
          <h2 className="sec-title">Boots & Booties</h2>
          <p className="sec-sub">Check out our collection of the top New Products that encourage conversion.</p>
        </div>
        <div className="boots-grid">
          {bootsCards.map((card) => (
            <div key={card.title} className="boots-card">
              <img src={card.image} alt={card.title} />
              <div className={`boots-card-label ${card.tone}`}>
                <span>{card.title}</span>
                <strong>{card.count}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dark-feature" id="pages">
        <div className="sec-header" style={{ padding: 0 }}>
          <p className="sec-kicker">Fashion Sneakers</p>
          <h2 className="sec-title">Timeless styles for everyday wear</h2>
        </div>
        <div className="dark-feature-grid">
          {darkFeatureCardsTop.map((card) => (
            <div key={card.title} className="dark-card">
              <img src={card.image} alt={card.title} />
              <div className="dark-card-label"><span>{card.title}</span></div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginTop: "2px" }}>
          {darkFeatureCardsBottom.map((card) => (
            <div key={card.title} className="dark-card">
              <img src={card.image} alt={card.title} />
              <div className="dark-card-label"><span>{card.title}</span></div>
            </div>
          ))}
        </div>
      </section>

      <ProjectFooter />

      <button type="button" className={`back-top ${showBackTop ? "show" : ""}`} id="backTop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
      </button>

      <div className={`search-overlay ${searchOpen ? "open" : ""}`} id="searchOverlay">
        <div className="search-box">
          <input type="text" placeholder="Search for shoes..." id="searchInput" value={searchValue} onChange={(e) => handleSearchChange(e.target.value)} autoFocus={searchOpen} />
          <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>&times;</button>
        </div>
      </div>
    </div>
  );
}

export default Home;







