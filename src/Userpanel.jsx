import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import StoreHeader from "./components/StoreHeader";
import ProjectFooter from "./components/ProjectFooter";
import "./homepage.css";
import "./userpanel.css";
import { showToast } from "./utils/toast";

const invalidIdentityValues = ["", "undefined", "null"];

function DashboardIcon() {
  return <svg viewBox="0 0 24 24"><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></svg>;
}
function OrdersIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
function DownloadIcon() {
  return <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
}
function AddressIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"/><circle cx="12" cy="11" r="2.5"/></svg>;
}
function AccountIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function LogoutIcon() {
  return <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}
function PhoneIcon() {
  return <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8 9.66a16 16 0 0 0 6.34 6.34l1.21-1.26a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92Z"/></svg>;
}
function MailIcon() {
  return <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function CalendarIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function WalletIcon() {
  return <svg viewBox="0 0 24 24"><path d="M21 7H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z"/><path d="M17 13h.01"/><path d="M5 7V5a2 2 0 0 1 2-2h10"/></svg>;
}
function PendingIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function DeliveredIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>;
}
function RupeeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 4h11"/><path d="M6 8h11"/><path d="M6 12h6"/><path d="M8 4c4.2 0 6.5 1.6 6.5 4S12.2 12 8 12"/><path d="m8 12 8 8"/></svg>;
}

function resolveImage(imagePath) {
  return createImageUrl(imagePath, "/assets/storefront/photo-1542291026-7eec264c27ff.jpg");
}

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function statusClass(status) {
  const value = String(status || "Pending").toLowerCase();
  if (value === "confirmed") return "processing";
  if (value === "declined") return "cancelled";
  return value;
}

function getInitials(name) {
  const safeName = String(name || "User").trim();
  const parts = safeName.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "U";
}

