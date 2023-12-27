import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { changePassword } from "../../apiServices/ChangePasswordService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp. Vui lòng nhập lại.");
    } else if (!isPasswordValid(newPassword)) {
      setError("Mật khẩu không đáp ứng yêu cầu an toàn. Vui lòng thử lại.");
    } else {
      await changePassword({ oldPassword, newPassword })
        .then((response) => {
          // Xử lý kết quả từ API nếu cập nhật thành công
          localStorage.clear();
          navigate("/login")
          toast("Đổi mật khẩu thành công. Vui lòng đăng nhập lại!");
        })
        .catch((error) => {
          // Xử lý lỗi từ API nếu có lỗi
          console.error(error);
          setError("Mật khẩu cũ không đúng. Vui lòng nhập lại");
        });
    }
  };

  const isPasswordValid = (password) => {
    // Sử dụng biểu thức chính quy (regex) để kiểm tra mật khẩu
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{ alignItems: "top", marginTop: "20px" }}
    >
      <Form style={{ width: "50%" }}>
        <Form.Floating id="oldPassword" className="mb-3">
          <Form.Control
            id="old"
            type="password"
            placeholder="Nhập mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <label htmlFor="old">Nhập mật khẩu cũ</label>
        </Form.Floating>

        <Form.Floating id="newPassword" className="mb-3">
          <Form.Control
            id="new"
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="new">Nhập mật khẩu mới</label>
        </Form.Floating>

        <Form.Floating id="confirmPassword" className="mb-3">
          <Form.Control
            id="confirm"
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label htmlFor="confirm">Xác nhận mật khẩu mới</label>
        </Form.Floating>
        {error && <p className="text-danger">{error}</p>}

        <Button
          variant="success"
          onClick={handlePasswordChange}
          className="mb-3"
        >
          Đổi Mật Khẩu
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
