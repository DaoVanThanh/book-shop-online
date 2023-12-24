import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import ProductManagement from "./ProductManagement/ProductManagement";
import OrderManagement from "./OrderManagement/OrderManagement";
import Statistic from "./Statistics/Statistic";
import "./admin.css";
import NotFound from "../components/NotFound/NotFound";
import logo from "../logo.png";
const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <img
    src={logo}
    alt="Logo book shop"
    style={{
        width: "100px",
        borderRadius: "50%",
        margin: "20px",
    }}
    />
        <SidebarAdmin />
      </div>
      <div className="admin-content">
        <Routes>
          <Route>
              <Route path="" element={<ProductManagement/>}/>
              <Route path="/products" element={<ProductManagement/>}/>
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/statistics" element={<Statistic/>}/>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
