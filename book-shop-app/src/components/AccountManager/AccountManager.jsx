import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { getUserInfo, updateUser } from "../../api/AccountManagementApi/apiService";

function AccountManager() {
    const [userData, setUserData] = useState({
        username: "",
        fullName: "",
        phoneNumber: "",
        address: "",
    });
    const [initialUserData, setInitialUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('accessToken');
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    };

    useEffect(() => {
        getUserInfo(config)
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

    const handleSaveClick = () => {
        if (!userData.fullName || !userData.address || !userData.phoneNumber) {
            alert("All fields are required.");
            setUserData(initialUserData);
            return;
        }

        // Gọi hàm updateUser từ apiService
        updateUser(userData,config)
            .then((response) => {
                setInitialUserData(userData);
                alert("User information updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating user information", error);
            });
        setIsEditing(false);
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col xs="2" className="d-flex align-items-center font-weight-bold">
                    Tên đăng nhập
                </Col>
                <Col xs="3">
                    <Form.Control type="text" value={userData.username} disabled={true}/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs="2" className="d-flex align-items-center font-weight-bold">
                    Tên người dùng
                </Col>
                <Col xs="3">
                    <Form.Control
                        type="text"
                        value={userData.fullName}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, fullName: e.target.value})
                        }
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs="2" className="d-flex align-items-center font-weight-bold ">
                    Số điện thoại
                </Col>
                <Col xs="3">
                    <Form.Control
                        type="text"
                        value={userData.phoneNumber}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, phoneNumber: e.target.value})
                        }
                    />
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs="2" className="d-flex align-items-center font-weight-bold ">
                    Địa chỉ
                </Col>
                <Col xs="3">
                    <Form.Control
                        type="text"
                        value={userData.address}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, address: e.target.value})
                        }
                    />
                </Col>
            </Row>
            <Row className="mt-3 mr-3">
                <Col xs="7">
                    <Button
                        variant="success"
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                    >
                        {isEditing ? "Lưu" : "Sửa"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleCancelClick}
                    >
                        Hủy
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountManager;
