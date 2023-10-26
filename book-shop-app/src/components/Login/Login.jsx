import React, { Component } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            loginError: null,
        };
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleLogin = () => {
        const { username, password } = this.state;

        axios.post('http://localhost:8080/api/auth/authenticate', { username, password })
            .then((response) => {
                console.log(response.data.accessToken);
                if (response.data.accessToken) {
                    this.setState({ accessToken: response.data.accessToken, loggedIn: true, loginError: null });

                    const accessToken = response.data.accessToken;

                    localStorage.setItem('accessToken', accessToken);

                    const storedToken = localStorage.getItem('accessToken');

                    if (storedToken) {
                        if (storedToken === response.data.accessToken) {
                            alert("Đăng nhập thành công");
                        }
                    } else {
                        alert("Đăng nhập thất bại");
                    }
                } else {
                    this.setState({
                        loggedIn: false,
                        loginError: "Tên đăng nhập hoặc mật khẩu không hợp lệ",
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    loggedIn: false,
                    loginError: "Đăng nhập thất bại",
                });
                alert("Đăng nhập thất bại");
            });
    };

    render() {
        const { username, password, loginError } = this.state;

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
                                    onChange={this.handleUsernameChange}
                                />
                                <MDBInput
                                    wrapperClass="mb-4 w-100"
                                    label="Mật khẩu"
                                    id="formControlLg"
                                    type="password"
                                    size="lg"
                                    value={password}
                                    onChange={this.handlePasswordChange}
                                />
                                <MDBCheckbox name="flexCheck" id="flexCheckDefault" className="mb-4" label="Ghi nhớ mật khẩu" />
                                <MDBBtn size="lg" style={{ width: '100%' }} onClick={this.handleLogin}>
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
}

export default Login;
