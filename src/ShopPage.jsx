import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import "./shop.css";
import StoreHeader from "./components/StoreHeader";
import { addToCart } from "./utils/cart";
import { showToast } from "./utils/toast";

const categoryCardImages = {
  athletic: "/assets/storefront/photo-1491553895911-0055eca6402d.jpg",
  boots: "/assets/storefront/photo-1560769629-975ec94e6a86.jpg",
  luxury: "/assets/storefront/photo-1543163521-1bf539c55dd2.jpg",
  sandals: "/assets/storefront/photo-1603808033192-082d6919d3e1.jpg",
  sneaker: "/assets/storefront/photo-1515955656352-a1fa3ffcd111.jpg",
};

const categoryAliases = {
  footwear: "athletic",
  sneakers: "sneaker",
  formal: "luxury",
  casual: "sneaker",
  boots: "boots",
  sandals: "sandals",
  athletic: "athletic",
  luxury: "luxury",
};


function ChevronIcon() {
  return <svg className="chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>;
}

function GridIcon({ type = "three" }) {
  if (type === "list") {
    return <svg viewBox="0 0 24 24"><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></svg>;
  }

  if (type === "two") {
    return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="16" /><rect x="14" y="4" width="7" height="16" /></svg>;
  }

  return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="5" height="16" /><rect x="10" y="4" width="4" height="16" /><rect x="16" y="4" width="5" height="16" /></svg>;
}

function EyeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}

function Star({ filled = true }) {
  return <svg className={filled ? "" : "empty"} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}

function resolveProductImage(imagePath) {
  return createImageUrl(imagePath, "/assets/storefront/photo-1542291026-7eec264c27ff.jpg");
}

function normalizeProduct(item, index) {
  const category = String(item.category || "Footwear");
  const categoryKey = categoryAliases[category.toLowerCase()] || "athletic";
  const price = Number(item.price || 0);
  return {
    ...item,
    price,
    category,
    categoryKey,
    gender: item.gender || "Unisex",
    sizes: Array.isArray(item.sizes) && item.sizes.length ? item.sizes : ["Free Size"],
    pimage: resolveProductImage(item.pimage),
    rating: 3 + (index % 3),
    sale: index % 5 === 0,
    soldOut: price <= 0,
    brand: item.brand || item.gender || "Shooz",
    originalPrice: index % 4 === 0 ? price + 1200 : 0,
  };
}

