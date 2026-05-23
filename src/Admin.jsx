import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, createImageUrl } from "./utils/api";
import { showToast } from "./utils/toast";
import "./Admin.css";

function HeartRibbonIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78" /></svg>;
}
function ClockIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
function TruckIcon() {
  return <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8l5-5M8 21l2-2M12 21l4-4" /></svg>;
}
function GridIcon() {
  return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
}
function ProductIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
}
function PlusCircleIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
}
function ClipboardIcon() {
  return <svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>;
}
function ShieldIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function UsersIcon() {
  return <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function UserIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
function FolderIcon() {
  return <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
}
function TagIcon() {
  return <svg viewBox="0 0 24 24"><path d="M20.59 13.41 13.41 20.6a2 2 0 0 1-2.82 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>;
}
function MessageIcon() {
  return <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function ActivityIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
}
function SettingsIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}
function LogoutIcon() {
  return <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
}
function ChevronIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>;
}
function SearchIcon() {
  return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /></svg>;
}
function RupeeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M6 4h11" /><path d="M6 8h11" /><path d="M6 12h6" /><path d="M8 4c4.2 0 6.5 1.6 6.5 4S12.2 12 8 12" /><path d="m8 12 8 8" /></svg>;
}
function EyeIcon() {
  return <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}
function EditIcon() {
  return <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></svg>;
}
function DeleteIcon() {
  return <svg viewBox="0 0 24 24"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>;
}
function ArrowRightIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="5 12 19 12" /><polyline points="12 5 19 12 12 19" /></svg>;
}
function CheckIcon() {
  return <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>;
}

const ribbonMessages = [
  { icon: <HeartRibbonIcon />, text: "Get 15% off your first purchase when you sign up" },
  { icon: <ClockIcon />, text: "Buy one pair, get the second pair 50% off" },
  { icon: <TruckIcon />, text: "Free shipping on orders over Rs. 2000" },
  { icon: <HeartRibbonIcon />, text: "Enjoy 20% off your entire order with code SHOFRESH20" },
];


const staticUsers = [
  { name: "Admin", email: "admin@shopix.in", role: "Super Admin", status: "Active", letter: "A" },
  { name: "Manager", email: "manager@shopix.in", role: "Manager", status: "Active", letter: "M" },
];

function getOrderAmount(order) {
  return Number(order?.amount || order?.productid?.price || 0);
}

function getOrderDate(order) {
  const rawDate = order?.createdAt || order?.updatedAt || order?.date || Date.now();
  const parsed = new Date(rawDate);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function sameDay(left, right) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}

function buildSalesSeries(orders, period) {
  const validOrders = (orders || []).filter((order) => getOrderAmount(order) > 0);
  const now = new Date();

  if (period === "week") {
    const labels = [];
    const values = [];

    for (let index = 6; index >= 0; index -= 1) {
      const bucketDate = new Date(now);
      bucketDate.setHours(0, 0, 0, 0);
      bucketDate.setDate(now.getDate() - index);

      labels.push(bucketDate.toLocaleDateString("en-US", { weekday: "short" }));
      values.push(
        validOrders.reduce((sum, order) => (
          sameDay(getOrderDate(order), bucketDate) ? sum + getOrderAmount(order) : sum
        ), 0)
      );
    }

    return { labels, values };
  }

  if (period === "month") {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const buckets = [];
    let cursor = new Date(monthStart);
    let weekIndex = 1;

    while (cursor.getMonth() === monthStart.getMonth()) {
      const bucketStart = new Date(cursor);
      const bucketEnd = new Date(cursor);
      bucketEnd.setDate(bucketEnd.getDate() + 6);
      if (bucketEnd.getMonth() !== monthStart.getMonth()) {
        bucketEnd.setMonth(monthStart.getMonth() + 1, 0);
      }
      bucketEnd.setHours(23, 59, 59, 999);

      buckets.push({
        label: `W${weekIndex}`,
        start: new Date(bucketStart.getFullYear(), bucketStart.getMonth(), bucketStart.getDate(), 0, 0, 0, 0),
        end: bucketEnd,
      });

      cursor.setDate(cursor.getDate() + 7);
      weekIndex += 1;
    }

    const labels = buckets.map((bucket) => bucket.label);
    const values = buckets.map((bucket) => validOrders.reduce((sum, order) => {
      const orderDate = getOrderDate(order);
      return orderDate >= bucket.start && orderDate <= bucket.end ? sum + getOrderAmount(order) : sum;
    }, 0));

    return { labels, values };
  }

  const labels = [];
  const values = [];

  for (let index = 11; index >= 0; index -= 1) {
    const bucketDate = new Date(now.getFullYear(), now.getMonth() - index, 1);
    const bucketStart = new Date(bucketDate.getFullYear(), bucketDate.getMonth(), 1, 0, 0, 0, 0);
    const bucketEnd = new Date(bucketDate.getFullYear(), bucketDate.getMonth() + 1, 0, 23, 59, 59, 999);

    labels.push(bucketDate.toLocaleDateString("en-US", { month: "short" }));
    values.push(validOrders.reduce((sum, order) => {
      const orderDate = getOrderDate(order);
      return orderDate >= bucketStart && orderDate <= bucketEnd ? sum + getOrderAmount(order) : sum;
    }, 0));
  }

  return { labels, values };
}

