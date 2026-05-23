import React, { useEffect, useState } from "react";
import "./toast.css";

function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function handleToast(event) {
      const nextToast = event.detail;
      if (!nextToast?.message) return;

      setToasts((current) => [...current, nextToast]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== nextToast.id));
      }, 3200);
    }

    window.addEventListener("shopix-toast", handleToast);
    return () => window.removeEventListener("shopix-toast", handleToast);
  }, []);

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type}`}>
          <span className="toast-dot" />
          <p>{toast.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;

