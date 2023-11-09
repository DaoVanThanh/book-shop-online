import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import ProductManagement from "./ProductManagement/ProductManagement";
import OrderManagement from "./OrderManagement/OrderManagement";
import Statistic from "./Statistics/Statistic";
import './admin.css'

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <SidebarAdmin />
      </div>
      <div className="content">
        <Routes>
          <Route>
            <Route path="/products" element={<ProductManagement />}></Route>
            <Route path="/orders" element={<OrderManagement />}></Route>
            <Route path="/statistics" element={<Statistic />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
