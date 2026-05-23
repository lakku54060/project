import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { showToast } from "./utils/toast";
import { savePostLoginRedirect, verifyCustomerJwt } from "./utils/auth";

function RequireCustomerAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const isVerified = await verifyCustomerJwt();
      if (!isMounted) return;

      if (!isVerified) {
        savePostLoginRedirect(`${location.pathname}${location.search}`);
        showToast("Please login or register first to continue");
        setStatus("denied");
        return;
      }

      setStatus("allowed");
    }

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [location.pathname, location.search]);

  if (status === "checking") {
    return <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>Checking login session...</div>;
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireCustomerAuth;

