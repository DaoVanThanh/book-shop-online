import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import "./OrderManagement.css";
import "../AppRoutes";
import { getOrder } from "../../apiServices/OrderManagementService";

const OrderManagement = () => {
  const storedAccessToken = localStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([
    "PENDING",
    "Chờ lấy hàng",
    "Đang giao",
    "Đã giao",
    "Đã hủy"
  ]);

  const getOrderDetail = () => {
    getOrder().then(response => {
      setOrders(response.data);
    })
  }
  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
      <Tabs
          id="orderTabs"
          className="mb-3 order-tabs"
          fill
          defaultActiveKey={orderStatuses[0]} // Set the default active tab
      >
        {orderStatuses.map((status) => (
            <Tab key={status} eventKey={status} title={status}>
              {/* Render orders based on the current status */}
              <OrderList status={status} orders={orders} />
            </Tab>
        ))}
      </Tabs>
  );
};

const OrderList = ({ status, orders }) => {
  // Ensure that orders is an array before using filter

  const filteredOrders = orders && Array.isArray(orders.orderSummaries)
      ? orders.orderSummaries.filter((order) => order.status === status)
      : [];
  return (
      <div className="container-full-height order-tabs">
        {filteredOrders.map((order) => (

          <Card key={order.orderId} className="mb-5">
              <Card.Header>
                <Card.Text>
                  <Row>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                      <Card.Text>Mã đơn hàng: #{order.orderId}</Card.Text>
                    </Col>
                    <Col sm={4} style={{ textAlign: "right" }}>
                      <Card.Text className={`fw-bold cover-text-${order.status.toLowerCase()} ${order.status.toLowerCase()}`}>Trạng thái: {order.status}</Card.Text>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Header>
              <Card.Body>
                {order.bookQuantitySummaries.map((bookSummary) => (
                    <Row key={bookSummary.bookSummary.bookId}>
                      <Col sm={4}>
                        <Card.Img
                            src={bookSummary.bookSummary.imgUrl.replace('public/', '')}
                            className="img-fluid w-25 mx-auto"
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
                  <Col sm={3}></Col>
                  <Col className="text-muted" sm={6}>
                    Ngày đặt hàng: {new Date(order.orderDate).toLocaleDateString()}
                  </Col>
                  <Col sm={3} className="fw-bold">
                    <Card.Text>Tổng: {order.totalAmount}vnđ</Card.Text>
                  </Col>
                </Row>
              </Card.Footer>
              <Card.Footer>
                <Row>
                  <Col sm={4}>
                    <Button className="mb-2 mr-10" variant="success">
                      Mua lại
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button className="mb-2" variant="secondary">
                      Xem đánh giá
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button className="mb-2" variant="danger" disabled>
                      Huỷ đơn
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>


        ))}
      </div>
  );
};


export default OrderManagement;
