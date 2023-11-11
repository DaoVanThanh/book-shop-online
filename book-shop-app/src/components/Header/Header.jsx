import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "@fortawesome/fontawesome-free/css/all.min.css";

import logo from "../../logo.png";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCart = () => {
    if (localStorage.getItem("accessToken")) {
      navigate("/cart");
    } else {
      const currentURL = "/cart";
      localStorage.setItem("currentURL", currentURL);
      navigate("/login");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ marginRight: "40%" }}
        >
          <img
            src={logo}
            alt="Logo book shop"
            style={{ width: "100px", borderRadius: "50%", cursor: "pointer" }}
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/shop">
              Cửa hàng
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              Về chúng tôi
            </Nav.Link>
            <Nav.Link onClick={handleCart}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            {localStorage.getItem("accessToken") ? (
              <NavDropdown
                title={
                  <span>
                    <i className="fa-solid fa-user"></i>
                    {jwtDecode(localStorage.getItem("accessToken")).fullName}
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate("/user/account")}>
                  Quản lý tài khoản
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/user/order")}>
                  Đơn hàng của tôi
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => navigate("/user/changePassword")}
                >
                  Đổi mật khẩu
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to={"/register"}>
                  Đăng ký
                </Nav.Link>
                <Nav.Link as={NavLink} to={"/login"}>
                  Đăng nhập
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
