import axios from "axios";
import { apiUrl } from "./api";

export function getCustomerSession() {
  const usertoken = localStorage.getItem("usertoken");
  const uid = localStorage.getItem("uid") || localStorage.getItem("cid");
  const email = localStorage.getItem("email");

  return {
    usertoken,
    uid,
    email,
  };
}

export function getAdminSession() {
  return {
    admintoken: localStorage.getItem("admintoken"),
    aid: localStorage.getItem("aid"),
    adminemail: localStorage.getItem("adminemail"),
  };
}

export function isCustomerLoggedIn() {
  const { usertoken, uid } = getCustomerSession();
  return Boolean(usertoken && uid && uid !== "undefined" && uid !== "null");
}

export function isAdminLoggedIn() {
  const { admintoken } = getAdminSession();
  return Boolean(admintoken && admintoken !== "undefined" && admintoken !== "null");
}

export async function verifyCustomerJwt() {
  const { usertoken, uid } = getCustomerSession();
  if (!usertoken || !uid || uid === "undefined" || uid === "null") return false;

  try {
    await axios.get(apiUrl("/verify-user"), {
      headers: { Authorization: `Bearer ${usertoken}` },
    });
    return true;
  } catch (error) {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("uid");
    localStorage.removeItem("cid");
    localStorage.removeItem("email");
    return false;
  }
}

export async function verifyAdminJwt() {
  const { admintoken } = getAdminSession();
  if (!admintoken || admintoken === "undefined" || admintoken === "null") return false;

  try {
    await axios.get(apiUrl("/verify-admin"), {
      headers: { Authorization: `Bearer ${admintoken}` },
    });
    return true;
  } catch (error) {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("aid");
    localStorage.removeItem("adminemail");
    return false;
  }
}

export function savePostLoginRedirect(path) {
  if (!path) return;
  localStorage.setItem("postLoginRedirect", path);
}

export function consumePostLoginRedirect() {
  const nextPath = localStorage.getItem("postLoginRedirect");
  if (nextPath) {
    localStorage.removeItem("postLoginRedirect");
    return nextPath;
  }
  return null;
}
