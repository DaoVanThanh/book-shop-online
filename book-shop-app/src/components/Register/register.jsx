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
}
    from 'mdb-react-ui-kit';
import "./styleRegister.css"
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
            setPasswordError("Mật khẩu phải bao gồm ít nhất 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt!");
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

                            <MDBInput wrapperClass='mb-4' id='form1' type='text' placeholder="Tên của bạn" value={fullName} onChange={handleFullNameChange}/>
                            <MDBInput wrapperClass='mb-4' id='form2' type='text' placeholder="Địa chỉ" value={address} onChange={handleAddressChange}/>
                            <MDBInput wrapperClass='mb-4' id='form3' type='number' placeholder="Số điện thoại" value={phoneNumber} onChange={handlePhoneChange}/>
                            <MDBInput wrapperClass='mb-4' id='form4' type='text' placeholder="Tên tài khoản" value={username} onChange={handleUsernameChange}/>
                            <MDBInput wrapperClass='mb-4' id='form5' type='password' placeholder="Mật khẩu" value={password} onChange={handlePasswordChange}/>
                            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                            <MDBInput wrapperClass='mb-4' id='form6' type='password' placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                            {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}

                            <MDBBtn className='w-100 mb-4' size='md' onClick={handleRegister}>Đăng kí</MDBBtn>

                            <div className="text-center">
                                <p>Bạn đã có tài khoản?</p>
                                <Link to="/login">Đăng nhập</Link>
                            </div>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Register;