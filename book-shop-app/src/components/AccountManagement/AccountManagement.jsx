import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {getUserInfo, updateUser} from "../../apiServices/AccountManagementService";
import {Row} from "react-bootstrap";


function FormExample() {

    const [userData, setUserData] = useState({
        username: "",
        fullName: "",
        phoneNumber: "",
        address: "",
    });
    const [validated, setValidated] = useState(false);
    const [initialUserData, setInitialUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getUserInfo()
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


    const handleSaveClick = (event) => {
        if (!userData.fullName || !userData.address || !userData.phoneNumber) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Gọi hàm updateUser từ apiService
            updateUser(userData)
                .then((response) => {
                    setInitialUserData(userData);
                    alert('User information updated successfully.');
                })
                .catch((error) => {
                    console.error("Error updating user information", error);
                });
            setIsEditing(false);
        }
        setValidated(true);
    };

    return (
        <div className="d-flex justify-content-center" style={{ alignItems: "top" }}>
            <Form noValidate validated={validated} onSubmit={handleSaveClick} style={{ width: "30%" }}>
                <Form.Group as={Col} md="20" controlId="validationCustom01">
                    <Form.Label className="mt-2">Tên đăng nhập</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={userData.username} disabled={true}
                    />
                </Form.Group>

                <Form.Group as={Col} md="20" controlId="validationCustom02">
                    <Form.Label className="mt-2">Họ và tên</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={userData.fullName}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, fullName: e.target.value})
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập đầy đủ họ và tên.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="20" controlId="validationCustom02">
                    <Form.Label className="mt-2">Số điện thoại</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={userData.phoneNumber}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, phoneNumber: e.target.value})
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập số điện thoại.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="15" controlId="validationCustom02">
                    <Form.Label className="mt-2">Địa chỉ</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={userData.address}
                        disabled={!isEditing}
                        onChange={(e) =>
                            setUserData({...userData, address: e.target.value})
                        }
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập địa chỉ.
                    </Form.Control.Feedback>
                </Form.Group>
                <Row className="mt-3">
                    <Col xs={2} md={7}>
                        <Button
                            variant="success"
                            onClick={isEditing ? handleSaveClick : handleEditClick}
                        >
                            {isEditing ? "Lưu" : "Sửa"}
                        </Button>
                    </Col>
                    <Col xs={3} md={15} ml={4}>
                        <Button
                            variant="secondary"
                            onClick={handleCancelClick}
                        >
                            Hủy
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>

    );
}

export default FormExample;


