import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (strongRegex.test(password)) {
            setPassword(password);
            setPasswordError("");
        } else {
            setPassword(password);
            setPasswordError("Mật khẩu phải bao gồm 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt!");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        if (confirmPassword === password) {
            setConfirmPassword(confirmPassword);
            setConfirmPasswordError("");
        } else {
            setConfirmPassword(confirmPassword);
            setConfirmPasswordError("Mật khẩu nhập lại không khớp!");
        }
    };

    const handleRegister = () => {
        if (passwordError || confirmPasswordError) {
            alert("Mật khẩu không hợp lệ !");
            return;
        }

        axios
            .post("http://localhost:8080/api/auth/register", { username, password, address, phoneNumber, fullName })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setToken(token);
                alert("Đăng kí tài khoản thành công");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Đăng kí tài khoản không thành công", error);
                alert("Đăng kí tài khoản không thành công");
            });
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Đăng kí tài khoản</h2>
                    <MDBInput wrapperClass='mb-4' label='Tên của bạn' size='lg' id='form1' type='text' onChange={handleFullNameChange} />
                    <MDBInput wrapperClass='mb-4' label='Địa chỉ' size='lg' id='form-address' type='text' onChange={handleAddressChange} />
                    <MDBInput wrapperClass='mb-4' label='Số điện thoại' size='lg' id='form-phone' type='number' onChange={handlePhoneChange} />
                    <MDBInput wrapperClass='mb-4' label='Tên người dùng của bạn' size='lg' id='form2' type='text' onChange={handleUsernameChange} />
                    <MDBInput wrapperClass='mb-4' label='Mật khẩu' size='lg' id='form3' type='password' onChange={handlePasswordChange} />
                    {passwordError && <div className="text-danger">{passwordError}</div>}
                    <MDBInput wrapperClass='mb-4' label='Nhập lại mật khẩu' size='lg' id='form4' type='password' onChange={handleConfirmPasswordChange} />
                    {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                    <div className='d-flex flex-row justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Tôi đồng ý tất cả các tuyên bố trong Điều khoản dịch vụ' />
                    </div>
                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleRegister}>Đăng kí</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Register;
