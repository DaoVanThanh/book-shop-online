import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.png";
const Footer = () => {
  const navigate = useNavigate();
  const handleAbout = () => {
    navigate("/about");
  };
  const handlePolicy = () => {
    navigate("/policy");
  };
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section
        className="d-flex justify-content-center p-4 border-bottom"
        style={{ color: "#fff", backgroundColor: "#228b22" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Hãy kết nối với chúng tôi trên các mạng xã hội:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="" style={{ borderTop: "1px solid green" }}>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              {/* <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Book Store
              </h6> */}
              <img
                src={logo}
                alt="Logo book shop"
                style={{
                  width: "100px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              ></img>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "green" }}
              >
                Giới thiệu
              </h6>
              <p
                onClick={() => navigate("/about")}
                style={{ cursor: "pointer" }}
              >
                Về chúng tôi
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "green" }}
              >
                Dịch vụ
              </h6>
              <p
                onClick={() => navigate("/policy")}
                style={{ cursor: "pointer" }}
              >
                Chính sách
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "green" }}
              >
                Liên hệ
              </h6>
              <p>
                <MDBIcon icon="home" className="me-2" /> 144 Xuân Thủy, Cầu
                Giấy, Hà Nội
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@bookshop.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />
                02435146875
              </p>
              <p>
                <MDBIcon icon="mobile-screen-button" className="me-3" />{" "}
                0903244248
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
};

export default Footer;
