import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {changePassword} from "../../api/ChangePasswordApi/apiService";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };

    const handlePasswordChange = () => {
        if (newPassword  !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không trùng khớp. Vui lòng nhập lại.');
        } else if (!isPasswordValid(newPassword)) {
            setError('Mật khẩu không đáp ứng yêu cầu an toàn. Vui lòng thử lại.');
        } else {
           changePassword({ oldPassword, newPassword },config)
                .then((response) => {
                    // Xử lý kết quả từ API nếu cập nhật thành công
                    console.log(response.data);
                    alert(response.data);
                    localStorage.clear();
                })
                .catch((error) => {
                    // Xử lý lỗi từ API nếu có lỗi
                    console.error(error);
                    setError('Mật khẩu cũ không đúng. Vui lòng nhập lại');
                });
        }
    };

    const isPasswordValid = (password) => {
        // Sử dụng biểu thức chính quy (regex) để kiểm tra mật khẩu
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };
    return (
        <div className="d-flex justify-content-center" style={{ alignItems: "top" }}>
            <Form style={{ width: "30%" }}>
                <h1>Đổi Mật Khẩu</h1>
                <Form.Group controlId="oldPassword" >
                    <Form.Label className="mt-3">Mật khẩu cũ</Form.Label>
                    <Form.Control
                        type="password"
                       // placeholder="Nhập mật khẩu cũ"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="newPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                       // placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label className="mt-3">Xác nhận Mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                     //   placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}

                <Button variant="primary" onClick={handlePasswordChange}   className="mt-3">
                    Đổi Mật Khẩu
                </Button>
            </Form>
        </div>
    );
}

export default ChangePassword;
