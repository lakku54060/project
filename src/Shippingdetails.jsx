import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import StoreHeader from "./components/StoreHeader";
import ProjectFooter from "./components/ProjectFooter";
import "./homepage.css";
import "./shipping.css";
import { showToast } from "./utils/toast";
import { clearCart, expandCartItems, getCartTotal, loadCart } from "./utils/cart";
import { isCustomerLoggedIn, savePostLoginRedirect } from "./utils/auth";

const stateOptions = [
  "Madhya Pradesh",
  "Maharashtra",
  "Delhi",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Punjab",
  "Haryana",
];

function resolveImage(imagePath) {
  return createImageUrl(imagePath, "/assets/storefront/photo-1542291026-7eec264c27ff.jpg");
}

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function normalizeDirectProduct(product) {
  return {
    productId: product?._id || product?.id,
    name: product?.name || "Footwear Item",
    price: Number(product?.price || 0),
    image: resolveImage(product?.image || product?.pimage),
    size: (Array.isArray(product?.sizes) && product.sizes[0]) || "Free Size",
    quantity: 1,
  };
}

function Shippingdetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userid = localStorage.getItem("uid") || localStorage.getItem("cid");
  const token = localStorage.getItem("usertoken");

  const [cartItems, setCartItems] = useState([]);
  const [directProduct, setDirectProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shipDifferent, setShipDifferent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setBilling((current) => ({ ...current, email: storedEmail }));
    }

    if (!isCustomerLoggedIn()) {
      savePostLoginRedirect(id ? `/order/${id}` : "/checkout");
      navigate("/login", { replace: true });
      return;
    }

    if (!id && !loadCart().length) {
      navigate("/cart", { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(apiUrl(`/products/${id}`))
      .then((res) => {
        setDirectProduct(normalizeDirectProduct(res.data));
      })
      .catch(() => {
        showToast("Unable to load selected product");
        navigate("/collections/all", { replace: true });
      });
  }, [id, navigate]);

  const checkoutItems = useMemo(() => {
    if (id) {
      return directProduct ? [directProduct] : [];
    }
    return cartItems;
  }, [id, directProduct, cartItems]);

  const subtotal = useMemo(() => {
    if (id) {
      return checkoutItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
    }
    return getCartTotal();
  }, [checkoutItems, id]);

  const shippingCharge = checkoutItems.length ? 200 : 0;
  const discount = checkoutItems.length ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + shippingCharge - discount;

  function updateBilling(field, value) {
    setBilling((current) => ({ ...current, [field]: value }));
  }

  function updateShipping(field, value) {
    setShipping((current) => ({ ...current, [field]: value }));
  }

  function getActiveShippingDetails() {
    return shipDifferent
      ? shipping
      : {
          name: billing.name,
          phone: billing.phone,
          address1: billing.address1,
          address2: billing.address2,
          city: billing.city,
          state: billing.state,
          postalCode: billing.postalCode,
        };
  }

  async function placeorder(event) {
    event.preventDefault();

    if (!userid || !token || !isCustomerLoggedIn()) {
      savePostLoginRedirect(id ? `/order/${id}` : "/checkout");
      showToast("Please login or register first to place an order");
      navigate("/login");
      return;
    }

    if (!checkoutItems.length) {
      showToast("Your checkout is empty");
      navigate("/cart");
      return;
    }

    const activeShipping = getActiveShippingDetails();
    const fullAddress = [
      activeShipping.address1,
      activeShipping.address2,
      activeShipping.city,
      activeShipping.state,
      activeShipping.postalCode,
    ].filter(Boolean).join(", ");

    if (!billing.name || !billing.email || !billing.phone || !activeShipping.address1 || !activeShipping.city || !activeShipping.state || !activeShipping.postalCode) {
      showToast("Please fill all required checkout fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const ordersToPlace = id
        ? [{ productId: id }]
        : expandCartItems(checkoutItems).map((item) => ({ productId: item.productId }));

      await Promise.all(
        ordersToPlace.map((item) =>
          axios.post(
            apiUrl("/placeorder"),
            {
              name: billing.name,
              email: billing.email,
              mobileno: billing.phone,
              address: fullAddress,
              productid: item.productId,
              custid: userid,
              paymentMethod,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );

      if (!id) {
        clearCart();
      }

      showToast(id ? "Order placed successfully" : "All cart items placed successfully");
      navigate("/userpanel");
    } catch (err) {
      console.log("PLACE ORDER ERROR:", err.response?.data || err.message);
      showToast(err.response?.data?.message || "Error placing order");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout-page">
      <StoreHeader active="product" topbarText="Welcome to the world of Footwears" />

      <main className="checkout-main">
        <div className="checkout-breadcrumb">
          <button type="button" onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <strong>Checkout</strong>
        </div>

        <form className="checkout-layout" onSubmit={placeorder}>
          <section className="checkout-card checkout-form-card">
            <h2>Billing Details</h2>

            <label>
              <span>Full Name <b>*</b></span>
              <input type="text" placeholder="Enter your full name" value={billing.name} onChange={(e) => updateBilling("name", e.target.value)} required />
            </label>

            <label>
              <span>Email Address <b>*</b></span>
              <input type="email" placeholder="Enter your email" value={billing.email} onChange={(e) => updateBilling("email", e.target.value)} required />
            </label>

            <label>
              <span>Phone Number <b>*</b></span>
              <input type="text" placeholder="Enter your phone number" value={billing.phone} onChange={(e) => updateBilling("phone", e.target.value)} required />
            </label>

            <label>
              <span>Address <b>*</b></span>
              <input type="text" placeholder="House number and street name" value={billing.address1} onChange={(e) => updateBilling("address1", e.target.value)} required />
            </label>

            <label>
              <span className="sr-only">Address line 2</span>
              <input type="text" placeholder="Apartment, suite, unit etc. (optional)" value={billing.address2} onChange={(e) => updateBilling("address2", e.target.value)} />
            </label>

            <label>
              <span>Town / City <b>*</b></span>
              <input type="text" placeholder="Enter your town or city" value={billing.city} onChange={(e) => updateBilling("city", e.target.value)} required />
            </label>

            <label>
              <span>State <b>*</b></span>
              <select value={billing.state} onChange={(e) => updateBilling("state", e.target.value)} required>
                <option value="">Select state</option>
                {stateOptions.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </label>

            <label>
              <span>Postal Code <b>*</b></span>
              <input type="text" placeholder="Enter postal code" value={billing.postalCode} onChange={(e) => updateBilling("postalCode", e.target.value)} required />
            </label>
          </section>

          <section className="checkout-card checkout-form-card">
            <h2>Shipping Details</h2>

            <label className="checkout-check-row">
              <input type="checkbox" checked={shipDifferent} onChange={(e) => setShipDifferent(e.target.checked)} />
              <span>Ship to a different address?</span>
            </label>

            <label>
              <span>Full Name <b>*</b></span>
              <input type="text" placeholder="Enter full name" value={shipDifferent ? shipping.name : billing.name} onChange={(e) => shipDifferent ? updateShipping("name", e.target.value) : updateBilling("name", e.target.value)} required />
            </label>

            <label>
              <span>Phone Number <b>*</b></span>
              <input type="text" placeholder="Enter phone number" value={shipDifferent ? shipping.phone : billing.phone} onChange={(e) => shipDifferent ? updateShipping("phone", e.target.value) : updateBilling("phone", e.target.value)} required />
            </label>

            <label>
              <span>Address <b>*</b></span>
              <input type="text" placeholder="House number and street name" value={shipDifferent ? shipping.address1 : billing.address1} onChange={(e) => shipDifferent ? updateShipping("address1", e.target.value) : updateBilling("address1", e.target.value)} required />
            </label>

            <label>
              <span className="sr-only">Shipping Address line 2</span>
              <input type="text" placeholder="Apartment, suite, unit etc. (optional)" value={shipDifferent ? shipping.address2 : billing.address2} onChange={(e) => shipDifferent ? updateShipping("address2", e.target.value) : updateBilling("address2", e.target.value)} />
            </label>

            <label>
              <span>Town / City <b>*</b></span>
              <input type="text" placeholder="Enter town or city" value={shipDifferent ? shipping.city : billing.city} onChange={(e) => shipDifferent ? updateShipping("city", e.target.value) : updateBilling("city", e.target.value)} required />
            </label>

            <label>
              <span>State <b>*</b></span>
              <select value={shipDifferent ? shipping.state : billing.state} onChange={(e) => shipDifferent ? updateShipping("state", e.target.value) : updateBilling("state", e.target.value)} required>
                <option value="">Select state</option>
                {stateOptions.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </label>

            <label>
              <span>Postal Code <b>*</b></span>
              <input type="text" placeholder="Enter postal code" value={shipDifferent ? shipping.postalCode : billing.postalCode} onChange={(e) => shipDifferent ? updateShipping("postalCode", e.target.value) : updateBilling("postalCode", e.target.value)} required />
            </label>
          </section>

          <aside className="checkout-card checkout-order-card">
            <h2>Your Order</h2>

            <div className="checkout-order-items">
              {checkoutItems.map((item) => (
                <article key={`${item.productId}-${item.size}`} className="checkout-order-item">
                  <div className="checkout-order-thumb">
                    <img src={resolveImage(item.image || item.pimage)} alt={item.name} />
                  </div>
                  <div className="checkout-order-copy">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size} <i /> Qty: {item.quantity || 1}</p>
                  </div>
                  <strong>{formatMoney(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
                </article>
              ))}
            </div>

            <div className="checkout-summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>{formatMoney(shippingCharge)}</strong>
              </div>
              <div className="discount">
                <span>Discount <em>(SHOOFRESH20)</em></span>
                <strong>- {formatMoney(discount)}</strong>
              </div>
            </div>

            <div className="checkout-total-line">
              <span>Total</span>
              <strong>{formatMoney(grandTotal)}</strong>
            </div>

            <div className="checkout-payment-block">
              <h3>Payment Method</h3>
              <label>
                <input type="radio" name="paymentMethod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                <span>Cash on Delivery</span>
              </label>
              <label>
                <input type="radio" name="paymentMethod" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
                <span>Online Payment (Card, UPI, NetBanking)</span>
              </label>
              <label>
                <input type="radio" name="paymentMethod" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
                <span>PayPal</span>
              </label>
            </div>

            <button type="submit" className="checkout-place-btn" disabled={isSubmitting || !checkoutItems.length}>
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </aside>
        </form>
      </main>

      <ProjectFooter />
    </div>
  );
}

export default Shippingdetails;

