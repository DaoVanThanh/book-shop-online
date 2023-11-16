import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
const Sidebar = () => {
  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.clear();
  }
  return (
    <div className="sidebar-ad">
      <Nav
        className="flex-column"
      >
        <Nav.Item>
          <Nav.Link as={NavLink} to="/products">Quản lý sản phẩm</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/orders">Quản lý đơn hàng</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/statistics">Thống kê</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
