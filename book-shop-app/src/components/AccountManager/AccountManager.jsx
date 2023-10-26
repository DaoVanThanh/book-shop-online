import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
function AccountManager() {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [initialUserData, setInitialUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWkzMTQiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjk4MDgxNDg1LCJleHAiOjE2OTgxNzE0ODV9.3K0mp74oy-eqCP1MT6BjCWjsq9C6mlA4BBqm5YYO868";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/info", config)
      .then((response) => {
        const initialData = {
          username: response.data.username,
          fullName: response.data.fullName,
          phoneNumber: response.data.phoneNumber,
          address: response.data.address,
        };
        setInitialUserData(initialData); // Lưu trữ thông tin ban đầu
        setUserData(initialData);
      })
      .catch((error) => {
        console.error("Error fetching account info", error);
      });
  }, []); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component được tạo ra

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setUserData(initialUserData); // Khôi phục dữ liệu từ thông tin ban đầu
    setIsEditing(false); // Tắt chế độ sửa
  };

  const handleSaveClick = () => {
    if (!userData.fullName || !userData.address || !userData.phoneNumber) {
      alert("All fields are required.");
      setUserData(initialUserData);
      return;
    }
    axios
      .post("http://localhost:8080/api/user/update", userData, config)
      .then((response) => {
        setInitialUserData(userData);
        alert("User information updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating user information", error);
      });
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Account Manager</h1>
      <style>
        {`
                        /* CSS code to set table width to 50% and center it horizontally */
                        .table-container {
                            display: flex;
                            justify-content: center;
                        }
                        
                        table {
                            width: 50%;
                        }
                        .feature {
                        width : 18%;
                        }
                         table input[readonly] {
                            border: none;
                        }
                      
                    `}
      </style>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td className="feature">Tên đăng nhập</td>
              <td>
                <Form.Control
                  type="text"
                  value={userData.username}
                  disabled={true}
                />
              </td>
            </tr>
            <tr>
              <td>Tên người dùng</td>
              <td>
                <Form.Control
                  type="text"
                  value={userData.fullName}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <Form.Control
                  type="text"
                  value={userData.phoneNumber}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setUserData({ ...userData, phoneNumber: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <Form.Control
                  type="text"
                  value={userData.address}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn">
        <Button
          variant="success"
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className="mt-5"
        >
          {isEditing ? "Lưu" : "Sửa"}
        </Button>
        <Button
          variant="secondary"
          onClick={handleCancelClick}
          className="mt-5 ml -5"
        >
          Hủy
        </Button>
      </div>
    </div>
  );
}

export default AccountManager;
