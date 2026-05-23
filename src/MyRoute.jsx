import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FetchPostexample from "./FetchPostexample";
import Regform from "./Regform";
import Admin from "./Admin";
import FetchGetexample from "./FetchGetexample";
import Home from "./Home";
import Productdetails from "./Productdetails";
import Shippingdetails from "./Shippingdetails";
import Userpanel from "./Userpanel";
import Adminlogin from "./Adminlogin";
import ShopPage from "./ShopPage";
import CartPage from "./CartPage";
import ToastContainer from "./ToastContainer";
import RequireCustomerAuth from "./RequireCustomerAuth";
import RequireAdminAuth from "./RequireAdminAuth";

function MyRoute() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<FetchPostexample />} />
        <Route path="/reg" element={<Regform />} />
        <Route path="/Admin" element={<RequireAdminAuth><Admin /></RequireAdminAuth>} />
        <Route path="/test" element={<FetchGetexample />} />
        <Route path="/" element={<Home />} />
        <Route path="/collections/all" element={<ShopPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<RequireCustomerAuth><Shippingdetails /></RequireCustomerAuth>} />
        <Route path="/products/:id" element={<Productdetails />} />
        <Route path="/order/:id" element={<RequireCustomerAuth><Shippingdetails /></RequireCustomerAuth>} />
        <Route path="/userpanel" element={<RequireCustomerAuth><Userpanel /></RequireCustomerAuth>} />
        <Route path="/adminlogin" element={<Adminlogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoute;


