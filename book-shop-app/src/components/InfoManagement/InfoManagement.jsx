import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const InfoManagement = () => {
  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.clear();
  }

  return (
    <Tab.Container id="left-tabs-example">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column" style={{textAlign: "left"}}>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user/account">
                Quản lý tài khoản
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user/order">
                Đơn hàng của tôi
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/user/changePassword">
                Đổi mật khẩu
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10} style={{padding: "0"}}>
          <Tab.Content>
            <Outlet />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default InfoManagement;
