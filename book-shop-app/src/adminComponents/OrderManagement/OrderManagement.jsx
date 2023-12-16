import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Modal, Row, Tab, Table, Tabs} from 'react-bootstrap';
import './tableHover.css';
import {getAllOrders, getDetailOrder, updateStateOrder} from "../../apiServices/AdminApi/AdminOrmService";

const OrderManagement = () => {

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
    const [orders, setOrders] = useState([]);


    const orderStatuses = ['PENDING', 'ACCEPTED', 'DELIVERING', 'SUCCESS', 'RETURNED', 'CANCELLED'];
    useEffect(() => {
        getAllOrders()
            .then((response) => {
                const allOrders = response.data;
                setOrders(allOrders);
            })
            .catch((error) => {
                console.error("Error fetching account info", error);
            });
    }, []);

    const [selectedTab, setSelectedTab] = useState(0);
    const [temporaryStatus, setTemporaryStatus] = useState({});


    const handleTabChange = (selectedIndex) => {
        setSelectedTab(selectedIndex);
    };

    const handleEditStatus = (orderId, newStatus) => {
        const updatedTemporaryStatus = {...temporaryStatus};
        updatedTemporaryStatus[orderId] = newStatus;
        setTemporaryStatus(updatedTemporaryStatus);
    };

    const handleSaveStatus = () => {
        const updatedOrders = orders.map((order) => ({
            ...order,
            status: temporaryStatus[order.orderId] || order.status
        }));

        updatedOrders.map((order) => {
            const newState = {
                orderId: order.orderId,
                newStatus: order.status
            };
            updateStateOrder(newState).then(
                () => {
                })
        })
        setOrders(updatedOrders);
        setTemporaryStatus({});
    };

    useEffect(() => {
        setOrders(orders);
    }, []);

    const handleShowDetails = (order) => {
        setSelectedOrderDetails(order);
        setShowDetailsModal(true);
    };

    const [orderDetail, setOrderDetail] = useState(
        {
            "orderId": "",
            "orderDate":"" ,
            "status": "",
            "totalAmount": "",
            "deliveryAddress": "",
            "phoneNumber": "",
            "fullName": "",
            "userName": "",
            "bookQuantitySummaries": [
                {
                    "bookSummary": {
                        "bookId": "",
                        "title": "",
                       "description": "",
                        "price": "",
                        "publication_date": [],
                        "stockQuantity": "",
                        "imgUrl": "",
                        "authors": [],
                        "genres": []
                    },
                    "quantity": ""
                }
            ]
        }
    );
    useEffect(() => {
        if (showDetailsModal) {
            getDetailOrder(selectedOrderDetails.orderId)
                .then((response) => {
                    const books = response.data;
                    setOrderDetail(books);
                })
                .catch((error) => {
                    console.error("Error fetching account info", error);
                } );
        }
    }, [showDetailsModal]);

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    return (
        <div className="container">
            <h1>Quản lý đơn hàng </h1>
            <Tabs activeKey={selectedTab} onSelect={handleTabChange}>
                {orderStatuses.map((status, index) => (
                    <Tab eventKey={index} title={status} key={status}>
                        <Table striped bordered hover className={"table-hover"}>
                            <thead className="thead-dark sticky-top" style={{ zIndex: '1' }}>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Ngày đặt hàng</th>
                                <th>Trạng thái</th>
                                <th>Tên khách hàng</th>
                                <th>Tên tài khoản</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Giá trị đơn hàng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders
                                .filter((order) => order.status === status)
                                .map((order) => (
                                    <tr key={order.orderId}>
                                        <td onClick={() => handleShowDetails(order)}>{order.orderId}</td>
                                        <td onClick={() => handleShowDetails(order)}>{new Date(order.orderDate).toLocaleString()}</td>
                                        <td>
                                            <Form.Group>
                                                <Form.Select
                                                    as="select"
                                                    value={temporaryStatus[order.orderId] || order.status}
                                                    onChange={(e) =>
                                                        handleEditStatus(order.orderId, e.target.value)
                                                    }
                                                >
                                                    {orderStatuses.map((newStatus) => (
                                                        <option key={newStatus} value={newStatus}>
                                                            {newStatus}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </td>
                                        <td onClick={() => handleShowDetails(order)}>{order.fullName}</td>
                                        <td onClick={() => handleShowDetails(order)}>{order.userName}</td>
                                        <td onClick={() => handleShowDetails(order)}>{order.phoneNumber}</td>
                                        <td onClick={() => handleShowDetails(order)}>{order.deliveryAddress}</td>
                                        <td onClick={() => handleShowDetails(order)}>{order.totalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                ))}
            </Tabs>
            <Button variant="primary" onClick={handleSaveStatus}>
                Lưu
            </Button>
            {/* Modal for Order Details */}

            <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                <Modal.Header closeButton>
                    <Card.Header>
                        <Card.Text>
                            <Row>
                                <Col sm={4}/>
                                <Col sm={4}>
                                    <Card.Text>Mã đơn hàng: #{orderDetail.orderId}</Card.Text>
                                </Col>
                                <Col sm={4} style={{ textAlign: "right" }}>
                                    <Card.Text className={`fw-bold cover-text-${orderDetail.status.toLowerCase()} ${orderDetail.status.toLowerCase()}`}>Trạng thái: {orderDetail.status}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Header>
                </Modal.Header>
                <Modal.Body>
                    <Card.Body>
                        {orderDetail.bookQuantitySummaries.map((bookSummary) => (
                            <Row key={bookSummary.bookSummary.bookId}>
                                <Col sm={4}>
                                    <Card.Img
                                        src={bookSummary.bookSummary.imgUrl.replace('public/', '')}
                                        className="img-fluid w-90 mx-auto"
                                    />
                                </Col>
                                <Col sm={4} className="d-flex align-items-center justify-content-center">
                                    <Card.Title>Sách: {bookSummary.bookSummary.title}</Card.Title>
                                </Col>
                                <Col sm={1} className="d-flex align-items-center justify-content-center">
                                    <p className="text-muted">x{bookSummary.quantity}</p>
                                </Col>
                                <Col sm={3} className="d-flex align-items-center justify-content-center">
                                    <Card.Text>Thành tiền: {bookSummary.bookSummary.price * bookSummary.quantity}vnđ</Card.Text>
                                </Col>
                                <hr />

                            </Row>

                        ))}
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col sm={3}/>
                            <Col className="text-muted" sm={6}>
                                Ngày đặt hàng: {new Date(orderDetail.orderDate).toLocaleString()}
                            </Col>
                            <Col sm={3} className="fw-bold">
                                <Card.Text>Tổng: {orderDetail.totalAmount}vnđ</Card.Text>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderManagement;