function resolveImage(imagePath) {
  return createImageUrl(imagePath, "/assets/storefront/photo-1542291026-7eec264c27ff.jpg");
}

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getInitials(name) {
  const safeName = String(name || "User").trim();
  const parts = safeName.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "U";
}

function statusClass(status) {
  const normalized = String(status || "").toLowerCase();
  const map = {
    pending: "s-pending",
    processing: "s-processing",
    shipped: "s-shipped",
    delivered: "s-delivered",
    confirmed: "s-delivered",
    declined: "s-cancelled",
    cancelled: "s-cancelled",
    active: "s-active",
    inactive: "s-inactive",
    approved: "s-active",
    expired: "s-inactive",
  };
  return map[normalized] || "s-processing";
}
function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("admintoken");
  const adminEmail = localStorage.getItem("adminemail") || "admin@shopix.in";

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [openMenus, setOpenMenus] = useState({ products: false, settings: false });
  const [globalSearch, setGlobalSearch] = useState("");
  const [salesPeriod, setSalesPeriod] = useState("month");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [updatingId, setUpdatingId] = useState("");
  const [deletingProductId, setDeletingProductId] = useState("");
  const [editingProductId, setEditingProductId] = useState("");
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    storeName: "SHOPIX",
    storeEmail: "info@shopix.in",
    phone: "+91 7999384310",
    currency: "INR (Rs.)",
    address: "50 Porana Place, West Casuarinas, Indore, India.",
  });
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "Athletic Footwear",
    gender: "Unisex",
    sizes: "",
    description: "",
    pimage: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin", { replace: true });
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [token, navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(apiUrl("/products"));
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(apiUrl("/checkorders"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const derivedCustomers = useMemo(() => {
    const map = new Map();
    orders.forEach((order, index) => {
      const email = order.email || order.custid?.email || `customer${index + 1}@shopix.in`;
      if (!map.has(email)) {
        map.set(email, {
          name: order.name || order.custid?.name || `Customer ${index + 1}`,
          email,
          date: new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          orders: 0,
          status: String(order.status || "Active").toLowerCase() === "declined" ? "Inactive" : "Active",
                  });
      }
      map.get(email).orders += 1;
    });
    return Array.from(map.values());
  }, [orders]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount || order.productid?.price || 0), 0);
    const pendingCount = orders.filter((order) => String(order.status || "pending").toLowerCase() === "pending").length;
    const deliveredCount = orders.filter((order) => ["delivered", "confirmed"].includes(String(order.status || "").toLowerCase())).length;
    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: pendingCount,
      deliveredOrders: deliveredCount,
      totalCustomers: derivedCustomers.length,
      totalRevenue,
    };
  }, [orders, products, derivedCustomers]);

  const statusBreakdown = useMemo(() => {
    const base = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
    orders.forEach((order) => {
      const raw = String(order.status || "pending").toLowerCase();
      if (raw === "confirmed") base.delivered += 1;
      else if (raw === "declined") base.cancelled += 1;
      else if (base[raw] !== undefined) base[raw] += 1;
      else base.processing += 1;
    });
    const total = Object.values(base).reduce((sum, value) => sum + value, 0) || 1;
    return { ...base, total };
  }, [orders]);

  const donutStyle = {
    background: `conic-gradient(#e65100 0deg ${(statusBreakdown.pending / statusBreakdown.total) * 360}deg, #f59e0b ${(statusBreakdown.pending / statusBreakdown.total) * 360}deg ${((statusBreakdown.pending + statusBreakdown.processing) / statusBreakdown.total) * 360}deg, #7c3aed ${((statusBreakdown.pending + statusBreakdown.processing) / statusBreakdown.total) * 360}deg ${((statusBreakdown.pending + statusBreakdown.processing + statusBreakdown.shipped) / statusBreakdown.total) * 360}deg, #16a34a ${((statusBreakdown.pending + statusBreakdown.processing + statusBreakdown.shipped) / statusBreakdown.total) * 360}deg ${((statusBreakdown.pending + statusBreakdown.processing + statusBreakdown.shipped + statusBreakdown.delivered) / statusBreakdown.total) * 360}deg, #dc2626 ${((statusBreakdown.pending + statusBreakdown.processing + statusBreakdown.shipped + statusBreakdown.delivered) / statusBreakdown.total) * 360}deg 360deg)`,
  };

  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => {
      const key = product.category || "Athletic Footwear";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) =>
      [product.name, product.category, product.gender, product.brand]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [products, globalSearch]);

  const filteredOrders = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) =>
      [order._id, order.name, order.email, order.productid?.name, order.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [orders, globalSearch]);

  const filteredCustomers = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return derivedCustomers;
    return derivedCustomers.filter((customer) =>
      [customer.name, customer.email].some((value) => String(value).toLowerCase().includes(q))
    );
  }, [derivedCustomers, globalSearch]);

  const activityFeed = useMemo(() => {
    const orderActivity = orders.slice(0, 4).map((order, index) => ({
      icon: index % 2 === 0 ? "orange" : "green",
      text: `${order.name || "Customer"} placed ${order.productid?.name || "an order"}`,
      time: new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    }));
    const productActivity = products.slice(0, 2).map((product) => ({
      icon: "blue",
      text: `${product.name || "Product"} is live in the catalog`,
      time: "Today",
    }));
    return [...orderActivity, ...productActivity].slice(0, 6);
  }, [orders, products]);

  const salesSeries = useMemo(() => buildSalesSeries(orders, salesPeriod), [orders, salesPeriod]);
  const salesValues = salesSeries.values;
  const salesMax = Math.max(...salesValues, 1);

  const analyticsSeries = useMemo(() => buildSalesSeries(orders, "year"), [orders]);
  const analyticsMax = Math.max(...analyticsSeries.values, 1);

  const resetProductForm = () => {
    setEditingProductId("");
    setProductForm({
      name: "",
      brand: "",
      price: "",
      stock: "",
      category: "Athletic Footwear",
      gender: "Unisex",
      sizes: "",
      description: "",
      pimage: "",
    });
  };

  const openAddProductModal = () => {
    resetProductForm();
    setProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductForm({
      name: product.name || "",
      brand: product.brand || product.gender || "",
      price: String(product.price || ""),
      stock: String(product.stock || 0),
      category: product.category || "Athletic Footwear",
      gender: product.gender || "Unisex",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : (product.sizes || ""),
      description: product.description || "",
      pimage: product.pimage || "",
    });
    setProductModalOpen(true);
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProductForm((current) => ({ ...current, [name]: value }));
  };

  const saveProduct = async (event) => {
    event?.preventDefault?.();
    try {
      setIsSubmittingProduct(true);
      const payload = {
        name: productForm.name.trim(),
        brand: productForm.brand.trim(),
        price: Number(productForm.price || 0),
        stock: Number(productForm.stock || 0),
        category: productForm.category.trim() || "Athletic Footwear",
        gender: productForm.gender.trim() || "Unisex",
        sizes: productForm.sizes,
        description: productForm.description.trim(),
        pimage: productForm.pimage.trim(),
      };
      if (editingProductId) {
        const res = await axios.patch(apiUrl(`/products/${editingProductId}`), payload);
        setProducts((current) => current.map((item) => (item._id === editingProductId ? res.data : item)));
        showToast("Product updated successfully");
      } else {
        const res = await axios.post(apiUrl("/products"), payload);
        setProducts((current) => [res.data, ...current]);
        showToast("Product added successfully");
      }
      setProductModalOpen(false);
      resetProductForm();
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || "Unable to save product");
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    try {
      setDeletingProductId(product._id);
      await axios.delete(apiUrl(`/products/${product._id}`));
      setProducts((current) => current.filter((item) => item._id !== product._id));
      showToast("Product deleted successfully");
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || "Unable to delete product");
    } finally {
      setDeletingProductId("");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await axios.patch(
        apiUrl(`/placeorder/${orderId}/status`),
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((current) => current.map((order) => (order._id === orderId ? { ...order, status } : order)));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((current) => (current ? { ...current, status } : current));
      }
      showToast(`Order ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || "Unable to update order status");
    } finally {
      setUpdatingId("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aid");
    localStorage.removeItem("admintoken");
    localStorage.removeItem("adminemail");
    navigate("/adminlogin", { replace: true });
  };

  const goSection = (section) => setActiveSection(section);
  const toggleSubMenu = (menu) => setOpenMenus((current) => ({ ...current, [menu]: !current[menu] }));

  const recentOrders = filteredOrders.slice(0, 5);
  const latestCustomers = filteredCustomers.slice(0, 5);

  return (
    <div className="admin-page">
      <div className="admin-ribbon">
        <div className="admin-ribbon-track">
          {[...ribbonMessages, ...ribbonMessages].map((item, index) => (
            <span key={`${item.text}-${index}`}>{item.icon}{item.text}</span>
          ))}
        </div>
      </div>

      <div className="admin-shell">
        <nav className={`admin-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
          <div className="admin-sidebar-brand">
            <div className="admin-sidebar-brand-name">SHO<span>P</span>IX</div>
            <div className="admin-sidebar-brand-sub">Admin Panel</div>
          </div>

          <div className="admin-nav-section">
            <button className={`admin-nav-item ${activeSection === "dashboard" ? "active" : ""}`} onClick={() => goSection("dashboard")}><GridIcon /><span>Dashboard</span></button>
            <button className={`admin-nav-item ${openMenus.products ? "open" : ""}`} onClick={() => toggleSubMenu("products")}><ProductIcon /><span>Products</span><span className="admin-nav-arrow"><ChevronIcon /></span></button>
            <div className={`admin-nav-sub ${openMenus.products ? "open" : ""}`}>
              <button className="admin-nav-sub-item" onClick={() => goSection("products")}>All Products</button>
              <button className="admin-nav-sub-item" onClick={() => goSection("add-product")}>Add Product</button>
              <button className="admin-nav-sub-item" onClick={() => goSection("categories")}>Categories</button>
            </div>
            <button className={`admin-nav-item ${activeSection === "add-product" ? "active" : ""}`} onClick={() => goSection("add-product")}><PlusCircleIcon /><span>Add Product</span></button>
            <button className={`admin-nav-item ${activeSection === "orders" ? "active" : ""}`} onClick={() => goSection("orders")}><ClipboardIcon /><span>Orders</span></button>
            <button className={`admin-nav-item ${activeSection === "order-history" ? "active" : ""}`} onClick={() => goSection("order-history")}><ShieldIcon /><span>Order History</span></button>
            <button className={`admin-nav-item ${activeSection === "customers" ? "active" : ""}`} onClick={() => goSection("customers")}><UsersIcon /><span>Customers</span></button>
            <button className={`admin-nav-item ${activeSection === "users" ? "active" : ""}`} onClick={() => goSection("users")}><UserIcon /><span>Users</span></button>
            <div className="admin-nav-divider" />
            <button className={`admin-nav-item ${activeSection === "categories" ? "active" : ""}`} onClick={() => goSection("categories")}><FolderIcon /><span>Categories</span></button>
            <button className={`admin-nav-item ${activeSection === "analytics" ? "active" : ""}`} onClick={() => goSection("analytics")}><ActivityIcon /><span>Analytics</span></button>
            <div className="admin-nav-divider" />
            <button className={`admin-nav-item ${openMenus.settings ? "open" : ""}`} onClick={() => toggleSubMenu("settings")}><SettingsIcon /><span>Settings</span><span className="admin-nav-arrow"><ChevronIcon /></span></button>
            <div className={`admin-nav-sub ${openMenus.settings ? "open" : ""}`}>
              <button className="admin-nav-sub-item" onClick={() => goSection("settings")}>General</button>
              <button className="admin-nav-sub-item" onClick={() => goSection("settings")}>Payments</button>
              <button className="admin-nav-sub-item" onClick={() => goSection("settings")}>Shipping</button>
            </div>
            <button className="admin-nav-item" onClick={handleLogout}><LogoutIcon /><span>Logout</span></button>
          </div>


        </nav>

        <div className="admin-main">
          <div className="admin-topbar">
            <button className="admin-topbar-menu" onClick={() => setSidebarCollapsed((current) => !current)}><GridIcon /></button>
            <div className="admin-topbar-brand">SHO<span>P</span>IX</div>
            <div className="admin-search-wrap">
              <input type="text" placeholder="Search here..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
              <button type="button"><SearchIcon /></button>
            </div>
            <div className="admin-topbar-right">
              <button className="admin-pill" onClick={() => showToast(`Admin: ${adminEmail}`)}>
                <span className="admin-avatar">A</span>
                <span className="admin-pill-info"><strong>Admin</strong><small>Super Admin</small></span>
                <ChevronIcon />
              </button>
            </div>
          </div>

          <div className="admin-content">
            {activeSection === "dashboard" && (
              <div className="admin-page-section active">
                <div className="admin-stats-grid">
                  {[
                    { label: "Total Products", value: stats.totalProducts, trend: "12%", trendText: "this week", icon: <ProductIcon />, tone: "orange" },
                    { label: "Total Orders", value: stats.totalOrders, trend: "18%", trendText: "this week", icon: <ClipboardIcon />, tone: "green" },
                    { label: "Pending Orders", value: stats.pendingOrders, trend: "8%", trendText: "this week", icon: <ClockIcon />, tone: "yellow" },
                    { label: "Delivered Orders", value: stats.deliveredOrders, trend: "25%", trendText: "this week", icon: <TruckIcon />, tone: "purple" },
                    { label: "Total Customers", value: stats.totalCustomers, trend: "15%", trendText: "this week", icon: <UsersIcon />, tone: "blue" },
                    { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), trend: "20%", trendText: "this week", icon: <RupeeIcon />, tone: "orange" },
                  ].map((card) => (
                    <div className="admin-stat-card" key={card.label}>
                      <div className="admin-stat-label">{card.label}</div>
                      <div className="admin-stat-row">
                        <div className={`admin-stat-icon ${card.tone}`}>{card.icon}</div>
                        <div className="admin-stat-value">{card.value}</div>
                      </div>
                      <div className="admin-stat-trend up">{card.trend} <span>{card.trendText}</span></div>
                    </div>
                  ))}
                </div>

                <div className="admin-mid-grid">
                  <div className="admin-chart-card">
                    <div className="admin-card-header">
                      <span className="admin-card-title">Sales Overview</span>
                      <div className="admin-period-select">
                        <select value={salesPeriod} onChange={(e) => setSalesPeriod(e.target.value)}>
                          <option value="month">This Month</option>
                          <option value="week">This Week</option>
                          <option value="year">This Year</option>
                        </select>
                      </div>
                    </div>
                    <div className="admin-bars-chart">
                      {salesValues.map((value, index) => (
                        <div className="admin-bar-col" key={`${salesPeriod}-${index}`}>
                          <div className="admin-bar-track"><span style={{ height: `${(value / salesMax) * 100}%` }} /></div>
                          <small>{salesSeries.labels[index]}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-chart-card">
                    <div className="admin-card-header"><span className="admin-card-title">Order Status</span></div>
                    <div className="admin-donut-wrap">
                      <div className="admin-donut" style={donutStyle}>
                        <div className="admin-donut-center"><strong>{statusBreakdown.total}</strong><span>Total</span></div>
                      </div>
                    </div>
                    <div className="admin-legend-list">
                      {[
                        ["Pending", statusBreakdown.pending, "#e65100"],
                        ["Processing", statusBreakdown.processing, "#f59e0b"],
                        ["Shipped", statusBreakdown.shipped, "#7c3aed"],
                        ["Delivered", statusBreakdown.delivered, "#16a34a"],
                        ["Cancelled", statusBreakdown.cancelled, "#dc2626"],
                      ].map(([label, value, color]) => (
                        <div className="admin-legend-item" key={String(label)}>
                          <span className="admin-legend-dot" style={{ background: color }} />
                          <span className="admin-legend-label">{label}</span>
                          <span className="admin-legend-value">{value}</span>
                          <span className="admin-legend-pct">({Math.round((Number(value) / statusBreakdown.total) * 100)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-chart-card">
                    <div className="admin-card-header"><span className="admin-card-title">Recent Activity</span></div>
                    <div className="admin-activity-list">
                      {activityFeed.map((item, index) => (
                        <div className="admin-activity-item" key={`${item.text}-${index}`}>
                          <div className={`admin-activity-icon ${item.icon}`}>{item.icon === "green" ? <CheckIcon /> : item.icon === "blue" ? <UsersIcon /> : <ProductIcon />}</div>
                          <div className="admin-activity-body">
                            <div className="admin-activity-text">{item.text}</div>
                            <div className="admin-activity-time">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="admin-bottom-grid">
                  <div className="admin-table-card">
                    <div className="admin-card-header"><span className="admin-card-title">Recent Orders</span></div>
                    <table className="admin-data-table">
                      <thead>
                        <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order._id}>
                            <td className="admin-strong-cell">#{String(order._id).slice(-5)}</td>
                            <td><div className="admin-customer-cell"><div className="admin-customer-avatar admin-letter-avatar">{getInitials(order.name || order.email || "Customer")}</div><span>{order.name || "Customer"}</span></div></td>
                            <td><img className="admin-product-thumb" src={resolveImage(order.productid?.pimage)} alt={order.productid?.name || "Product"} /></td>
                            <td>{formatCurrency(order.amount || order.productid?.price)}</td>
                            <td><span className={`admin-status-pill ${statusClass(order.status || "pending")}`}>{order.status || "Pending"}</span></td>
                            <td>{new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                            <td><button className="admin-action-eye" onClick={() => { setSelectedOrder(order); setOrderModalOpen(true); }}><EyeIcon /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="admin-view-all" onClick={() => goSection("orders")}>View All Orders <ArrowRightIcon /></button>
                  </div>

                  <div className="admin-table-card">
                    <div className="admin-card-header"><span className="admin-card-title">Latest Customers</span></div>
                    <table className="admin-data-table">
                      <thead>
                        <tr><th>Customer</th><th>Email</th><th>Join Date</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {latestCustomers.map((customer) => (
                          <tr key={customer.email}>
                            <td><div className="admin-customer-cell"><div className="admin-customer-avatar admin-letter-avatar">{getInitials(customer.name || customer.email || "Customer")}</div><span>{customer.name}</span></div></td>
                            <td>{customer.email}</td>
                            <td>{customer.date}</td>
                            <td><span className={`admin-status-pill ${statusClass(customer.status)}`}>{customer.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button className="admin-view-all" onClick={() => goSection("customers")}>View All Customers <ArrowRightIcon /></button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "products" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Products</h2><p>Manage your product inventory</p></div>
                <div className="admin-toolbar">
                  <div className="admin-toolbar-search"><input type="text" placeholder="Search products..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} /><SearchIcon /></div>
                  <button className="admin-btn-filter">Filter</button>
                  <button className="admin-btn-add" onClick={openAddProductModal}><PlusCircleIcon />Add Product</button>
                </div>
                <div className="admin-products-grid">
                  {filteredProducts.map((product) => (
                    <div className="admin-product-card" key={product._id}>
                      <div className="admin-product-card-img"><img src={resolveImage(product.pimage)} alt={product.name} /></div>
                      <div className="admin-product-card-body">
                        <div className="admin-product-card-name">{product.name}</div>
                        <div className="admin-product-card-brand">{product.brand || product.gender || "SHOPIX"}</div>
                        <div className="admin-product-card-footer">
                          <div className="admin-product-card-price">{formatCurrency(product.price)}</div>
                          <span className={`admin-status-pill ${Number(product.stock || 0) > 0 ? "s-active" : "s-inactive"}`}>{Number(product.stock || 0) > 0 ? `${product.stock || 0} in stock` : "Out of stock"}</span>
                        </div>
                        <div className="admin-product-card-actions">
                          <button onClick={() => handleEditProduct(product)}><EditIcon /></button>
                          <button onClick={() => deleteProduct(product)} disabled={deletingProductId === product._id}><DeleteIcon /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "add-product" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Add Product</h2><p>Add a new product to your store</p></div>
                <div className="admin-form-panel">
                  <form onSubmit={saveProduct}>
                    <div className="admin-form-row">
                      <div className="admin-form-field"><label>Product Name</label><input name="name" value={productForm.name} onChange={handleProductChange} placeholder="e.g. Nike Air Max 270" /></div>
                      <div className="admin-form-field"><label>Brand</label><input name="brand" value={productForm.brand} onChange={handleProductChange} placeholder="e.g. Nike" /></div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-field"><label>Price (Rs.)</label><input name="price" type="number" value={productForm.price} onChange={handleProductChange} placeholder="2500" /></div>
                      <div className="admin-form-field"><label>Stock</label><input name="stock" type="number" value={productForm.stock} onChange={handleProductChange} placeholder="50" /></div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-field"><label>Category</label><input name="category" value={productForm.category} onChange={handleProductChange} placeholder="Athletic Footwear" /></div>
                      <div className="admin-form-field"><label>Gender</label><select name="gender" value={productForm.gender} onChange={handleProductChange}><option>Unisex</option><option>Men</option><option>Women</option><option>Kids</option></select></div>
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-field"><label>Sizes</label><input name="sizes" value={productForm.sizes} onChange={handleProductChange} placeholder="6, 7, 8" /></div>
                      <div className="admin-form-field"><label>Image URL</label><input name="pimage" value={productForm.pimage} onChange={handleProductChange} placeholder="https://..." /></div>
                    </div>
                    <div className="admin-form-field"><label>Description</label><textarea name="description" value={productForm.description} onChange={handleProductChange} placeholder="Enter product description..." /></div>
                    <button className="admin-btn-save" type="submit" disabled={isSubmittingProduct}>{editingProductId ? "Update Product" : "Save Product"}</button>
                  </form>
                </div>
              </div>
            )}

            {activeSection === "orders" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Orders</h2><p>Manage and track all orders</p></div>
                <div className="admin-toolbar">
                  <div className="admin-toolbar-search"><input type="text" placeholder="Search orders..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} /><SearchIcon /></div>
                  <button className="admin-btn-filter">Filter</button>
                  <button className="admin-btn-filter">Export</button>
                </div>
                <div className="admin-full-table-card">
                  <table className="admin-data-table">
                    <thead>
                      <tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="admin-strong-cell">#{String(order._id).slice(-5)}</td>
                          <td><div className="admin-customer-cell"><div className="admin-customer-avatar admin-letter-avatar">{getInitials(order.name || order.email || "Customer")}</div><span>{order.name || "Customer"}</span></div></td>
                          <td><img className="admin-product-thumb" src={resolveImage(order.productid?.pimage)} alt={order.productid?.name || "Product"} /></td>
                          <td>{formatCurrency(order.amount || order.productid?.price)}</td>
                          <td><span className={`admin-status-pill ${statusClass(order.status || "pending")}`}>{order.status || "Pending"}</span></td>
                          <td>{new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                          <td>
                            <div className="admin-order-actions-inline">
                              <button className="admin-action-eye" onClick={() => { setSelectedOrder(order); setOrderModalOpen(true); }}><EyeIcon /></button>
                              <button className="admin-mini-action confirm" disabled={updatingId === order._id} onClick={() => updateOrderStatus(order._id, "Confirmed")}>Confirm</button>
                              <button className="admin-mini-action cancel" disabled={updatingId === order._id} onClick={() => updateOrderStatus(order._id, "Declined")}>Cancel</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="admin-pagination"><button>1</button><button>2</button><button>3</button></div>
                </div>
              </div>
            )}

            {activeSection === "order-history" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Order History</h2><p>Complete history of all orders</p></div>
                <div className="admin-full-table-card">
                  <table className="admin-data-table">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={`history-${order._id}`}>
                          <td className="admin-strong-cell">#{String(order._id).slice(-5)}</td>
                          <td>{order.name || "Customer"}</td>
                          <td>{formatCurrency(order.amount || order.productid?.price)}</td>
                          <td><span className={`admin-status-pill ${statusClass(order.status || "pending")}`}>{order.status || "Pending"}</span></td>
                          <td>{new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "customers" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Customers</h2><p>Manage customer accounts</p></div>
                <div className="admin-toolbar">
                  <div className="admin-toolbar-search"><input type="text" placeholder="Search customers..." value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} /><SearchIcon /></div>
                  <button className="admin-btn-add"><PlusCircleIcon />Add Customer</button>
                </div>
                <div className="admin-full-table-card">
                  <table className="admin-data-table">
                    <thead><tr><th>Customer</th><th>Email</th><th>Join Date</th><th>Orders</th><th>Status</th></tr></thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.email}>
                          <td><div className="admin-customer-cell"><div className="admin-customer-avatar admin-letter-avatar">{getInitials(customer.name || customer.email || "Customer")}</div><span>{customer.name}</span></div></td>
                          <td>{customer.email}</td>
                          <td>{customer.date}</td>
                          <td>{customer.orders}</td>
                          <td><span className={`admin-status-pill ${statusClass(customer.status)}`}>{customer.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "users" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Users</h2><p>Admin user management</p></div>
                <div className="admin-full-table-card">
                  <table className="admin-data-table">
                    <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
                    <tbody>
                      {staticUsers.map((user) => (
                        <tr key={user.email}>
                          <td><div className="admin-customer-cell"><div className="admin-customer-avatar admin-letter-avatar">{user.letter}</div><span>{user.name}</span></div></td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td><span className={`admin-status-pill ${statusClass(user.status)}`}>{user.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "categories" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Categories</h2><p>Manage product categories</p></div>
                <div className="admin-toolbar"><button className="admin-btn-add" onClick={() => showToast("Category added!", "success")}><PlusCircleIcon />Add Category</button></div>
                <div className="admin-full-table-card">
                  <table className="admin-data-table">
                    <thead><tr><th>Category</th><th>Slug</th><th>Products</th><th>Status</th></tr></thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.slug}>
                          <td>{category.name}</td>
                          <td>{category.slug}</td>
                          <td>{category.count}</td>
                          <td><span className="admin-status-pill s-active">Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {activeSection === "analytics" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Analytics</h2><p>Detailed performance insights</p></div>
                <div className="admin-analytics-stats">
                  {[
                    { label: "Conversion Rate", value: "3.8%", trend: "0.4%", icon: <ActivityIcon /> },
                    { label: "Avg Order Value", value: "Rs. 2,450", trend: "5%", icon: <RupeeIcon /> },
                    { label: "Return Rate", value: "2.1%", trend: "0.3%", icon: <ClipboardIcon /> },
                    { label: "Repeat Customers", value: "42%", trend: "3%", icon: <UsersIcon /> },
                  ].map((card) => (
                    <div className="admin-stat-card" key={card.label}>
                      <div className="admin-stat-label">{card.label}</div>
                      <div className="admin-stat-row"><div className="admin-stat-icon orange">{card.icon}</div><div className="admin-stat-value analytics">{card.value}</div></div>
                      <div className="admin-stat-trend up">{card.trend} <span>this week</span></div>
                    </div>
                  ))}
                </div>
                <div className="admin-chart-card analytics-card">
                  <div className="admin-card-header"><span className="admin-card-title">Revenue Over Time</span></div>
                  <div className="admin-analytics-bars">
                    {analyticsSeries.values.map((value, index) => (
                      <div className="admin-analytics-col" key={`analytics-${index}`}>
                        <div className="admin-analytics-track"><span style={{ height: `${(value / analyticsMax) * 100}%` }} /></div>
                        <small>{analyticsSeries.labels[index]}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="admin-page-section active">
                <div className="admin-inner-header"><h2>Settings</h2><p>Configure your store</p></div>
                <div className="admin-form-panel settings-panel">
                  <div className="admin-form-field"><label>Store Name</label><input value={settingsForm.storeName} onChange={(e) => setSettingsForm((c) => ({ ...c, storeName: e.target.value }))} /></div>
                  <div className="admin-form-field"><label>Store Email</label><input value={settingsForm.storeEmail} onChange={(e) => setSettingsForm((c) => ({ ...c, storeEmail: e.target.value }))} /></div>
                  <div className="admin-form-field"><label>Phone</label><input value={settingsForm.phone} onChange={(e) => setSettingsForm((c) => ({ ...c, phone: e.target.value }))} /></div>
                  <div className="admin-form-field"><label>Currency</label><select value={settingsForm.currency} onChange={(e) => setSettingsForm((c) => ({ ...c, currency: e.target.value }))}><option>INR (â‚¹)</option><option>USD ($)</option><option>AUD (A$)</option></select></div>
                  <div className="admin-form-field"><label>Address</label><textarea value={settingsForm.address} onChange={(e) => setSettingsForm((c) => ({ ...c, address: e.target.value }))} /></div>
                  <button className="admin-btn-save" type="button" onClick={() => showToast("Settings saved!", "success")}>Save Settings</button>
                </div>
              </div>
            )}
          </div>

          <div className="admin-footer">
            <span>Â© 2026 <a href="#">Shooz</a>. All rights reserved.</span>
            <span>Designed with <span className="heart">â™¥</span> by Shopix Team</span>
          </div>
        </div>
      </div>

      <div className={`admin-modal-overlay ${productModalOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setProductModalOpen(false); }}>
        <div className="admin-modal">
          <div className="admin-modal-header">
            <h3>{editingProductId ? "Edit Product" : "Add New Product"}</h3>
            <button className="admin-modal-close" onClick={() => setProductModalOpen(false)}><DeleteIcon /></button>
          </div>
          <form className="admin-modal-body" onSubmit={saveProduct}>
            <div className="admin-form-row">
              <div className="admin-form-field"><label>Product Name</label><input name="name" value={productForm.name} onChange={handleProductChange} placeholder="e.g. Nike Air Max" /></div>
              <div className="admin-form-field"><label>Brand</label><input name="brand" value={productForm.brand} onChange={handleProductChange} placeholder="e.g. Nike" /></div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-field"><label>Price (Rs.)</label><input name="price" type="number" value={productForm.price} onChange={handleProductChange} placeholder="2500" /></div>
              <div className="admin-form-field"><label>Stock</label><input name="stock" type="number" value={productForm.stock} onChange={handleProductChange} placeholder="50" /></div>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-field"><label>Category</label><input name="category" value={productForm.category} onChange={handleProductChange} placeholder="Athletic Footwear" /></div>
              <div className="admin-form-field"><label>Gender</label><select name="gender" value={productForm.gender} onChange={handleProductChange}><option>Unisex</option><option>Men</option><option>Women</option><option>Kids</option></select></div>
            </div>
            <div className="admin-form-field"><label>Sizes</label><input name="sizes" value={productForm.sizes} onChange={handleProductChange} placeholder="6, 7, 8" /></div>
            <div className="admin-form-field"><label>Description</label><textarea name="description" value={productForm.description} onChange={handleProductChange} placeholder="Product description..." /></div>
            <div className="admin-form-field"><label>Image URL</label><input name="pimage" value={productForm.pimage} onChange={handleProductChange} placeholder="https://..." /></div>
            <div className="admin-modal-footer">
              <button type="button" className="admin-btn-cancel" onClick={() => setProductModalOpen(false)}>Cancel</button>
              <button type="submit" className="admin-btn-save" disabled={isSubmittingProduct}>{editingProductId ? "Update Product" : "Save Product"}</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`admin-modal-overlay ${orderModalOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setOrderModalOpen(false); }}>
        <div className="admin-modal order-modal">
          <div className="admin-modal-header">
            <h3>{selectedOrder ? `Order #${String(selectedOrder._id).slice(-5)}` : "Order Details"}</h3>
            <button className="admin-modal-close" onClick={() => setOrderModalOpen(false)}><DeleteIcon /></button>
          </div>
          {selectedOrder ? (
            <div className="admin-modal-body">
              <div className="admin-order-detail-grid">
                <div><small>Customer</small><strong>{selectedOrder.name || "Customer"}</strong></div>
                <div><small>Date</small><strong>{new Date(selectedOrder.createdAt || Date.now()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</strong></div>
                <div><small>Product</small><strong>{selectedOrder.productid?.name || "Product"}</strong></div>
                <div><small>Amount</small><strong>{formatCurrency(selectedOrder.amount || selectedOrder.productid?.price)}</strong></div>
                <div><small>Email</small><strong>{selectedOrder.email || "â€”"}</strong></div>
                <div><small>Mobile</small><strong>{selectedOrder.mobileno || "â€”"}</strong></div>
              </div>
              <div className="admin-form-field"><label>Address</label><textarea readOnly value={selectedOrder.address || "No address added"} /></div>
              <div className="admin-order-status-actions">
                <button className="admin-btn-save" onClick={() => updateOrderStatus(selectedOrder._id, "Confirmed")} disabled={updatingId === selectedOrder._id}>Confirm Order</button>
                <button className="admin-btn-cancel danger" onClick={() => updateOrderStatus(selectedOrder._id, "Declined")} disabled={updatingId === selectedOrder._id}>Cancel Order</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Admin;












