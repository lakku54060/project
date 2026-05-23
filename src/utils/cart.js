export const CART_STORAGE_KEY = "shopix_cart";

function toNumber(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeItem(item) {
  return {
    productId: item.productId,
    name: item.name || "Footwear Item",
    price: toNumber(item.price),
    image: item.image || "",
    category: item.category || "General",
    gender: item.gender || "Unisex",
    size: item.size || "Free Size",
    quantity: Math.max(1, parseInt(item.quantity || 1, 10)),
  };
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeItem) : [];
  } catch {
    return [];
  }
}

export function saveCart(cartItems) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.map(normalizeItem)));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product, quantity = 1, size = "Free Size") {
  const cart = loadCart();
  const itemSize = size || "Free Size";
  const productId = product.productId || product._id || product.id;
  const key = `${productId}__${itemSize}`;

  const nextItem = normalizeItem({
    productId,
    name: product.name,
    price: product.price,
    image: product.image || product.pimage,
    category: product.category,
    gender: product.gender,
    size: itemSize,
    quantity,
  });

  const existingIndex = cart.findIndex((item) => `${item.productId}__${item.size}` === key);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += nextItem.quantity;
  } else {
    cart.push(nextItem);
  }

  saveCart(cart);
  return cart;
}

export function updateCartQuantity(productId, size, quantity) {
  const cart = loadCart();
  const next = cart.map((item) => {
    if (item.productId === productId && item.size === size) {
      return { ...item, quantity: Math.max(1, quantity) };
    }
    return item;
  });

  saveCart(next);
  return next;
}

export function removeFromCart(productId, size) {
  const next = loadCart().filter((item) => !(item.productId === productId && item.size === size));
  saveCart(next);
  return next;
}

export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartCount() {
  return loadCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  return loadCart().reduce((total, item) => total + item.price * item.quantity, 0);
}

export function expandCartItems(items) {
  return items.flatMap((item) => Array.from({ length: item.quantity }, () => item));
}

