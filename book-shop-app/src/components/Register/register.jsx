import React, { Component } from "react";
import axios from "axios";

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            address: "",
            phoneNumber: "",
            username: "",
            password: "",
            confirmPassword: "",
            token: "",
            passwordError: "",
            confirmPasswordError: "",
        };
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };
    handleAddressChange = (event) => {
        this.setState({ address: event.target.value });
    };

    handlePhoneChange = (event) => {
        this.setState({ phoneNumber: event.target.value });
    };

    handlefullNameChange = (event) => {
        this.setState({ fullName: event.target.value });
    };

    handlePasswordChange = (event) => {
        const password = event.target.value;
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (strongRegex.test(password)) {
            this.setState({ password, passwordError: "" });
        } else {
            this.setState({ password, passwordError: "Mật khẩu phải bao gồm 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt!" });
        }
    };

    handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        if (confirmPassword === this.state.password) {
            this.setState({ confirmPassword, confirmPasswordError: "" });
        } else {
            this.setState({ confirmPassword, confirmPasswordError: "Mật khẩu nhập lại không khớp!" });
        }
    };

    handleRegister = () => {
        const { username, password, fullName, phoneNumber, address, passwordError, confirmPasswordError } = this.state;

        if (passwordError || confirmPasswordError) {
            alert("Mật khẩu không hợp lệ !")
            return;
        }

        axios
            .post("http://localhost:8080/api/auth/register", { username, password, address, phoneNumber, fullName})
            .then((response) => {
                const token = response.data.token;

                localStorage.setItem("token", token);

                this.setState({ token });
                alert("Đăng kí tài khoản thành công");
            })
            .catch((error) => {
                console.error("Đăng kí tài khoản không thành công", error);
            });
    };

    render() {
        const { username, password, fullName, phoneNumber, address, passwordError, confirmPasswordError } = this.state;

        return (
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Đăng kí tài khoản</h2>
                        <MDBInput wrapperClass='mb-4' label='Tên của bạn' size='lg' id='form1' type='text' onChange={this.handlefullNameChange} />
                        <MDBInput wrapperClass='mb-4' label='Địa chỉ' size='lg' id='form-address' type='text' onChange={ this.handleAddressChange} />
                        <MDBInput wrapperClass='mb-4' label='Số điện thoại' size='lg' id='form-phone' type='number' onChange={ this.handlePhoneChange} />
                        <MDBInput wrapperClass='mb-4' label='Tên người dùng của bạn' size='lg' id='form2' type='text' onChange={ this.handleUsernameChange} />
                        <MDBInput wrapperClass='mb-4' label='Mật khẩu' size='lg' id='form3' type='password' onChange={this.handlePasswordChange} />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                        <MDBInput wrapperClass='mb-4' label='Nhập lại mật khẩu' size='lg' id='form4' type='password' onChange={this.handleConfirmPasswordChange} />
                        {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                        <div className='d-flex flex-row justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Tôi đồng ý tất cả các tuyên bố trong Điều khoản dịch vụ' />
                        </div>
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={this.handleRegister}>Đăng kí</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
}

export default Register;
