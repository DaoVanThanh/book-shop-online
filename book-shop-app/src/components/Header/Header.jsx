import React from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleShop = () => {
    navigate("/shop");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const accountManager = () => {
    navigate("/accountManager");
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleHome}>BOOK STORE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
            <Nav.Link onClick={handleAbout}>About</Nav.Link>
            <Nav.Link onClick={handleShop}>Shop</Nav.Link>
            <Nav.Link onClick={handleContact}>Contact</Nav.Link>
            <Nav.Link onClick={handleCart}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            <NavDropdown
              title={
                <span>
                  <i className="fa-solid fa-user"></i>
                  FullName
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={accountManager}>Quản lý tài khoản</NavDropdown.Item>
              <NavDropdown.Item href="#">Đơn hàng của tôi</NavDropdown.Item>
              <NavDropdown.Item href="#">Đổi mật khẩu</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
