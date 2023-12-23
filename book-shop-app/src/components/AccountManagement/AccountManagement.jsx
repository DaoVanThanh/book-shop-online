import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {getUserInfo, updateUser,} from "../../apiServices/AccountManagementService";
import {Row} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";

function FormExample() {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [validated, setValidated] = useState(false);
  const [initialUserData, setInitialUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserInfo()
        .then((response) => {
          const initialData = {
            username: response.data.username,
            fullName: response.data.fullName,
            phoneNumber: response.data.phoneNumber,
            address: response.data.address,
          };
          setInitialUserData(initialData);
          setUserData(initialData);
        })
        .catch((error) => {
          console.error("Error fetching account info", error);
        });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setUserData(initialUserData);
    setIsEditing(false);
  };

  const handleSaveClick = (event) => {
    if (!userData.fullName || !userData.address || !userData.phoneNumber) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Gọi hàm updateUser từ apiService
      updateUser(userData)
          .then((response) => {
            setInitialUserData(userData);
            toast("Cập nhật tài khoản thành công");
          })
          .catch((error) => {
            console.error("Error updating user information", error);
          });
      setIsEditing(false);
    }
    setValidated(true);
  };

  return (
      <div
          className="d-flex"
          style={{alignItems: "top", paddingLeft: "25%"}}
      >
        <Form
            noValidate
            validated={validated}
            onSubmit={handleSaveClick}
            style={{width: "40%", paddingTop: '20px',paddingBottom: '20px'}}
        >
          <Form.Floating
              className="mb-3"
              as={Col}
              md="20"
              id="validationCustom01"
              style={{paddingTop: '5px'}}
          >
            <Form.Control
                id="username"
                placeholder="username"
                required
                type="text"
                value={userData.username}
                disabled={true}
            />
            <label htmlFor="username">Username</label>
          </Form.Floating>

          <Form.Floating
              className="mb-3"
              as={Col}
              md="20"
              id="validationCustom02"
          >
            <Form.Control
                id="fullname"
                required
                type="text"
                placeholder="fullname"
                value={userData.fullName}
                disabled={!isEditing}
                onChange={(e) =>
                    setUserData({...userData, fullName: e.target.value.trim()})
                }
            />
            <label htmlFor="fullname">Họ và tên</label>
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập đầy đủ họ và tên.
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Floating
              className="mb-3"
              as={Col}
              md="20"
              id="validationCustom03"
          >
            <Form.Control
                id="sdt"
                required
                type="text"
                placeholder="sdt"
                value={userData.phoneNumber}
                disabled={!isEditing}
                onChange={(e) =>
                    setUserData({...userData, phoneNumber: e.target.value.trim()})
                }
            />
            <label htmlFor="sdt">Số điện thoại</label>
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập số điện thoại.
            </Form.Control.Feedback>
          </Form.Floating>
          <Form.Floating
              className="mb-3"
              as={Col}
              md="15"
              id="validationCustom04"
          >
            <Form.Control
                id="dc"
                required
                type="text"
                placeholder="dc"
                value={userData.address}
                disabled={!isEditing}
                onChange={(e) =>
                    setUserData({...userData, address: e.target.value})
                }
            />
            <label htmlFor="dc">Địa chỉ</label>
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập địa chỉ.
            </Form.Control.Feedback>
          </Form.Floating>
          <Row className="mt-3">
            <Col xs={2} md={7}>
              <Button variant="secondary" onClick={handleCancelClick}>
                Hủy
              </Button>
            </Col>
            <Col xs={3} md={15}>
              <Button
                  variant="success"
                  onClick={isEditing ? handleSaveClick : handleEditClick}
              >
                {isEditing ? "Lưu" : "Sửa"}
              </Button>
            </Col>
          </Row>
        </Form>
        <ToastContainer/>
      </div>
  );
}

export default FormExample;