function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("az");
  const [viewMode, setViewMode] = useState("three");
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [openGroups, setOpenGroups] = useState({ collection: true, gender: true, size: true, price: true });
  const [maxPrice, setMaxPrice] = useState(5000);


  useEffect(() => {
    axios
      .get(apiUrl("/products"))
      .then((response) => {
        const list = Array.isArray(response.data)
          ? response.data.map((item, index) => normalizeProduct(item, index))
          : [];
        setProducts(list);
        const highest = list.length ? Math.max(...list.map((item) => item.price)) : 5000;
        setMaxPrice(highest || 5000);
      })
      .catch(() => setProducts([]));
  }, []);

  const collectionsMap = useMemo(() => {
    return products.reduce((acc, item) => {
      acc[item.categoryKey] = acc[item.categoryKey] || { key: item.categoryKey, label: item.category, count: 0 };
      acc[item.categoryKey].count += 1;
      return acc;
    }, {});
  }, [products]);

  const genderMap = useMemo(() => {
    return products.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const sizeMap = useMemo(() => {
    return products.reduce((acc, item) => {
      item.sizes.forEach((size) => {
        acc[size] = (acc[size] || 0) + 1;
      });
      return acc;
    }, {});
  }, [products]);

  const maxAvailablePrice = useMemo(() => {
    return products.length ? Math.max(...products.map((item) => item.price)) : 5000;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const next = products.filter((item) => {
      const categoryMatch = activeCategoryTab === "all" || item.categoryKey === activeCategoryTab;
      const collectionMatch = !selectedCollections.length || selectedCollections.includes(item.categoryKey);
      const genderMatch = !selectedGenders.length || selectedGenders.includes(item.gender);
      const sizeMatch = !selectedSizes.length || item.sizes.some((size) => selectedSizes.includes(size));
      const priceMatch = item.price <= maxPrice;
      return categoryMatch && collectionMatch && genderMatch && sizeMatch && priceMatch;
    });

    if (sortBy === "price-low") {
      next.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      next.sort((a, b) => b.price - a.price);
    } else if (sortBy === "za") {
      next.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      next.sort((a, b) => a.name.localeCompare(b.name));
    }

    return next;
  }, [products, activeCategoryTab, selectedCollections, selectedGenders, selectedSizes, maxPrice, sortBy]);

  function toggleSelection(value, current, setter) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function handleAddToCart(event, product) {
    event.stopPropagation();
    addToCart(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.pimage,
        category: product.category,
        gender: product.gender,
      },
      1,
      product.sizes[0] || "Free Size"
    );
    showToast("Added to cart successfully");
  }

  const collectionCards = useMemo(() => {
    return Object.values(collectionsMap).slice(0, 5).map((item) => ({
      ...item,
      image: categoryCardImages[item.key] || categoryCardImages.athletic,
    }));
  }, [collectionsMap]);

  return (
    <div className="listing-page">
      <StoreHeader active="shop" topbarText="One Day Delivery Available" />

      <section className="page-hero">
        <img src="/assets/storefront/photo-1542291026-7eec264c27ff.jpg" alt="Products" />
        <div className="page-hero-title">Products</div>
      </section>

      <div className="category-tabs">
        <button type="button" className={`cat-tab ${activeCategoryTab === "all" ? "active" : ""}`} onClick={() => setActiveCategoryTab("all")}>All <span className="cat-count">({products.length})</span></button>
        {Object.values(collectionsMap).map((item) => (
          <button key={item.key} type="button" className={`cat-tab ${activeCategoryTab === item.key ? "active" : ""}`} onClick={() => setActiveCategoryTab(item.key)}>
            {item.label} <span className="cat-count">({item.count})</span>
          </button>
        ))}
      </div>

      <div className="cat-cards">
        {collectionCards.map((card) => (
          <div key={card.key} className="cat-card" onClick={() => setActiveCategoryTab(card.key)}>
            <img src={card.image} alt={card.label} />
            <div className="cat-card-label"><span>{card.label}</span></div>
          </div>
        ))}
      </div>

      <div className="shop-layout">
        <aside className="filter-sidebar">
          <div className="filter-heading">Filter:</div>

          <div className="filter-group">
            <button type="button" className={`filter-group-title ${openGroups.collection ? "open" : ""}`} onClick={() => setOpenGroups((prev) => ({ ...prev, collection: !prev.collection }))}>
              <span>Collection</span><ChevronIcon />
            </button>
            <div className={`filter-group-body ${openGroups.collection ? "open" : ""}`}>
              {Object.values(collectionsMap).map((item) => (
                <label key={item.key} className="filter-check">
                  <input type="checkbox" checked={selectedCollections.includes(item.key)} onChange={() => toggleSelection(item.key, selectedCollections, setSelectedCollections)} />
                  <span>{item.label}</span><em className="count">({item.count})</em>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <button type="button" className={`filter-group-title ${openGroups.gender ? "open" : ""}`} onClick={() => setOpenGroups((prev) => ({ ...prev, gender: !prev.gender }))}>
              <span>Gender</span><ChevronIcon />
            </button>
            <div className={`filter-group-body ${openGroups.gender ? "open" : ""}`}>
              {Object.entries(genderMap).map(([gender, count]) => (
                <label key={gender} className="filter-check">
                  <input type="checkbox" checked={selectedGenders.includes(gender)} onChange={() => toggleSelection(gender, selectedGenders, setSelectedGenders)} />
                  <span>{gender}</span><em className="count">({count})</em>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <button type="button" className={`filter-group-title ${openGroups.price ? "open" : ""}`} onClick={() => setOpenGroups((prev) => ({ ...prev, price: !prev.price }))}>
              <span>Price</span><ChevronIcon />
            </button>
            <div className={`filter-group-body ${openGroups.price ? "open" : ""}`}>
              <div className="price-range">
                <div className="price-track"><div className="price-fill" style={{ right: `${100 - (maxPrice / (maxAvailablePrice || 1)) * 100}%` }} /></div>
                <input className="range-slider" type="range" min="0" max={maxAvailablePrice || 5000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className="price-inputs">
                  <div className="price-input-box"><span>Rs</span><input readOnly value="0" /></div>
                  <div className="price-input-box"><span>Rs</span><input readOnly value={maxPrice} /></div>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <button type="button" className={`filter-group-title ${openGroups.size ? "open" : ""}`} onClick={() => setOpenGroups((prev) => ({ ...prev, size: !prev.size }))}>
              <span>Size</span><ChevronIcon />
            </button>
            <div className={`filter-group-body ${openGroups.size ? "open" : ""}`}>
              {Object.entries(sizeMap).map(([size, count]) => (
                <label key={size} className="filter-check">
                  <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSelection(size, selectedSizes, setSelectedSizes)} />
                  <span>{size}</span><em className="count">({count})</em>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="products-area">
          <div className="products-toolbar">
            <div className="toolbar-left">
              <button type="button" className={`view-btn ${viewMode === "two" ? "active" : ""}`} onClick={() => setViewMode("two")}><GridIcon type="two" /></button>
              <button type="button" className={`view-btn ${viewMode === "three" ? "active" : ""}`} onClick={() => setViewMode("three")}><GridIcon type="three" /></button>
              <button type="button" className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}><GridIcon type="list" /></button>
            </div>
            <div className="toolbar-right">
              <div className="sort-wrap">
                <label>Sort By:</label>
                <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="az">Alphabetically, A-Z</option>
                  <option value="za">Alphabetically, Z-A</option>
                  <option value="price-low">Price, Low to High</option>
                  <option value="price-high">Price, High to Low</option>
                </select>
              </div>
              <div className="product-count" id="productCount">{filteredProducts.length} Products</div>
            </div>
          </div>

          <div className={`product-grid ${viewMode === "two" ? "two-col" : viewMode === "list" ? "list-view" : ""}`}>
            {filteredProducts.map((product) => (
              <article key={product._id} className={`pcard ${product.soldOut ? "sold-out" : ""}`} onClick={() => navigate(`/products/${product._id}`)}>
                <div className="pcard-img">
                  <img src={product.pimage} alt={product.name} />
                  {product.sale ? <span className="pcard-badge badge-sale">-21%</span> : null}
                  {product.soldOut ? <span className="pcard-badge badge-soldout">SOLD OUT</span> : null}
                  <div className="pcard-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button"><EyeIcon /></button>
                    <button type="button" className="btn-cart" onClick={(e) => handleAddToCart(e, product)}>{product.soldOut ? "Sold Out" : "+ Add to Cart"}</button>
                    
                  </div>
                </div>
                <div className="pcard-body">
                  <div className="pcard-price">
                    <span className="current">Rs.{product.price.toFixed(2)}</span>
                    {product.originalPrice ? <span className="original">Rs.{product.originalPrice.toFixed(2)}</span> : null}
                  </div>
                  <div className="pcard-name">{product.name}</div>
                  <div className="pcard-brand">{product.brand}</div>
                  <div className="pcard-stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} filled={index < product.rating} />)}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination">
            <button type="button" className="page-btn active">1</button>
            <button type="button" className="page-btn">2</button>
            <button type="button" className="page-btn">3</button>
            <button type="button" className="page-btn">?</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShopPage;


