import React, {useEffect, useState} from 'react'

import { Container, Row, Col, Image, Card, Button, Tab, Tabs, Nav, Form } from "react-bootstrap";
import axios from "axios";
import "./OrderManagement.css";
import { useHistory, useLocation } from 'react-router-dom';

const OrderManagement = () => {
    const [userData, setUserData] = useState({
        username: '',
        fullName: '',
        phoneNumber: '',
        address: ''
    });
    const [initialUserData, setInitialUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YWkzMTQiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiVVNFUiJ9XSwiaWF0IjoxNjk4MDgxNDg1LCJleHAiOjE2OTgxNzE0ODV9.3K0mp74oy-eqCP1MT6BjCWjsq9C6mlA4BBqm5YYO868";
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/user/info", config)
            .then(response => {
                const initialData = {
                    username: response.data.username,
                    fullName: response.data.fullName,
                    phoneNumber: response.data.phoneNumber,
                    address: response.data.address
                };
                setInitialUserData(initialData); // Lưu trữ thông tin ban đầu
                setUserData(initialData);
            })
            .catch(error => {
                console.error('Error fetching account info', error);
            });
    }, []); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component được tạo ra


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setUserData(initialUserData); // Khôi phục dữ liệu từ thông tin ban đầu
        setIsEditing(false); // Tắt chế độ sửa
    };

    const handleSaveClick = () => {
        if (!userData.fullName || !userData.address || !userData.phoneNumber) {
            alert('All fields are required.');
            setUserData(initialUserData);
            return;
        }
        axios
            .post("http://localhost:8080/api/user/update", userData, config)
            .then((response) => {
                setInitialUserData(userData)
                alert("User information updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating user information", error);
            });
        setIsEditing(false);
    };
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="my-order">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="my-account">Tài khoản của tôi</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="my-order">Đơn hàng</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="my-account">
                            <div>
                                <h1>Account Manager</h1>
                                <style>
                                    {`
                        /* CSS code to set table width to 50% and center it horizontally */
                        .table-container {
                            display: flex;
                            justify-content: center;
                        }
                        
                        table {
                            width: 50%;
                        }
                        .feature {
                        width : 18%;
                        }
                         table input[readonly] {
                            border: none;
                        }
                      
                    `}
                                </style>
                                <div className="table-container">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className="feature">Tên đăng nhập</td>
                                            <td>
                                                <Form.Control type="text" value={userData.username} disabled={true}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tên người dùng</td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={userData.fullName}
                                                    readOnly={!isEditing}
                                                    onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Số điện thoại</td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={userData.phoneNumber}
                                                    readOnly={!isEditing}
                                                    onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Địa chỉ</td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={userData.address}
                                                    readOnly={!isEditing}
                                                    onChange={(e) => setUserData({...userData, address: e.target.value})}
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn">
                                    <Button
                                        variant="success"
                                        onClick={isEditing ? handleSaveClick : handleEditClick}
                                        className="mt-5"
                                    >
                                        {isEditing ? 'Lưu' : 'Sửa'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={handleCancelClick}
                                        className="mt-5 ml -5"
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="my-order">
                            <Tabs
                                defaultActiveKey="all"
                                id="uncontrolled-tab-example"
                                className="mb-3 "
                                fill
                            >
                                <Tab eventKey="all" title="Tất cả" >
                                    <Container>

                                        <Card>
                                            <Card.Header>Mã đơn hàng: #19612</Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Card.Img src="caycamngotcuatoi.jpeg" className="img-fluid w-25 mx-auto" />
                                                    </Col>
                                                    <Col sm={5}>
                                                        <Card.Title>Sách: Cây cam ngọt của tôi</Card.Title>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Card.Text>
                                                            Thành tiền: 100.000vnđ
                                                        </Card.Text>
                                                    </Col>


                                                </Row>
                                            </Card.Body>
                                            <Card.Body>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Card.Img src="ditimlesong.jpg" className="img-fluid w-25 mx-auto" />
                                                    </Col>
                                                    <Col sm={5}>
                                                        <Card.Title>Sách: Đi tìm lẽ sống</Card.Title>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Card.Text>
                                                            Thành tiền: 89.000vnđ
                                                        </Card.Text>
                                                    </Col>


                                                </Row>
                                            </Card.Body>

                                            <Card.Footer>
                                                <Row>
                                                    <Col sm={4}>

                                                    </Col>
                                                    <Col className="text-muted" sm={5}>
                                                        Ngày đặt hàng: 25/10/2023
                                                    </Col>
                                                    <Col sm={3} className="fw-bold">
                                                        Tổng: 189.000vnđ
                                                    </Col>
                                                </Row>

                                            </Card.Footer>
                                            <Card.Footer>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Button className="mb-2 mr-10" variant="success">Mua lại</Button>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button className="mb-2" variant="secondary">Xem đánh giá</Button>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button className="mb-2" variant="danger">Huỷ đơn</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                        <br />
                                        <Card>
                                            <Card.Header>Mã đơn hàng: #19623</Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Card.Img src="khonggiadinh.jpeg" className="img-fluid w-25 mx-auto" />
                                                    </Col>
                                                    <Col sm={5}>
                                                        <Card.Title>Sách: Không gia đình</Card.Title>
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Card.Text>
                                                            Thành tiền: 149.000vnđ
                                                        </Card.Text>
                                                    </Col>


                                                </Row>
                                            </Card.Body>


                                            <Card.Footer>
                                                <Row>
                                                    <Col sm={4}>

                                                    </Col>
                                                    <Col className="text-muted" sm={5}>
                                                        Ngày đặt hàng: 16/10/2023
                                                    </Col>
                                                    <Col sm={3} className="fw-bold">
                                                        Tổng: 149.000vnđ
                                                    </Col>
                                                </Row>

                                            </Card.Footer>
                                            <Card.Footer>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Button className="mb-2 mr-10" variant="success">Mua lại</Button>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button className="mb-2" variant="secondary">Xem đánh giá</Button>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button className="mb-2" variant="danger">Huỷ đơn</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>

                                    </Container>
                                </Tab>
                                <Tab eventKey="shipping" title="Đang giao">
                                    Shipping
                                </Tab>
                                <Tab eventKey="cancel" title="Đã huỷ">
                                    Cancel
                                </Tab>
                            </Tabs>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    )
}

export default OrderManagement