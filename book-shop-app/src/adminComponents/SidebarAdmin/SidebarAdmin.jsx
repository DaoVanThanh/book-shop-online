import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleSelectItem = (eventKey) => {
    navigate(eventKey);
  };
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  }
  return (
    <div className="sidebar-ad">
      <Nav
        onSelect={(eventKey) => {
          handleSelectItem(eventKey);
        }}
        defaultActiveKey="/dashboard"
        className="flex-column"
      >
        <Nav.Item>
          <Nav.Link eventKey="/products">Quản lý sản phẩm</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/orders">Quản lý đơn hàng</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/statistics">Thống kê</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
        </Nav.Item> */}
      </Nav>
    </div>
  );
};

export default Sidebar;
