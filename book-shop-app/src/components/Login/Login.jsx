import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        axios.post('http://localhost:8080/api/auth/authenticate', { username, password })
            .then((response) => {
                console.log(response.data.accessToken);
                if (response.data.accessToken) {
                    setLoggedIn(true);
                    setLoginError(null);

                    const accessToken = response.data.accessToken;

                    localStorage.setItem('accessToken', accessToken);

                    const storedToken = localStorage.getItem('accessToken');

                    if (storedToken) {
                        if (storedToken === response.data.accessToken) {
                            alert("Đăng nhập thành công");
                            navigate("/Home");
                        }
                    } else {
                        alert("Đăng nhập thất bại");
                    }
                } else {
                    setLoggedIn(false);
                    setLoginError("Tên đăng nhập hoặc mật khẩu không hợp lệ");
                }
            })
            .catch((error) => {
                setLoggedIn(false);
                setLoginError("Đăng nhập thất bại");
                alert("Đăng nhập thất bại");
            });
    };

    return (
        <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="12">
                    <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                        <MDBCardBody className="p-5 w-100 d-flex flex-column">
                            <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
                            <p className="text-white-50 mb-3">Vui lòng nhập tên đăng nhập và mật khẩu!</p>
                            <MDBInput
                                wrapperClass="mb-4 w-100"
                                label="Tên đăng nhập"
                                id="formControlLg"
                                type="text"
                                size="lg"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <MDBInput
                                wrapperClass="mb-4 w-100"
                                label="Mật khẩu"
                                id="formControlLg"
                                type="password"
                                size="lg"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <MDBCheckbox name="flexCheck" id="flexCheckDefault" className="mb-4" label="Ghi nhớ mật khẩu" />
                            <MDBBtn size="lg" style={{ width: '100%' }} onClick={handleLogin}>
                                Đăng nhập
                            </MDBBtn>
                            {loginError && <p className="text-danger mt-3">{loginError}</p>}
                            <hr className="my-4" />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
