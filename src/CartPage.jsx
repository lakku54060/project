import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreHeader from "./components/StoreHeader";
import ProjectFooter from "./components/ProjectFooter";
import "./homepage.css";
import "./cart.css";
import { clearCart, getCartTotal, loadCart, removeFromCart, updateCartQuantity } from "./utils/cart";
import { isCustomerLoggedIn, savePostLoginRedirect } from "./utils/auth";
import { showToast } from "./utils/toast";

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


function ShieldIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
}

function ReturnsIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>;
}

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    function syncCart() {
      setCartItems(loadCart());
    }

    syncCart();
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const totalAmount = useMemo(() => getCartTotal(), [cartItems]);
  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const shipping = cartItems.length ? 200 : 0;
  const grandTotal = totalAmount + shipping;

  function changeQuantity(item, delta) {
    const nextQuantity = item.quantity + delta;
    if (nextQuantity < 1) {
      removeFromCart(item.productId, item.size);
      setCartItems(loadCart());
      return;
    }

    updateCartQuantity(item.productId, item.size, nextQuantity);
    setCartItems(loadCart());
  }

  function handleRemove(item) {
    removeFromCart(item.productId, item.size);
    setCartItems(loadCart());
  }

  function handleClear() {
    clearCart();
    setCartItems([]);
  }

  function handleCheckout() {
    if (!cartItems.length) return;

    if (!isCustomerLoggedIn()) {
      savePostLoginRedirect("/checkout");
      showToast("Please login or register first to place an order");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  }

  return (
    <div className="cart-page">
      <StoreHeader active="cart" topbarText="Welcome to the world of Footwears" />

      <main className="cart-main">
        <div className="cart-breadcrumb">
          <button type="button" onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <strong>Cart</strong>
        </div>

        <div className="cart-title-row">
          <h1>Your Cart ({totalItems})</h1>
          <button type="button" onClick={() => navigate("/collections/all")}>Continue Shopping</button>
        </div>

        {cartItems.length === 0 ? (
          <section className="cart-empty-state">
            <h2>Your cart is empty</h2>
            <p>Start by adding your favourite shoes from the product listing page.</p>
            <button type="button" onClick={() => navigate("/collections/all")}>Shop Products</button>
          </section>
        ) : (
          <section className="cart-layout">
            <div className="cart-table-card">
              <div className="cart-table-head">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Remove</span>
              </div>

              <div className="cart-table-body">
                {cartItems.map((item) => (
                  <article className="cart-row" key={`${item.productId}-${item.size}`}>
                    <div className="cart-product-cell">
                      <div className="cart-product-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <p>
                          Size: <span>{item.size}</span>
                          <i />
                          Color: <span>{item.gender || "White"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="cart-price-cell">{formatMoney(item.price)}</div>

                    <div className="cart-quantity-cell">
                      <button type="button" onClick={() => changeQuantity(item, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item, 1)}>+</button>
                    </div>

                    <div className="cart-subtotal-cell">{formatMoney(item.price * item.quantity)}</div>

                    <button type="button" className="cart-remove-cell" onClick={() => handleRemove(item)} aria-label={`Remove ${item.name}`}>
                      &times;
                    </button>
                  </article>
                ))}
              </div>
              <div className="cart-table-actions cart-table-actions-simple">
                <button type="button" className="cart-clear-link" onClick={handleClear}>Clear Cart</button>
              </div>
            </div>

            <aside className="cart-summary-card">
              <h2>Order Summary</h2>

              <div className="cart-summary-lines">
                <div>
                  <span>Subtotal ({totalItems} items)</span>
                  <strong>{formatMoney(totalAmount)}</strong>
                </div>
                <div>
                  <span>Shipping</span>
                  <strong>{formatMoney(shipping)}</strong>
                </div>

              </div>

              <div className="cart-total-line">
                <span>Total</span>
                <strong>{formatMoney(grandTotal)}</strong>
              </div>

              <button type="button" className="cart-checkout-btn" onClick={handleCheckout}>Proceed To Checkout</button>
              <button type="button" className="cart-continue-btn" onClick={() => navigate("/collections/all")}>Continue Shopping</button>
            </aside>
          </section>
        )}

        <div className="cart-trust-row">
          <div>
            <ShieldIcon />
            <span><strong>Secure Checkout</strong>100% protected</span>
          </div>
          <div>
            <ReturnsIcon />
            <span><strong>Easy Returns</strong>7 days return policy</span>
          </div>
        </div>
      </main>

      <ProjectFooter />
    </div>
  );
}

export default CartPage;




