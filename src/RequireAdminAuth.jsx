import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { showToast } from "./utils/toast";
import { verifyAdminJwt } from "./utils/auth";

function RequireAdminAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const isVerified = await verifyAdminJwt();
      if (!isMounted) return;

      if (!isVerified) {
        showToast("Please login as admin first");
        setStatus("denied");
        return;
      }

      setStatus("allowed");
    }

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (status === "checking") {
    return <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>Checking admin session...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}

export default RequireAdminAuth;

