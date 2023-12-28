import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import "./styleLogin.css";
import { Button } from "react-bootstrap";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [alertLogin, setAlertLogin] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("accessToken")) {
      const token = localStorage.getItem("accessToken");
      if (jwtDecode(token).role == "ROLE_USER") {
        window.location.href = "/";
      } else if (jwtDecode(token).role == "ROLE_ADMIN") {
        window.location.href = "/products";
      }
    }
  },[])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (!username || !password) {
      setLoginError("Tên tài khoản hoặc mật khẩu không hợp lệ!");
    } else {
      axios
        .post("http://localhost:8080/api/auth/authenticate", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            const accessToken = response.data.accessToken;

            localStorage.setItem("accessToken", accessToken);

            const storedAccessToken = localStorage.getItem("accessToken");
            if (storedAccessToken) {
              if (storedAccessToken === response.data.accessToken) {
                if (jwtDecode(storedAccessToken).role === "ROLE_USER") {
                  window.location.href = "/";
                } else if (jwtDecode(storedAccessToken).role === "ROLE_ADMIN") {
                  window.location.href = "/products";
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setLoginError("Tên đăng nhập hoặc mật khẩu không hợp lệ!");
        });
    }
  };
  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            BookStore <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              Thả tâm hồn vào sách
            </span>
          </h1>

          <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
            Đến với cửa hàng của chúng tôi, bạn không chỉ đến với nơi bán những
            cuốn sách chất lượng và uy tín, hãy cùng cảm nhận và hoà mình vào lý
            tưởng của tác giả trong những cuốn sách nổi tiếng, hay và tâm đắc
            nhất của cửa hàng chúng tôi.
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5">
              <MDBInput
                wrapperClass="mb-3"
                id="form3"
                type="text"
                placeholder="Tên tài khoản"
                value={username}
                onChange={handleUsernameChange}
              />

              <MDBInput
                wrapperClass="mb-3"
                id="form4"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
              />
              {loginError && <p className="text-danger">{loginError}</p>}
              <Button className="w-100 mb-3" size="md" onClick={handleLogin}>
                Đăng nhập
              </Button>

              <div className="text-center">
                <p>Bạn chưa có tài khoản?</p>
                <Link to="/register">Đăng kí</Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
