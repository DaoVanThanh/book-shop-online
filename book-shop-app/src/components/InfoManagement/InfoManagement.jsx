import React from "react";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./InfoManagement.css";

const InfoManagement = () => {
  const navigate = useNavigate();
  const handleSelectItem = (eventKey) => {
    navigate(eventKey);
  };
  return (
    <Tab.Container id="left-tabs-example">
      <Row>
        <Col sm={2}>
          <Nav
            variant="pills"
            className="flex-column"
            onSelect={(eventKey) => {
              handleSelectItem(eventKey);
            }}
          >
            <Nav.Item>
              <Nav.Link eventKey="/user/account">Quản lý tài khoản</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/user/order">Đơn hàng của tôi</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/user/changePassword">Đổi mật khẩu</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Outlet />
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default InfoManagement;
