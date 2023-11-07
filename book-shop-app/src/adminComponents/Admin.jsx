import React from "react";
import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import Dashboard from "./Dashboard/Dashboard";
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
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/products" element={<ProductManagement/>}/>
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/statistics" element={<Statistic/>}/>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
