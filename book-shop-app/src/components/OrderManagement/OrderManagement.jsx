import React from 'react'

import { Container, Row, Col, Image, Card, Button, Tab, Tabs, Nav } from "react-bootstrap";

import "./OrderManagement.css";
import { useHistory, useLocation } from 'react-router-dom';

const OrderManagement = () => {

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
                        <Tab.Pane eventKey="my-account">Tài khoản</Tab.Pane>
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