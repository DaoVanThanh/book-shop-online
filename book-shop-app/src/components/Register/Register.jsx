import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import {Button} from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";

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
    const [fullNameError, setFullNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [usernameError, setUsernameError] = useState("");


    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setFullName(value);
        if (!value) {
            setFullNameError("Vui lòng nhập họ và tên");
        } else {
            setFullNameError("");
        }
    };

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        if (!value) {
            setAddressError("Vui lòng nhập địa chỉ");
        } else {
            setAddressError("");
        }
    };

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
        if (!value) {
            setPhoneNumberError("Vui lòng nhập số điện thoại");
        } else {
            setPhoneNumberError("");
        }
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        if (!value) {
            setUsernameError("Vui lòng nhập tên tài khoản");
        } else {
            setUsernameError("");
        }
    };


    const handlePasswordChange = (event) => {
        const password = event.target.value;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (strongRegex.test(password)) {
            setPassword(password);
            setPasswordError("");
        } else {
            setPassword(password);
            setPasswordError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt!");
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
        if (passwordError || confirmPasswordError || fullNameError || addressError || phoneNumberError || usernameError) {
            alert("Vui lòng điền đầy đủ thông tin và sửa các lỗi trước khi đăng ký!");
            return;
        }

        axios
            .post("http://fall2324w3g8.int3306.freeddns.org/api/auth/register", { username, password, address, phoneNumber, fullName })
            .then((response) => {
                // const token = response.data.token;
                // localStorage.setItem("token", token);
                // setToken(token);
                alert("Đăng kí tài khoản thành công");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Đăng kí tài khoản không thành công", error);
                alert("Các thông tin nhập không hợp lệ !");
            });
    };
    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                        BookShop <br />
                        <span style={{color: 'hsl(218, 81%, 75%)'}}>Đăng kí thành viên  </span>
                    </h1>

                    <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                        Đến với cửa hàng của chúng tôi, bạn không chỉ đến
                        với nơi bán những cuốn sách chất lượng và uy tín,
                        hãy cùng cảm nhận và hoà mình vào lý tưởng của tác giả
                        trong những cuốn sách nổi tiếng, hay và tâm đắc nhất của cửa hàng
                        chúng tôi.
                    </p>

                </MDBCol>

                <MDBCol md='6' className='position-relative'>

                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='p-5'>

                            <MDBInput wrapperClass='mb-4' id='fullNameInput' type='text' placeholder="Họ và tên" value={fullName} onChange={handleFullNameChange}/>
                            {fullNameError && <div style={{ color: 'red', textAlign:"justify" }}>{fullNameError}</div>}

                            <MDBInput wrapperClass='mb-4' id='addressInput' type='text' placeholder="Địa chỉ" value={address} onChange={handleAddressChange}/>
                            {addressError && <div style={{ color: 'red', textAlign:"justify" }}>{addressError}</div>}

                            <MDBInput wrapperClass='mb-4' id='phoneInput' type='number' placeholder="Số điện thoại" value={phoneNumber} onChange={handlePhoneChange}/>
                            {phoneNumberError && <div style={{ color: 'red', textAlign:"justify" }}>{phoneNumberError}</div>}

                            <MDBInput wrapperClass='mb-4' id='usernameInput' type='text' placeholder="Tên tài khoản" value={username} onChange={handleUsernameChange}/>
                            {usernameError && <div style={{ color: 'red', textAlign:"justify" }}>{usernameError}</div>}
                            <MDBInput wrapperClass='mb-4' id='passwordInput' type='password' placeholder="Mật khẩu" value={password} onChange={handlePasswordChange}/>
                            {passwordError && <div style={{ color: 'red', textAlign:"justify" }}>{passwordError}</div>}

                            <MDBInput wrapperClass='mb-4' id='confirmPasswordInput' type='password' placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                            {confirmPasswordError && <div style={{ color: 'red', textAlign:"justify" }}>{confirmPasswordError}</div>}

                            <Button className='w-100 mb-4' size='md' onClick={handleRegister}>Đăng kí</Button>

                            <div className="text-center">
                                <p>Bạn đã có tài khoản?</p>
                                <Link to="/login">Đăng nhập</Link>
                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>
        <ToastContainer />
        </MDBContainer>
    );
}

export default Register;