function Userpanel() {
  const [orders, setOrders] = useState([]);
  const [cancellingId, setCancellingId] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const navigate = useNavigate();
  const token = localStorage.getItem("usertoken");
  const email = localStorage.getItem("email") || "rahul@gmail.com";
  const storedCustomerName =
    localStorage.getItem("name") ||
    localStorage.getItem("username") ||
    localStorage.getItem("customerName") ||
    localStorage.getItem("userName") ||
    "";

  const normalizedCustomerId = useMemo(() => {
    const storedCid = (localStorage.getItem("cid") || "").trim();
    const storedUid = (localStorage.getItem("uid") || "").trim();

    const safeCid = invalidIdentityValues.includes(storedCid) ? "" : storedCid;
    const safeUid = invalidIdentityValues.includes(storedUid) ? "" : storedUid;
    const resolvedId = safeCid || safeUid;

    if (resolvedId && resolvedId !== storedCid) {
      localStorage.setItem("cid", resolvedId);
    }

    return resolvedId;
  }, []);

  useEffect(() => {
    if (!token || !normalizedCustomerId) {
      navigate("/login", { replace: true });
      return;
    }

    axios
      .get(apiUrl(`/viewOrderByCustID/${normalizedCustomerId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);

          const firstResolvedCustomerId = res.data.find((order) => {
            const orderCustomerId = typeof order.custid === "object" ? order.custid?._id : order.custid;
            return Boolean(orderCustomerId);
          });

          const orderCustomerId = firstResolvedCustomerId
            ? typeof firstResolvedCustomerId.custid === "object"
              ? firstResolvedCustomerId.custid?._id
              : firstResolvedCustomerId.custid
            : "";

          if (orderCustomerId && orderCustomerId !== normalizedCustomerId) {
            localStorage.setItem("cid", orderCustomerId);
          }
        }
      })
      .catch((err) => {
        console.error("Error loading orders:", err);

        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      });
  }, [navigate, normalizedCustomerId, token]);

  const userName = useMemo(() => {
    const orderCustomerName = orders.find((order) => typeof order?.custid === "object" && order?.custid?.name)?.custid?.name;
    if (storedCustomerName) return storedCustomerName;
    if (orderCustomerName) return orderCustomerName;
    if (email && email.includes("@")) {
      const emailPrefix = email.split("@")[0].replace(/[._-]+/g, " ").trim();
      if (emailPrefix) {
        return emailPrefix.replace(/\b\w/g, (match) => match.toUpperCase());
      }
    }
    return "Customer";
  }, [email, orders, storedCustomerName]);
  const userPhone = useMemo(() => orders[0]?.mobileno || "+91 9876543210", [orders]);
  const userAddress = useMemo(() => orders[0]?.address || "50 Porana Place, West Casuarinas, Indore, Madhya Pradesh - 453001, India.", [orders]);
  const joinedDate = useMemo(() => {
    const lastOrder = orders[orders.length - 1];
    return lastOrder?.createdAt
      ? new Date(lastOrder.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "21 Apr, 2026";
  }, [orders]);

  const paymentMethod = useMemo(() => {
    const firstWithPayment = orders.find((item) => item.paymentmethod || item.paymentMethod || item.modeofpayment || item.modeOfPayment);
    return firstWithPayment?.paymentmethod || firstWithPayment?.paymentMethod || firstWithPayment?.modeofpayment || firstWithPayment?.modeOfPayment || (orders.length ? "Cash on Delivery" : "");
  }, [orders]);

  const stats = useMemo(() => {
    const pendingOrders = orders.filter((item) => String(item.status || "Pending").toLowerCase() === "pending").length;
    const deliveredOrders = orders.filter((item) => {
      const value = String(item.status || "").toLowerCase();
      return value === "delivered" || value === "confirmed";
    }).length;
    const totalSpent = orders.reduce((sum, item) => sum + Number(item.amount || item.productid?.price || 0), 0);

    return {
      totalOrders: orders.length,
      pendingOrders,
      deliveredOrders,
      totalSpent,
    };
  }, [orders]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleCancelOrder = async (orderId) => {
    const shouldCancel = window.confirm("Do you want to cancel this order?");
    if (!shouldCancel) return;

    const selectedOrder = orders.find((order) => order._id === orderId);
    const orderCustomerId = selectedOrder
      ? typeof selectedOrder.custid === "object"
        ? selectedOrder.custid?._id
        : selectedOrder.custid
      : "";

    const requestCustomerId = orderCustomerId || normalizedCustomerId;

    if (!requestCustomerId) {
      showToast("Customer session is missing. Please log in again.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      setCancellingId(orderId);

      await axios.patch(apiUrl(`/placeorder/${orderId}/cancel`), {
        custid: requestCustomerId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("cid", requestCustomerId);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Declined" } : order
        )
      );
      showToast("Order cancelled successfully");
    } catch (err) {
      console.error("Cancel order error:", err);
      showToast(err.response?.data?.message || "Unable to cancel order");
    } finally {
      setCancellingId("");
    }
  };

  const dashboardOrders = orders.slice(0, 5);

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
    { key: "orders", label: "Orders", icon: OrdersIcon },
    { key: "downloads", label: "Downloads", icon: DownloadIcon },
    { key: "addresses", label: "Addresses", icon: AddressIcon },
    { key: "account", label: "Account Details", icon: AccountIcon },
  ];

  function renderOrdersTable(items) {
    return (
      <div className="account-orders-card">
        <div className="account-orders-head">
          <h2>{activeSection === "dashboard" ? "Recent Orders" : "Your Orders"}</h2>
          {activeSection === "dashboard" && orders.length > 5 ? (
            <button type="button" className="account-view-all" onClick={() => setActiveSection("orders")}>View All Orders</button>
          ) : null}
        </div>

        <div className="account-orders-table-wrap">
          <table className="account-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length ? items.map((item) => (
                <tr key={item._id}>
                  <td>#{String(item._id).slice(-5)}</td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}</td>
                  <td>
                    <div className="account-order-product">
                      <img src={resolveImage(item.productid?.pimage || item.productid?.image)} alt={item.productid?.name || "Product"} />
                      <span>{item.productid?.name || "Product"}</span>
                    </div>
                  </td>
                  <td>{formatMoney(item.amount || item.productid?.price || 0)}</td>
                  <td>
                    <span className={`account-order-status ${statusClass(item.status)}`}>
                      {item.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {String(item.status || "Pending").toLowerCase() === "pending" ? (
                      <button
                        type="button"
                        className="account-action-link cancel"
                        onClick={() => handleCancelOrder(item._id)}
                        disabled={cancellingId === item._id}
                      >
                        {cancellingId === item._id ? "Cancelling..." : "Cancel"}
                      </button>
                    ) : (
                      <button type="button" className="account-action-link">View</button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="account-empty-row">No orders found yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderMainContent() {
    if (activeSection === "orders") {
      return renderOrdersTable(orders);
    }

    if (activeSection === "addresses") {
      return (
        <div className="account-info-card account-panel-card">
          <h2>Saved Address</h2>
          <div className="account-detail-line"><AddressIcon /><span>{userAddress}</span></div>
          <button type="button" className="account-outline-btn">Manage Addresses</button>
        </div>
      );
    }

    if (activeSection === "account") {
      return (
        <div className="account-info-card account-panel-card">
          <h2>Account Details</h2>
          <div className="account-info-list">
            <div className="account-detail-line"><AccountIcon /><span>{userName}</span></div>
            <div className="account-detail-line"><MailIcon /><span>{email}</span></div>
            <div className="account-detail-line"><PhoneIcon /><span>{userPhone}</span></div>
            <div className="account-detail-line"><CalendarIcon /><span>Joined on {joinedDate}</span></div>
          </div>
          <button type="button" className="account-outline-btn">Edit Account</button>
        </div>
      );
    }

    if (activeSection === "downloads") {
      return (
        <div className="account-info-card account-panel-card">
          <h2>Downloads</h2>
          <p className="account-placeholder-copy">There are no downloadable products for this account yet.</p>
        </div>
      );
    }

    return (
      <>
        <div className="account-welcome-card">
          <div className="account-user-avatar account-user-avatar--plain">{getInitials(userName)}</div>
          <div className="account-welcome-copy">
            <h1>Hello, {userName}</h1>
            <p>
              From your account dashboard you can view your recent orders, manage your shipping and billing
              addresses and edit your password and account details.
            </p>
          </div>
        </div>

        <div className="account-stats-grid">
          <article className="account-stat-card">
            <div className="account-stat-icon red"><OrdersIcon /></div>
            <div className="account-stat-copy">
              <span>Total Orders</span>
              <strong>{stats.totalOrders}</strong>
            </div>
          </article>
          <article className="account-stat-card">
            <div className="account-stat-icon amber"><PendingIcon /></div>
            <div className="account-stat-copy">
              <span>Pending Orders</span>
              <strong>{stats.pendingOrders}</strong>
            </div>
          </article>
          <article className="account-stat-card">
            <div className="account-stat-icon green"><DeliveredIcon /></div>
            <div className="account-stat-copy">
              <span>Delivered Orders</span>
              <strong>{stats.deliveredOrders}</strong>
            </div>
          </article>
          <article className="account-stat-card">
            <div className="account-stat-icon gold"><RupeeIcon /></div>
            <div className="account-stat-copy">
              <span>Total Spent</span>
              <strong>{formatMoney(stats.totalSpent)}</strong>
            </div>
          </article>
        </div>

        {renderOrdersTable(dashboardOrders)}
      </>
    );
  }

  return (
    <div className="account-dashboard-page">
      <StoreHeader active="home" topbarText="Welcome to the world of Footwears" />

      <main className="account-dashboard-main">
        <div className="account-breadcrumb">
          <button type="button" onClick={() => navigate("/")}>Home</button>
          <span>/</span>
          <button type="button" onClick={() => navigate("/userpanel")}>My Account</button>
          <span>/</span>
          <strong>{navItems.find((item) => item.key === activeSection)?.label || "Dashboard"}</strong>
        </div>

        <section className="account-dashboard-layout">
          <aside className="account-sidebar-card">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={activeSection === item.key ? "active" : ""}
                  onClick={() => setActiveSection(item.key)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button type="button" onClick={handleLogout}><LogoutIcon /><span>Logout</span></button>
          </aside>

          <section className="account-dashboard-center">
            {renderMainContent()}
          </section>

          <aside className="account-dashboard-right">
            <div className="account-info-card">
              <h2>Account Details</h2>
              <div className="account-info-list">
                <div className="account-detail-line"><AccountIcon /><span>{userName}</span></div>
                <div className="account-detail-line"><MailIcon /><span>{email}</span></div>
                <div className="account-detail-line"><PhoneIcon /><span>{userPhone}</span></div>
                <div className="account-detail-line"><CalendarIcon /><span>Joined on {joinedDate}</span></div>
              </div>
              <button type="button" className="account-outline-btn">Edit Account</button>
            </div>

            <div className="account-info-card">
              <h2>Default Address</h2>
              <div className="account-detail-line"><AddressIcon /><span>{userAddress}</span></div>
              <button type="button" className="account-outline-btn">Manage Addresses</button>
            </div>

            {orders.length > 0 ? (
              <div className="account-info-card">
                <h2>Payment Method</h2>
                <div className="account-payment-row">
                  <div>
                    <WalletIcon />
                    <span>{paymentMethod}</span>
                  </div>
                </div>
                <button type="button" className="account-outline-btn">View Payment Method</button>
              </div>
            ) : null}
          </aside>
        </section>
      </main>

      <ProjectFooter />
    </div>
  );
}

export default Userpanel;





