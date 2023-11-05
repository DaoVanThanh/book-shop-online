import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebarAd">
      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Item>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/products" className="nav-link">Quản lý sản phẩm</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/orders" className="nav-link">Quản lý đơn hàng</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/statistics" className="nav-link">Thống kê</Link>
        </Nav.Item>
        {/* Thêm các liên kết khác cho các trang Admin của bạn */}
      </Nav>
    </div>
  )
}

export default Sidebar